'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

type PageFrameProps = {
  eyebrow: string;
  title: string;
  intro?: string;
  tone?: 'default' | 'danger';
  children: React.ReactNode;
  narrow?: boolean;
};

export default function PageFrame({ eyebrow, title, intro, tone = 'default', children, narrow }: PageFrameProps) {
  return (
    <div className="site-shell">
      <Header />

      <style>{`
        @keyframes pageFrameBlob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -25px) scale(1.05); }
        }
        @keyframes pageFrameIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .pf-shell {
          min-height: calc(100vh - 200px);
          padding: 2.5rem 1rem 4rem;
          position: relative; overflow: hidden;
        }
        .pf-blob-1 {
          position: fixed; top: -100px; left: -100px;
          width: 480px; height: 480px; border-radius: 50%;
          background: radial-gradient(circle, rgba(108,92,231,0.12) 0%, transparent 70%);
          animation: pageFrameBlob 15s ease-in-out infinite;
          pointer-events: none; z-index: 0;
        }
        .pf-blob-2 {
          position: fixed; bottom: -80px; right: -80px;
          width: 420px; height: 420px; border-radius: 50%;
          background: radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 70%);
          animation: pageFrameBlob 18s ease-in-out infinite 4s;
          pointer-events: none; z-index: 0;
        }
        .pf-container {
          max-width: ${narrow ? '800px' : '1080px'};
          margin: 0 auto;
          position: relative; z-index: 1;
          animation: pageFrameIn 0.45s cubic-bezier(0.22,1,0.36,1) both;
        }
        .pf-hero {
          text-align: center;
          margin-bottom: 2.5rem;
          max-width: 760px; margin-left: auto; margin-right: auto;
        }
        .pf-eyebrow {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 0.4rem 1.1rem; border-radius: 999px;
          font-size: 0.76rem; font-weight: 800; text-transform: uppercase;
          letter-spacing: 0.08em; margin-bottom: 1.1rem;
        }
        .pf-eyebrow.default {
          background: rgba(108,92,231,0.1);
          border: 1px solid rgba(108,92,231,0.22);
          color: #6c5ce7;
        }
        .pf-eyebrow.danger {
          background: rgba(239,68,68,0.1);
          border: 1px solid rgba(239,68,68,0.25);
          color: #dc2626;
        }
        .pf-title {
          font-family: 'Fraunces', Georgia, serif;
          font-size: clamp(2rem, 4vw, 3.2rem);
          font-weight: 640; color: var(--text-main);
          line-height: 1.15; margin-bottom: 1rem;
        }
        .pf-intro {
          font-size: 1.05rem; color: var(--text-subtle);
          line-height: 1.65; margin: 0;
        }
        .pf-card {
          background: var(--card-bg);
          border: 1.5px solid var(--card-border);
          border-radius: 32px; padding: 3rem 2.5rem;
          box-shadow: 0 28px 70px rgba(74,57,102,0.1);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        @media (max-width: 640px) {
          .pf-card { padding: 2rem 1.5rem; border-radius: 24px; }
          .pf-hero { margin-bottom: 1.75rem; }
        }
      `}</style>

      <main className="pf-shell">
        <div className="pf-blob-1" />
        <div className="pf-blob-2" />

        <div className="pf-container">
          <header className="pf-hero">
            <span className={`pf-eyebrow ${tone}`}>{eyebrow}</span>
            <h1 className="pf-title">{title}</h1>
            {intro && <p className="pf-intro">{intro}</p>}
          </header>

          <div className="pf-card">
            {children}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
