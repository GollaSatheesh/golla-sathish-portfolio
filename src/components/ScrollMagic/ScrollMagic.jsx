import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ScrollMagic.css';

gsap.registerPlugin(ScrollTrigger);

const SECTIONS = [
  { id: 'hero', label: 'Overview', icon: '⚡' },
  { id: 'about', label: 'Profile', icon: '👤' },
  { id: 'skills', label: 'Tech Stack', icon: '🛠️' },
  { id: 'visualizer', label: 'ML Visualizer', icon: '✨' },
  { id: 'projects', label: 'Projects', icon: '🚀' },
  { id: 'workflow', label: 'Lifecycle', icon: '🔄' },
  { id: 'education', label: 'Education', icon: '🎓' },
  { id: 'contact', label: 'Contact', icon: '📫' },
];

export default function ScrollMagic() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    // 1. Smooth Scroll Progress Tracker
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // 2. Parallax Atmosphere on Ambient Glow Orbs
    const indigoGlow = document.querySelector('.ambient-glow-indigo');
    const cyanGlow = document.querySelector('.ambient-glow-cyan');
    const ambientGrid = document.querySelector('.ambient-grid');

    if (indigoGlow && cyanGlow) {
      gsap.to(indigoGlow, {
        y: 280,
        x: -80,
        scrollTrigger: {
          trigger: '#main-content',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5,
        },
      });

      gsap.to(cyanGlow, {
        y: 350,
        x: 100,
        scrollTrigger: {
          trigger: '#main-content',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 2,
        },
      });
    }

    if (ambientGrid) {
      gsap.to(ambientGrid, {
        backgroundPositionY: '320px',
        scrollTrigger: {
          trigger: '#main-content',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        },
      });
    }

    // 3. Section Milestone Triggers
    const triggers = [];
    SECTIONS.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) {
        const st = ScrollTrigger.create({
          trigger: el,
          start: 'top 45%',
          end: 'bottom 45%',
          onEnter: () => setActiveSection(sec.id),
          onEnterBack: () => setActiveSection(sec.id),
        });
        triggers.push(st);
      }
    });

    // 4. Staggered card lift & glow on scroll for bento cells and skill cards
    const cardElements = document.querySelectorAll('.bento-cell, .skill-domain-card, .workflow-matrix-card');
    cardElements.forEach((card) => {
      gsap.fromTo(
        card,
        { opacity: 0.85, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      triggers.forEach((t) => t.kill());
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Side Cyber Spine Timeline Navigator (Visible on Desktop) */}
      <nav className="cyber-spine-dock" aria-label="Scroll Journey Navigation">
        <div className="spine-rail">
          <div
            className="spine-laser-fill"
            style={{ height: `${scrollProgress}%` }}
          >
            <div className="spine-laser-comet"></div>
          </div>
        </div>

        <div className="spine-nodes-list">
          {SECTIONS.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                className={`spine-node-btn ${isActive ? 'active' : ''}`}
                onClick={() => scrollTo(sec.id)}
                aria-label={`Scroll to ${sec.label}`}
              >
                <div className="spine-node-dot">
                  <span className="dot-core"></span>
                  {isActive && <span className="dot-ripple"></span>}
                </div>
                <div className="spine-node-tooltip">
                  <span className="tooltip-icon">{sec.icon}</span>
                  <span className="tooltip-label">{sec.label}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Scroll Percent HUD Badge */}
        <div className="spine-hud-badge">
          <span className="hud-metric">{Math.round(scrollProgress)}%</span>
          <span className="hud-caption">SCROLL</span>
        </div>
      </nav>
    </>
  );
}
