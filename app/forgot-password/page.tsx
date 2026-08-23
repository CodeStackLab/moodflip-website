'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  return (
    <div className="min-h-screen bg-[#FFFDFC] px-3 md:px-[5%] py-3 md:py-6 font-sans text-[#2D264B]">
      <div className="mx-auto max-w-[1560px] w-full bg-[#FEF9F5] border border-[#181940]/14 rounded-[29px] shadow-2xl overflow-hidden flex flex-col min-h-[720px]">
        <Header />
        <main className="flex-1 p-6 md:p-10 bg-gradient-to-b from-[#FEF9F5] via-[#FAF9FE] to-[#F7F5FC] flex items-center justify-center">
          <div className="w-full max-w-md rounded-[28px] border border-[#EFE8F8] bg-[#FEF9F5] p-8 md:p-10 shadow-sm text-center">
            <div className="w-14 h-14 rounded-full bg-[#F5EEFF] text-[#7464AC] grid place-items-center mx-auto mb-4 text-2xl shadow-xs">
              🔒
            </div>
            <h1 className="font-serif text-3xl font-extrabold text-[#181236] mb-1">
              Reset Password
            </h1>
            <p className="text-xs text-[#8A829E] mb-6 font-medium leading-relaxed">
              Enter your email and we&apos;ll send password reset instructions.
            </p>

            {message && (
              <div className="mb-4 rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-xs font-semibold text-emerald-700 text-center">
                {message}
              </div>
            )}

            <form
              className="space-y-4 text-left"
              onSubmit={(event) => {
                event.preventDefault();
                setMessage(`Password reset instructions are ready for ${email}.`);
              }}
            >
              <div>
                <label className="block text-[11px] font-extrabold uppercase tracking-wider text-[#6B638B] mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Enter your email address"
                  className="w-full h-11 px-4 rounded-xl border border-[#E2D5F8] bg-[#FAF9FD] text-sm text-[#1E1938] focus:outline-none focus:border-[#7464AC]"
                />
              </div>
              <button
                type="submit"
                className="w-full h-12 rounded-xl bg-gradient-to-r from-[#7464AC] to-[#9A4ACB] text-white text-sm font-extrabold shadow-md shadow-purple-200 hover:opacity-95 transition cursor-pointer"
              >
                Send Reset Instructions
              </button>
            </form>

            <Link href="/login" className="inline-flex mt-5 text-xs font-bold text-[#7464AC] hover:underline">
              Back to Login
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
