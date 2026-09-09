'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import styles from './LandscapeEnforcer.module.css';

export default function LandscapeEnforcer() {
  const pathname = usePathname();
  const [isPortrait, setIsPortrait] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  // Landscape orientation is enforced strictly on the MoodFlip interactive tool pages
  const isToolPage = pathname === '/' || pathname?.startsWith('/moods');

  useEffect(() => {
    setMounted(true);

    const checkOrientation = () => {
      // Enforce landscape orientation on mobile phones (< 700px)
      const isPhoneScreen = window.innerWidth < 700;
      const isHeightGreater = window.innerHeight > window.innerWidth;
      
      // Check standard media query orientation
      const mql = window.matchMedia('(orientation: portrait)');
      const portraitByMql = mql.matches;

      setIsPortrait(isPhoneScreen && (isHeightGreater || portraitByMql));
    };

    checkOrientation();

    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);

    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  // Lock background scroll completely when the landscape overlay is showing
  useEffect(() => {
    if (mounted && isPortrait && isToolPage) {
      const originalBodyOverflow = document.body.style.overflow;
      const originalHtmlOverflow = document.documentElement.style.overflow;
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = originalBodyOverflow;
        document.documentElement.style.overflow = originalHtmlOverflow;
      };
    }
  }, [mounted, isPortrait, isToolPage]);

  if (!mounted || !isPortrait || !isToolPage) {
    return null;
  }

  return (
    <div className={styles.landscapeOverlay} role="dialog" aria-modal="true" aria-label="Please rotate your device to landscape">
      <div className={styles.contentCard}>
        {/* Brand Logo */}
        <img
          src="/moodflip-logo.png"
          alt="MoodFlip"
          className={styles.brandLogo}
        />

        {/* Animated Rotating Phone Graphic */}
        <div className={styles.phoneAnimationWrap}>
          <div className={styles.phoneGlow} />

          {/* Curved rotation arrow indicator */}
          <svg className={styles.rotateArrowSvg} viewBox="0 0 100 100" fill="none">
            <path
              d="M 18 50 A 32 32 0 0 1 76 24"
              stroke="#7464AC"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="4 4"
            />
            <polygon points="76,16 84,24 76,32" fill="#7464AC" />
          </svg>

          {/* Rotating smartphone */}
          <div className={styles.rotatingPhone}>
            <div className={styles.speakerBar} />
            <div className={styles.phoneScreenPreview}>
              <div className={styles.screenColLeft} />
              <div className={styles.screenColRight} />
            </div>
            <div className={styles.homeIndicator} />
          </div>
        </div>

        {/* Badge */}
        <span className={styles.badge}>
          <span>↻</span> Landscape Mode Required
        </span>

        {/* Headline */}
        <h2 className={styles.title}>Please Rotate Your Device</h2>

        {/* Description matching Joy's exact requirement */}
        <p className={styles.description}>
          MoodFlip is designed for a landscape layout. Turn your phone horizontally to see and use the complete interactive tool.
        </p>

        {/* Friendly Action Hint */}
        <div className={styles.hintRow}>
          <span>📱</span> Turn your device sideways to begin
        </div>
      </div>
    </div>
  );
}
