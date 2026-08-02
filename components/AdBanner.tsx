'use client';

import React from 'react';

const ADSENSE_ENABLED = process.env.NEXT_PUBLIC_ADSENSE_ENABLED === 'true';
const ADSENSE_PUB_ID = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID || '';

export default function AdBanner({ slot }: { slot: string }) {
  if (ADSENSE_ENABLED && ADSENSE_PUB_ID) {
    return (
      <div className="mx-auto max-w-[1340px] my-5 px-4 text-center">
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '100%', height: '90px', borderRadius: '16px', overflow: 'hidden' }}
          data-ad-client={ADSENSE_PUB_ID}
          data-ad-slot={slot}
          data-ad-format="horizontal"
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1340px] my-5 px-4">
      <div className="flex items-center justify-center h-[76px] rounded-2xl border border-dashed border-[#DDD6FE] bg-[#F5F3FF] text-xs font-semibold text-[#6C5CE7]">
        <span className="mr-2 rounded border border-[#C7D2FE] bg-white px-2 py-0.5 text-[10px] uppercase tracking-wider font-bold">
          Ad
        </span>
        Google AdSense Banner (728x90)
      </div>
    </div>
  );
}
