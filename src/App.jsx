import React, { useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import Workflow from './components/Workflow/Workflow';
import Education from './components/Education/Education';
import Resume from './components/Resume/Resume';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';

function App() {
  useEffect(() => {
    // 1. Interactive Cursor Glow
    const cursor = document.getElementById('cursor-glow');
    const handleMouseMove = (e) => {
      if (cursor) {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // 2. Global Intersection Observer for .reveal elements
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px',
      }
    );
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    // 3. Apple VisionOS 3D Gyroscopic Card Tilt Engine
    const tiltCards = document.querySelectorAll(
      '.about-glass-card, .skill-domain-card, .project-flagship-card, .project-compact-card, .edu-card, .workflow-matrix-card, .resume-billboard-card, .contact-channels-card, .contact-form-card'
    );

    const handleCardMove = (e, card) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Subtle tilt rotation angles (max 6 degrees)
      const rotateX = ((y - centerY) / centerY) * -5.5;
      const rotateY = ((x - centerX) / centerX) * 5.5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px) scale(1.015)`;
    };

    const handleCardLeave = (card) => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)';
    };

    const cleanups = [];
    tiltCards.forEach((card) => {
      const onMove = (e) => handleCardMove(e, card);
      const onLeave = () => handleCardLeave(card);

      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', onLeave);
      cleanups.push(() => {
        card.removeEventListener('mousemove', onMove);
        card.removeEventListener('mouseleave', onLeave);
      });
    });

    // 4. Magnetic Buttons Snapping Engine
    const magneticBtns = document.querySelectorAll('.btn-magnetic');
    magneticBtns.forEach((btn) => {
      const onBtnMove = (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);
        // Magnetic pull factor
        btn.style.transform = `translate(${x * 0.28}px, ${y * 0.28}px) scale(1.03)`;
      };
      const onBtnLeave = () => {
        btn.style.transform = 'translate(0px, 0px) scale(1)';
      };

      btn.addEventListener('mousemove', onBtnMove);
      btn.addEventListener('mouseleave', onBtnLeave);
      cleanups.push(() => {
        btn.removeEventListener('mousemove', onBtnMove);
        btn.removeEventListener('mouseleave', onBtnLeave);
      });
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      revealElements.forEach((el) => observer.unobserve(el));
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return (
    <>
      {/* 1. Cinematic Tactile Film Grain Overlay */}
      <div className="film-grain-overlay" aria-hidden="true"></div>

      {/* 2. Apple VisionOS Ambient Fluid Glass Canvas */}
      <div className="ambient-scene" aria-hidden="true">
        <div className="ambient-grid"></div>
        <div className="glass-ambient-orb orb-primary"></div>
        <div className="glass-ambient-orb orb-secondary"></div>
        <div className="glass-ambient-orb orb-tertiary"></div>
      </div>

      {/* 3. Interactive Cursor Spotlight */}
      <div id="cursor-glow" className="cursor-follower" aria-hidden="true"></div>

      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Workflow />
        <Education />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
