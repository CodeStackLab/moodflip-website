import React from 'react';

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      marginTop: '3.5rem',
      padding: '2.5rem 1rem 1.5rem 1rem',
      background: 'rgba(10, 12, 24, 0.6)',
      color: '#94a3b8'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '2rem',
        marginBottom: '2rem'
      }}>
        {/* Column 1: Brand & Purpose */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '1.3rem' }}>💫</span>
            <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'white' }}>MoodFlip</span>
          </div>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.6 }}>
            A fast, tap-only self-reflection utility designed to gently flip negative moods into positive target states with practical 60-second actions.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'white', marginBottom: '0.85rem' }}>Quick Navigation</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li><a href="/" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Home / Tool</a></li>
            <li><a href="/about" style={{ color: '#cbd5e1', textDecoration: 'none' }}>About MoodFlip</a></li>
            <li><a href="/contact" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Contact & Support</a></li>
            <li><a href="/privacy" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Privacy Policy</a></li>
            <li><a href="/admin" style={{ color: '#c084fc', textDecoration: 'none' }}>Admin Dashboard</a></li>
          </ul>
        </div>

        {/* Column 3: Popular Guides */}
        <div>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'white', marginBottom: '0.85rem' }}>SEO Mood Guides</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li><a href="/mood/anxious-at-night" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Anxious at Night</a></li>
            <li><a href="/mood/overwhelmed-work" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Overwhelmed by Work</a></li>
            <li><a href="/mood/feeling-lonely" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Feeling Lonely</a></li>
            <li><a href="/mood/frustrated-angry" style={{ color: '#cbd5e1', textDecoration: 'none' }}>Frustrated & Angry</a></li>
          </ul>
        </div>
      </div>

      {/* Non-Medical Disclaimer Box */}
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto 1.5rem auto',
        background: 'rgba(239, 68, 68, 0.06)',
        border: '1px solid rgba(239, 68, 68, 0.18)',
        borderRadius: '12px',
        padding: '0.85rem 1.25rem',
        textAlign: 'center',
        fontSize: '0.8rem',
        color: '#fca5a5',
        lineHeight: 1.5
      }}>
        <strong>Important Disclaimer:</strong> MoodFlip is a self-reflection utility. It is not therapy, mental health treatment, or medical advice. In a crisis or emergency, please contact local emergency services immediately (e.g. Call or Text 988 in North America).
      </div>

      {/* Copyright Line */}
      <div style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1rem' }}>
        © 2026 MoodFlip (moodflip.coach). All rights reserved.
      </div>
    </footer>
  );
}
