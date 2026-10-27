import React, { useState } from 'react';
import './Contact.css';

export default function Contact() {
  const [formStatus, setFormStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');

    try {
      // 1. Try relative cloud endpoint first (works automatically on Vercel 24/7)
      let response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      // 2. If running locally without Vercel, try local backend
      if (!response.ok && window.location.hostname === 'localhost') {
        response = await fetch('http://localhost:5000/api/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: formData.message,
          }),
        });
      }

      const data = await response.json();

      if (response.ok && data.success) {
        setFormStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        // Direct local mail client fallback if backend not running
        window.location.href = `mailto:gollasatheesh95@gmail.com?subject=Portfolio Inquiry from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
        setFormStatus('success');
      }
    } catch (err) {
      // Direct local mail client fallback
      window.location.href = `mailto:gollasatheesh95@gmail.com?subject=Portfolio Inquiry from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
      setFormStatus('success');
    }
  };

  return (
    <section id="contact" className="lux-contact">
      <div className="container">
        
        {/* Section Header */}
        <div className="reveal">
          <div className="section-badge">
            <span className="dot"></span>
            <span>Direct Line</span>
          </div>
          <h2 className="section-title">
            Initiate Contact & <span className="gradient-text">Collaboration</span>
          </h2>
          <p className="section-subtitle">
            Actively interviewing for full-time Data Scientist and Machine Learning Engineer positions in Bangalore, India, and open to remote opportunities.
          </p>
        </div>

        {/* 2-Column Luxury Communication Matrix */}
        <div className="contact-main-grid">
          
          {/* Left Verified Channels */}
          <div className="contact-channels-card reveal stagger-1">
            <h3 className="channels-title">Direct Professional Channels</h3>
            <p className="channels-desc">
              Connect directly via verified phone, email, or explore code repositories and professional references.
            </p>

            <div className="channels-list">
              
              {/* Phone */}
              <a href="tel:+916304231087" className="channel-item">
                <div className="channel-icon-box">📞</div>
                <div className="channel-info">
                  <span className="channel-label">PHONE / WHATSAPP</span>
                  <span className="channel-val">+91-6304231087</span>
                </div>
                <span className="channel-arrow">↗</span>
              </a>

              {/* Email */}
              <a href="mailto:gollasatheesh95@gmail.com" className="channel-item">
                <div className="channel-icon-box">✉️</div>
                <div className="channel-info">
                  <span className="channel-label">EMAIL ADDRESS</span>
                  <span className="channel-val">gollasatheesh95@gmail.com</span>
                </div>
                <span className="channel-arrow">↗</span>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com/in/golla-sathish"
                target="_blank"
                rel="noopener noreferrer"
                className="channel-item"
              >
                <div className="channel-icon-box">💼</div>
                <div className="channel-info">
                  <span className="channel-label">LINKEDIN PROFILE</span>
                  <span className="channel-val">linkedin.com/in/golla-sathish</span>
                </div>
                <span className="channel-arrow">↗</span>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/GollaSatheesh"
                target="_blank"
                rel="noopener noreferrer"
                className="channel-item"
              >
                <div className="channel-icon-box">🐙</div>
                <div className="channel-info">
                  <span className="channel-label">GITHUB REPOSITORIES</span>
                  <span className="channel-val">github.com/GollaSatheesh</span>
                </div>
                <span className="channel-arrow">↗</span>
              </a>

              {/* Location */}
              <div className="channel-item static-item">
                <div className="channel-icon-box">📍</div>
                <div className="channel-info">
                  <span className="channel-label">RESIDENCE & PREFERRED LOCATION</span>
                  <span className="channel-val">Bangalore, Karnataka, India</span>
                </div>
              </div>

            </div>
          </div>

          {/* Right Direct Message Form */}
          <div className="contact-form-card reveal stagger-2">
            <h3 className="form-heading">Send a Direct Message</h3>
            <p className="form-subheading">
              Looking to hire, discuss a data problem, or request an interview? Fill in your details below.
            </p>

            {formStatus === 'success' ? (
              <div className="form-success-box">
                <div className="success-icon">✓</div>
                <h4>Message Transmitted</h4>
                <p>
                  Thank you! Your message has been sent directly to Golla Sathish at 
                  <strong> gollasatheesh95@gmail.com</strong>. Expect a response shortly.
                </p>
                <button
                  className="btn-magnetic btn-luxury-secondary"
                  onClick={() => setFormStatus('idle')}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="lux-form">
                
                <div className="form-input-group">
                  <label htmlFor="name">YOUR FULL NAME</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="e.g. Sarah Jenkins (Senior Recruiter)"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-input-group">
                  <label htmlFor="email">BUSINESS EMAIL</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="sarah.jenkins@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="form-input-group">
                  <label htmlFor="message">OPPORTUNITY OR INQUIRY DETAILS</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows="4"
                    placeholder="Hello Sathish, we reviewed your machine learning projects and would love to schedule a screening interview..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={formStatus === 'sending'}
                  className="btn-magnetic btn-luxury-primary form-submit-btn"
                >
                  <span>{formStatus === 'sending' ? 'Transmitting to Email...' : 'Dispatch Message'}</span>
                  <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </button>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
