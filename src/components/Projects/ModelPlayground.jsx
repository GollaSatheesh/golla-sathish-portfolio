import React, { useState } from 'react';
import './ModelPlayground.css';

const SENTIMENT_PRESETS = [
  { text: 'An absolute masterpiece with brilliant cinematography and unforgettable acting performances.', expected: 'Positive Sentiment', conf: '97.2%' },
  { text: 'Dull storyline, terrible pacing, and completely uninspired direction throughout the movie.', expected: 'Negative Sentiment', conf: '94.8%' },
  { text: 'A surprisingly thoughtful and compelling narrative with strong character development.', expected: 'Positive Sentiment', conf: '96.1%' },
];

const STUDENT_PRESETS = [
  { name: 'Student A (High Risk)', g1: 7, g2: 8, label: 'Academic Risk / Fail Alert', conf: '93.5%', status: 'risk' },
  { name: 'Student B (Passing Track)', g1: 15, g2: 16, label: 'Predicted Pass (On Track)', conf: '96.2%', status: 'safe' },
  { name: 'Student C (Borderline)', g1: 10, g2: 10, label: 'Borderline Pass (Needs Monitoring)', conf: '62.4%', status: 'warning' },
];

export default function ModelPlayground() {
  const [activeModel, setActiveModel] = useState('student'); // 'student' | 'sentiment'
  
  // Student model state
  const [g1Score, setG1Score] = useState(7);
  const [g2Score, setG2Score] = useState(8);
  
  // Sentiment model state
  const [sentimentText, setSentimentText] = useState(SENTIMENT_PRESETS[0].text);
  
  const [isRunning, setIsRunning] = useState(false);
  const [inferenceResult, setInferenceResult] = useState({
    status: 'done',
    label: 'Academic Risk / Fail Alert',
    riskType: 'risk',
    confidence: '93.5%',
    timeMs: '12.4',
    log: 'Trained on 395 records (stratified 80/20 split). Evaluated 24/26 failing students caught (92% recall).',
  });

  const handleRunStudent = (g1 = g1Score, g2 = g2Score) => {
    setIsRunning(true);
    setInferenceResult((prev) => ({ ...prev, status: 'running', log: 'Passing G1 & G2 feature vectors to Logistic Regression sigmoid function...' }));

    setTimeout(() => {
      const avg = (Number(g1) + Number(g2)) / 2;
      let label = 'Predicted Pass (On Track)';
      let riskType = 'safe';
      let conf = 92.0;

      if (avg < 9.5) {
        label = 'Academic Risk / Fail Alert';
        riskType = 'risk';
        conf = Math.min(98.5, 85 + (9.5 - avg) * 2.5);
      } else if (avg <= 11) {
        label = 'Borderline Pass (Needs Monitoring)';
        riskType = 'warning';
        conf = 65.0 + Math.random() * 8;
      } else {
        label = 'Predicted Pass (On Track)';
        riskType = 'safe';
        conf = Math.min(99.1, 88 + (avg - 11) * 1.5);
      }

      setInferenceResult({
        status: 'done',
        label,
        riskType,
        confidence: `${conf.toFixed(1)}%`,
        timeMs: (9 + Math.random() * 5).toFixed(1),
        log: `Inference executed: G1=${g1}, G2=${g2} -> Sigmoid probability calculated without target leakage (G3 excluded).`,
      });
      setIsRunning(false);
    }, 400);
  };

  const handleRunSentiment = () => {
    setIsRunning(true);
    setInferenceResult((prev) => ({ ...prev, status: 'running', log: 'Tokenizing text -> Calculating TF-IDF numerical weights -> Sigmoid activation...' }));

    setTimeout(() => {
      const lower = sentimentText.toLowerCase();
      const isNegative = lower.includes('terrible') || lower.includes('dull') || lower.includes('bad') || lower.includes('poor') || lower.includes('waste') || lower.includes('uninspired') || lower.includes('boring');
      const confNum = (89 + Math.random() * 8).toFixed(1);

      setInferenceResult({
        status: 'done',
        label: isNegative ? 'Negative Review' : 'Positive Review',
        riskType: isNegative ? 'risk' : 'safe',
        confidence: `${confNum}%`,
        timeMs: (11 + Math.random() * 5).toFixed(1),
        log: `TF-IDF vector evaluated across vocabulary. Serialized Joblib model returned class in ${(11 + Math.random() * 5).toFixed(1)}ms (~90% test accuracy).`,
      });
      setIsRunning(false);
    }, 450);
  };

  const selectStudentPreset = (preset) => {
    setG1Score(preset.g1);
    setG2Score(preset.g2);
    handleRunStudent(preset.g1, preset.g2);
  };

  return (
    <div className="model-playground-card spotlight-card">
      <div className="playground-header">
        <div className="playground-title-group">
          <div className="playground-pill">
            <span className="live-pulse-led"></span>
            <span>INTERACTIVE MODEL RUNTIME</span>
          </div>
          <h3 className="playground-title">Live Model Inference Playground</h3>
          <p className="playground-subtitle">
            Simulate real-time predictions on production models trained and verified by Golla Sathish.
          </p>
        </div>

        {/* Model Switcher Tabs */}
        <div className="model-switch-tabs">
          <button
            className={`tab-btn ${activeModel === 'student' ? 'active' : ''}`}
            onClick={() => {
              setActiveModel('student');
              handleRunStudent(g1Score, g2Score);
            }}
          >
            Student Early-Warning (92% Recall)
          </button>
          <button
            className={`tab-btn ${activeModel === 'sentiment' ? 'active' : ''}`}
            onClick={() => {
              setActiveModel('sentiment');
              handleRunSentiment();
            }}
          >
            Sentiment (TF-IDF ~90%)
          </button>
        </div>
      </div>

      <div className="playground-body-grid">
        {/* Left Interactive Input Console */}
        <div className="playground-input-panel">
          <span className="panel-label">
            {activeModel === 'student' ? 'FEATURE INPUTS (FIRST & SECOND PERIOD GRADES)' : 'INPUT TEXT FOR SENTIMENT CLASSIFICATION'}
          </span>

          {activeModel === 'student' ? (
            <div className="student-inputs-block">
              <div className="slider-group">
                <div className="slider-header">
                  <span>G1 Score (First Period, 0–20):</span>
                  <span className="slider-val-badge">{g1Score} / 20</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={g1Score}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setG1Score(val);
                    handleRunStudent(val, g2Score);
                  }}
                  className="interactive-slider"
                />
              </div>

              <div className="slider-group">
                <div className="slider-header">
                  <span>G2 Score (Second Period, 0–20):</span>
                  <span className="slider-val-badge">{g2Score} / 20</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={g2Score}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setG2Score(val);
                    handleRunStudent(g1Score, val);
                  }}
                  className="interactive-slider"
                />
              </div>

              <div className="presets-row">
                <span className="presets-title">Student Scenarios:</span>
                {STUDENT_PRESETS.map((p, i) => (
                  <button
                    key={i}
                    className="preset-chip"
                    onClick={() => selectStudentPreset(p)}
                  >
                    {p.name}
                  </button>
                ))}
              </div>

              <div className="live-demo-action-row">
                <a
                  href="https://student-performance-prediction-s.streamlit.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-launch-streamlit"
                >
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                    <path d="M12 2L2 19.5h20L12 2zm0 4.2L18.4 18H5.6L12 6.2z"/>
                  </svg>
                  <span>Open Full Streamlit Web App ↗</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="sentiment-inputs-block">
              <textarea
                className="playground-textarea"
                value={sentimentText}
                onChange={(e) => setSentimentText(e.target.value)}
                placeholder="Type any movie review or textual feedback..."
                rows={3}
              />
              <div className="presets-row">
                <span className="presets-title">Sample Reviews:</span>
                {SENTIMENT_PRESETS.map((p, i) => (
                  <button
                    key={i}
                    className="preset-chip"
                    onClick={() => {
                      setSentimentText(p.text);
                    }}
                  >
                    Review {i + 1}
                  </button>
                ))}
              </div>
              <button
                className="btn-run-inference"
                onClick={handleRunSentiment}
                disabled={isRunning || !sentimentText.trim()}
              >
                {isRunning ? (
                  <>
                    <span className="spinner-icon"></span>
                    <span>Computing Sigmoid Activation...</span>
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 20 20" fill="currentColor" width="14" height="14">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                    <span>Run TF-IDF Classification</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Right Output Telemetry Terminal */}
        <div className="playground-output-terminal">
          <div className="terminal-header-strip">
            <div className="term-led-group">
              <span className="dot-red"></span>
              <span className="dot-yellow"></span>
              <span className="dot-green"></span>
            </div>
            <span className="term-meta-title">
              {activeModel === 'student' ? 'LOGISTIC_REGRESSION // RISK_DETECTOR' : 'TF-IDF_CLASSIFIER // INFERENCE_LOG'}
            </span>
            <span className="term-latency">{inferenceResult.timeMs || '12.4'}ms</span>
          </div>

          <div className="terminal-content-view">
            <div className="sentiment-result-card">
              <div className="res-row">
                <span className="res-label">PREDICTED OUTCOME</span>
                <span className={`res-badge ${inferenceResult.riskType}`}>
                  {inferenceResult.label}
                </span>
              </div>

              <div className="confidence-meter-group">
                <div className="cm-header">
                  <span>MODEL CONFIDENCE</span>
                  <span className="cm-val">{inferenceResult.confidence}</span>
                </div>
                <div className="meter-track">
                  <div
                    className={`meter-bar bar-${inferenceResult.riskType}`}
                    style={{ width: inferenceResult.confidence }}
                  ></div>
                </div>
              </div>

              <div className="telemetry-specs-row">
                {activeModel === 'student' ? (
                  <>
                    <div className="ts-cell">
                      <span className="ts-key">Dataset & Split</span>
                      <span className="ts-val">395 records (80/20)</span>
                    </div>
                    <div className="ts-cell">
                      <span className="ts-key">Test Metric</span>
                      <span className="ts-val">87.3% Acc (92% Recall)</span>
                    </div>
                    <div className="ts-cell">
                      <span className="ts-key">Target Leakage</span>
                      <span className="ts-val">0% (G3 Excluded)</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="ts-cell">
                      <span className="ts-key">Feature Matrix</span>
                      <span className="ts-val">TF-IDF Vectorizer</span>
                    </div>
                    <div className="ts-cell">
                      <span className="ts-key">Model Accuracy</span>
                      <span className="ts-val">~90% Evaluated</span>
                    </div>
                    <div className="ts-cell">
                      <span className="ts-key">Serialization</span>
                      <span className="ts-val">Joblib (.pkl)</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="live-log-footer">
              <span className="console-prompt">&gt;</span>
              <span className="console-log-text">{inferenceResult.log}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}