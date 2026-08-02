'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { supabaseBrowser } from '@/lib/supabaseBrowser';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // OTP State
  const [otpInput, setOtpInput] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
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
      if (!supabaseBrowser) throw new Error('Secure registration is temporarily unavailable.');
      const { data, error } = await supabaseBrowser.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: {
          data: { name: name.trim() },
          emailRedirectTo: `${window.location.origin}/login?confirmed=true`,
        },
      });
      if (error) throw error;
      if (data.session) {
        setOtpVerified(true);
        setStep(3);
      } else {
        setOtpSent(true);
        setStep(2);
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
      if (!supabaseBrowser) throw new Error('Secure verification is temporarily unavailable.');
      const { data, error } = await supabaseBrowser.auth.verifyOtp({
        email: email.trim().toLowerCase(),
        token: otpInput.trim(),
        type: 'signup',
      });
      if (!error && data.session) {
        setOtpVerified(true);
        setStep(3);
      } else {
        setOtpError(error?.message || 'Invalid verification code.');
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
      if (!supabaseBrowser) throw new Error('Secure registration is temporarily unavailable.');
      const { data } = await supabaseBrowser.auth.getSession();
      if (!data.session || !data.session.user.email) {
        throw new Error('Please verify your email before completing registration.');
      }
      const profile = {
        email: data.session.user.email,
        name: name || data.session.user.email.split('@')[0],
        lastActiveAt: new Date().toISOString(),
      };
      localStorage.setItem('moodflip_profile', JSON.stringify(profile));

      const profileResponse = await fetch('/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${data.session.access_token}`,
        },
        body: JSON.stringify({ name: profile.name }),
      });
      if (!profileResponse.ok) throw new Error('Unable to create your profile.');

      setSuccess(true);
      setTimeout(() => {
        window.location.href = '/profile';
      }, 1200);
    } catch (err) {
      console.error(err);
      setErrorMsg(err instanceof Error ? err.message : 'Failed to create account profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="site-shell">
      <Header />

      <main style={{ maxWidth: '1140px', margin: '2rem auto', padding: '0 1rem' }}>
        {/* MAIN 2-COLUMN PORTAL CARD CONTAINER MATCHING HOMEPAGE PALETTE */}
        <div style={{
          background: '#f8f4fe',
          borderRadius: '32px',
          border: '1.5px solid #e2d9f3',
          boxShadow: '0 18px 58px rgba(76, 60, 110, 0.08)',
          overflow: 'hidden',
          display: 'flex',
          flexWrap: 'wrap',
          color: '#362854'
        }}>

          {/* LEFT COLUMN: HERO / PORTAL INFO */}
          <div style={{
            flex: '1 1 440px',
            padding: '3rem 2.5rem',
            background: 'linear-gradient(168deg, #ffffff 0%, #f4effb 100%)',
            borderRight: '1.5px solid #e2d9f3',
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
                background: '#ede5fa',
                border: '1px solid #d6c8f5',
                color: '#7c54d1',
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
                color: '#362854',
                lineHeight: 1.15,
                marginBottom: '0.85rem'
              }}>
                Create Your <span style={{ background: 'linear-gradient(135deg, #7c54d1, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Mindset Profile</span>
              </h1>
              <p style={{ fontSize: '0.92rem', color: '#665c7d', lineHeight: 1.6, marginBottom: '2rem' }}>
                Join MoodFlip to save your check-in history, verify your email with OTP security, and receive custom 7-day emotional shift roadmaps.
              </p>

              {/* Highlight Cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div style={{
                  background: '#ffffff',
                  border: '1px solid #e8dff5',
                  borderRadius: '16px',
                  padding: '0.85rem 1.1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem',
                  boxShadow: '0 4px 14px rgba(124, 84, 209, 0.04)'
                }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>
                    ✉️
                  </div>
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#362854' }}>OTP Email Security</div>
                    <div style={{ fontSize: '0.76rem', color: '#665c7d' }}>Verified 6-digit OTP ensures 100% account authenticity</div>
                  </div>
                </div>

                <div style={{
                  background: '#ffffff',
                  border: '1px solid #e8dff5',
                  borderRadius: '16px',
                  padding: '0.85rem 1.1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem',
                  boxShadow: '0 4px 14px rgba(124, 84, 209, 0.04)'
                }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#f0e9f8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>
                    📊
                  </div>
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#362854' }}>Personalized Growth Insights</div>
                    <div style={{ fontSize: '0.76rem', color: '#665c7d' }}>Automatic tracking of your daily negative to positive shifts</div>
                  </div>
                </div>

                <div style={{
                  background: '#ffffff',
                  border: '1px solid #e8dff5',
                  borderRadius: '16px',
                  padding: '0.85rem 1.1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem',
                  boxShadow: '0 4px 14px rgba(124, 84, 209, 0.04)'
                }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#fce7f3', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>
                    📘
                  </div>
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#362854' }}>Instant PDF Downloads</div>
                    <div style={{ fontSize: '0.76rem', color: '#665c7d' }}>Custom 7-Day Mindset PDF delivered directly to email</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quote */}
            <div style={{
              background: '#ffffff',
              borderLeft: '3.5px solid #ec4899',
              padding: '0.85rem 1.1rem',
              borderRadius: '0 12px 12px 0',
              marginTop: '1.5rem',
              border: '1px solid #e8dff5',
              borderLeftWidth: '3.5px'
            }}>
              <p style={{ fontSize: '0.8rem', color: '#475569', fontStyle: 'italic', margin: 0, lineHeight: 1.5 }}>
                &ldquo;Creating a profile allowed me to track my 7-day emotional growth and get custom PDF shift roadmaps.&rdquo;
              </p>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#ec4899', display: 'block', marginTop: '0.35rem' }}>
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
            background: '#ffffff'
          }}>
            <div style={{ maxWidth: '420px', margin: '0 auto', width: '100%' }}>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <h2 style={{
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  color: '#362854',
                  marginBottom: '0.35rem'
                }}>
                  Create Your Account
                </h2>
                <p style={{ fontSize: '0.85rem', color: '#665c7d', margin: 0 }}>
                  Complete the 3 verification steps to activate your profile.
                </p>
              </div>

              {/* Step Navigation Pills */}
              <div style={{
                display: 'flex',
                background: '#f8f4fe',
                border: '1.5px solid #e2d9f3',
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
                  color: step === 1 ? '#ffffff' : '#665c7d',
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
                  color: step === 2 ? '#ffffff' : '#665c7d',
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
                  color: step === 3 ? '#ffffff' : '#665c7d',
                  fontWeight: 800,
                  fontSize: '0.76rem'
                }}>
                  3. Consent
                </div>
              </div>

              {errorMsg && (
                <div style={{
                  background: '#fef2f2',
                  border: '1px solid #fca5a5',
                  color: '#991b1b',
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
                  background: '#ecfdf5',
                  border: '1px solid #6ee7b7',
                  color: '#065f46',
                  borderRadius: '18px',
                  padding: '1.75rem',
                  textAlign: 'center'
                }}>
                  <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '0.5rem' }}>✨</span>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, color: '#065f46' }}>Account Verified & Created!</h3>
                  <p style={{ fontSize: '0.85rem', color: '#047857', marginTop: '0.4rem', margin: 0 }}>
                    Redirecting to your profile dashboard...
                  </p>
                </div>
              ) : (
                <>
                  {/* STEP 1: ACCOUNT INFO */}
                  {step === 1 && (
                    <form onSubmit={handleSendOtp} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#362854', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.45rem' }}>
                          DISPLAY NAME / USERNAME
                        </label>
                        <div style={{ position: 'relative' }}>
                          <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '1rem', color: '#7c54d1' }}>
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
                              background: '#f8f4fe',
                              border: '1.5px solid #e2d9f3',
                              borderRadius: '12px',
                              color: '#362854',
                              fontSize: '0.92rem',
                              outline: 'none'
                            }}
                          />
                        </div>
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#362854', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.45rem' }}>
                          EMAIL ADDRESS <span style={{ color: '#ec4899' }}>*</span>
                        </label>
                        <div style={{ position: 'relative' }}>
                          <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '1rem', color: '#7c54d1' }}>
                            ✉️
                          </span>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            style={{
                              width: '100%',
                              padding: '0.8rem 1rem 0.8rem 2.6rem',
                              background: '#f8f4fe',
                              border: '1.5px solid #e2d9f3',
                              borderRadius: '12px',
                              color: '#362854',
                              fontSize: '0.92rem',
                              outline: 'none'
                            }}
                          />
                        </div>
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#362854', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.45rem' }}>
                          PASSWORD <span style={{ color: '#ec4899' }}>*</span>
                        </label>
                        <div style={{ position: 'relative' }}>
                          <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '1rem', color: '#7c54d1' }}>
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
                              background: '#f8f4fe',
                              border: '1.5px solid #e2d9f3',
                              borderRadius: '12px',
                              color: '#362854',
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
                          boxShadow: '0 8px 24px rgba(124, 84, 209, 0.35)',
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
                        background: '#f4edfa',
                        border: '1.5px solid #d6c8f5',
                        borderRadius: '16px',
                        padding: '1rem 1.15rem'
                      }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#7c54d1', marginBottom: '0.2rem' }}>
                          📩 OTP Code Sent to Email:
                        </div>
                        <div style={{ fontSize: '0.92rem', color: '#362854', fontWeight: 700 }}>
                          {email}
                        </div>
                      </div>

                      {otpError && (
                        <div style={{
                          background: '#fef2f2',
                          border: '1px solid #fca5a5',
                          color: '#991b1b',
                          padding: '0.75rem 1rem',
                          borderRadius: '12px',
                          fontSize: '0.85rem'
                        }}>
                          ⚠️ {otpError}
                        </div>
                      )}

                      <div>
                        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#362854', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.45rem' }}>
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
                            background: '#f8f4fe',
                            border: '1.5px solid #e2d9f3',
                            borderRadius: '12px',
                            color: '#362854',
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
                          boxShadow: '0 8px 24px rgba(124, 84, 209, 0.35)',
                          opacity: (loading || otpInput.length < 6) ? 0.5 : 1
                        }}
                      >
                        {loading ? 'Verifying OTP...' : 'Verify OTP Code →'}
                      </button>

                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          style={{ background: 'transparent', border: 'none', color: '#665c7d', fontSize: '0.82rem', cursor: 'pointer', textDecoration: 'underline' }}
                        >
                          ← Change Email
                        </button>

                        <button
                          type="button"
                          onClick={handleSendOtp}
                          style={{ background: 'transparent', border: 'none', color: '#7c54d1', fontSize: '0.82rem', cursor: 'pointer', fontWeight: 700 }}
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
                        background: '#dcfce7',
                        border: '1px solid #86efac',
                        borderRadius: '16px',
                        padding: '0.85rem 1.1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.65rem'
                      }}>
                        <span style={{ fontSize: '1.3rem' }}>✅</span>
                        <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#166534' }}>
                          Email Verified: {email}
                        </div>
                      </div>

                      <div style={{
                        background: '#f8f4fe',
                        border: '1.5px solid #e2d9f3',
                        borderRadius: '18px',
                        padding: '1.25rem'
                      }}>
                        <h3 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#7c54d1', margin: '0 0 0.5rem 0' }}>
                          📋 MoodFlip Data Privacy Notice
                        </h3>
                        <p style={{ fontSize: '0.84rem', color: '#665c7d', lineHeight: 1.5, margin: 0 }}>
                          By creating a profile, you agree that MoodFlip may store your email address, selected moods/dates, actions shown, and purchase history so we can generate custom PDF reports for you.
                        </p>
                      </div>

                      <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', cursor: 'pointer', fontSize: '0.84rem', color: '#362854', lineHeight: 1.45 }}>
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
                          boxShadow: '0 8px 24px rgba(124, 84, 209, 0.35)',
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
              <div style={{ textAlign: 'center', marginTop: '1.75rem', fontSize: '0.85rem', color: '#665c7d' }}>
                Already have a MoodFlip profile?{' '}
                <a href="/login" style={{ color: '#7c54d1', fontWeight: 800, textDecoration: 'none' }}>
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
