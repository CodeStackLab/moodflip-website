import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Disclaimer | MoodFlip Self-Help Utility',
  description: 'MoodFlip is a self-reflection utility and mindset shift tool. It is explicitly not therapy, not medical advice, and not for crisis support.',
};

export default function DisclaimerPage() {
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
          <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)', padding: '0.35rem 0.95rem', borderRadius: '9999px', textTransform: 'uppercase' }}>
            ⚠️ Essential Safety Notice
          </span>

          <h1 style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontSize: 'clamp(2.2rem, 5vw, 3.2rem)',
            fontWeight: 700,
            color: 'var(--text-main)',
            margin: '0.8rem 0 1rem 0'
          }}>
            Important Disclaimer
          </h1>

          <div style={{ fontSize: '1.02rem', color: 'var(--text-main)', lineHeight: 1.7, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <p style={{ fontWeight: 700, color: '#ef4444' }}>
              MoodFlip is explicitly NOT therapy, NOT medical advice, and NOT for crisis support.
            </p>

            <p style={{ color: 'var(--text-subtle)' }}>
              MoodFlip is a lighthearted, tap-only self-reflection utility designed to provide immediate 60-second micro-actions and gentle mindset shifts for common daily mood fluctuations. The content, tools, and personalized PDFs offered on this website are intended solely for educational, motivational, and self-reflection purposes.
            </p>

            <div style={{ background: 'rgba(239, 68, 68, 0.08)', borderLeft: '4px solid #ef4444', padding: '1.25rem', borderRadius: '0 16px 16px 0', marginTop: '0.5rem' }}>
              <h3 style={{ color: '#ef4444', fontSize: '1.1rem', fontWeight: 800, marginTop: 0, marginBottom: '0.5rem' }}>
                In Need of Immediate Support?
              </h3>
              <p style={{ color: 'var(--text-main)', fontSize: '0.92rem', margin: 0, lineHeight: 1.6 }}>
                If you are experiencing a mental health emergency, severe emotional distress, or suicidal thoughts, please stop using this site immediately and seek help from qualified medical professionals or emergency crisis services.
              </p>
            </div>

            <h2 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: '1.4rem', fontWeight: 700, color: '#a855f7', marginTop: '1rem' }}>
              Crisis Hotline Resources:
            </h2>

            <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.65rem', color: 'var(--text-main)', fontSize: '0.94rem' }}>
              <li>
                <strong>National Suicide & Crisis Lifeline (US):</strong> Call or text <strong>988</strong> (Available 24/7, free & confidential)
              </li>
              <li>
                <strong>Crisis Text Line:</strong> Text <strong>HOME</strong> to <strong>741741</strong> to connect with a crisis counselor 24/7
              </li>
              <li>
                <strong>International Resources:</strong> Find your local emergency number or crisis support center at <a href="https://findahelpline.com" target="_blank" rel="noopener noreferrer" style={{ color: '#ec4899', textDecoration: 'underline' }}>findahelpline.com</a>
              </li>
            </ul>

            <h2 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: '1.4rem', fontWeight: 700, color: '#a855f7', marginTop: '1rem' }}>
              No Professional Relationship
            </h2>

            <p style={{ color: 'var(--text-subtle)' }}>
              Using MoodFlip does not create a therapist-client, doctor-patient, or healthcare professional relationship. The practical actions provided are general wellness suggestions and should not be used as a substitute for diagnosis, treatment, or professional advice from a licensed medical or mental health provider.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
