import React, { useState, useEffect } from 'react';
import './VisualConcept.css';

const CONCEPTS = [
  {
    id: 'random-forest',
    title: 'Random Forest Ensemble Voting',
    domain: 'Supervised ML / Institutional Capstone',
    badge: 'PARALLEL ENSEMBLE',
    summary:
      'Visual demonstration of how Sathish’s Student Performance Prediction system splits feature spaces across bootstrapped decision trees to aggregate a resilient majority vote.',
  },
  {
    id: 'nlp-tfidf',
    title: 'NLP Tokenization & TF-IDF Vector Space',
    domain: 'Natural Language Processing',
    badge: 'VECTOR SPACES',
    summary:
      'Visual breakdown of how unstructured text is parsed, tokenized, weighted via Term Frequency-Inverse Document Frequency, and projected for ~90% classification accuracy.',
  },
  {
    id: 'rnn-sequence',
    title: 'PyTorch RNN Recurrent State Flow',
    domain: 'Deep Learning / Sequence Modeling',
    badge: 'TEMPORAL MEMORY',
    summary:
      'Step-by-step sequential feedback loop showing how recurrent hidden states retain contextual memory across successive time steps to predict the next token.',
  },
];

export default function VisualConcept() {
  const [activeTab, setActiveTab] = useState('random-forest');
  const [animating, setAnimating] = useState(false);
  const [step, setStep] = useState(0);

  // Random Forest interactive state
  const [attendance, setAttendance] = useState(85);
  const [midtermScore, setMidtermScore] = useState(78);

  // NLP interactive state
  const [selectedTextIndex, setSelectedTextIndex] = useState(0);
  const nlpSentences = [
    { text: 'Model delivers outstanding predictive accuracy in validation tests.', sentiment: 'Positive', score: 94.8 },
    { text: 'Severe data leakage detected causing catastrophic validation degradation.', sentiment: 'Negative', score: 91.2 },
    { text: 'Standardized baseline classification pipeline with linear parameters.', sentiment: 'Neutral', score: 72.4 },
  ];

  // RNN interactive state
  const [rnnStep, setRnnStep] = useState(0);
  const rnnTokens = ['Machine', 'Learning', 'Engineer', 'in', 'Bangalore'];

  useEffect(() => {
    let timer;
    if (animating) {
      timer = setInterval(() => {
        setStep((prev) => (prev + 1) % 4);
      }, 900);
    }
    return () => clearInterval(timer);
  }, [animating]);

  // Derived Random Forest Predictions based on inputs
  const tree1Pred = attendance > 75 ? 'Low Risk' : 'High Risk';
  const tree2Pred = midtermScore > 65 ? 'Low Risk' : 'High Risk';
  const tree3Pred = (attendance + midtermScore) / 2 > 70 ? 'Low Risk' : 'High Risk';
  const votesLowRisk = [tree1Pred, tree2Pred, tree3Pred].filter(p => p === 'Low Risk').length;
  const finalDecision = votesLowRisk >= 2 ? 'Low Academic Risk (Pass Track)' : 'High Academic Risk (Intervention Needed)';
  const decisionClass = votesLowRisk >= 2 ? 'positive' : 'negative';

  return (
    <section id="visualizer" className="lux-visual-concept">
      <div className="container">

        {/* Section Header */}
        <div className="visual-header reveal">
          <div className="section-badge">
            <span className="dot"></span>
            <span>Animation-Based Architecture Visualizer</span>
          </div>
          <h2 className="section-title">
            Visualizing Complex <span className="gradient-text stylish-serif-italic">ML Algorithmic Pipelines</span>
          </h2>
          <p className="section-subtitle">
            Inspired by interactive visual learning engines: Explore how Sathish’s core models process inputs, 
            evaluate decision boundaries, and generate verified inferences in real time.
          </p>
        </div>

        {/* Navigation Tabs (TAP Academy Style) */}
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
              <span className="active-concept-name">
                {CONCEPTS.find(c => c.id === activeTab)?.title}
              </span>
            </div>
            <div className="concept-actions">
              <button
                className={`pulse-toggle-btn ${animating ? 'active' : ''}`}
                onClick={() => setAnimating(!animating)}
              >
                <span className="pulse-icon">{animating ? '⏸' : '▶'}</span>
                <span>{animating ? 'Pause Animation' : 'Animate Data Flow'}</span>
              </button>
            </div>
          </div>

          <div className="concept-summary-banner">
            <p>{CONCEPTS.find(c => c.id === activeTab)?.summary}</p>
          </div>

          {/* VISUALIZER 1: RANDOM FOREST ENSEMBLE */}
          {activeTab === 'random-forest' && (
            <div className="visual-body rf-visual">
              {/* Interactive Control Sliders */}
              <div className="rf-controls-panel">
                <div className="rf-control-group">
                  <div className="rf-control-header">
                    <label>Feature 1: Student Attendance ({attendance}%)</label>
                    <span className="feature-val">{attendance}%</span>
                  </div>
                  <input
                    type="range"
                    min="40"
                    max="100"
                    value={attendance}
                    onChange={(e) => setAttendance(Number(e.target.value))}
                    className="rf-range-slider"
                  />
                </div>

                <div className="rf-control-group">
                  <div className="rf-control-header">
                    <label>Feature 2: Midterm Exam Score ({midtermScore}/100)</label>
                    <span className="feature-val">{midtermScore}/100</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="100"
                    value={midtermScore}
                    onChange={(e) => setMidtermScore(Number(e.target.value))}
                    className="rf-range-slider"
                  />
                </div>
              </div>

              {/* Animated Architecture Diagram */}
              <div className="rf-architecture-flow">
                {/* Input Node */}
                <div className={`flow-node input-node ${step >= 0 ? 'active-pulse' : ''}`}>
                  <div className="node-icon">📥</div>
                  <div className="node-label">Input Sample Vector</div>
                  <div className="node-sub">[Att: {attendance}%, Midterm: {midtermScore}]</div>
                </div>

                {/* Flow Lines */}
                <div className="flow-split-connector">
                  <span className={`flow-packet packet-1 ${animating ? 'traveling' : ''}`}></span>
                  <span className={`flow-packet packet-2 ${animating ? 'traveling' : ''}`}></span>
                  <span className={`flow-packet packet-3 ${animating ? 'traveling' : ''}`}></span>
                </div>

                {/* 3 Trees */}
                <div className="rf-trees-row">
                  {/* Tree 1 */}
                  <div className={`rf-tree-card ${tree1Pred === 'Low Risk' ? 'pred-low' : 'pred-high'}`}>
                    <div className="tree-header">
                      <span className="tree-tag">Decision Tree #1</span>
                      <span className="tree-feature">Rule: Attendance &gt; 75%</span>
                    </div>
                    <div className="tree-eval">
                      {attendance > 75 ? 'Condition: TRUE' : 'Condition: FALSE'}
                    </div>
                    <div className="tree-outcome">
                      Vote: <strong>{tree1Pred}</strong>
                    </div>
                  </div>

                  {/* Tree 2 */}
                  <div className={`rf-tree-card ${tree2Pred === 'Low Risk' ? 'pred-low' : 'pred-high'}`}>
                    <div className="tree-header">
                      <span className="tree-tag">Decision Tree #2</span>
                      <span className="tree-feature">Rule: Midterm &gt; 65</span>
                    </div>
                    <div className="tree-eval">
                      {midtermScore > 65 ? 'Condition: TRUE' : 'Condition: FALSE'}
                    </div>
                    <div className="tree-outcome">
                      Vote: <strong>{tree2Pred}</strong>
                    </div>
                  </div>

                  {/* Tree 3 */}
                  <div className={`rf-tree-card ${tree3Pred === 'Low Risk' ? 'pred-low' : 'pred-high'}`}>
                    <div className="tree-header">
                      <span className="tree-tag">Decision Tree #3</span>
                      <span className="tree-feature">Rule: Composite Avg &gt; 70</span>
                    </div>
                    <div className="tree-eval">
                      {(attendance + midtermScore) / 2 > 70 ? 'Condition: TRUE' : 'Condition: FALSE'}
                    </div>
                    <div className="tree-outcome">
                      Vote: <strong>{tree3Pred}</strong>
                    </div>
                  </div>
                </div>

                {/* Majority Voting Output */}
                <div className={`rf-ensemble-result ${decisionClass}`}>
                  <div className="result-header">
                    <span className="result-badge">MAJORITY VOTING AGGREGATOR</span>
                    <span className="vote-count">{votesLowRisk} vs {3 - votesLowRisk} Tally</span>
                  </div>
                  <div className="result-prediction">
                    Final Model Output: <strong>{finalDecision}</strong>
                  </div>
                  <div className="result-footer">
                    <span>Ensemble Confidence: <strong>{Math.round((votesLowRisk >= 2 ? votesLowRisk : 3 - votesLowRisk) / 3 * 100)}%</strong></span>
                    <span>Verified Thesis Implementation</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VISUALIZER 2: NLP TF-IDF & VECTORIZATION */}
          {activeTab === 'nlp-tfidf' && (
            <div className="visual-body nlp-visual">
              {/* Preset Selector */}
              <div className="nlp-preset-selector">
                <span className="selector-label">Select Sample Linguistic Corpus:</span>
                <div className="preset-buttons">
                  {nlpSentences.map((s, idx) => (
                    <button
                      key={idx}
                      className={`preset-btn ${selectedTextIndex === idx ? 'active' : ''}`}
                      onClick={() => setSelectedTextIndex(idx)}
                    >
                      Sample #{idx + 1} ({s.sentiment})
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 1: Tokenizer Flow */}
              <div className="nlp-pipeline-stage">
                <div className="stage-title">
                  <span className="stage-num">01</span>
                  <span>Custom Regex Tokenization & Stopword Elimination</span>
                </div>
                <div className="token-chips-grid">
                  {nlpSentences[selectedTextIndex].text
                    .toLowerCase()
                    .replace(/[^a-z0-9 ]/g, '')
                    .split(' ')
                    .filter(w => !['in', 'with', 'the', 'and', 'a', 'to'].includes(w))
                    .map((token, i) => (
                      <span key={i} className="token-chip">
                        <span className="token-prefix">token_{i}:</span> {token}
                      </span>
                    ))}
                </div>
              </div>

              {/* Step 2: TF-IDF Weight Calculation */}
              <div className="nlp-pipeline-stage">
                <div className="stage-title">
                  <span className="stage-num">02</span>
                  <span>Term Frequency - Inverse Document Frequency (TF-IDF Matrix)</span>
                </div>
                <div className="tfidf-bars-container">
                  {[
                    { term: 'accuracy', weight: 0.88, idf: 'High' },
                    { term: 'predictive', weight: 0.74, idf: 'Med-High' },
                    { term: 'validation', weight: 0.62, idf: 'Med' },
                    { term: 'leakage', weight: selectedTextIndex === 1 ? 0.95 : 0.05, idf: 'High' },
                    { term: 'degradation', weight: selectedTextIndex === 1 ? 0.92 : 0.02, idf: 'High' },
                    { term: 'baseline', weight: selectedTextIndex === 2 ? 0.79 : 0.12, idf: 'Med' },
                  ].map((bar) => (
                    <div key={bar.term} className="tfidf-bar-row">
                      <span className="term-name">{bar.term}</span>
                      <div className="bar-track">
                        <div
                          className="bar-fill"
                          style={{
                            width: `${bar.weight * 100}%`,
                            background: bar.weight > 0.7 ? '#38bdf8' : 'rgba(56, 189, 248, 0.4)'
                          }}
                        ></div>
                      </div>
                      <span className="bar-val">{bar.weight.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 3: Classifier Hyperplane Output */}
              <div className="nlp-pipeline-stage result-stage">
                <div className="stage-title">
                  <span className="stage-num">03</span>
                  <span>Logistic Regression Hyperplane Classification (~90% Benchmark)</span>
                </div>
                <div className="nlp-classification-card">
                  <div className="nlp-score-badge">
                    Class: <strong>{nlpSentences[selectedTextIndex].sentiment}</strong>
                  </div>
                  <div className="nlp-score-val">
                    Confidence: <strong>{nlpSentences[selectedTextIndex].score}%</strong>
                  </div>
                  <div className="nlp-metric-proof">
                    Stratified Train-Test Split • Joblib Serialized Inference
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VISUALIZER 3: PYTORCH RNN RECURRENT FLOW */}
          {activeTab === 'rnn-sequence' && (
            <div className="visual-body rnn-visual">
              <div className="rnn-sequence-strip">
                <span className="seq-label">Time-Step Tokens:</span>
                <div className="seq-tokens-row">
                  {rnnTokens.map((tok, i) => (
                    <button
                      key={i}
                      className={`seq-token-pill ${rnnStep === i ? 'current-step' : ''}`}
                      onClick={() => setRnnStep(i)}
                    >
                      <span className="time-index">t={i}</span>
                      <span className="tok-name">{tok}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step Flow Diagram */}
              <div className="rnn-cell-stage">
                <div className="rnn-cell-card">
                  <div className="cell-header">
                    <span>PyTorch Recurrent Unit [Step t = {rnnStep}]</span>
                    <span className="cell-activation">Activation: tanh(W_hh · h_(t-1) + W_xh · x_t)</span>
                  </div>

                  <div className="cell-interactive-visual">
                    <div className="rnn-input-box">
                      <span className="box-tag">Input Token x_t</span>
                      <span className="box-val">"{rnnTokens[rnnStep]}"</span>
                    </div>

                    <div className="recurrent-loop">
                      <div className="loop-indicator">
                        <span className="loop-arrow">↺</span>
                        <span>Hidden Memory State h_{rnnStep}</span>
                      </div>
                      <div className="memory-vector-visual">
                        <span className="vec-dot active"></span>
                        <span className="vec-dot active"></span>
                        <span className="vec-dot"></span>
                        <span className="vec-dot active"></span>
                        <span className="vec-dot"></span>
                      </div>
                    </div>

                    <div className="rnn-output-box">
                      <span className="box-tag">Predicted Next Token</span>
                      <span className="box-val">
                        {rnnStep < rnnTokens.length - 1 ? `"${rnnTokens[rnnStep + 1]}"` : '"(End-Of-Seq)"'}
                      </span>
                    </div>
                  </div>

                  <div className="cell-footer-prob">
                    <span className="prob-label">Top Candidate Softmax Probabilities:</span>
                    <div className="candidate-bars">
                      <div className="cand-item">
                        <span>{rnnStep < rnnTokens.length - 1 ? rnnTokens[rnnStep + 1] : 'EOS'}</span>
                        <div className="cand-track"><div className="cand-fill" style={{ width: '84%' }}></div></div>
                        <span>84.2%</span>
                      </div>
                      <div className="cand-item">
                        <span>pipeline</span>
                        <div className="cand-track"><div className="cand-fill" style={{ width: '9%' }}></div></div>
                        <span>9.4%</span>
                      </div>
                      <div className="cand-item">
                        <span>model</span>
                        <div className="cand-track"><div className="cand-fill" style={{ width: '4%' }}></div></div>
                        <span>4.1%</span>
                      </div>
                    </div>
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
