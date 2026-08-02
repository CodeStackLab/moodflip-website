'use client';

import React from 'react';
import Header from '@/components/Header';
import MoodTool from '@/components/MoodTool';
import HomepageSections from '@/components/HomepageSections';
import Footer from '@/components/Footer';
import SiteLoader from '@/components/SiteLoader';

const ADSENSE_ENABLED = process.env.NEXT_PUBLIC_ADSENSE_ENABLED === 'true';
const ADSENSE_PUB_ID = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID || '';

function AdBanner({ slot }: { slot: string }) {
  if (!ADSENSE_ENABLED || !ADSENSE_PUB_ID) return null;
  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '0.75rem auto', maxWidth: '728px' }}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', height: '90px' }}
        data-ad-client={ADSENSE_PUB_ID}
        data-ad-slot={slot}
        data-ad-format="horizontal"
        data-full-width-responsive="true"
      />
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <SiteLoader />
      <Header />
      <AdBanner slot="top-banner" />

      {/* HERO SECTION matching moodflip-redesign.html */}
      <section className="hero">
        <div className="wrap hero-inner">
          <div className="hero-top">
            <span className="eyebrow">✦ 100% Free · Tap-Only · No Sign-Up</span>
            <h1>
              Don't fix the mood.<br />
              <em>Flip</em> it.
            </h1>
            <p className="lede">
              Tap what you're feeling right now. MoodFlip flips it to a steadier state and hands you one 60-second action — no typing, no account, no long questionnaire.
            </p>
            <div className="hero-actions">
              <button
                className="btn btn-primary"
                onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Start the flip ↓
              </button>
              <a href="/pricing" className="btn btn-ghost">
                See the $7 plan
              </a>
            </div>
          </div>

          {/* Interactive MoodTool Demo */}
          <MoodTool />
        </div>
      </section>

      {/* HOMEPAGE SECTIONS: How it works, Why cards, FAQ, Pricing, About */}
      <HomepageSections />
      <AdBanner slot="bottom-banner" />
      <Footer />
    </>
  );
}
