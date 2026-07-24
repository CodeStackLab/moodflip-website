'use client';

import React, { useState } from 'react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '', honeypot: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Spam bot check (honeypot field must be empty)
    if (formData.honeypot) return;
    setSubmitted(true);
  };

  return (
    <div style={{ maxWidth: '640px', margin: '2rem auto', background: 'rgba(18,24,44,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '2.5rem' }}>
      <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white', marginBottom: '0.5rem' }}>
        Contact Us
      </h1>
      <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
        Have questions or feedback about MoodFlip? Send us a message below.
      </p>

      {!submitted ? (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Honeypot anti-spam field (hidden) */}
          <input
            type="text"
            name="honeypot"
            value={formData.honeypot}
            onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
            style={{ display: 'none' }}
          />

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '0.35rem' }}>Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={{ width: '100%', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '10px', color: 'white', outline: 'none' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '0.35rem' }}>Email Address *</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              style={{ width: '100%', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '10px', color: 'white', outline: 'none' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '0.35rem' }}>Message *</label>
            <textarea
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              style={{ width: '100%', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '10px', color: 'white', outline: 'none', resize: 'vertical' }}
            />
          </div>

          <button
            type="submit"
            style={{ padding: '0.85rem', background: 'linear-gradient(135deg, #6366f1, #a855f7)', color: 'white', fontWeight: 700, borderRadius: '12px', border: 'none', cursor: 'pointer', marginTop: '0.5rem' }}
          >
            Send Message
          </button>
        </form>
      ) : (
        <div style={{ textAlign: 'center', padding: '2rem 0' }}>
          <span style={{ fontSize: '3rem' }}>📩</span>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 700, margin: '0.5rem 0', color: 'white' }}>Thank You!</h3>
          <p style={{ color: '#94a3b8' }}>Your message has been sent successfully.</p>
        </div>
      )}
    </div>
  );
}
