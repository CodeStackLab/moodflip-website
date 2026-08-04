'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';

// Demo OTP — in production this would be emailed from a real backend
const DEMO_OTP = '123456';

export default function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [consentData, setConsentData] = useState(true);
  const [consentEmails, setConsentEmails] = useState(false);
  const [msg, setMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [isError, setIsError] = useState(false);

  // OTP states
  const [showOtp, setShowOtp] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  const [otpError, setOtpError] = useState('');
  const [otpVerifying, setOtpVerifying] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const getPasswordStrength = () => {
    if (!password) return 0;
    if (password.length < 6) return 1;
    if (password.length < 10) return 2;
    if (/[A-Z]/.test(password) && /[0-9]/.test(password)) return 4;
    return 3;
  };
  const strength = getPasswordStrength();

  // Step 1: Submit form → show OTP screen
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setIsError(true);
      setMsg('❌ Passwords do not match. Please try again.');
      return;
    }
    setIsError(false);
    setIsLoading(true);
    setLoadingStep(1);

    setTimeout(() => setLoadingStep(2), 600);
    setTimeout(() => {
      setLoadingStep(3);
      setIsLoading(false);
      setOtpSent(true);
      setShowOtp(true);
    }, 1400);
  };

  // Step 2: Verify OTP → create account & redirect
  const handleOtpVerify = () => {
    if (!otpInput.trim()) {
      setOtpError('Please enter the OTP sent to your email.');
      return;
    }
    if (otpInput.trim() !== DEMO_OTP) {
      setOtpError('❌ Incorrect OTP. Please try again. (Demo OTP: 123456)');
      return;
    }
    setOtpError('');
    setOtpVerifying(true);
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('userLoggedIn', 'true');
        localStorage.setItem('isLoggedIn', 'true');
        if (fullName) localStorage.setItem('userName', fullName);
        const params = new URLSearchParams(window.location.search);
        const redirectUrl = params.get('redirect') || '/profile';
        window.location.href = redirectUrl;
      }
    }, 1000);
  };

  const handleResendOtp = () => {
    setOtpInput('');
    setOtpError('');
    setOtpSent(false);
    setTimeout(() => setOtpSent(true), 800);
  };

  return (
    <div className="min-h-screen bg-[#F7F5FC] px-3 md:px-[3%] py-3 md:py-5 font-sans text-[#2D264B]">
      <div className="mx-auto max-w-[1160px] w-full bg-white border border-[#E8E0F4] rounded-[26px] shadow-xl overflow-hidden flex flex-col">

        <Header />

        <main className="flex-1 p-4 md:p-7 bg-gradient-to-br from-[#FAF8FD] to-[#F3EFFE] flex flex-col gap-5">

          <div className="grid grid-cols-1 lg:grid-cols-[440px_1fr] gap-6 items-stretch">

            {/* ── LEFT HERO CARD ── text TOP, pills BOTTOM */}
            <div
              className="relative overflow-hidden rounded-[24px] border border-[#EAE3D6] flex flex-col justify-between shadow-sm bg-cover bg-center min-h-[480px] lg:min-h-full p-6 md:p-8 order-2 lg:order-1"
              style={{ backgroundImage: "url('/login-bg.jpg')" }}
            >
              {/* Gradient overlays */}
              <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-white/93 via-white/65 to-transparent pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#2a1466]/25 to-transparent pointer-events-none" />

              {/* Headline — TOP */}
              <div className="relative z-10 text-center flex flex-col items-center pt-2">
                <span
                  className="inline-flex items-center gap-1 px-3.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider mb-3 border border-[#e0d4f8]"
                  style={{
                    background: 'linear-gradient(90deg, #7147e8, #e044b8, #f97316)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  ✦ Start Your Journey
                </span>
                <h1
                  className="font-serif leading-[1.2] mb-2 tracking-tight text-[#1A1338]"
                  style={{ fontSize: 'clamp(24px, 3.2vw, 36px)', fontWeight: 800 }}
                >
                  Begin your journey.<br />
                  <span style={{
                    background: 'linear-gradient(100deg, #7147e8 0%, #c840cc 50%, #f97316 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>
                    One small step today.
                  </span>
                </h1>
                <p className="text-xs md:text-sm text-[#554D6E] leading-relaxed font-medium max-w-xs mx-auto">
                  Create your free profile to save check-ins, track progress, and build a better mind.
                </p>
              </div>

              {/* Feature pills — BOTTOM */}
              <div className="relative z-10 grid grid-cols-2 gap-3 bg-white/95 backdrop-blur-md rounded-[20px] p-4 border border-white/70 shadow-sm mt-6">
                {[
                  { icon: '🛡️', bg: '#F0EAFF', title: 'Private & Secure', sub: 'Data is encrypted' },
                  { icon: '👤', bg: '#EDFBF1', title: 'Free Profile', sub: 'Upgrade anytime' },
                  { icon: '💜', bg: '#FFF0F3', title: 'Save Progress', sub: 'Check-ins saved' },
                  { icon: '🔑', bg: '#F8F0FF', title: '90-Day Privacy', sub: 'Never sold' },
                ].map((f) => (
                  <div key={f.title} className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-base" style={{ background: f.bg }}>
                      {f.icon}
                    </div>
                    <div>
                      <strong className="block text-[12px] font-extrabold text-[#1D1737] leading-tight">{f.title}</strong>
                      <span className="text-[10.5px] text-[#68607F] font-medium leading-tight block mt-0.5">{f.sub}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT FORM (Registration OR OTP) ── */}
            <div className="rounded-[22px] border border-[#EFE8F8] bg-white p-5 md:p-7 shadow-sm flex flex-col order-1 lg:order-2">

              {/* ── OTP VERIFICATION SCREEN ── */}
              {showOtp ? (
                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl"
                    style={{ background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)', width: 56, height: 56 }}>
                    📧
                  </div>
                  <h2 className="font-serif font-extrabold text-[#181236] mb-1" style={{ fontSize: 24 }}>
                    Verify Your Email
                  </h2>
                  <p className="text-sm font-bold mb-1" style={{
                    background: 'linear-gradient(90deg, #7147e8, #c840cc)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
                  }}>
                    OTP Verification Required
                  </p>
                  <p className="text-[11px] text-[#6B638B] mb-5 max-w-xs">
                    We&apos;ve sent a 6-digit OTP to <strong className="text-[#383054]">{email}</strong>. Enter it below to activate your account.
                    <br /><span className="text-[10px] text-purple-400 mt-1 block">(Demo OTP: <strong>123456</strong>)</span>
                  </p>

                  {/* OTP input boxes */}
                  <div className="flex gap-2 justify-center mb-3">
                    <input
                      type="text"
                      maxLength={6}
                      value={otpInput}
                      onChange={(e) => { setOtpInput(e.target.value.replace(/\D/g, '')); setOtpError(''); }}
                      placeholder="Enter 6-digit OTP"
                      className="text-center text-xl font-extrabold tracking-[0.3em] w-48 h-12 rounded-xl border bg-[#FAF9FD] text-[#1E1938] focus:outline-none transition"
                      style={{ borderColor: otpError ? '#f43f5e' : '#E2D5F8', letterSpacing: '0.4em' }}
                      onFocus={(e) => e.target.style.borderColor = '#7147E8'}
                      onBlur={(e) => e.target.style.borderColor = otpError ? '#f43f5e' : '#E2D5F8'}
                    />
                  </div>

                  {otpError && (
                    <p className="text-xs text-rose-500 font-semibold mb-3">{otpError}</p>
                  )}

                  <button
                    onClick={handleOtpVerify}
                    disabled={otpVerifying}
                    className="w-full h-12 rounded-xl text-white text-sm font-extrabold flex items-center justify-center gap-2 mb-3"
                    style={{
                      background: otpVerifying ? 'linear-gradient(90deg,#a78bfa,#c084fc)' : 'linear-gradient(90deg, #7147E8, #c840cc)',
                      boxShadow: '0 4px 16px rgba(113,71,232,0.3)'
                    }}
                  >
                    {otpVerifying
                      ? <><span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>⟳</span> Verifying...</>
                      : <><span>✅</span> Verify & Create Account</>}
                  </button>

                  <div className="flex items-center gap-2 text-xs text-[#6B638B]">
                    <span>Didn&apos;t receive it?</span>
                    <button onClick={handleResendOtp} className="font-bold hover:underline" style={{ color: '#7147E8' }}>
                      {otpSent ? 'Resend OTP' : '⟳ Sending...'}
                    </button>
                  </div>

                  <button onClick={() => { setShowOtp(false); setOtpInput(''); setOtpError(''); }}
                    className="mt-3 text-xs text-[#9B93B0] hover:text-[#7147E8] transition font-medium">
                    ← Back to registration
                  </button>
                </div>

              ) : (
                /* ── REGISTRATION FORM ── */
                <>
                  {/* Avatar + Titles */}
                  <div className="text-center mb-3">
                    <div className="rounded-full flex items-center justify-center mx-auto mb-2 text-2xl shadow-sm"
                      style={{ background: 'linear-gradient(135deg, #f0eaff, #fce7f3)', width: 48, height: 48 }}>
                      🌱
                    </div>
                    <h2 className="font-serif font-extrabold text-[#181236] mb-0.5" style={{ fontSize: 'clamp(19px, 2.5vw, 26px)' }}>
                      Create Account
                    </h2>
                    <p className="text-sm font-bold mb-0.5" style={{
                      background: 'linear-gradient(90deg, #7147e8, #c840cc)',
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
                    }}>
                      Join MoodFlip — It&apos;s Free
                    </p>
                    <p className="text-[10.5px] text-[#8A829E] font-medium">
                      <strong className="text-[#383054]">Free User Registration</strong> — Start tracking your mood today.
                    </p>
                  </div>

                  {/* Backend loading steps */}
                  {isLoading && (
                    <div className="mb-3 rounded-xl p-3 border text-xs space-y-1.5"
                      style={{ background: 'linear-gradient(135deg,#f5f0ff,#fdf4ff)', borderColor: '#e0d4f8' }}>
                      {[
                        { step: 1, label: '📝 Validating your information...' },
                        { step: 2, label: '🔐 Setting up secure profile...' },
                        { step: 3, label: '📧 Sending OTP to your email...' },
                      ].map(({ step, label }) => (
                        <div key={step} className="flex items-center gap-2 font-semibold"
                          style={{ color: loadingStep >= step ? '#7147e8' : '#b0a8c8', opacity: loadingStep >= step ? 1 : 0.4 }}>
                          {loadingStep > step ? '✓' : loadingStep === step
                            ? <span style={{ display: 'inline-block', animation: 'spin 0.8s linear infinite' }}>⟳</span>
                            : '○'}
                          {label}
                        </div>
                      ))}
                    </div>
                  )}

                  {msg && !isLoading && (
                    <div className="mb-3 rounded-xl p-3 text-xs font-semibold text-center border"
                      style={isError
                        ? { background: '#fff0f3', borderColor: '#fecdd3', color: '#be123c' }
                        : { background: '#f0fdf4', borderColor: '#bbf7d0', color: '#15803d' }
                      }>
                      {msg}
                    </div>
                  )}

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-2.5 text-left">

                    {/* Full Name */}
                    <div>
                      <label className="block text-[10px] font-extrabold uppercase tracking-wider text-[#6B638B] mb-1">Full Name</label>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-[#9B93B0] text-sm">👤</span>
                        <input type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)}
                          placeholder="Enter your full name" disabled={isLoading}
                          className="w-full h-10 pl-9 pr-4 rounded-xl border bg-[#FAF9FD] text-sm text-[#1E1938] focus:outline-none transition"
                          style={{ borderColor: '#E2D5F8' }}
                          onFocus={(e) => e.target.style.borderColor = '#7147E8'}
                          onBlur={(e) => e.target.style.borderColor = '#E2D5F8'} />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-[10px] font-extrabold uppercase tracking-wider text-[#6B638B] mb-1">Email Address</label>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-[#9B93B0] text-sm">✉</span>
                        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email address" disabled={isLoading}
                          className="w-full h-10 pl-9 pr-4 rounded-xl border bg-[#FAF9FD] text-sm text-[#1E1938] focus:outline-none transition"
                          style={{ borderColor: '#E2D5F8' }}
                          onFocus={(e) => e.target.style.borderColor = '#7147E8'}
                          onBlur={(e) => e.target.style.borderColor = '#E2D5F8'} />
                      </div>
                    </div>

                    {/* Password */}
                    <div>
                      <label className="block text-[10px] font-extrabold uppercase tracking-wider text-[#6B638B] mb-1">Password</label>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-[#9B93B0] text-sm">🔒</span>
                        <input type={showPassword ? 'text' : 'password'} required value={password}
                          onChange={(e) => setPassword(e.target.value)} placeholder="Create a strong password" disabled={isLoading}
                          className="w-full h-10 pl-9 pr-10 rounded-xl border bg-[#FAF9FD] text-sm text-[#1E1938] focus:outline-none transition"
                          style={{ borderColor: '#E2D5F8' }}
                          onFocus={(e) => e.target.style.borderColor = '#7147E8'}
                          onBlur={(e) => e.target.style.borderColor = '#E2D5F8'} />
                        <button type="button" onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-2 text-base text-[#9B93B0] hover:text-[#7147E8] transition" aria-label="Toggle password">
                          {showPassword ? '👁️' : '🙈'}
                        </button>
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-[10px] text-[#6B638B]">
                        <span>Strength:</span>
                        <div className="flex-1 flex gap-1 h-1.5">
                          {[1, 2, 3, 4].map((level) => (
                            <div key={level} className="flex-1 rounded-full transition-colors" style={{
                              background: strength >= level
                                ? level <= 1 ? '#f43f5e' : level <= 2 ? '#f59e0b' : level <= 3 ? '#22c55e' : '#7147E8'
                                : '#EAE3F2'
                            }} />
                          ))}
                        </div>
                        <span style={{ color: strength >= 4 ? '#7147E8' : strength >= 3 ? '#22c55e' : strength >= 2 ? '#f59e0b' : '#f43f5e' }}>
                          {strength === 0 ? '' : strength === 1 ? 'Weak' : strength === 2 ? 'Fair' : strength === 3 ? 'Good' : 'Strong'}
                        </span>
                      </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label className="block text-[10px] font-extrabold uppercase tracking-wider text-[#6B638B] mb-1">Confirm Password</label>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-[#9B93B0] text-sm">🔒</span>
                        <input type={showConfirmPassword ? 'text' : 'password'} required value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm your password" disabled={isLoading}
                          className="w-full h-10 pl-9 pr-10 rounded-xl border bg-[#FAF9FD] text-sm text-[#1E1938] focus:outline-none transition"
                          style={{ borderColor: confirmPassword && confirmPassword !== password ? '#f43f5e' : '#E2D5F8' }}
                          onFocus={(e) => e.target.style.borderColor = '#7147E8'}
                          onBlur={(e) => e.target.style.borderColor = confirmPassword && confirmPassword !== password ? '#f43f5e' : '#E2D5F8'} />
                        <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-2 text-base text-[#9B93B0] hover:text-[#7147E8] transition" aria-label="Toggle confirm">
                          {showConfirmPassword ? '👁️' : '🙈'}
                        </button>
                      </div>
                      {confirmPassword && confirmPassword !== password && (
                        <p className="text-[10px] text-rose-500 font-semibold mt-0.5">Passwords do not match</p>
                      )}
                      {confirmPassword && confirmPassword === password && (
                        <p className="text-[10px] font-semibold mt-0.5" style={{ color: '#22c55e' }}>✓ Passwords match</p>
                      )}
                    </div>

                    {/* Checkboxes */}
                    <div className="space-y-1.5 text-[10.5px] text-[#383252] font-medium leading-tight">
                      <label className="flex items-start gap-2 cursor-pointer">
                        <input type="checkbox" required checked={consentData} onChange={(e) => setConsentData(e.target.checked)}
                          className="accent-[#7147E8] w-3.5 h-3.5 cursor-pointer mt-0.5 flex-shrink-0" />
                        <span>
                          I consent to store my email, moods, and progress data for personalized features.{' '}
                          <a href="/privacy" className="font-bold hover:underline" style={{ color: '#7147E8' }}>Learn more</a>
                        </span>
                      </label>
                      <label className="flex items-start gap-2 cursor-pointer">
                        <input type="checkbox" checked={consentEmails} onChange={(e) => setConsentEmails(e.target.checked)}
                          className="accent-[#7147E8] w-3.5 h-3.5 cursor-pointer mt-0.5 flex-shrink-0" />
                        <span>I&apos;d like helpful tips and updates. (Unsubscribe anytime.)</span>
                      </label>
                    </div>

                    {/* Submit */}
                    <button type="submit" disabled={isLoading}
                      className="w-full h-11 rounded-xl text-white text-sm font-extrabold shadow-md hover:opacity-95 transition cursor-pointer flex items-center justify-center gap-2 mt-1"
                      style={{
                        background: isLoading ? 'linear-gradient(90deg,#a78bfa,#c084fc)' : 'linear-gradient(90deg,#7147E8,#c840cc)',
                        boxShadow: '0 4px 16px rgba(113,71,232,0.3)'
                      }}>
                      {isLoading
                        ? <><span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>⟳</span> Processing...</>
                        : <><span>🌱</span> Continue to Verify Email</>}
                    </button>
                  </form>

                  {/* Divider + Login link */}
                  <div className="flex items-center gap-3 my-3">
                    <div className="flex-1 h-px bg-[#EFE8F8]" />
                    <span className="text-xs text-[#A097B5] font-medium">or</span>
                    <div className="flex-1 h-px bg-[#EFE8F8]" />
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs text-[#6B638B] font-medium">Already have an account?</span>
                    <Link href="/login"
                      className="inline-flex items-center gap-1.5 px-4 h-8 rounded-xl border text-xs font-bold transition"
                      style={{ borderColor: '#DCD2F7', color: '#683CD7', background: 'white' }}>
                      <span>👤</span> Login
                    </Link>
                  </div>

                  {/* Info note */}
                  <div className="mt-3 p-2.5 rounded-xl flex items-start gap-2 text-[10.5px] text-[#6E6785] text-left"
                    style={{ background: 'linear-gradient(135deg,#faf8ff,#fef0ff)', border: '1px solid #ede4f8' }}>
                    <span className="text-sm mt-0.5 flex-shrink-0">🔒</span>
                    <div className="leading-snug">
                      <strong className="text-[#2C2548]">Email OTP verification is required.</strong><br />
                      You&apos;ll receive a 6-digit code to confirm your account is real.
                    </div>
                  </div>
                </>
              )}
            </div>

          </div>

          {/* SECURITY STRIP */}
          <section className="p-3 md:px-5 rounded-2xl border border-[#EAE3D6] bg-white flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-[#443C60] shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center text-base flex-shrink-0" style={{ background: '#F2EBFF' }}>🛡️</div>
              <span className="font-medium text-[#383054] text-[11.5px]">Industry-standard encryption keeps your data safe.</span>
            </div>
            <div className="flex flex-wrap gap-3 text-[10.5px] font-bold text-[#5E547A]">
              {['256-bit SSL', 'Secure auth', 'Privacy by design', 'OTP verified'].map(t => (
                <span key={t} className="flex items-center gap-1"><span style={{ color: '#7147E8' }}>✓</span> {t}</span>
              ))}
            </div>
          </section>

        </main>

        {/* FOOTER */}
        <footer className="px-5 py-3 bg-[#171542] text-white flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-base">😊</span>
            <span className="font-serif text-base font-bold tracking-tight">mood<span className="text-[#A78BFA]">flip</span></span>
            <span className="text-purple-200/60 ml-2 hidden sm:inline">A self-reflection utility for real life.</span>
          </div>
          <div className="flex items-center gap-5 text-purple-200/80 font-medium">
            {[['/#about','About'],['/#how','How It Works'],['/#library','Mood Library'],['/privacy','Privacy'],['/terms','Terms'],['/contact','Contact']].map(([href, label]) => (
              <a key={label} href={href} className="hover:text-white transition">{label}</a>
            ))}
          </div>
          <div className="text-purple-200/60">© 2026 MoodFlip.coach 💜</div>
        </footer>

      </div>

      <style jsx global>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
