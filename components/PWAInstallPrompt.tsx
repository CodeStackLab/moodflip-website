'use client';

import React, { useState, useEffect } from 'react';

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSModal, setShowIOSModal] = useState(false);

  useEffect(() => {
    // 1. Register Service Worker
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => {
          // Service worker registered successfully
        })
        .catch(() => {});
    }

    // 2. Check if already running in PWA / Standalone mode
    const isStandalone =
      (typeof window !== 'undefined' && window.matchMedia('(display-mode: standalone)').matches) ||
      (typeof window !== 'undefined' && (window.navigator as any).standalone === true);

    if (isStandalone) {
      setIsInstalled(true);
      return;
    }

    // 3. Detect iOS device
    const userAgent = typeof window !== 'undefined' ? window.navigator.userAgent : '';
    const iosDevice = /iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream;
    setIsIOS(iosDevice);

    // 4. Android / Desktop PWA install prompt handler
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      const dismissed = localStorage.getItem('moodflip_pwa_dismissed');
      if (!dismissed) {
        setShowBanner(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    // 5. Automatic banner display for iOS or browsers
    const timer = setTimeout(() => {
      const dismissed = localStorage.getItem('moodflip_pwa_dismissed');
      if (!dismissed && !isInstalled) {
        setShowBanner(true);
      }
    }, 2000);

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
    } else if (isIOS) {
      setShowIOSModal(true);
    } else {
      // Fallback instruction for browsers without direct prompt trigger
      alert('To install MoodFlip on your device:\n\n• On Mobile: Open browser menu (⋮ or ⎋) and tap "Add to Home Screen" or "Install App".\n• On Desktop: Click the install icon in your address bar.');
    }
  };

  const handleDismiss = () => {
    setShowBanner(false);
    localStorage.setItem('moodflip_pwa_dismissed', 'true');
  };

  if (isInstalled) return null;

  return (
    <>
      {/* Floating PWA Install Banner */}
      {showBanner && (
        <div className="fixed bottom-20 left-4 right-4 sm:left-auto sm:right-6 sm:w-96 bg-[#170E3B]/95 backdrop-blur-2xl border border-white/20 text-white rounded-3xl p-4 shadow-[0_12px_40px_rgba(0,0,0,0.4)] z-40 animate-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#7147E8] to-[#f59e0b] flex items-center justify-center text-2xl shrink-0 shadow-lg border border-white/20">
              📱
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="font-serif font-extrabold text-sm text-white">Install MoodFlip App</h4>
                <button
                  onClick={handleDismiss}
                  className="text-white/60 hover:text-white text-xs font-bold px-1.5 py-0.5 rounded"
                >
                  ✕
                </button>
              </div>
              <p className="text-[12px] text-white/85 font-medium leading-tight mt-1 mb-3">
                Add MoodFlip to your Mobile Home Screen for instant 60-second mindset reset anywhere!
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleInstallClick}
                  className="flex-1 bg-gradient-to-r from-[#7147E8] to-[#9333EA] text-white py-2.5 px-3 rounded-xl text-xs font-black shadow-md hover:scale-[1.02] transition cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>📲</span>
                  <span>Add to Home Screen</span>
                </button>
                <button
                  onClick={handleDismiss}
                  className="px-3 py-2 text-xs font-bold text-white/70 hover:text-white"
                >
                  Later
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* iOS Installation Helper Modal */}
      {showIOSModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-4">
          <div className="bg-[#170E3B] border border-white/20 text-white rounded-3xl p-6 max-w-sm w-full space-y-4 text-center animate-in slide-in-from-bottom-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#7147E8] to-[#f59e0b] flex items-center justify-center text-3xl mx-auto shadow-lg">
              📱
            </div>
            <h3 className="font-serif text-lg font-black text-white">Install on iPhone / iPad</h3>
            
            <div className="space-y-3 text-left bg-white/5 p-4 rounded-2xl border border-white/10 text-xs font-medium text-white/90">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-[#7147E8] font-bold text-xs flex items-center justify-center shrink-0">1</span>
                <span>Tap the <strong className="text-[#F59E0B]">Share button ( ⎋ )</strong> at the bottom of Safari.</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-[#7147E8] font-bold text-xs flex items-center justify-center shrink-0">2</span>
                <span>Scroll down and select <strong className="text-[#F59E0B]">"Add to Home Screen ➕"</strong>.</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-[#7147E8] font-bold text-xs flex items-center justify-center shrink-0">3</span>
                <span>Tap <strong className="text-[#F59E0B]">"Add"</strong> in the top right corner.</span>
              </div>
            </div>

            <button
              onClick={() => setShowIOSModal(false)}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#7147E8] to-[#9333EA] text-white font-extrabold text-xs shadow-lg cursor-pointer"
            >
              Got It!
            </button>
          </div>
        </div>
      )}
    </>
  );
}
