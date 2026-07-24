import React from 'react';
import MoodTool from '@/components/MoodTool';

export default function HomePage() {
  return (
    <div>
      {/* Hero Header Overview */}
      <div style={{ textAlign: 'center', margin: '1.5rem 0 2rem 0' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#efe8f8', border: '1px solid #d4c4ed', padding: '0.45rem 1.1rem', borderRadius: '9999px', fontSize: '0.82rem', color: '#6346a7', fontWeight: 700, marginBottom: '0.85rem' }}>
          <span>✨</span> Self-Reflection Utility & Mindset Shift
        </div>
        
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#2d2638', marginBottom: '0.5rem', letterSpacing: '-0.02em', fontFamily: "'Playfair Display', Georgia, serif" }}>
          Negative Mood ➔ Positive State ➔ 60-Second Action
        </h1>
        
        <p style={{ fontSize: '1.05rem', color: '#6e6578', maxWidth: '640px', margin: '0 auto', lineHeight: 1.6, fontWeight: 500 }}>
          No typing required. Select your current mood below for a quick, gentle emotional shift with an immediate practical action.
        </p>

        {/* Clear Core Disclaimer (Not Therapy / Not Medical Advice) */}
        <div style={{ margin: '1.25rem auto 0 auto', maxWidth: '680px', background: 'rgba(239, 68, 68, 0.06)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '14px', padding: '0.75rem 1.25rem', fontSize: '0.85rem', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          <span>ℹ️</span>
          <span><strong>Notice:</strong> MoodFlip is a self-reflection utility. It is not therapy, mental health treatment, or medical advice.</span>
        </div>
      </div>

      {/* Main Interactive Serene Mood Canvas */}
      <MoodTool />

      {/* Paid Products Section ($7 7-Day & $19 30-Day PDF Plans) */}
      <section id="paid-pdf-section" style={{ background: '#ffffff', border: '1px solid rgba(124, 92, 191, 0.15)', borderRadius: '28px', padding: '3rem 2rem', margin: '3.5rem 0', boxShadow: '0 20px 50px rgba(124, 92, 191, 0.05)' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span style={{ fontSize: '2.2rem' }}>📘</span>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#2d2638', marginTop: '0.25rem', fontFamily: "'Playfair Display', Georgia, serif" }}>
            Personalised MoodFlip Downloads
          </h2>
          <p style={{ color: '#6e6578', fontSize: '1rem', fontWeight: 500 }}>
            Get a tailored PDF plan based on your saved mood check-ins and history.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.75rem' }}>
          {/* 7-Day Plan */}
          <div style={{ background: '#fcfbfe', border: '2px solid #7c5cbf', borderRadius: '22px', padding: '2rem', position: 'relative', boxShadow: '0 10px 25px rgba(124, 92, 191, 0.08)' }}>
            <span style={{ position: 'absolute', top: '-14px', right: '20px', background: '#7c5cbf', color: 'white', fontSize: '0.72rem', fontWeight: 800, padding: '0.25rem 0.75rem', borderRadius: '9999px' }}>
              PHASE 1 (LAUNCH)
            </span>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#2d2638' }}>7-Day Personalised Mood Plan</h3>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#6346a7', margin: '0.5rem 0' }}>$7.00</div>
            <ul style={{ color: '#52485e', fontSize: '0.9rem', lineHeight: 1.8, marginBottom: '1.75rem', paddingLeft: '1.2rem' }}>
              <li>Custom 7-day emotional shift roadmap</li>
              <li>No repeated actions within the plan</li>
              <li>Instant delivery directly to your email</li>
              <li>Downloadable high-resolution PDF format</li>
            </ul>
            <a
              href="/api/pdf?type=7_DAY_PDF&email=demo@moodflip.coach"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                width: '100%',
                padding: '0.9rem',
                textAlign: 'center',
                background: 'linear-gradient(135deg, #7c5cbf, #6848ab)',
                color: 'white',
                fontWeight: 700,
                borderRadius: '14px',
                textDecoration: 'none',
                boxShadow: '0 8px 20px rgba(124, 92, 191, 0.25)'
              }}
            >
              Get 7-Day PDF Plan ($7)
            </a>
          </div>

          {/* 30-Day Plan */}
          <div style={{ background: '#f8fafc', border: '2px solid #10b981', borderRadius: '22px', padding: '2rem', position: 'relative' }}>
            <span style={{ position: 'absolute', top: '-14px', right: '20px', background: '#10b981', color: 'white', fontSize: '0.72rem', fontWeight: 800, padding: '0.25rem 0.75rem', borderRadius: '9999px' }}>
              PHASE 2 READY
            </span>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#2d2638' }}>30-Day Mood Master Plan</h3>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#059669', margin: '0.5rem 0' }}>$19.00</div>
            <ul style={{ color: '#52485e', fontSize: '0.9rem', lineHeight: 1.8, marginBottom: '1.75rem', paddingLeft: '1.2rem' }}>
              <li>Full 30-day structured habit tracker</li>
              <li>30+ actions per mood support</li>
              <li>Advanced emotional progress insights</li>
              <li>Instant email PDF delivery</li>
            </ul>
            <a
              href="/api/pdf?type=30_DAY_PDF&email=demo@moodflip.coach"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                width: '100%',
                padding: '0.9rem',
                textAlign: 'center',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                color: 'white',
                fontWeight: 700,
                borderRadius: '14px',
                textDecoration: 'none',
                boxShadow: '0 8px 20px rgba(16, 185, 129, 0.25)'
              }}
            >
              Get 30-Day Master PDF ($19)
            </a>
          </div>
        </div>
      </section>

      {/* SEO Mood Directory Section */}
      <section style={{ margin: '3.5rem 0' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1.25rem', color: '#2d2638', fontFamily: "'Playfair Display', Georgia, serif" }}>
          Explore Popular Mood Guides (SEO Directory)
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.85rem' }}>
          {[
            { title: 'Feeling Anxious at Night', slug: 'anxious-at-night' },
            { title: 'Overwhelmed by Work', slug: 'overwhelmed-work' },
            { title: 'Feeling Lonely & Isolated', slug: 'feeling-lonely' },
            { title: 'Frustrated & Angry', slug: 'frustrated-angry' },
            { title: 'Low Energy & Stuck', slug: 'low-energy-stuck' },
            { title: 'Scared of Uncertainty', slug: 'scared-uncertainty' },
          ].map((item) => (
            <a
              key={item.slug}
              href={`/mood/${item.slug}`}
              style={{
                padding: '1rem 1.1rem',
                background: '#ffffff',
                border: '1px solid rgba(124, 92, 191, 0.12)',
                borderRadius: '14px',
                color: '#4a3a2c',
                fontSize: '0.9rem',
                textDecoration: 'none',
                fontWeight: 600,
                display: 'block',
                boxShadow: '0 4px 12px rgba(124, 92, 191, 0.03)'
              }}
            >
              ➡️ {item.title}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
