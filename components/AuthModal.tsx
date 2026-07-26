'use client';

import React, { useState, useEffect } from 'react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'user' | 'admin';
}

export default function AuthModal({ isOpen, onClose, initialTab = 'user' }: AuthModalProps) {
  const [tab, setTab] = useState<'user' | 'admin'>(initialTab);
  
  // User step registration state
  const [userStep, setUserStep] = useState<number>(1);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [consent, setConsent] = useState(true);
  const [userLoading, setUserLoading] = useState(false);
  const [userSubmitted, setUserSubmitted] = useState(false);

  // Admin form state
  const [adminPassword, setAdminPassword] = useState('');
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const [adminError, setAdminError] = useState('');

  useEffect(() => {
    setTab(initialTab);
    setUserStep(1);
    setAdminError('');
  }, [initialTab, isOpen]);

  if (!isOpen) return null;

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setUserStep(2);
  };

  const handleUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !consent) return;
    setUserLoading(true);
    try {
      const profile = { email, name, lastActiveAt: new Date().toISOString() };
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

        {/* TOP TAB SWITCHER */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.75rem' }}>
          <div style={{ display: 'flex', gap: '0.4rem', background: '#f1f5f9', padding: '0.25rem', borderRadius: '9999px' }}>
            <button
              type="button"
              onClick={() => { setTab('user'); setUserStep(1); }}
              style={{
                padding: '0.4rem 0.95rem',
                borderRadius: '9999px',
                border: 'none',
                background: tab === 'user' ? 'linear-gradient(135deg, #8b5cf6, #ec4899)' : 'transparent',
                color: tab === 'user' ? 'white' : '#64748b',
                fontWeight: 700,
                fontSize: '0.8rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              👤 User Registration
            </button>
            <button
              type="button"
              onClick={() => setTab('admin')}
              style={{
                padding: '0.4rem 0.95rem',
                borderRadius: '9999px',
                border: 'none',
                background: tab === 'admin' ? 'linear-gradient(135deg, #6366f1, #a855f7)' : 'transparent',
                color: tab === 'admin' ? 'white' : '#64748b',
                fontWeight: 700,
                fontSize: '0.8rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              🔐 Admin Portal
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{ background: '#f1f5f9', border: 'none', color: '#64748b', width: '28px', height: '28px', borderRadius: '50%', fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            ✕
          </button>
        </div>

        {/* TAB 1: USER REGISTRATION */}
        {tab === 'user' ? (
          <div>
            {!userSubmitted ? (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: userStep === 1 ? '#8b5cf6' : '#10b981',
                      color: 'white',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      {userStep === 1 ? '1' : '✓'}
                    </span>
                    <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#1e1b4b' }}>
                      {userStep === 1 ? 'Step 1: Profile & Email' : 'Step 2: Password & Consent'}
                    </span>
                  </div>
                  <span style={{ fontSize: '0.72rem', color: '#8b5cf6', fontWeight: 700, background: '#f5f3ff', padding: '0.15rem 0.55rem', borderRadius: '9999px' }}>
                    {userStep}/2 Steps
                  </span>
                </div>

                {userStep === 1 ? (
                  <form onSubmit={handleNextStep} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                        Your Full Name (Optional)
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Alex Johnson"
                        style={{
                          width: '100%',
                          padding: '0.65rem 0.9rem',
                          background: '#f8fafc',
                          border: '1.5px solid #cbd5e1',
                          borderRadius: '12px',
                          color: '#0f172a',
                          fontSize: '0.88rem',
                          outline: 'none'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="alex@example.com"
                        style={{
                          width: '100%',
                          padding: '0.65rem 0.9rem',
                          background: '#f8fafc',
                          border: '1.5px solid #cbd5e1',
                          borderRadius: '12px',
                          color: '#0f172a',
                          fontSize: '0.88rem',
                          outline: 'none'
                        }}
                      />
                    </div>

                    <button
                      type="submit"
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
                        border: 'none',
                        borderRadius: '12px',
                        color: 'white',
                        fontWeight: 800,
                        fontSize: '0.88rem',
                        cursor: 'pointer',
                        boxShadow: '0 6px 18px rgba(139, 92, 246, 0.3)',
                        marginTop: '0.4rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.4rem'
                      }}
                    >
                      <span>Continue to Security</span>
                      <span>&rarr;</span>
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleUserSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                        Create Password / PIN (Optional Security)
                      </label>
                      <div style={{ position: 'relative' }}>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Min 6 characters (e.g. Mood@2026)"
                          style={{
                            width: '100%',
                            padding: '0.65rem 2.5rem 0.65rem 0.9rem',
                            background: '#f8fafc',
                            border: '1.5px solid #cbd5e1',
                            borderRadius: '12px',
                            color: '#0f172a',
                            fontSize: '0.88rem',
                            outline: 'none'
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          style={{
                            position: 'absolute',
                            right: '10px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '0.95rem'
                          }}
                        >
                          {showPassword ? '🙈' : '👁️'}
                        </button>
                      </div>
                      {password ? (
                        <div style={{ fontSize: '0.7rem', color: password.length >= 6 ? '#059669' : '#d97706', marginTop: '0.2rem', fontWeight: 600 }}>
                          {password.length >= 6 ? '✓ Password format accepted' : '• Password must be at least 6 characters'}
                        </div>
                      ) : null}
                    </div>

                    <div style={{ background: '#f5f3ff', border: '1px solid #ddd6fe', padding: '0.75rem', borderRadius: '12px' }}>
                      <label style={{ display: 'flex', gap: '0.5rem', cursor: 'pointer', alignItems: 'flex-start' }}>
                        <input
                          type="checkbox"
                          checked={consent}
                          onChange={(e) => setConsent(e.target.checked)}
                          style={{ marginTop: '0.15rem', accentColor: '#8b5cf6' }}
                        />
                        <span style={{ fontSize: '0.73rem', color: '#5b21b6', lineHeight: 1.45 }}>
                          By creating a profile, you agree that MoodFlip may store your email address, selected moods and dates, actions shown, and purchase history so we can create and offer personalized downloads.
                        </span>
                      </label>
                    </div>

                    <div style={{ display: 'flex', gap: '0.65rem', marginTop: '0.3rem' }}>
                      <button
                        type="button"
                        onClick={() => setUserStep(1)}
                        style={{
                          flex: 1,
                          padding: '0.65rem',
                          background: '#f1f5f9',
                          border: 'none',
                          borderRadius: '12px',
                          color: '#64748b',
                          fontWeight: 700,
                          fontSize: '0.85rem',
                          cursor: 'pointer'
                        }}
                      >
                        &larr; Back
                      </button>
                      <button
                        type="submit"
                        disabled={userLoading || !consent}
                        style={{
                          flex: 2,
                          padding: '0.65rem',
                          background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
                          border: 'none',
                          borderRadius: '12px',
                          color: 'white',
                          fontWeight: 800,
                          fontSize: '0.85rem',
                          cursor: 'pointer',
                          boxShadow: '0 6px 18px rgba(139, 92, 246, 0.3)'
                        }}
                      >
                        {userLoading ? 'Creating...' : 'Complete Registration ✨'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                <span style={{ fontSize: '2.5rem' }}>🎉</span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#166534', marginTop: '0.5rem' }}>
                  Registration Complete!
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#15803d', marginTop: '0.25rem' }}>
                  Welcome to MoodFlip. Your profile and check-in history are secured.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
              <span style={{ fontSize: '2.2rem' }}>🔐</span>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1e1b4b', marginTop: '0.35rem' }}>
                Admin Portal Login
              </h2>
              <p style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '0.2rem' }}>
                Enter Joy&apos;s admin master password to access the control center.
              </p>
            </div>

            <form onSubmit={handleAdminSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                  Admin Master Password *
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showAdminPassword ? 'text' : 'password'}
                    required
                    value={adminPassword}
                    onChange={(e) => { setAdminPassword(e.target.value); setAdminError(''); }}
                    placeholder="Enter Master Password (admin123)"
                    style={{
                      width: '100%',
                      padding: '0.65rem 2.5rem 0.65rem 0.9rem',
                      background: '#f8fafc',
                      border: '1.5px solid #cbd5e1',
                      borderRadius: '12px',
                      color: '#0f172a',
                      fontSize: '0.88rem',
                      outline: 'none'
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowAdminPassword(!showAdminPassword)}
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '0.95rem'
                    }}
                  >
                    {showAdminPassword ? '🙈' : '👁️'}
                  </button>
                </div>
                {adminError ? (
                  <span style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '0.3rem', display: 'block', fontWeight: 600 }}>
                    ⚠️ {adminError}
                  </span>
                ) : null}
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
                    borderRadius: '12px',
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
                    borderRadius: '12px',
                    color: 'white',
                    fontWeight: 800,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    boxShadow: '0 6px 18px rgba(99, 102, 241, 0.3)'
                  }}
                >
                  Unlock Admin Portal 🔓
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
