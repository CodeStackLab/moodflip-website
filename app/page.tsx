import React from 'react';
import MoodTool from '@/components/MoodTool';

export default function HomePage() {
  return (
    <div>
      {/* MoodFlip Rainbow Gradient Title */}
      <h1 className="site-title-hero">MoodFlip</h1>

      {/* Non-medical disclaimer */}
      <div className="medical-notice">
        <span>ℹ️</span>
        <span><strong>Notice:</strong> MoodFlip is a self-reflection utility — not therapy, mental health treatment, or medical advice.</span>
      </div>

      {/* Main Interactive Mood Tool */}
      <MoodTool />

      {/* Paid Products Section */}
      <section id="paid-pdf-section" className="paid-pdf-section">
        <div className="paid-section-header">
          <span className="paid-header-icon">📘</span>
          <h2 className="paid-section-title">
            Personalised MoodFlip Downloads
          </h2>
          <p className="paid-section-subtitle">
            Get a tailored PDF plan based on your saved mood check-ins.
          </p>
        </div>

        <div className="paid-plans-grid">
          {/* 7-Day Plan */}
          <div className="paid-plan-card day-7-card">
            <span className="phase-badge phase-1">
              PHASE 1 (LAUNCH)
            </span>
            <h3 className="plan-card-title">7-Day Personalised Mood Plan</h3>
            <div className="plan-card-price purple-price">$7.00</div>
            <ul className="plan-card-features">
              <li>Custom 7-day emotional shift roadmap</li>
              <li>No repeated actions within the plan</li>
              <li>Instant delivery directly to your email</li>
              <li>Downloadable high-resolution PDF format</li>
            </ul>
            <a href="/api/pdf?type=7_DAY_PDF&email=demo@moodflip.coach" target="_blank" rel="noopener noreferrer"
              className="plan-card-btn purple-btn">
              Get 7-Day PDF Plan ($7)
            </a>
          </div>

          {/* 30-Day Plan */}
          <div className="paid-plan-card day-30-card">
            <span className="phase-badge phase-2">
              PHASE 2 READY
            </span>
            <h3 className="plan-card-title">30-Day Mood Master Plan</h3>
            <div className="plan-card-price green-price">$19.00</div>
            <ul className="plan-card-features">
              <li>Full 30-day structured habit tracker</li>
              <li>30+ actions per mood support</li>
              <li>Advanced emotional progress insights</li>
              <li>Instant email PDF delivery</li>
            </ul>
            <a href="/api/pdf?type=30_DAY_PDF&email=demo@moodflip.coach" target="_blank" rel="noopener noreferrer"
              className="plan-card-btn green-btn">
              Get 30-Day Master PDF ($19)
            </a>
          </div>
        </div>
      </section>

      {/* SEO Mood Directory */}
      <section className="seo-directory-section">
        <h2 className="seo-directory-title">
          Explore Popular Mood Guides
        </h2>
        <div className="seo-directory-grid">
          {[
            { title: 'Feeling Anxious at Night', slug: 'anxious-at-night' },
            { title: 'Overwhelmed by Work', slug: 'overwhelmed-work' },
            { title: 'Feeling Lonely & Isolated', slug: 'feeling-lonely' },
            { title: 'Frustrated & Angry', slug: 'frustrated-angry' },
            { title: 'Low Energy & Stuck', slug: 'low-energy-stuck' },
            { title: 'Scared of Uncertainty', slug: 'scared-uncertainty' },
          ].map((item) => (
            <a key={item.slug} href={`/mood/${item.slug}`} className="seo-directory-card">
              ➡️ {item.title}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
