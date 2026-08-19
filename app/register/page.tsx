'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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

  // Step 1: Submit form → Direct account creation
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

    setTimeout(() => setLoadingStep(2), 500);
    setTimeout(() => {
      setLoadingStep(3);
      if (typeof window !== 'undefined') {
        localStorage.setItem('userLoggedIn', 'true');
        localStorage.setItem('isLoggedIn', 'true');
        if (fullName) localStorage.setItem('userName', fullName);
        if (email) localStorage.setItem('userEmail', email);
        const params = new URLSearchParams(window.location.search);
        const redirectUrl = params.get('redirect') || '/profile';
        window.location.href = redirectUrl;
      }
    }, 1000);
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
    <div className="min-h-screen bg-[#FDF8F5] flex flex-col justify-between selection:bg-[#EEE0FC] selection:text-[#4F438B]">
      <Header />

      <main className="flex-1 flex items-center justify-center p-4 md:p-8 py-8 md:py-12">
        <div className="w-full max-w-4xl mx-auto space-y-6">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">

            {/* ── LEFT HERO CARD ── */}
            <div
              className="relative overflow-hidden rounded-[24px] border border-[#E4DAD7] flex flex-col justify-between shadow-[0_10px_28px_rgba(26,20,63,0.03)] bg-cover bg-center min-h-[440px] lg:min-h-full p-6 md:p-8 order-2 lg:order-1"
              style={{ backgroundImage: "url('/login-bg.jpg')" }}
            >
              {/* Gradient overlays */}
              <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-[#FDF8F5]/95 via-[#FDF8F5]/70 to-transparent pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#1A143F]/30 to-transparent pointer-events-none" />

              {/* Headline */}
              <div className="relative z-10 text-center flex flex-col items-center pt-2">
                <span
                  className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider mb-3 border border-[#E4DAD7] bg-[#F4EBF5] text-[#7464AC]"
                >
                  ✦ Start Your Journey
                </span>
                <h1
                  className="font-serif leading-[1.2] mb-2 tracking-tight text-[#1A143F]"
                  style={{ fontSize: 'clamp(24px, 3.2vw, 36px)', fontWeight: 800 }}
                >
                  Begin your journey.<br />
                  <span
                    style={{
                      background: 'linear-gradient(100deg, #7464AC 0%, #E49C8C 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    One small step today.
                  </span>
                </h1>
                <p className="text-xs md:text-sm text-[#5C527A] leading-relaxed font-medium max-w-xs mx-auto">
                  Create your free profile to save check-ins, track progress, and build emotional clarity.
                </p>
              </div>

              {/* Feature pills */}
              <div className="relative z-10 grid grid-cols-2 gap-3 bg-[#FEFAF8]/95 backdrop-blur-md rounded-[20px] p-4 border border-[#E4DAD7] shadow-sm mt-6">
                {[
                  { icon: '🛡️', bg: '#F4EBF5', title: 'Private & Secure', sub: 'Data is encrypted' },
                  { icon: '👤', bg: '#FCF3E9', title: 'Free Profile', sub: 'Instant access' },
                  { icon: '💜', bg: '#FAF5F6', title: 'Save Progress', sub: 'Check-ins saved' },
                  { icon: '🔑', bg: '#EEE0FC', title: 'Privacy First', sub: 'Never shared' },
                ].map((f) => (
                  <div key={f.title} className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-base border border-[#E4DAD7]" style={{ background: f.bg }}>
                      {f.icon}
                    </div>
                    <div>
                      <strong className="block text-[12px] font-extrabold text-[#1A143F] leading-tight">{f.title}</strong>
                      <span className="text-[10.5px] text-[#5C527A] font-medium leading-tight block mt-0.5">{f.sub}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT FORM ── */}
            <div className="rounded-[24px] border border-[#E4DAD7] bg-[#FEFAF8] p-6 md:p-8 shadow-[0_10px_28px_rgba(26,20,63,0.03)] flex flex-col justify-center order-1 lg:order-2">

              {/* ── OTP VERIFICATION SCREEN ── */}
              {showOtp ? (
                <div className="flex flex-col items-center text-center">
                  <div className="w-13 h-13 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl border border-[#E4DAD7] bg-[#FCF3E9]"
                    style={{ width: 52, height: 52 }}>
                    📧
                  </div>
                  <h2 className="font-serif font-extrabold text-[#1A143F] mb-1 text-2xl">
                    Verify Your Email
                  </h2>
                  <p className="text-sm font-bold mb-1 text-[#7464AC]">
                    OTP Verification Required
                  </p>
                  <p className="text-xs text-[#5C527A] mb-5 max-w-xs">
                    We&apos;ve sent a 6-digit OTP to <strong className="text-[#1A143F]">{email}</strong>. Enter it below to activate your account.
                    <br /><span className="text-[10px] text-[#7464AC] mt-1 block">(Demo OTP: <strong>123456</strong>)</span>
                  </p>

                  {/* OTP input */}
                  <div className="flex gap-2 justify-center mb-3">
                    <input
                      type="text"
                      maxLength={6}
                      value={otpInput}
                      onChange={(e) => { setOtpInput(e.target.value.replace(/\D/g, '')); setOtpError(''); }}
                      placeholder="123456"
                      className="text-center text-xl font-extrabold tracking-[0.3em] w-48 h-12 rounded-xl border bg-[#FEFAF8] text-[#1A143F] focus:outline-none transition"
                      style={{ borderColor: otpError ? '#E49C8C' : '#E4DAD7' }}
                      onFocus={(e) => e.target.style.borderColor = '#7464AC'}
                      onBlur={(e) => e.target.style.borderColor = otpError ? '#E49C8C' : '#E4DAD7'}
                    />
                  </div>

                  {otpError && (
                    <p className="text-xs text-[#E49C8C] font-semibold mb-3">{otpError}</p>
                  )}

                  <button
                    onClick={handleOtpVerify}
                    disabled={otpVerifying}
                    className="w-full h-12 rounded-xl text-white text-sm font-extrabold flex items-center justify-center gap-2 mb-3 cursor-pointer shadow-md hover:opacity-95 transition"
                    style={{
                      background: 'linear-gradient(135deg, #7464AC, #4F438B)',
                      boxShadow: '0 4px 16px rgba(79, 67, 139, 0.28)'
                    }}
                  >
                    {otpVerifying
                      ? <><span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>⟳</span> Verifying...</>
                      : <><span>✅</span> Verify & Create Account</>}
                  </button>

                  <div className="flex items-center gap-2 text-xs text-[#5C527A]">
                    <span>Didn&apos;t receive it?</span>
                    <button onClick={handleResendOtp} className="font-bold hover:underline text-[#7464AC] cursor-pointer">
                      {otpSent ? 'Resend OTP' : '⟳ Sending...'}
                    </button>
                  </div>

                  <button onClick={() => { setShowOtp(false); setOtpInput(''); setOtpError(''); }}
                    className="mt-3 text-xs text-[#A49BA8] hover:text-[#7464AC] transition font-medium cursor-pointer">
                    ← Back to registration
                  </button>
                </div>

              ) : (
                /* ── REGISTRATION FORM ── */
                <>
                  {/* Avatar + Titles */}
                  <div className="text-center mb-4">
                    <div className="rounded-full flex items-center justify-center mx-auto mb-2 text-2xl border border-[#E4DAD7]"
                      style={{ background: 'linear-gradient(135deg, #F4EBF5, #FCF3E9)', width: 48, height: 48 }}>
                      🌱
                    </div>
                    <h2 className="font-serif font-extrabold text-[#1A143F] mb-0.5 text-2xl">
                      Create Account
                    </h2>
                    <p className="text-sm font-bold mb-0.5 text-[#7464AC]">
                      Join MoodFlip — It&apos;s Free
                    </p>
                    <p className="text-[11px] text-[#7E7096] font-medium">
                      Start tracking your moods and building calm today.
                    </p>
                  </div>

                  {/* Backend loading steps */}
                  {isLoading && (
                    <div className="mb-3 rounded-xl p-3 border border-[#E4DAD7] bg-[#FDF8F5] text-xs space-y-1.5">
                      {[
                        { step: 1, label: '📝 Validating your information...' },
                        { step: 2, label: '🔐 Setting up secure profile...' },
                        { step: 3, label: '🚀 Finalizing your account...' },
                      ].map(({ step, label }) => (
                        <div key={step} className="flex items-center gap-2 font-semibold"
                          style={{ color: loadingStep >= step ? '#7464AC' : '#A49BA8', opacity: loadingStep >= step ? 1 : 0.4 }}>
                          {loadingStep > step ? '✓' : loadingStep === step
                            ? <span style={{ display: 'inline-block', animation: 'spin 0.8s linear infinite' }}>⟳</span>
                            : '○'}
                          {label}
                        </div>
                      ))}
                    </div>
                  )}

                  {msg && !isLoading && (
                    <div className={`mb-3 rounded-xl p-3 text-xs font-semibold text-center border ${
                      isError ? 'bg-[#FAF5F6] border-[#E4DAD7] text-[#E49C8C]' : 'bg-[#FCF3E9] border-[#E4DAD7] text-[#7D8164]'
                    }`}>
                      {msg}
                    </div>
                  )}

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-3 text-left">

                    {/* Full Name */}
                    <div>
                      <label className="block text-[10.5px] font-extrabold uppercase tracking-wider text-[#5C527A] mb-1">Full Name</label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-3 text-[#A49BA8] text-sm">👤</span>
                        <input type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)}
                          placeholder="Enter your full name" disabled={isLoading}
                          className="w-full h-10 pl-10 pr-4 rounded-xl border bg-[#FEFAF8] text-sm text-[#1A143F] focus:outline-none transition"
                          style={{ borderColor: '#E4DAD7' }}
                          onFocus={(e) => e.target.style.borderColor = '#7464AC'}
                          onBlur={(e) => e.target.style.borderColor = '#E4DAD7'} />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-[10.5px] font-extrabold uppercase tracking-wider text-[#5C527A] mb-1">Email Address</label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-3 text-[#A49BA8] text-sm">✉</span>
                        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email address" disabled={isLoading}
                          className="w-full h-10 pl-10 pr-4 rounded-xl border bg-[#FEFAF8] text-sm text-[#1A143F] focus:outline-none transition"
                          style={{ borderColor: '#E4DAD7' }}
                          onFocus={(e) => e.target.style.borderColor = '#7464AC'}
                          onBlur={(e) => e.target.style.borderColor = '#E4DAD7'} />
                      </div>
                    </div>

                    {/* Password */}
                    <div>
                      <label className="block text-[10.5px] font-extrabold uppercase tracking-wider text-[#5C527A] mb-1">Password</label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-3 text-[#A49BA8] text-sm">🔒</span>
                        <input type={showPassword ? 'text' : 'password'} required value={password}
                          onChange={(e) => setPassword(e.target.value)} placeholder="Create a strong password" disabled={isLoading}
                          className="w-full h-10 pl-10 pr-10 rounded-xl border bg-[#FEFAF8] text-sm text-[#1A143F] focus:outline-none transition"
                          style={{ borderColor: '#E4DAD7' }}
                          onFocus={(e) => e.target.style.borderColor = '#7464AC'}
                          onBlur={(e) => e.target.style.borderColor = '#E4DAD7'} />
                        <button type="button" onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3.5 top-2 text-base text-[#A49BA8] hover:text-[#7464AC] transition" aria-label="Toggle password">
                          {showPassword ? '👁️' : '🙈'}
                        </button>
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-[10px] text-[#5C527A]">
                        <span>Strength:</span>
                        <div className="flex-1 flex gap-1 h-1.5">
                          {[1, 2, 3, 4].map((level) => (
                            <div key={level} className="flex-1 rounded-full transition-colors" style={{
                              background: strength >= level
                                ? level <= 1 ? '#E49C8C' : level <= 2 ? '#EDAA7A' : level <= 3 ? '#7D8164' : '#7464AC'
                                : '#E4DAD7'
                            }} />
                          ))}
                        </div>
                        <span style={{ color: strength >= 4 ? '#7464AC' : strength >= 3 ? '#7D8164' : strength >= 2 ? '#EDAA7A' : '#E49C8C' }}>
                          {strength === 0 ? '' : strength === 1 ? 'Weak' : strength === 2 ? 'Fair' : strength === 3 ? 'Good' : 'Strong'}
                        </span>
                      </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label className="block text-[10.5px] font-extrabold uppercase tracking-wider text-[#5C527A] mb-1">Confirm Password</label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-3 text-[#A49BA8] text-sm">🔒</span>
                        <input type={showConfirmPassword ? 'text' : 'password'} required value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm your password" disabled={isLoading}
                          className="w-full h-10 pl-10 pr-10 rounded-xl border bg-[#FEFAF8] text-sm text-[#1A143F] focus:outline-none transition"
                          style={{ borderColor: confirmPassword && confirmPassword !== password ? '#E49C8C' : '#E4DAD7' }}
                          onFocus={(e) => e.target.style.borderColor = '#7464AC'}
                          onBlur={(e) => e.target.style.borderColor = confirmPassword && confirmPassword !== password ? '#E49C8C' : '#E4DAD7'} />
                        <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3.5 top-2 text-base text-[#A49BA8] hover:text-[#7464AC] transition" aria-label="Toggle confirm">
                          {showConfirmPassword ? '👁️' : '🙈'}
                        </button>
                      </div>
                      {confirmPassword && confirmPassword !== password && (
                        <p className="text-[10px] text-[#E49C8C] font-semibold mt-0.5">Passwords do not match</p>
                      )}
                      {confirmPassword && confirmPassword === password && (
                        <p className="text-[10px] font-semibold mt-0.5 text-[#7D8164]">✓ Passwords match</p>
                      )}
                    </div>

                    {/* Checkboxes */}
                    <div className="space-y-1.5 text-[10.5px] text-[#5C527A] font-medium leading-tight pt-1">
                      <label className="flex items-start gap-2 cursor-pointer">
                        <input type="checkbox" required checked={consentData} onChange={(e) => setConsentData(e.target.checked)}
                          className="accent-[#7464AC] w-3.5 h-3.5 cursor-pointer mt-0.5 flex-shrink-0" />
                        <span>
                          I consent to store my email, moods, and progress data for personalized features.{' '}
                          <a href="/privacy" className="font-bold hover:underline text-[#7464AC]">Learn more</a>
                        </span>
                      </label>
                      <label className="flex items-start gap-2 cursor-pointer">
                        <input type="checkbox" checked={consentEmails} onChange={(e) => setConsentEmails(e.target.checked)}
                          className="accent-[#7464AC] w-3.5 h-3.5 cursor-pointer mt-0.5 flex-shrink-0" />
                        <span>I&apos;d like helpful tips and updates. (Unsubscribe anytime.)</span>
                      </label>
                    </div>

                    {/* Submit */}
                    <button type="submit" disabled={isLoading}
                      className="w-full h-11 rounded-xl text-white text-sm font-extrabold shadow-md hover:opacity-95 transition cursor-pointer flex items-center justify-center gap-2 mt-2"
                      style={{
                        background: isLoading ? 'linear-gradient(90deg, #9C8CC4, #7464AC)' : 'linear-gradient(135deg, #7464AC, #4F438B)',
                        boxShadow: '0 4px 16px rgba(79, 67, 139, 0.28)'
                      }}>
                      {isLoading
                        ? <><span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>⟳</span> Processing...</>
                        : <><span>🌱</span> Create Free Account</>}
                    </button>
                  </form>

                  {/* Divider + Login link */}
                  <div className="flex items-center gap-3 my-3">
                    <div className="flex-1 h-px bg-[#E4DAD7]" />
                    <span className="text-xs text-[#A49BA8] font-medium">or</span>
                    <div className="flex-1 h-px bg-[#E4DAD7]" />
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs text-[#5C527A] font-medium">Already have an account?</span>
                    <Link href="/login"
                      className="inline-flex items-center gap-1.5 px-4 h-8 rounded-xl border border-[#E4DAD7] bg-[#F4EBF5] text-[#7464AC] text-xs font-bold hover:border-[#7666AB] transition">
                      <span>👤</span> Login
                    </Link>
                  </div>
                </>
              )}
            </div>

          </div>

          {/* SECURITY STRIP */}
          <section className="p-4 rounded-2xl border border-[#E4DAD7] bg-[#FEFAF8] flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-[#5C527A] shadow-[0_4px_16px_rgba(26,20,63,0.03)]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center text-base flex-shrink-0 bg-[#F4EBF5] text-[#7464AC] border border-[#E4DAD7]">🛡️</div>
              <span className="font-medium text-[#1A143F] text-[12px]">Industry-standard encryption keeps your data safe and private.</span>
            </div>
            <div className="flex flex-wrap gap-3 text-[11px] font-bold text-[#5C527A]">
              {['256-bit SSL', 'Secure auth', 'Privacy by design', 'Protected data'].map(t => (
                <span key={t} className="flex items-center gap-1"><span className="text-[#7464AC]">✓</span> {t}</span>
              ))}
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
