'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [consent, setConsent] = useState(true);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
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

      <main style={{ maxWidth: '680px', margin: '2.5rem auto', padding: '0 1rem' }}>
        <div style={{
          background: '#0f172a',
          borderRadius: '32px',
          border: '1.5px solid #1e293b',
          boxShadow: '0 25px 70px rgba(15, 23, 42, 0.4)',
          padding: '3rem 2.5rem',
          color: '#ffffff'
        }}>

          {/* Top Badge */}
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'rgba(139, 92, 246, 0.15)',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              color: '#c084fc',
              padding: '0.35rem 1rem',
              borderRadius: '9999px',
              fontSize: '0.78rem',
              fontWeight: 800,
              letterSpacing: '0.04em',
              marginBottom: '0.85rem'
            }}>
              <span>✨ JOIN MOODFLIP FREE</span>
            </div>

            <h1 style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              fontWeight: 800,
              color: '#ffffff',
              margin: '0 0 0.4rem 0'
            }}>
              Create Your MoodFlip Profile
            </h1>

            <p style={{ fontSize: '0.9rem', color: '#94a3b8', maxWidth: '480px', margin: '0 auto', lineHeight: 1.5 }}>
              Save your check-in history, track your emotional shifts, and receive custom 7-day mindset PDF reports.
            </p>
          </div>

          {/* Step Indicator Tabs */}
          <div style={{
            display: 'flex',
            background: '#1e293b',
            borderRadius: '16px',
            padding: '0.3rem',
            marginBottom: '2rem',
            gap: '0.3rem'
          }}>
            <button
              type="button"
              onClick={() => setStep(1)}
              style={{
                flex: 1,
                padding: '0.65rem',
                borderRadius: '12px',
                border: 'none',
                background: step === 1 ? 'linear-gradient(135deg, #7c54d1, #ec4899)' : 'transparent',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              1. Account Info
            </button>

            <button
              type="button"
              onClick={() => setStep(2)}
              style={{
                flex: 1,
                padding: '0.65rem',
                borderRadius: '12px',
                border: 'none',
                background: step === 2 ? 'linear-gradient(135deg, #7c54d1, #ec4899)' : 'transparent',
                color: step === 2 ? '#ffffff' : '#94a3b8',
                fontWeight: 800,
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              2. Privacy & Consent
            </button>
          </div>

          {success ? (
            <div style={{
              background: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid #10b981',
              color: '#6ee7b7',
              borderRadius: '20px',
              padding: '2rem',
              textAlign: 'center'
            }}>
              <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '0.5rem' }}>✨</span>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                Profile Created Successfully!
              </h2>
              <p style={{ fontSize: '0.88rem', color: '#94a3b8', marginTop: '0.35rem' }}>
                Redirecting to your personal dashboard...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.35rem' }}>
              
              {step === 1 && (
                <>
                  {/* Display Name */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.45rem' }}>
                      DISPLAY NAME / USERNAME
                    </label>
                    <div style={{ position: 'relative' }}>
                      <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '1rem', color: '#64748b' }}>
                        👤
                      </span>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Alex Morgan"
                        style={{
                          width: '100%',
                          padding: '0.8rem 1rem 0.8rem 2.6rem',
                          background: '#1e293b',
                          border: '1.5px solid #334155',
                          borderRadius: '12px',
                          color: '#ffffff',
                          fontSize: '0.92rem',
                          outline: 'none'
                        }}
                      />
                    </div>
                  </div>

                  {/* Email Address */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.45rem' }}>
                      EMAIL ADDRESS <span style={{ color: '#ec4899' }}>*</span>
                    </label>
                    <div style={{ position: 'relative' }}>
                      <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '1rem', color: '#64748b' }}>
                        ✉️
                      </span>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="admin@demo.com"
                        style={{
                          width: '100%',
                          padding: '0.8rem 1rem 0.8rem 2.6rem',
                          background: '#1e293b',
                          border: '1.5px solid #334155',
                          borderRadius: '12px',
                          color: '#ffffff',
                          fontSize: '0.92rem',
                          outline: 'none'
                        }}
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.45rem' }}>
                      PASSWORD <span style={{ color: '#ec4899' }}>*</span>
                    </label>
                    <div style={{ position: 'relative' }}>
                      <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '1rem', color: '#64748b' }}>
                        🔒
                      </span>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        style={{
                          width: '100%',
                          padding: '0.8rem 2.6rem 0.8rem 2.6rem',
                          background: '#1e293b',
                          border: '1.5px solid #334155',
                          borderRadius: '12px',
                          color: '#ffffff',
                          fontSize: '0.92rem',
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
                    type="button"
                    onClick={() => setStep(2)}
                    disabled={!email || !password}
                    style={{
                      width: '100%',
                      padding: '0.9rem',
                      background: 'linear-gradient(135deg, #7c54d1 0%, #ec4899 100%)',
                      border: 'none',
                      borderRadius: '14px',
                      color: 'white',
                      fontWeight: 800,
                      fontSize: '0.95rem',
                      cursor: 'pointer',
                      boxShadow: '0 8px 24px rgba(124, 84, 209, 0.4)',
                      opacity: (!email || !password) ? 0.5 : 1
                    }}
                  >
                    Next Step: Privacy Consent →
                  </button>
                </>
              )}

              {step === 2 && (
                <>
                  <div style={{
                    background: '#1e293b',
                    border: '1.5px solid #334155',
                    borderRadius: '18px',
                    padding: '1.25rem',
                    marginBottom: '0.5rem'
                  }}>
                    <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#c084fc', margin: '0 0 0.5rem 0' }}>
                      📋 MoodFlip Data Privacy Notice
                    </h3>
                    <p style={{ fontSize: '0.84rem', color: '#94a3b8', lineHeight: 1.5, margin: 0 }}>
                      By creating a profile, you agree that MoodFlip may store your email address, selected moods/dates, actions shown, and purchase history so we can generate custom PDF reports for you.
                    </p>
                    <p style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '0.5rem', margin: 0 }}>
                      * The free MoodFlip tool always remains available with <strong>no profile required</strong>.
                    </p>
                  </div>

                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', cursor: 'pointer', fontSize: '0.84rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      style={{ marginTop: '0.15rem', accentColor: '#7c54d1', width: '18px', height: '18px' }}
                    />
                    <span>
                      I agree to the privacy policy & consent to storing my check-in history.
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={loading || !consent}
                    style={{
                      width: '100%',
                      padding: '0.9rem',
                      background: 'linear-gradient(135deg, #7c54d1 0%, #ec4899 100%)',
                      border: 'none',
                      borderRadius: '14px',
                      color: 'white',
                      fontWeight: 800,
                      fontSize: '0.95rem',
                      cursor: 'pointer',
                      boxShadow: '0 8px 24px rgba(124, 84, 209, 0.4)',
                      opacity: (loading || !consent) ? 0.5 : 1
                    }}
                  >
                    {loading ? 'Creating Profile...' : 'Create Free Profile ✨'}
                  </button>
                </>
              )}
            </form>
          )}

          {/* Link to Login */}
          <div style={{ textAlign: 'center', marginTop: '1.75rem', fontSize: '0.88rem', color: '#94a3b8' }}>
            Already have a MoodFlip profile?{' '}
            <a href="/login" style={{ color: '#c084fc', fontWeight: 800, textDecoration: 'none' }}>
              Log In Here
            </a>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
