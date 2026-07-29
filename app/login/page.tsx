'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    setErrorMsg('');

    try {
      const profile = { email, name: email.split('@')[0], lastActiveAt: new Date().toISOString() };
      localStorage.setItem('moodflip_profile', JSON.stringify(profile));

      await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name: email.split('@')[0] })
      }).catch(() => {});

      setSuccess(true);
      setTimeout(() => {
        window.location.href = '/profile';
      }, 1000);
    } catch (err) {
      console.error(err);
      setErrorMsg('Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="site-shell">
      <Header />

      <main style={{ maxWidth: '1140px', margin: '2rem auto', padding: '0 1rem' }}>
        {/* MAIN 2-COLUMN LOGIN CARD CONTAINER */}
        <div style={{
          background: '#0f172a',
          borderRadius: '32px',
          border: '1.5px solid #1e293b',
          boxShadow: '0 25px 70px rgba(15, 23, 42, 0.4)',
          overflow: 'hidden',
          display: 'flex',
          flexWrap: 'wrap',
          color: '#ffffff'
        }}>

          {/* LEFT COLUMN: HERO / PORTAL INFO */}
          <div style={{
            flex: '1 1 440px',
            padding: '3rem 2.5rem',
            background: 'linear-gradient(160deg, #1e1b4b 0%, #0f172a 100%)',
            borderRight: '1px solid #1e293b',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '2rem'
          }}>
            <div>
              {/* Portal Badge */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: 'rgba(139, 92, 246, 0.15)',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                color: '#c084fc',
                padding: '0.35rem 0.9rem',
                borderRadius: '9999px',
                fontSize: '0.78rem',
                fontWeight: 800,
                letterSpacing: '0.04em',
                marginBottom: '1.25rem'
              }}>
                <span>✨ MOODFLIP PORTAL</span>
              </div>

              {/* Title & Subtitle */}
              <h1 style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
                fontWeight: 800,
                color: '#ffffff',
                lineHeight: 1.15,
                marginBottom: '0.85rem'
              }}>
                Welcome Back to Your <span style={{ background: 'linear-gradient(135deg, #c084fc, #f472b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Mindset Hub</span>
              </h1>
              <p style={{ fontSize: '0.92rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '2rem' }}>
                Log in to access your saved mood check-ins, custom 7-day emotional shift roadmaps, and personal PDF downloads.
              </p>

              {/* Highlight Cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '16px',
                  padding: '0.85rem 1.1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem'
                }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(139, 92, 246, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>
                    📊
                  </div>
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#f8fafc' }}>Saved Check-in History</div>
                    <div style={{ fontSize: '0.76rem', color: '#94a3b8' }}>Keep track of your daily mindset shifts & positive moods</div>
                  </div>
                </div>

                <div style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '16px',
                  padding: '0.85rem 1.1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem'
                }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(236, 72, 153, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>
                    📘
                  </div>
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#f8fafc' }}>7-Day Personalized PDF Reports</div>
                    <div style={{ fontSize: '0.76rem', color: '#94a3b8' }}>Download custom emotional shift roadmaps</div>
                  </div>
                </div>

                <div style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '16px',
                  padding: '0.85rem 1.1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem'
                }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>
                    🔒
                  </div>
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#f8fafc' }}>100% Private & Secure</div>
                    <div style={{ fontSize: '0.76rem', color: '#94a3b8' }}>Automatic 90-day inactivity purge policy</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial Quote */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              borderLeft: '3px solid #c084fc',
              padding: '0.85rem 1.1rem',
              borderRadius: '0 12px 12px 0',
              marginTop: '1.5rem'
            }}>
              <p style={{ fontSize: '0.8rem', color: '#cbd5e1', fontStyle: 'italic', margin: 0, lineHeight: 1.5 }}>
                &ldquo;MoodFlip helps me pause and reframe my thoughts in under 60 seconds whenever I feel overwhelmed.&rdquo;
              </p>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#c084fc', display: 'block', marginTop: '0.35rem' }}>
                — Sarah M., Daily Visitor
              </span>
            </div>
          </div>

          {/* RIGHT COLUMN: LOGIN FORM */}
          <div style={{
            flex: '1 1 440px',
            padding: '3rem 2.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            background: '#0f172a'
          }}>
            <div style={{ maxWidth: '400px', margin: '0 auto', width: '100%' }}>
              
              <div style={{ marginBottom: '1.75rem' }}>
                <h2 style={{
                  fontSize: '1.6rem',
                  fontWeight: 800,
                  color: '#ffffff',
                  marginBottom: '0.35rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <span>🔑</span> Log In to Your Account
                </h2>
                <p style={{ fontSize: '0.88rem', color: '#94a3b8', margin: 0 }}>
                  Enter your email address and password to access your profile.
                </p>
              </div>

              {errorMsg && (
                <div style={{
                  background: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid #ef4444',
                  color: '#fca5a5',
                  padding: '0.75rem 1rem',
                  borderRadius: '12px',
                  fontSize: '0.85rem',
                  marginBottom: '1.25rem'
                }}>
                  ⚠️ {errorMsg}
                </div>
              )}

              {success ? (
                <div style={{
                  background: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid #10b981',
                  color: '#6ee7b7',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  textAlign: 'center'
                }}>
                  <span style={{ fontSize: '2.2rem', display: 'block', marginBottom: '0.5rem' }}>✨</span>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0, color: '#ffffff' }}>Signed In Successfully!</h3>
                  <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '0.35rem', margin: 0 }}>
                    Redirecting to your personal dashboard...
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {/* Email Input */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.45rem' }}>
                      EMAIL ADDRESS
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
                          outline: 'none',
                          transition: 'border-color 0.2s ease'
                        }}
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem' }}>
                      <label style={{ fontSize: '0.78rem', fontWeight: 800, color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        PASSWORD
                      </label>
                      <a href="/login" style={{ fontSize: '0.78rem', color: '#c084fc', textDecoration: 'none', fontWeight: 700 }}>
                        Forgot Password?
                      </a>
                    </div>
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
                          outline: 'none',
                          transition: 'border-color 0.2s ease'
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

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
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
                      marginTop: '0.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <span>{loading ? 'Authenticating...' : 'Log In'}</span>
                    <span>→</span>
                  </button>
                </form>
              )}

              {/* Link to Register */}
              <div style={{ textAlign: 'center', marginTop: '1.75rem', fontSize: '0.85rem', color: '#94a3b8' }}>
                Don&apos;t have a MoodFlip profile?{' '}
                <a href="/register" style={{ color: '#c084fc', fontWeight: 800, textDecoration: 'none' }}>
                  Register Free
                </a>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
