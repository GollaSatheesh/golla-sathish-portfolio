import React, { useState, useEffect } from 'react';
import './VisualConcept.css';

const CONCEPTS = [
  {
    id: 'student-logistic',
    title: 'Student Performance App (Logistic Regression)',
    domain: 'Machine Learning / Classification',
    badge: '92% RECALL (FAILING STUDENTS)',
    liveDemo: 'https://student-performance-prediction-s.streamlit.app/',
    github: 'https://github.com/GollaSatheesh/student-performance-prediction',
    summary:
      'Interactive demonstration of Sathish’s Logistic Regression model on 395 student records predicting pass/fail from first- and second-period grades (G1 & G2) while preventing target leakage.',
  },
  {
    id: 'mnist-cnn',
    title: 'MNIST 2-Layer CNN (98.72% Accuracy)',
    domain: 'Computer Vision / PyTorch',
    badge: '206K PARAMETERS // ADAM',
    liveDemo: 'https://mnist-digit-classifiergit.streamlit.app/',
    github: 'https://github.com/GollaSatheesh/mnist-digit-classifier',
    summary:
      'Visual breakdown of the 2-layer CNN trained in PyTorch on 60,000 images, reducing training loss from 0.23 to 0.02 across 5 epochs and reaching 98.72% on the 10,000 test set.',
  },
  {
    id: 'rag-reranking',
    title: 'Two-Stage RAG with Cross-Encoder Reranker',
    domain: 'Generative AI / LangChain & FAISS',
    badge: '72% CONTEXT REDUCTION',
    liveDemo: 'https://ragusingreranking-w8i533qzzf2djpe8ptau6c.streamlit.app/',
    github: 'https://github.com/GollaSatheesh/RagReranking',
    summary:
      'Visual representation of LangChain document splitting (18 chunks), FAISS dense retrieval, and ms-marco cross-encoder reranking that cuts context by 72% before Groq LLM inference.',
  },
];

