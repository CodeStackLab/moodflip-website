'use client';

import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2D264B]">
      <Header />
      <main className="mx-auto max-w-5xl px-6 py-12">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="inline-block rounded-full bg-[#F4EBF5] border border-[#DDD6FE] px-3.5 py-1 text-xs font-bold text-[#6C5CE7] uppercase tracking-wider mb-2">
            Simple, Transparent Pricing
          </span>
          <h1 className="font-serif text-4xl font-bold mb-3">Start free. Go deeper when it&apos;s useful.</h1>
          <p className="text-sm text-[#6B638B]">
            The everyday MoodFlip tool stays free forever. A personalized plan is an optional one-time purchase.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* FREE PLAN */}
          <div className="rounded-3xl border border-[#EAE3D6] bg-[#FEF9F5] p-6 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6C5CE7]">Everyday Tool</span>
              <h3 className="font-serif text-2xl font-bold mt-1">Free</h3>
              <div className="font-serif text-3xl font-bold my-4">$0 <span className="text-xs font-normal text-[#6B638B]">forever</span></div>
              <ul className="space-y-2.5 text-xs text-[#6B638B] mb-6">
                <li>✓ Tap-only mood selection</li>
                <li>✓ Rotating 60-second actions</li>
                <li>✓ No profile required</li>
                <li>✓ Use whenever you need it</li>
              </ul>
            </div>
            <Link href="/" className="block w-full text-center rounded-full border border-[#6C5CE7] py-2.5 text-xs font-bold text-[#6C5CE7] hover:bg-[#F4EBF5]">
              Use MoodFlip free →
            </Link>
          </div>

          {/* 7-DAY PLAN */}
          <div className="rounded-3xl border-2 border-[#6C5CE7] bg-[#FEF9F5] p-6 shadow-md flex flex-col justify-between relative">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#6C5CE7] px-3 py-0.5 text-[10px] font-black uppercase tracking-wider text-white">
              Most Popular
            </span>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6C5CE7]">Personalized</span>
              <h3 className="font-serif text-2xl font-bold mt-1">7-Day Mindset Plan</h3>
              <div className="font-serif text-3xl font-bold my-4">$7 <span className="text-xs font-normal text-[#6B638B]">one time</span></div>
              <ul className="space-y-2.5 text-xs text-[#6B638B] mb-6">
                <li>✓ Custom 7-day roadmap from check-ins</li>
                <li>✓ Zero repeated actions</li>
                <li>✓ Instant PDF download</li>
                <li>✓ Automatic email backup copy</li>
              </ul>
            </div>
            <Link href="/register?redirect=/profile?tab=My%207-Day%20Plan" className="block w-full text-center rounded-full bg-[#6C5CE7] py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#5B4B9A]">
              Get my 7-day plan →
            </Link>
          </div>

          {/* 30-DAY PLAN */}
          <div className="rounded-3xl border border-[#EAE3D6] bg-[#FEF9F5] p-6 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6C5CE7]">Full Support</span>
              <h3 className="font-serif text-2xl font-bold mt-1">30-Day Master</h3>
              <div className="font-serif text-3xl font-bold my-4">$19 <span className="text-xs font-normal text-[#6B638B]">one time</span></div>
              <ul className="space-y-2.5 text-xs text-[#6B638B] mb-6">
                <li>✓ Structured 30-day habit tracker</li>
                <li>✓ 30+ custom actions per mood</li>
                <li>✓ Progress summary</li>
                <li>✓ Instant PDF email delivery</li>
              </ul>
            </div>
            <span className="block w-full text-center rounded-full border border-[#EAE3D6] py-2.5 text-xs font-bold text-[#6B638B]">
              Coming Soon
            </span>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
