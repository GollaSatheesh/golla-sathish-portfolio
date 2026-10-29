import React from 'react';
import './About.css';

export default function About() {
  return (
    <section className="lux-about" id="about">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header-block reveal stagger-1">
          <div className="section-pill">
            <span className="pill-dot"></span>
            <span>VERIFIED ENGINEER PROFILE</span>
          </div>
          <h2 className="section-heading">
            Engineering Rigor <span className="highlight-glimmer">Driven by Data</span>
          </h2>
          <p className="section-subheading">
            Bridging mathematical foundations, end-to-end data pipelines, and production machine learning applications.
          </p>
        </div>

        {/* Content Split: Left Narrative, Right Specs & Cards */}
        <div className="about-grid">
          
          {/* Left Narrative */}
          <div className="about-narrative reveal stagger-1">
            <p className="narrative-lead">
              I am an <strong>Aspiring Data Scientist</strong> with hands-on experience in 
              <strong> Python, SQL, machine learning, deep learning</strong>, and <strong>NLP</strong> developed 
              through academic rigor and self-driven engineering projects.
            </p>
            <p>
              I have completed my <strong>B.Tech in Computer Science and Engineering</strong> at 
              <em> Sri Venkatesa Perumal College of Engineering and Technology</em> (2022 – 2026, CGPA: 7.0/10.0), 
              specializing in taking messy datasets through rigorous <strong>data cleaning, EDA, feature engineering</strong>, 
              and training optimized classification and regression architectures.
            </p>
            <p>
              My hands-on portfolio demonstrates practical model deployment, including a <strong>98.72% accurate PyTorch CNN digit classifier</strong>, 
              a <strong>Student Performance early-warning system catching 92% of at-risk students</strong>, 
              a <strong>two-stage RAG pipeline with cross-encoder reranking</strong>, and sentiment classifiers yielding 
              <strong> ~90% accuracy</strong> serialized with Joblib. Seeking an entry-level Data Science role in 
              Bangalore or hybrid environments to solve mission-critical data problems.
            </p>

            {/* Quick Contact & Info Grid */}
            <div className="about-quick-specs">
              <div className="spec-item">
                <span className="spec-label">LOCATION</span>
                <span className="spec-val">Bangalore, Karnataka, IN</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">PHONE</span>
                <span className="spec-val">+91-6304231087</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">EMAIL</span>
                <span className="spec-val">gollasatheesh95@gmail.com</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">LANGUAGES</span>
                <span className="spec-val">English, Telugu (Native), Kannada</span>
              </div>
            </div>

            {/* Engineer's Verified Digital Autograph */}
            <div className="about-signature-card">
              <div className="signature-top-row">
                <span className="signature-pill">ENGINEER'S AUTOGRAPH</span>
                <span className="signature-tag">VERIFIED PORTFOLIO // 2026</span>
              </div>
              <div className="signature-script">Golla Sathish</div>
              <div className="signature-subtext">Data Scientist &amp; Machine Learning Engineer</div>
            </div>
          </div>

          {/* Right Highlight Cards with Glassmorphism Elevation */}
          <div className="about-cards-grid reveal stagger-2">
            
            <div className="about-glass-card">
              <div className="card-top-row">
                <div className="card-icon-box">🎓</div>
                <span className="card-badge">2022 – 2026</span>
              </div>
              <h3 className="card-title">B.Tech in CSE</h3>
              <p className="card-desc">
                Sri Venkatesa Perumal College of Engineering (CGPA: 7.0/10.0). Coursework in Python Programming, Data Structures, DBMS & Machine Learning.
              </p>
            </div>

            <div className="about-glass-card">
              <div className="card-top-row">
                <div className="card-icon-box">⚡</div>
                <span className="card-badge">Supervised & Unsupervised</span>
              </div>
              <h3 className="card-title">Machine Learning</h3>
              <p className="card-desc">
                Logistic Regression, Decision Trees, Random Forest, KNN, SVM, Naive Bayes, XGBoost, alongside K-Means, Hierarchical, and DBSCAN clustering.
              </p>
            </div>

            <div className="about-glass-card">
              <div className="card-top-row">
                <div className="card-icon-box">🧠</div>
                <span className="card-badge">PyTorch & RAG</span>
              </div>
              <h3 className="card-title">Deep Learning & NLP</h3>
              <p className="card-desc">
                PyTorch CNNs, Two-Stage RAG with Cross-Encoder reranking (FAISS), TF-IDF vectorization, tokenization, and model serialization.
              </p>
            </div>

            <div className="about-glass-card">
              <div className="card-top-row">
                <div className="card-icon-box">📊</div>
                <span className="card-badge">EDA & Visualization</span>
              </div>
              <h3 className="card-title">Data Analytics & Tools</h3>
              <p className="card-desc">
                Pandas, NumPy, Matplotlib, Seaborn, SQL, Jupyter Notebooks, VS Code, Git/GitHub, and interactive Streamlit web apps.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}