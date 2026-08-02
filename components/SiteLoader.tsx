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

    const fade = window.setTimeout(() => setLeaving(true), 1050);
    const hide = window.setTimeout(() => setVisible(false), 1450);
    return () => { window.clearTimeout(fade); window.clearTimeout(hide); };
  }, []);

  if (!visible) return null;

  return (
    <div className={`brand-loader ${leaving ? 'brand-loader--leaving' : ''}`} role="status" aria-live="polite" aria-label="MoodFlip is loading">
      <style>{`
        @keyframes loaderBreathe { 0%,100% { transform: scale(.94); opacity:.72 } 50% { transform: scale(1.08); opacity:1 } }
        @keyframes loaderTurn { to { transform: rotate(360deg) } }
        @keyframes loaderSpark { 0%,100% { transform: scale(.8) rotate(0); opacity:.55 } 50% { transform: scale(1.15) rotate(16deg); opacity:1 } }
        @keyframes loaderRise { from { opacity:0; transform:translateY(10px) } to { opacity:1; transform:translateY(0) } }
        @keyframes loaderProgress { from { transform:scaleX(0) } to { transform:scaleX(1) } }
        .brand-loader { position:fixed; inset:0; z-index:9999; display:grid; place-items:center; overflow:hidden; background:radial-gradient(circle at 18% 16%,rgba(239,108,168,.17),transparent 31rem),radial-gradient(circle at 82% 20%,rgba(86,200,207,.16),transparent 32rem),linear-gradient(150deg,#fcfaff,#f5f4ff 52%,#f1f8fb); transition:opacity .4s ease,visibility .4s ease; }
        .brand-loader--leaving { opacity:0; visibility:hidden; pointer-events:none; }
        .brand-loader__grain { position:absolute; inset:0; opacity:.38; background-image:linear-gradient(rgba(85,67,216,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(85,67,216,.035) 1px,transparent 1px); background-size:42px 42px; mask-image:radial-gradient(circle,#000 20%,transparent 76%); }
        .brand-loader__content { position:relative; display:flex; flex-direction:column; align-items:center; text-align:center; padding:24px; animation:loaderRise .5s ease both; }
        .brand-loader__stage { width:144px; height:144px; position:relative; display:grid; place-items:center; margin-bottom:24px; }
        .brand-loader__halo { position:absolute; inset:0; border-radius:50%; background:conic-gradient(from 20deg,rgba(239,108,168,.34),rgba(102,84,232,.18),rgba(86,200,207,.34),rgba(239,108,168,.34)); filter:blur(1px); animation:loaderBreathe 2.4s ease-in-out infinite; }
        .brand-loader__orbit { position:absolute; inset:8px; border-radius:50%; border:1px solid rgba(102,84,232,.18); border-top-color:#6654e8; animation:loaderTurn 2.8s linear infinite; }
        .brand-loader__mark { width:82px; height:82px; border-radius:25px; display:grid; place-items:center; background:linear-gradient(135deg,#ef6ca8,#6654e8 54%,#56c8cf); box-shadow:0 20px 50px rgba(85,67,216,.3),inset 0 1px 0 rgba(255,255,255,.4); transform:rotate(-5deg); }
        .brand-loader__mark svg { width:52px; height:52px; transform:rotate(5deg); }
        .brand-loader__spark { position:absolute; right:13px; top:13px; width:19px; height:19px; animation:loaderSpark 1.5s ease-in-out infinite; }
        .brand-loader__name { margin:0; font:600 38px/1.05 'Newsreader',Georgia,serif; letter-spacing:-.035em; color:#18152b; }
        .brand-loader__name span { color:#6654e8; font-style:italic; }
        .brand-loader__copy { margin:9px 0 20px; color:rgba(24,21,43,.58); font:700 11px/1.4 'Manrope',sans-serif; letter-spacing:.12em; text-transform:uppercase; }
        .brand-loader__track { width:150px; height:4px; overflow:hidden; border-radius:999px; background:rgba(102,84,232,.1); }
        .brand-loader__bar { width:100%; height:100%; border-radius:inherit; transform-origin:left; background:linear-gradient(90deg,#ef6ca8,#6654e8,#56c8cf); animation:loaderProgress 1.08s cubic-bezier(.22,1,.36,1) both; }
        @media (max-width:520px) { .brand-loader__stage{width:124px;height:124px}.brand-loader__mark{width:72px;height:72px;border-radius:22px}.brand-loader__name{font-size:33px} }
        @media (prefers-reduced-motion:reduce) { .brand-loader__halo,.brand-loader__orbit,.brand-loader__spark,.brand-loader__bar{animation:none}.brand-loader__bar{transform:scaleX(1)} }
      `}</style>
      <div className="brand-loader__grain" />
      <div className="brand-loader__content">
        <div className="brand-loader__stage">
          <div className="brand-loader__halo" />
          <div className="brand-loader__orbit" />
          <div className="brand-loader__mark">
            <svg viewBox="0 0 64 64" aria-hidden="true">
              <path d="M32 52C20 45 12 38 12 28c0-7 5-12 12-12 4 0 7 2 9 5 2-3 5-5 9-5 7 0 12 5 12 12 0 10-8 17-22 24Z" fill="white" />
              <path d="m35 18 3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7Z" fill="#6654e8" />
            </svg>
          </div>
          <svg className="brand-loader__spark" viewBox="0 0 20 20" aria-hidden="true"><path d="m10 0 2.5 7.5L20 10l-7.5 2.5L10 20l-2.5-7.5L0 10l7.5-2.5L10 0Z" fill="#fff" /></svg>
        </div>
        <h1 className="brand-loader__name">Mood<span>Flip</span></h1>
        <p className="brand-loader__copy">A small shift starts here</p>
        <div className="brand-loader__track"><div className="brand-loader__bar" /></div>
      </div>
    </div>
  );
}
