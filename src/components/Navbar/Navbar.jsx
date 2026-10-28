import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';

const NAV_LINKS = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Visualizer', href: '#visualizer' },
  { name: 'Projects', href: '#projects' },
  { name: 'Workflow', href: '#workflow' },
  { name: 'Education', href: '#education' },
  { name: 'Resume', href: '#resume' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [scrollProgress, setScrollProgress] = useState(0);

  // Sliding spotlight pill coordinates
  const [spotlightStyle, setSpotlightStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const navListRef = useRef(null);

  // Track scroll position & calculate scroll percentage
  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolledRatio = height > 0 ? (winScroll / height) * 100 : 0;
      setScrollProgress(scrolledRatio);

      setScrolled(winScroll > 25);

      // Section tracker
      const sections = ['about', 'skills', 'visualizer', 'projects', 'workflow', 'education', 'resume', 'contact'];
      const scrollPos = winScroll + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update sliding pill indicator position
  useEffect(() => {
    if (!navListRef.current) return;
    const activeLink = navListRef.current.querySelector(`[data-section="${activeSection}"]`);
    if (activeLink) {
      const navRect = navListRef.current.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();
      setSpotlightStyle({
        left: linkRect.left - navRect.left,
        width: linkRect.width,
        opacity: 1,
      });
    } else {
      setSpotlightStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [activeSection]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className={`dock-navbar-wrapper ${scrolled ? 'is-scrolled' : ''}`}>
      <header className={`dock-pill-container ${mobileMenuOpen ? 'menu-open' : ''}`}>
        
        {/* Subtle Hairline Scroll Progress Track */}
        <div className="dock-scroll-track" aria-hidden="true">
          <div
            className="dock-scroll-indicator"
            style={{ width: `${scrollProgress}%` }}
          ></div>
        </div>

        <div className="dock-inner-row">
          
          {/* Brand Identity */}
          <a href="#" className="dock-brand" onClick={(e) => handleNavClick(e, '#hero')}>
            <div className="dock-brand-symbol">
              <span className="symbol-letter">GS</span>
            </div>
            <span className="dock-brand-name">
              Golla <span className="brand-highlight">Sathish</span>
            </span>
          </a>

          {/* Silicon Valley Live Operational Status Pill */}
          <div className="dock-status-pill" title="Actively interviewing for Data Science and ML roles">
            <span className="status-dot-pulse">
              <span className="dot-core"></span>
              <span className="dot-ripple"></span>
            </span>
            <span className="status-text">Operational / Open to Work</span>
          </div>

          {/* Centered Navigation Capsule */}
          <nav className="dock-nav-links" aria-label="Main Navigation">
            <ul className="dock-list" ref={navListRef}>
              {/* Sliding Active Pill */}
              <div
                className="dock-sliding-pill"
                style={{
                  transform: `translateX(${spotlightStyle.left}px)`,
                  width: `${spotlightStyle.width}px`,
                  opacity: spotlightStyle.opacity,
                }}
                aria-hidden="true"
              ></div>

              {NAV_LINKS.map((link) => (
                <li key={link.name} className="dock-item">
                  <a
                    href={link.href}
                    data-section={link.href.substring(1)}
                    className={`dock-link ${activeSection === link.href.substring(1) ? 'active' : ''}`}
                    onClick={(e) => handleNavClick(e, link.href)}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right Action Hub */}
          <div className="dock-actions">
            <a
              href="/Golla_Sathish_Resume.pdf"
              download="Golla_Sathish_Resume.pdf"
              className="dock-cv-btn"
              title="Download Golla Sathish's Resume (PDF)"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" width="13" height="13">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <span>CV</span>
            </a>

            <a
              href="#contact"
              className="dock-connect-btn"
              onClick={(e) => handleNavClick(e, '#contact')}
            >
              <span>Connect</span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              className={`dock-hamburger ${mobileMenuOpen ? 'open' : ''}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        <div className={`dock-mobile-drawer ${mobileMenuOpen ? 'visible' : ''}`}>
          <ul className="dock-mobile-list">
            {NAV_LINKS.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="dock-mobile-link"
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.name}
                </a>
              </li>
            ))}
            <li className="dock-mobile-actions">
              <a
                href="/Golla_Sathish_Resume.pdf"
                download="Golla_Sathish_Resume.pdf"
                className="dock-mobile-cv"
              >
                Download Resume (PDF)
              </a>
              <a
                href="#contact"
                className="dock-mobile-connect"
                onClick={(e) => handleNavClick(e, '#contact')}
              >
                Get In Touch
              </a>
            </li>
          </ul>
        </div>

      </header>
    </div>
  );
}
