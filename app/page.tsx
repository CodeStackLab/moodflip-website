import React from 'react';
import MoodTool from '@/components/MoodTool';

export default function HomePage() {
  return (
    <div>
      {/* Hero Header Overview */}
      <div style={{ textAlign: 'center', margin: '1.25rem 0 1.5rem 0' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(99, 102, 241, 0.12)', border: '1px solid rgba(99, 102, 241, 0.25)', padding: '0.4rem 1rem', borderRadius: '9999px', fontSize: '0.8rem', color: '#818cf8', fontWeight: 600, marginBottom: '0.75rem' }}>
          <span>✨</span> Self-Reflection Utility & Mindset Shift
        </div>
        
        <h1 style={{ fontSize: '2.3rem', fontWeight: 800, background: 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '0.4rem', letterSpacing: '-0.02em' }}>
          Negative Mood ➔ Positive State ➔ 60-Second Action
        </h1>
        
        <p style={{ fontSize: '1rem', color: '#94a3b8', maxWidth: '640px', margin: '0 auto', lineHeight: 1.6 }}>
          No typing required. Select your current mood below for a quick, gentle emotional shift with an immediate practical action.
        </p>

        {/* Clear Core Disclaimer (Not Therapy / Not Medical Advice) */}
        <div style={{ margin: '1.25rem auto 0 auto', maxWidth: '680px', background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '12px', padding: '0.65rem 1rem', fontSize: '0.82rem', color: '#fca5a5', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          <span>ℹ️</span>
          <span><strong>Notice:</strong> MoodFlip is a self-reflection utility. It is not therapy, mental health treatment, or medical advice.</span>
        </div>
      </div>

      {/* Main Interactive 3-Tier Mood Selector Tool */}
      <MoodTool />

      {/* Paid Products Section ($7 7-Day & $19 30-Day PDF Plans) */}
      <section id="paid-pdf-section" style={{ background: 'rgba(18, 24, 44, 0.75)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '2.5rem 2rem', margin: '3rem 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span style={{ fontSize: '2rem' }}>📘</span>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'white', marginTop: '0.25rem' }}>
            Personalised MoodFlip Downloads
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
            Get a tailored PDF plan based on your saved mood check-ins and history.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {/* 7-Day Plan */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid #8b5cf6', borderRadius: '16px', padding: '1.75rem', position: 'relative' }}>
            <span style={{ position: 'absolute', top: '-12px', right: '16px', background: '#8b5cf6', color: 'white', fontSize: '0.7rem', fontWeight: 800, padding: '0.2rem 0.6rem', borderRadius: '9999px' }}>
              PHASE 1 (LAUNCH)
            </span>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'white' }}>7-Day Personalised Mood Plan</h3>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#c084fc', margin: '0.5rem 0' }}>$7.00</div>
            <ul style={{ color: '#cbd5e1', fontSize: '0.88rem', lineHeight: 1.8, marginBottom: '1.5rem', paddingLeft: '1.2rem' }}>
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
                padding: '0.85rem',
                textAlign: 'center',
                background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                color: 'white',
                fontWeight: 700,
                borderRadius: '12px',
                textDecoration: 'none'
              }}
            >
              Get 7-Day PDF Plan ($7)
            </a>
          </div>

          {/* 30-Day Plan */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid #10b981', borderRadius: '16px', padding: '1.75rem', position: 'relative' }}>
            <span style={{ position: 'absolute', top: '-12px', right: '16px', background: '#10b981', color: 'white', fontSize: '0.7rem', fontWeight: 800, padding: '0.2rem 0.6rem', borderRadius: '9999px' }}>
              PHASE 2 READY
            </span>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'white' }}>30-Day Mood Master Plan</h3>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#34d399', margin: '0.5rem 0' }}>$19.00</div>
            <ul style={{ color: '#cbd5e1', fontSize: '0.88rem', lineHeight: 1.8, marginBottom: '1.5rem', paddingLeft: '1.2rem' }}>
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
                padding: '0.85rem',
                textAlign: 'center',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                color: 'white',
                fontWeight: 700,
                borderRadius: '12px',
                textDecoration: 'none'
              }}
            >
              Get 30-Day Master PDF ($19)
            </a>
          </div>
        </div>
      </section>

      {/* SEO Mood Directory Section */}
      <section style={{ margin: '3rem 0' }}>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '1rem', color: '#e2e8f0' }}>
          Explore Popular Mood Guides (SEO Directory)
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.75rem' }}>
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
                padding: '0.85rem 1rem',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '12px',
                color: '#cbd5e1',
                fontSize: '0.88rem',
                textDecoration: 'none',
                fontWeight: 500,
                display: 'block'
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
