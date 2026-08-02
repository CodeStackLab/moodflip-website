'use client';

import React, { useState } from 'react';
import PageFrame from '@/components/PageFrame';

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
    <PageFrame eyebrow="Support" title="How can we help?" intro="Share a question, issue, or idea. Give us enough detail to understand what happened, but please do not include sensitive health information." narrow>
          {!submitted ? (
            <form onSubmit={handleSubmit} className="mf-form">
              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                style={{ display: 'none' }}
              />

              <div className="mf-field">
                <label>Name <span>Required</span></label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name"
                />
              </div>

              <div className="mf-field">
                <label>Email address <span>Required</span></label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="you@example.com"
                />
              </div>

              <div className="mf-field">
                <label>Message <span>Required</span></label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us how we can help…"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="mf-primary-button"
              >
                {submitting ? 'Sending…' : 'Send Message →'}
              </button>
              {error && <p role="alert" className="mf-form-error">{error}</p>}
            </form>
          ) : (
            <div className="mf-success-state">
              <span>✓</span><h2>Message received</h2><p>Thank you. We will get back to you as soon as we can.</p>
            </div>
          )}
    </PageFrame>
  );
}
