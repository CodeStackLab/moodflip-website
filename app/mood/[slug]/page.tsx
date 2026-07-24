import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface Props {
  params: { slug: string };
}

const SEO_PAGES: Record<string, { title: string; subtitle: string; content: string; targetState: string; action: string }> = {
  'anxious-at-night': {
    title: 'How to Flip Feeling Anxious at Night',
    subtitle: 'Practical 60-second micro-step to calm night-time anxiety and racing thoughts.',
    content: 'Night-time anxiety often strikes when the body slows down but the mind continues racing. When lying in bed, your nervous system can mistake quiet stillness for uncertainty.',
    targetState: 'Calm & Peaceful Sleep 🌙',
    action: 'Place one hand on your chest and one on your belly. Breathe in for 4 seconds, hold for 7 seconds, and exhale slowly for 8 seconds.'
  },
  'overwhelmed-work': {
    title: 'Overcoming Workplace & Workload Overwhelm',
    subtitle: 'Clear mental clutter instantly with a single 60-second focus anchor.',
    content: 'Overwhelm happens when you view all tasks as equally urgent and massive. Shifting out of overwhelm requires micro-scaffolding.',
    targetState: 'Organized & Focused 🎯',
    action: 'Write down only the single next physical step you need to take. Hide all other to-do lists for the next 20 minutes.'
  },
  'feeling-lonely': {
    title: 'Navigating Feelings of Loneliness & Isolation',
    subtitle: 'Gentle self-compassion tools when feeling disconnected.',
    content: 'Loneliness is a universal human signal for connection. Acknowledge your feeling without self-judgment.',
    targetState: 'Connected & Supported 🤝',
    action: 'Send a quick 1-sentence message to someone you appreciate, or place a warm hand over your heart for 60 seconds.'
  },
  'frustrated-angry': {
    title: 'Releasing Frustration & Anger Safely',
    subtitle: 'Channel intense emotional energy into calm clarity.',
    content: 'Frustration is proof that something matters to you. When anger flares, physical tension needs a safe release valve.',
    targetState: 'Calm & In Control ⚓',
    action: 'Tense all your muscles tightly for 5 seconds, then release completely with a deep exhale.'
  },
  'low-energy-stuck': {
    title: 'Flipping Low Energy & Emotional Fatigue',
    subtitle: 'Recharge your mental battery with low-friction micro-movement.',
    content: 'When energy is depleted, pushing hard causes burnout. A gentle shift in physical state re-engages motivation.',
    targetState: 'Recharged & Vitalized ⚡',
    action: 'Drink a glass of cold water and step outside or open a window to take 5 deep breaths of fresh air.'
  },
  'scared-uncertainty': {
    title: 'Coping with Fear of the Unknown',
    subtitle: 'Ground yourself when facing uncertainty or major decisions.',
    content: 'Uncertainty triggers the brain\'s threat detection center. Grounding brings your awareness back to physical safety.',
    targetState: 'Brave & Grounded 🏰',
    action: 'Name 5 things you can see, 4 you can touch, 3 you hear, 2 you smell, and 1 you taste.'
  }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = SEO_PAGES[params.slug];
  if (!page) return { title: 'Mood Guide | MoodFlip' };
  return {
    title: `${page.title} | MoodFlip Guide`,
    description: page.subtitle,
  };
}

export default function SEOMoodPage({ params }: Props) {
  const page = SEO_PAGES[params.slug];
  if (!page) notFound();

  // Schema.org structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: page.title,
    description: page.subtitle,
    author: {
      '@type': 'Organization',
      name: 'MoodFlip'
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article style={{ background: 'rgba(18,24,44,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '2.5rem' }}>
        <h1 style={{ fontSize: '2.1rem', fontWeight: 800, color: 'white', marginBottom: '0.5rem' }}>
          {page.title}
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#a855f7', fontWeight: 600, marginBottom: '1.5rem' }}>
          {page.subtitle}
        </p>

        <p style={{ fontSize: '1rem', color: '#cbd5e1', lineHeight: 1.7, marginBottom: '2rem' }}>
          {page.content}
        </p>

        {/* Action Callout */}
        <div style={{ background: 'linear-gradient(135deg, #fffbe6, #fef3c7)', border: '2px solid #fde68a', borderRadius: '16px', padding: '1.75rem', color: '#78350f', marginBottom: '2rem' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.05em', color: '#b45309', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
            Recommended Positive Target State:
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#78350f', marginBottom: '1rem' }}>
            {page.targetState}
          </h2>
          <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#92400e', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
            ⚡ 60-Second Micro-Action:
          </div>
          <p style={{ fontSize: '1.05rem', fontWeight: 700, color: '#451a03', lineHeight: 1.5 }}>
            "{page.action}"
          </p>
        </div>

        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <a
            href="/"
            style={{
              display: 'inline-block',
              padding: '0.85rem 2rem',
              background: 'linear-gradient(135deg, #6366f1, #a855f7)',
              color: 'white',
              fontWeight: 700,
              borderRadius: '12px',
              textDecoration: 'none'
            }}
          >
            ✨ Try the Full MoodFlip Tool Now
          </a>
        </div>
      </article>
    </div>
  );
}
