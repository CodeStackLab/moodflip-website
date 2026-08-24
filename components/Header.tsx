'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-[#E4DAD7] bg-[#FDF8F5]/95 backdrop-blur-md" suppressHydrationWarning>
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-4">
        
        {/* LOGO (without TM) */}
        <Link href="/" className="flex items-center gap-2.5 text-decoration-none shrink-0 group">
          <img
            src="/moodflip-logo.png"
            alt="MoodFlip"
            className="h-10 sm:h-11 md:h-12 w-auto object-contain mix-blend-multiply transition-transform duration-200 group-hover:scale-102"
          />
        </Link>

        {/* DESKTOP NAV: Home | About | Privacy Policy | Contact */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-semibold text-[#5C527A]">
          <Link href="/" className="text-[#1A143F] font-bold pb-1 border-b-2 border-[#7464AC] hover:text-[#7464AC] transition-all">
            Home
          </Link>
          <Link href="/about" className="hover:text-[#7464AC] transition-colors">
            About
          </Link>
          <Link href="/privacy" className="hover:text-[#7464AC] transition-colors">
            Privacy Policy
          </Link>
          <Link href="/contact" className="hover:text-[#7464AC] transition-colors">
            Contact
          </Link>
        </nav>

        {/* ACTION BUTTONS: Login */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 px-4 h-9 rounded-full border border-[#D6CEE8] bg-[#FEFAF8] text-[#533B93] text-xs md:text-sm font-bold shadow-2xs hover:border-[#7464AC] hover:bg-[#F4EBF5] transition-all whitespace-nowrap"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            Login
          </Link>

          {/* MOBILE TOGGLE */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl border border-[#E4DAD7] bg-[#FEFAF8] text-[#7464AC] hover:bg-[#F4EBF5] hover:border-[#7666AB] transition shadow-xs cursor-pointer"
            aria-label="Toggle Navigation Menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* MOBILE DROPDOWN: Home | About | Privacy Policy | Contact | Login */}
      {mounted && menuOpen && (
        <nav className="md:hidden flex flex-col p-4 bg-[#FDF8F5]/98 backdrop-blur-xl border-t border-[#E4DAD7] shadow-xl animate-in slide-in-from-top-2 duration-200 gap-1.5" suppressHydrationWarning>
          <div className="flex flex-col gap-1">
            <Link href="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-xl text-[#1A143F] font-bold text-sm hover:bg-[#F4EBF5] hover:text-[#7464AC] transition">
              <span className="w-6 text-center text-lg">🏠</span> Home
            </Link>
            <Link href="/about" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-xl text-[#1A143F] font-bold text-sm hover:bg-[#F4EBF5] hover:text-[#7464AC] transition">
              <span className="w-6 text-center text-lg">ℹ️</span> About
            </Link>
            <Link href="/privacy" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-xl text-[#1A143F] font-bold text-sm hover:bg-[#F4EBF5] hover:text-[#7464AC] transition">
              <span className="w-6 text-center text-lg">🔒</span> Privacy Policy
            </Link>
            <Link href="/contact" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-xl text-[#1A143F] font-bold text-sm hover:bg-[#F4EBF5] hover:text-[#7464AC] transition">
              <span className="w-6 text-center text-lg">✉️</span> Contact
            </Link>
            <Link href="/login" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 p-3 rounded-xl text-[#1A143F] font-bold text-sm hover:bg-[#F4EBF5] hover:text-[#7464AC] transition">
              <span className="w-6 text-center text-lg">🔑</span> Login
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
