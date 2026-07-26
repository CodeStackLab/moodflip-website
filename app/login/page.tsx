'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function LoginPage() {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [consent, setConsent] = useState(true);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const profile = { email, name: name || email.split('@')[0], lastActiveAt: new Date().toISOString() };
      localStorage.setItem('moodflip_profile', JSON.stringify(profile));
      await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name: name || email.split('@')[0] })
      }).catch(() => {});
      setSuccess(true);
      setTimeout(() => {
        window.location.href = '/profile';
      }, 1000);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="site-shell">
      <Header />

      <main style={{ maxWidth: '460px', margin: '2.5rem auto', padding: '0 1rem' }}>
        <div style={{
          background: 'var(--card-bg)',
          border: '1px solid var(--card-border)',
          borderRadius: '28px',
          padding: '2.5rem 2rem',
          boxShadow: '0 20px 60px rgba(0,0,0,0.04)'
        }}>

          {/* Logo & Title */}
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <div style={{
              width: '54px',
              height: '54px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #7c54d1, #ec4899)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.65rem',
              color: 'white',
              boxShadow: '0 8px 20px rgba(124, 84, 209, 0.25)',
              marginBottom: '0.75rem'
            }}>
              💫
            </div>
            <h1 style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontSize: '1.75rem',
              fontWeight: 700,
              color: 'var(--text-main)',
              letterSpacing: '-0.02em'
            }}>
              {isRegisterMode ? 'Create Your Account' : 'Welcome Back'}
            </h1>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-subtle)', marginTop: '0.25rem' }}>
              {isRegisterMode
                ? 'Save your mood check-ins & receive custom emotional plans.'
                : 'Sign in with your email to access your dashboard.'}
            </p>
          </div>

          {/* Mode Selector Tabs */}
          <div style={{
            display: 'flex',
            background: 'var(--tile-bg)',
            border: '1px solid var(--card-border)',
            borderRadius: '9999px',
            padding: '0.25rem',
            marginBottom: '1.5rem'
          }}>
            <button
              type="button"
              onClick={() => setIsRegisterMode(false)}
              style={{
                flex: 1,
                padding: '0.6rem',
                borderRadius: '9999px',
                border: 'none',
                background: !isRegisterMode ? 'var(--tile-selected-bg)' : 'transparent',
                color: !isRegisterMode ? '#a855f7' : 'var(--text-subtle)',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              Sign In
            </button>

            <button
              type="button"
              onClick={() => setIsRegisterMode(true)}
              style={{
                flex: 1,
                padding: '0.6rem',
                borderRadius: '9999px',
                border: 'none',
                background: isRegisterMode ? 'var(--tile-selected-bg)' : 'transparent',
                color: isRegisterMode ? '#a855f7' : 'var(--text-subtle)',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              Register Account
            </button>
          </div>

          {success ? (
            <div style={{
              background: 'rgba(16, 185, 129, 0.12)',
              border: '1px solid #10b981',
              color: 'var(--text-main)',
              borderRadius: '20px',
              padding: '1.5rem',
              textAlign: 'center',
              fontSize: '0.92rem',
              fontWeight: 700
            }}>
              <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }}>✨</span>
              Signed In Successfully!
              <p style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--text-subtle)', marginTop: '0.25rem' }}>
                Redirecting to your profile dashboard...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
              
              {isRegisterMode && (
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
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
                      background: 'var(--tile-bg)',
                      border: '1.5px solid var(--card-border)',
                      borderRadius: '12px',
                      color: 'var(--text-main)',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  />
                </div>
              )}

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                  Email Address <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: 'var(--tile-bg)',
                    border: '1.5px solid var(--card-border)',
                    borderRadius: '12px',
                    color: 'var(--text-main)',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
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
                      background: 'var(--tile-bg)',
                      border: '1.5px solid var(--card-border)',
                      borderRadius: '12px',
                      color: 'var(--text-main)',
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

              {isRegisterMode && (
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', cursor: 'pointer', fontSize: '0.78rem', color: 'var(--text-subtle)', lineHeight: 1.45 }}>
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    style={{ marginTop: '0.15rem' }}
                  />
                  <span>
                    I agree that MoodFlip may store my email & check-in history to provide personalized plans.
                  </span>
                </label>
              )}

              <button
                type="submit"
                disabled={loading || (isRegisterMode && !consent)}
                style={{
                  width: '100%',
                  padding: '0.85rem',
                  background: 'linear-gradient(135deg, #7c54d1, #ec4899)',
                  border: 'none',
                  borderRadius: '12px',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '0.92rem',
                  cursor: 'pointer',
                  boxShadow: '0 6px 18px rgba(124, 84, 209, 0.3)',
                  marginTop: '0.4rem',
                  opacity: (isRegisterMode && !consent) ? 0.5 : 1
                }}
              >
                {loading
                  ? 'Authenticating...'
                  : isRegisterMode
                    ? 'Create Account ✨'
                    : 'Sign In to Dashboard ✨'}
              </button>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
