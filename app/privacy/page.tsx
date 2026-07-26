import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy | MoodFlip Self-Help Utility',
  description: 'Learn about what data MoodFlip stores, why it is stored, and our 90-day automatic profile deletion policy.',
};

export default function PrivacyPage() {
  return (
    <div className="site-shell">
      <Header />

      <main style={{ maxWidth: '860px', margin: '2.5rem auto', padding: '0 1rem' }}>
        <div style={{
          background: 'var(--card-bg)',
          border: '1px solid var(--card-border)',
          borderRadius: '28px',
          padding: '3rem 2.5rem',
          boxShadow: '0 20px 60px rgba(0,0,0,0.04)'
        }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#a855f7', background: 'var(--tile-selected-bg)', padding: '0.35rem 0.95rem', borderRadius: '9999px', textTransform: 'uppercase' }}>
            Data Privacy
          </span>

          <h1 style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontSize: 'clamp(2.2rem, 5vw, 3.2rem)',
            fontWeight: 700,
            color: 'var(--text-main)',
            margin: '0.8rem 0 0.5rem 0'
          }}>
            Privacy Policy
          </h1>
          <p style={{ color: 'var(--text-subtle)', fontSize: '0.88rem', marginBottom: '2rem' }}>
            Last updated: July 2026
          </p>

          <section style={{ marginBottom: '2rem', color: 'var(--text-main)', lineHeight: 1.7 }}>
            <h2 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: '1.4rem', fontWeight: 700, color: '#a855f7', marginBottom: '0.75rem' }}>
              1. Data Storage & Voluntary Profiles
            </h2>
            <p style={{ color: 'var(--text-subtle)', marginBottom: '1rem' }}>
              You can use the MoodFlip interactive tool completely anonymously without creating a profile. If you voluntarily create a profile to track check-ins or purchase personalized PDF downloads, we store strictly the following data fields:
            </p>

            <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', margin: '0.75rem 0', display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--text-main)', fontSize: '0.94rem' }}>
              <li><strong>Email address</strong> (for account identification and PDF email delivery)</li>
              <li><strong>Selected moods and check-in dates</strong> (to track your positive mindset history)</li>
              <li><strong>Actions shown</strong> (to prevent repeating the same 60-second micro-action)</li>
              <li><strong>Purchase status</strong> (active/inactive for 7-day or 30-day PDF plans)</li>
              <li><strong>Last active timestamp (last_active_at)</strong> (used for automatic data purging)</li>
              <li><strong>Check-in count</strong> (used to unlock milestones and personalized offers)</li>
            </ul>
          </section>

          {/* AUTOMATIC 90-DAY DELETION POLICY */}
          <div style={{
            background: 'var(--tile-selected-bg)',
            border: '1.5px solid var(--card-border)',
            borderRadius: '20px',
            padding: '1.75rem',
            marginBottom: '2rem'
          }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#a855f7', marginTop: 0, marginBottom: '0.5rem' }}>
              🧹 Automatic 90-Day Data Deletion Rule
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-subtle)', lineHeight: 1.65, margin: 0 }}>
              To protect your privacy and ensure we do not retain unneeded personal information, MoodFlip enforces an <strong>automatic 90-day hard-deletion policy</strong>. If your profile remains inactive (no logins or check-ins) for 90 consecutive days, your profile data, email address, and all associated check-in records are permanently hard-deleted from our database.
            </p>
          </div>

          <section style={{ color: 'var(--text-main)', lineHeight: 1.7 }}>
            <h2 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: '1.4rem', fontWeight: 700, color: '#a855f7', marginBottom: '0.75rem' }}>
              2. AdSense & Cookie Preferences
            </h2>
            <p style={{ color: 'var(--text-subtle)' }}>
              We use browser local storage to record your check-in counts and visit frequency on your device. In Phase 2, MoodFlip may display Google AdSense advertisements. Third-party ad networks may use cookies to serve relevant ads. You may manage cookie settings in your browser at any time.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
