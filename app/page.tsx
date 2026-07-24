import React from 'react';
import MoodTool from '@/components/MoodTool';

export default function HomePage() {
  return (
    <div>
      {/* MoodFlip Rainbow Gradient Title (exact screenshot style) */}
      <h1 className="site-title-hero">MoodFlip</h1>

      {/* Non-medical disclaimer */}
      <div style={{
        maxWidth: '600px',
        margin: '0 auto 2rem auto',
        background: 'rgba(239, 68, 68, 0.05)',
        border: '1px solid rgba(239, 68, 68, 0.15)',
        borderRadius: '12px',
        padding: '0.6rem 1.1rem',
        fontSize: '0.82rem',
        color: '#dc2626',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.4rem'
      }}>
        <span>ℹ️</span>
        <span><strong>Notice:</strong> MoodFlip is a self-reflection utility — not therapy, mental health treatment, or medical advice.</span>
      </div>

      {/* Main Interactive Mood Tool */}
      <MoodTool />

      {/* Paid Products Section */}
      <section id="paid-pdf-section" style={{
        background: '#ffffff',
        border: '1px solid rgba(124, 92, 191, 0.12)',
        borderRadius: '24px',
        padding: '2.5rem 1.75rem',
        margin: '3rem 0',
        boxShadow: '0 15px 40px rgba(124, 92, 191, 0.05)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span style={{ fontSize: '2rem' }}>📘</span>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#2d2638', marginTop: '0.25rem', fontFamily: "'Playfair Display', Georgia, serif" }}>
            Personalised MoodFlip Downloads
          </h2>
          <p style={{ color: '#6e6578', fontSize: '0.95rem', fontWeight: 500, marginTop: '0.35rem' }}>
            Get a tailored PDF plan based on your saved mood check-ins.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
          {/* 7-Day Plan */}
          <div style={{ background: '#fcfbfe', border: '2px solid #7c5cbf', borderRadius: '20px', padding: '1.75rem', position: 'relative', boxShadow: '0 8px 22px rgba(124, 92, 191, 0.08)' }}>
            <span style={{ position: 'absolute', top: '-12px', right: '18px', background: '#7c5cbf', color: 'white', fontSize: '0.68rem', fontWeight: 800, padding: '0.22rem 0.7rem', borderRadius: '9999px' }}>
              PHASE 1 (LAUNCH)
            </span>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#2d2638' }}>7-Day Personalised Mood Plan</h3>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#6346a7', margin: '0.4rem 0 0.75rem 0' }}>$7.00</div>
            <ul style={{ color: '#52485e', fontSize: '0.88rem', lineHeight: 1.8, marginBottom: '1.5rem', paddingLeft: '1.1rem' }}>
              <li>Custom 7-day emotional shift roadmap</li>
              <li>No repeated actions within the plan</li>
              <li>Instant delivery directly to your email</li>
              <li>Downloadable high-resolution PDF format</li>
            </ul>
            <a href="/api/pdf?type=7_DAY_PDF&email=demo@moodflip.coach" target="_blank" rel="noopener noreferrer"
              style={{ display: 'block', width: '100%', padding: '0.85rem', textAlign: 'center', background: 'linear-gradient(135deg, #7c5cbf, #6848ab)', color: 'white', fontWeight: 700, borderRadius: '12px', textDecoration: 'none', boxShadow: '0 6px 18px rgba(124, 92, 191, 0.25)' }}>
              Get 7-Day PDF Plan ($7)
            </a>
          </div>

          {/* 30-Day Plan */}
          <div style={{ background: '#f8fafc', border: '2px solid #10b981', borderRadius: '20px', padding: '1.75rem', position: 'relative' }}>
            <span style={{ position: 'absolute', top: '-12px', right: '18px', background: '#10b981', color: 'white', fontSize: '0.68rem', fontWeight: 800, padding: '0.22rem 0.7rem', borderRadius: '9999px' }}>
              PHASE 2 READY
            </span>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#2d2638' }}>30-Day Mood Master Plan</h3>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#059669', margin: '0.4rem 0 0.75rem 0' }}>$19.00</div>
            <ul style={{ color: '#52485e', fontSize: '0.88rem', lineHeight: 1.8, marginBottom: '1.5rem', paddingLeft: '1.1rem' }}>
              <li>Full 30-day structured habit tracker</li>
              <li>30+ actions per mood support</li>
              <li>Advanced emotional progress insights</li>
              <li>Instant email PDF delivery</li>
            </ul>
            <a href="/api/pdf?type=30_DAY_PDF&email=demo@moodflip.coach" target="_blank" rel="noopener noreferrer"
              style={{ display: 'block', width: '100%', padding: '0.85rem', textAlign: 'center', background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', fontWeight: 700, borderRadius: '12px', textDecoration: 'none', boxShadow: '0 6px 18px rgba(16, 185, 129, 0.22)' }}>
              Get 30-Day Master PDF ($19)
            </a>
          </div>
        </div>
      </section>

      {/* SEO Mood Directory */}
      <section style={{ margin: '3rem 0' }}>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '1.1rem', color: '#2d2638', fontFamily: "'Playfair Display', Georgia, serif" }}>
          Explore Popular Mood Guides
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: '0.75rem' }}>
          {[
            { title: 'Feeling Anxious at Night', slug: 'anxious-at-night' },
            { title: 'Overwhelmed by Work', slug: 'overwhelmed-work' },
            { title: 'Feeling Lonely & Isolated', slug: 'feeling-lonely' },
            { title: 'Frustrated & Angry', slug: 'frustrated-angry' },
            { title: 'Low Energy & Stuck', slug: 'low-energy-stuck' },
            { title: 'Scared of Uncertainty', slug: 'scared-uncertainty' },
          ].map((item) => (
            <a key={item.slug} href={`/mood/${item.slug}`}
              style={{ padding: '0.9rem 1rem', background: '#ffffff', border: '1px solid rgba(124, 92, 191, 0.1)', borderRadius: '12px', color: '#4a3a2c', fontSize: '0.88rem', textDecoration: 'none', fontWeight: 600, display: 'block', boxShadow: '0 3px 10px rgba(124, 92, 191, 0.03)' }}>
              ➡️ {item.title}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
