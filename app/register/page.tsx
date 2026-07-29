'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // OTP State
  const [otpInput, setOtpInput] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [demoOtpHint, setDemoOtpHint] = useState('');
  const [otpError, setOtpError] = useState('');

  // Step state: 1 = Account Info, 2 = OTP Verification, 3 = Privacy & Consent
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const [consent, setConsent] = useState(true);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Handle Step 1 -> Send OTP
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Please provide a valid email and password.');
      return;
    }
    setLoading(true);
    setErrorMsg('');
    setOtpError('');

    try {
      const res = await fetch('/api/auth/otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'send', email })
      });
      const data = await res.json();

      if (data.success) {
        setOtpSent(true);
        if (data.demoOtp) {
          setDemoOtpHint(data.demoOtp);
        }
        setStep(2);
      } else {
        setErrorMsg(data.error || 'Failed to send OTP code.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Network error while sending verification code.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Step 2 -> Verify OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpInput || otpInput.trim().length < 6) {
      setOtpError('Please enter the full 6-digit verification code.');
      return;
    }
    setLoading(true);
    setOtpError('');

    try {
      const res = await fetch('/api/auth/otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'verify', email, code: otpInput })
      });
      const data = await res.json();

      if (data.success) {
        setOtpVerified(true);
        setStep(3);
      } else {
        setOtpError(data.error || 'Invalid verification code.');
      }
    } catch (err) {
      console.error(err);
      setOtpError('Error verifying code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Step 3 -> Complete Registration
  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpVerified) {
      setErrorMsg('OTP Email verification is required before registering.');
      setStep(2);
      return;
    }
    if (!consent) {
      setErrorMsg('You must agree to the privacy policy consent.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

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
      }, 1200);
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to create account profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="site-shell">
      <Header />

      <main style={{ maxWidth: '1140px', margin: '2rem auto', padding: '0 1rem' }}>
        {/* MAIN 2-COLUMN PORTAL CARD CONTAINER MATCHING LOGIN */}
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
                <span>✨ JOIN MOODFLIP PORTAL</span>
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
                Create Your <span style={{ background: 'linear-gradient(135deg, #c084fc, #f472b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Mindset Profile</span>
              </h1>
              <p style={{ fontSize: '0.92rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '2rem' }}>
                Join MoodFlip to save your check-in history, verify your email with OTP security, and receive custom 7-day emotional shift roadmaps.
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
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>
                    ✉️
                  </div>
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#f8fafc' }}>OTP Email Security</div>
                    <div style={{ fontSize: '0.76rem', color: '#94a3b8' }}>Verified 6-digit OTP ensures 100% account authenticity</div>
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
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(139, 92, 246, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>
                    📊
                  </div>
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#f8fafc' }}>Personalized Growth Insights</div>
                    <div style={{ fontSize: '0.76rem', color: '#94a3b8' }}>Automatic tracking of your daily negative to positive shifts</div>
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
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#f8fafc' }}>Instant PDF Downloads</div>
                    <div style={{ fontSize: '0.76rem', color: '#94a3b8' }}>Custom 7-Day Mindset PDF delivered directly to email</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quote */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              borderLeft: '3px solid #ec4899',
              padding: '0.85rem 1.1rem',
              borderRadius: '0 12px 12px 0',
              marginTop: '1.5rem'
            }}>
              <p style={{ fontSize: '0.8rem', color: '#cbd5e1', fontStyle: 'italic', margin: 0, lineHeight: 1.5 }}>
                &ldquo;Creating a profile allowed me to track my 7-day emotional growth and get custom PDF shift roadmaps.&rdquo;
              </p>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#f472b6', display: 'block', marginTop: '0.35rem' }}>
                — David K., Verified User
              </span>
            </div>
          </div>

          {/* RIGHT COLUMN: 3-STEP REGISTER FORM */}
          <div style={{
            flex: '1 1 440px',
            padding: '3rem 2.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            background: '#0f172a'
          }}>
            <div style={{ maxWidth: '420px', margin: '0 auto', width: '100%' }}>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <h2 style={{
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  color: '#ffffff',
                  marginBottom: '0.35rem'
                }}>
                  Create Your Account
                </h2>
                <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: 0 }}>
                  Complete the 3 verification steps to activate your profile.
                </p>
              </div>

              {/* Step Navigation Pills */}
              <div style={{
                display: 'flex',
                background: '#1e293b',
                borderRadius: '14px',
                padding: '0.3rem',
                marginBottom: '1.75rem',
                gap: '0.25rem'
              }}>
                <div style={{
                  flex: 1,
                  textAlign: 'center',
                  padding: '0.55rem 0.2rem',
                  borderRadius: '10px',
                  background: step === 1 ? 'linear-gradient(135deg, #7c54d1, #ec4899)' : 'transparent',
                  color: step === 1 ? '#ffffff' : '#94a3b8',
                  fontWeight: 800,
                  fontSize: '0.76rem'
                }}>
                  1. Info
                </div>

                <div style={{
                  flex: 1,
                  textAlign: 'center',
                  padding: '0.55rem 0.2rem',
                  borderRadius: '10px',
                  background: step === 2 ? 'linear-gradient(135deg, #7c54d1, #ec4899)' : 'transparent',
                  color: step === 2 ? '#ffffff' : '#94a3b8',
                  fontWeight: 800,
                  fontSize: '0.76rem'
                }}>
                  2. OTP Code {otpVerified ? '✓' : ''}
                </div>

                <div style={{
                  flex: 1,
                  textAlign: 'center',
                  padding: '0.55rem 0.2rem',
                  borderRadius: '10px',
                  background: step === 3 ? 'linear-gradient(135deg, #7c54d1, #ec4899)' : 'transparent',
                  color: step === 3 ? '#ffffff' : '#94a3b8',
                  fontWeight: 800,
                  fontSize: '0.76rem'
                }}>
                  3. Consent
                </div>
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
                  borderRadius: '18px',
                  padding: '1.75rem',
                  textAlign: 'center'
                }}>
                  <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '0.5rem' }}>✨</span>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, color: '#ffffff' }}>Account Verified & Created!</h3>
                  <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '0.4rem', margin: 0 }}>
                    Redirecting to your profile dashboard...
                  </p>
                </div>
              ) : (
                <>
                  {/* STEP 1: ACCOUNT INFO */}
                  {step === 1 && (
                    <form onSubmit={handleSendOtp} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
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
                        type="submit"
                        disabled={loading || !email || !password}
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
                          opacity: (!email || !password) ? 0.5 : 1
                        }}
                      >
                        {loading ? 'Sending OTP...' : 'Send OTP Verification Code →'}
                      </button>
                    </form>
                  )}

                  {/* STEP 2: OTP EMAIL VERIFICATION */}
                  {step === 2 && (
                    <form onSubmit={handleVerifyOtp} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                      <div style={{
                        background: 'rgba(124, 84, 209, 0.12)',
                        border: '1px solid rgba(139, 92, 246, 0.3)',
                        borderRadius: '16px',
                        padding: '1rem 1.15rem'
                      }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#c084fc', marginBottom: '0.2rem' }}>
                          📩 OTP Code Sent to Email:
                        </div>
                        <div style={{ fontSize: '0.92rem', color: '#ffffff', fontWeight: 700 }}>
                          {email}
                        </div>
                        {demoOtpHint && (
                          <div style={{ marginTop: '0.6rem', fontSize: '0.78rem', color: '#a7f3d0', background: 'rgba(16, 185, 129, 0.2)', padding: '0.4rem 0.65rem', borderRadius: '8px' }}>
                            🔑 <strong>Demo OTP Verification Code:</strong> <span style={{ fontSize: '0.95rem', fontWeight: 900, letterSpacing: '0.1em' }}>{demoOtpHint}</span>
                            <button
                              type="button"
                              onClick={() => setOtpInput(demoOtpHint)}
                              style={{ marginLeft: '0.5rem', background: '#059669', color: 'white', border: 'none', padding: '0.15rem 0.5rem', borderRadius: '6px', fontSize: '0.72rem', fontWeight: 800, cursor: 'pointer' }}
                            >
                              Auto-Fill Code
                            </button>
                          </div>
                        )}
                      </div>

                      {otpError && (
                        <div style={{
                          background: 'rgba(239, 68, 68, 0.15)',
                          border: '1px solid #ef4444',
                          color: '#fca5a5',
                          padding: '0.75rem 1rem',
                          borderRadius: '12px',
                          fontSize: '0.85rem'
                        }}>
                          ⚠️ {otpError}
                        </div>
                      )}

                      <div>
                        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.45rem' }}>
                          ENTER 6-DIGIT VERIFICATION CODE <span style={{ color: '#ec4899' }}>*</span>
                        </label>
                        <input
                          type="text"
                          required
                          maxLength={6}
                          value={otpInput}
                          onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, ''))}
                          placeholder="e.g. 842915"
                          style={{
                            width: '100%',
                            padding: '0.85rem 1rem',
                            background: '#1e293b',
                            border: '1.5px solid #334155',
                            borderRadius: '12px',
                            color: '#ffffff',
                            fontSize: '1.25rem',
                            fontWeight: 800,
                            letterSpacing: '0.25em',
                            textAlign: 'center',
                            outline: 'none'
                          }}
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={loading || otpInput.length < 6}
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
                          opacity: (loading || otpInput.length < 6) ? 0.5 : 1
                        }}
                      >
                        {loading ? 'Verifying OTP...' : 'Verify OTP Code →'}
                      </button>

                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '0.82rem', cursor: 'pointer', textDecoration: 'underline' }}
                        >
                          ← Change Email
                        </button>

                        <button
                          type="button"
                          onClick={handleSendOtp}
                          style={{ background: 'transparent', border: 'none', color: '#c084fc', fontSize: '0.82rem', cursor: 'pointer', fontWeight: 700 }}
                        >
                          Resend Code 🔄
                        </button>
                      </div>
                    </form>
                  )}

                  {/* STEP 3: PRIVACY & CONSENT */}
                  {step === 3 && (
                    <form onSubmit={handleFinalSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                      <div style={{
                        background: 'rgba(16, 185, 129, 0.12)',
                        border: '1px solid #10b981',
                        borderRadius: '16px',
                        padding: '0.85rem 1.1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.65rem'
                      }}>
                        <span style={{ fontSize: '1.3rem' }}>✅</span>
                        <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#6ee7b7' }}>
                          Email Verified: {email}
                        </div>
                      </div>

                      <div style={{
                        background: '#1e293b',
                        border: '1.5px solid #334155',
                        borderRadius: '18px',
                        padding: '1.25rem'
                      }}>
                        <h3 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#c084fc', margin: '0 0 0.5rem 0' }}>
                          📋 MoodFlip Data Privacy Notice
                        </h3>
                        <p style={{ fontSize: '0.84rem', color: '#94a3b8', lineHeight: 1.5, margin: 0 }}>
                          By creating a profile, you agree that MoodFlip may store your email address, selected moods/dates, actions shown, and purchase history so we can generate custom PDF reports for you.
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
                        {loading ? 'Activating Profile...' : 'Complete Registration ✨'}
                      </button>
                    </form>
                  )}
                </>
              )}

              {/* Link to Login */}
              <div style={{ textAlign: 'center', marginTop: '1.75rem', fontSize: '0.85rem', color: '#94a3b8' }}>
                Already have a MoodFlip profile?{' '}
                <a href="/login" style={{ color: '#c084fc', fontWeight: 800, textDecoration: 'none' }}>
                  Log In Here
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
