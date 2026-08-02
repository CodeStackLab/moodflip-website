const fs = require('fs');

const loginCode = `'use client';

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
    setMsg('Sign in successful! Redirecting to your profile...');
    setTimeout(() => {
      window.location.href = '/profile';
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2D264B]">
      <Header />

      <main className="mx-auto max-w-[1340px] px-6 py-8">
        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-6 items-stretch min-h-[580px]">
          {/* Left Column: Artistic Landscape Hero & Feature Strip */}
          <div className="relative overflow-hidden rounded-3xl border border-[#ede6f5] p-8 md:p-10 flex flex-col justify-between shadow-sm bg-gradient-to-b from-[#fff2f8] via-[#fff9ea] to-[#fff4fa]">
            <div>
              <h1 className="font-serif text-3xl md:text-4xl font-extrabold text-[#1a1338] leading-tight mb-3.5">
                A calmer mind.<br />A better you.
              </h1>
              <p className="text-sm md:text-base text-[#554d6e] leading-relaxed m-0">
                Login to continue your journey<br />towards calm, clarity and growth.
              </p>
            </div>

            {/* Sunrise & Mountain Background */}
            <div className="absolute left-0 right-0 top-36 h-64 pointer-events-none z-0">
              <div className="absolute left-1/2 top-8 -translate-x-1/2 w-16 h-16 rounded-full bg-gradient-to-tr from-[#ffcf75] to-[#ef9c4e] shadow-[0_0_40px_rgba(255,207,117,0.8)]" />
              <div className="absolute -left-[10%] -right-[10%] bottom-4 h-32 rounded-[50%_50%_0_0] bg-gradient-to-b from-[rgba(246,183,211,0.8)] to-[rgba(220,129,199,0.7)]" />
              <div className="absolute -left-[15%] -right-[15%] -bottom-8 h-40 rounded-[50%_50%_0_0] bg-gradient-to-b from-[#f4b8d7] to-[#cf75bb]" />
            </div>

            {/* Bottom Feature Items Strip */}
            <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-2.5 bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-[#e6dcf5] shadow-sm mt-12">
              <div className="text-center">
                <div className="w-8 h-8 rounded-lg bg-[#f2ebff] text-[#7147e8] grid place-items-center mx-auto mb-1.5 text-base">🛡️</div>
                <strong className="block text-xs font-bold text-[#231d3e]">Private &amp; Secure</strong>
                <span className="text-[10px] text-[#736b85] leading-tight block">Your data is encrypted.</span>
              </div>

              <div className="text-center">
                <div className="w-8 h-8 rounded-lg bg-[#edfaef] text-[#28ad79] grid place-items-center mx-auto mb-1.5 text-base">🟢</div>
                <strong className="block text-xs font-bold text-[#231d3e]">Encrypted Access</strong>
                <span className="text-[10px] text-[#736b85] leading-tight block">Enterprise-grade security</span>
              </div>

              <div className="text-center">
                <div className="w-8 h-8 rounded-lg bg-[#fff0f3] text-[#e64f8e] grid place-items-center mx-auto mb-1.5 text-base">❤️</div>
                <strong className="block text-xs font-bold text-[#231d3e]">Built for Wellness</strong>
                <span className="text-[10px] text-[#736b85] leading-tight block">Supporting your mind</span>
              </div>

              <div className="text-center">
                <div className="w-8 h-8 rounded-lg bg-[#f4ebff] text-[#9a4acb] grid place-items-center mx-auto mb-1.5 text-base">🔒</div>
                <strong className="block text-xs font-bold text-[#231d3e]">You&apos;re in Control</strong>
                <span className="text-[10px] text-[#736b85] leading-tight block">Privacy comes first</span>
              </div>
            </div>
          </div>

          {/* Right Column: Unified Login Form Card */}
          <div className="bg-white rounded-3xl p-8 md:p-9 border border-[#eee7f5] shadow-sm flex flex-col justify-center">
            <div className="w-13 h-13 rounded-full bg-[#f5eeff] grid place-items-center mx-auto mb-3 text-2xl">
              😊
            </div>

            <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#181236] text-center mb-1">
              Welcome Back
            </h2>

            <p className="text-sm text-[#7147e8] font-bold text-center mb-3.5">
              Sign in to MoodFlip
            </p>

            <div className="bg-[#f9f6fe] border border-[#eee4fa] rounded-xl p-2.5 mb-5 text-center">
              <strong className="block text-xs text-[#2b2345]">Admin &amp; User Login</strong>
              <span className="text-[11px] text-[#756d8c]">One secure portal for both users and admins.</span>
            </div>

            {msg && (
              <div className="mb-4 rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-xs font-bold text-emerald-700 text-center">
                {msg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#383050] mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-3 text-base text-[#968ea8]">✉️</span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full h-11 pl-11 pr-3.5 rounded-xl border border-[#e1d8f2] text-sm focus:outline-none focus:border-[#7147e8] bg-[#faf9fd]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#383050] mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-3 text-base text-[#968ea8]">🔒</span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full h-11 pl-11 pr-11 rounded-xl border border-[#e1d8f2] text-sm focus:outline-none focus:border-[#7147e8] bg-[#faf9fd]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-base text-[#968ea8] focus:outline-none"
                  >
                    {showPassword ? '👁️' : '🙈'}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-[#383252] font-semibold">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                    className="accent-[#7147e8] w-4 h-4 cursor-pointer"
                  />
                  Remember me
                </label>
                <a href="/forgot-password" className="text-[#7147e8] font-bold hover:underline">
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full h-12 rounded-xl border-none bg-gradient-to-r from-[#a644c9] to-[#683cd7] text-white text-sm font-extrabold cursor-pointer mt-2 shadow-md shadow-purple-200 hover:opacity-95 transition flex items-center justify-center gap-2"
              >
                <span>→]</span> Login
              </button>
            </form>

            <div className="flex items-center my-5 text-xs text-[#aa9fbe]">
              <div className="flex-1 h-px bg-[#ece5f5]" />
              <span className="px-3">or</span>
              <div className="flex-1 h-px bg-[#ece5f5]" />
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-[#564d73]">Don&apos;t have an account?</span>
              <Link
                href="/register"
                className="inline-flex items-center gap-1.5 h-10 px-5 rounded-lg border border-[#d8cdfa] bg-white text-[#7147e8] text-xs font-bold hover:bg-purple-50 transition"
              >
                <span>👤</span> Register
              </Link>
            </div>

            <div className="mt-5 pt-3.5 border-t border-[#f2edf8] flex items-center gap-2.5 text-[11px] text-[#78708c]">
              <span className="text-base">🔒</span>
              <div>
                Role is determined automatically after sign in.<br />
                You&apos;ll be redirected to your dashboard securely.
              </div>
            </div>
          </div>
        </div>

        {/* Security Bar Below Main Login Grid */}
        <section className="mt-6 p-4 md:px-7 rounded-2xl border border-[#eee7f5] bg-white flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#443c60] shadow-sm">
          <div className="flex items-center gap-3.5">
            <span className="w-9.5 h-9.5 rounded-xl bg-[#e8dcff] grid place-items-center text-lg">🛡️</span>
            <span>We use industry-standard encryption to keep your data safe and your mind at ease.</span>
          </div>

          <div className="flex flex-wrap gap-4 text-xs font-semibold text-[#554a78]">
            <span>✓ 256-bit SSL encryption</span>
            <span>✓ Secure authentication</span>
            <span>✓ Regular security audits</span>
            <span>✓ Privacy by design</span>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
`;

fs.writeFileSync('app/login/page.tsx', loginCode, 'utf8');
console.log('LoginPage updated cleanly!');
