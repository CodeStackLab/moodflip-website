'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-12 bg-[#1E1935] text-white py-12 px-6">
      <div className="mx-auto max-w-[1340px] flex flex-col md:flex-row items-center justify-between gap-8 border-b border-white/10 pb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">😄</span>
            <span className="font-serif text-2xl font-bold tracking-tight">
              mood<span className="text-[#A78BFA]">flip</span>
            </span>
          </div>
          <p className="text-sm text-purple-200/70 max-w-sm">
            A self-reflection utility for real life. Tap-only, 60-second mindset shifts without questionnaires or medical jargon.
          </p>
        </div>

        <div className="flex flex-wrap gap-6 text-sm font-medium text-purple-200/80">
          <Link href="/about" className="hover:text-white transition">About</Link>
          <Link href="/#how-it-works" className="hover:text-white transition">How It Works</Link>
          <Link href="/mood/sad" className="hover:text-white transition">Mood Library</Link>
          <Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white transition">Terms</Link>
          <Link href="/contact" className="hover:text-white transition">Contact</Link>
        </div>
      </div>

      <div className="mx-auto max-w-[1340px] pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-purple-200/50 gap-4">
        <div>© 2026 MoodFlip.coach 💜</div>
        <div>Self-reflection utility · Not therapy or medical advice</div>
      </div>
    </footer>
  );
}
