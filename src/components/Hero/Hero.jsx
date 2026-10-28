import React, { useEffect, useRef, useState } from 'react';
import NeuralCanvas from './NeuralCanvas';
import './Hero.css';

// Live Continuous Typewriter Hook/Component
function Typewriter({ words, delay = 2400 }) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      const timeout = setTimeout(() => setReverse(true), delay);
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 30 : 65);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words, delay]);

  return (
    <span className="typewriter-text">
      {words[index].substring(0, subIndex)}
      <span className="typewriter-cursor">|</span>
    </span>
  );
}

function AnimatedNumber({ target, prefix = '', suffix = '' }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    let startTime = null;
    const duration = 1400;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const step = (timestamp) => {
          if (!startTime) startTime = timestamp;
          const progress = Math.min((timestamp - startTime) / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          setVal(Math.floor(ease * target));
          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            setVal(target);
          }
        };
        requestAnimationFrame(step);
        observer.disconnect();
      }
    }, { threshold: 0.2 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {prefix}{val}{suffix}
    </span>
  );
}

export default function Hero() {
  const containerRef = useRef(null);

  return (
    <section className="lux-hero" id="hero" ref={containerRef}>
      <div className="container hero-grid">
        
        {/* Left Column: Kinetic Text Architecture */}
        <div className="hero-content">
          
          {/* Executive Status Badge */}
          <div className="hero-status-badge reveal stagger-1">
            <span className="hero-status-dot"></span>
            <span className="status-text">Available for Entry-Level Data Science & ML Roles</span>
          </div>

          {/* Main Name Hierarchy with Silicon Valley Metallic Gradient */}
          <h1 className="hero-name reveal stagger-2">
            Golla <span className="highlight-glimmer">Sathish</span>
          </h1>

          {/* Subtitle with Continuous Animated Typewriter */}
          <div className="hero-role-wrapper reveal stagger-2">
            <span className="role-prefix">//</span>
            <span className="hero-role-title">
              <Typewriter words={[
                "Data Scientist & Machine Learning Engineer",
                "PyTorch Neural Sequence Architect",
                "NLP & Sentiment Analysis Engineer (~90% Acc)",
                "Predictive Systems & Academic Risk Modeling"
              ]} />
            </span>
          </div>

          {/* Precision Bio Statement */}
          <p className="hero-description reveal stagger-3">
            Aspiring Data Scientist based in <strong>Bangalore, Karnataka</strong>. Proficient in engineering 
            predictive classification & regression pipelines, deep neural architectures in <strong>PyTorch</strong>, 
            and real-time <strong>NLP solutions</strong> with verifiable ~90% accuracy.
          </p>

          {/* Direct CTA Action Row */}
          <div className="hero-actions reveal stagger-4">
            <a href="#projects" className="btn-magnetic btn-luxury-primary">
              <span>Explore Verified Projects</span>
              <svg viewBox="0 0 20 20" fill="currentColor" width="15" height="15">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>

            <a href="/Golla_Sathish_Resume.pdf" download="Golla_Sathish_Resume.pdf" className="btn-magnetic btn-luxury-secondary">
              <svg viewBox="0 0 20 20" fill="currentColor" width="15" height="15">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <span>Download Official Resume</span>
            </a>
          </div>

          {/* High-Impact Stat Metrics Bar with Live Mechanical Counters */}
          <div className="hero-metrics-bar reveal stagger-4">
            <div className="metric-cell">
              <div className="metric-number">
                <AnimatedNumber target={90} prefix="~" suffix="%" />
              </div>
              <div className="metric-label">Model Accuracy (NLP)</div>
            </div>
            <div className="metric-divider"></div>
            <div className="metric-cell">
              <div className="metric-number">
                <AnimatedNumber target={4} suffix="+" />
              </div>
              <div className="metric-label">End-to-End ML Systems</div>
            </div>
            <div className="metric-divider"></div>
            <div className="metric-cell">
              <div className="metric-number">
                B.Tech<span>'26</span>
              </div>
              <div className="metric-label">Computer Science & Eng.</div>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Interactive WebGL Neural Constellation */}
        <div className="hero-neural-matrix reveal stagger-3">
          <NeuralCanvas />
        </div>

      </div>
    </section>
  );
}
