'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

interface AdBannerProps {
  placement: 'headerBanner' | 'sidebarAd' | 'moodLibraryAd' | 'footerBanner' | 'planPageAd' | 'checkinModalAd' | 'stickyMobileAd';
  className?: string;
}

// Pages where ads are NEVER shown — even if accidentally placed there
const AD_BLOCKED_ROUTES = ['/profile', '/admin', '/login', '/register', '/forgot-password'];

export default function AdBanner({ placement, className = '' }: AdBannerProps) {
  const pathname = usePathname();
  const [adsSettings, setAdsSettings] = useState<{
    globalEnabled: boolean;
    mode: 'auto' | 'manual';
    adSenseClient: string;
    slots: Record<string, { enabled: boolean; slotId: string; code: string }>;
  } | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('moodflip_ads_settings');
      if (saved) {
        try {
          setAdsSettings(JSON.parse(saved));
        } catch (e) {}
      } else {
        setAdsSettings({
          globalEnabled: false,
          mode: 'manual',
          adSenseClient: '',
          slots: {
            headerBanner: { enabled: false, slotId: '', code: '' },
            sidebarAd: { enabled: false, slotId: '', code: '' },
            moodLibraryAd: { enabled: false, slotId: '', code: '' },
            footerBanner: { enabled: false, slotId: '', code: '' },
            planPageAd: { enabled: false, slotId: '', code: '' },
            checkinModalAd: { enabled: false, slotId: '', code: '' },
            stickyMobileAd: { enabled: false, slotId: '', code: '' }
          }
        });
      }
    }
  }, []);

  // ✅ Route Guard: block ads on dashboard and admin pages
  const isBlockedRoute = AD_BLOCKED_ROUTES.some(route => pathname?.startsWith(route));
  if (isBlockedRoute) return null;

  if (!adsSettings || !adsSettings.globalEnabled) return null;

  const slotConfig = adsSettings.slots?.[placement];
  if (!slotConfig || !slotConfig.enabled) return null;

  if (!slotConfig.code || slotConfig.code.trim().length === 0) return null;

  return (
    <div className={`my-4 w-full flex flex-col items-center justify-center ${className}`}>
      <div
        className="w-full max-w-[728px] overflow-hidden flex justify-center"
        dangerouslySetInnerHTML={{ __html: slotConfig.code }}
      />
    </div>
  );
}
