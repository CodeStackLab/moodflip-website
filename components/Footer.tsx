'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-16 bg-[#FAF5F6] border-t border-[#E4DAD7] text-[#5C527A] py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1240px] flex flex-col md:flex-row items-center justify-between gap-8 border-b border-[#E4DAD7] pb-8">
        <div>
          <Link href="/" className="inline-flex items-center gap-2 mb-3 bg-[#FEFAF8] px-3.5 py-1.5 rounded-2xl border border-[#E4DAD7] shadow-xs hover:border-[#7666AB] transition">
            <img
              src="/moodflip-logo.png"
              alt="MoodFlip"
              className="h-8 w-auto object-contain mix-blend-multiply"
            />
          </Link>
          <p className="text-sm text-[#5C527A] max-w-sm leading-relaxed">
            A self-reflection utility for real life. Tap-only, 60-second mindset shifts without questionnaires or medical jargon.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-sm font-semibold text-[#5C527A]">
          <Link href="/about" className="hover:text-[#7464AC] transition">About</Link>
          <Link href="/#how" className="hover:text-[#7464AC] transition">How It Works</Link>
          <Link href="/#library" className="hover:text-[#7464AC] transition">Mood Library</Link>
          <Link href="/pricing" className="hover:text-[#7464AC] transition">Pricing</Link>
          <Link href="/privacy" className="hover:text-[#7464AC] transition">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-[#7464AC] transition">Terms</Link>
          <Link href="/contact" className="hover:text-[#7464AC] transition">Contact</Link>
        </div>
      </div>

      <div className="mx-auto max-w-[1240px] pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#7E7096] gap-4">
        <div>© 2026 MoodFlip.coach 💜</div>
        <div>Self-reflection utility · Not therapy or medical advice</div>
      </div>
    </footer>
  );
}
