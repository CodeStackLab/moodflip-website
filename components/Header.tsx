'use client';

import React from 'react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[rgba(33,31,75,0.08)] bg-white/90 backdrop-blur-md shadow-xs">
      <div className="mx-auto max-w-[1560px] px-4 md:px-10 h-17 py-3 flex items-center justify-between gap-4">
        {/* LOGO MARK matching homepage */}
        <Link href="/" className="flex items-center gap-2.5 text-decoration-none group">
          <span className="relative w-7 h-5 inline-block rounded-b-[19px] bg-gradient-to-br from-[#ff9f8d] via-[#d950c0] to-[#7148e9]">
            <span className="absolute left-[6px] top-[4px] w-[17px] h-[9px] rounded-b-[12px] bg-white" />
            <span className="absolute -top-[6px] left-[2px] w-[8px] h-[8px] rounded-full bg-[#ffad64]" />
            <span className="absolute -top-[6px] right-[2px] w-[8px] h-[8px] rounded-full bg-[#ffad64]" />
          </span>
          <span className="font-serif text-2xl font-extrabold text-[#15183b] tracking-tight">
            mood<span className="text-[#7147e8]">flip</span>
          </span>
        </Link>

        {/* NAVIGATION LINKS */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#6b638b]">
          <Link href="/" className="text-[#15183b] hover:text-[#7147e8] transition-colors">Home</Link>
          <a href="/#about" className="hover:text-[#7147e8] transition-colors">About</a>
          <a href="/#how" className="hover:text-[#7147e8] transition-colors">How It Works</a>
          <a href="/#library" className="hover:text-[#7147e8] transition-colors">Mood Library</a>
          <a href="/#resources" className="hover:text-[#7147e8] transition-colors">Resources</a>
          <a href="/#contact" className="hover:text-[#7147e8] transition-colors">Contact</a>
        </nav>

        {/* ACTION BUTTONS */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-5 h-10 rounded-full border border-[#dcd4ee] bg-white text-[#683cd7] text-xs md:text-sm font-bold shadow-xs hover:border-[#683cd7] hover:bg-[#f7f3ff] hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
          >
            <span className="text-sm">👤</span>
            <span>Login</span>
          </Link>

          <Link
            href="/register"
            className="inline-flex items-center gap-1.5 px-5 h-10 rounded-full bg-gradient-to-r from-[#7147e8] to-[#a644c9] text-white text-xs md:text-sm font-bold shadow-md shadow-purple-200 hover:opacity-95 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
          >
            <span>✨ Get 7-Day Plan</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
