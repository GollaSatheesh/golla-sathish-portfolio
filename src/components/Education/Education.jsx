import React from 'react';
import './Education.css';

const EDUCATION_DATA = [
  {
    institution: 'Sri Venkatesa Perumal College of Engineering and Technology',
    location: 'Tirupati, Andhra Pradesh',
    degree: 'B.Tech in Computer Science and Engineering',
    period: 'Sep 2022 – Sep 2026',
    score: 'CGPA: 7.0 / 10.0',
    type: 'Undergraduate Degree',
    icon: '🏛️',
    highlights: [
      'Comprehensive curriculum in Computer Science principles, algorithms, and computational logic.',
      'Relevant Coursework: Python Programming, Data Structures, DBMS (Database Management Systems), Machine Learning.',
      'Completed institutional research project: Student Performance Prediction System using ensemble machine learning.',
    ],
  },
  {
    institution: 'Sri Lakshmi Narasimha Senior College',
    location: 'Anantapur, Andhra Pradesh',
    degree: 'Intermediate (Class XII) — MPC',
    period: '2020 – 2022',
    score: 'CGPA: 6.1 / 10.0',
    type: 'Higher Secondary Education',
    icon: '📚',
    highlights: [
      'Core focus on Mathematics, Physics, and Chemistry (MPC).',
      'Developed foundational mathematical analytical thinking and algebraic calculus required for ML optimization.',
    ],
  },
];

export default function Education() {
  return (
    <section id="education" className="lux-education">
      <div className="container">
        
        {/* Section Header */}
        <div className="reveal">
          <div className="section-badge">
            <span className="dot"></span>
            <span>Academic Pedigree</span>
          </div>
          <h2 className="section-title">
            Education & <span className="gradient-text">Foundations</span>
          </h2>
          <p className="section-subtitle">
            Formal engineering background grounding modern algorithmic model architectures.
          </p>
        </div>

        {/* Education Timeline Cards */}
        <div className="education-timeline-grid">
          {EDUCATION_DATA.map((edu, idx) => (
            <div key={edu.institution} className={`edu-card reveal stagger-${idx + 1}`}>
              
              <div className="edu-card-header">
                <div className="edu-icon-shell">
                  <span>{edu.icon}</span>
                </div>
                <div className="edu-header-titles">
                  <span className="edu-type-badge">{edu.type}</span>
                  <h3 className="edu-degree">{edu.degree}</h3>
                  <h4 className="edu-inst">{edu.institution}</h4>
                </div>
              </div>

              <div className="edu-meta-strip">
                <span className="meta-pill">📍 {edu.location}</span>
                <span className="meta-pill">📅 {edu.period}</span>
                <span className="meta-pill highlight-score">⭐ {edu.score}</span>
              </div>

              <div className="edu-highlights-list">
                {edu.highlights.map((h, i) => (
                  <div key={i} className="edu-hl-item">
                    <span className="hl-bullet">›</span>
                    <span>{h}</span>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
