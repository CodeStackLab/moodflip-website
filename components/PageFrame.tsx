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
      <main className={`mf-page ${narrow ? 'mf-page--narrow' : ''}`}>
        <header className="mf-page-hero">
          <span className={`mf-eyebrow ${tone === 'danger' ? 'mf-eyebrow--danger' : ''}`}>{eyebrow}</span>
          <h1>{title}</h1>
          {intro && <p>{intro}</p>}
        </header>
        <div className="mf-page-panel">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
