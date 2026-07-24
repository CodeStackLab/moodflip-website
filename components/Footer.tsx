import React from 'react';

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(139, 92, 246, 0.12)',
      marginTop: '3.5rem',
      padding: '3rem 1.25rem 2rem 1.25rem',
      background: '#ffffff',
      color: '#64748b',
      borderRadius: '24px 24px 0 0',
      boxShadow: '0 -10px 40px rgba(139, 92, 246, 0.03)'
    }}>
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '2.5rem',
        marginBottom: '2.25rem'
      }}>
        {/* Column 1 */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.85rem' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1rem',
              color: 'white'
            }}>
              💫
            </div>
            <span style={{ fontSize: '1.3rem', fontWeight: 800, color: '#1e1b4b', fontFamily: "'Playfair Display', Georgia, serif" }}>MoodFlip</span>
          </div>
          <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.65 }}>
            A fast, tap-only self-reflection utility designed to gently flip negative moods into positive target states with practical 60-second actions.
          </p>
        </div>

        {/* Column 2 */}
        <div>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#1e1b4b', marginBottom: '0.95rem' }}>Quick Navigation</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
            <li><a href="/" style={{ color: '#475569', textDecoration: 'none', fontWeight: 600 }}>Home / Tool</a></li>
            <li><a href="/about" style={{ color: '#475569', textDecoration: 'none', fontWeight: 600 }}>About MoodFlip</a></li>
            <li><a href="/contact" style={{ color: '#475569', textDecoration: 'none', fontWeight: 600 }}>Contact & Support</a></li>
            <li><a href="/privacy" style={{ color: '#475569', textDecoration: 'none', fontWeight: 600 }}>Privacy Policy</a></li>
            <li><a href="/admin" style={{ color: '#6d28d9', textDecoration: 'none', fontWeight: 800 }}>Admin Dashboard</a></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#1e1b4b', marginBottom: '0.95rem' }}>SEO Mood Guides</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
            <li><a href="/mood/anxious-at-night" style={{ color: '#475569', textDecoration: 'none', fontWeight: 600 }}>Anxious at Night</a></li>
            <li><a href="/mood/overwhelmed-work" style={{ color: '#475569', textDecoration: 'none', fontWeight: 600 }}>Overwhelmed by Work</a></li>
            <li><a href="/mood/feeling-lonely" style={{ color: '#475569', textDecoration: 'none', fontWeight: 600 }}>Feeling Lonely</a></li>
            <li><a href="/mood/frustrated-angry" style={{ color: '#475569', textDecoration: 'none', fontWeight: 600 }}>Frustrated & Angry</a></li>
          </ul>
        </div>
      </div>

      {/* Non-Medical Disclaimer Box */}
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto 1.5rem auto',
        background: 'rgba(254, 242, 242, 0.7)',
        border: '1px solid rgba(252, 165, 165, 0.3)',
        borderRadius: '14px',
        padding: '0.75rem 1.25rem',
        color: '#991b1b',
        fontSize: '0.78rem',
        lineHeight: 1.5,
        textAlign: 'center'
      }}>
        <strong>Important Disclaimer:</strong> MoodFlip is a self-reflection utility. It is not therapy, mental health treatment, or medical advice. In a crisis or emergency, please contact local emergency services immediately (e.g. Call or Text 988 in North America).
      </div>

      {/* Bottom Copyright */}
      <div style={{ textAlign: 'center', fontSize: '0.78rem', color: '#94a3b8', borderTop: '1px solid #f1f5f9', paddingTop: '1.25rem' }}>
        © 2026 MoodFlip (moodflip.coach). All rights reserved.
      </div>
    </footer>
  );
}
