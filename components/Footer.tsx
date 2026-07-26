import React from 'react';

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(124, 84, 209, 0.12)',
      marginTop: '4rem',
      padding: '3.5rem 1.5rem 2rem 1.5rem',
      background: 'linear-gradient(180deg, #ffffff 0%, #faf5f8 100%)',
      color: '#554c68',
      borderRadius: '28px 28px 0 0',
      boxShadow: '0 -10px 40px rgba(124, 84, 209, 0.03)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '2.5rem',
        marginBottom: '2.5rem'
      }}>
        {/* Column 1: Brand Info */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
            <div style={{
              width: '34px',
              height: '34px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #7c54d1 0%, #e77c74 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.05rem',
              color: 'white',
              boxShadow: '0 4px 12px rgba(124, 84, 209, 0.25)'
            }}>
              💫
            </div>
            <span style={{ fontSize: '1.4rem', fontWeight: 700, color: '#362854', fontFamily: "'Fraunces', Georgia, serif" }}>MoodFlip</span>
          </div>
          <p style={{ fontSize: '0.88rem', color: '#665c7d', lineHeight: 1.65, margin: 0 }}>
            A fast, tap-only self-reflection utility designed to gently flip negative moods into positive target states with practical 60-second actions.
          </p>
        </div>

        {/* Column 2: Navigation */}
        <div>
          <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#362854', marginBottom: '1rem', letterSpacing: '0.02em' }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.86rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <li><a href="/" style={{ color: '#554c68', textDecoration: 'none', fontWeight: 500 }}>Home / Tool</a></li>
            <li><a href="/about" style={{ color: '#554c68', textDecoration: 'none', fontWeight: 500 }}>About MoodFlip</a></li>
            <li><a href="/contact" style={{ color: '#554c68', textDecoration: 'none', fontWeight: 500 }}>Contact & Support</a></li>
            <li><a href="/privacy" style={{ color: '#554c68', textDecoration: 'none', fontWeight: 500 }}>Privacy Policy</a></li>
            <li><a href="/disclaimer" style={{ color: '#554c68', textDecoration: 'none', fontWeight: 500 }}>Disclaimer</a></li>
          </ul>
        </div>

        {/* Column 3: Popular Guides */}
        <div>
          <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#362854', marginBottom: '1rem', letterSpacing: '0.02em' }}>SEO Mood Guides</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.86rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <li><a href="/mood/anxious-at-night" style={{ color: '#554c68', textDecoration: 'none', fontWeight: 500 }}>Anxious at Night</a></li>
            <li><a href="/mood/overwhelmed-work" style={{ color: '#554c68', textDecoration: 'none', fontWeight: 500 }}>Overwhelmed by Work</a></li>
            <li><a href="/mood/feeling-lonely" style={{ color: '#554c68', textDecoration: 'none', fontWeight: 500 }}>Feeling Lonely</a></li>
            <li><a href="/mood/frustrated-angry" style={{ color: '#554c68', textDecoration: 'none', fontWeight: 500 }}>Frustrated & Angry</a></li>
          </ul>
        </div>
      </div>

      {/* Copyright & Disclaimer Line */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        paddingTop: '1.5rem',
        borderTop: '1px solid rgba(124, 84, 209, 0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        fontSize: '0.8rem',
        color: '#8271a6'
      }}>
        <div>
          &copy; 2026 MoodFlip. All rights reserved.
        </div>
        <div>
          Self-help utility &bull; <a href="/disclaimer" style={{ color: '#8271a6', textDecoration: 'underline' }}>Not therapy or medical advice</a>
        </div>
      </div>
    </footer>
  );
}
