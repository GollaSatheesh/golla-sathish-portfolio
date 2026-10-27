import React, { useEffect, useRef } from 'react';
import './Hero.css';

export default function Hero() {
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const moveX = (clientX - centerX) / 45;
      const moveY = (clientY - centerY) / 45;
      
      const elements = containerRef.current.querySelectorAll('.parallax-layer');
      elements.forEach((el, index) => {
        const factor = (index + 1) * 0.4;
        el.style.transform = `translate3d(${moveX * factor}px, ${moveY * factor}px, 0)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="lux-hero" id="hero" ref={containerRef}>
      <div className="container hero-grid">
        
        {/* Left Column: Kinetic Text Architecture */}
        <div className="hero-content">
          
          {/* Executive Status Badge */}
          <div className="hero-status-badge reveal stagger-1">
            <span className="live-radar">
              <span className="radar-core"></span>
              <span className="radar-ring"></span>
            </span>
            <span className="status-text">Available for Entry-Level Data Science & ML Roles</span>
          </div>

          {/* Main Name Hierarchy */}
          <h1 className="hero-name reveal stagger-2">
            Golla <span className="highlight-glimmer">Sathish</span>
          </h1>

          {/* Subtitle / Architectural Headline */}
          <div className="hero-role-wrapper reveal stagger-2">
            <span className="role-prefix">//</span>
            <span className="hero-role-title">Data Scientist & Machine Learning Engineer</span>
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
              <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>

            <a href="/Golla_Sathish_Resume.pdf" download="Golla_Sathish_Resume.pdf" className="btn-magnetic btn-luxury-secondary">
              <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <span>Download Official Resume</span>
            </a>
          </div>

          {/* High-Impact Stat Metrics */}
          <div className="hero-metrics-bar reveal stagger-4">
            <div className="metric-cell">
              <div className="metric-number">~90<span>%</span></div>
              <div className="metric-label">Model Accuracy (NLP)</div>
            </div>
            <div className="metric-divider"></div>
            <div className="metric-cell">
              <div className="metric-number">4<span>+</span></div>
              <div className="metric-label">End-to-End ML Systems</div>
            </div>
            <div className="metric-divider"></div>
            <div className="metric-cell">
              <div className="metric-number">B.Tech<span>'26</span></div>
              <div className="metric-label">Computer Science & Eng.</div>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Holographic Machine-Learning Reactor Visual */}
        <div className="hero-hologram parallax-layer">
          <div className="hologram-stage">
            
            {/* Spinning Gyroscopic Rings */}
            <div className="reactor-ring ring-outer"></div>
            <div className="reactor-ring ring-mid"></div>
            <div className="reactor-ring ring-inner"></div>

            {/* Floating Live Telemetry Cards */}
            <div className="telemetry-chip chip-top parallax-layer">
              <div className="chip-header">
                <span className="chip-led"></span>
                <span>MODEL INFERENCE</span>
              </div>
              <div className="chip-metric">Next-Word RNN · PyTorch</div>
              <div className="chip-bar"><div className="bar-fill" style={{ width: '88%' }}></div></div>
            </div>

            <div className="telemetry-chip chip-bottom parallax-layer">
              <div className="chip-header">
                <span className="chip-led led-cyan"></span>
                <span>SENTIMENT CLASSIFIER</span>
              </div>
              <div className="chip-metric">TF-IDF + Logistic Reg: 90% Acc</div>
              <div className="chip-tag">Joblib Serialized · Production Ready</div>
            </div>

            <div className="telemetry-chip chip-left parallax-layer">
              <div className="chip-header">
                <span className="chip-led led-purple"></span>
                <span>B.TECH CAPSTONE</span>
              </div>
              <div className="chip-metric">Student Performance System</div>
              <div className="chip-tag">Gradient Boosting + RF</div>
            </div>

            {/* Center Core */}
            <div className="reactor-core-orb">
              <div className="orb-center"></div>
              <div className="orb-glow-radiance"></div>
              <div className="orb-code-stream">&lt;DS/ML&gt;</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
