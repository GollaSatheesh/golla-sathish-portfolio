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
    // 1. Global Intersection Observer for .reveal elements
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

    // 2. Linear / Vercel Dynamic Spotlight Effect (hairline border illumination)
    const handleGlobalSpotlight = (e) => {
      const cards = document.querySelectorAll(
        '.spotlight-card, .bento-card, .project-flagship-card, .project-compact-card, .about-glass-card, .skill-domain-card, .edu-card, .workflow-matrix-card, .resume-billboard-card, .contact-channels-card, .contact-form-card'
      );
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    };
    window.addEventListener('mousemove', handleGlobalSpotlight, { passive: true });

    // 3. Magnetic Buttons Snapping Engine
    const magneticBtns = document.querySelectorAll('.btn-magnetic');
    const cleanups = [];
    magneticBtns.forEach((btn) => {
      const onBtnMove = (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);
        btn.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
      };
      const onBtnLeave = () => {
        btn.style.transform = 'translate(0px, 0px)';
      };

      btn.addEventListener('mousemove', onBtnMove);
      btn.addEventListener('mouseleave', onBtnLeave);
      cleanups.push(() => {
        btn.removeEventListener('mousemove', onBtnMove);
        btn.removeEventListener('mouseleave', onBtnLeave);
      });
    });

    return () => {
      window.removeEventListener('mousemove', handleGlobalSpotlight);
      revealElements.forEach((el) => observer.unobserve(el));
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return (
    <>
      {/* Silicon Valley Blueprint Grid & Atmospheric Lighting */}
      <div className="ambient-scene" aria-hidden="true">
        <div className="ambient-grid"></div>
        <div className="ambient-glow-indigo"></div>
        <div className="ambient-glow-cyan"></div>
      </div>

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
