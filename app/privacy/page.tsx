'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { defaultLegalPages } from '@/lib/blogData';

function renderContent(content: string) {
  if (!content) return null;
  const isHtml = /<[a-z][\s\S]*>/i.test(content);
  if (isHtml) {
    return <div className="prose-custom text-[#5B5278] text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: content }} />;
  }
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

import Header from '@/components/Header';

export default function PrivacyPage() {
  const [content, setContent] = useState(defaultLegalPages.find(p => p.id === 'privacy')!);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('moodflip_legal_pages');
      if (saved) {
        try {
          const pages = JSON.parse(saved);
          const page = pages.find((p: any) => p.id === 'privacy' || p.slug === 'privacy');
          if (page) setContent(page);
        } catch (e) {}
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F7FC] text-[#1A1338] font-sans antialiased">
      <Header />

      <main className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-6">
          <span className="text-xs font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">🔒 Privacy</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#1A1338] mb-2">{content.title}</h1>
        <p className="text-xs text-gray-400 font-semibold mb-8">Last updated: {content.lastUpdated}</p>
        <div className="bg-white border border-[#EAE3F2] rounded-3xl p-6 sm:p-10 shadow-xs">
          {renderContent(content.content)}
        </div>
        <div className="mt-8 flex items-center gap-4 text-xs font-semibold text-[#68607F] flex-wrap">
          <Link href="/terms" className="hover:text-[#7147E8] transition">Terms of Service →</Link>
          <Link href="/disclaimer" className="hover:text-[#7147E8] transition">Disclaimer →</Link>
          <Link href="/refund" className="hover:text-[#7147E8] transition">Refund Policy →</Link>
        </div>
      </main>

      <style jsx global>{`
        .prose-custom h2 { font-family: Georgia, serif; font-size: 1.4rem; font-weight: 800; color: #1A1338; margin-top: 1.5rem; margin-bottom: 0.5rem; }
        .prose-custom p { color: #5B5278; font-size: 0.95rem; line-height: 1.7; margin-bottom: 1rem; }
        .prose-custom ul, .prose-custom ol { padding-left: 1.4rem; margin-bottom: 1rem; color: #5B5278; }
        .prose-custom li { margin-bottom: 0.3rem; }
        .prose-custom strong { color: #1A1338; font-weight: 800; }
      `}</style>

      <footer className="bg-white border-t border-[#EAE3F2] py-6 px-4 text-center text-xs text-[#8A829E] font-semibold mt-12">
        <p>© 2026 MoodFlip. All rights reserved.</p>
      </footer>
    </div>
  );
}
