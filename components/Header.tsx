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
    <header className="sticky top-0 z-50 border-b border-[rgba(33,31,75,0.08)] bg-white/95 backdrop-blur-md shadow-xs">
      <div className="mx-auto max-w-[1560px] px-4 md:px-8 h-16 md:h-17 flex items-center justify-between gap-4">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2.5 text-decoration-none shrink-0 group">
          <span className="relative inline-block w-[29px] h-[22px] rounded-b-[19px] bg-gradient-to-br from-[#ff9f8d] via-[#d950c0] to-[#7148e9] shrink-0 mt-1.5">
            <span className="absolute left-[6px] top-[4px] w-[17px] h-[9px] rounded-b-[12px] bg-white" />
            <span className="absolute -top-[6px] left-[3px] w-[8px] h-[8px] rounded-full bg-[#ffad64] z-10" />
            <span className="absolute -top-[6px] right-[3px] w-[8px] h-[8px] rounded-full bg-[#ffad64] z-10" />
          </span>
          <span className="font-serif text-2xl font-extrabold text-[#15183b] tracking-tight whitespace-nowrap">
            mood<span className="text-[#7147e8]">flip</span>
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-6 text-sm font-bold text-[#6b638b]">
          <Link href="/" className="text-[#15183b] hover:text-[#7147e8] transition-colors">Home</Link>
          <a href="/#about" className="hover:text-[#7147e8] transition-colors">About</a>
          <a href="/#how" className="hover:text-[#7147e8] transition-colors">How It Works</a>
          <a href="/#library" className="hover:text-[#7147e8] transition-colors">Mood Library</a>
          <Link href="/resources" className="hover:text-[#7147e8] transition-colors">Resources</Link>
          <Link href="/blog" className="hover:text-[#7147e8] transition-colors flex items-center gap-1">
            <span>Blog</span>
            <span className="text-[9px] font-black bg-[#7147e8] text-white px-1.5 py-0.5 rounded-full leading-none">NEW</span>
          </Link>
        </nav>

        {/* ACTION BUTTONS */}
        <div className="flex items-center gap-2.5 shrink-0">
          <Link
            href="/login"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 h-10 rounded-full border border-[#7147e8]/30 bg-[#FAF8FD] text-[#7147e8] text-xs md:text-sm font-extrabold shadow-2xs hover:border-[#7147e8] hover:bg-[#7147e8] hover:text-white transition-all whitespace-nowrap"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
            <span>Login</span>
          </Link>

          <a
            href="/profile?tab=My%207-Day%20Plan"
            onClick={handlePlanClick}
            className="hidden sm:inline-flex items-center gap-1.5 px-5 h-10 rounded-full bg-gradient-to-r from-[#7147e8] via-[#8545e1] to-[#a644c9] text-white text-xs md:text-sm font-extrabold shadow-md shadow-purple-200 hover:scale-[1.02] hover:shadow-lg transition-all whitespace-nowrap cursor-pointer shrink-0"
          >
            <span>Get 7-Day Plan</span>
          </a>

          {/* MOBILE TOGGLE */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden flex items-center justify-center w-[38px] h-[38px] rounded-[10px] border-[1.5px] border-[#dcd4ee] bg-white text-[#683cd7] hover:bg-[#f7f3ff] hover:border-[#683cd7] transition shadow-xs cursor-pointer"
            aria-label="Toggle Navigation Menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            )}
          </button>
        </div>
      </div>

      {/* MOBILE DROPDOWN */}
      {menuOpen && (
        <nav className="lg:hidden flex flex-col p-4 bg-white/98 backdrop-blur-xl border-t border-[#ede8f7] shadow-xl animate-in slide-in-from-top-2 duration-200 gap-1.5">
          <div className="flex flex-col gap-1">
            <Link href="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-3.5 p-3 rounded-[14px] text-[#231f47] font-bold text-base hover:bg-[#f4edff] hover:text-[#683cd7] transition">
              <span className="w-7 text-center text-xl">🏠</span> Home
            </Link>
            <a href="/#about" onClick={() => setMenuOpen(false)} className="flex items-center gap-3.5 p-3 rounded-[14px] text-[#231f47] font-bold text-base hover:bg-[#f4edff] hover:text-[#683cd7] transition">
              <span className="w-7 text-center text-xl">ℹ️</span> About
            </a>
            <a href="/#how" onClick={() => setMenuOpen(false)} className="flex items-center gap-3.5 p-3 rounded-[14px] text-[#231f47] font-bold text-base hover:bg-[#f4edff] hover:text-[#683cd7] transition">
              <span className="w-7 text-center text-xl">⚙️</span> How It Works
            </a>
            <a href="/#library" onClick={() => setMenuOpen(false)} className="flex items-center gap-3.5 p-3 rounded-[14px] text-[#231f47] font-bold text-base hover:bg-[#f4edff] hover:text-[#683cd7] transition">
              <span className="w-7 text-center text-xl">📚</span> Mood Library
            </a>
            <Link href="/resources" onClick={() => setMenuOpen(false)} className="flex items-center gap-3.5 p-3 rounded-[14px] text-[#231f47] font-bold text-base hover:bg-[#f4edff] hover:text-[#683cd7] transition">
              <span className="w-7 text-center text-lg">🎁</span> Resources
            </Link>
            <Link href="/blog" onClick={() => setMenuOpen(false)} className="flex items-center gap-3.5 p-3 rounded-[14px] text-[#231f47] font-bold text-base hover:bg-[#f4edff] hover:text-[#683cd7] transition">
              <span className="w-7 text-center text-lg">📝</span>
              <span>Blog</span>
              <span className="ml-1 text-[9px] font-black bg-[#7147e8] text-white px-1.5 py-0.5 rounded-full">NEW</span>
            </Link>
          </div>

          <div className="flex flex-col gap-2.5 mt-2 pt-4 border-t border-[#efe9f8]">
            <Link href="/login" onClick={() => setMenuOpen(false)} className="flex items-center justify-center gap-2 h-[46px] rounded-[14px] bg-[#f4edff] text-[#683cd7] font-bold text-base border border-[#e5d8f8] hover:bg-[#ebdcfc] transition">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              <span>Login</span>
            </Link>
            <a
              href="/profile?tab=My%207-Day%20Plan"
              onClick={(e) => { handlePlanClick(e); setMenuOpen(false); }}
              className="flex items-center justify-center gap-2 h-[46px] rounded-[14px] bg-gradient-to-r from-[#7147e8] to-[#a644c9] text-white font-bold text-base shadow-md cursor-pointer hover:opacity-95 transition"
            >
              <span>Get 7-Day Plan</span>
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
