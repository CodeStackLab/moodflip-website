'use client';

import React from 'react';
import MoodTool from '@/components/MoodTool';
import SiteLoader from '@/components/SiteLoader';

// AdSense only shown when real publisher ID is configured
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
      <AdBanner slot="top-banner" />
      <MoodTool />
      <AdBanner slot="bottom-banner" />
    </>
  );
}
