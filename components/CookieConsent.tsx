'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('moodflip_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('moodflip_cookie_consent', 'accepted');
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem('moodflip_cookie_consent', 'essential_only');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-md bg-white/95 backdrop-blur-xl border border-[#EAE3F2] rounded-3xl p-5 shadow-2xl z-50 animate-in slide-in-from-bottom-4 duration-300 text-[#1A1338]">
      <div className="flex items-start gap-3.5">
        <span className="text-3xl shrink-0">🍪</span>
        <div className="flex-1 min-w-0">
          <h4 className="font-serif font-extrabold text-base text-[#1A1338] mb-1">
            We Value Your Privacy &amp; Cookies
          </h4>
          <p className="text-xs text-[#5B5278] font-medium leading-relaxed mb-4">
            MoodFlip uses essential cookies and Google Analytics/AdSense to enhance your self-reflection experience and show personalized wellness insights.{' '}
            <Link href="/privacy" className="text-[#7147E8] font-extrabold underline">
              Privacy Policy
            </Link>
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleAccept}
              className="flex-1 min-w-[120px] bg-gradient-to-r from-[#7147E8] to-[#9333EA] text-white py-2.5 px-4 rounded-xl text-xs font-extrabold shadow-md hover:scale-[1.02] transition cursor-pointer"
            >
              ✓ Accept All Cookies
            </button>
            <button
              onClick={handleDecline}
              className="px-4 py-2.5 rounded-xl border border-[#EAE3F2] text-[#5B5278] hover:bg-[#FAF8FD] text-xs font-bold transition cursor-pointer"
            >
              Essential Only
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
