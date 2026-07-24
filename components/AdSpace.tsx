'use client';

import React from 'react';

interface AdSpaceProps {
  position: 'top' | 'bottom';
}

export default function AdSpace({ position }: AdSpaceProps) {
  return (
    <div className="adsense-container" id={`adsense-slot-${position}`}>
      <span>ADVERTISEMENT SPACE ({position.toUpperCase()}) - ADSENSE READY</span>
    </div>
  );
}
