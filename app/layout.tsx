import React from 'react';
import type { Metadata, Viewport } from 'next';
import MaintenanceGuard from '@/components/MaintenanceGuard';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import '@/app/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://moodflip.coach'),
  title: 'MoodFlip | Self-Reflection Utility & Mindset Shift',
  description: 'Instant self-reflection tool. Flip negative moods into positive target states with practical 60-second actions. Not therapy, not medical advice.',
  keywords: ['mood flip', 'self help utility', 'mindset shift', '60 second actions', 'feelings wheel tool'],
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg'
  },
  manifest: '/manifest.json',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: 'https://moodflip.coach',
    siteName: 'MoodFlip',
    title: 'MoodFlip | Flip your mood in 60 seconds',
    description: 'A free, tap-only self-reflection utility with practical 60-second actions.',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <GoogleAnalytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'MoodFlip',
              url: 'https://moodflip.coach',
              applicationCategory: 'LifestyleApplication',
              operatingSystem: 'Any',
              offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
              description: 'A tap-only self-reflection utility offering practical 60-second mood-shift actions.',
            }),
          }}
        />
        <MaintenanceGuard>
          {children}
        </MaintenanceGuard>
      </body>
    </html>
  );
}
