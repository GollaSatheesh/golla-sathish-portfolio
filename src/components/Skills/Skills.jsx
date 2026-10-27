import React from 'react';
import './Skills.css';

const SKILL_DOMAINS = [
  {
    title: 'Programming & Core DS',
    badge: 'LANGUAGES & ENGINES',
    icon: '⚡',
    description: 'Foundational programming environments and numerical acceleration libraries for processing enterprise data.',
    skills: ['Python', 'SQL', 'Pandas', 'NumPy', 'Data Cleaning', 'EDA', 'Feature Engineering'],
  },
  {
    title: 'Supervised Machine Learning',
    badge: 'ALGORITHMS & PIPELINES',
    icon: '⚙️',
    description: 'Robust predictive modeling covering regression, classification, ensemble algorithms, and gradient boosting.',
    skills: [
      'Random Forest',
      'Gradient Boosting',
      'XGBoost',
      'LightGBM',
      'Logistic Regression',
      'Linear / Ridge / Lasso',
      'Decision Tree',
      'KNN',
      'SVM',
      'Naive Bayes',
    ],
  },
  {
    title: 'Unsupervised Machine Learning',
    badge: 'CLUSTERING & REDUCTION',
    icon: '🔮',
    description: 'Uncovering latent patterns, manifold projections, and density-based segmentations without labels.',
    skills: ['K-Means', 'Hierarchical Clustering', 'DBSCAN', 'PCA (Principal Component Analysis)'],
  },
  {
    title: 'Deep Learning & Neural Architectures',
    badge: 'PYTORCH & TENSOR FLOW',
    icon: '🧠',
    description: 'Modern neural networks for sequence modeling, computer vision, and pre-trained transfer learning.',
    skills: ['PyTorch', 'CNN', 'RNN (Recurrent Neural Networks)', 'Transfer Learning'],
  },
  {
    title: 'Natural Language Processing (NLP)',
    badge: 'LINGUISTIC COMPUTING',
    icon: '💬',
    description: 'Converting unstructured linguistic corpora into semantic vector spaces for classification and generation.',
    skills: [
      'Text Preprocessing',
      'Tokenization',
      'Stopword Removal',
      'Stemming & Lemmatization',
      'TF-IDF Vectorization',
    ],
  },
  {
    title: 'Visualization & Dev Ecosystem',
    badge: 'DEVELOPER TOOLING',
    icon: '🛠️',
    description: 'Interactive analytics, storytelling visualizations, reproducible notebooks, and version control.',
    skills: [
      'Matplotlib',
      'Seaborn',
      'Streamlit',
      'VS Code',
      'Jupyter Notebook',
      'Git / GitHub',
      'Joblib',
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="lux-skills">
      <div className="container">
        
        {/* Header */}
        <div className="reveal">
          <div className="section-badge">
            <span className="dot"></span>
            <span>Technical Mastery</span>
          </div>
          <h2 className="section-title">
            Enterprise Machine Learning & <span className="gradient-text">Data Science Stack</span>
          </h2>
          <p className="section-subtitle">
            Every tool and methodology listed has been applied in practical project implementations and verified pipelines.
          </p>
        </div>

        {/* 6-Card High Density Grid */}
        <div className="skills-domain-grid">
          {SKILL_DOMAINS.map((domain, index) => (
            <div key={domain.title} className={`skill-domain-card reveal stagger-${(index % 3) + 1}`}>
              
              <div className="domain-card-header">
                <div className="domain-icon-wrapper">
                  <span>{domain.icon}</span>
                </div>
                <div className="domain-header-meta">
                  <span className="domain-badge">{domain.badge}</span>
                  <h3 className="domain-title">{domain.title}</h3>
                </div>
              </div>

              <p className="domain-description">{domain.description}</p>

              <div className="domain-tags-flow">
                {domain.skills.map((skill) => (
                  <span key={skill} className="skill-chip">
                    <span className="chip-bullet">›</span>
                    {skill}
                  </span>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
