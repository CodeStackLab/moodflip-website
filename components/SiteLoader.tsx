'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function SiteLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const [loading, setLoading] = useState(true);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    setLoading(true);
    setFade(false);

    const timer1 = setTimeout(() => setFade(true), 500);
    const timer2 = setTimeout(() => setLoading(false), 850);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [pathname, searchParams]);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#FDF8F5]/90 backdrop-blur-md flex flex-col items-center justify-center p-4 transition-opacity duration-300 ${
        fade ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* ── CENTER CIRCULAR PREMIUM LOADER ── */}
      <div className="relative flex items-center justify-center mb-6">
        {/* Soft Ambient Radial Glow Behind Spinner */}
        <div className="absolute -inset-6 rounded-full bg-gradient-to-r from-[#7464AC]/20 via-[#EDAA7A]/25 to-[#E49C8C]/25 blur-2xl animate-pulse" />

        {/* Outer Rotating Dual-Tone Gradient Ring */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full p-[3px] bg-gradient-to-tr from-[#7464AC] via-[#EDAA7A] to-[#E49C8C] animate-spin shadow-lg shadow-[#7464AC]/20">
          <div className="w-full h-full rounded-full bg-[#FDF8F5]" />
        </div>

        {/* Inner Glowing Gradient Sphere with Floating Hearts (No Silver, Pure Warm Brand Tones) */}
        <div className="absolute w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#E49C8C] to-[#EDAA7A] flex items-center justify-center text-xl sm:text-2xl shadow-md shadow-[#EDAA7A]/30 animate-pulse">
          <span className="drop-shadow-sm select-none transform hover:scale-110 transition-transform">💕</span>
        </div>
      </div>

      {/* ── BRANDING & SUBTITLE ── */}
      <div className="text-center space-y-2.5 animate-in fade-in zoom-in duration-300">
        <img
          src="/moodflip-logo.png"
          alt="MoodFlip"
          className="h-8 sm:h-9 w-auto object-contain mx-auto mix-blend-multiply drop-shadow-xs"
        />
        <p className="text-xs sm:text-sm text-[#5C527A] font-semibold flex items-center justify-center gap-2 tracking-tight">
          <span>Preparing your mindset shift</span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#7464AC] animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-2 h-2 rounded-full bg-[#EDAA7A] animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-2 h-2 rounded-full bg-[#E49C8C] animate-bounce" style={{ animationDelay: '300ms' }} />
          </span>
        </p>
      </div>
    </div>
  );
}
