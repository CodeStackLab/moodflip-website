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
          globalEnabled: true,
          mode: 'manual',
          adSenseClient: 'ca-pub-9876543210123456',
          slots: {
            headerBanner: { enabled: true, slotId: '1234567890', code: '' },
            sidebarAd: { enabled: true, slotId: '2345678901', code: '' },
            moodLibraryAd: { enabled: true, slotId: '3456789012', code: '' },
            footerBanner: { enabled: true, slotId: '4567890123', code: '' },
            planPageAd: { enabled: true, slotId: '5678901234', code: '' },
            checkinModalAd: { enabled: true, slotId: '6789012345', code: '' },
            stickyMobileAd: { enabled: true, slotId: '7890123456', code: '' }
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
  if (slotConfig && !slotConfig.enabled) return null;

  return (
    <div className={`my-4 w-full flex flex-col items-center justify-center ${className}`}>
      {slotConfig?.code && slotConfig.code.trim().length > 0 ? (
        <div
          className="w-full overflow-hidden flex justify-center"
          dangerouslySetInnerHTML={{ __html: slotConfig.code }}
        />
      ) : (
        <div className="w-full max-w-[728px] bg-gradient-to-r from-purple-50 via-pink-50 to-indigo-50 border border-dashed border-[#7147E8]/30 rounded-2xl p-3 sm:p-4 text-center shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 text-left">
            <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#7147E8] to-[#9333EA] text-white flex items-center justify-center font-extrabold text-xs shrink-0 shadow-2xs">
              📢
            </span>
            <div>
              <span className="block text-xs font-extrabold text-[#1A1338]">Advertisement</span>
              <span className="block text-[11px] text-gray-500 font-medium">Google AdSense Partner Unit ({placement})</span>
            </div>
          </div>
          <span className="text-[10px] font-extrabold text-[#7147E8] bg-white border border-[#7147E8]/20 px-3 py-1 rounded-full shadow-2xs">
            AdSense Active
          </span>
        </div>
      )}
    </div>
  );
}