export default function VisualConcept() {
  const [activeTab, setActiveTab] = useState('student-logistic');
  const [animating, setAnimating] = useState(false);
  const [step, setStep] = useState(0);

  // Student Performance interactive state (G1, G2 grades: 0 to 20 scale)
  const [g1Grade, setG1Grade] = useState(12);
  const [g2Grade, setG2Grade] = useState(11);

  // MNIST interactive state
  const [selectedDigit, setSelectedDigit] = useState(7);
  const mnistSamples = [
    { digit: 0, conf: '99.1%', loss: '0.018' },
    { digit: 3, conf: '98.5%', loss: '0.022' },
    { digit: 7, conf: '99.4%', loss: '0.015' },
    { digit: 9, conf: '98.2%', loss: '0.024' },
  ];

  // RAG interactive state
  const [selectedQueryIdx, setSelectedQueryIdx] = useState(0);
  const ragQueries = [
    {
      q: 'How does the cross-encoder reduce context overhead?',
      totalChunks: 18,
      topK: 5,
      reduction: '72.2%',
      model: 'ms-marco-MiniLM-L-6-v2',
      llm: 'gpt-oss-120b (Groq API)',
    },
    {
      q: 'What is the embedding chunk size and overlap?',
      totalChunks: 18,
      topK: 5,
      reduction: '72.2%',
      model: 'MiniLM-L6-v2 + FAISS',
      llm: 'gpt-oss-120b (Groq API)',
    },
  ];

  useEffect(() => {
    let timer;
    if (animating) {
      timer = setInterval(() => {
        setStep((prev) => (prev + 1) % 4);
      }, 900);
    }
    return () => clearInterval(timer);
  }, [animating]);

  // Derived Logistic Regression Prediction: z = w1*G1 + w2*G2 - threshold
  const scoreRaw = g1Grade * 0.45 + g2Grade * 0.55;
  const isPassing = scoreRaw >= 10;
  const confidence = isPassing
    ? Math.min(99, Math.round(50 + (scoreRaw - 10) * 5))
    : Math.min(99, Math.round(50 + (10 - scoreRaw) * 6));
  const finalOutcome = isPassing ? 'Pass / Academic Safe' : 'Fail Risk (Needs Early Counseling)';
  const outcomeClass = isPassing ? 'positive' : 'negative';

  const activeObj = CONCEPTS.find((c) => c.id === activeTab);

  return (
    <section id="visualizer" className="lux-visual-concept">
      <div className="container">

        {/* Section Header */}
        <div className="visual-header reveal">
          <div className="section-badge">
            <span className="dot"></span>
            <span>Resume-Verified Architecture Visualizer</span>
          </div>
          <h2 className="section-title">
            Visualizing Complex <span className="gradient-text stylish-serif-italic">ML Algorithmic Pipelines</span>
          </h2>
          <p className="section-subtitle">
            Explore how Sathish’s verified projects process data, optimize parameters, and synthesize predictions. 
            All models are deployed live with Streamlit and GitHub open-source code.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="concept-nav-tabs reveal stagger-1">
          {CONCEPTS.map((c) => (
            <button
              key={c.id}
              className={`concept-tab-btn ${activeTab === c.id ? 'active' : ''}`}
              onClick={() => {
                setActiveTab(c.id);
                setStep(0);
              }}
            >
              <span className="tab-badge">{c.badge}</span>
              <span className="tab-title">{c.title}</span>
            </button>
          ))}
        </div>

        {/* Active Concept Showcase Container */}
        <div className="concept-display-card reveal stagger-2">
          
          {/* Header Bar */}
          <div className="concept-card-topbar">
            <div className="concept-topbar-meta">
              <span className="terminal-dot red"></span>
              <span className="terminal-dot yellow"></span>
              <span className="terminal-dot green"></span>
              <span className="active-concept-name">{activeObj?.title}</span>
            </div>
            
            <div className="concept-actions">
              {activeObj?.liveDemo && (
                <a
                  href={activeObj.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="concept-link-pill"
                >
                  <span>Live Demo ↗</span>
                </a>
              )}
              {activeObj?.github && (
                <a
                  href={activeObj.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="concept-link-pill"
                >
                  <span>GitHub ↗</span>
                </a>
              )}
            </div>
          </div>

          <div className="concept-summary-banner">
            <p>{activeObj?.summary}</p>
          </div>

          {/* VISUALIZER 1: STUDENT PERFORMANCE LOGISTIC REGRESSION */}
          {activeTab === 'student-logistic' && (
            <div className="visual-body rf-visual">
              {/* Interactive Control Sliders */}
              <div className="rf-controls-panel">
                <div className="rf-control-group">
                  <div className="rf-control-header">
                    <label>First-Period Grade (G1: {g1Grade}/20)</label>
                    <span className="feature-val">{g1Grade} / 20</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    value={g1Grade}
                    onChange={(e) => setG1Grade(Number(e.target.value))}
                    className="rf-range-slider"
                  />
                </div>

                <div className="rf-control-group">
                  <div className="rf-control-header">
                    <label>Second-Period Grade (G2: {g2Grade}/20)</label>
                    <span className="feature-val">{g2Grade} / 20</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    value={g2Grade}
                    onChange={(e) => setG2Grade(Number(e.target.value))}
                    className="rf-range-slider"
                  />
                </div>
              </div>

              {/* Architecture Flow */}
              <div className="rf-architecture-flow">
                <div className="flow-node input-node active-pulse">
                  <div className="node-icon">📥</div>
                  <div className="node-label">395 Student Records (Stratified 80/20 Split)</div>
                  <div className="node-sub">[Features: G1={g1Grade}, G2={g2Grade} • Final Grade G3 Excluded (Zero Leakage)]</div>
                </div>

                <div className="rf-trees-row">
                  <div className="rf-tree-card pred-low">
                    <div className="tree-header">
                      <span className="tree-tag">Step 01: Leakage Prevention</span>
                      <span className="tree-feature">Target Excluded</span>
                    </div>
                    <div className="tree-eval">Final Exam G3 Omitted</div>
                    <div className="tree-outcome">Prevents Overfitting: <strong>TRUE</strong></div>
                  </div>

                  <div className="rf-tree-card pred-low">
                    <div className="tree-header">
                      <span className="tree-tag">Step 02: Sigmoid Boundary</span>
                      <span className="tree-feature">z = w₁·G₁ + w₂·G₂ + b</span>
                    </div>
                    <div className="tree-eval">Calculated Score: {scoreRaw.toFixed(1)} / 20</div>
                    <div className="tree-outcome">Threshold: <strong>10.0 Passing</strong></div>
                  </div>

                  <div className={`rf-tree-card ${isPassing ? 'pred-low' : 'pred-high'}`}>
                    <div className="tree-header">
                      <span className="tree-tag">Step 03: Proactive Alert</span>
                      <span className="tree-feature">Failing Catch Rate</span>
                    </div>
                    <div className="tree-eval">92% Recall (24 of 26)</div>
                    <div className="tree-outcome">Status: <strong>{isPassing ? 'On Track' : 'Alert Triggered'}</strong></div>
                  </div>
                </div>

                {/* Outcome Card */}
                <div className={`rf-ensemble-result ${outcomeClass}`}>
                  <div className="result-header">
                    <span className="result-badge">LOGISTIC REGRESSION INFERENCE</span>
                    <span className="vote-count">87.3% Test Acc vs 67% Baseline</span>
                  </div>
                  <div className="result-prediction">
                    Predicted Trajectory: <strong>{finalOutcome}</strong>
                  </div>
                  <div className="result-footer">
                    <span>Model Confidence: <strong>{confidence}%</strong></span>
                    <span>Verified Resume App • 395 Records Split</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VISUALIZER 2: MNIST 2-LAYER CNN */}
          {activeTab === 'mnist-cnn' && (
            <div className="visual-body cnn-visual">
              <div className="nlp-preset-selector">
                <span className="selector-label">Select Handwritten Digit Sample:</span>
                <div className="preset-buttons">
                  {mnistSamples.map((s) => (
                    <button
                      key={s.digit}
                      className={`preset-btn ${selectedDigit === s.digit ? 'active' : ''}`}
                      onClick={() => setSelectedDigit(s.digit)}
                    >
                      Digit: "{s.digit}" ({s.conf})
                    </button>
                  ))}
                </div>
              </div>

              {/* CNN Pipeline Stages */}
              <div className="nlp-pipeline-stage">
                <div className="stage-title">
                  <span className="stage-num">01</span>
                  <span>Input 28×28 Grayscale Matrix &amp; 2-Layer Conv2D Architecture</span>
                </div>
                <div className="token-chips-grid">
                  <span className="token-chip"><span className="token-prefix">input:</span> [1, 28, 28]</span>
                  <span className="token-chip"><span className="token-prefix">conv1:</span> 2D Conv (3×3) + ReLU</span>
                  <span className="token-chip"><span className="token-prefix">pool:</span> MaxPool (2×2)</span>
                  <span className="token-chip"><span className="token-prefix">conv2:</span> 2D Conv (3×3) + ReLU</span>
                  <span className="token-chip"><span className="token-prefix">params:</span> 206,922 Total</span>
                  <span className="token-chip"><span className="token-prefix">optimizer:</span> Adam (lr=0.001, bs=64)</span>
                </div>
              </div>

              <div className="nlp-pipeline-stage">
                <div className="stage-title">
                  <span className="stage-num">02</span>
                  <span>Training Loss Convergence (5 Epochs)</span>
                </div>
                <div className="tfidf-bars-container">
                  {[
                    { epoch: 'Epoch 1', loss: '0.23', barW: '100%' },
                    { epoch: 'Epoch 2', loss: '0.11', barW: '48%' },
                    { epoch: 'Epoch 3', loss: '0.06', barW: '26%' },
                    { epoch: 'Epoch 4', loss: '0.03', barW: '13%' },
                    { epoch: 'Epoch 5 (Final)', loss: '0.02', barW: '8%' },
                  ].map((row) => (
                    <div key={row.epoch} className="tfidf-bar-row">
                      <span className="term-name">{row.epoch}</span>
                      <div className="bar-track">
                        <div className="bar-fill" style={{ width: row.barW, background: '#38bdf8' }}></div>
                      </div>
                      <span className="bar-val">loss: {row.loss}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="nlp-pipeline-stage result-stage">
                <div className="stage-title">
                  <span className="stage-num">03</span>
                  <span>10,000-Image Held-Out Test Set Benchmark</span>
                </div>
                <div className="nlp-classification-card">
                  <div className="nlp-score-badge">
                    Predicted Digit: <strong>{selectedDigit}</strong>
                  </div>
                  <div className="nlp-score-val">
                    Test Set Accuracy: <strong>98.72%</strong>
                  </div>
                  <div className="nlp-metric-proof">
                    PyTorch CNN Serialized • Deployed as Live Streamlit Canvas App
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VISUALIZER 3: TWO-STAGE RAG WITH CROSS-ENCODER */}
          {activeTab === 'rag-reranking' && (
            <div className="visual-body rag-visual">
              <div className="nlp-preset-selector">
                <span className="selector-label">Select Sample RAG Query:</span>
                <div className="preset-buttons">
                  {ragQueries.map((rq, idx) => (
                    <button
                      key={idx}
                      className={`preset-btn ${selectedQueryIdx === idx ? 'active' : ''}`}
                      onClick={() => setSelectedQueryIdx(idx)}
                    >
                      Query #{idx + 1}
                    </button>
                  ))}
                </div>
              </div>

              {/* RAG Pipeline Breakdown */}
              <div className="nlp-pipeline-stage">
                <div className="stage-title">
                  <span className="stage-num">Stage 1</span>
                  <span>LangChain Chunker &amp; FAISS Dense Vector Retrieval</span>
                </div>
                <div className="token-chips-grid">
                  <span className="token-chip"><span className="token-prefix">doc:</span> 720 Words</span>
                  <span className="token-chip"><span className="token-prefix">chunking:</span> 18 Chunks (500 chars, 100 overlap)</span>
                  <span className="token-chip"><span className="token-prefix">embedding:</span> MiniLM-L6-v2</span>
                  <span className="token-chip"><span className="token-prefix">vector_db:</span> FAISS (Top-20 Retrieved)</span>
                </div>
              </div>

              <div className="nlp-pipeline-stage">
                <div className="stage-title">
                  <span className="stage-num">Stage 2</span>
                  <span>Cross-Encoder Reranker (ms-marco-MiniLM-L-6-v2)</span>
                </div>
                <div className="tfidf-bars-container">
                  <div className="tfidf-bar-row">
                    <span className="term-name">Initial Chunks</span>
                    <div className="bar-track"><div className="bar-fill" style={{ width: '100%', background: 'rgba(255,255,255,0.2)' }}></div></div>
                    <span className="bar-val">18 chunks</span>
                  </div>
                  <div className="tfidf-bar-row">
                    <span className="term-name">Reranked Top 5</span>
                    <div className="bar-track"><div className="bar-fill" style={{ width: '28%', background: '#38bdf8' }}></div></div>
                    <span className="bar-val">5 chunks</span>
                  </div>
                </div>
                <p style={{ marginTop: '12px', fontSize: '0.85rem', color: '#38bdf8' }}>
                  ✓ Cross-encoder cuts LLM context payload by <strong>72% (from 18 down to 5 chunks)</strong>, preventing hallucination.
                </p>
              </div>

              <div className="nlp-pipeline-stage result-stage">
                <div className="stage-title">
                  <span className="stage-num">Stage 3</span>
                  <span>Grounded Generation via Groq API (gpt-oss-120b)</span>
                </div>
                <div className="nlp-classification-card">
                  <div className="nlp-score-badge">
                    LLM Engine: <strong>gpt-oss-120b (Groq API)</strong>
                  </div>
                  <div className="nlp-score-val">
                    Context Efficiency: <strong>72% Cut</strong>
                  </div>
                  <div className="nlp-metric-proof">
                    Answers synthesized from verified context only • Live Streamlit App
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
