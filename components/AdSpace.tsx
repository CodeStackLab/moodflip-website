'use client';

import React from 'react';

interface AdSpaceProps {
  position: 'top' | 'bottom';
}

export default function AdSpace({ position }: AdSpaceProps) {
  const adClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  // Hide placeholder box completely until Google AdSense is approved and client ID is added
  if (!adClientId) {
    return null;
  }

  return (
    <div className="adsense-container" id={`adsense-slot-${position}`} style={{ margin: '1rem 0', textAlign: 'center' }}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={adClientId}
        data-ad-slot={position === 'top' ? '1234567890' : '0987654321'}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
