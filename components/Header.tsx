'use client';

import React from 'react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#EAE3D6] bg-[#FDFBF7]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1340px] items-center justify-between px-5 py-4">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#6C5CE7] to-[#8A7CF0] text-white font-black text-xl shadow-md group-hover:scale-105 transition-transform">
            <span>😊</span>
          </div>
          <span className="font-serif text-2xl font-bold tracking-tight text-[#2D264B]">
            mood<span className="text-[#6C5CE7]">flip</span>
          </span>
        </Link>

        {/* NAVIGATION LINKS */}
        <nav className="hidden items-center gap-7 text-sm font-semibold text-[#6B638B] md:flex">
          <Link href="/" className="transition hover:text-[#6C5CE7]">Home</Link>
          <Link href="/about" className="transition hover:text-[#6C5CE7]">About</Link>
          <Link href="/#how-it-works" className="transition hover:text-[#6C5CE7]">How It Works</Link>
          <Link href="/mood/sad" className="transition hover:text-[#6C5CE7]">Mood Library</Link>
          <Link href="/pricing" className="transition hover:text-[#6C5CE7]">Resources</Link>
          <Link href="/contact" className="transition hover:text-[#6C5CE7]">Contact</Link>
        </nav>

        {/* ACTION BUTTONS */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="rounded-full border border-[#DDD6FE] bg-white px-5 py-2.5 text-sm font-bold text-[#6C5CE7] transition hover:bg-[#F5F3FF] shadow-sm"
          >
            👤 Login
          </Link>

          <Link
            href="/register"
            className="rounded-full bg-gradient-to-r from-[#6C5CE7] to-[#8A7CF0] px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-purple-200 transition hover:opacity-95 hover:translate-y-[-1px]"
          >
            ✨ Get 7-Day Plan
          </Link>
        </div>
      </div>
    </header>
  );
}
