import React from 'react';
import './About.css';

export default function About() {
  return (
    <section id="about" className="lux-about">
      <div className="container">
        
        {/* Section Header */}
        <div className="reveal">
          <div className="section-badge">
            <span className="dot"></span>
            <span>Executive Profile</span>
          </div>
          <h2 className="section-title">
            Passionate About Turning Data Into <span className="gradient-text">Production Intelligence</span>
          </h2>
          <p className="section-subtitle">
            Based in Bangalore, India — bridging foundational Computer Science principles with cutting-edge machine learning and NLP.
          </p>
        </div>

        {/* 2-Column Luxury Layout */}
        <div className="about-main-grid">
          
          {/* Left Narrative */}
          <div className="about-narrative reveal stagger-1">
            <p className="narrative-lead">
              I am an <strong>Aspiring Data Scientist</strong> with hands-on experience in 
              <strong> Python, SQL, machine learning, deep learning</strong>, and <strong>NLP</strong> developed 
              through academic rigor and self-driven engineering projects.
            </p>
            <p>
              Currently pursuing my <strong>B.Tech in Computer Science and Engineering</strong> at 
              <em> Sri Venkatesa Perumal College of Engineering and Technology</em> (2022 – 2026, CGPA: 7.0/10.0), 
              I specialize in taking messy datasets through rigorous <strong>data cleaning, EDA, feature engineering</strong>, 
              and training optimized classification and regression architectures.
            </p>
            <p>
              My hands-on portfolio demonstrates practical model deployment, including deep neural text sequence 
              prediction with <strong>PyTorch RNNs & Streamlit</strong>, and sentiment classifiers yielding 
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
                Sri Venkatesa Perumal College of Engineering (CGPA: 7.0/10.0). Rigorous coursework in Data Structures, DBMS & Machine Learning.
              </p>
            </div>

            <div className="about-glass-card">
              <div className="card-top-row">
                <div className="card-icon-box">⚡</div>
                <span className="card-badge">Supervised & Unsupervised</span>
              </div>
              <h3 className="card-title">Machine Learning</h3>
              <p className="card-desc">
                Random Forest, Gradient Boosting, XGBoost, LightGBM, SVM, KNN, alongside K-Means, Hierarchical, and DBSCAN clustering.
              </p>
            </div>

            <div className="about-glass-card">
              <div className="card-top-row">
                <div className="card-icon-box">🧠</div>
                <span className="card-badge">PyTorch & Transformers</span>
              </div>
              <h3 className="card-title">Deep Learning & NLP</h3>
              <p className="card-desc">
                CNN, RNN text generation, TF-IDF vectorization, tokenization, stopword removal, stemming, and model serialization.
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
