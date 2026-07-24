import React from 'react';
import type { Metadata } from 'next';
import AdSpace from '@/components/AdSpace';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: 'MoodFlip | Self-Reflection Utility & Mindset Shift',
  description: 'Instant self-reflection tool. Flip negative moods into positive target states with practical 60-second actions. Not therapy, not medical advice.',
  keywords: ['mood flip', 'self help utility', 'mindset shift', '60 second actions', 'feelings wheel tool']
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem 1.5rem' }}>
          {/* Top AdSpace Slot */}
          <AdSpace position="top" />

          {/* Navigation Header */}
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 0', borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: '1rem' }}>
            <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'linear-gradient(135deg, #6366f1, #a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>
                💫
              </div>
              <div>
                <span style={{ fontSize: '1.4rem', fontWeight: 800, background: 'linear-gradient(135deg, #fff, #cbd5e1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  MoodFlip
                </span>
                <span style={{ fontSize: '0.75rem', display: 'block', color: '#94a3b8', marginTop: '-2px' }}>
                  moodflip.coach
                </span>
              </div>
            </a>

            <nav style={{ display: 'flex', gap: '1.5rem', fontSize: '0.9rem', fontWeight: 600 }}>
              <a href="/" style={{ color: '#f8fafc', textDecoration: 'none' }}>Home</a>
              <a href="/about" style={{ color: '#94a3b8', textDecoration: 'none' }}>About</a>
              <a href="/contact" style={{ color: '#94a3b8', textDecoration: 'none' }}>Contact</a>
              <a href="/privacy" style={{ color: '#94a3b8', textDecoration: 'none' }}>Privacy</a>
              <a href="/admin" style={{ color: '#c084fc', textDecoration: 'none' }}>Admin</a>
            </nav>
          </header>

          {/* Main Content */}
          <main>{children}</main>

          {/* Bottom AdSpace Slot */}
          <AdSpace position="bottom" />

          {/* Footer */}
          <footer style={{ borderTop: '1px solid rgba(255,255,255,0.08)', marginTop: '3rem', padding: '2rem 0', textAlign: 'center', color: '#64748b', fontSize: '0.85rem' }}>
            <p style={{ marginBottom: '0.5rem' }}>
              <strong>Important Disclaimer:</strong> MoodFlip is a self-reflection utility. It is not therapy, not mental health treatment, and not medical advice.
            </p>
            <p>© 2026 MoodFlip. All rights reserved.</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
