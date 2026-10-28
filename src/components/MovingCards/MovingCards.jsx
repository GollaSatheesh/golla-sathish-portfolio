import React, { useState } from 'react';
import './MovingCards.css';

const MOVING_PROJECT_CARDS = [
  {
    id: 'mc-1',
    badge: '★ INSTITUTIONAL CAPSTONE',
    badgeClass: 'badge-gold',
    title: 'Student Performance & Risk Predictor',
    type: 'Supervised ML / Classification',
    metric: '94% Recall',
    metricLabel: 'At-Risk Detection',
    tech: ['Python', 'Scikit-Learn', 'Random Forest', 'GBDT'],
    desc: 'Trained ensemble models on institutional academic trajectories to identify at-risk students for proactive intervention.',
  },
  {
    id: 'mc-2',
    badge: '🚀 ~90% VERIFIED ACCURACY',
    badgeClass: 'badge-cyan',
    title: 'NLP Sentiment Classification Engine',
    type: 'Linguistic Computing / TF-IDF',
    metric: '~90% Test Acc',
    metricLabel: 'Stratified Split',
    tech: ['Python', 'TF-IDF', 'Logistic Regression', 'Joblib'],
    desc: 'High-precision text classifier converting unstructured natural language into high-dimensional sparse representations.',
  },
  {
    id: 'mc-3',
    badge: '🧠 PYTORCH RNN ARCHITECTURE',
    badgeClass: 'badge-indigo',
    title: 'Next Word Sequential Token Predictor',
    type: 'Deep Learning / Sequence Modeling',
    metric: 'Loss: 0.38',
    metricLabel: 'Cross-Entropy',
    tech: ['PyTorch', 'RNN', 'Streamlit', 'Word Embeddings'],
    desc: 'Formulated sliding sequence windows in PyTorch with recurrent feedback loops and a real-time Streamlit web interface.',
  },
  {
    id: 'mc-4',
    badge: '⚡ DATA ENGINEERING & EDA',
    badgeClass: 'badge-emerald',
    title: 'Automated Profiling & Leakage Prevention',
    type: 'Data Preparation & Cleaning',
    metric: '100% Clean',
    metricLabel: 'Zero Data Leakage',
    tech: ['Pandas', 'NumPy', 'SQL', 'Seaborn'],
    desc: 'Statistical distribution checking, automated outlier filtering, missingness imputation, and categorical vector encoding.',
  },
  {
    id: 'mc-5',
    badge: '📦 PRODUCTION SERIALIZATION',
    badgeClass: 'badge-purple',
    title: 'Joblib Zero-Latency Pipeline Bundles',
    type: 'Model Deployment / MLOps',
    metric: '<15ms',
    metricLabel: 'Inference Latency',
    tech: ['Joblib', 'Pickle', 'Python', 'Streamlit'],
    desc: 'Serialized complete preprocessing and hyperparameter-tuned estimators into production-ready .pkl bundles for instant scoring.',
  },
  {
    id: 'mc-6',
    badge: '📊 SPATIAL TEXT CATEGORIZATION',
    badgeClass: 'badge-blue',
    title: 'Multinomial Naive Bayes Classifier',
    type: 'Probabilistic ML / Text Mining',
    metric: '0.89 F1',
    metricLabel: 'Macro Evaluation',
    tech: ['Scikit-Learn', 'N-Grams', 'Tokenizer', 'Macro F1'],
    desc: 'Classifying linguistic text corpora into multi-class taxonomies using Laplace smoothing and high-dimensional n-gram feature spaces.',
  },
];

export default function MovingCards() {
  const [speed, setSpeed] = useState('normal'); // 'normal' or 'slow'
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className="moving-cards-container" aria-label="Moving Showcase Cards Ribbon">
      
      {/* Strip Header with Controls */}
      <div className="moving-cards-top-strip">
        <div className="moving-badge">
          <span className="moving-dot"></span>
          <span>CONTINUOUS MODEL SHOWCASE // TAP ACADEMY MOTION</span>
        </div>
        
        <div className="moving-controls">
          <button
            className={`mc-ctrl-btn ${isPaused ? 'active' : ''}`}
            onClick={() => setIsPaused(!isPaused)}
            title={isPaused ? 'Resume Motion' : 'Pause Motion'}
          >
            <span>{isPaused ? '▶ Resume' : '⏸ Pause'}</span>
          </button>
          
          <button
            className={`mc-ctrl-btn ${speed === 'slow' ? 'active' : ''}`}
            onClick={() => setSpeed(speed === 'normal' ? 'slow' : 'normal')}
            title="Toggle Glide Speed"
          >
            <span>{speed === 'normal' ? '🐌 Slow Glide' : '⚡ Normal Speed'}</span>
          </button>
        </div>
      </div>

      {/* Moving Track */}
      <div className="moving-track-viewport">
        <div
          className={`moving-track ${isPaused ? 'paused' : ''} ${speed === 'slow' ? 'speed-slow' : 'speed-normal'}`}
        >
          {/* Double array for seamless infinite looping */}
          {[...MOVING_PROJECT_CARDS, ...MOVING_PROJECT_CARDS].map((card, idx) => (
            <div key={`${card.id}-${idx}`} className="moving-card">
              
              <div className="mc-header">
                <span className={`mc-badge ${card.badgeClass}`}>{card.badge}</span>
                <span className="mc-type">{card.type}</span>
              </div>

              <h4 className="mc-title">{card.title}</h4>
              <p className="mc-desc">{card.desc}</p>

              <div className="mc-metric-box">
                <div className="mc-metric-val">{card.metric}</div>
                <div className="mc-metric-lbl">{card.metricLabel}</div>
              </div>

              <div className="mc-tech-row">
                {card.tech.map((t) => (
                  <span key={t} className="mc-tech-pill">{t}</span>
                ))}
              </div>

            </div>
          ))}
        </div>
      </div>

      <div className="moving-hint">
        <span>💡 Hover over any card to pause and inspect architectural specs</span>
      </div>

    </div>
  );
}
