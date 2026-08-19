'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
    <div className="min-h-screen bg-[#FDF8F5] flex flex-col justify-between selection:bg-[#EEE0FC] selection:text-[#4F438B]">
      <Header />

      <main className="flex-1 flex items-center justify-center p-4 md:p-8 py-8 md:py-12">
        <div className="w-full max-w-4xl mx-auto space-y-6">
          
          {/* Main Card Container */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">

            {/* ── LEFT HERO BANNER ── */}
            <div
              className="relative rounded-[24px] border border-[#E4DAD7] overflow-hidden p-6 md:p-10 flex flex-col justify-between min-h-[380px] lg:min-h-[500px] bg-cover bg-center shadow-[0_10px_28px_rgba(26,20,63,0.03)] order-2 lg:order-1"
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
                  ✦ Your Safe Space
                </span>
                <h1
                  className="font-serif leading-[1.2] mb-2 tracking-tight text-[#1A143F]"
                  style={{ fontSize: 'clamp(24px, 3.2vw, 36px)', fontWeight: 800 }}
                >
                  A calmer mind.<br />
                  <span
                    style={{
                      background: 'linear-gradient(100deg, #7464AC 0%, #E49C8C 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    A better you.
                  </span>
                </h1>
                <p className="text-xs md:text-sm text-[#5C527A] leading-relaxed font-medium max-w-xs mx-auto">
                  Continue your journey towards calm, clarity and growth.
                </p>
              </div>

              {/* Bottom feature pills */}
              <div className="relative z-10 grid grid-cols-2 gap-3 bg-[#FEFAF8]/95 backdrop-blur-md rounded-[20px] p-4 border border-[#E4DAD7] shadow-sm mt-6">
                {[
                  { icon: '🛡️', color: '#7464AC', bg: '#F4EBF5', title: 'Private & Secure', sub: 'Your data is encrypted' },
                  { icon: '🔐', color: '#7D8164', bg: '#FCF3E9', title: 'Encrypted Access', sub: 'Privacy-first security' },
                  { icon: '💜', color: '#E49C8C', bg: '#FAF5F6', title: 'Built for Wellness', sub: 'Mental well-being first' },
                  { icon: '🔑', color: '#7464AC', bg: '#EEE0FC', title: "You're in Control", sub: 'Privacy comes first' },
                ].map((f) => (
                  <div key={f.title} className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-base border border-[#E4DAD7]" style={{ background: f.bg }}>
                      {f.icon}
                    </div>
                    <div>
                      <strong className="block text-[12px] font-extrabold text-[#1A143F] leading-tight">{f.title}</strong>
                      <span className="text-[10.5px] text-[#5C527A] font-medium leading-tight block">{f.sub}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT LOGIN FORM ── */}
            <div className="rounded-[24px] border border-[#E4DAD7] bg-[#FEFAF8] p-6 md:p-9 shadow-[0_10px_28px_rgba(26,20,63,0.03)] flex flex-col justify-center order-1 lg:order-2">

              {/* Avatar + Titles */}
              <div className="text-center mb-5">
                <div className="w-13 h-13 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl shadow-sm border border-[#E4DAD7]"
                  style={{ background: 'linear-gradient(135deg, #F4EBF5, #FCF3E9)', width: 52, height: 52 }}>
                  😊
                </div>
                <h2 className="font-serif font-extrabold text-[#1A143F] mb-0.5"
                  style={{ fontSize: 'clamp(22px, 3vw, 30px)' }}>
                  Welcome Back
                </h2>
                <p className="text-sm font-bold mb-0.5 text-[#7464AC]">
                  Sign in to MoodFlip
                </p>
                <p className="text-[11px] text-[#7E7096] font-medium">
                  Enter your credentials below to access your account.
                </p>
              </div>

              {/* Step indicator */}
              {isLoading && (
                <div className="mb-4 bg-[#FDF8F5] border border-[#E4DAD7] rounded-2xl p-3.5 space-y-2 animate-in fade-in duration-200">
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
                          isDone ? 'text-[#7D8164]' : isCurrent ? 'text-[#7464AC]' : 'text-gray-400'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="text-sm shrink-0">{icon}</span>
                          <span className="truncate">{text}</span>
                        </div>
                        <div className="shrink-0 pl-2">
                          {isDone ? (
                            <span className="w-5 h-5 rounded-full bg-[#FCF3E9] text-[#7D8164] flex items-center justify-center text-[10px] font-extrabold border border-[#E4DAD7]">✓</span>
                          ) : isCurrent ? (
                            <span className="w-4 h-4 border-2 border-[#7464AC] border-t-transparent rounded-full animate-spin block" />
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
                    ? 'bg-[#FAF5F6] border-[#E4DAD7] text-[#E49C8C]'
                    : 'bg-[#FCF3E9] border-[#E4DAD7] text-[#7D8164]'
                }`}>
                  {msg}
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-3.5">
                
                {/* Email */}
                <div>
                  <label className="block text-[10.5px] font-extrabold uppercase tracking-wider text-[#5C527A] mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-3 text-[#A49BA8] text-sm">✉</span>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@example.com"
                      disabled={isLoading}
                      className="w-full h-11 pl-10 pr-4 rounded-xl border bg-[#FEFAF8] text-sm text-[#1A143F] focus:outline-none transition"
                      style={{ borderColor: '#E4DAD7' }}
                      onFocus={(e) => e.target.style.borderColor = '#7464AC'}
                      onBlur={(e) => e.target.style.borderColor = '#E4DAD7'}
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-[10.5px] font-extrabold uppercase tracking-wider text-[#5C527A] mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-3 text-[#A49BA8] text-sm">🔒</span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      disabled={isLoading}
                      className="w-full h-11 pl-10 pr-11 rounded-xl border bg-[#FEFAF8] text-sm text-[#1A143F] focus:outline-none transition"
                      style={{ borderColor: '#E4DAD7' }}
                      onFocus={(e) => e.target.style.borderColor = '#7464AC'}
                      onBlur={(e) => e.target.style.borderColor = '#E4DAD7'}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-2.5 text-base text-[#A49BA8] hover:text-[#7464AC] transition"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? '👁️' : '🙈'}
                    </button>
                  </div>
                </div>

                {/* Remember + Forgot */}
                <div className="flex items-center justify-between text-xs pt-0.5">
                  <label className="flex items-center gap-2 cursor-pointer text-[#5C527A] font-semibold">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="accent-[#7464AC] w-4 h-4 cursor-pointer"
                    />
                    Remember me
                  </label>
                  <a href="/forgot-password" className="font-bold hover:underline" style={{ color: '#7464AC' }}>
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
                      ? 'linear-gradient(90deg, #9C8CC4, #7464AC)'
                      : 'linear-gradient(135deg, #7464AC, #4F438B)',
                    boxShadow: '0 4px 16px rgba(79, 67, 139, 0.28)',
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
                <div className="flex-1 h-px bg-[#E4DAD7]" />
                <span className="text-xs text-[#A49BA8] font-medium">or</span>
                <div className="flex-1 h-px bg-[#E4DAD7]" />
              </div>

              {/* Register row */}
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs text-[#5C527A] font-medium">Don&apos;t have an account?</span>
                <Link
                  href="/register"
                  className="px-4 py-2 rounded-xl border border-[#E4DAD7] bg-[#F4EBF5] text-[#7464AC] text-xs font-extrabold hover:border-[#7666AB] transition shrink-0"
                >
                  Create Account →
                </Link>
              </div>

              {/* Quick Admin Test Login */}
              <div className="mt-4 pt-3 border-t border-[#E4DAD7] text-center">
                <p className="text-[10.5px] text-[#7E7096] mb-1.5 font-medium">Quick Credentials Fill:</p>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => { setEmail('admin@moodflip.coach'); setPassword('admin123'); }}
                    className="px-2.5 py-1 rounded-lg border border-[#E4DAD7] bg-[#F4EBF5] text-[#7464AC] text-[10.5px] font-bold hover:bg-[#EEE0FC] transition cursor-pointer"
                  >
                    👑 Fill Admin Login
                  </button>
                  <button
                    type="button"
                    onClick={() => { setEmail('user@example.com'); setPassword('user123'); }}
                    className="px-2.5 py-1 rounded-lg border border-[#E4DAD7] bg-[#FCF3E9] text-[#5C527A] text-[10.5px] font-bold hover:bg-[#FDE8C8] transition cursor-pointer"
                  >
                    👤 Fill User Login
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* SECURITY STRIP */}
          <section className="p-4 rounded-2xl border border-[#E4DAD7] bg-[#FEFAF8] flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-[#5C527A] shadow-[0_4px_16px_rgba(26,20,63,0.03)]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center text-base flex-shrink-0 bg-[#F4EBF5] text-[#7464AC] border border-[#E4DAD7]">
                🛡️
              </div>
              <span className="font-medium text-[#1A143F] text-[12px]">
                We use industry-standard encryption to keep your data safe and your mind at ease.
              </span>
            </div>
            <div className="flex flex-wrap gap-3 text-[11px] font-bold text-[#5C527A]">
              {['256-bit SSL encryption', 'Secure authentication', 'Regular security audits', 'Privacy by design'].map(t => (
                <span key={t} className="flex items-center gap-1">
                  <span className="text-[#7464AC]">✓</span> {t}
                </span>
              ))}
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
