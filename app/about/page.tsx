import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'About MoodFlip | Mindset Shift Tool',
  description: 'Learn about MoodFlip, a fast tap-only self-reflection tool designed to gently flip negative moods into positive target states with practical 60-second actions.'
};

export default function AboutPage() {
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
            About The Tool
          </span>

          <h1 style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontSize: 'clamp(2.2rem, 5vw, 3.2rem)',
            fontWeight: 700,
            color: 'var(--text-main)',
            margin: '0.8rem 0 1rem 0'
          }}>
            About MoodFlip
          </h1>

          <p style={{ fontSize: '1.05rem', color: 'var(--text-subtle)', lineHeight: 1.7, marginBottom: '2rem' }}>
            MoodFlip is a simple, intuitive self-reflection utility designed to help individuals move out of stuck emotional states through immediate, actionable 60-second steps.
          </p>

          {/* Important Non-Medical & Crisis Notice Box */}
          <div style={{
            background: 'rgba(239, 68, 68, 0.08)',
            border: '1.5px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '20px',
            padding: '1.5rem',
            marginBottom: '2.5rem'
          }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ef4444', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>🚨</span> Important Notice: Not Therapy, Medical Advice, or Crisis Support
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: 1.6, marginBottom: '0.75rem' }}>
              MoodFlip is strictly a self-reflection tool. It is <strong>not therapy</strong>, <strong>not mental health treatment</strong>, and <strong>not medical advice</strong>.
            </p>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-subtle)', lineHeight: 1.6, margin: 0 }}>
              If you are experiencing a mental health emergency, crisis, or thoughts of self-harm, please reach out immediately to a licensed healthcare professional or call your local emergency crisis hotline (e.g. Call or Text <strong>988</strong> in North America or contact your local emergency services).
            </p>
          </div>

          <h2 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '1rem' }}>
            How MoodFlip Works
          </h2>
          <p style={{ color: 'var(--text-subtle)', lineHeight: 1.7, marginBottom: '1.25rem' }}>
            Instead of asking you to type long free-form text or read overwhelming articles, MoodFlip utilizes visual, clickable choices based on the classic Feelings Wheel framework:
          </p>
          <ol style={{ color: 'var(--text-main)', paddingLeft: '1.25rem', lineHeight: 1.9, fontSize: '0.95rem' }}>
            <li>Choose your broad primary feeling family (Sad, Fearful, Angry, Disgusted, Stressed).</li>
            <li>Pinpoint the specific underlying emotion from visual sub-tiles.</li>
            <li>Click <strong>Change My Mood</strong> to receive a positive target state and a practical 60-second micro-action.</li>
          </ol>
        </div>
      </main>

      <Footer />
    </div>
  );
}
