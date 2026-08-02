'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMsg('Account created successfully! Redirecting to your profile...');
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
            ✨
          </div>
          <h1 className="font-serif text-2xl font-bold mb-2">Create Free Profile</h1>
          <p className="text-xs text-[#6B638B] mb-6">Save check-ins, unlock 7-day progress tracker, and receive email backups.</p>

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

            <button
              type="submit"
              className="w-full rounded-full bg-[#6C5CE7] py-3 text-sm font-bold text-white shadow-md hover:bg-[#5B4B9A] transition"
            >
              Get Started (Free)
            </button>
          </form>

          <div className="mt-6 text-xs text-[#6B638B]">
            Already have an account?{' '}
            <Link href="/login" className="font-bold text-[#6C5CE7] hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
