'use client';

import React, { useState, useEffect } from 'react';

export default function SiteLoader() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Detect stored theme or system preference immediately for loading screen
    const savedTheme = localStorage.getItem('moodflip_theme');
    if (savedTheme === 'dark') {
      setTheme('dark');
    } else if (savedTheme === 'light') {
      setTheme('light');
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }

    const fadeTimer = setTimeout(() => setFading(true), 1200);
    const hideTimer = setTimeout(() => setVisible(false), 1600);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  const isDark = theme === 'dark';

  return (
    <>
      <style>{`
        @keyframes loaderPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.15); opacity: 0.85; }
        }
        @keyframes loaderBar {
          0% { width: 0%; }
          40% { width: 60%; }
          80% { width: 90%; }
          100% { width: 100%; }
        }
        @keyframes dotBounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-8px); }
        }
        .loader-dot:nth-child(1) { animation-delay: 0s; }
        .loader-dot:nth-child(2) { animation-delay: 0.15s; }
        .loader-dot:nth-child(3) { animation-delay: 0.3s; }
      `}</style>
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: isDark
          ? 'linear-gradient(160deg, #0e091b 0%, #170d24 40%, #201127 100%)'
          : 'linear-gradient(145deg, #fdf6f0 0%, #fcf0f5 40%, #f7effd 100%)',
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.4s ease, background 0.3s ease',
        pointerEvents: fading ? 'none' : 'all'
      }}>
        {/* Logo Mark */}
        <div style={{
          animation: 'loaderPulse 1.2s ease-in-out infinite',
          marginBottom: '1.5rem'
        }}>
          <div style={{
            width: '72px',
            height: '72px',
            borderRadius: '22px',
            background: 'linear-gradient(135deg, #7c54d1 0%, #ec4899 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2.2rem',
            boxShadow: '0 12px 40px rgba(124, 84, 209, 0.45)'
          }}>
            💫
          </div>
        </div>

        {/* Brand Name */}
        <div style={{
          fontFamily: "'Fraunces', Georgia, serif",
          fontSize: '2.1rem',
          fontWeight: 700,
          color: isDark ? '#f3e8ff' : '#362854',
          marginBottom: '0.4rem',
          letterSpacing: '-0.01em'
        }}>
          MoodFlip
        </div>
        <div style={{
          fontSize: '0.82rem',
          color: isDark ? '#c4b0e6' : '#665c7d',
          fontWeight: 600,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          marginBottom: '2rem'
        }}>
          Flipping moods in 60 seconds
        </div>

        {/* Loading Dots */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="loader-dot"
              style={{
                width: '9px',
                height: '9px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #7c54d1, #ec4899)',
                animation: 'dotBounce 0.8s ease-in-out infinite',
                animationDelay: `${i * 0.15}s`
              }}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: isDark ? 'rgba(168, 85, 247, 0.15)' : 'rgba(124, 84, 209, 0.12)'
        }}>
          <div style={{
            height: '100%',
            background: 'linear-gradient(90deg, #7c54d1, #a855f7, #ec4899)',
            animation: 'loaderBar 1.4s ease-out forwards'
          }} />
        </div>
      </div>
    </>
  );
}
