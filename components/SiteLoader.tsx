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
      className={`fixed inset-0 z-[9999] bg-[#FAF8FD]/95 backdrop-blur-md flex flex-col items-center justify-center p-4 transition-opacity duration-300 ${
        fade ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* ── CENTER CIRCULAR GRADIENT LOADER ── */}
      <div className="relative flex items-center justify-center mb-5">
        {/* Outer Rotating Gradient Ring */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-purple-100 border-t-[#7147E8] border-r-[#EC4899] animate-spin shadow-lg shadow-[#7147E8]/20" />
        
        {/* Inner Glowing Pulse Circle */}
        <div className="absolute w-13 h-13 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-[#7147E8] to-[#9333EA] text-white font-extrabold flex items-center justify-center text-xl sm:text-2xl shadow-md animate-pulse">
          💕
        </div>
      </div>

      {/* ── BRANDING & SUBTITLE ── */}
      <div className="text-center space-y-1.5 animate-in fade-in zoom-in duration-300">
        <h3 className="font-serif text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-[#7147E8] via-[#8356F8] to-[#9333EA] bg-clip-text text-transparent tracking-tight">
          MoodFlip
        </h3>
        <p className="text-xs sm:text-sm text-[#68607F] font-semibold flex items-center justify-center gap-1.5">
          <span>Preparing your mindset shift</span>
          <span className="inline-flex gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7147E8] animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-1.5 h-1.5 rounded-full bg-[#8356F8] animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-1.5 h-1.5 rounded-full bg-[#EC4899] animate-bounce" style={{ animationDelay: '300ms' }} />
          </span>
        </p>
      </div>
    </div>
  );
}
