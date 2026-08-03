'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [msg, setMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMsg('Account login successful! Redirecting to your profile...');
    setTimeout(() => {
      window.location.href = '/profile';
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] p-3 md:p-6 font-sans text-[#2D264B]">
      {/* OUTER APP FRAME (Matching Image 1 Outer Card Frame) */}
      <div className="mx-auto max-w-[1360px] bg-[#FFFFFF] border border-[#181940]/15 rounded-[32px] shadow-2xl overflow-hidden flex flex-col min-h-[920px]">

        {/* TOP HEADER INSIDE APP FRAME */}
        <header className="h-18 px-6 md:px-10 border-b border-[#211F4B]/10 bg-white/90 backdrop-blur-md flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 text-decoration-none group">
            <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-[#7147e8] to-[#a644c9] flex items-center justify-center text-white shadow-xs">
              <span className="text-base">😊</span>
            </div>
            <span className="font-serif text-2xl font-extrabold text-[#15183b] tracking-tight">
              mood<span className="text-[#7147e8]">flip</span>
            </span>
          </Link>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#6b638b]">
            <Link href="/" className="text-[#6b638b] hover:text-[#7147e8] transition">Home</Link>
            <a href="/#about" className="text-[#6b638b] hover:text-[#7147e8] transition">About</a>
            <a href="/#how" className="text-[#6b638b] hover:text-[#7147e8] transition">How It Works</a>
            <a href="/#library" className="text-[#6b638b] hover:text-[#7147e8] transition">Mood Library</a>
            <a href="/#resources" className="text-[#6b638b] hover:text-[#7147e8] transition">Resources</a>
            <a href="/#contact" className="text-[#6b638b] hover:text-[#7147e8] transition">Contact</a>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-5 h-10 rounded-full border border-[#7147e8] bg-white text-[#7147e8] text-sm font-bold shadow-xs hover:bg-[#F5F3FF] transition"
            >
              <span>👤</span> Login
            </Link>

            <Link
              href="/register"
              className="inline-flex items-center px-5 h-10 rounded-full bg-gradient-to-r from-[#7147e8] to-[#a644c9] text-white text-sm font-bold shadow-md shadow-purple-200 hover:opacity-95 transition"
            >
              Get 7-Day Plan
            </Link>
          </div>
        </header>

        {/* MAIN BODY AREA INSIDE APP FRAME */}
        <main className="flex-1 p-6 md:p-10 bg-gradient-to-b from-[#FAF8FD] via-[#FAF9FE] to-[#F7F5FC] flex flex-col justify-between gap-8">

          {/* 2-COLUMN CARDS CONTAINER */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_500px] gap-8 items-stretch min-h-[600px]">

            {/* LEFT HERO CARD (SUNSET ILLUSTRATION & OVERLAY) */}
            <div
              className="relative overflow-hidden rounded-[28px] border border-[#EAE3D6] p-8 md:p-12 flex flex-col justify-between shadow-xs bg-cover bg-center min-h-[520px] lg:min-h-full"
              style={{ backgroundImage: "url('/login-bg.jpg')" }}
            >
              {/* Soft top gradient */}
              <div className="absolute inset-x-0 top-0 h-60 bg-gradient-to-b from-white/90 via-white/50 to-transparent pointer-events-none" />

              {/* Headline & Paragraph (Center Aligned Matching Image 2) */}
              <div className="relative z-10 text-center flex flex-col items-center justify-center pt-2 md:pt-4">
                <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#1A1338] leading-[1.25] mb-3 tracking-tight">
                  A calmer mind.<br />A better you.
                </h1>
                <p className="text-sm md:text-base text-[#554D6E] leading-relaxed font-medium max-w-md mx-auto">
                  Login to continue your journey<br />towards calm, clarity and growth.
                </p>
              </div>

              {/* Bottom 4 Feature Pills Bar */}
              <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-3 bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-[#E6DCF5] shadow-xs">
                <div className="text-center">
                  <div className="w-9 h-9 rounded-xl bg-[#F2EBFF] text-[#7147E8] grid place-items-center mx-auto mb-1.5 text-base">🛡️</div>
                  <strong className="block text-xs font-bold text-[#231D3E] leading-tight">Private &amp; Secure</strong>
                  <span className="text-[10px] text-[#736B85] leading-tight block mt-0.5">Your data is encrypted and protected</span>
                </div>
                <div className="text-center">
                  <div className="w-9 h-9 rounded-xl bg-[#EDFAEF] text-[#28AD79] grid place-items-center mx-auto mb-1.5 text-base">🟢</div>
                  <strong className="block text-xs font-bold text-[#231D3E] leading-tight">Encrypted Access</strong>
                  <span className="text-[10px] text-[#736B85] leading-tight block mt-0.5">Enterprise-grade security</span>
                </div>
                <div className="text-center">
                  <div className="w-9 h-9 rounded-xl bg-[#FFF0F3] text-[#E64F8E] grid place-items-center mx-auto mb-1.5 text-base">❤️</div>
                  <strong className="block text-xs font-bold text-[#231D3E] leading-tight">Built for Wellness</strong>
                  <span className="text-[10px] text-[#736B85] leading-tight block mt-0.5">Supporting your mental well-being</span>
                </div>
                <div className="text-center">
                  <div className="w-9 h-9 rounded-xl bg-[#F4EBFF] text-[#9A4ACB] grid place-items-center mx-auto mb-1.5 text-base">🔒</div>
                  <strong className="block text-xs font-bold text-[#231D3E] leading-tight">You&apos;re in Control</strong>
                  <span className="text-[10px] text-[#736B85] leading-tight block mt-0.5">Your privacy comes first</span>
                </div>
              </div>
            </div>

            {/* RIGHT SIGN-IN CARD */}
            <div className="rounded-[28px] border border-[#EFE8F8] bg-white p-8 md:p-11 shadow-sm flex flex-col justify-center text-center">
              {/* Top Smiley Icon Circle */}
              <div className="w-14 h-14 rounded-full bg-[#F5EEFF] text-[#7147E8] grid place-items-center mx-auto mb-4 text-2xl shadow-xs">
                😊
              </div>

              {/* Titles */}
              <h2 className="font-serif text-3xl font-extrabold text-[#181236] mb-1">
                Welcome Back
              </h2>
              <p className="text-sm font-bold text-[#7147E8] mb-1">
                Sign in to MoodFlip
              </p>
              <p className="text-xs text-[#8A829E] mb-6 font-medium leading-relaxed">
                <strong className="text-[#383054]">Admin &amp; User Login</strong><br />
                One secure portal for both users and admins.
              </p>

              {/* Feedback Message Banner */}
              {msg && (
                <div className="mb-4 rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-xs font-semibold text-emerald-700 text-center">
                  {msg}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <div>
                  <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#6B638B] mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-3 text-[#9B93B0] text-sm">✉</span>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#E2D5F8] bg-[#FAF9FD] text-sm text-[#1E1938] focus:outline-none focus:border-[#7147E8]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#6B638B] mb-1.5">
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
                      className="w-full h-11 pl-10 pr-11 rounded-xl border border-[#E2D5F8] bg-[#FAF9FD] text-sm text-[#1E1938] focus:outline-none focus:border-[#7147E8]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-2.5 text-base text-[#9B93B0]"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? '👁️' : '🙈'}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-[#383252] font-semibold">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="accent-[#7147E8] w-4 h-4 cursor-pointer"
                    />
                    Remember me
                  </label>
                  <a href="/forgot-password" className="text-[#7147E8] font-bold hover:underline">
                    Forgot Password?
                  </a>
                </div>

                <button
                  type="submit"
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-[#7147E8] to-[#9A4ACB] text-white text-sm font-extrabold shadow-md shadow-purple-200 hover:opacity-95 transition cursor-pointer flex items-center justify-center gap-2 mt-2"
                >
                  <span>➔</span> Login
                </button>
              </form>

              {/* Divider */}
              <div className="flex items-center gap-3 my-5">
                <div className="flex-1 h-px bg-[#EFE8F8]" />
                <span className="text-xs text-[#A097B5] font-medium">or</span>
                <div className="flex-1 h-px bg-[#EFE8F8]" />
              </div>

              {/* Register button row */}
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs text-[#6B638B] font-medium">
                  Don&apos;t have an account?
                </span>
                <Link
                  href="/register"
                  className="inline-flex items-center gap-1.5 px-4 h-9 rounded-xl border border-[#DCD2F7] bg-white text-[#683CD7] text-xs font-bold hover:bg-[#F9F6FE] transition"
                >
                  <span>👤</span> Register
                </Link>
              </div>

              {/* Role Subnote Card */}
              <div className="mt-5 p-3 rounded-xl bg-[#FAF9FD] border border-[#F0E8F8] flex items-start gap-2.5 text-[11px] text-[#6E6785] text-left">
                <span className="text-sm mt-0.5">🔒</span>
                <div className="leading-snug">
                  <strong className="text-[#2C2548]">Role is determined automatically after sign in.</strong><br />
                  You&apos;ll be redirected to your dashboard securely.
                </div>
              </div>
            </div>

          </div>

          {/* BOTTOM SECURITY STRIP BAR */}
          <section className="p-4 md:px-6 rounded-2xl border border-[#EAE3D6] bg-white flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#443C60] shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#F2EBFF] text-[#7147E8] grid place-items-center text-lg flex-shrink-0">
                🛡️
              </div>
              <span className="font-medium text-[#383054]">
                We use industry-standard encryption to keep your data safe and your mind at ease.
              </span>
            </div>

            <div className="flex flex-wrap gap-4 text-[11px] font-bold text-[#5E547A]">
              <span className="flex items-center gap-1"><span className="text-[#7147E8]">✓</span> 256-bit SSL encryption</span>
              <span className="flex items-center gap-1"><span className="text-[#7147E8]">✓</span> Secure authentication</span>
              <span className="flex items-center gap-1"><span className="text-[#7147E8]">✓</span> Regular security audits</span>
              <span className="flex items-center gap-1"><span className="text-[#7147E8]">✓</span> Privacy by design</span>
            </div>
          </section>

        </main>

        {/* FOOTER INSIDE APP FRAME */}
        <footer className="h-16 px-6 md:px-10 bg-[#171542] text-white flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-base">😊</span>
            <span className="font-serif text-lg font-bold tracking-tight">
              mood<span className="text-[#A78BFA]">flip</span>
            </span>
            <span className="text-purple-200/60 ml-2 hidden sm:inline">A self-reflection utility for real life.</span>
          </div>

          <div className="flex items-center gap-6 text-purple-200/80 font-medium">
            <a href="/#about" className="hover:text-white transition">About</a>
            <a href="/#how" className="hover:text-white transition">How It Works</a>
            <a href="/#library" className="hover:text-white transition">Mood Library</a>
            <a href="/privacy" className="hover:text-white transition">Privacy Policy</a>
            <a href="/terms" className="hover:text-white transition">Terms</a>
            <a href="/contact" className="hover:text-white transition">Contact</a>
          </div>

          <div className="text-purple-200/60">
            © 2026 MoodFlip.coach 💜
          </div>
        </footer>

      </div>
    </div>
  );
}
