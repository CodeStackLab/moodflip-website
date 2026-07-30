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

      <main style={{ maxWidth: '680px', margin: '2.5rem auto', padding: '0 1rem' }}>
        <div style={{
          background: 'var(--card-bg)',
          border: '1px solid var(--card-border)',
          borderRadius: '28px',
          padding: '2.5rem',
          boxShadow: '0 20px 60px rgba(0,0,0,0.04)'
        }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#a855f7', background: 'var(--tile-selected-bg)', padding: '0.35rem 0.95rem', borderRadius: '9999px', textTransform: 'uppercase' }}>
            Get In Touch
          </span>

          <h1 style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontSize: 'clamp(2rem, 4vw, 2.8rem)',
            fontWeight: 700,
            color: 'var(--text-main)',
            margin: '0.8rem 0 0.4rem 0'
          }}>
            Contact Us
          </h1>
          <p style={{ color: 'var(--text-subtle)', fontSize: '0.95rem', marginBottom: '2rem' }}>
            Have questions or feedback about MoodFlip? Send us a message below.
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                style={{ display: 'none' }}
              />

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.4rem' }}>Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your Name"
                  style={{ width: '100%', padding: '0.8rem 1rem', background: 'var(--tile-bg)', border: '1.5px solid var(--card-border)', borderRadius: '12px', color: 'var(--text-main)', outline: 'none', fontSize: '0.92rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.4rem' }}>Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="you@example.com"
                  style={{ width: '100%', padding: '0.8rem 1rem', background: 'var(--tile-bg)', border: '1.5px solid var(--card-border)', borderRadius: '12px', color: 'var(--text-main)', outline: 'none', fontSize: '0.92rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.4rem' }}>Message *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can we help you?"
                  style={{ width: '100%', padding: '0.8rem 1rem', background: 'var(--tile-bg)', border: '1.5px solid var(--card-border)', borderRadius: '12px', color: 'var(--text-main)', outline: 'none', resize: 'vertical', fontSize: '0.92rem' }}
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                style={{ padding: '0.9rem', background: 'linear-gradient(135deg, #7c54d1, #ec4899)', color: 'white', fontWeight: 700, borderRadius: '14px', border: 'none', cursor: 'pointer', marginTop: '0.5rem', fontSize: '0.95rem', boxShadow: '0 6px 18px rgba(124, 84, 209, 0.3)' }}
              >
                {submitting ? 'Sending…' : 'Send Message →'}
              </button>
              {error && <p role="alert" style={{ color: '#b91c1c', margin: 0, fontSize: '0.88rem' }}>{error}</p>}
            </form>
          ) : (
            <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
              <span style={{ fontSize: '3.5rem' }}>📩</span>
              <h3 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: '1.5rem', fontWeight: 700, margin: '0.75rem 0 0.35rem 0', color: 'var(--text-main)' }}>Thank You!</h3>
              <p style={{ color: 'var(--text-subtle)', fontSize: '0.95rem' }}>Your message has been sent successfully. We will get back to you shortly.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
