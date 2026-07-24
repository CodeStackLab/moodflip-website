import React from 'react';
import type { Metadata } from 'next';
import AdSpace from '@/components/AdSpace';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: 'MoodFlip | Self-Reflection Utility & Mindset Shift',
  description: 'Instant self-reflection tool. Flip negative moods into positive target states with practical 60-second actions. Not therapy, not medical advice.',
  keywords: ['mood flip', 'self help utility', 'mindset shift', '60 second actions', 'feelings wheel tool'],
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0.75rem 1rem' }}>
          {/* Top AdSpace Slot */}
          <AdSpace position="top" />

          {/* Dedicated Responsive Header */}
          <Header />

          {/* Main Content */}
          <main>{children}</main>

          {/* Bottom AdSpace Slot */}
          <AdSpace position="bottom" />

          {/* Dedicated Responsive Footer */}
          <Footer />
        </div>
      </body>
    </html>
  );
}
