import React, { useEffect, useState } from 'react';
import './Workflow.css';

const WORKFLOW_STEPS = [
  {
    step: 'PHASE 01',
    title: 'Data Ingestion & Rigorous EDA',
    icon: '🔍',
    description:
      'Statistical profiling with Pandas & NumPy, distribution curve checking, handling missing values, and identifying outlier anomalies.',
    artifacts: ['Histograms / Boxplots', 'Missingness Imputation', 'Correlational Matrices'],
  },
  {
    step: 'PHASE 02',
    title: 'Feature Engineering & NLP Vectorization',
    icon: '⚙️',
    description:
      'Categorical encoding, scaling, tokenization, stopword elimination, stemming/lemmatization, and TF-IDF numerical conversion.',
    artifacts: ['TF-IDF Matrix', 'Standard Scaler', 'Feature Importance Selection'],
  },
  {
    step: 'PHASE 03',
    title: 'Model Training & Neural Architecture',
    icon: '🤖',
    description:
      'Training Scikit-learn ensembles (Random Forest, Gradient Boosting) and PyTorch sequential architectures (RNNs) with cross-validation.',
    artifacts: ['Stratified Train-Test Split', 'Loss Optimization', 'Hyperparameter Tuning'],
  },
  {
    step: 'PHASE 04',
    title: 'Model Evaluation & Production Artifacts',
    icon: '📊',
    description:
      'Benchmarking Accuracy, Precision, Recall, F1-scores, serializing models using Joblib, and building real-time Streamlit interfaces.',
    artifacts: ['~90% Evaluated Accuracy', 'Joblib .pkl Bundles', 'Interactive Streamlit UI'],
  },
];

export default function Workflow() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('workflow');
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (rect.height + window.innerHeight * 0.4)));
      const stepIndex = Math.min(3, Math.floor(progress * 4));
      setActiveStep(stepIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="workflow" className="lux-workflow">
      <div className="container">
        
        {/* Section Header */}
        <div className="reveal">
          <div className="section-badge">
            <span className="dot"></span>
            <span>Engineering Discipline</span>
          </div>
          <h2 className="section-title">
            The Systematic <span className="gradient-text">Data Science Lifecycle</span>
          </h2>
          <p className="section-subtitle">
            How I transform ambiguous, unstructured enterprise problems into evaluated, serialized prediction systems.
          </p>
        </div>

        {/* 4-Step Interactive Process Matrix with Scroll-Linked Progression */}
        <div className="workflow-matrix-grid">
          {WORKFLOW_STEPS.map((wf, idx) => {
            const isCurrent = activeStep === idx;
            const isCompleted = activeStep > idx;
            return (
              <div
                key={wf.step}
                className={`workflow-matrix-card reveal stagger-${idx + 1} ${
                  isCurrent ? 'pipeline-active' : isCompleted ? 'pipeline-completed' : ''
                }`}
                onMouseEnter={() => setActiveStep(idx)}
              >
                
                <div className="matrix-top">
                  <span className="matrix-phase-tag">
                    {wf.step}
                    {isCurrent && <span className="active-pulse-pip"></span>}
                  </span>
                  <div className="matrix-icon-bubble">{wf.icon}</div>
                </div>

                <h3 className="matrix-title">{wf.title}</h3>
                <p className="matrix-desc">{wf.description}</p>

                <div className="matrix-deliverables">
                  <span className="deliv-label">KEY DELIVERABLES:</span>
                  <div className="deliv-tags">
                    {wf.artifacts.map((art) => (
                      <span key={art} className="deliv-pill">
                        {art}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Connecting Accent Arrow */}
                {idx < WORKFLOW_STEPS.length - 1 && (
                  <div className={`matrix-flow-arrow ${isCompleted || isCurrent ? 'arrow-lit' : ''}`} aria-hidden="true">→</div>
                )}

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
