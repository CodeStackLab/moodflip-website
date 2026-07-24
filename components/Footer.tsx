import React from 'react';

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(124, 92, 191, 0.12)',
      marginTop: '3.5rem',
      padding: '2.5rem 1rem 1.5rem 1rem',
      background: '#ffffff',
      color: '#6e6578',
      borderRadius: '24px 24px 0 0'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '2rem',
        marginBottom: '2rem'
      }}>
        {/* Column 1 */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '1.4rem' }}>💫</span>
            <span style={{ fontSize: '1.3rem', fontWeight: 800, color: '#2d2638', fontFamily: "'Playfair Display', Georgia, serif" }}>MoodFlip</span>
          </div>
          <p style={{ fontSize: '0.88rem', color: '#6e6578', lineHeight: 1.6 }}>
            A fast, tap-only self-reflection utility designed to gently flip negative moods into positive target states with practical 60-second actions.
          </p>
        </div>

        {/* Column 2 */}
        <div>
          <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#2d2638', marginBottom: '0.85rem' }}>Quick Navigation</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.88rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li><a href="/" style={{ color: '#4a3a2c', textDecoration: 'none' }}>Home / Tool</a></li>
            <li><a href="/about" style={{ color: '#4a3a2c', textDecoration: 'none' }}>About MoodFlip</a></li>
            <li><a href="/contact" style={{ color: '#4a3a2c', textDecoration: 'none' }}>Contact & Support</a></li>
            <li><a href="/privacy" style={{ color: '#4a3a2c', textDecoration: 'none' }}>Privacy Policy</a></li>
            <li><a href="/admin" style={{ color: '#7c5cbf', textDecoration: 'none', fontWeight: 700 }}>Admin Dashboard</a></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#2d2638', marginBottom: '0.85rem' }}>SEO Mood Guides</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.88rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li><a href="/mood/anxious-at-night" style={{ color: '#4a3a2c', textDecoration: 'none' }}>Anxious at Night</a></li>
            <li><a href="/mood/overwhelmed-work" style={{ color: '#4a3a2c', textDecoration: 'none' }}>Overwhelmed by Work</a></li>
            <li><a href="/mood/feeling-lonely" style={{ color: '#4a3a2c', textDecoration: 'none' }}>Feeling Lonely</a></li>
            <li><a href="/mood/frustrated-angry" style={{ color: '#4a3a2c', textDecoration: 'none' }}>Frustrated & Angry</a></li>
          </ul>
        </div>
      </div>

      {/* Non-Medical Disclaimer Box */}
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto 1.5rem auto',
        background: 'rgba(239, 68, 68, 0.05)',
        border: '1px solid rgba(239, 68, 68, 0.18)',
        borderRadius: '14px',
        padding: '0.85rem 1.25rem',
        textAlign: 'center',
        fontSize: '0.82rem',
        color: '#dc2626',
        lineHeight: 1.5
      }}>
        <strong>Important Disclaimer:</strong> MoodFlip is a self-reflection utility. It is not therapy, mental health treatment, or medical advice. In a crisis or emergency, please contact local emergency services immediately (e.g. Call or Text 988 in North America).
      </div>

      {/* Copyright Line */}
      <div style={{ textAlign: 'center', fontSize: '0.82rem', color: '#9b89b3', borderTop: '1px solid rgba(124, 92, 191, 0.08)', paddingTop: '1rem' }}>
        © 2026 MoodFlip (moodflip.coach). All rights reserved.
      </div>
    </footer>
  );
}
