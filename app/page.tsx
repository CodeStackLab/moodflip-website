import React from 'react';
import MoodTool from '@/components/MoodTool';
import PaidPlansSection from '@/components/PaidPlansSection';
import AdSpace from '@/components/AdSpace';

export default function HomePage() {
  return (
    <div>
      {/* Top AdSense Container Space */}
      <AdSpace position="top" />

      {/* Non-medical self-reflection utility disclaimer notice */}
      <div className="medical-notice" style={{ marginTop: '0.2rem' }}>
        <span>🛡️ <strong>Notice:</strong> MoodFlip is a self-reflection utility — not therapy, mental health treatment, or medical advice.</span>
      </div>

      {/* Main Interactive Mood Tool */}
      <MoodTool />

      {/* Paid Products Section ($7 & $19 PDF Plans) */}
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
              <span>{item.title}</span>
              <span>&rarr;</span>
            </a>
          ))}
        </div>
      </section>

      {/* Bottom AdSense Container Space */}
      <AdSpace position="bottom" />
    </div>
  );
}
