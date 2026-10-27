import React from 'react';
import './Resume.css';

export default function Resume() {
  return (
    <section id="resume" className="lux-resume">
      <div className="container">
        
        {/* Section Header */}
        <div className="reveal">
          <div className="section-badge">
            <span className="dot"></span>
            <span>Verified Credentials</span>
          </div>
          <h2 className="section-title">
            Download Official <span className="gradient-text">Curriculum Vitae</span>
          </h2>
        </div>

        {/* Executive Resume Billboard Card */}
        <div className="resume-billboard-card reveal stagger-1">
          
          <div className="billboard-left">
            <div className="doc-icon-badge">
              <span>PDF</span>
            </div>
            <div className="billboard-text">
              <h3 className="candidate-name">Golla Sathish — Curriculum Vitae</h3>
              <p className="candidate-headline">
                B.Tech in Computer Science & Engineering · Aspiring Data Scientist · Bangalore, Karnataka
              </p>
              <div className="resume-specs-strip">
                <span className="spec-tag">✓ Direct Download Available</span>
                <span className="spec-tag">✓ Complete Academic & Project Details</span>
                <span className="spec-tag">✓ Contact & Social Links Included</span>
              </div>
            </div>
          </div>

          <div className="billboard-actions">
            {/* Real Direct Download Button targeting the PDF in public folder */}
            <a
              href="/Golla_Sathish_Resume.pdf"
              download="Golla_Sathish_Resume.pdf"
              className="btn-magnetic btn-luxury-primary"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" width="18" height="18">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <span>Download Resume (PDF)</span>
            </a>

            <a
              href="/Golla_Sathish_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-magnetic btn-luxury-secondary"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
              <span>View Online</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
