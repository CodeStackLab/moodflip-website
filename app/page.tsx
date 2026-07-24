import React from 'react';
import MoodTool from '@/components/MoodTool';
import PaidPlansSection from '@/components/PaidPlansSection';

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

      {/* Paid Products Section (Registration & PayPal Checkout Required) */}
      <PaidPlansSection />

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
