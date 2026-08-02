'use client';

import React, { useState } from 'react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveProfile: (email: string, name?: string) => Promise<void>;
}

export default function ProfileModal({ isOpen, onClose, onSaveProfile }: ProfileModalProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await onSaveProfile(email, name);
      setSubmitted(true);
      setTimeout(() => {
        onClose();
      }, 1800);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        {!submitted ? (
          <>
            <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
              <span style={{ fontSize: '2.5rem' }}>💫</span>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginTop: '0.5rem' }}>Save Your Mood & Action History</h2>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '0.25rem' }}>
                Welcome back! Create a free profile to save your check-ins and receive your personalized 7-day plan.
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '0.35rem' }}>Your Name (Optional)</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex"
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '10px',
                    color: 'white',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#cbd5e1', marginBottom: '0.35rem' }}>Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '10px',
                    color: 'white',
                    outline: 'none'
                  }}
                />
              </div>

              {/* Exact Approved Consent Wording */}
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '0.75rem', borderRadius: '10px' }}>
                <p style={{ fontSize: '0.73rem', color: '#94a3b8', lineHeight: 1.5 }}>
                  By creating a profile, you agree that MoodFlip may store your email address, selected moods and dates, actions shown, and purchase history so we can create and offer personalized downloads. Inactive profiles are automatically deleted after 90 days.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  onClick={onClose}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    background: 'transparent',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '10px',
                    color: '#cbd5e1',
                    cursor: 'pointer',
                    fontWeight: 600
                  }}
                >
                  Skip for Now
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    flex: 1.5,
                    padding: '0.75rem',
                    background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                    border: 'none',
                    borderRadius: '10px',
                    color: 'white',
                    cursor: 'pointer',
                    fontWeight: 700
                  }}
                >
                  {loading ? 'Saving...' : 'SAVE MY PROFILE'}
                </button>
              </div>
            </form>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
            <span style={{ fontSize: '3rem' }}>🎉</span>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, margin: '0.5rem 0' }}>Profile Created!</h3>
            <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Your mood check-ins will now be saved securely.</p>
          </div>
        )}
      </div>
    </div>
  );
}
