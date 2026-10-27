import React, { useState } from 'react';
import './Projects.css';

const VERIFIED_PROJECTS = [
  {
    id: 'student-performance',
    title: 'Student Performance Prediction System',
    type: 'Final-Year B.Tech Capstone',
    domain: 'Machine Learning / EdTech',
    badge: '🏆 INSTITUTIONAL CAPSTONE',
    featured: true,
    summary:
      'Engineered an early-warning classification system that proactively flags students requiring academic intervention based on historical exam trajectories and demographic indicators.',
    highlights: [
      'Conducted rigorous exploratory data analysis (EDA), handling missing attributes and encoding multi-categorical factors.',
      'Extracted and selected high-impact predictive features to maximize recall on underperforming students.',
      'Trained, benchmarked, and hyperparameter-tuned Random Forest and Gradient Boosting ensemble architectures.',
      'Team project documented in a comprehensive institutional academic research report.',
    ],
    tech: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Random Forest', 'Gradient Boosting', 'EDA'],
    metrics: [
      { label: 'Core Algorithms', value: 'RF + GBDT' },
      { label: 'Evaluation Target', value: 'At-Risk Recall' },
      { label: 'Status', value: 'Report Documented' },
    ],
  },
  {
    id: 'sentiment-analysis',
    title: 'Sentiment Analysis using TF-IDF & Logistic Regression',
    type: 'NLP / Supervised Classification',
    domain: 'Linguistic Computing',
    badge: '⭐ ~90% BENCHMARK ACCURACY',
    featured: false,
    summary:
      'Built a high-performance binary NLP classification pipeline to categorize movie reviews into positive or negative sentiments with production serialization.',
    highlights: [
      'Executed full text preprocessing: regex cleaning, tokenization, stopword filtering, and stemming.',
      'Implemented TF-IDF vectorization to convert raw lexical sequences into optimized sparse feature matrices.',
      'Utilized stratified train-test splits and evaluated with precision, recall, confusion matrices, and F1-score.',
      'Achieved verified ~90% accuracy; serialized vectorizer and inference model with Joblib.',
    ],
    tech: ['Python', 'Scikit-learn', 'TF-IDF', 'Logistic Regression', 'Joblib', 'NLP Preprocessing'],
    metrics: [
      { label: 'Accuracy', value: '~90%' },
      { label: 'Split Method', value: 'Stratified K' },
      { label: 'Serialization', value: 'Joblib .pkl' },
    ],
  },
  {
    id: 'next-word-prediction',
    title: 'Next Word Prediction using RNN',
    type: 'Deep Learning / NLP',
    domain: 'Sequential Modeling',
    badge: '🚀 DEEP NEURAL STREAMLIT APP',
    featured: false,
    summary:
      'Trained a Recurrent Neural Network (RNN) in PyTorch on structured text sequence windows to predict subsequent tokens and deployed with an interactive UI.',
    highlights: [
      'Engineered sliding text sequence windows, token indexing dictionaries, and PyTorch DataLoaders.',
      'Trained and optimized a multi-layer Recurrent Neural Network (RNN) with cross-entropy loss minimization.',
      'Developed a real-time Streamlit web interface allowing recruiters to type prompts and view live generated next-word predictions.',
    ],
    tech: ['Python', 'PyTorch', 'RNN', 'Deep Learning', 'Streamlit', 'NLP Sequences'],
    metrics: [
      { label: 'Framework', value: 'PyTorch' },
      { label: 'Architecture', value: 'RNN Recurrent' },
      { label: 'Deployment', value: 'Streamlit UI' },
    ],
  },
  {
    id: 'naive-bayes-classification',
    title: 'Naive Bayes Text Classification Pipeline',
    type: 'NLP / Probabilistic ML',
    domain: 'Text Categorization',
    badge: '📝 PRODUCTION PIPELINE',
    featured: false,
    summary:
      'Developed an end-to-end text classification pipeline leveraging probabilistic Bayes theorems to categorize unstructured documents into discrete domains.',
    highlights: [
      'Standardized raw textual inputs using custom tokenization and feature extraction routines.',
      'Trained Multinomial Naive Bayes classifier tailored for high-dimensional sparse textual data.',
      'Evaluated precision, recall, and macro-F1 metrics to benchmark against baseline classifiers.',
    ],
    tech: ['Python', 'TF-IDF', 'Multinomial NB', 'Scikit-learn', 'Text Processing'],
    metrics: [
      { label: 'Model', value: 'Multinomial NB' },
      { label: 'Feature Space', value: 'TF-IDF Sparse' },
      { label: 'Evaluation', value: 'Macro F1' },
    ],
  },
];

