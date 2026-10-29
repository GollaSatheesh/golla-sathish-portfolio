import React, { useState } from 'react';
import ModelPlayground from './ModelPlayground';
import MovingCards from '../MovingCards/MovingCards';
import './Projects.css';

const VERIFIED_PROJECTS = [
  {
    id: 'mnist-digit-classifier',
    title: 'MNIST Digit Classifier',
    type: 'Computer Vision / Deep Learning',
    domain: 'Handwritten Digit Recognition',
    category: 'cv',
    badge: '🚀 98.72% TEST ACCURACY',
    liveDemo: 'https://mnist-digit-classifiergit.streamlit.app/',
    github: 'https://github.com/GollaSatheesh/mnist-digit-classifier',
    summary:
      'Built and trained a 2-layer Convolutional Neural Network (206,922 parameters) in PyTorch on 60,000 MNIST images, deployed as an interactive Streamlit web app for real-time digit classification.',
    highlights: [
      'Built and trained a 2-layer CNN (206,922 parameters) in PyTorch on 60,000 MNIST images using Adam (lr 0.001, batch size 64); training loss fell from 0.23 to 0.02 in 5 epochs.',
      'Achieved 98.72% accuracy on the 10,000-image held-out test set.',
      'Deployed the saved model as a live Streamlit web app where users upload a handwritten digit image and get the predicted digit (0–9).',
    ],
    tech: ['PyTorch', 'CNN', 'Streamlit', 'Computer Vision', 'Adam Optimizer'],
    metrics: [
      { label: 'Test Accuracy', value: '98.72%' },
      { label: 'CNN Parameters', value: '206,922' },
      { label: 'Loss (5 Epochs)', value: '0.23 → 0.02' },
      { label: 'Dataset', value: '60,000 Images' },
    ],
  },
  {
    id: 'student-performance-prediction',
    title: 'Student Performance Prediction App',
    type: 'Machine Learning',
    domain: 'Early Academic Risk Modeling',
    category: 'ml',
    badge: '★ 92% RECALL (FAILING STUDENTS)',
    liveDemo: 'https://student-performance-prediction-s.streamlit.app/',
    github: 'https://github.com/GollaSatheesh/student-performance-prediction',
    summary:
      'Engineered a Logistic Regression classifier on 395 student records to predict pass/fail trajectories, catching 24 of 26 failing students with complete target leakage prevention.',
    highlights: [
      'Built a Logistic Regression classifier on 395 student records to predict pass/fail from first- and second-period grades, using a stratified 80/20 split (316 train / 79 test).',
      'Achieved 87.3% test accuracy (vs. 67% majority-class baseline) and caught 24 of 26 failing students (92% recall).',
      'Excluded the final grade to prevent target leakage, and deployed the model as an interactive Streamlit app with sliders for real-time predictions.',
    ],
    tech: ['Python', 'Scikit-learn', 'Logistic Regression', 'Streamlit', 'Data Preprocessing'],
    metrics: [
      { label: 'Test Accuracy', value: '87.3%' },
      { label: 'At-Risk Recall', value: '92% (24/26)' },
      { label: 'Baseline', value: '67% Majority' },
      { label: 'Leakage', value: 'Target Excluded' },
    ],
  },
  {
    id: 'rag-cross-encoder-reranking',
    title: 'RAG with Cross-Encoder Reranking',
    type: 'Generative AI / NLP',
    domain: 'Dense Retrieval & Answer Synthesis',
    category: 'genai',
    badge: '🧠 72% CONTEXT REDUCTION',
    liveDemo: 'https://ragusingreranking-w8i533qzzf2djpe8ptau6c.streamlit.app/',
    github: 'https://github.com/GollaSatheesh/RagReranking',
    summary:
      'Architected a two-stage Retrieval-Augmented Generation (RAG) system with LangChain and FAISS, enhanced by a cross-encoder reranker that cuts LLM context by 72% before Groq API generation.',
    highlights: [
      'Built a two-stage RAG pipeline with LangChain: split a 720-word document into 18 chunks (500 characters, 100 overlap), embedded with MiniLM-L6-v2, and indexed in FAISS (top-20 retrieval).',
      'Added a cross-encoder reranker (ms-marco-MiniLM-L-6-v2) that rescores each question–chunk pair and keeps the top 5, cutting the context sent to the LLM by 72% (5 of 18 chunks).',
      'Generated answers with gpt-oss-120b (Groq API) from the retrieved context only; deployed as a live Streamlit app.',
    ],
    tech: ['LangChain', 'FAISS', 'Cross-Encoder', 'Groq API', 'MiniLM-L6-v2', 'Streamlit'],
    metrics: [
      { label: 'Context Reduction', value: '72%' },
      { label: 'Initial Retrieval', value: 'Top-20 FAISS' },
      { label: 'Reranker Model', value: 'ms-marco-MiniLM' },
      { label: 'LLM Generation', value: 'gpt-oss-120b (Groq)' },
    ],
  },
  {
    id: 'sentiment-analysis-tfidf',
    title: 'Sentiment Analysis using TF-IDF and Logistic Regression',
    type: 'NLP / Machine Learning',
    domain: 'Movie Review Classification',
    category: 'nlp',
    badge: '⚡ ~90% TEST ACCURACY',
    liveDemo: null,
    github: 'https://github.com/GollaSatheesh',
    summary:
      'Engineered a sentiment classification pipeline classifying movie reviews as positive or negative, utilizing text preprocessing, TF-IDF vectorization, and Joblib serialization for zero-latency inference.',
    highlights: [
      'Built a system to classify movie reviews as positive or negative, using text preprocessing, TF-IDF vectorization, and Logistic Regression.',
      'Used a stratified train-test split and evaluated with Accuracy, Precision, Recall, and F1-score.',
      'Achieved ∼90% accuracy; serialized the vectorizer and model with Joblib.',
    ],
    tech: ['Python', 'Scikit-learn', 'TF-IDF', 'Logistic Regression', 'Joblib', 'NLP'],
    metrics: [
      { label: 'Test Accuracy', value: '~90%' },
      { label: 'Evaluation', value: 'Precision & F1' },
      { label: 'Train-Test Split', value: 'Stratified' },
      { label: 'Inference Artifact', value: 'Joblib Serialized' },
    ],
  },
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all');

  const matchesFilter = (category) => {
    if (activeFilter === 'all') return true;
    return activeFilter === category;
  };

  return (
    <section id="projects" className="lux-projects">
      <div className="container">
        
        {/* Section Header */}
        <div className="reveal">
          <div className="section-badge">
            <span className="dot"></span>
            <span>Resume-Verified Case Studies</span>
          </div>
          <h2 className="section-title">
            Proven End-to-End <span className="gradient-text stylish-serif-italic">Machine Learning Systems</span>
          </h2>
          <p className="section-subtitle">
            Every project listed is documented directly in Golla Sathish's official resume with authentic metrics, 
            interactive live Streamlit demos, and open-source GitHub repositories.
          </p>
        </div>

        {/* Interactive Domain Filter Tabs */}
        <div className="projects-filter-bar reveal stagger-1">
          {[
            { id: 'all', label: 'All Projects', count: 4 },
            { id: 'cv', label: 'Computer Vision & Deep Learning', count: 1 },
            { id: 'ml', label: 'Machine Learning', count: 1 },
            { id: 'genai', label: 'Generative AI & RAG', count: 1 },
            { id: 'nlp', label: 'NLP & Text Classification', count: 1 },
          ].map((tab) => (
            <button
              key={tab.id}
              className={`project-filter-btn ${activeFilter === tab.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(tab.id)}
            >
              <span>{tab.label}</span>
              <span className="filter-count">{tab.count}</span>
            </button>
          ))}
        </div>

        {/* Silicon Valley 12-Column Balanced Grid */}
        <div className="bento-grid-container">
          {VERIFIED_PROJECTS.map((project, index) => {
            const isMatch = matchesFilter(project.category);
            return (
              <div
                key={project.id}
                className={`bento-cell bento-span-6 spotlight-card reveal stagger-${(index % 2) + 1} ${
                  isMatch ? 'filter-active' : 'filter-dimmed'
                }`}
              >
                <div className="bento-cell-inner">
                  
                  {/* Top Badge & Domain */}
                  <div className="bento-badge-row">
                    <span className="bento-pill-badge badge-accent">
                      {project.badge}
                    </span>
                    <span className="bento-domain-tag">{project.type}</span>
                  </div>

                  <h3 className="bento-headline">{project.title}</h3>
                  <p className="bento-summary">{project.summary}</p>

                  {/* Highlights from Resume */}
                  <div className="bento-bullets">
                    {project.highlights.map((item, i) => (
                      <div key={i} className="bento-bullet-row">
                        <span className="bullet-indicator">›</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Metrics Strip */}
                  <div className="bento-metrics-strip">
                    {project.metrics.map((m, i) => (
                      <div key={i} className="bento-metric-chip">
                        <span className="bm-label">{m.label}</span>
                        <span className="bm-val">{m.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Chips */}
                  <div className="bento-tech-row">
                    {project.tech.map((t) => (
                      <span key={t} className="c-tech-tag">{t}</span>
                    ))}
                  </div>

                  {/* Action Links: Live Demo & GitHub Repo */}
                  <div className="bento-links-row">
                    {project.liveDemo && (
                      <a
                        href={project.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bento-link-btn btn-live-demo"
                        title={`Open live demo for ${project.title}`}
                      >
                        <span className="live-demo-dot"></span>
                        <span>Live Demo</span>
                        <span className="link-arrow">↗</span>
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bento-link-btn btn-github-code"
                        title={`View GitHub repository for ${project.title}`}
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                        </svg>
                        <span>GitHub</span>
                        <span className="link-arrow">↗</span>
                      </a>
                    )}
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Continuous Moving Showcase Cards Ribbon (TAP Academy Style) */}
        <div className="reveal stagger-2">
          <MovingCards />
        </div>

        {/* Live Interactive Model Inference Playground */}
        <div className="reveal stagger-2">
          <ModelPlayground />
        </div>

      </div>
    </section>
  );
}
