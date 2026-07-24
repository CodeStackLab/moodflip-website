'use client';

import React, { useState } from 'react';

export default function LoginPage() {
  const [isRegisterMode, setIsRegisterMode] = useState(true);
  const [step, setStep] = useState<number>(1);
  
  // Registration / Login fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [consent, setConsent] = useState(true);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const profile = { email, name, lastActiveAt: new Date().toISOString() };
      localStorage.setItem('moodflip_profile', JSON.stringify(profile));
      await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name })
      }).catch(() => {});
      setSuccess(true);
      setTimeout(() => {
        window.location.href = '/';
      }, 1500);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '480px', margin: '2rem auto', padding: '0 1rem' }}>
      {/* Auth Card Container */}
      <div style={{
        background: '#ffffff',
        border: '1px solid rgba(139, 92, 246, 0.18)',
        borderRadius: '24px',
        padding: '2.25rem 2rem',
        boxShadow: '0 20px 50px rgba(139, 92, 246, 0.08), 0 4px 15px rgba(0,0,0,0.02)',
      }}>

        {/* Logo & Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div style={{
            width: '54px',
            height: '54px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.75rem',
            boxShadow: '0 8px 20px rgba(139, 92, 246, 0.25)',
            marginBottom: '0.75rem'
          }}>
            💫
          </div>
          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: '1.75rem',
            fontWeight: 800,
            color: '#1e1b4b',
            letterSpacing: '-0.02em'
          }}>
            {isRegisterMode ? 'Create Your Account' : 'Welcome Back'}
          </h1>
          <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.25rem' }}>
            {isRegisterMode
              ? 'Save your mood check-ins & receive custom 7-day emotional plans.'
              : 'Sign in to access your saved mood check-ins and plans.'}
          </p>
        </div>

        {/* Mode Selector Tabs */}
        <div style={{
          display: 'flex',
          background: '#f1f5f9',
          borderRadius: '9999px',
          padding: '0.25rem',
          marginBottom: '1.5rem'
        }}>
          <button
            type="button"
            onClick={() => { setIsRegisterMode(true); setStep(1); }}
            style={{
              flex: 1,
              padding: '0.55rem',
              borderRadius: '9999px',
              border: 'none',
              background: isRegisterMode ? 'linear-gradient(135deg, #8b5cf6, #ec4899)' : 'transparent',
              color: isRegisterMode ? 'white' : '#64748b',
              fontWeight: 800,
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            Register Profile
          </button>
          <button
            type="button"
            onClick={() => { setIsRegisterMode(false); setStep(1); }}
            style={{
              flex: 1,
              padding: '0.55rem',
              borderRadius: '9999px',
              border: 'none',
              background: !isRegisterMode ? 'linear-gradient(135deg, #6366f1, #a855f7)' : 'transparent',
              color: !isRegisterMode ? 'white' : '#64748b',
              fontWeight: 800,
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            Quick Sign In
          </button>
        </div>

        {success ? (
          <div style={{ textAlign: 'center', padding: '1.75rem 0' }}>
            <span style={{ fontSize: '3rem' }}>🎉</span>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#166534', marginTop: '0.5rem' }}>
              Welcome to MoodFlip!
            </h2>
            <p style={{ fontSize: '0.88rem', color: '#15803d', marginTop: '0.25rem' }}>
              Your profile is authenticated. Redirecting to home...
            </p>
          </div>
        ) : isRegisterMode ? (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: step === 1 ? '#8b5cf6' : '#10b981',
                  color: 'white',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {step === 1 ? '1' : '✓'}
                </span>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#1e1b4b' }}>
                  {step === 1 ? 'Step 1: Profile & Email' : 'Step 2: Security & Consent'}
                </span>
              </div>
              <span style={{ fontSize: '0.75rem', color: '#8b5cf6', fontWeight: 700, background: '#f5f3ff', padding: '0.2rem 0.6rem', borderRadius: '9999px' }}>
                Step {step} of 2
              </span>
            </div>

            {step === 1 ? (
              <form onSubmit={handleNextStep} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                    Your Full Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Johnson"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      background: '#f8fafc',
                      border: '1.5px solid #cbd5e1',
                      borderRadius: '12px',
                      color: '#0f172a',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
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
                      padding: '0.75rem 1rem',
                      background: '#f8fafc',
                      border: '1.5px solid #cbd5e1',
                      borderRadius: '12px',
                      color: '#0f172a',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    width: '100%',
                    padding: '0.85rem',
                    background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
                    border: 'none',
                    borderRadius: '12px',
                    color: 'white',
                    fontWeight: 800,
                    fontSize: '0.92rem',
                    cursor: 'pointer',
                    boxShadow: '0 6px 20px rgba(139, 92, 246, 0.3)',
                    marginTop: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <span>Continue to Security</span>
                  <span>&rarr;</span>
                </button>
              </form>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
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
                        padding: '0.75rem 2.5rem 0.75rem 1rem',
                        background: '#f8fafc',
                        border: '1.5px solid #cbd5e1',
                        borderRadius: '12px',
                        color: '#0f172a',
                        fontSize: '0.9rem',
                        outline: 'none'
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: 'absolute',
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '1rem'
                      }}
                    >
                      {showPassword ? '🙈' : '👁️'}
                    </button>
                  </div>
                  {password ? (
                    <div style={{ fontSize: '0.72rem', color: password.length >= 6 ? '#059669' : '#d97706', marginTop: '0.25rem', fontWeight: 600 }}>
                      {password.length >= 6 ? '✓ Password format accepted' : '• Password must be at least 6 characters'}
                    </div>
                  ) : null}
                </div>

                <div style={{ background: '#f5f3ff', border: '1px solid #ddd6fe', padding: '0.85rem', borderRadius: '12px' }}>
                  <label style={{ display: 'flex', gap: '0.6rem', cursor: 'pointer', alignItems: 'flex-start' }}>
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      style={{ marginTop: '0.2rem', accentColor: '#8b5cf6' }}
                    />
                    <span style={{ fontSize: '0.74rem', color: '#5b21b6', lineHeight: 1.5 }}>
                      By creating a profile, you agree that MoodFlip may store your email address, selected moods and dates, actions shown, and purchase history to offer personalized downloads. Inactive profiles are deleted after 90 days.
                    </span>
                  </label>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.4rem' }}>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    style={{
                      flex: 1,
                      padding: '0.75rem',
                      background: '#f1f5f9',
                      border: 'none',
                      borderRadius: '12px',
                      color: '#64748b',
                      fontWeight: 700,
                      fontSize: '0.88rem',
                      cursor: 'pointer'
                    }}
                  >
                    &larr; Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading || !consent}
                    style={{
                      flex: 2,
                      padding: '0.75rem',
                      background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
                      border: 'none',
                      borderRadius: '12px',
                      color: 'white',
                      fontWeight: 800,
                      fontSize: '0.88rem',
                      cursor: 'pointer',
                      boxShadow: '0 6px 20px rgba(139, 92, 246, 0.3)'
                    }}
                  >
                    {loading ? 'Registering...' : 'Complete Account ✨'}
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                Registered Email Address *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@example.com"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  background: '#f8fafc',
                  border: '1.5px solid #cbd5e1',
                  borderRadius: '12px',
                  color: '#0f172a',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                Password / Security PIN
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password or leave blank for instant login"
                  style={{
                    width: '100%',
                    padding: '0.75rem 2.5rem 0.75rem 1rem',
                    background: '#f8fafc',
                    border: '1.5px solid #cbd5e1',
                    borderRadius: '12px',
                    color: '#0f172a',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1rem'
                  }}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '0.85rem',
                background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                border: 'none',
                borderRadius: '12px',
                color: 'white',
                fontWeight: 800,
                fontSize: '0.92rem',
                cursor: 'pointer',
                boxShadow: '0 6px 20px rgba(99, 102, 241, 0.3)',
                marginTop: '0.5rem'
              }}
            >
              {loading ? 'Signing In...' : 'Sign In to Profile 🔓'}
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
