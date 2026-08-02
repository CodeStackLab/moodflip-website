const fs = require('fs');

const loginTsx = `'use client';

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
      <main className="mx-auto max-w-[1180px] px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_450px] gap-8 items-stretch min-h-[540px]">
          {/* Left Column: Pastel Landscape Hero */}
          <div className="relative overflow-hidden rounded-3xl border border-[#EAE3D6] p-8 md:p-10 flex flex-col justify-between shadow-sm bg-gradient-to-b from-[#FFF2F8] via-[#FFF9EA] to-[#FFF4FA]">
            <div>
              <h1 className="font-serif text-3xl md:text-4xl font-extrabold text-[#1A1338] leading-tight mb-3">
                A calmer mind.<br />A better you.
              </h1>
              <p className="text-sm text-[#554D6E] leading-relaxed">
                Login to continue your journey<br />towards calm, clarity and growth.
              </p>
            </div>

            {/* Bottom 4 Feature Items */}
            <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-3 bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-[#E6DCF5] shadow-sm mt-10">
              <div className="text-center">
                <div className="w-8 h-8 rounded-lg bg-[#F2EBFF] text-[#7147E8] grid place-items-center mx-auto mb-1 text-sm">🛡️</div>
                <strong className="block text-xs font-bold text-[#231D3E]">Private &amp; Secure</strong>
                <span className="text-[10px] text-[#736B85]">Encrypted data</span>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 rounded-lg bg-[#EDFAEF] text-[#28AD79] grid place-items-center mx-auto mb-1 text-sm">🟢</div>
                <strong className="block text-xs font-bold text-[#231D3E]">Encrypted Access</strong>
                <span className="text-[10px] text-[#736B85]">SSL Security</span>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 rounded-lg bg-[#FFF0F3] text-[#E64F8E] grid place-items-center mx-auto mb-1 text-sm">❤️</div>
                <strong className="block text-xs font-bold text-[#231D3E]">Wellness Built</strong>
                <span className="text-[10px] text-[#736B85]">Supportive mind</span>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 rounded-lg bg-[#F4EBFF] text-[#9A4ACB] grid place-items-center mx-auto mb-1 text-sm">🔒</div>
                <strong className="block text-xs font-bold text-[#231D3E]">In Control</strong>
                <span className="text-[10px] text-[#736B85]">Privacy first</span>
              </div>
            </div>
          </div>

          {/* Right Column: Sign In Card */}
          <div className="rounded-3xl border border-[#EAE3D6] bg-white p-8 md:p-9 shadow-sm flex flex-col justify-center text-center">
            <div className="w-13 h-13 rounded-full bg-[#F5EEFF] grid place-items-center mx-auto mb-3 text-2xl">
              😊
            </div>

            <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#181236] mb-1">
              Welcome Back
            </h2>

            <p className="text-xs font-bold text-[#7147E8] mb-4">
              Sign in to MoodFlip
            </p>

            {msg && (
              <div className="mb-4 rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-xs font-semibold text-emerald-700">
                {msg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold uppercase text-[#6B638B] mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full h-11 px-4 rounded-xl border border-[#E2D5F8] text-sm focus:outline-none focus:border-[#6C5CE7] bg-[#FAF9FD]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#6B638B] mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full h-11 pl-4 pr-10 rounded-xl border border-[#E2D5F8] text-sm focus:outline-none focus:border-[#6C5CE7] bg-[#FAF9FD]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-sm text-[#968EA8]"
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
                    className="accent-[#6C5CE7] w-4 h-4 cursor-pointer"
                  />
                  Remember me
                </label>
                <a href="/forgot-password" className="text-[#6C5CE7] font-bold hover:underline">
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full h-11 rounded-xl bg-gradient-to-r from-[#6C5CE7] to-[#8A7CF0] text-white text-sm font-bold shadow-md shadow-purple-200 hover:opacity-95 transition cursor-pointer"
              >
                Login
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-[#F2EDF8] text-xs text-[#6B638B]">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="font-bold text-[#6C5CE7] hover:underline">
                Register Free
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
`;

fs.writeFileSync('app/login/page.tsx', loginTsx, 'utf8');
console.log('LoginPage updated cleanly matching register page syntax!');
