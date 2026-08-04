import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import './globals.css';
import SiteLoader from '@/components/SiteLoader';
import PWAInstallPrompt from '@/components/PWAInstallPrompt';
import CookieConsent from '@/components/CookieConsent';

export const metadata: Metadata = {
  title: 'MoodFlip | Self-Reflection & Mindset Utility',
  description: 'Tap-only, 60-second mindset shifts for everyday emotional clarity without therapy or questionnaires.',
  manifest: '/manifest.json',
  themeColor: '#7147E8',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'MoodFlip',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <style>{`
          body { top: 0px !important; }
          .goog-te-banner-frame, iframe.skiptranslate { display: none !important; visibility: hidden !important; opacity: 0 !important; }
          #goog-gt-tt, .goog-te-balloon-frame { display: none !important; }
        `}</style>
      </head>
      <body>
        <Suspense fallback={null}>
          <SiteLoader />
        </Suspense>
        {children}
        <PWAInstallPrompt />
        <CookieConsent />
      </body>
    </html>
  );
}
