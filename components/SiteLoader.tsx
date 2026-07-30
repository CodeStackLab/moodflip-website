'use client';

import React, { useState, useEffect } from 'react';

export default function SiteLoader() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('moodflip_theme');
    if (savedTheme === 'dark') {
      setTheme('dark');
    } else if (savedTheme === 'light') {
      setTheme('light');
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }

    const fadeTimer = setTimeout(() => setFading(true), 1800);
    const hideTimer = setTimeout(() => setVisible(false), 2300);
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
        /* ─── ORBITAL RINGS ─── */
        @keyframes orbit1 {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes orbit2 {
          from { transform: rotate(120deg); }
          to   { transform: rotate(480deg); }
        }
        @keyframes orbit3 {
          from { transform: rotate(240deg); }
          to   { transform: rotate(600deg); }
        }

        /* ─── LOGO ICON ─── */
        @keyframes logoPop {
          0%   { transform: scale(0.7) rotate(-10deg); opacity: 0; }
          50%  { transform: scale(1.08) rotate(3deg); opacity: 1; }
          70%  { transform: scale(0.96) rotate(-1deg); }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes logoPulseGlow {
          0%, 100% { box-shadow: 0 0 30px 8px rgba(124,84,209,0.45), 0 0 60px 16px rgba(236,72,153,0.2); }
          50%       { box-shadow: 0 0 50px 16px rgba(124,84,209,0.65), 0 0 90px 28px rgba(236,72,153,0.35); }
        }
        @keyframes logoFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-6px); }
        }

        /* ─── BRAND TEXT SHIMMER ─── */
        @keyframes shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        @keyframes brandFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ─── TAGLINE TYPING CURSOR ─── */
        @keyframes blinkCursor {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }

        /* ─── PARTICLES ─── */
        @keyframes particleFloat {
          0%   { transform: translateY(0) scale(1); opacity: 0.9; }
          100% { transform: translateY(-60px) scale(0); opacity: 0; }
        }
        .mf-particle {
          position: absolute;
          border-radius: 50%;
          animation: particleFloat 2s ease-out infinite;
          pointer-events: none;
        }

        /* ─── PROGRESS BAR ─── */
        @keyframes progressFill {
          0%   { width: 0%; opacity: 1; }
          65%  { width: 80%; }
          90%  { width: 96%; }
          100% { width: 100%; opacity: 0.6; }
        }
        @keyframes progressShimmer {
          0%   { background-position: -300px 0; }
          100% { background-position: 300px 0; }
        }

        /* ─── DOTS ─── */
        @keyframes dotPing {
          0%, 80%, 100% { transform: scale(1); opacity: 0.7; }
          40%            { transform: scale(1.6); opacity: 1; }
        }

        /* ─── LOADER FADE OUT ─── */
        .mf-loader-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          transition: opacity 0.5s cubic-bezier(0.4,0,0.2,1);
        }
      `}</style>

      <div
        className="mf-loader-overlay"
        style={{
          background: isDark
            ? 'radial-gradient(ellipse at 50% 40%, #180c2e 0%, #0c0618 60%, #08040f 100%)'
            : 'radial-gradient(ellipse at 50% 40%, #fdf4ff 0%, #f8edfb 40%, #f0e8ff 100%)',
          opacity: fading ? 0 : 1,
          pointerEvents: fading ? 'none' : 'all',
        }}
      >

        {/* ── BACKGROUND GRID / VIGNETTE ── */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: isDark
            ? 'linear-gradient(rgba(124,84,209,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(124,84,209,0.04) 1px, transparent 1px)'
            : 'linear-gradient(rgba(124,84,209,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(124,84,209,0.06) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, #000 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, #000 40%, transparent 100%)',
        }} />

        {/* ── FLOATING AMBIENT ORBS ── */}
        <div style={{
          position: 'absolute', width: '340px', height: '340px', borderRadius: '50%',
          background: isDark
            ? 'radial-gradient(circle, rgba(124,84,209,0.18) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(124,84,209,0.12) 0%, transparent 70%)',
          top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', width: '200px', height: '200px', borderRadius: '50%',
          background: isDark
            ? 'radial-gradient(circle, rgba(236,72,153,0.14) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(236,72,153,0.09) 0%, transparent 70%)',
          top: '42%', left: '52%', transform: 'translate(-50%,-50%)',
          pointerEvents: 'none',
        }} />

        {/* ── ORBITAL RINGS SYSTEM ── */}
        <div style={{ position: 'relative', width: '160px', height: '160px', marginBottom: '2.2rem' }}>

          {/* Ring 1 — slow outer */}
          <div style={{
            position: 'absolute', inset: '-16px',
            border: '1.5px solid transparent',
            borderTopColor: isDark ? 'rgba(168,85,247,0.7)' : 'rgba(124,84,209,0.5)',
            borderRightColor: isDark ? 'rgba(168,85,247,0.2)' : 'rgba(124,84,209,0.15)',
            borderRadius: '50%',
            animation: 'orbit1 3.2s linear infinite',
          }}>
            {/* Orbit dot 1 */}
            <div style={{
              position: 'absolute', top: '-4px', left: '50%', transform: 'translateX(-50%)',
              width: '8px', height: '8px', borderRadius: '50%',
              background: isDark ? '#a855f7' : '#7c54d1',
              boxShadow: '0 0 12px 4px rgba(168,85,247,0.7)',
            }} />
          </div>

          {/* Ring 2 — medium */}
          <div style={{
            position: 'absolute', inset: '0px',
            border: '1.5px solid transparent',
            borderTopColor: isDark ? 'rgba(236,72,153,0.6)' : 'rgba(236,72,153,0.45)',
            borderLeftColor: isDark ? 'rgba(236,72,153,0.2)' : 'rgba(236,72,153,0.12)',
            borderRadius: '50%',
            animation: 'orbit2 2.2s linear infinite',
          }}>
            {/* Orbit dot 2 */}
            <div style={{
              position: 'absolute', top: '-4px', left: '50%', transform: 'translateX(-50%)',
              width: '7px', height: '7px', borderRadius: '50%',
              background: isDark ? '#ec4899' : '#db2777',
              boxShadow: '0 0 10px 3px rgba(236,72,153,0.7)',
            }} />
          </div>

          {/* Ring 3 — fast inner */}
          <div style={{
            position: 'absolute', inset: '16px',
            border: '1.5px solid transparent',
            borderTopColor: isDark ? 'rgba(251,191,36,0.55)' : 'rgba(234,179,8,0.45)',
            borderBottomColor: isDark ? 'rgba(251,191,36,0.15)' : 'rgba(234,179,8,0.1)',
            borderRadius: '50%',
            animation: 'orbit3 1.5s linear infinite',
          }}>
            {/* Orbit dot 3 */}
            <div style={{
              position: 'absolute', top: '-4px', left: '50%', transform: 'translateX(-50%)',
              width: '6px', height: '6px', borderRadius: '50%',
              background: isDark ? '#fbbf24' : '#d97706',
              boxShadow: '0 0 8px 2px rgba(251,191,36,0.65)',
            }} />
          </div>

          {/* ── LOGO ICON CENTER ── */}
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{
              width: '76px', height: '76px', borderRadius: '22px',
              background: 'linear-gradient(135deg, #7c54d1 0%, #a855f7 50%, #ec4899 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '2.1rem',
              animation: 'logoPop 0.7s cubic-bezier(0.34,1.56,0.64,1) forwards, logoPulseGlow 2.4s ease-in-out infinite 0.7s, logoFloat 3s ease-in-out infinite 0.7s',
              boxShadow: '0 8px 32px rgba(124,84,209,0.5)',
            }}>
              💫
            </div>
          </div>

          {/* ── MINI PARTICLES ── */}
          {[
            { left: '20%', bottom: '10%', size: 5, delay: '0s',    color: '#a855f7' },
            { left: '70%', bottom: '15%', size: 4, delay: '0.4s',  color: '#ec4899' },
            { left: '45%', bottom: '5%',  size: 6, delay: '0.8s',  color: '#7c54d1' },
            { left: '80%', bottom: '30%', size: 3, delay: '0.6s',  color: '#fbbf24' },
            { left: '10%', bottom: '35%', size: 4, delay: '1.1s',  color: '#a855f7' },
          ].map((p, i) => (
            <div
              key={i}
              className="mf-particle"
              style={{
                left: p.left, bottom: p.bottom,
                width: `${p.size}px`, height: `${p.size}px`,
                background: p.color,
                boxShadow: `0 0 6px 2px ${p.color}88`,
                animationDelay: p.delay,
                animationDuration: `${1.6 + i * 0.3}s`,
              }}
            />
          ))}
        </div>

        {/* ── BRAND NAME with SHIMMER ── */}
        <div style={{
          fontFamily: "'Fraunces', Georgia, serif",
          fontSize: '2.5rem',
          fontWeight: 800,
          letterSpacing: '-0.02em',
          backgroundImage: isDark
            ? 'linear-gradient(90deg, #c084fc 0%, #f9a8d4 30%, #ffffff 50%, #c084fc 70%, #f9a8d4 100%)'
            : 'linear-gradient(90deg, #7c54d1 0%, #a855f7 30%, #ec4899 50%, #7c54d1 70%, #a855f7 100%)',
          backgroundSize: '400px 100%',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          WebkitTextFillColor: 'transparent',
          animation: 'brandFadeUp 0.5s ease 0.3s both, shimmer 2.2s linear infinite',
          marginBottom: '0.5rem',
        }}>
          MoodFlip
        </div>

        {/* ── TAGLINE ── */}
        <div style={{
          fontSize: '0.82rem',
          fontWeight: 600,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: isDark ? 'rgba(196,176,230,0.8)' : 'rgba(100,82,140,0.75)',
          animation: 'brandFadeUp 0.5s ease 0.5s both',
          marginBottom: '2.4rem',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}>
          Flip your mood in 60 seconds
          <span style={{
            display: 'inline-block',
            width: '2px', height: '14px',
            background: isDark ? '#a855f7' : '#7c54d1',
            borderRadius: '1px',
            animation: 'blinkCursor 0.9s ease-in-out infinite',
          }} />
        </div>

        {/* ── BOUNCING DOTS ── */}
        <div style={{ display: 'flex', gap: '0.55rem', animation: 'brandFadeUp 0.5s ease 0.6s both' }}>
          {[0, 1, 2, 3].map(i => (
            <div
              key={i}
              style={{
                width: i === 1 || i === 2 ? '10px' : '8px',
                height: i === 1 || i === 2 ? '10px' : '8px',
                borderRadius: '50%',
                background: i === 0 ? '#7c54d1'
                  : i === 1 ? '#a855f7'
                  : i === 2 ? '#ec4899'
                  : '#f43f5e',
                boxShadow: `0 0 10px 3px ${
                  i === 0 ? 'rgba(124,84,209,0.5)'
                  : i === 1 ? 'rgba(168,85,247,0.5)'
                  : i === 2 ? 'rgba(236,72,153,0.5)'
                  : 'rgba(244,63,94,0.5)'
                }`,
                animation: 'dotPing 1s ease-in-out infinite',
                animationDelay: `${i * 0.18}s`,
              }}
            />
          ))}
        </div>

        {/* ── PROGRESS BAR ── */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: '3px',
          background: isDark ? 'rgba(168,85,247,0.1)' : 'rgba(124,84,209,0.08)',
        }}>
          <div style={{
            height: '100%',
            backgroundImage: 'linear-gradient(90deg, #7c54d1, #a855f7, #ec4899, #f43f5e, #a855f7)',
            backgroundSize: '300px 100%',
            animation: `progressFill ${1.9}s cubic-bezier(0.4,0,0.2,1) forwards, progressShimmer 1.2s linear infinite`,
          }} />
        </div>

        {/* ── CORNER ACCENT DOTS ── */}
        {[
          { top: '24px', left: '24px' },
          { top: '24px', right: '24px' },
          { bottom: '24px', left: '24px' },
          { bottom: '24px', right: '24px' },
        ].map((pos, i) => (
          <div key={i} style={{
            position: 'absolute', ...pos,
            width: '6px', height: '6px', borderRadius: '50%',
            background: isDark ? 'rgba(168,85,247,0.35)' : 'rgba(124,84,209,0.25)',
            boxShadow: '0 0 8px rgba(168,85,247,0.3)',
          }} />
        ))}

      </div>
    </>
  );
}
