import React from 'react';
import './Footer.css';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="lux-footer">
      <div className="container footer-inner">
        
        {/* Top Tier */}
        <div className="footer-top-row">
          <div className="footer-brand-block">
            <span className="f-brand-logo">
              <span className="f-brand-symbol">GS</span> Golla<span className="f-brand-accent">.Sathish</span>
            </span>
            <p className="f-brand-tagline">
              Data Scientist & Machine Learning Engineer based in Bangalore, Karnataka.
            </p>
          </div>

          <div className="footer-links-cluster">
            <a href="https://linkedin.com/in/golla-sathish" target="_blank" rel="noopener noreferrer" className="f-social-link">
              LinkedIn
            </a>
            <a href="https://github.com/GollaSatheesh" target="_blank" rel="noopener noreferrer" className="f-social-link">
              GitHub
            </a>
            <a href="mailto:gollasatheesh95@gmail.com" className="f-social-link">
              Email
            </a>
            <a href="tel:+916304231087" className="f-social-link">
              Phone
            </a>
          </div>

          <button className="back-to-top-btn" onClick={scrollToTop} aria-label="Back to top">
            <span>↑</span>
          </button>
        </div>

        {/* Bottom Tier */}
        <div className="footer-bottom-row">
          <p className="f-copyright">
            © {new Date().getFullYear()} <strong>Golla Sathish</strong>. Custom Engineered Architectural Portfolio. All rights reserved.
          </p>
          <span className="f-meta-pill">
            Bangalore · India · +91-6304231087
          </span>
        </div>

      </div>
    </footer>
  );
}
