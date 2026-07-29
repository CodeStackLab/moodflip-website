'use client';

import React, { useState, useEffect } from 'react';

export default function SiteLoader() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 1200);
    const hideTimer = setTimeout(() => setVisible(false), 1600);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      <style>{`
        @keyframes loaderPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.15); opacity: 0.75; }
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
        background: 'linear-gradient(135deg, #0b0714 0%, #150f24 50%, #1c1430 100%)',
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.4s ease',
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
            background: 'linear-gradient(135deg, #7c54d1 0%, #e77c74 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2.2rem',
            boxShadow: '0 12px 40px rgba(124, 84, 209, 0.5)'
          }}>
            💫
          </div>
        </div>

        {/* Brand Name */}
        <div style={{
          fontFamily: "'Fraunces', Georgia, serif",
          fontSize: '2rem',
          fontWeight: 700,
          color: '#f3e8ff',
          marginBottom: '0.4rem',
          letterSpacing: '-0.01em'
        }}>
          MoodFlip
        </div>
        <div style={{
          fontSize: '0.82rem',
          color: '#c4b0e6',
          fontWeight: 500,
          letterSpacing: '0.05em',
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
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #a855f7, #ec4899)',
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
          background: 'rgba(168, 85, 247, 0.15)'
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
