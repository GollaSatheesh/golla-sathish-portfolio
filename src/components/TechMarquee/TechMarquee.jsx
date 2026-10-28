import React from 'react';
import './TechMarquee.css';

const TECH_ITEMS_ROW1 = [
  { name: 'Python', role: 'Core Language', icon: '🐍' },
  { name: 'PyTorch', role: 'Deep Neural Networks', icon: '🔥' },
  { name: 'Scikit-Learn', role: 'ML Algorithms', icon: '⚙️' },
  { name: 'Pandas', role: 'Data Manipulation', icon: '🐼' },
  { name: 'NumPy', role: 'Vectorized Computing', icon: '🔢' },
  { name: 'SQL', role: 'Relational Databases', icon: '🗄️' },
  { name: 'Streamlit', role: 'ML Web Apps', icon: '👑' },
  { name: 'Git & GitHub', role: 'Version Control', icon: '🐙' },
];

const TECH_ITEMS_ROW2 = [
  { name: 'TensorFlow', role: 'Deep Learning', icon: '🧠' },
  { name: 'Random Forest', role: 'Ensemble Learning', icon: '🌲' },
  { name: 'Gradient Boosting', role: 'GBDT & XGBoost', icon: '⚡' },
  { name: 'NLP & TF-IDF', role: 'Linguistic Vectorization', icon: '💬' },
  { name: 'Matplotlib', role: 'Data Visualization', icon: '📊' },
  { name: 'Seaborn', role: 'Statistical Visuals', icon: '📈' },
  { name: 'Jupyter', role: 'Reproducible Notebooks', icon: '🪐' },
  { name: 'Joblib / Pickle', role: 'Model Serialization', icon: '📦' },
];

export default function TechMarquee() {
  return (
    <section className="lux-tech-marquee" aria-label="Ecosystem Marquee">
      <div className="marquee-header-strip container">
        <div className="marquee-badge">
          <span className="marquee-badge-dot"></span>
          <span>PRODUCTION-GRADE DATA SCIENCE ECOSYSTEM</span>
        </div>
        <p className="marquee-subtitle">
          Core toolchain and frameworks utilized across production-grade machine learning pipelines and models
        </p>
      </div>

      <div className="marquee-wrapper">
        {/* Row 1 - Scrolling Left */}
        <div className="marquee-track-container track-row-1">
          <div className="marquee-track scroll-left">
            {[...TECH_ITEMS_ROW1, ...TECH_ITEMS_ROW1, ...TECH_ITEMS_ROW1].map((tech, index) => (
              <div key={`${tech.name}-row1-${index}`} className="marquee-chip">
                <span className="marquee-icon">{tech.icon}</span>
                <div className="marquee-info">
                  <span className="marquee-title">{tech.name}</span>
                  <span className="marquee-role">{tech.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 - Scrolling Right */}
        <div className="marquee-track-container track-row-2">
          <div className="marquee-track scroll-right">
            {[...TECH_ITEMS_ROW2, ...TECH_ITEMS_ROW2, ...TECH_ITEMS_ROW2].map((tech, index) => (
              <div key={`${tech.name}-row2-${index}`} className="marquee-chip">
                <span className="marquee-icon">{tech.icon}</span>
                <div className="marquee-info">
                  <span className="marquee-title">{tech.name}</span>
                  <span className="marquee-role">{tech.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
