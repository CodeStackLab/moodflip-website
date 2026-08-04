'use client';

import React, { useState, useEffect } from 'react';

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Register Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch((err) => {
        console.log('Service Worker registration failed:', err);
      });
    }

    // Check if already in standalone mode
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    // Show banner after 3 seconds if not installed
    const timer = setTimeout(() => {
      const dismissed = localStorage.getItem('moodflip_pwa_dismissed');
      if (!dismissed && !isInstalled) {
        setShowBanner(true);
      }
    }, 3000);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      clearTimeout(timer);
    };
  }, [isInstalled]);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
        setShowBanner(false);
      }
      setDeferredPrompt(null);
    } else {
      alert('📱 To install MoodFlip on Mobile or Desktop:\n\n• iOS (Safari): Tap Share icon → "Add to Home Screen"\n• Android (Chrome): Tap 3 Dots → "Install App"\n• Windows/Mac (Chrome/Edge): Click Install App in address bar 📲');
    }
  };

  const handleDismiss = () => {
    setShowBanner(false);
    localStorage.setItem('moodflip_pwa_dismissed', 'true');
  };

  if (!showBanner || isInstalled) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:w-96 bg-[#1A0A3B]/95 backdrop-blur-xl border border-white/20 text-white rounded-3xl p-4 shadow-2xl z-50 animate-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-start gap-3">
        <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#7147E8] to-[#c026d3] flex items-center justify-center text-xl shrink-0 shadow-md">
          📲
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h4 className="font-serif font-extrabold text-sm text-white">Install MoodFlip App</h4>
            <button onClick={handleDismiss} className="text-white/60 hover:text-white text-xs font-bold px-1.5 py-0.5 rounded">✕</button>
          </div>
          <p className="text-xs text-white/80 font-medium leading-tight mt-1 mb-3">
            Add MoodFlip to your Home Screen on Mobile & Desktop for instant 60-second mindset shifts!
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={handleInstallClick}
              className="flex-1 bg-gradient-to-r from-[#7147E8] to-[#9333EA] text-white py-2 px-3 rounded-xl text-xs font-extrabold shadow-md hover:scale-[1.02] transition cursor-pointer"
            >
              📲 Install Now
            </button>
            <button
              onClick={handleDismiss}
              className="px-3 py-2 text-xs font-semibold text-white/70 hover:text-white"
            >
              Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
