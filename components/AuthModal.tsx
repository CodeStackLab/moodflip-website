'use client';

import React, { useState, useEffect } from 'react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'user' | 'admin';
}

export default function AuthModal({ isOpen, onClose, initialTab = 'user' }: AuthModalProps) {
  const [tab, setTab] = useState<'user' | 'admin'>(initialTab);
  
  // User form state
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [userLoading, setUserLoading] = useState(false);
  const [userSubmitted, setUserSubmitted] = useState(false);

  // Admin form state
  const [adminPassword, setAdminPassword] = useState('');
  const [adminError, setAdminError] = useState('');

  useEffect(() => {
    setTab(initialTab);
  }, [initialTab, isOpen]);

  if (!isOpen) return null;

  const handleUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setUserLoading(true);
    try {
      const profile = { email, name };
      localStorage.setItem('moodflip_profile', JSON.stringify(profile));
      await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name })
      }).catch(() => {});
      setUserSubmitted(true);
      setTimeout(() => {
        onClose();
        window.location.reload();
      }, 1400);
    } catch (err) {
      console.error(err);
    } finally {
      setUserLoading(false);
    }
  };

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassword === 'admin123' || adminPassword === process.env.NEXT_PUBLIC_ADMIN_PASS) {
      localStorage.setItem('moodflip_admin_authed', 'true');
      window.location.href = '/admin';
    } else {
      setAdminError('Incorrect admin password!');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        {/* Modal Header Tabs */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.75rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => setTab('user')}
              style={{
                padding: '0.45rem 1rem',
                borderRadius: '9999px',
                border: 'none',
                background: tab === 'user' ? 'linear-gradient(135deg, #8b5cf6, #ec4899)' : '#f1f5f9',
                color: tab === 'user' ? 'white' : '#64748b',
                fontWeight: 700,
                fontSize: '0.82rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              👤 User Profile
            </button>
            <button
              onClick={() => setTab('admin')}
              style={{
                padding: '0.45rem 1rem',
                borderRadius: '9999px',
                border: 'none',
                background: tab === 'admin' ? 'linear-gradient(135deg, #6366f1, #a855f7)' : '#f1f5f9',
                color: tab === 'admin' ? 'white' : '#64748b',
                fontWeight: 700,
                fontSize: '0.82rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              🔐 Admin Login
            </button>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '1.2rem', cursor: 'pointer' }}
          >
            ✕
          </button>
        </div>

        {/* TAB 1: USER PROFILE / REGISTRATION */}
        {tab === 'user' && (
          <div>
            {!userSubmitted ? (
              <>
                <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
                  <span style={{ fontSize: '2.2rem' }}>💫</span>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1e1b4b', marginTop: '0.35rem' }}>
                    User Profile & Mood History
                  </h2>
                  <p style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '0.2rem' }}>
                    Register or enter your email to save check-ins and receive your personalized plans.
                  </p>
                </div>

                <form onSubmit={handleUserSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>Your Name (Optional)</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alex"
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.9rem',
                        background: '#f8fafc',
                        border: '1.5px solid #cbd5e1',
                        borderRadius: '10px',
                        color: '#0f172a',
                        fontSize: '0.88rem',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.9rem',
                        background: '#f8fafc',
                        border: '1.5px solid #cbd5e1',
                        borderRadius: '10px',
                        color: '#0f172a',
                        fontSize: '0.88rem',
                        outline: 'none'
                      }}
                    />
                  </div>

                  {/* Approved Disclaimer */}
                  <div style={{ background: '#f5f3ff', border: '1px solid #ddd6fe', padding: '0.65rem', borderRadius: '10px' }}>
                    <p style={{ fontSize: '0.72rem', color: '#6d28d9', lineHeight: 1.45 }}>
                      By creating a profile, you agree that MoodFlip may store your email address, selected moods and dates, actions shown, and purchase history to create personalized downloads. Inactive profiles are automatically deleted after 90 days.
                    </p>
                  </div>

                  <div style={{ display: 'flex', gap: '0.65rem', marginTop: '0.4rem' }}>
                    <button
                      type="button"
                      onClick={onClose}
                      style={{
                        flex: 1,
                        padding: '0.65rem',
                        background: '#f1f5f9',
                        border: 'none',
                        borderRadius: '10px',
                        color: '#64748b',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        cursor: 'pointer'
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={userLoading}
                      style={{
                        flex: 2,
                        padding: '0.65rem',
                        background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
                        border: 'none',
                        borderRadius: '10px',
                        color: 'white',
                        fontWeight: 800,
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        boxShadow: '0 4px 14px rgba(139, 92, 246, 0.25)'
                      }}
                    >
                      {userLoading ? 'Saving...' : 'Save Profile ✨'}
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                <span style={{ fontSize: '2.5rem' }}>🎉</span>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#166534', marginTop: '0.5rem' }}>Profile Saved!</h3>
                <p style={{ fontSize: '0.85rem', color: '#15803d', marginTop: '0.25rem' }}>Your mood history is now connected.</p>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: ADMIN LOGIN */}
        {tab === 'admin' && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
              <span style={{ fontSize: '2.2rem' }}>🔐</span>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1e1b4b', marginTop: '0.35rem' }}>
                Admin Access
              </h2>
              <p style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '0.2rem' }}>
                Enter admin security password to access the control center and CSV export.
              </p>
            </div>

            <form onSubmit={handleAdminSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>Admin Password *</label>
                <input
                  type="password"
                  required
                  value={adminPassword}
                  onChange={(e) => { setAdminPassword(e.target.value); setAdminError(''); }}
                  placeholder="Enter Password (admin123)"
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.9rem',
                    background: '#f8fafc',
                    border: '1.5px solid #cbd5e1',
                    borderRadius: '10px',
                    color: '#0f172a',
                    fontSize: '0.88rem',
                    outline: 'none'
                  }}
                />
                {adminError && (
                  <span style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '0.3rem', display: 'block', fontWeight: 600 }}>
                    ⚠️ {adminError}
                  </span>
                )}
              </div>

              <div style={{ display: 'flex', gap: '0.65rem', marginTop: '0.4rem' }}>
                <button
                  type="button"
                  onClick={onClose}
                  style={{
                    flex: 1,
                    padding: '0.65rem',
                    background: '#f1f5f9',
                    border: 'none',
                    borderRadius: '10px',
                    color: '#64748b',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    flex: 2,
                    padding: '0.65rem',
                    background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                    border: 'none',
                    borderRadius: '10px',
                    color: 'white',
                    fontWeight: 800,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(99, 102, 241, 0.25)'
                  }}
                >
                  Access Admin Dashboard 🔓
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
