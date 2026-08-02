'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', message: '', honeypot: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) return;
    setSubmitting(true);
    setError('');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Message delivery failed.');
      setSubmitted(true);
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : 'Message delivery failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="site-shell">
      <Header />

      <style>{`
        @keyframes contactBlob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -25px) scale(1.05); }
        }
        @keyframes contactFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .contact-shell {
          min-height: calc(100vh - 200px);
          padding: 3rem 1rem 5rem;
          position: relative; overflow: hidden;
        }
        .contact-blob-1 {
          position: fixed; top: -100px; left: -100px;
          width: 480px; height: 480px; border-radius: 50%;
          background: radial-gradient(circle, rgba(108,92,231,0.12) 0%, transparent 70%);
          animation: contactBlob 15s ease-in-out infinite;
          pointer-events: none; z-index: 0;
        }
        .contact-blob-2 {
          position: fixed; bottom: -80px; right: -80px;
          width: 420px; height: 420px; border-radius: 50%;
          background: radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 70%);
          animation: contactBlob 18s ease-in-out infinite 4s;
          pointer-events: none; z-index: 0;
        }
        .contact-container {
          max-width: 1080px; margin: 0 auto;
          position: relative; z-index: 1;
          animation: contactFadeUp 0.45s cubic-bezier(0.22,1,0.36,1) both;
        }
        .contact-hero {
          text-align: center; margin-bottom: 3rem;
          max-width: 720px; margin-left: auto; margin-right: auto;
        }
        .contact-eyebrow {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 0.45rem 1.15rem; border-radius: 999px;
          font-size: 0.76rem; font-weight: 800; text-transform: uppercase;
          letter-spacing: 0.08em; margin-bottom: 1.1rem;
          background: rgba(108,92,231,0.1);
          border: 1px solid rgba(108,92,231,0.22);
          color: #6c5ce7;
        }
        .contact-title {
          font-family: 'Fraunces', Georgia, serif;
          font-size: clamp(2.2rem, 4.5vw, 3.4rem);
          font-weight: 640; color: var(--text-main);
          line-height: 1.12; margin-bottom: 1rem;
        }
        .contact-intro {
          font-size: 1.05rem; color: var(--text-subtle);
          line-height: 1.65; margin: 0;
        }

        /* 2-COLUMN GRID */
        .contact-grid {
          display: grid; grid-template-columns: 1fr 1.25fr;
          gap: 2rem; align-items: stretch;
        }
        @media (max-width: 860px) {
          .contact-grid { grid-template-columns: 1fr; }
        }

        /* LEFT INFO PANEL */
        .contact-info-card {
          background: linear-gradient(150deg, rgba(255,248,239,0.7) 0%, rgba(253,238,221,0.4) 100%);
          border: 1.5px solid var(--card-border);
          border-radius: 28px; padding: 2.5rem 2.25rem;
          box-shadow: 0 24px 60px rgba(74,57,102,0.08);
          display: flex; flex-direction: column; justify-content: space-between;
          gap: 2rem; backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        .contact-info-block { display: flex; flex-direction: column; gap: 1.25rem; }
        .contact-item {
          display: flex; align-items: flex-start; gap: 1rem;
          padding: 1rem 1.15rem; border-radius: 18px;
          background: rgba(255,255,255,0.75);
          border: 1px solid var(--card-border);
        }
        .contact-item-icon {
          width: 42px; height: 42px; border-radius: 12px;
          background: rgba(108,92,231,0.12); color: #6c5ce7;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.2rem; flex-shrink: 0;
        }
        .contact-item-title { font-size: 0.88rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.2rem; }
        .contact-item-desc { font-size: 0.81rem; color: var(--text-subtle); line-height: 1.5; margin: 0; }

        .contact-response-badge {
          display: flex; align-items: center; gap: 0.6rem;
          padding: 0.75rem 1.1rem; border-radius: 14px;
          background: rgba(34,197,94,0.1);
          border: 1px solid rgba(34,197,94,0.25);
          font-size: 0.82rem; font-weight: 700; color: #166534;
        }

        /* RIGHT FORM CARD */
        .contact-form-card {
          background: var(--card-bg);
          border: 1.5px solid var(--card-border);
          border-radius: 28px; padding: 2.75rem 2.5rem;
          box-shadow: 0 28px 70px rgba(74,57,102,0.1);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        @media (max-width: 540px) {
          .contact-form-card { padding: 2rem 1.5rem; border-radius: 22px; }
        }

        .contact-form-title {
          font-size: 1.35rem; font-weight: 800; color: var(--text-main);
          margin-bottom: 0.35rem; font-family: 'Outfit', 'Inter', sans-serif;
        }
        .contact-form-sub { font-size: 0.85rem; color: var(--text-subtle); margin-bottom: 1.75rem; }

        .contact-form { display: flex; flex-direction: column; gap: 1.2rem; }
        .contact-field { display: flex; flex-direction: column; gap: 0.45rem; }
        .contact-label {
          font-size: 0.72rem; font-weight: 800; color: var(--text-main);
          text-transform: uppercase; letter-spacing: 0.06em;
          display: flex; justify-content: space-between;
        }
        .contact-label span { color: #ec4899; }
        .contact-input-wrap { position: relative; }
        .contact-input-icon {
          position: absolute; left: 13px; top: 15px;
          font-size: 0.95rem; pointer-events: none; z-index: 1;
        }
        .contact-input {
          width: 100%; padding: 0.82rem 1rem 0.82rem 2.55rem;
          background: var(--cream);
          border: 1.5px solid var(--card-border);
          border-radius: 12px; color: var(--text-main);
          font-size: 0.9rem; outline: none; font-family: inherit;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .contact-input:focus {
          border-color: #6c5ce7;
          box-shadow: 0 0 0 3px rgba(108,92,231,0.12);
        }
        .contact-textarea {
          width: 100%; padding: 0.82rem 1rem 0.82rem 2.55rem;
          background: var(--cream);
          border: 1.5px solid var(--card-border);
          border-radius: 12px; color: var(--text-main);
          font-size: 0.9rem; outline: none; font-family: inherit;
          resize: vertical; min-height: 120px;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .contact-textarea:focus {
          border-color: #6c5ce7;
          box-shadow: 0 0 0 3px rgba(108,92,231,0.12);
        }

        .contact-submit-btn {
          width: 100%; padding: 0.9rem 1.5rem;
          background: linear-gradient(135deg, #6c5ce7 0%, #ec4899 100%);
          border: none; border-radius: 14px;
          color: white; font-weight: 800; font-size: 0.92rem;
          cursor: pointer; font-family: inherit;
          display: flex; align-items: center; justify-content: center; gap: 0.5rem;
          transition: all 0.22s ease;
          box-shadow: 0 8px 24px rgba(108,92,231,0.35);
          margin-top: 0.5rem;
        }
        .contact-submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(108,92,231,0.46);
        }
        .contact-submit-btn:disabled { opacity: 0.55; cursor: not-allowed; transform: none; }

        .contact-error {
          background: rgba(239,68,68,0.1);
          border: 1px solid rgba(239,68,68,0.28);
          color: #dc2626; padding: 0.7rem 1rem; border-radius: 12px;
          font-size: 0.83rem; font-weight: 600; margin-top: 1rem;
          display: flex; align-items: center; gap: 0.4rem;
        }

        .contact-success {
          background: linear-gradient(135deg, rgba(34,197,94,0.1), rgba(18,165,148,0.08));
          border: 1px solid rgba(34,197,94,0.25);
          border-radius: 20px; padding: 3rem 2rem; text-align: center;
        }
        .contact-success-icon { font-size: 3rem; display: block; margin-bottom: 0.75rem; }
        .contact-success-h2 {
          font-family: 'Fraunces', Georgia, serif;
          font-size: 1.5rem; font-weight: 700; color: #166534; margin: 0 0 0.5rem;
        }
        .contact-success-p { font-size: 0.88rem; color: #15803d; margin: 0; line-height: 1.6; }
      `}</style>

      <main className="contact-shell">
        <div className="contact-blob-1" />
        <div className="contact-blob-2" />

        <div className="contact-container">

          {/* HERO */}
          <header className="contact-hero">
            <span className="contact-eyebrow">💬 Support &amp; Enquiries</span>
            <h1 className="contact-title">How can we help you?</h1>
            <p className="contact-intro">
              Have a question, feedback, or need assistance? Send us a message and our team will get back to you shortly.
            </p>
          </header>

          {/* 2-COLUMN GRID */}
          <div className="contact-grid">

            {/* LEFT INFO PANEL */}
            <div className="contact-info-card">
              <div className="contact-info-block">
                <div>
                  <h2 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-main)', margin: '0 0 0.35rem' }}>
                    Get in Touch
                  </h2>
                  <p style={{ fontSize: '0.86rem', color: 'var(--text-subtle)', margin: 0, lineHeight: 1.55 }}>
                    We read every message and appreciate your feedback on MoodFlip.
                  </p>
                </div>

                <div className="contact-item">
                  <div className="contact-item-icon">✉️</div>
                  <div>
                    <div className="contact-item-title">Email Support</div>
                    <div className="contact-item-desc">support@moodflip.coach</div>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-item-icon">⚡</div>
                  <div>
                    <div className="contact-item-title">Tap-Only Tool Help</div>
                    <div className="contact-item-desc">Need assistance with your saved check-ins or custom PDF plans?</div>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-item-icon">🔒</div>
                  <div>
                    <div className="contact-item-title">Privacy Guaranteed</div>
                    <div className="contact-item-desc">Your messages are private. Please do not send confidential health data.</div>
                  </div>
                </div>
              </div>

              <div className="contact-response-badge">
                <span>⏱️</span>
                <span>Average response time: 24-48 hours</span>
              </div>
            </div>

            {/* RIGHT FORM CARD */}
            <div className="contact-form-card">
              {!submitted ? (
                <>
                  <h2 className="contact-form-title">Send a Message</h2>
                  <p className="contact-form-sub">Fill out the form below to reach our team directly.</p>

                  <form onSubmit={handleSubmit} className="contact-form">
                    <input
                      type="text"
                      name="honeypot"
                      value={formData.honeypot}
                      onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                      style={{ display: 'none' }}
                    />

                    <div className="contact-field">
                      <label className="contact-label">Your Name <span>*</span></label>
                      <div className="contact-input-wrap">
                        <span className="contact-input-icon">👤</span>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Alex Morgan"
                          className="contact-input"
                        />
                      </div>
                    </div>

                    <div className="contact-field">
                      <label className="contact-label">Email Address <span>*</span></label>
                      <div className="contact-input-wrap">
                        <span className="contact-input-icon">✉️</span>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="you@example.com"
                          className="contact-input"
                        />
                      </div>
                    </div>

                    <div className="contact-field">
                      <label className="contact-label">Message <span>*</span></label>
                      <div className="contact-input-wrap">
                        <span className="contact-input-icon">💬</span>
                        <textarea
                          required
                          rows={4}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Tell us how we can help you…"
                          className="contact-textarea"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="contact-submit-btn"
                    >
                      <span>{submitting ? 'Sending Message…' : 'Send Message'}</span>
                      {!submitting && <span>→</span>}
                    </button>

                    {error && (
                      <div className="contact-error">
                        <span>⚠️</span> {error}
                      </div>
                    )}
                  </form>
                </>
              ) : (
                <div className="contact-success">
                  <span className="contact-success-icon">✨</span>
                  <h2 className="contact-success-h2">Message Received!</h2>
                  <p className="contact-success-p">
                    Thank you for reaching out. We have received your message and will respond to {formData.email} as soon as possible.
                  </p>
                </div>
              )}
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
