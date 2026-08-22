'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-16 bg-[#FAF5F6] border-t border-[#E4DAD7] text-[#5C527A] pt-14 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1240px]">
        {/* TOP SECTION: MULTI-COLUMN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#E4DAD7]">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-[#FEFAF8] px-3.5 py-1.5 rounded-2xl border border-[#E4DAD7] shadow-xs hover:border-[#7666AB] transition"
            >
              <img
                src="/moodflip-logo.png"
                alt="MoodFlip"
                className="h-8 w-auto object-contain mix-blend-multiply"
              />
            </Link>
            <p className="text-sm text-[#5C527A] max-w-sm leading-relaxed">
              A self-reflection utility for real life. Tap-only, 60-second mindset shifts without questionnaires or medical jargon.
            </p>
            <div className="flex items-center gap-2 pt-1 text-xs text-[#7E7096]">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>100% Private &amp; Anonymous Option Available</span>
            </div>
          </div>

          {/* Quick Links Col */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#1A143F]">
              Explore MoodFlip
            </h4>
            <ul className="space-y-2.5 text-sm font-semibold">
              <li>
                <Link href="/" className="hover:text-[#7464AC] transition">
                  Mood Tool
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#7464AC] transition">
                  About
                </Link>
              </li>
              <li>
                <Link href="/#how" className="hover:text-[#7464AC] transition">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/#library" className="hover:text-[#7464AC] transition">
                  Mood Library
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-[#7464AC] transition">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-[#7464AC] transition">
                  Resources &amp; Articles
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#7464AC] transition">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Policy Pages Col */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#1A143F]">
              Legal &amp; Policies
            </h4>
            <ul className="space-y-2.5 text-sm font-semibold">
              <li>
                <Link href="/terms" className="hover:text-[#7464AC] transition flex items-center gap-1.5">
                  <span>⚖️ Terms of Service</span>
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[#7464AC] transition flex items-center gap-1.5">
                  <span>🔒 Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-[#7464AC] transition flex items-center gap-1.5">
                  <span>⚠️ Medical &amp; General Disclaimer</span>
                </Link>
              </li>
              <li>
                <Link href="/refund" className="hover:text-[#7464AC] transition flex items-center gap-1.5">
                  <span>💳 Refund &amp; Cancellation Policy</span>
                </Link>
              </li>
            </ul>

            <div className="pt-3">
              <div className="p-3.5 rounded-2xl bg-[#FCF3E9] border border-[#E4DAD7] text-xs text-[#5C527A] leading-relaxed">
                <span className="font-bold text-[#1A143F]">🛡️ 30-Day Money-Back Guarantee:</span> 100% refund available on all paid plans within 30 days.
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM COPYRIGHT ROW */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#7E7096] gap-4">
          <div>© {new Date().getFullYear()} MoodFlip.coach 💜 All rights reserved.</div>
          <div className="text-center sm:text-right">Self-reflection utility · Not therapy or medical advice</div>
        </div>
      </div>
    </footer>
  );
}

