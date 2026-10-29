import React, { useEffect, useRef } from 'react';
import './NeuralCanvas.css';

export default function NeuralCanvas() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let isVisible = true;

    const getDimensions = () => {
      let w = container.clientWidth || 450;
      let h = container.clientHeight || 420;
      if (w < 100) w = 450;
      if (h < 100) h = 420;
      return { w, h };
    };

    let { w: width, h: height } = getDimensions();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Mouse coordinates in 3D rotation space
    let targetRotX = 0;
    let targetRotY = 0;
    let rotX = 0;
    let rotY = 0;

    // Node count
    const isMobile = window.innerWidth < 768;
    const NODE_COUNT = isMobile ? 45 : 70;
    const FOV = 280;
    const CONNECTION_DIST = isMobile ? 90 : 115;

    // Initialize 3D Neural Nodes
    const nodes = [];
    const sphereRadius = Math.min(width, height) * 0.42;

    for (let i = 0; i < NODE_COUNT; i++) {
      const phi = Math.acos(-1 + (2 * i) / NODE_COUNT);
      const theta = Math.sqrt(NODE_COUNT * Math.PI) * phi;

      const r = sphereRadius * (0.7 + Math.random() * 0.4);
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
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        vz: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2.2 + 1.6,
        pulseSpeed: 0.02 + Math.random() * 0.03,
        pulse: Math.random() * Math.PI,
        colorType: Math.random() > 0.4 ? 'cyan' : 'indigo',
      });
    }

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left - width / 2;
      const y = e.clientY - rect.top - height / 2;
      targetRotY = (x / width) * 1.1;
      targetRotX = -(y / height) * 1.1;
    };

    const handleTouchMove = (e) => {
      if (!e.touches[0]) return;
      const rect = container.getBoundingClientRect();
      const x = e.touches[0].clientX - rect.left - width / 2;
      const y = e.touches[0].clientY - rect.top - height / 2;
      targetRotY = (x / width) * 1.1;
      targetRotX = -(y / height) * 1.1;
    };

    const handleResize = () => {
      const dims = getDimensions();
      width = dims.w;
      height = dims.h;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    let scrollOffset = 0;
    const handleScroll = () => {
      scrollOffset = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    window.addEventListener('resize', handleResize);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Pause when out of viewport for 0% CPU consumption
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    }, { threshold: 0.1 });
    observer.observe(container);

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

        autoAngle += 0.004;
        rotX += (targetRotX - rotX) * 0.06;
        rotY += (targetRotY - rotY) * 0.06;

        const scrollRot = scrollOffset * 0.0022;
        const currentRotY = autoAngle + rotY + scrollRot;
        const currentRotX = (rotX * 0.6) + Math.sin(scrollOffset * 0.0015) * 0.25;

        const projectedNodes = nodes.map((node) => {
          node.x += node.vx;
          node.y += node.vy;
          node.z += node.vz;

          if (Math.abs(node.x - node.origX) > 25) node.vx *= -1;
          if (Math.abs(node.y - node.origY) > 25) node.vy *= -1;
          if (Math.abs(node.z - node.origZ) > 25) node.vz *= -1;

          node.pulse += node.pulseSpeed;

          let p = rotateY(node.x, node.y, node.z, currentRotY);
          p = rotateX(p.x, p.y, p.z, currentRotX);

          const scale = FOV / (FOV + p.z + 180);
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

        // Draw Synapses
        for (let i = 0; i < projectedNodes.length; i++) {
          const a = projectedNodes[i];
          for (let j = i + 1; j < projectedNodes.length; j++) {
            const b = projectedNodes[j];
            const dx = a.projX - b.projX;
            const dy = a.projY - b.projY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < CONNECTION_DIST) {
              const alpha = (1 - dist / CONNECTION_DIST) * 0.35 * Math.min(a.scale, b.scale);
              ctx.beginPath();
              ctx.moveTo(a.projX, a.projY);
              ctx.lineTo(b.projX, b.projY);

              if (a.colorType === 'cyan' || b.colorType === 'cyan') {
                ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
              } else {
                ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
              }
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        }

        // Draw Nodes
        projectedNodes.forEach((node) => {
          const currentSize = Math.max(1.2, node.size * node.scale * (1 + 0.25 * Math.sin(node.pulse)));
          const alpha = Math.max(0.25, (node.projZ + 180) / 360);

          ctx.beginPath();
          ctx.arc(node.projX, node.projY, currentSize, 0, Math.PI * 2);

          if (node.colorType === 'cyan') {
            ctx.fillStyle = `rgba(34, 211, 238, ${alpha})`;
            ctx.shadowColor = '#06B6D4';
            ctx.shadowBlur = 10 * node.scale;
          } else {
            ctx.fillStyle = `rgba(165, 180, 252, ${alpha})`;
            ctx.shadowColor = '#6366F1';
            ctx.shadowBlur = 8 * node.scale;
          }
          ctx.fill();
          ctx.shadowBlur = 0;
        });

        // Center Ambient Core Glow
        const gradient = ctx.createRadialGradient(width / 2, height / 2, 5, width / 2, height / 2, 130);
        gradient.addColorStop(0, 'rgba(6, 182, 212, 0.12)');
        gradient.addColorStop(0.5, 'rgba(79, 70, 229, 0.05)');
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, 130, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('touchmove', handleTouchMove);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="neural-canvas-wrapper" ref={containerRef}>
      <canvas ref={canvasRef} className="neural-canvas" />

      {/* Floating Interactive Telemetry Chips */}
      <div className="neural-hud-chip hud-top">
        <span className="hud-led led-green"></span>
        <div className="hud-content">
          <span className="hud-title">MODEL INFERENCE</span>
          <span className="hud-val">PyTorch CNN // 98.72%</span>
        </div>
      </div>

      <div className="neural-hud-chip hud-bottom">
        <span className="hud-led led-cyan"></span>
        <div className="hud-content">
          <span className="hud-title">SENTIMENT CLASSIFIER</span>
          <span className="hud-val">TF-IDF: ~90% Accuracy</span>
        </div>
      </div>

      <div className="neural-overlay-badge">
        <span className="neural-dot"></span>
        <span className="neural-tag">LIVE NEURAL TENSOR GRAPH // 3D MATRIX</span>
      </div>
    </div>
  );
}
