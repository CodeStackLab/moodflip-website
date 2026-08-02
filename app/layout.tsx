import React from 'react';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MoodFlip | Self-Reflection Utility',
  description: 'Tap-only, 60-second mindset shifts for everyday emotional clarity without therapy or questionnaires.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <style>{`
          body { top: 0px !important; }
          .goog-te-banner-frame, iframe.skiptranslate { display: none !important; visibility: hidden !important; opacity: 0 !important; }
          #goog-gt-tt, .goog-te-balloon-frame { display: none !important; }
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  );
}
