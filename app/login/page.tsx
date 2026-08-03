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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMsg('Account login successful! Redirecting to your profile...');
    setTimeout(() => {
      window.location.href = '/profile';
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2D264B] font-sans">
      <Header />

      <main className="mx-auto max-w-[1240px] px-4 md:px-6 py-8 md:py-12">
        {/* Main 2-Column Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_460px] gap-6 md:gap-8 items-stretch min-h-[620px]">

          {/* LEFT HERO COLUMN WITH SUNSET LANDSCAPE */}
          <div
            className="relative overflow-hidden rounded-3xl border border-[#EAE3D6] p-8 md:p-10 flex flex-col justify-between shadow-sm bg-cover bg-center min-h-[480px] lg:min-h-full"
            style={{ backgroundImage: "url('/login-bg.jpg')" }}
          >
            {/* Top soft gradient overlay for readability */}
            <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-white/90 via-white/40 to-transparent pointer-events-none" />

            {/* Top Text Content */}
            <div className="relative z-10">
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#1C1335] leading-tight mb-3">
                A calmer mind.<br />A better you.
              </h1>
              <p className="text-sm md:text-base text-[#4E4566] leading-relaxed font-medium">
                Login to continue your journey<br />towards calm, clarity and growth.
              </p>
            </div>

            {/* Bottom 4 Feature Overlay Strip */}
            <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-3 bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-[#E6DCF5] shadow-sm">
              <div className="text-center">
                <div className="w-9 h-9 rounded-xl bg-[#F3ECFF] text-[#7147E8] grid place-items-center mx-auto mb-1 text-base">🛡️</div>
                <strong className="block text-xs font-extrabold text-[#231D3E] leading-tight">Private &amp; Secure</strong>
                <span className="text-[10px] text-[#706883] leading-tight block mt-0.5">Your data is encrypted and protected</span>
              </div>
              <div className="text-center">
                <div className="w-9 h-9 rounded-xl bg-[#EBF9F0] text-[#28AD79] grid place-items-center mx-auto mb-1 text-base">🛡️</div>
                <strong className="block text-xs font-extrabold text-[#231D3E] leading-tight">Encrypted Access</strong>
                <span className="text-[10px] text-[#706883] leading-tight block mt-0.5">Enterprise-grade security</span>
              </div>
              <div className="text-center">
                <div className="w-9 h-9 rounded-xl bg-[#FFF0F4] text-[#E64F8E] grid place-items-center mx-auto mb-1 text-base">❤️</div>
                <strong className="block text-xs font-extrabold text-[#231D3E] leading-tight">Built for Wellness</strong>
                <span className="text-[10px] text-[#706883] leading-tight block mt-0.5">Supporting your mental well-being</span>
              </div>
              <div className="text-center">
                <div className="w-9 h-9 rounded-xl bg-[#F5ECFF] text-[#9A4ACB] grid place-items-center mx-auto mb-1 text-base">🔒</div>
                <strong className="block text-xs font-extrabold text-[#231D3E] leading-tight">You&apos;re in Control</strong>
                <span className="text-[10px] text-[#706883] leading-tight block mt-0.5">Your privacy comes first</span>
              </div>
            </div>
          </div>

          {/* RIGHT SIGN IN CARD */}
          <div className="rounded-3xl border border-[#EFE8F8] bg-white p-8 md:p-10 shadow-sm flex flex-col justify-center text-center">
            {/* Smiley Icon Header */}
            <div className="w-13 h-13 rounded-full bg-[#F5EEFF] text-[#7147E8] grid place-items-center mx-auto mb-3 text-2xl shadow-sm">
              😊
            </div>

            {/* Title & Subtitle */}
            <h2 className="font-serif text-2xl md:text-3xl font-extrabold text-[#181236] mb-1">
              Welcome Back
            </h2>
            <p className="text-xs font-bold text-[#7147E8] mb-1">
              Sign in to MoodFlip
            </p>
            <p className="text-xs text-[#8A829E] mb-6 font-medium leading-relaxed">
              <strong className="text-[#383054]">Admin &amp; User Login</strong><br />
              One secure portal for both users and admins.
            </p>

            {/* Success Message Banner */}
            {msg && (
              <div className="mb-4 rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-xs font-semibold text-emerald-700 text-center">
                {msg}
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              {/* Email Address */}
              <div>
                <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#524B6B] mb-1.5">
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
                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#E2D7F7] bg-[#FAF8FC] text-sm text-[#1E1938] focus:outline-none focus:border-[#7147E8]"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#524B6B] mb-1.5">
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
                    className="w-full h-11 pl-10 pr-11 rounded-xl border border-[#E2D7F7] bg-[#FAF8FC] text-sm text-[#1E1938] focus:outline-none focus:border-[#7147E8]"
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

              {/* Checkbox and Forgot Password */}
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

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full h-12 rounded-xl bg-gradient-to-r from-[#7C4CE8] to-[#6034CB] text-white text-sm font-extrabold shadow-md shadow-purple-200 hover:opacity-95 transition cursor-pointer flex items-center justify-center gap-2 mt-2"
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

            {/* Registration Row */}
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs text-[#5A5274] font-medium">
                Don&apos;t have an account?
              </span>
              <Link
                href="/register"
                className="inline-flex items-center gap-1.5 px-4 h-9 rounded-xl border border-[#DCD2F7] bg-white text-[#683CD7] text-xs font-bold hover:bg-[#F9F6FE] transition"
              >
                <span>👤</span> Register
              </Link>
            </div>

            {/* Security Subnote inside Card */}
            <div className="mt-5 p-3 rounded-xl bg-[#FAF8FC] border border-[#F0E8F8] flex items-start gap-2.5 text-[11px] text-[#6E6785] text-left">
              <span className="text-sm mt-0.5">🔒</span>
              <div className="leading-snug">
                <strong className="text-[#2C2548]">Role is determined automatically after sign in.</strong><br />
                You&apos;ll be redirected to your dashboard securely.
              </div>
            </div>

          </div>

        </div>

        {/* Security Bar Below Main Login Grid */}
        <section className="mt-6 p-4 md:px-6 rounded-2xl border border-[#EAE3D6] bg-white flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#443C60] shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#F3ECFF] text-[#7147E8] grid place-items-center text-lg flex-shrink-0">
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

      <Footer />
    </div>
  );
}
