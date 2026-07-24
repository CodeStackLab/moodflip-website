'use client';

import React, { useState } from 'react';

export default function LoginPage() {
  const [isRegisterMode, setIsRegisterMode] = useState(false); // Default to Sign In mode for speed
  
  // Fields
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
    <div style={{ maxWidth: '440px', margin: '2.5rem auto', padding: '0 1rem' }}>
      {/* Auth Card Container */}
      <div style={{
        background: '#ffffff',
        border: '1px solid rgba(139, 92, 246, 0.18)',
        borderRadius: '24px',
        padding: '2.25rem 2rem',
        boxShadow: '0 20px 50px rgba(139, 92, 246, 0.08), 0 4px 15px rgba(0,0,0,0.02)',
      }}>

        {/* Logo & Title */}
        <div style={{ textAlign: 'center', marginBottom: '1.35rem' }}>
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.65rem',
            boxShadow: '0 8px 20px rgba(139, 92, 246, 0.25)',
            marginBottom: '0.65rem'
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
              ? 'Save your mood check-ins & receive custom emotional plans.'
              : 'Sign in with your email & password to access your dashboard.'}
          </p>
        </div>

        {/* DEMO USER HELPER BOX */}
        <div style={{
          background: '#fcfbfe',
          border: '1.5px solid #ddd6fe',
          borderRadius: '16px',
          padding: '0.85rem 1rem',
          marginBottom: '1.25rem',
          fontSize: '0.82rem'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
            <span style={{ fontWeight: 800, color: '#6d28d9', fontSize: '0.78rem' }}>⚡ DEMO USER CREDENTIALS</span>
            <button
              type="button"
              onClick={handleDemoUserFill}
              style={{
                background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                color: 'white',
                border: 'none',
                padding: '0.25rem 0.65rem',
                borderRadius: '8px',
                fontSize: '0.72rem',
                fontWeight: 800,
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(139, 92, 246, 0.25)'
              }}
            >
              1-Click Fill Demo
            </button>
          </div>
          <div style={{ color: '#475569', lineHeight: 1.45, fontSize: '0.8rem' }}>
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
          marginBottom: '1.35rem'
        }}>
          <button
            type="button"
            onClick={() => setIsRegisterMode(false)}
            style={{
              flex: 1,
              padding: '0.55rem',
              borderRadius: '9999px',
              border: 'none',
              background: !isRegisterMode ? '#ffffff' : 'transparent',
              color: !isRegisterMode ? '#1e1b4b' : '#64748b',
              fontWeight: 800,
              fontSize: '0.82rem',
              cursor: 'pointer',
              boxShadow: !isRegisterMode ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
              transition: 'all 0.18s ease'
            }}
          >
            Sign In
          </button>

          <button
            type="button"
            onClick={() => setIsRegisterMode(true)}
            style={{
              flex: 1,
              padding: '0.55rem',
              borderRadius: '9999px',
              border: 'none',
              background: isRegisterMode ? '#ffffff' : 'transparent',
              color: isRegisterMode ? '#1e1b4b' : '#64748b',
              fontWeight: 800,
              fontSize: '0.82rem',
              cursor: 'pointer',
              boxShadow: isRegisterMode ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
              transition: 'all 0.18s ease'
            }}
          >
            Register Account
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
            Signed In Successfully!
            <p style={{ fontSize: '0.8rem', fontWeight: 500, color: '#047857', marginTop: '0.25rem' }}>
              Redirecting to your profile dashboard...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            
            {/* Full Name field (Only in Registration Mode) */}
            {isRegisterMode && (
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
            )}

            {/* Email Address field */}
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                Email Address <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="demo@moodflip.coach"
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

            {/* Password field */}
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
                  placeholder="Enter password (user123)"
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

            {/* Consent checkbox (Only in Registration Mode) */}
            {isRegisterMode && (
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', cursor: 'pointer', fontSize: '0.75rem', color: '#64748b', lineHeight: 1.45, marginTop: '0.2rem' }}>
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || (isRegisterMode && !consent)}
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
                boxShadow: '0 6px 18px rgba(139, 92, 246, 0.3)',
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
    </div>
  );
}
