import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SEO_PAGES } from '@/lib/seoData';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = SEO_PAGES[params.slug];
  if (!page) return { title: 'Mood Guide | MoodFlip' };
  return {
    title: `${page.title} | MoodFlip Self-Help Guide`,
    description: page.subtitle,
    keywords: ['mood flip', page.title.toLowerCase(), '60 second actions', 'self help utility', 'mindset shift']
  };
}

export default function SEOMoodPage({ params }: Props) {
  const page = SEO_PAGES[params.slug];
  if (!page) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: page.title,
    description: page.subtitle,
    author: {
      '@type': 'Organization',
      name: 'MoodFlip',
      url: 'https://moodflip.coach'
    },
    publisher: {
      '@type': 'Organization',
      name: 'MoodFlip'
    }
  };

  return (
    <div className="site-shell">
      <Header />

      <main style={{ maxWidth: '860px', margin: '2.5rem auto', padding: '0 1rem' }}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <article style={{
          background: 'var(--card-bg)',
          border: '1px solid var(--card-border)',
          borderRadius: '28px',
          padding: '3rem 2.5rem',
          boxShadow: '0 20px 60px rgba(0,0,0,0.04)'
        }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#a855f7', background: 'var(--tile-selected-bg)', padding: '0.35rem 0.95rem', borderRadius: '9999px', textTransform: 'uppercase' }}>
            MoodFlip Guide
          </span>

          <h1 style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontSize: 'clamp(2.2rem, 5vw, 3.2rem)',
            fontWeight: 700,
            color: 'var(--text-main)',
            margin: '0.8rem 0 0.4rem 0'
          }}>
            {page.title}
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#ec4899', fontWeight: 600, marginBottom: '1.75rem' }}>
            {page.subtitle}
          </p>

          <p style={{ fontSize: '1.02rem', color: 'var(--text-subtle)', lineHeight: 1.75, marginBottom: '2rem' }}>
            {page.content}
          </p>

          {/* 60-SECOND ACTION CALLOUT CARD */}
          <div style={{
            background: 'var(--tile-selected-bg)',
            border: '1.5px solid var(--card-border)',
            borderRadius: '20px',
            padding: '1.75rem',
            marginBottom: '2.5rem'
          }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#a855f7', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
              Recommended Target State:
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '1rem', fontFamily: "'Fraunces', Georgia, serif" }}>
              {page.targetState}
            </h2>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#10b981', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
              ⚡ 60-Second Micro-Action:
            </div>
            <p style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)', lineHeight: 1.55, margin: 0 }}>
              "{page.action}"
            </p>
          </div>

          {/* INTERACTIVE TOOL CTA */}
          <div style={{ textAlign: 'center', margin: '2.5rem 0', background: 'var(--tile-bg)', padding: '2rem', borderRadius: '24px', border: '1px solid var(--card-border)' }}>
            <h3 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
              Ready to Flip Your Mood Right Now?
            </h3>
            <p style={{ color: 'var(--text-subtle)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
              Use the interactive tap-only tool to choose any feeling and discover instant 60-second actions.
            </p>
            <a
              href="/"
              style={{
                display: 'inline-block',
                padding: '0.85rem 2.2rem',
                background: 'linear-gradient(135deg, #7c54d1, #ec4899)',
                color: 'white',
                fontWeight: 700,
                borderRadius: '9999px',
                textDecoration: 'none',
                fontSize: '0.95rem',
                boxShadow: '0 6px 20px rgba(124, 84, 209, 0.3)'
              }}
            >
              Open Interactive MoodFlip Tool
            </a>
          </div>

          {/* RELATED GUIDES INTERNAL LINKING */}
          <div style={{ borderTop: '1px solid var(--card-border)', paddingTop: '1.75rem', marginTop: '2.5rem' }}>
            <h4 style={{ fontSize: '0.88rem', fontWeight: 800, color: '#a855f7', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>
              Related Mood Guides:
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
              {page.relatedSlugs.map((slug) => {
                const rel = SEO_PAGES[slug];
                if (!rel) return null;
                return (
                  <a
                    key={slug}
                    href={`/mood/${slug}`}
                    style={{
                      display: 'block',
                      padding: '0.85rem 1rem',
                      background: 'var(--tile-bg)',
                      border: '1px solid var(--card-border)',
                      borderRadius: '12px',
                      color: 'var(--text-main)',
                      textDecoration: 'none',
                      fontWeight: 600,
                      fontSize: '0.86rem',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    📖 {rel.title}
                  </a>
                );
              })}
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
