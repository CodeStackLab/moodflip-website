'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMsg('Account login successful! Redirecting...');
    setTimeout(() => {
      window.location.href = '/profile';
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2D264B]">
      <Header />
      <main className="mx-auto max-w-md px-6 py-16">
        <div className="rounded-3xl border border-[#EAE3D6] bg-white p-8 shadow-sm text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F5F3FF] text-2xl mx-auto mb-4">
            👤
          </div>
          <h1 className="font-serif text-2xl font-bold mb-2">Welcome Back</h1>
          <p className="text-xs text-[#6B638B] mb-6">Enter your email to log into your MoodFlip check-ins</p>

          {msg && (
            <div className="mb-4 rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-xs font-semibold text-emerald-700">
              {msg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold uppercase text-[#6B638B] mb-1">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-[#EAE3D6] p-3 text-sm focus:outline-[#6C5CE7]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-[#6B638B] mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-[#EAE3D6] p-3 text-sm focus:outline-[#6C5CE7]"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-[#6C5CE7] py-3 text-sm font-bold text-white shadow-md hover:bg-[#5B4B9A] transition"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-xs text-[#6B638B]">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="font-bold text-[#6C5CE7] hover:underline">
              Create Free Account
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
