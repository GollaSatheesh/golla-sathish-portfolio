import React, { useState } from 'react';
import './Projects.css';

const VERIFIED_PROJECTS = [
  {
    id: 'student-performance-prediction',
    title: 'Student Performance Prediction System',
    type: 'Supervised ML / Institutional Capstone',
    domain: 'Academic Risk Classification',
    badge: '★ INSTITUTIONAL CAPSTONE',
    featured: true,
    summary:
      'Engineered an early-alert machine learning classification system that analyzes historical exam trajectories and feature dimensions to identify at-risk students for academic counseling.',
    highlights: [
      'Engineered end-to-end data pipelines: outlier filtering, categorical encoding, and feature correlation matrix analysis.',
      'Trained, benchmarked, and hyperparameter-tuned Random Forest & Gradient Boosting models.',
      'Documented complete institutional findings in a formal academic engineering thesis.',
    ],
    tech: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Random Forest', 'GBDT'],
    metrics: [
      { label: 'Role', value: 'Lead Engineer' },
      { label: 'Models', value: 'RF & GBDT' },
      { label: 'Dataset', value: 'Institutional' },
      { label: 'Status', value: 'Verified Thesis' },
    ],
  },
  {
    id: 'sentiment-analysis-tfidf',
    title: 'Sentiment Analysis with TF-IDF & Logistic Regression',
    type: 'NLP / Supervised Classification',
    domain: 'Text Classification',
    badge: '🚀 ~90% TEST ACCURACY',
    featured: false,
    summary:
      'Engineered a high-precision binary text classification engine converting unstructured natural language into high-dimensional sparse representations.',
    highlights: [
      'Designed text sanitation pipeline: custom regex tokenization, stopword filtering, and n-gram TF-IDF vectorization.',
      'Achieved verifiable ~90% test accuracy with stratified train-test splits.',
      'Serialized production pipeline artifacts (.pkl) via Joblib for instant zero-latency inference.',
    ],
    tech: ['Python', 'Scikit-learn', 'TF-IDF', 'Logistic Regression', 'Joblib'],
    metrics: [
      { label: 'Verified Accuracy', value: '~90%' },
      { label: 'Metric Target', value: 'F1 Score & Precision' },
      { label: 'Inference', value: 'Joblib Serialized' },
    ],
  },
  {
    id: 'next-word-prediction-rnn',
    title: 'Next Word Prediction using RNN',
    type: 'Deep Learning / Sequence Modeling',
    domain: 'Generative NLP',
    badge: '🧠 PYTORCH RNN',
    featured: false,
    summary:
      'Constructed a sequential character/word prediction deep learning architecture in PyTorch with an interactive Streamlit inference web app.',
    highlights: [
      'Formulated sliding sequence tokenization windows with dynamic word-to-index embedding matrices.',
      'Trained multi-layer Recurrent Neural Networks (RNN) with cross-entropy loss optimization.',
      'Built a real-time Streamlit web app for prompt ingestion and live token generation.',
    ],
    tech: ['Python', 'PyTorch', 'RNN', 'Deep Learning', 'Streamlit', 'NLP'],
    metrics: [
      { label: 'Framework', value: 'PyTorch' },
      { label: 'Architecture', value: 'Multi-layer RNN' },
      { label: 'Deployment', value: 'Streamlit Web UI' },
    ],
  },
  {
    id: 'naive-bayes-classification',
    title: 'Naive Bayes Text Classification Pipeline',
    type: 'Probabilistic ML / NLP',
    domain: 'Text Categorization',
    badge: '📝 MULTINOMIAL NB',
    featured: false,
    summary:
      'Developed an end-to-end text categorization pipeline leveraging Bayes theorems to classify sparse textual data with statistical rigour.',
    highlights: [
      'Converted high-dimensional textual documents into weighted statistical token features.',
      'Trained Multinomial Naive Bayes classifier optimized for sparse word matrices.',
      'Benchmarked macro-F1, precision, and recall scores against baseline models.',
    ],
    tech: ['Python', 'TF-IDF', 'Multinomial NB', 'Scikit-learn', 'NLP'],
    metrics: [
      { label: 'Model', value: 'Multinomial NB' },
      { label: 'Feature Space', value: 'TF-IDF Sparse' },
      { label: 'Evaluation', value: 'Macro F1' },
    ],
  },
];

