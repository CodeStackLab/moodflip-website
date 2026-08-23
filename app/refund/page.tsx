'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { defaultLegalPages, LegalPage } from '@/lib/blogData';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function RefundPage() {
  const [pageData, setPageData] = useState<LegalPage>(
    defaultLegalPages.find(p => p.slug === 'refund') || {
      id: 'refund',
      slug: 'refund',
      title: 'Refund & Cancellation Policy',
      lastUpdated: 'May 15, 2026',
      content: `<h2>30-Day Money-Back Guarantee</h2>
<p>We offer a 100% 30-day money-back guarantee for all MoodFlip Premium subscriptions.</p>
<h2>How to Request a Refund</h2>
<p>Email <strong>support@moodflip.coach</strong> with your order receipt within 30 days for an immediate refund.</p>`,
    }
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('moodflip_legal_pages');
      if (saved) {
        try {
          const list: LegalPage[] = JSON.parse(saved);
          const found = list.find(p => p.slug === 'refund');
          if (found) setPageData(found);
        } catch (e) {}
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F7FC] text-[#1A1338] font-sans antialiased">
      {/* GLOBAL HEADER */}
      <Header />

      {/* HERO BANNER */}
      <div className="bg-gradient-to-br from-[#7464AC] via-[#9C8CC4] to-[#9C8CC4] text-white py-10 sm:py-14 px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-2.5">
          <span className="inline-block text-xs font-black uppercase tracking-widest bg-[#FEF9F5]/20 backdrop-blur-sm px-3.5 py-1 rounded-full">
            💳 Refund Policy
          </span>
          <h1 className="font-serif text-2xl sm:text-4xl font-extrabold leading-tight">{pageData.title}</h1>
          <p className="text-xs text-white/80 font-semibold">Last Updated: {pageData.lastUpdated}</p>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <main className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
        <div className="bg-[#FEF9F5] border border-[#E4DAD7] rounded-3xl p-5 sm:p-10 shadow-xs">
          <div
            className="prose-custom text-[#5B5278] text-sm sm:text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: pageData.content }}
          />
        </div>

        <div className="mt-8 flex items-center gap-4 text-xs font-bold text-[#5C527A] flex-wrap">
          <Link href="/terms" className="hover:text-[#7464AC] transition">Terms of Service →</Link>
          <Link href="/privacy" className="hover:text-[#7464AC] transition">Privacy Policy →</Link>
          <Link href="/disclaimer" className="hover:text-[#7464AC] transition">Medical &amp; General Disclaimer →</Link>
        </div>
      </main>

      <style jsx global>{`
        .prose-custom h2 {
          font-family: Georgia, serif;
          font-size: 1.4rem;
          font-weight: 800;
          color: #1A1338;
          margin-top: 1.75rem;
          margin-bottom: 0.5rem;
        }
        .prose-custom p {
          color: #5B5278;
          font-size: 0.95rem;
          line-height: 1.7;
          margin-bottom: 1rem;
        }
        .prose-custom ul, .prose-custom ol {
          padding-left: 1.4rem;
          margin-bottom: 1rem;
          color: #5B5278;
        }
        .prose-custom li {
          margin-bottom: 0.3rem;
        }
        .prose-custom strong {
          color: #1A1338;
          font-weight: 800;
        }
      `}</style>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
