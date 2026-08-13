'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check both localStorage and document.cookie
    const localConsent = localStorage.getItem('moodflip_cookie_consent');
    const hasCookie = document.cookie.split('; ').some((row) => row.startsWith('moodflip_cookie_consent='));

    if (!localConsent && !hasCookie) {
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const saveConsent = (value: string) => {
    // 1. Save to LocalStorage
    try {
      localStorage.setItem('moodflip_cookie_consent', value);
    } catch (e) {
      console.warn('LocalStorage unavailable:', e);
    }

    // 2. Set actual Browser Cookie (1 year expiration)
    const maxAge = 365 * 24 * 60 * 60; // 1 year in seconds
    document.cookie = `moodflip_cookie_consent=${value}; path=/; max-age=${maxAge}; SameSite=Lax`;

    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div
      className="fixed bottom-20 left-3 right-3 sm:left-6 sm:bottom-6 sm:right-auto sm:max-w-md bg-white/95 backdrop-blur-2xl border border-[#EAE3F2] rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-[0_10px_35px_rgba(0,0,0,0.18)] z-50 animate-in slide-in-from-bottom-4 duration-300 text-[#1A1338]"
      style={{ bottom: 'calc(76px + env(safe-area-inset-bottom, 0px))' }}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl sm:text-3xl shrink-0">🍪</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <h4 className="font-serif font-extrabold text-sm sm:text-base text-[#1A1338]">
              We Value Your Privacy &amp; Cookies
            </h4>
            <button
              onClick={() => saveConsent('essential_only')}
              className="sm:hidden text-gray-400 hover:text-gray-600 text-xs font-bold p-1"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
          <p className="text-[11px] sm:text-xs text-[#5B5278] font-medium leading-relaxed mb-3 sm:mb-4">
            MoodFlip uses essential cookies and analytics to enhance your self-reflection experience and show personalized wellness insights.{' '}
            <Link href="/privacy" className="text-[#7147E8] font-extrabold underline">
              Privacy Policy
            </Link>
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <button
              onClick={() => saveConsent('accepted')}
              className="w-full sm:flex-1 bg-gradient-to-r from-[#7147E8] to-[#9333EA] text-white py-2.5 px-4 rounded-xl text-xs font-extrabold shadow-md hover:scale-[1.01] transition cursor-pointer active:scale-95 text-center"
            >
              ✓ Accept All Cookies
            </button>
            <button
              onClick={() => saveConsent('essential_only')}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-[#EAE3F2] text-[#5B5278] hover:bg-[#FAF8FD] text-xs font-bold transition cursor-pointer text-center"
            >
              Essential Only
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