export default function Projects() {
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

        {/* Silicon Valley 12-Column Asymmetrical Bento Grid */}
        <div className="bento-grid-container">
          
          {/* Bento Cell 1: Flagship Capstone (8 Columns) */}
          <div className="bento-cell bento-span-8 spotlight-card reveal stagger-1">
            <div className="bento-cell-inner">
              
              <div className="bento-badge-row">
                <span className="bento-pill-badge badge-accent">
                  {VERIFIED_PROJECTS[0].badge}
                </span>
                <span className="bento-domain-tag">{VERIFIED_PROJECTS[0].domain}</span>
              </div>

              <h3 className="bento-headline">{VERIFIED_PROJECTS[0].title}</h3>
              <p className="bento-summary">{VERIFIED_PROJECTS[0].summary}</p>

              {/* Two-column internal layout: Highlights on left, visual pipeline terminal on right */}
              <div className="bento-flagship-body">
                <div className="flagship-left-highlights">
                  <div className="bento-bullets">
                    {VERIFIED_PROJECTS[0].highlights.map((item, i) => (
                      <div key={i} className="bento-bullet-row">
                        <span className="bullet-indicator">›</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bento-tech-row">
                    {VERIFIED_PROJECTS[0].tech.map((t) => (
                      <span key={t} className="c-tech-tag">{t}</span>
                    ))}
                  </div>
                </div>

                {/* Micro Pipeline Terminal */}
                <div className="bento-terminal-box">
                  <div className="terminal-topbar">
                    <span className="t-dot t-red"></span>
                    <span className="t-dot t-yellow"></span>
                    <span className="t-dot t-green"></span>
                    <span className="t-filename">student_risk_pipeline.py</span>
                  </div>
                  <div className="terminal-stages">
                    <div className="t-stage">
                      <span className="t-num">01</span>
                      <span className="t-name">Data Ingestion & Cleaning</span>
                      <span className="t-check">✓</span>
                    </div>
                    <div className="t-stage">
                      <span className="t-num">02</span>
                      <span className="t-name">Feature Correlation Selection</span>
                      <span className="t-check">✓</span>
                    </div>
                    <div className="t-stage">
                      <span className="t-num">03</span>
                      <span className="t-name">RF & Gradient Boosting Tuning</span>
                      <span className="t-check">✓</span>
                    </div>
                    <div className="t-stage">
                      <span className="t-num">04</span>
                      <span className="t-name">Institutional Report Thesis</span>
                      <span className="t-check">✓</span>
                    </div>
                  </div>
                  <div className="terminal-footer-metrics">
                    <div className="tf-metric">
                      <span className="tf-label">Models</span>
                      <span className="tf-val">Random Forest & GBDT</span>
                    </div>
                    <div className="tf-metric">
                      <span className="tf-label">Deployment</span>
                      <span className="tf-val">At-Risk Early Alert</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Bento Cell 2: Secondary Highlight Sentiment Analysis (4 Columns) */}
          <div className="bento-cell bento-span-4 spotlight-card reveal stagger-2">
            <div className="bento-cell-inner">
              <div className="bento-badge-row">
                <span className="bento-pill-badge badge-cyan">
                  {VERIFIED_PROJECTS[1].badge}
                </span>
                <span className="bento-domain-tag">{VERIFIED_PROJECTS[1].type}</span>
              </div>

              <h3 className="bento-headline">{VERIFIED_PROJECTS[1].title}</h3>
              <p className="bento-summary">{VERIFIED_PROJECTS[1].summary}</p>

              <div className="bento-metrics-strip">
                {VERIFIED_PROJECTS[1].metrics.map((m, i) => (
                  <div key={i} className="bento-metric-chip">
                    <span className="bm-label">{m.label}</span>
                    <span className="bm-val">{m.value}</span>
                  </div>
                ))}
              </div>

              <div className="bento-bullets">
                {VERIFIED_PROJECTS[1].highlights.map((item, i) => (
                  <div key={i} className="bento-bullet-row">
                    <span className="bullet-indicator">›</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="bento-tech-row">
                {VERIFIED_PROJECTS[1].tech.map((t) => (
                  <span key={t} className="c-tech-tag">{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Bento Cell 3: Next Word Prediction RNN (4 Columns) */}
          <div className="bento-cell bento-span-4 spotlight-card reveal stagger-3">
            <div className="bento-cell-inner">
              <div className="bento-badge-row">
                <span className="bento-pill-badge badge-indigo">
                  {VERIFIED_PROJECTS[2].badge}
                </span>
                <span className="bento-domain-tag">{VERIFIED_PROJECTS[2].domain}</span>
              </div>

              <h3 className="bento-headline">{VERIFIED_PROJECTS[2].title}</h3>
              <p className="bento-summary">{VERIFIED_PROJECTS[2].summary}</p>

              <div className="bento-metrics-strip">
                {VERIFIED_PROJECTS[2].metrics.map((m, i) => (
                  <div key={i} className="bento-metric-chip">
                    <span className="bm-label">{m.label}</span>
                    <span className="bm-val">{m.value}</span>
                  </div>
                ))}
              </div>

              <div className="bento-bullets">
                {VERIFIED_PROJECTS[2].highlights.map((item, i) => (
                  <div key={i} className="bento-bullet-row">
                    <span className="bullet-indicator">›</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="bento-tech-row">
                {VERIFIED_PROJECTS[2].tech.map((t) => (
                  <span key={t} className="c-tech-tag">{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Bento Cell 4: Naive Bayes Classification (4 Columns) */}
          <div className="bento-cell bento-span-4 spotlight-card reveal stagger-4">
            <div className="bento-cell-inner">
              <div className="bento-badge-row">
                <span className="bento-pill-badge badge-default">
                  {VERIFIED_PROJECTS[3].badge}
                </span>
                <span className="bento-domain-tag">{VERIFIED_PROJECTS[3].domain}</span>
              </div>

              <h3 className="bento-headline">{VERIFIED_PROJECTS[3].title}</h3>
              <p className="bento-summary">{VERIFIED_PROJECTS[3].summary}</p>

              <div className="bento-metrics-strip">
                {VERIFIED_PROJECTS[3].metrics.map((m, i) => (
                  <div key={i} className="bento-metric-chip">
                    <span className="bm-label">{m.label}</span>
                    <span className="bm-val">{m.value}</span>
                  </div>
                ))}
              </div>

              <div className="bento-bullets">
                {VERIFIED_PROJECTS[3].highlights.map((item, i) => (
                  <div key={i} className="bento-bullet-row">
                    <span className="bullet-indicator">›</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="bento-tech-row">
                {VERIFIED_PROJECTS[3].tech.map((t) => (
                  <span key={t} className="c-tech-tag">{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Bento Cell 5: Technical Ecosystem Deep Dive (4 Columns) */}
          <div className="bento-cell bento-span-4 spotlight-card reveal stagger-4">
            <div className="bento-cell-inner bento-deep-dive">
              <div className="bento-badge-row">
                <span className="bento-pill-badge badge-accent">
                  ⚡ PRODUCTION ECOSYSTEM
                </span>
                <span className="bento-domain-tag">Engineering Standards</span>
              </div>

              <h3 className="bento-headline">Data Science & ML Pipeline Standards</h3>
              <p className="bento-summary">
                Rigorous mathematical foundations combined with modular Python code, Git version control, and reproducible Jupyter & VS Code workflows.
              </p>

              <div className="bento-spec-grid">
                <div className="spec-card-cell">
                  <span className="sc-val">Python & SQL</span>
                  <span className="sc-desc">Core Languages</span>
                </div>
                <div className="spec-card-cell">
                  <span className="sc-val">Scikit-learn</span>
                  <span className="sc-desc">Supervised ML</span>
                </div>
                <div className="spec-card-cell">
                  <span className="sc-val">PyTorch</span>
                  <span className="sc-desc">Neural Sequences</span>
                </div>
                <div className="spec-card-cell">
                  <span className="sc-val">Streamlit</span>
                  <span className="sc-desc">Web Model UI</span>
                </div>
              </div>

              <div className="bento-verified-footer">
                <span className="verified-dot"></span>
                <span>All implementations benchmarked with verified metrics</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
