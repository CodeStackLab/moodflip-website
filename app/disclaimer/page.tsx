'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { defaultLegalPages } from '@/lib/blogData';

function renderMarkdown(content: string) {
  return content.split('\n').map((line, i) => {
    if (line.startsWith('## ')) return <h2 key={i} className="font-serif text-2xl font-extrabold text-[#1A1338] mt-8 mb-3">{line.slice(3)}</h2>;
    if (line.startsWith('### ')) return <h3 key={i} className="font-serif text-lg font-extrabold text-[#1A1338] mt-6 mb-2">{line.slice(4)}</h3>;
    if (line.startsWith('- ')) return <li key={i} className="mb-1 ml-4">{line.slice(2)}</li>;
    if (line === '') return <div key={i} className="h-2" />;
    const parts = line.split(/(\*\*[^*]+\*\*)/g);
    return (
      <p key={i} className="text-[#5B5278] text-sm leading-relaxed mb-0">
        {parts.map((part, j) =>
          part.startsWith('**') && part.endsWith('**')
            ? <strong key={j} className="font-extrabold text-[#1A1338]">{part.slice(2, -2)}</strong>
            : part
        )}
      </p>
    );
  });
}

export default function DisclaimerPage() {
  const [content, setContent] = useState(defaultLegalPages.find(p => p.id === 'disclaimer')!);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('moodflip_legal_pages');
      if (saved) {
        try {
          const pages = JSON.parse(saved);
          const page = pages.find((p: any) => p.id === 'disclaimer');
          if (page) setContent(page);
        } catch (e) {}
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F7FC] text-[#1A1338] font-sans antialiased">
      <header className="bg-white/90 backdrop-blur-md border-b border-[#EAE3F2] px-4 lg:px-8 py-4 flex items-center justify-between sticky top-0 z-40 shadow-2xs">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="relative inline-block w-[30px] h-[22px] rounded-b-[19px] bg-gradient-to-br from-[#ff9f8d] via-[#d950c0] to-[#7148e9] shrink-0 mt-0.5">
            <span className="absolute left-[6px] top-[3px] w-[17px] h-[9px] rounded-b-[12px] bg-white" />
            <span className="absolute -top-[5px] left-[2px] w-[7px] h-[7px] rounded-full bg-[#ffad64] z-10" />
            <span className="absolute -top-[5px] right-[2px] w-[7px] h-[7px] rounded-full bg-[#ffad64] z-10" />
          </span>
          <span className="font-serif text-xl font-extrabold text-[#15183b]">mood<span className="text-[#7148e9]">flip</span></span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-[#4A4268]">
          <Link href="/" className="hover:text-[#7147E8] transition">Home</Link>
          <Link href="/blog" className="hover:text-[#7147E8] transition">Blog</Link>
          <Link href="/resources" className="hover:text-[#7147E8] transition">Resources</Link>
        </nav>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-6">
          <span className="text-xs font-black uppercase tracking-widest text-amber-700 bg-amber-50 px-3 py-1 rounded-full">⚠️ Disclaimer</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#1A1338] mb-2">{content.title}</h1>
        <p className="text-xs text-gray-400 font-semibold mb-8">Last updated: {content.lastUpdated}</p>
        <div className="bg-white border border-[#EAE3F2] rounded-3xl p-6 sm:p-10 shadow-xs space-y-1">
          {renderMarkdown(content.content)}
        </div>
        <div className="mt-8 flex items-center gap-4 text-xs font-semibold text-[#68607F] flex-wrap">
          <Link href="/terms" className="hover:text-[#7147E8] transition">Terms of Service →</Link>
          <Link href="/privacy" className="hover:text-[#7147E8] transition">Privacy Policy →</Link>
        </div>
      </main>

      <footer className="bg-white border-t border-[#EAE3F2] py-6 px-4 text-center text-xs text-[#8A829E] font-semibold mt-12">
        <div className="flex items-center justify-center gap-4 flex-wrap mb-2">
          <Link href="/" className="hover:text-[#7147E8] transition">Home</Link>
          <Link href="/terms" className="hover:text-[#7147E8] transition">Terms</Link>
          <Link href="/privacy" className="hover:text-[#7147E8] transition">Privacy</Link>
        </div>
        <p>© 2026 MoodFlip. All rights reserved.</p>
      </footer>
    </div>
  );
}
