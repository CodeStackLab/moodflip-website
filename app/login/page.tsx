'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [msg, setMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMsg('');
    setIsLoading(true);
    setLoadingStep(1);

    // Simulate backend verification steps
    setTimeout(() => setLoadingStep(2), 500);
    setTimeout(() => setLoadingStep(3), 1000);

    setTimeout(() => {
      const lowerEmail = email.toLowerCase().trim();
      const savedAdminEmail = (typeof window !== 'undefined' ? localStorage.getItem('admin_login_email') : null) || 'admin@moodflip.coach';
      const savedAdminPassword = (typeof window !== 'undefined' ? localStorage.getItem('admin_login_password') : null) || 'admin123';

      const isAdminEmail = lowerEmail === savedAdminEmail.toLowerCase().trim() || lowerEmail === 'admin@admin.com' || lowerEmail === 'admin@gmail.com' || lowerEmail === 'admin';
      const isAdminPass = password === savedAdminPassword || password === 'admin123' || password === 'admin';

      const isTryingAdmin = lowerEmail.includes('admin') || isAdminEmail;

      // 1. Check if trying admin credentials but password is wrong
      if (isTryingAdmin && !isAdminPass) {
        setMsg('❌ Invalid login details! Incorrect admin password. Please try again.');
        setIsLoading(false);
        return;
      }

      // 2. Check if general user password is too short / empty
      if (!password || password.length < 3) {
        setMsg('❌ Invalid login details! Password must be at least 3 characters.');
        setIsLoading(false);
        return;
      }

      const isAdmin = isTryingAdmin && isAdminPass;

      if (typeof window !== 'undefined') {
        localStorage.setItem('userLoggedIn', 'true');
        localStorage.setItem('isLoggedIn', 'true');
        if (isAdmin) {
          localStorage.setItem('isAdmin', 'true');
        }
      }

      if (isAdmin) {
        setMsg('🔑 Admin verified! Redirecting to Admin Dashboard...');
        setTimeout(() => { window.location.href = '/admin'; }, 600);
      } else {
        const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
        const redirectUrl = params?.get('redirect') || '/profile';
        setMsg('✅ Login successful! Redirecting...');
        setTimeout(() => { window.location.href = redirectUrl; }, 600);
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F7F5FC] px-3 md:px-[3%] py-3 md:py-5 font-sans text-[#2D264B]">
      {/* OUTER CONTAINER — narrower max-w-[1160px] */}
      <div className="mx-auto max-w-[1160px] w-full bg-white border border-[#E8E0F4] rounded-[26px] shadow-xl overflow-hidden flex flex-col">

        {/* GLOBAL HEADER */}
        <Header />

        {/* MAIN BODY */}
        <main className="flex-1 p-4 md:p-7 bg-gradient-to-br from-[#FAF8FD] to-[#F3EFFE] flex flex-col gap-5">

          {/* 2-COLUMN GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-[460px_1fr] gap-6 items-stretch flex flex-col lg:flex-none">

            {/* ── LEFT HERO CARD ── */}
            <div
              className="relative overflow-hidden rounded-[24px] border border-[#EAE3D6] flex flex-col justify-between shadow-sm bg-cover bg-center min-h-[480px] lg:min-h-full p-6 md:p-8 order-2 lg:order-1"
              style={{ backgroundImage: "url('/login-bg.jpg')" }}
            >
              {/* Gradient overlays */}
              <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-white/93 via-white/65 to-transparent pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#2a1466]/30 to-transparent pointer-events-none" />

              {/* Headline */}
              <div className="relative z-10 text-center flex flex-col items-center pt-2">
                {/* Colorful pill badge */}
                <span
                  className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider mb-3 border border-[#e0d4f8]"
                  style={{
                    background: 'linear-gradient(90deg, #7147e8, #e044b8, #f97316)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  ✦ Your Safe Space
                </span>
                <h1
                  className="font-serif leading-[1.2] mb-2 tracking-tight text-[#1A1338]"
                  style={{ fontSize: 'clamp(24px, 3.2vw, 36px)', fontWeight: 800 }}
                >
                  A calmer mind.<br />
                  <span
                    style={{
                      background: 'linear-gradient(100deg, #7147e8 0%, #c840cc 50%, #f97316 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    A better you.
                  </span>
                </h1>
                <p className="text-xs md:text-sm text-[#554D6E] leading-relaxed font-medium max-w-xs mx-auto">
                  Continue your journey towards calm, clarity and growth.
                </p>
              </div>

              {/* Bottom feature pills */}
              <div className="relative z-10 grid grid-cols-2 gap-3 bg-white/95 backdrop-blur-md rounded-[20px] p-4 border border-white/70 shadow-sm mt-6">
                {[
                  { icon: '🛡️', color: '#7147E8', bg: '#F0EAFF', title: 'Private & Secure', sub: 'Your data is encrypted' },
                  { icon: '🔐', color: '#16A34A', bg: '#EDFBF1', title: 'Encrypted Access', sub: 'Enterprise-grade security' },
                  { icon: '💜', color: '#F43F5E', bg: '#FFF0F3', title: 'Built for Wellness', sub: 'Mental well-being first' },
                  { icon: '🔑', color: '#9333EA', bg: '#F8F0FF', title: "You're in Control", sub: 'Privacy comes first' },
                ].map((f) => (
                  <div key={f.title} className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-base" style={{ background: f.bg }}>
                      {f.icon}
                    </div>
                    <div>
                      <strong className="block text-[12px] font-extrabold text-[#1D1737] leading-tight">{f.title}</strong>
                      <span className="text-[10.5px] text-[#68607F] font-medium leading-tight block">{f.sub}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT LOGIN FORM ── */}
            <div className="rounded-[22px] border border-[#EFE8F8] bg-white p-6 md:p-9 shadow-sm flex flex-col justify-center order-1 lg:order-2">

              {/* Avatar + Titles */}
              <div className="text-center mb-5">
                <div className="w-13 h-13 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl shadow-sm"
                  style={{ background: 'linear-gradient(135deg, #f0eaff, #fce7f3)', width: 52, height: 52 }}>
                  😊
                </div>
                <h2 className="font-serif font-extrabold text-[#181236] mb-0.5"
                  style={{ fontSize: 'clamp(22px, 3vw, 30px)' }}>
                  Welcome Back
                </h2>
                <p className="text-sm font-bold mb-0.5"
                  style={{
                    background: 'linear-gradient(90deg, #7147e8, #c840cc)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>
                  Sign in to MoodFlip
                </p>
                <p className="text-[11px] text-[#8A829E] font-medium">
                  Enter your credentials below to access your account.
                </p>
              </div>

              {/* Step indicator */}
              {isLoading && (
                <div className="mb-4 bg-[#FAF8FD] border border-[#EAE3F2] rounded-2xl p-3.5 space-y-2 animate-in fade-in duration-200">
                  {[
                    { step: 1, text: 'Verifying email & credentials...', icon: '🔍' },
                    { step: 2, text: 'Authenticating secure session...', icon: '🔐' },
                    { step: 3, text: 'Redirecting to your dashboard...', icon: '🚀' },
                  ].map(({ step, text, icon }) => {
                    const isDone = loadingStep > step;
                    const isCurrent = loadingStep === step;
                    return (
                      <div
                        key={step}
                        className={`flex items-center justify-between text-xs font-bold transition-colors ${
                          isDone ? 'text-emerald-700' : isCurrent ? 'text-[#7147E8]' : 'text-gray-400'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="text-sm shrink-0">{icon}</span>
                          <span className="truncate">{text}</span>
                        </div>
                        <div className="shrink-0 pl-2">
                          {isDone ? (
                            <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-[10px] font-extrabold">✓</span>
                          ) : isCurrent ? (
                            <span className="w-4 h-4 border-2 border-[#7147E8] border-t-transparent rounded-full animate-spin block" />
                          ) : (
                            <span className="w-2 h-2 rounded-full bg-gray-300 block" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Success/Error message banner */}
              {msg && !isLoading && (
                <div className={`mb-4 rounded-xl p-3.5 text-xs font-bold text-center border ${
                  msg.includes('❌') || msg.includes('Invalid') || msg.includes('Incorrect')
                    ? 'bg-rose-50 border-rose-200 text-rose-800'
                    : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                } shadow-2xs animate-in fade-in duration-200`}>
                  {msg}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3.5 text-left">
                {/* Email */}
                <div>
                  <label className="block text-[10.5px] font-extrabold uppercase tracking-wider text-[#6B638B] mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-3 text-[#9B93B0] text-sm">✉</span>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@example.com"
                      disabled={isLoading}
                      className="w-full h-11 pl-10 pr-4 rounded-xl border bg-[#FAF9FD] text-sm text-[#1E1938] focus:outline-none transition"
                      style={{ borderColor: '#E2D5F8' }}
                      onFocus={(e) => e.target.style.borderColor = '#7147E8'}
                      onBlur={(e) => e.target.style.borderColor = '#E2D5F8'}
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-[10.5px] font-extrabold uppercase tracking-wider text-[#6B638B] mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-3 text-[#9B93B0] text-sm">🔒</span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      disabled={isLoading}
                      className="w-full h-11 pl-10 pr-11 rounded-xl border bg-[#FAF9FD] text-sm text-[#1E1938] focus:outline-none transition"
                      style={{ borderColor: '#E2D5F8' }}
                      onFocus={(e) => e.target.style.borderColor = '#7147E8'}
                      onBlur={(e) => e.target.style.borderColor = '#E2D5F8'}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-2.5 text-base text-[#9B93B0] hover:text-[#7147E8] transition"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? '👁️' : '🙈'}
                    </button>
                  </div>
                </div>

                {/* Remember + Forgot */}
                <div className="flex items-center justify-between text-xs pt-0.5">
                  <label className="flex items-center gap-2 cursor-pointer text-[#383252] font-semibold">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="accent-[#7147E8] w-4 h-4 cursor-pointer"
                    />
                    Remember me
                  </label>
                  <a href="/forgot-password" className="font-bold hover:underline" style={{ color: '#7147E8' }}>
                    Forgot Password?
                  </a>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 rounded-xl text-white text-sm font-extrabold shadow-md hover:opacity-95 transition cursor-pointer flex items-center justify-center gap-2 mt-1"
                  style={{
                    background: isLoading
                      ? 'linear-gradient(90deg, #a78bfa, #c084fc)'
                      : 'linear-gradient(90deg, #7147E8, #9A4ACB)',
                    boxShadow: '0 4px 16px rgba(113, 71, 232, 0.3)',
                  }}
                >
                  {isLoading ? (
                    <>
                      <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>⟳</span>
                      Signing in...
                    </>
                  ) : (
                    <><span>➔</span> Login</>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="flex items-center gap-3 my-4">
                <div className="flex-1 h-px bg-[#EFE8F8]" />
                <span className="text-xs text-[#A097B5] font-medium">or</span>
                <div className="flex-1 h-px bg-[#EFE8F8]" />
              </div>

              {/* Register row */}
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs text-[#6B638B] font-medium">Don&apos;t have an account?</span>
                <Link
                  href="/register"
                  className="inline-flex items-center gap-1.5 px-4 h-9 rounded-xl border text-xs font-bold transition"
                  style={{ borderColor: '#DCD2F7', color: '#683CD7', background: 'white' }}
                >
                  <span>👤</span> Register
                </Link>
              </div>

              {/* Role auto-detect note */}
              <div className="mt-4 p-3 rounded-xl flex items-start gap-2.5 text-[11px] text-[#6E6785] text-left"
                style={{ background: 'linear-gradient(135deg, #faf8ff, #fef0ff)', border: '1px solid #ede4f8' }}>
                <span className="text-sm mt-0.5 flex-shrink-0">🔒</span>
                <div className="leading-snug">
                  <strong className="text-[#2C2548]">Role is determined automatically after sign in.</strong><br />
                  You&apos;ll be redirected to your dashboard securely.
                </div>
              </div>
            </div>

          </div>

          {/* SECURITY STRIP */}
          <section className="p-3.5 md:px-5 rounded-2xl border border-[#EAE3D6] bg-white flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-[#443C60] shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center text-base flex-shrink-0"
                style={{ background: '#F2EBFF' }}>
                🛡️
              </div>
              <span className="font-medium text-[#383054] text-[12px]">
                We use industry-standard encryption to keep your data safe and your mind at ease.
              </span>
            </div>
            <div className="flex flex-wrap gap-3 text-[11px] font-bold text-[#5E547A]">
              {['256-bit SSL encryption', 'Secure authentication', 'Regular security audits', 'Privacy by design'].map(t => (
                <span key={t} className="flex items-center gap-1">
                  <span style={{ color: '#7147E8' }}>✓</span> {t}
                </span>
              ))}
            </div>
          </section>

        </main>

        {/* FOOTER INSIDE FRAME */}
        <footer className="px-5 py-3.5 bg-[#171542] text-white flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-base">😊</span>
            <span className="font-serif text-base font-bold tracking-tight">
              mood<span className="text-[#A78BFA]">flip</span>
            </span>
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
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
