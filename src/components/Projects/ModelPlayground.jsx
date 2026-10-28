import React, { useState } from 'react';
import './ModelPlayground.css';

const SENTIMENT_PRESETS = [
  { text: 'The model accurately predicts early academic intervention for students.', expected: 'Positive', conf: '96.4%' },
  { text: 'High exam anxiety combined with low attendance flags severe academic risk.', expected: 'Negative (Risk Alert)', conf: '92.8%' },
  { text: 'Exceptional deep learning benchmark results achieved on test datasets.', expected: 'Positive', conf: '95.1%' },
];

const RNN_PRESETS = [
  { prompt: 'Machine learning models require', predicted: 'continuous validation pipelines.', loss: '0.038', topK: ['continuous (64%)', 'robust (22%)', 'data (14%)'] },
  { prompt: 'PyTorch recurrent neural networks optimize', predicted: 'sequential gradient flow efficiently.', loss: '0.041', topK: ['sequential (71%)', 'hidden (18%)', 'tensor (11%)'] },
  { prompt: 'Student performance prediction enables', predicted: 'proactive academic advisory interventions.', loss: '0.029', topK: ['proactive (68%)', 'timely (20%)', 'institutional (12%)'] },
];

export default function ModelPlayground() {
  const [activeModel, setActiveModel] = useState('sentiment'); // 'sentiment' | 'rnn'
  const [inputText, setInputText] = useState(SENTIMENT_PRESETS[0].text);
  const [rnnPrompt, setRnnPrompt] = useState(RNN_PRESETS[0].prompt);
  const [isRunning, setIsRunning] = useState(false);
  const [inferenceResult, setInferenceResult] = useState({
    status: 'idle',
    label: 'Positive',
    confidence: '96.4%',
    tokens: 10,
    timeMs: 14.2,
    log: 'Pipeline ready. Select a preset or type a custom prompt to test inference.',
  });

  const handleRunSentiment = () => {
    setIsRunning(true);
    setInferenceResult((prev) => ({ ...prev, status: 'running', log: 'Tokenizing string -> Calculating TF-IDF weights -> Sigmoid activation...' }));

    setTimeout(() => {
      const lower = inputText.toLowerCase();
      const isNegative = lower.includes('risk') || lower.includes('anxiety') || lower.includes('low') || lower.includes('poor') || lower.includes('fail');
      const confNum = (88 + Math.random() * 9).toFixed(1);
      
      setInferenceResult({
        status: 'done',
        label: isNegative ? 'Academic Risk / Negative' : 'Positive Outcome',
        confidence: `${confNum}%`,
        tokens: inputText.trim().split(/\s+/).length,
        timeMs: (11 + Math.random() * 6).toFixed(1),
        log: `Inference completed in ${(11 + Math.random() * 6).toFixed(1)}ms. Serialized model Joblib artifact evaluated.`,
      });
      setIsRunning(false);
    }, 450);
  };

  const handleRunRNN = () => {
    setIsRunning(true);
    setInferenceResult((prev) => ({ ...prev, status: 'running', log: 'Feeding sequence tokens to PyTorch RNN hidden layer...' }));

    setTimeout(() => {
      const match = RNN_PRESETS.find((p) => p.prompt.toLowerCase() === rnnPrompt.toLowerCase()) || RNN_PRESETS[0];
      setInferenceResult({
        status: 'done',
        label: match.predicted,
        loss: match.loss,
        topK: match.topK,
        timeMs: (16 + Math.random() * 8).toFixed(1),
        log: `CrossEntropy loss minimized: ${match.loss}. Next token sampled from Softmax distribution.`,
      });
      setIsRunning(false);
    }, 550);
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
            Execute real-time inferences against simulated production models documented in Golla Sathish's portfolio.
          </p>
        </div>

        {/* Model Switcher Tabs */}
        <div className="model-switch-tabs">
          <button
            className={`tab-btn ${activeModel === 'sentiment' ? 'active' : ''}`}
            onClick={() => {
              setActiveModel('sentiment');
              setInputText(SENTIMENT_PRESETS[0].text);
            }}
          >
            Sentiment (TF-IDF ~90%)
          </button>
          <button
            className={`tab-btn ${activeModel === 'rnn' ? 'active' : ''}`}
            onClick={() => {
              setActiveModel('rnn');
              setRnnPrompt(RNN_PRESETS[0].prompt);
            }}
          >
            Next-Word (PyTorch RNN)
          </button>
        </div>
      </div>

      <div className="playground-body-grid">
        {/* Left Interactive Input Console */}
        <div className="playground-input-panel">
          <span className="panel-label">
            {activeModel === 'sentiment' ? 'INPUT TEXT FOR SENTIMENT CLASSIFICATION' : 'SEED PROMPT FOR SEQUENCE MODEL'}
          </span>

          {activeModel === 'sentiment' ? (
            <>
              <textarea
                className="playground-textarea"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type any textual sequence or student evaluation note..."
                rows={3}
              />
              <div className="presets-row">
                <span className="presets-title">Quick Presets:</span>
                {SENTIMENT_PRESETS.map((p, i) => (
                  <button
                    key={i}
                    className="preset-chip"
                    onClick={() => setInputText(p.text)}
                  >
                    Preset {i + 1}
                  </button>
                ))}
              </div>
              <button
                className="btn-run-inference"
                onClick={handleRunSentiment}
                disabled={isRunning || !inputText.trim()}
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
            </>
          ) : (
            <>
              <input
                type="text"
                className="playground-input"
                value={rnnPrompt}
                onChange={(e) => setRnnPrompt(e.target.value)}
                placeholder="Type an opening prompt..."
              />
              <div className="presets-row">
                <span className="presets-title">Seed Sequences:</span>
                {RNN_PRESETS.map((p, i) => (
                  <button
                    key={i}
                    className="preset-chip"
                    onClick={() => setRnnPrompt(p.prompt)}
                  >
                    Sequence {i + 1}
                  </button>
                ))}
              </div>
              <button
                className="btn-run-inference"
                onClick={handleRunRNN}
                disabled={isRunning || !rnnPrompt.trim()}
              >
                {isRunning ? (
                  <>
                    <span className="spinner-icon"></span>
                    <span>Forward Passing RNN Tensors...</span>
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 20 20" fill="currentColor" width="14" height="14">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                    <span>Predict Next Word Sequence</span>
                  </>
                )}
              </button>
            </>
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
              {activeModel === 'sentiment' ? 'TF-IDF_CLASSIFIER // INFERENCE_LOG' : 'PYTORCH_RNN // FORWARD_PASS'}
            </span>
            <span className="term-latency">{inferenceResult.timeMs || '12.4'}ms</span>
          </div>

          <div className="terminal-content-view">
            {activeModel === 'sentiment' ? (
              <div className="sentiment-result-card">
                <div className="res-row">
                  <span className="res-label">PREDICTED CLASS</span>
                  <span className={`res-badge ${inferenceResult.label?.includes('Risk') ? 'risk' : 'positive'}`}>
                    {inferenceResult.label || 'Positive Outcome'}
                  </span>
                </div>

                <div className="confidence-meter-group">
                  <div className="cm-header">
                    <span>MODEL CONFIDENCE</span>
                    <span className="cm-val">{inferenceResult.confidence || '96.4%'}</span>
                  </div>
                  <div className="meter-track">
                    <div
                      className={`meter-bar ${inferenceResult.label?.includes('Risk') ? 'bar-risk' : 'bar-positive'}`}
                      style={{ width: inferenceResult.confidence || '96.4%' }}
                    ></div>
                  </div>
                </div>

                <div className="telemetry-specs-row">
                  <div className="ts-cell">
                    <span className="ts-key">Vector Space</span>
                    <span className="ts-val">TF-IDF 1x5000</span>
                  </div>
                  <div className="ts-cell">
                    <span className="ts-key">Algorithm</span>
                    <span className="ts-val">Logistic Regression</span>
                  </div>
                  <div className="ts-cell">
                    <span className="ts-key">Serialized With</span>
                    <span className="ts-val">Joblib .pkl</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rnn-result-card">
                <div className="rnn-output-stream">
                  <span className="rnn-prompt-echo">{rnnPrompt}</span>
                  <span className="rnn-generated-stream"> {inferenceResult.label || 'continuous validation pipelines.'}</span>
                </div>

                <div className="topk-tokens-box">
                  <span className="topk-title">TOP-K SOFTMAX PROBABILITY DISTRIBUTION</span>
                  <div className="topk-pills">
                    {(inferenceResult.topK || RNN_PRESETS[0].topK).map((k, idx) => (
                      <span key={idx} className="topk-pill">{k}</span>
                    ))}
                  </div>
                </div>

                <div className="telemetry-specs-row">
                  <div className="ts-cell">
                    <span className="ts-key">Loss Minimization</span>
                    <span className="ts-val">{inferenceResult.loss || '0.038'} CrossEntropy</span>
                  </div>
                  <div className="ts-cell">
                    <span className="ts-key">Hidden Units</span>
                    <span className="ts-val">128 LSTM/RNN Cells</span>
                  </div>
                  <div className="ts-cell">
                    <span className="ts-key">Framework</span>
                    <span className="ts-val">PyTorch Neural Engine</span>
                  </div>
                </div>
              </div>
            )}

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
