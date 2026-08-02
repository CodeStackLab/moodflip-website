'use client';

import React, { useEffect, useState } from 'react';

export default function SiteLoader() {
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (navigator.webdriver) {
      setVisible(false);
      return;
    }

    const fade = window.setTimeout(() => setLeaving(true), 900);
    const hide = window.setTimeout(() => setVisible(false), 1300);
    return () => { window.clearTimeout(fade); window.clearTimeout(hide); };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`site-loader ${leaving ? 'leaving' : ''}`}
      role="status"
      aria-live="polite"
      aria-label="MoodFlip is loading"
    >
      <style>{`
        @keyframes loaderBlob {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.8; }
          50% { transform: scale(1.1) rotate(180deg); opacity: 1; }
        }
        @keyframes loaderSpin {
          to { transform: rotate(360deg); }
        }
        @keyframes loaderTextRise {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes loaderBar {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }

        .site-loader {
          position: fixed; inset: 0; z-index: 99999;
          display: flex; align-items: center; justify-content: center;
          background: #fff8ef;
          transition: opacity 0.4s ease, visibility 0.4s ease;
        }
        .site-loader.leaving {
          opacity: 0; visibility: hidden; pointer-events: none;
        }

        .loader-content {
          display: flex; flex-direction: column; align-items: center;
          text-align: center; padding: 2rem;
          animation: loaderTextRise 0.4s cubic-bezier(0.22,1,0.36,1) both;
        }

        .loader-sun-wrap {
          position: relative; width: 110px; height: 110px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 1.5rem;
        }
        .loader-halo {
          position: absolute; inset: 0; border-radius: 50%;
          background: conic-gradient(from 0deg, rgba(108,92,231,0.3), rgba(236,72,153,0.3), rgba(255,182,72,0.3), rgba(108,92,231,0.3));
          filter: blur(12px);
          animation: loaderBlob 3s ease-in-out infinite;
        }
        .loader-ring {
          position: absolute; inset: 4px; border-radius: 50%;
          border: 2px solid transparent;
          border-top-color: #6c5ce7;
          border-right-color: #ec4899;
          animation: loaderSpin 1.8s linear infinite;
        }
        .loader-icon-box {
          width: 68px; height: 68px; border-radius: 22px;
          background: linear-gradient(135deg, #6c5ce7, #ec4899, #ffb648);
          display: flex; align-items: center; justify-content: center;
          font-size: 2rem; color: white;
          box-shadow: 0 12px 30px rgba(108,92,231,0.35);
          position: relative; z-index: 1;
        }

        .loader-brand {
          font-family: 'Fraunces', Georgia, serif;
          font-size: 2.2rem; font-weight: 800;
          color: #33283f; margin: 0 0 0.3rem 0;
          line-height: 1;
        }
        .loader-brand span {
          background: linear-gradient(135deg, #6c5ce7, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .loader-sub {
          font-size: 0.78rem; font-weight: 800;
          color: #6b6078; text-transform: uppercase;
          letter-spacing: 0.12em; margin: 0 0 1.25rem 0;
        }
        .loader-track {
          width: 140px; height: 4px; border-radius: 999px;
          background: rgba(108,92,231,0.12); overflow: hidden;
        }
        .loader-bar {
          width: 100%; height: 100%; border-radius: inherit;
          background: linear-gradient(90deg, #6c5ce7, #ec4899, #ffb648);
          transform-origin: left;
          animation: loaderBar 0.9s cubic-bezier(0.22,1,0.36,1) both;
        }
      `}</style>

      <div className="loader-content">
        <div className="loader-sun-wrap">
          <div className="loader-halo" />
          <div className="loader-ring" />
          <div className="loader-icon-box">🌤️</div>
        </div>
        <h1 className="loader-brand">Mood<span>Flip</span></h1>
        <p className="loader-sub">A small shift starts here</p>
        <div className="loader-track"><div className="loader-bar" /></div>
      </div>
    </div>
  );
}
