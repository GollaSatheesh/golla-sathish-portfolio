import React, { useEffect, useRef } from 'react';
import './NeuralCanvas.css';

export default function NeuralCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let isVisible = true;
    let width = (canvas.width = canvas.parentElement.clientWidth);
    let height = (canvas.height = canvas.parentElement.clientHeight);

    // High-DPI support
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Mouse coordinates in 3D rotation space
    let targetRotX = 0;
    let targetRotY = 0;
    let rotX = 0;
    let rotY = 0;
    let mouseActive = false;
    let mousePos = { x: 0, y: 0 };

    // Node count (scaled for mobile vs desktop)
    const isMobile = window.innerWidth < 768;
    const NODE_COUNT = isMobile ? 45 : 75;
    const FOV = 280;
    const CONNECTION_DIST = isMobile ? 85 : 110;

    // Initialize 3D Neural Nodes
    const nodes = [];
    const sphereRadius = Math.min(width, height) * 0.42;

    for (let i = 0; i < NODE_COUNT; i++) {
      // Fibonacci sphere distribution for uniform 3D neural cluster
      const phi = Math.acos(-1 + (2 * i) / NODE_COUNT);
      const theta = Math.sqrt(NODE_COUNT * Math.PI) * phi;

      // Random jitter for natural organic neural look
      const r = sphereRadius * (0.65 + Math.random() * 0.45);
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      nodes.push({
        origX: x,
        origY: y,
        origZ: z,
        x,
        y,
        z,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        vz: (Math.random() - 0.5) * 0.25,
        size: Math.random() * 2 + 1.5,
        pulseSpeed: 0.02 + Math.random() * 0.03,
        pulse: Math.random() * Math.PI,
        colorType: Math.random() > 0.35 ? 'cyan' : 'indigo',
      });
    }

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left - width / 2;
      const y = e.clientY - rect.top - height / 2;
      mousePos = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      targetRotY = (x / width) * 0.9;
      targetRotX = -(y / height) * 0.9;
      mouseActive = true;
    };

    const handleMouseLeave = () => {
      mouseActive = false;
    };

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.parentElement.clientWidth;
      height = canvas.parentElement.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Pause when out of viewport for 0% CPU consumption
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    }, { threshold: 0.1 });
    observer.observe(canvas);

    // 3D Matrix Rotation Math
    const rotateX = (x, y, z, angle) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return { x, y: y * cos - z * sin, z: y * sin + z * cos };
    };

    const rotateY = (x, y, z, angle) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      return { x: x * cos + z * sin, y, z: -x * sin + z * cos };
    };

    // Main 60 FPS Render Loop
    let autoAngle = 0;
    const render = () => {
      if (isVisible) {
        ctx.clearRect(0, 0, width, height);

        // Smooth spring interpolation for mouse rotation
        autoAngle += 0.0035;
        rotX += (targetRotX - rotX) * 0.05;
        rotY += (targetRotY - rotY) * 0.05;

        const currentRotY = autoAngle + rotY;
        const currentRotX = rotX * 0.5;

        // Project and sort nodes by 3D depth (Z-buffer)
        const projectedNodes = nodes.map((node) => {
          // Micro organic float
          node.x += node.vx;
          node.y += node.vy;
          node.z += node.vz;

          // Soft boundary bounce
          if (Math.abs(node.x - node.origX) > 25) node.vx *= -1;
          if (Math.abs(node.y - node.origY) > 25) node.vy *= -1;
          if (Math.abs(node.z - node.origZ) > 25) node.vz *= -1;

          // Pulse animation
          node.pulse += node.pulseSpeed;

          // 3D rotation
          let p = rotateY(node.x, node.y, node.z, currentRotY);
          p = rotateX(p.x, p.y, p.z, currentRotX);

          // Perspective projection
          const scale = FOV / (FOV + p.z + 200);
          const projX = p.x * scale + width / 2;
          const projY = p.y * scale + height / 2;

          return {
            ...node,
            projX,
            projY,
            projZ: p.z,
            scale,
          };
        });

        // Draw Synaptic Laser Connections
        for (let i = 0; i < projectedNodes.length; i++) {
          const a = projectedNodes[i];
          for (let j = i + 1; j < projectedNodes.length; j++) {
            const b = projectedNodes[j];
            const dx = a.projX - b.projX;
            const dy = a.projY - b.projY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < CONNECTION_DIST) {
              const alpha = (1 - dist / CONNECTION_DIST) * 0.28 * Math.min(a.scale, b.scale);
              ctx.beginPath();
              ctx.moveTo(a.projX, a.projY);
              ctx.lineTo(b.projX, b.projY);

              if (a.colorType === 'cyan' || b.colorType === 'cyan') {
                ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
              } else {
                ctx.strokeStyle = `rgba(79, 70, 229, ${alpha})`;
              }
              ctx.lineWidth = 0.85;
              ctx.stroke();
            }
          }
        }

        // Draw Nodes
        projectedNodes.forEach((node) => {
          const currentSize = Math.max(1, node.size * node.scale * (1 + 0.2 * Math.sin(node.pulse)));
          const alpha = Math.max(0.2, (node.projZ + 200) / 400);

          ctx.beginPath();
          ctx.arc(node.projX, node.projY, currentSize, 0, Math.PI * 2);

          if (node.colorType === 'cyan') {
            ctx.fillStyle = `rgba(6, 182, 212, ${alpha * 0.95})`;
            ctx.shadowColor = '#06B6D4';
            ctx.shadowBlur = 8 * node.scale;
          } else {
            ctx.fillStyle = `rgba(129, 140, 248, ${alpha * 0.85})`;
            ctx.shadowColor = '#4F46E5';
            ctx.shadowBlur = 6 * node.scale;
          }
          ctx.fill();
          ctx.shadowBlur = 0; // reset
        });

        // Center Neural Core Aura
        const gradient = ctx.createRadialGradient(width / 2, height / 2, 10, width / 2, height / 2, 120);
        gradient.addColorStop(0, 'rgba(6, 182, 212, 0.08)');
        gradient.addColorStop(0.5, 'rgba(79, 70, 229, 0.04)');
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, 120, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="neural-canvas-wrapper">
      <canvas ref={canvasRef} className="neural-canvas" />
      <div className="neural-overlay-badge">
        <span className="neural-dot"></span>
        <span className="neural-tag">LIVE NEURAL TENSOR GRAPH // 3D MATRIX</span>
      </div>
    </div>
  );
}
