import React, { useState } from 'react';
import './MovingCards.css';

const MOVING_PROJECT_CARDS = [
  {
    id: 'mc-mnist',
    badge: '🚀 98.72% TEST ACCURACY',
    badgeClass: 'badge-cyan',
    title: 'MNIST Digit Classifier',
    type: 'Computer Vision / Deep Learning',
    metric: '98.72%',
    metricLabel: '10k Test Set Acc',
    tech: ['PyTorch', 'CNN', 'Streamlit', 'Adam (lr 0.001)'],
    desc: 'Trained a 2-layer CNN (206k parameters) in PyTorch on 60,000 MNIST images. Deployed as a live Streamlit app for digit prediction.',
    liveDemo: 'https://mnist-digit-classifiergit.streamlit.app/',
    github: 'https://github.com/GollaSatheesh/mnist-digit-classifier',
  },
  {
    id: 'mc-student',
    badge: '★ 92% RECALL (FAILING STUDENTS)',
    badgeClass: 'badge-gold',
    title: 'Student Performance Prediction App',
    type: 'Machine Learning / Classification',
    metric: '87.3%',
    metricLabel: 'Test Accuracy (vs 67%)',
    tech: ['Scikit-learn', 'Logistic Regression', 'Streamlit', 'Data Preprocessing'],
    desc: 'Trained Logistic Regression on 395 student records to predict pass/fail, catching 24 of 26 failing students with target leakage prevention.',
    liveDemo: 'https://student-performance-prediction-s.streamlit.app/',
    github: 'https://github.com/GollaSatheesh/student-performance-prediction',
  },
  {
    id: 'mc-rag',
    badge: '🧠 72% CONTEXT REDUCTION',
    badgeClass: 'badge-indigo',
    title: 'RAG with Cross-Encoder Reranking',
    type: 'Generative AI / NLP',
    metric: '72%',
    metricLabel: 'Context Cut to LLM',
    tech: ['LangChain', 'FAISS', 'Cross-Encoder', 'Groq API', 'Streamlit'],
    desc: 'Built a 2-stage RAG pipeline with LangChain & FAISS. Added cross-encoder reranker rescoring question-chunk pairs before Groq LLM inference.',
    liveDemo: 'https://ragusingreranking-w8i533qzzf2djpe8ptau6c.streamlit.app/',
    github: 'https://github.com/GollaSatheesh/RagReranking',
  },
  {
    id: 'mc-sentiment',
    badge: '⚡ ~90% TEST ACCURACY',
    badgeClass: 'badge-emerald',
    title: 'Sentiment Analysis using TF-IDF & Logistic Regression',
    type: 'NLP / Machine Learning',
    metric: '~90%',
    metricLabel: 'Movie Review Acc',
    tech: ['Python', 'Scikit-learn', 'TF-IDF', 'Joblib', 'NLP'],
    desc: 'Classifies movie reviews as positive or negative with text preprocessing and TF-IDF vectorization. Serialized with Joblib.',
    liveDemo: null,
    github: 'https://github.com/GollaSatheesh',
  },
];

export default function MovingCards() {
  const [speed, setSpeed] = useState('normal');
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className="moving-cards-container" aria-label="Moving Showcase Cards Ribbon">
      
      {/* Strip Header with Controls */}
      <div className="moving-cards-top-strip">
        <div className="moving-badge">
          <span className="moving-dot"></span>
          <span>CONTINUOUS MODEL SHOWCASE // RESUME-VERIFIED SYSTEMS</span>
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
          {/* Loop twice for seamless infinite slide */}
          {[...MOVING_PROJECT_CARDS, ...MOVING_PROJECT_CARDS, ...MOVING_PROJECT_CARDS].map((card, idx) => (
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

              {/* Direct Links */}
              <div className="mc-links-row">
                {card.liveDemo && (
                  <a
                    href={card.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mc-link-btn demo-btn"
                  >
                    <span>Live Demo ↗</span>
                  </a>
                )}
                {card.github && (
                  <a
                    href={card.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mc-link-btn code-btn"
                  >
                    <span>GitHub ↗</span>
                  </a>
                )}
              </div>

            </div>
          ))}
        </div>
      </div>

      <div className="moving-hint">
        <span>💡 Hover over any card to pause and open live demo or inspect GitHub source</span>
      </div>

    </div>
  );
}
