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

  const steps = [
    { num: 1, label: 'Account', icon: '👤' },
    { num: 2, label: 'Verify', icon: '✉️' },
    { num: 3, label: 'Consent', icon: '✅' },
  ];

  const features = [
    { icon: '✉️', bg: 'rgba(34,197,94,0.15)', name: 'OTP Email Security', desc: 'Verified 6-digit OTP ensures 100% account authenticity' },
    { icon: '📊', bg: 'rgba(108,92,231,0.14)', name: 'Personalized Growth Insights', desc: 'Automatic tracking of your daily negative to positive shifts' },
    { icon: '📘', bg: 'rgba(236,72,153,0.14)', name: 'Instant PDF Downloads', desc: 'Custom 7-Day Mindset PDF delivered directly to your email' },
  ];

  return (
    <div className="site-shell">
      <Header />

      <style>{`
        @keyframes regFloatBlob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(18px, -25px) scale(1.04); }
          66% { transform: translate(-12px, 18px) scale(0.97); }
        }
        @keyframes regFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes regSuccessPop {
          0% { transform: scale(0.6); opacity: 0; }
          70% { transform: scale(1.08); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes regStepSlide {
          from { opacity: 0; transform: translateX(12px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes regPulseRing {
          0% { box-shadow: 0 0 0 0 rgba(108,92,231,0.35); }
          70% { box-shadow: 0 0 0 10px rgba(108,92,231,0); }
          100% { box-shadow: 0 0 0 0 rgba(108,92,231,0); }
        }
        @keyframes regOtpGlow {
          0%, 100% { border-color: rgba(108,92,231,0.35); }
          50% { border-color: rgba(108,92,231,0.8); box-shadow: 0 0 0 4px rgba(108,92,231,0.12); }
        }
        .reg-page-shell {
          min-height: calc(100vh - 200px);
          display: flex; align-items: center; justify-content: center;
          padding: 3rem 1rem;
          position: relative; overflow: hidden;
        }
        .reg-blob-1 {
          position: fixed; top: -100px; right: -80px;
          width: 440px; height: 440px; border-radius: 50%;
          background: radial-gradient(circle, rgba(236,72,153,0.12) 0%, transparent 70%);
          animation: regFloatBlob 14s ease-in-out infinite;
          pointer-events: none; z-index: 0;
        }
        .reg-blob-2 {
          position: fixed; bottom: -80px; left: -80px;
          width: 380px; height: 380px; border-radius: 50%;
          background: radial-gradient(circle, rgba(108,92,231,0.13) 0%, transparent 70%);
          animation: regFloatBlob 17s ease-in-out infinite 4s;
          pointer-events: none; z-index: 0;
        }
        .reg-blob-3 {
          position: fixed; top: 30%; left: 10%;
          width: 260px; height: 260px; border-radius: 50%;
          background: radial-gradient(circle, rgba(18,165,148,0.09) 0%, transparent 70%);
          animation: regFloatBlob 20s ease-in-out infinite 8s;
          pointer-events: none; z-index: 0;
        }
        .reg-card {
          width: 100%; max-width: 980px;
          background: var(--card-bg);
          border: 1.5px solid var(--card-border);
          border-radius: 32px; overflow: hidden;
          display: flex; flex-wrap: wrap;
          box-shadow: 0 32px 80px rgba(74,57,102,0.14);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          position: relative; z-index: 1;
          animation: regFadeUp 0.5s cubic-bezier(0.22,1,0.36,1) both;
        }
        .reg-left {
          flex: 1 1 380px;
          padding: 3rem 2.5rem;
          background: linear-gradient(150deg, #f8f0fe 0%, #f0e9fd 40%, #fce7f5 100%);
          border-right: 1.5px solid rgba(236,72,153,0.15);
          display: flex; flex-direction: column;
          justify-content: space-between; gap: 2rem;
          position: relative; overflow: hidden;
        }
        .reg-left-deco {
          position: absolute; top: -80px; right: -80px;
          width: 320px; height: 320px; border-radius: 50%;
          background: radial-gradient(circle, rgba(236,72,153,0.1), transparent 70%);
          pointer-events: none;
        }
        .reg-badge {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 6px 14px; border-radius: 999px;
          font-size: 0.72rem; font-weight: 800; letter-spacing: 0.05em;
          text-transform: uppercase; margin-bottom: 1.25rem;
          background: rgba(108,92,231,0.1);
          border: 1px solid rgba(108,92,231,0.22);
          color: #5546ce;
        }
        .reg-hero-title {
          font-family: 'Fraunces', Georgia, serif;
          font-size: clamp(1.6rem, 3vw, 2.3rem);
          font-weight: 640; color: #33283f; line-height: 1.15;
          margin-bottom: 0.85rem;
        }
        .reg-hero-title span {
          background: linear-gradient(135deg, #6c5ce7, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .reg-hero-sub {
          font-size: 0.88rem; color: #6b6078; line-height: 1.65;
          margin-bottom: 1.75rem;
        }
        .reg-feature-list { display: flex; flex-direction: column; gap: 0.7rem; }
        .reg-feature-item {
          display: flex; align-items: center; gap: 0.85rem;
          padding: 0.75rem 1rem; border-radius: 14px;
          background: rgba(255,255,255,0.65);
          border: 1px solid rgba(108,92,231,0.1);
          backdrop-filter: blur(8px);
          transition: transform 0.2s ease;
        }
        .reg-feature-item:hover { transform: translateX(3px); }
        .reg-feature-icon {
          width: 38px; height: 38px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.1rem; flex-shrink: 0;
        }
        .reg-feature-name { font-size: 0.84rem; font-weight: 700; color: #33283f; }
        .reg-feature-desc { font-size: 0.72rem; color: #6b6078; }
        .reg-testimonial {
          padding: 0.85rem 1.1rem; border-radius: 12px;
          background: rgba(255,255,255,0.6);
          border: 1px solid rgba(236,72,153,0.15);
          border-left: 3px solid #ec4899;
          backdrop-filter: blur(8px);
        }
        .reg-testimonial p {
          font-size: 0.8rem; color: #475569; font-style: italic;
          line-height: 1.55; margin: 0 0 0.3rem;
        }
        .reg-testimonial span {
          font-size: 0.72rem; font-weight: 700; color: #ec4899; display: block;
        }
        .reg-right {
          flex: 1 1 400px; padding: 3rem 2.75rem;
          display: flex; flex-direction: column; justify-content: center;
          background: var(--card-bg);
        }
        .reg-form-inner {
          max-width: 400px; width: 100%; margin: 0 auto;
        }
        .reg-form-header { margin-bottom: 1.75rem; }
        .reg-form-title {
          font-size: 1.4rem; font-weight: 800; color: var(--text-main);
          margin-bottom: 0.3rem;
          font-family: 'Outfit', 'Inter', sans-serif;
        }
        .reg-form-sub { font-size: 0.84rem; color: var(--text-subtle); margin: 0; line-height: 1.5; }
        .reg-steps-bar {
          display: flex; gap: 0; margin-bottom: 2rem;
          background: var(--cream-2); border: 1.5px solid var(--card-border);
          border-radius: 14px; padding: 0.3rem; position: relative;
        }
        .reg-step-item {
          flex: 1; display: flex; align-items: center; justify-content: center;
          gap: 5px; padding: 0.6rem 0.4rem; border-radius: 10px;
          font-size: 0.76rem; font-weight: 800; cursor: default;
          transition: all 0.3s ease; position: relative;
        }
        .reg-step-item.active {
          background: linear-gradient(135deg, #6c5ce7, #ec4899);
          color: #ffffff;
          box-shadow: 0 4px 14px rgba(108,92,231,0.35);
        }
        .reg-step-item.done {
          background: rgba(34,197,94,0.15);
          color: #15803d;
          border: 1px solid rgba(34,197,94,0.25);
        }
        .reg-step-item.pending { color: var(--text-subtle); }
        .reg-step-divider {
          width: 1px; background: var(--card-border);
          align-self: stretch; margin: 4px 0;
        }
        .reg-error-box {
          background: rgba(239,68,68,0.1);
          border: 1px solid rgba(239,68,68,0.28);
          color: #dc2626; padding: 0.7rem 1rem;
          border-radius: 12px; font-size: 0.83rem; font-weight: 600;
          margin-bottom: 1.25rem;
          display: flex; align-items: center; gap: 0.4rem;
        }
        .reg-success-box {
          background: linear-gradient(135deg, rgba(34,197,94,0.1), rgba(18,165,148,0.08));
          border: 1px solid rgba(34,197,94,0.25);
          border-radius: 24px; padding: 2.5rem 1.5rem;
          text-align: center;
          animation: regSuccessPop 0.5s cubic-bezier(0.34,1.56,0.64,1) both;
        }
        .reg-success-icon { font-size: 2.8rem; display: block; margin-bottom: 0.7rem; }
        .reg-success-title {
          font-size: 1.2rem; font-weight: 800; color: #15803d;
          margin: 0 0 0.3rem;
        }
        .reg-success-desc { font-size: 0.84rem; color: #166534; margin: 0; }
        .reg-step-form {
          display: flex; flex-direction: column; gap: 1.15rem;
          animation: regStepSlide 0.3s ease both;
        }
        .reg-field { display: flex; flex-direction: column; gap: 0.42rem; }
        .reg-label {
          font-size: 0.72rem; font-weight: 800;
          color: var(--text-main); text-transform: uppercase; letter-spacing: 0.06em;
          display: flex; align-items: center; gap: 4px;
        }
        .reg-label .req { color: #ec4899; }
        .reg-input-wrap { position: relative; }
        .reg-input-icon {
          position: absolute; left: 13px; top: 50%;
          transform: translateY(-50%); font-size: 0.95rem;
          pointer-events: none; z-index: 1;
        }
        .reg-input {
          width: 100%; padding: 0.82rem 1rem 0.82rem 2.55rem;
          background: var(--cream);
          border: 1.5px solid var(--card-border);
          border-radius: 12px; color: var(--text-main);
          font-size: 0.9rem; outline: none; font-family: inherit;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .reg-input:focus {
          border-color: #6c5ce7;
          box-shadow: 0 0 0 3px rgba(108,92,231,0.12);
        }
        .reg-pw-toggle {
          position: absolute; right: 12px; top: 50%;
          transform: translateY(-50%);
          background: transparent; border: none; cursor: pointer;
          font-size: 1rem; color: var(--text-subtle); padding: 2px;
          transition: color 0.2s;
        }
        .reg-pw-toggle:hover { color: var(--text-main); }
        .reg-otp-input {
          width: 100%; padding: 1rem 1.25rem;
          background: var(--cream);
          border: 2px solid var(--card-border);
          border-radius: 14px; color: var(--text-main);
          font-size: 1.6rem; font-weight: 800;
          letter-spacing: 0.35em; text-align: center;
          outline: none; font-family: 'Space Mono', monospace;
          transition: all 0.2s ease;
          animation: regOtpGlow 2.5s ease-in-out infinite;
        }
        .reg-otp-input:focus {
          border-color: #6c5ce7;
          box-shadow: 0 0 0 4px rgba(108,92,231,0.15);
          animation: none;
        }
        .reg-otp-sent-notice {
          background: linear-gradient(135deg, rgba(108,92,231,0.08), rgba(236,72,153,0.06));
          border: 1.5px solid rgba(108,92,231,0.2);
          border-radius: 14px; padding: 1rem 1.15rem;
        }
        .reg-otp-sent-notice .otp-label {
          font-size: 0.82rem; font-weight: 800; color: #6c5ce7; margin-bottom: 0.2rem;
        }
        .reg-otp-sent-notice .otp-email {
          font-size: 0.9rem; color: var(--text-main); font-weight: 700;
        }
        .reg-otp-actions {
          display: flex; justify-content: space-between; margin-top: 0.25rem;
        }
        .reg-text-btn {
          background: transparent; border: none; cursor: pointer;
          font-size: 0.8rem; font-family: inherit; padding: 0;
          transition: color 0.2s;
        }
        .reg-text-btn.back { color: var(--text-subtle); text-decoration: underline; }
        .reg-text-btn.back:hover { color: var(--text-main); }
        .reg-text-btn.resend { color: #6c5ce7; font-weight: 700; }
        .reg-text-btn.resend:hover { color: #5546ce; }
        .reg-consent-box {
          background: linear-gradient(135deg, rgba(108,92,231,0.06), rgba(236,72,153,0.04));
          border: 1.5px solid rgba(108,92,231,0.18);
          border-radius: 16px; padding: 1.15rem;
        }
        .reg-consent-title {
          font-size: 0.85rem; font-weight: 800; color: #6c5ce7;
          margin: 0 0 0.5rem;
        }
        .reg-consent-text {
          font-size: 0.81rem; color: var(--text-subtle); line-height: 1.55; margin: 0;
        }
        .reg-verified-badge {
          background: rgba(34,197,94,0.1);
          border: 1px solid rgba(34,197,94,0.25);
          border-radius: 12px; padding: 0.75rem 1rem;
          display: flex; align-items: center; gap: 0.65rem;
        }
        .reg-verified-badge .badge-text {
          font-size: 0.84rem; font-weight: 800; color: #166534;
        }
        .reg-checkbox-label {
          display: flex; align-items: flex-start; gap: 0.65rem;
          cursor: pointer; font-size: 0.84rem; color: var(--text-main); line-height: 1.45;
        }
        .reg-checkbox-label input {
          margin-top: 0.15rem; accent-color: #6c5ce7;
          width: 18px; height: 18px; flex-shrink: 0;
        }
        .reg-submit-btn {
          width: 100%; padding: 0.9rem 1.5rem;
          background: linear-gradient(135deg, #6c5ce7 0%, #ec4899 100%);
          border: none; border-radius: 14px;
          color: white; font-weight: 800; font-size: 0.92rem;
          cursor: pointer; font-family: inherit;
          display: flex; align-items: center; justify-content: center; gap: 0.5rem;
          transition: all 0.22s ease;
          box-shadow: 0 8px 24px rgba(108,92,231,0.35);
          position: relative; overflow: hidden;
        }
        .reg-submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(108,92,231,0.45);
        }
        .reg-submit-btn:disabled {
          opacity: 0.5; cursor: not-allowed; transform: none !important;
        }
        .reg-footer-link {
          text-align: center; margin-top: 1.75rem;
          font-size: 0.84rem; color: var(--text-subtle);
        }
        .reg-footer-link a {
          color: #6c5ce7; font-weight: 800;
          text-decoration: none; transition: color 0.2s;
        }
        .reg-footer-link a:hover { color: #5546ce; text-decoration: underline; }
        @media (max-width: 720px) {
          .reg-left { flex: 1 1 100%; border-right: none; border-bottom: 1.5px solid var(--card-border); }
          .reg-right { flex: 1 1 100%; }
          .reg-left, .reg-right { padding: 2rem 1.5rem; }
        }
      `}</style>

      <main className="reg-page-shell">
        <div className="reg-blob-1" />
        <div className="reg-blob-2" />
        <div className="reg-blob-3" />

        <div className="reg-card">

          {/* LEFT PANEL */}
          <div className="reg-left">
            <div className="reg-left-deco" />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div className="reg-badge">
                <span>✨</span> JOIN MOODFLIP PORTAL
              </div>

              <h1 className="reg-hero-title">
                Create Your <span>Mindset Profile</span>
              </h1>

              <p className="reg-hero-sub">
                Join MoodFlip to save your check-in history, verify your email with OTP security, and receive custom 7-day emotional shift roadmaps.
              </p>

              <div className="reg-feature-list">
                {features.map((f, i) => (
                  <div key={i} className="reg-feature-item">
                    <div className="reg-feature-icon" style={{ background: f.bg }}>{f.icon}</div>
                    <div>
                      <div className="reg-feature-name">{f.name}</div>
                      <div className="reg-feature-desc">{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="reg-testimonial" style={{ position: 'relative', zIndex: 1 }}>
              <p>&ldquo;Creating a profile allowed me to track my 7-day emotional growth and get custom PDF shift roadmaps.&rdquo;</p>
              <span>— David K., Verified User</span>
            </div>
          </div>

          {/* RIGHT PANEL — FORM */}
          <div className="reg-right">
            <div className="reg-form-inner">

              <div className="reg-form-header">
                <h1 className="reg-form-title">Create Your Account</h1>
                <p className="reg-form-sub">Complete the 3 verification steps to activate your profile.</p>
              </div>

              {/* Step Progress Bar */}
              <div className="reg-steps-bar">
                {steps.map((s, i) => (
                  <React.Fragment key={s.num}>
                    {i > 0 && <div className="reg-step-divider" />}
                    <div
                      className={`reg-step-item ${
                        step === s.num ? 'active' :
                        step > s.num ? 'done' : 'pending'
                      }`}
                    >
                      <span>{step > s.num ? '✓' : s.icon}</span>
                      <span>{s.label}</span>
                    </div>
                  </React.Fragment>
                ))}
              </div>

              {errorMsg && (
                <div className="reg-error-box">
                  <span>⚠️</span> {errorMsg}
                </div>
              )}

              {success ? (
                <div className="reg-success-box">
                  <span className="reg-success-icon">✨</span>
                  <h3 className="reg-success-title">Account Verified &amp; Created!</h3>
                  <p className="reg-success-desc">Redirecting to your profile dashboard...</p>
                </div>
              ) : (
                <>
                  {/* STEP 1: ACCOUNT INFO */}
                  {step === 1 && (
                    <form id="register-step1-form" onSubmit={handleSendOtp} className="reg-step-form">
                      <div className="reg-field">
                        <label className="reg-label" htmlFor="reg-name">
                          Display Name
                        </label>
                        <div className="reg-input-wrap">
                          <span className="reg-input-icon">👤</span>
                          <input
                            id="reg-name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Alex Morgan"
                            className="reg-input"
                          />
                        </div>
                      </div>

                      <div className="reg-field">
                        <label className="reg-label" htmlFor="reg-email">
                          Email Address <span className="req">*</span>
                        </label>
                        <div className="reg-input-wrap">
                          <span className="reg-input-icon">✉️</span>
                          <input
                            id="reg-email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="reg-input"
                          />
                        </div>
                      </div>

                      <div className="reg-field">
                        <label className="reg-label" htmlFor="reg-password">
                          Password <span className="req">*</span>
                        </label>
                        <div className="reg-input-wrap">
                          <span className="reg-input-icon">🔒</span>
                          <input
                            id="reg-password"
                            type={showPassword ? 'text' : 'password'}
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="reg-input"
                            style={{ paddingRight: '2.6rem' }}
                          />
                          <button
                            type="button"
                            className="reg-pw-toggle"
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label="Toggle password visibility"
                          >
                            {showPassword ? '🙈' : '👁️'}
                          </button>
                        </div>
                      </div>

                      <button
                        id="register-send-otp-btn"
                        type="submit"
                        disabled={loading || !email || !password}
                        className="reg-submit-btn"
                        style={{ marginTop: '0.5rem' }}
                      >
                        <span>{loading ? 'Sending OTP...' : 'Send OTP Verification Code'}</span>
                        {!loading && <span>→</span>}
                      </button>
                    </form>
                  )}

                  {/* STEP 2: OTP VERIFICATION */}
                  {step === 2 && (
                    <form id="register-step2-form" onSubmit={handleVerifyOtp} className="reg-step-form">
                      <div className="reg-otp-sent-notice">
                        <div className="otp-label">📩 OTP Code Sent to Email:</div>
                        <div className="otp-email">{email}</div>
                      </div>

                      {otpError && (
                        <div className="reg-error-box">
                          <span>⚠️</span> {otpError}
                        </div>
                      )}

                      <div className="reg-field">
                        <label className="reg-label" htmlFor="reg-otp">
                          6-Digit Verification Code <span className="req">*</span>
                        </label>
                        <input
                          id="reg-otp"
                          type="text"
                          required
                          maxLength={6}
                          value={otpInput}
                          onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, ''))}
                          placeholder="• • • • • •"
                          className="reg-otp-input"
                        />
                      </div>

                      <button
                        id="register-verify-otp-btn"
                        type="submit"
                        disabled={loading || otpInput.length < 6}
                        className="reg-submit-btn"
                      >
                        <span>{loading ? 'Verifying OTP...' : 'Verify OTP Code'}</span>
                        {!loading && <span>→</span>}
                      </button>

                      <div className="reg-otp-actions">
                        <button type="button" className="reg-text-btn back" onClick={() => setStep(1)}>
                          ← Change Email
                        </button>
                        <button type="button" className="reg-text-btn resend" onClick={handleSendOtp as () => void}>
                          Resend Code 🔄
                        </button>
                      </div>
                    </form>
                  )}

                  {/* STEP 3: PRIVACY & CONSENT */}
                  {step === 3 && (
                    <form id="register-step3-form" onSubmit={handleFinalSubmit} className="reg-step-form">
                      <div className="reg-verified-badge">
                        <span style={{ fontSize: '1.3rem' }}>✅</span>
                        <div className="badge-text">Email Verified: {email}</div>
                      </div>

                      <div className="reg-consent-box">
                        <h3 className="reg-consent-title">📋 MoodFlip Data Privacy Notice</h3>
                        <p className="reg-consent-text">
                          By creating a profile, you agree that MoodFlip may store your email address, selected moods/dates, actions shown, and purchase history so we can generate custom PDF reports for you.
                        </p>
                      </div>

                      <label className="reg-checkbox-label">
                        <input
                          type="checkbox"
                          checked={consent}
                          onChange={(e) => setConsent(e.target.checked)}
                        />
                        <span>
                          I agree to the privacy policy &amp; consent to storing my check-in history.
                        </span>
                      </label>

                      <button
                        id="register-complete-btn"
                        type="submit"
                        disabled={loading || !consent}
                        className="reg-submit-btn"
                      >
                        <span>{loading ? 'Activating Profile...' : 'Complete Registration ✨'}</span>
                      </button>
                    </form>
                  )}
                </>
              )}

              <div className="reg-footer-link">
                Already have a MoodFlip profile?{' '}
                <a href="/login">Log In Here</a>
              </div>

            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
