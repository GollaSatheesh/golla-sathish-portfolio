import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';

const NAV_LINKS = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
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

      setScrolled(winScroll > 30);

      // Section tracker
      const sections = ['about', 'skills', 'projects', 'workflow', 'education', 'resume', 'contact'];
      const scrollPos = winScroll + 220;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update sliding spotlight pill position whenever active section changes
  useEffect(() => {
    if (!navListRef.current) return;
    const activeLink = navListRef.current.querySelector(`.nav-link[data-section="${activeSection}"]`);
    if (activeLink) {
      const linkRect = activeLink.getBoundingClientRect();
      const listRect = navListRef.current.getBoundingClientRect();
      setSpotlightStyle({
        left: linkRect.left - listRect.left,
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
    <div className={`lux-navbar-wrapper ${scrolled ? 'is-scrolled' : ''}`}>
      <header className={`lux-floating-island ${mobileMenuOpen ? 'menu-open' : ''}`}>
        
        {/* Laser Scroll Progress Bar at the top rim */}
        <div className="navbar-scroll-track" aria-hidden="true">
          <div
            className="navbar-scroll-indicator"
            style={{ width: `${scrollProgress}%` }}
          ></div>
        </div>

        <div className="lux-nav-container">
          
          {/* Brand Logo */}
          <a href="#" className="lux-brand" onClick={(e) => handleNavClick(e, '#hero')}>
            <div className="brand-symbol">
              <span className="symbol-letter">GS</span>
              <div className="symbol-glow"></div>
            </div>
            <span className="brand-text">
              Golla<span className="brand-accent"> Sathish</span>
            </span>
            <span className="brand-spec">DS / ML</span>
          </a>

          {/* Center Glass Capsule with Sliding Magnetic Active Spotlight */}
          <nav className="lux-nav-capsule" aria-label="Main Navigation">
            <ul className="nav-list" ref={navListRef}>
              
              {/* Animated Sliding Pill */}
              <div
                className="sliding-spotlight-pill"
                style={{
                  transform: `translateX(${spotlightStyle.left}px)`,
                  width: `${spotlightStyle.width}px`,
                  opacity: spotlightStyle.opacity,
                }}
                aria-hidden="true"
              ></div>

              {NAV_LINKS.map((link) => (
                <li key={link.name} className="nav-item">
                  <a
                    href={link.href}
                    data-section={link.href.substring(1)}
                    className={`nav-link ${activeSection === link.href.substring(1) ? 'active' : ''}`}
                    onClick={(e) => handleNavClick(e, link.href)}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right Actions: 1-Click Resume + Let's Connect */}
          <div className="lux-nav-actions">
            
            {/* Quick 1-Click PDF Resume Download Button */}
            <a
              href="/Golla_Sathish_Resume.pdf"
              download="Golla_Sathish_Resume.pdf"
              className="quick-cv-btn"
              title="Download Golla Sathish's Resume (PDF)"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" width="14" height="14">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <span>CV</span>
            </a>

            {/* Let's Connect CTA */}
            <a
              href="#contact"
              className="nav-cta-btn"
              onClick={(e) => handleNavClick(e, '#contact')}
            >
              <span>Let's Connect</span>
              <svg viewBox="0 0 20 20" fill="currentColor" width="13" height="13">
                <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
              </svg>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              className={`lux-hamburger ${mobileMenuOpen ? 'open' : ''}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>

          </div>
        </div>

        {/* Mobile Drawer */}
        <div className={`lux-mobile-menu ${mobileMenuOpen ? 'visible' : ''}`}>
          <ul className="mobile-nav-list">
            {NAV_LINKS.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="mobile-nav-link"
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.name}
                </a>
              </li>
            ))}
            <li className="mobile-action-row">
              <a
                href="/Golla_Sathish_Resume.pdf"
                download="Golla_Sathish_Resume.pdf"
                className="mobile-cv-link"
              >
                📄 Download Resume (PDF)
              </a>
              <a
                href="#contact"
                className="mobile-cta-link"
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
