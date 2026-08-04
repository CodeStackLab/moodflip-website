import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import './globals.css';
import SiteLoader from '@/components/SiteLoader';
import PWAInstallPrompt from '@/components/PWAInstallPrompt';
import CookieConsent from '@/components/CookieConsent';
import AICoachWidget from '@/components/AICoachWidget';

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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;0,9..144,800;0,9..144,900;1,9..144,300;1,9..144,400;1,9..144,700&family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
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
        <AICoachWidget />
      </body>
    </html>
  );
}
