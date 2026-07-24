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

  const handleDemoUserFill = () => {
    setName('Demo User');
    setEmail('demo@moodflip.coach');
    setPassword('user123');
  };

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
      const profile = { email, name: name || 'Demo User', lastActiveAt: new Date().toISOString() };
      localStorage.setItem('moodflip_profile', JSON.stringify(profile));
      await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name: name || 'Demo User' })
      }).catch(() => {});
      setSuccess(true);
      setTimeout(() => {
        window.location.href = '/profile';
      }, 1200);
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
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
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

        {/* DEMO USER HELPER BOX */}
        <div style={{
          background: '#fcfbfe',
          border: '1.5px solid #ddd6fe',
          borderRadius: '16px',
          padding: '1rem',
          marginBottom: '1.5rem',
          fontSize: '0.82rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
            <span style={{ fontWeight: 800, color: '#6d28d9', fontSize: '0.8rem' }}>⚡ DEMO USER CREDENTIALS</span>
            <button
              type="button"
              onClick={handleDemoUserFill}
              style={{
                background: '#8b5cf6',
                color: 'white',
                border: 'none',
                padding: '0.2rem 0.6rem',
                borderRadius: '8px',
                fontSize: '0.72rem',
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              1-Click Fill Demo
            </button>
          </div>
          <div style={{ color: '#475569', lineHeight: 1.5 }}>
            <div><strong>Email:</strong> <code>demo@moodflip.coach</code></div>
            <div><strong>Password:</strong> <code>user123</code></div>
          </div>
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
              padding: '0.6rem',
              borderRadius: '9999px',
              border: 'none',
              background: isRegisterMode ? '#ffffff' : 'transparent',
              color: isRegisterMode ? '#1e1b4b' : '#64748b',
              fontWeight: 800,
              fontSize: '0.82rem',
              cursor: 'pointer',
              boxShadow: isRegisterMode ? '0 2px 8px rgba(0,0,0,0.06)' : 'none'
            }}
          >
            Register Profile
          </button>

          <button
            type="button"
            onClick={() => { setIsRegisterMode(false); setStep(1); }}
            style={{
              flex: 1,
              padding: '0.6rem',
              borderRadius: '9999px',
              border: 'none',
              background: !isRegisterMode ? '#ffffff' : 'transparent',
              color: !isRegisterMode ? '#1e1b4b' : '#64748b',
              fontWeight: 800,
              fontSize: '0.82rem',
              cursor: 'pointer',
              boxShadow: !isRegisterMode ? '0 2px 8px rgba(0,0,0,0.06)' : 'none'
            }}
          >
            Quick Sign In
          </button>
        </div>

        {success ? (
          <div style={{
            background: '#ecfdf5',
            border: '1px solid #a7f3d0',
            color: '#065f46',
            borderRadius: '16px',
            padding: '1.5rem',
            textAlign: 'center',
            fontSize: '0.9rem',
            fontWeight: 700
          }}>
            <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }}>✨</span>
            Account Authenticated Successfully!
            <p style={{ fontSize: '0.8rem', fontWeight: 500, color: '#047857', marginTop: '0.25rem' }}>
              Redirecting to your user dashboard...
            </p>
          </div>
        ) : (
          <form onSubmit={step === 1 ? handleNextStep : handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
            {/* Step Indicator */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', fontWeight: 800, color: '#8b5cf6' }}>
              <span style={{ background: '#f3e8ff', width: '22px', height: '22px', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                {step}
              </span>
              <span>{step === 1 ? 'Step 1: Your Profile Info' : 'Step 2: Password & Consent'}</span>
            </div>

            {step === 1 ? (
              <>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                    Full Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Morgan"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
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
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                    Email Address <span style={{ color: '#ef4444' }}>*</span>
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
                      fontSize: '0.88rem',
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
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    boxShadow: '0 6px 18px rgba(139, 92, 246, 0.3)',
                    marginTop: '0.5rem'
                  }}
                >
                  Continue to Step 2 &rarr;
                </button>
              </>
            ) : (
              <>
                <div style={{ background: '#f8fafc', padding: '0.65rem 0.85rem', borderRadius: '10px', fontSize: '0.8rem', color: '#475569' }}>
                  Account: <strong>{email}</strong> ({name || 'No name provided'})
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                    Password <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter account password"
                      style={{
                        width: '100%',
                        padding: '0.75rem 2.5rem 0.75rem 1rem',
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

                {isRegisterMode && (
                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', cursor: 'pointer', fontSize: '0.75rem', color: '#64748b', lineHeight: 1.4 }}>
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      style={{ marginTop: '0.15rem' }}
                    />
                    <span>
                      I agree that MoodFlip may store my email, selected moods, and check-in history to provide personalized plans.
                    </span>
                  </label>
                )}

                <div style={{ display: 'flex', gap: '0.65rem', marginTop: '0.5rem' }}>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    style={{
                      padding: '0.75rem 1rem',
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
                    disabled={loading || (isRegisterMode && !consent)}
                    style={{
                      flex: 1,
                      padding: '0.85rem',
                      background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
                      border: 'none',
                      borderRadius: '12px',
                      color: 'white',
                      fontWeight: 800,
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      boxShadow: '0 6px 18px rgba(139, 92, 246, 0.3)',
                      opacity: (isRegisterMode && !consent) ? 0.5 : 1
                    }}
                  >
                    {loading ? 'Authenticating...' : isRegisterMode ? 'Complete Registration ✨' : 'Sign In Now ✨'}
                  </button>
                </div>
              </>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