export default function Projects() {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <section id="projects" className="lux-projects">
      <div className="container">
        
        {/* Section Header */}
        <div className="reveal">
          <div className="section-badge">
            <span className="dot"></span>
            <span>Genuine Case Studies</span>
          </div>
          <h2 className="section-title">
            Proven End-to-End <span className="gradient-text">Machine Learning Systems</span>
          </h2>
          <p className="section-subtitle">
            Every project listed is documented directly in Golla Sathish's resume with authentic methodology, metrics, and implementations.
          </p>
        </div>

        {/* Projects Stream */}
        <div className="projects-container-flow">
          
          {/* Laser Tracing Continuous Beam Wrapper for Flagship Capstone */}
          <div className="laser-border-box reveal stagger-1">
            <div className="project-flagship-card" style={{ border: 'none', background: 'transparent' }}>
              <div className="flagship-glass-inner">
                
                {/* Left Column Info */}
                <div className="flagship-content">
                  <div className="flagship-top-badge">
                    <span className="star-icon">★</span>
                    <span>{VERIFIED_PROJECTS[0].badge}</span>
                  </div>

                  <h3 className="flagship-title">{VERIFIED_PROJECTS[0].title}</h3>
                  <span className="flagship-sub">{VERIFIED_PROJECTS[0].domain}</span>

                  <p className="flagship-summary">{VERIFIED_PROJECTS[0].summary}</p>

                  <div className="flagship-bullet-list">
                    {VERIFIED_PROJECTS[0].highlights.map((item, i) => (
                      <div key={i} className="bullet-item">
                        <span className="bullet-arrow">▸</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flagship-tech-pills">
                    {VERIFIED_PROJECTS[0].tech.map((t) => (
                      <span key={t} className="tech-pill">{t}</span>
                    ))}
                  </div>
                </div>

                {/* Right Column Interactive Visual Pipeline */}
                <div className="flagship-pipeline-visual">
                  <div className="pipeline-terminal-header">
                    <span className="term-dot red"></span>
                    <span className="term-dot yellow"></span>
                    <span className="term-dot green"></span>
                    <span className="term-title">student_risk_pipeline.py</span>
                  </div>

                  <div className="pipeline-stages-stack">
                    
                    <div className="stage-row active-stage">
                      <div className="stage-num">01</div>
                      <div className="stage-info">
                        <div className="stage-title">Data Ingestion & Cleaning</div>
                        <div className="stage-meta">Handling missing values, outlier pruning</div>
                      </div>
                      <div className="stage-check">✓</div>
                    </div>

                    <div className="stage-connector"></div>

                    <div className="stage-row active-stage">
                      <div className="stage-num">02</div>
                      <div className="stage-info">
                        <div className="stage-title">Feature Engineering & Selection</div>
                        <div className="stage-meta">Categorical encoding, exam trajectory scores</div>
                      </div>
                      <div className="stage-check">✓</div>
                    </div>

                    <div className="stage-connector"></div>

                    <div className="stage-row active-stage">
                      <div className="stage-num">03</div>
                      <div className="stage-info">
                        <div className="stage-title">Model Training & Benchmarking</div>
                        <div className="stage-meta">Random Forest + Gradient Boosting tuning</div>
                      </div>
                      <div className="stage-check">✓</div>
                    </div>

                    <div className="stage-connector"></div>

                    <div className="stage-row active-stage">
                      <div className="stage-num">04</div>
                      <div className="stage-info">
                        <div className="stage-title">Institutional Report Documentation</div>
                        <div className="stage-meta">Flags at-risk students for academic counseling</div>
                      </div>
                      <div className="stage-check">✓</div>
                    </div>

                  </div>

                  <div className="pipeline-metrics-footer">
                    <div className="p-metric">
                      <span className="p-label">Algorithms</span>
                      <span className="p-val">RF & GBDT</span>
                    </div>
                    <div className="p-metric">
                      <span className="p-label">Classification</span>
                      <span className="p-val">At-Risk Alert</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Grid of Remaining Verified Projects */}
          <div className="projects-sub-grid">
            {VERIFIED_PROJECTS.slice(1).map((proj, idx) => (
              <div key={proj.id} className={`project-compact-card reveal stagger-${idx + 1}`}>
                
                <div className="compact-header">
                  <span className="compact-badge">{proj.badge}</span>
                  <span className="compact-type">{proj.type}</span>
                </div>

                <h3 className="compact-title">{proj.title}</h3>
                <p className="compact-summary">{proj.summary}</p>

                <ul className="compact-highlights">
                  {proj.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>

                <div className="compact-metrics-row">
                  {proj.metrics.map((m, i) => (
                    <div key={i} className="c-metric-cell">
                      <span className="cm-label">{m.label}</span>
                      <span className="cm-val">{m.value}</span>
                    </div>
                  ))}
                </div>

                <div className="compact-tech-tags">
                  {proj.tech.map((t) => (
                    <span key={t} className="c-tech-tag">{t}</span>
                  ))}
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
