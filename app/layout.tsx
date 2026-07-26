import React from 'react';
import type { Metadata, Viewport } from 'next';
import MaintenanceGuard from '@/components/MaintenanceGuard';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: 'MoodFlip | Self-Reflection Utility & Mindset Shift',
  description: 'Instant self-reflection tool. Flip negative moods into positive target states with practical 60-second actions. Not therapy, not medical advice.',
  keywords: ['mood flip', 'self help utility', 'mindset shift', '60 second actions', 'feelings wheel tool'],
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg'
  }
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
        <MaintenanceGuard>
          {children}
        </MaintenanceGuard>
      </body>
    </html>
  );
}
