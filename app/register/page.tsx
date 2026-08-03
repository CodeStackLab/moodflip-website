'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMsg('Passwords do not match. Please try again.');
      return;
    }
    setMsg('Account created successfully! Redirecting to your profile...');
    setTimeout(() => {
      window.location.href = '/profile';
    }, 1200);
  };

  // Password strength calculation helper
  const getPasswordStrength = () => {
    if (!password) return 0;
    if (password.length < 6) return 1;
    if (password.length < 10) return 2;
    if (/[A-Z]/.test(password) && /[0-9]/.test(password)) return 4;
    return 3;
  };

  const strength = getPasswordStrength();

  return (
    <div className="min-h-screen bg-[#FFFDFC] px-3 md:px-[5%] py-3 md:py-6 font-sans text-[#2D264B]">
      {/* OUTER APP FRAME (Matching Register Mockup max-w-[1560px]) */}
      <div className="mx-auto max-w-[1560px] w-full bg-[#FFFFFF] border border-[#181940]/14 rounded-[29px] shadow-2xl overflow-hidden flex flex-col min-h-[920px]">

        {/* REUSABLE GLOBAL HEADER */}
        <Header />

        {/* MAIN BODY AREA INSIDE APP FRAME */}
        <main className="flex-1 p-6 md:p-10 bg-gradient-to-b from-[#FAF8FD] via-[#FAF9FE] to-[#F7F5FC] flex flex-col justify-between gap-8">

          {/* 2-COLUMN CARDS CONTAINER (Extra spacious 620px right column width) */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_620px] gap-8 items-stretch min-h-[620px]">

            {/* LEFT HERO CARD (SUNSET LANDSCAPE BACKGROUND) */}
            <div
              className="relative overflow-hidden rounded-[28px] border border-[#EAE3D6] p-8 md:p-12 flex flex-col justify-between shadow-xs bg-cover bg-center min-h-[540px] lg:min-h-full"
              style={{ backgroundImage: "url('/login-bg.jpg')" }}
            >
              {/* Soft top gradient overlay */}
              <div className="absolute inset-x-0 top-0 h-60 bg-gradient-to-b from-white/90 via-white/50 to-transparent pointer-events-none" />

              {/* Headline & Paragraph (Center Aligned) */}
              <div className="relative z-10 text-center flex flex-col items-center justify-center pt-2 md:pt-4">
                <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#1A1338] leading-[1.25] mb-3 tracking-tight">
                  Begin your journey.<br />One small step today.
                </h1>
                <p className="text-sm md:text-base text-[#554D6E] leading-relaxed font-medium max-w-md mx-auto">
                  Create your free profile to save your check-ins,<br />track progress, and build a better mind.
                </p>
              </div>

              {/* Bottom 4 Feature Pills Bar (Exact 1:1 Match of Mockup) */}
              <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 bg-white/95 backdrop-blur-md rounded-[24px] p-5 md:p-6 border border-white/80 shadow-md">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-[#7147E8]/12 flex items-center justify-center mx-auto mb-2">
                    <svg className="w-6 h-6 text-[#7147E8]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-5.45 9-12V5l-9-4zm-1 14.5l-3.5-3.5 1.41-1.41L11 12.67l5.09-5.09 1.41 1.41L11 15.5z"/>
                    </svg>
                  </div>
                  <strong className="block text-[13px] font-extrabold text-[#1D1737] leading-tight">Private &amp; Secure</strong>
                  <span className="text-[11px] text-[#68607F] font-medium leading-tight block mt-1">Your data is encrypted and protected</span>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-[#7147E8]/12 flex items-center justify-center mx-auto mb-2">
                    <svg className="w-6 h-6 text-[#7147E8]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </div>
                  <strong className="block text-[13px] font-extrabold text-[#1D1737] leading-tight">Free Profile</strong>
                  <span className="text-[11px] text-[#68607F] font-medium leading-tight block mt-1">Start free and upgrade anytime</span>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-[#F43F5E]/12 flex items-center justify-center mx-auto mb-2">
                    <svg className="w-6 h-6 text-[#F43F5E]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                  </div>
                  <strong className="block text-[13px] font-extrabold text-[#1D1737] leading-tight">Save Progress</strong>
                  <span className="text-[11px] text-[#68607F] font-medium leading-tight block mt-1">Your check-ins and actions are saved</span>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-[#9333EA]/12 flex items-center justify-center mx-auto mb-2">
                    <svg className="w-6 h-6 text-[#9333EA]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                    </svg>
                  </div>
                  <strong className="block text-[13px] font-extrabold text-[#1D1737] leading-tight">90-Day Privacy</strong>
                  <span className="text-[11px] text-[#68607F] font-medium leading-tight block mt-1">We never sell your data. Ever.</span>
                </div>
              </div>
            </div>

            {/* RIGHT CREATE ACCOUNT CARD */}
            <div className="rounded-[28px] border border-[#EFE8F8] bg-white p-8 md:p-10 shadow-sm flex flex-col justify-center text-center">
              {/* Top Smiley Icon Circle */}
              <div className="w-14 h-14 rounded-full bg-[#F5EEFF] text-[#7147E8] grid place-items-center mx-auto mb-4 text-2xl shadow-xs">
                😊
              </div>

              {/* Titles */}
              <h2 className="font-serif text-3xl font-extrabold text-[#181236] mb-1">
                Create Account
              </h2>
              <p className="text-sm font-bold text-[#7147E8] mb-1">
                Join MoodFlip
              </p>
              <p className="text-xs text-[#8A829E] mb-5 font-medium leading-relaxed">
                <strong className="text-[#383054]">Free User Registration</strong><br />
                Create your account to start tracking your mood and wellbeing.
              </p>

              {/* Feedback Message Banner */}
              {msg && (
                <div className={`mb-4 rounded-xl p-3 text-xs font-semibold text-center border ${msg.includes('do not match') ? 'bg-rose-50 border-rose-200 text-rose-700' : 'bg-emerald-50 border-emerald-200 text-emerald-700'}`}>
                  {msg}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3.5 text-left">
                {/* Full Name */}
                <div>
                  <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#6B638B] mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-3 text-[#9B93B0] text-sm">👤</span>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#E2D5F8] bg-[#FAF9FD] text-sm text-[#1E1938] focus:outline-none focus:border-[#7147E8]"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#6B638B] mb-1">
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

                {/* Password */}
                <div>
                  <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#6B638B] mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-3 text-[#9B93B0] text-sm">🔒</span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create a password"
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
                  {/* Password Strength Indicator */}
                  <div className="flex items-center gap-2 mt-1.5 text-[11px] text-[#6B638B]">
                    <span>Password strength:</span>
                    <div className="flex-1 flex gap-1.5 h-1.5">
                      {[1, 2, 3, 4].map((level) => (
                        <div
                          key={level}
                          className={`flex-1 rounded-full transition-colors ${
                            strength >= level
                              ? level <= 1
                                ? 'bg-rose-400'
                                : level <= 2
                                ? 'bg-amber-400'
                                : level <= 3
                                ? 'bg-emerald-400'
                                : 'bg-[#7147E8]'
                              : 'bg-[#EAE3F2]'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#6B638B] mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-3 text-[#9B93B0] text-sm">🔒</span>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your password"
                      className="w-full h-11 pl-10 pr-11 rounded-xl border border-[#E2D5F8] bg-[#FAF9FD] text-sm text-[#1E1938] focus:outline-none focus:border-[#7147E8]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3.5 top-2.5 text-base text-[#9B93B0]"
                      aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                    >
                      {showConfirmPassword ? '👁️' : '🙈'}
                    </button>
                  </div>
                </div>

                {/* Checkboxes */}
                <div className="space-y-2 text-xs pt-1 text-[#383252] font-medium leading-tight">
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={consentData}
                      onChange={(e) => setConsentData(e.target.checked)}
                      className="accent-[#7147E8] w-4 h-4 cursor-pointer mt-0.5 flex-shrink-0"
                    />
                    <span>
                      I consent to store my email, moods, dates, actions, and purchase history to provide personalized downloads and track my progress.{' '}
                      <a href="/privacy" className="text-[#7147E8] font-bold hover:underline">Learn more</a>
                    </span>
                  </label>

                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={consentEmails}
                      onChange={(e) => setConsentEmails(e.target.checked)}
                      className="accent-[#7147E8] w-4 h-4 cursor-pointer mt-0.5 flex-shrink-0"
                    />
                    <span>
                      I&apos;d like to receive helpful tips, product updates, and offers from MoodFlip by email. (You can unsubscribe anytime.)
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-[#7147E8] to-[#9A4ACB] text-white text-sm font-extrabold shadow-md shadow-purple-200 hover:opacity-95 transition cursor-pointer flex items-center justify-center gap-2 mt-2"
                >
                  <span>➔</span> Create My Account
                </button>
              </form>

              {/* Divider */}
              <div className="flex items-center gap-3 my-4">
                <div className="flex-1 h-px bg-[#EFE8F8]" />
                <span className="text-xs text-[#A097B5] font-medium">or</span>
                <div className="flex-1 h-px bg-[#EFE8F8]" />
              </div>

              {/* Login button row */}
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs text-[#6B638B] font-medium">
                  Already have an account?
                </span>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 px-5 h-9 rounded-xl border border-[#DCD2F7] bg-white text-[#683CD7] text-xs font-bold hover:bg-[#F9F6FE] transition"
                >
                  <span>👤</span> Login
                </Link>
              </div>

              {/* Role Subnote Card */}
              <div className="mt-4 p-3 rounded-xl bg-[#FAF9FD] border border-[#F0E8F8] flex items-start gap-2.5 text-[11px] text-[#6E6785] text-left">
                <span className="text-sm mt-0.5">🔒</span>
                <div className="leading-snug">
                  <strong className="text-[#2C2548]">This form is for creating normal user accounts.</strong><br />
                  Admin accounts are created securely by the site owner.
                </div>
              </div>
            </div>

          </div>

          {/* BOTTOM SECURITY STRIP BAR */}
          <section className="p-4 md:px-6 rounded-2xl border border-[#EAE3D6] bg-white flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#443C60] shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#7147E8]/12 flex items-center justify-center text-[#7147E8] flex-shrink-0">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-5.45 9-12V5l-9-4zm-1 14.5l-3.5-3.5 1.41-1.41L11 12.67l5.09-5.09 1.41 1.41L11 15.5z"/>
                </svg>
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
