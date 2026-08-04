'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handlePlanClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const isLoggedIn = typeof window !== 'undefined' && (localStorage.getItem('userLoggedIn') === 'true' || localStorage.getItem('isLoggedIn') === 'true');
    if (isLoggedIn) {
      window.location.href = '/profile?tab=My%207-Day%20Plan';
    } else {
      window.location.href = '/register?redirect=/profile?tab=My%207-Day%20Plan';
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[rgba(33,31,75,0.08)] bg-white/90 backdrop-blur-md shadow-xs">
      <div className="mx-auto max-w-[1560px] px-3 md:px-10 h-16 md:h-17 py-2.5 md:py-3 flex items-center justify-between gap-2.5">
        {/* LOGO MARK matching homepage */}
        <Link href="/" className="flex items-center gap-2 text-decoration-none group">
          <span className="relative w-6 md:w-7 h-4.5 md:h-5 inline-block rounded-b-[19px] bg-gradient-to-br from-[#ff9f8d] via-[#d950c0] to-[#7148e9]">
            <span className="absolute left-[5px] md:left-[6px] top-[3px] md:top-[4px] w-[14px] md:w-[17px] h-[7px] md:h-[9px] rounded-b-[12px] bg-white" />
            <span className="absolute -top-[5px] left-[2px] w-[7px] h-[7px] rounded-full bg-[#ffad64]" />
            <span className="absolute -top-[5px] right-[2px] w-[7px] h-[7px] rounded-full bg-[#ffad64]" />
          </span>
          <span className="font-serif text-xl md:text-2xl font-extrabold text-[#15183b] tracking-tight">
            mood<span className="text-[#7147e8]">flip</span>
          </span>
        </Link>

        {/* NAVIGATION LINKS - Desktop */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#6b638b]">
          <Link href="/" className="text-[#15183b] hover:text-[#7147e8] transition-colors">Home</Link>
          <a href="/#about" className="hover:text-[#7147e8] transition-colors">About</a>
          <a href="/#how" className="hover:text-[#7147e8] transition-colors">How It Works</a>
          <a href="/#library" className="hover:text-[#7147e8] transition-colors">Mood Library</a>
          <a href="/#resources" className="hover:text-[#7147e8] transition-colors">Resources</a>
          <Link href="/contact" className="hover:text-[#7147e8] transition-colors">Contact</Link>
        </nav>

        {/* ACTION BUTTONS */}
        <div className="flex items-center gap-1.5 md:gap-3">
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 px-3 md:px-5 h-8.5 md:h-10 rounded-full border border-[#dcd4ee] bg-white text-[#683cd7] text-xs md:text-sm font-bold shadow-xs hover:border-[#683cd7] hover:bg-[#f7f3ff] transition-all whitespace-nowrap"
          >
            <span className="text-xs md:text-sm">👤</span>
            <span>Login</span>
          </Link>

          <a
            href="/profile?tab=My%207-Day%20Plan"
            onClick={handlePlanClick}
            className="inline-flex items-center gap-1 px-3 md:px-5 h-8.5 md:h-10 rounded-full bg-gradient-to-r from-[#7147e8] to-[#a644c9] text-white text-xs md:text-sm font-bold shadow-md shadow-purple-200 hover:opacity-95 transition-all whitespace-nowrap cursor-pointer"
          >
            <span>Get 7-Day Plan</span>
          </a>

          {/* MOBILE TOGGLE BUTTON */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex items-center justify-center w-8.5 h-8.5 rounded-lg border border-[#e0d6f2] bg-[#f8f5fe] text-[#683cd7]"
            aria-label="Toggle Mobile Menu"
          >
            {menuOpen ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            )}
          </button>
        </div>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      {menuOpen && (
        <nav className="md:hidden flex flex-col p-3 bg-white/98 backdrop-blur-xl border-t border-[#ede8f7] shadow-xl animate-in slide-in-from-top-2 duration-200">
          <Link href="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-xl text-[#231f47] font-bold hover:bg-[#f4edff] hover:text-[#683cd7]">
            <span>🏠</span> Home
          </Link>
          <a href="/#about" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-xl text-[#231f47] font-bold hover:bg-[#f4edff] hover:text-[#683cd7]">
            <span>ℹ️</span> About MoodFlip
          </a>
          <a href="/#how" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-xl text-[#231f47] font-bold hover:bg-[#f4edff] hover:text-[#683cd7]">
            <span>⚙️</span> How It Works
          </a>
          <a href="/#library" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-xl text-[#231f47] font-bold hover:bg-[#f4edff] hover:text-[#683cd7]">
            <span>📚</span> Mood Library
          </a>
          <a href="/#resources" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-xl text-[#231f47] font-bold hover:bg-[#f4edff] hover:text-[#683cd7]">
            <span>🎁</span> Resources &amp; Support
          </a>
          <Link href="/contact" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-xl text-[#231f47] font-bold hover:bg-[#f4edff] hover:text-[#683cd7]">
            <span>✉️</span> Contact Us
          </Link>
        </nav>
      )}
    </header>
  );
}
