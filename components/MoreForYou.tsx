'use client';

import React from 'react';
import Link from 'next/link';

export default function MoreForYou() {
  return (
    <aside className="flex flex-col gap-4">
      <div className="flex items-center gap-2 font-bold text-sm text-[#D97706]">
        <span>⭐</span>
        <span>More for You</span>
      </div>

      {/* 7-DAY PLAN WITH 3D BOOK COVER IMAGE */}
      <div className="rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] p-4 transition hover:-translate-y-0.5 shadow-sm text-center">
        <div className="w-24 h-32 mx-auto mb-2 flex items-center justify-center">
          <img 
            src="/7day-book-cover-3d-v6.png" 
            alt="MoodFlip 7-Day Plan Book" 
            className="w-full h-full object-contain drop-shadow-md hover:scale-105 transition-transform"
          />
        </div>
        <h4 className="font-serif font-bold text-base text-[#2D264B] mb-1">7-Day Plan</h4>
        <p className="text-xs text-[#6B638B] leading-relaxed mb-3">
          Build a better mindset starting today.
        </p>
        <Link href="/register" className="inline-block px-4 py-1.5 rounded-xl bg-[#2563EB] text-white text-xs font-bold shadow-xs hover:bg-[#1D4ED8] transition">
          View 7-Day Plan →
        </Link>
      </div>

      {/* 30-DAY PLAN */}
      <div className="rounded-2xl border border-[#99F6E4] bg-[#F0FDFA] p-4 transition hover:-translate-y-0.5 shadow-sm">
        <div className="flex items-center gap-3 mb-1.5">
          <span className="text-xl">🗓️</span>
          <h4 className="font-serif font-bold text-base text-[#2D264B]">30-Day Plan</h4>
        </div>
        <p className="text-xs text-[#6B638B] leading-relaxed mb-3">
          Go deeper. Lasting change in 30 days.
        </p>
        <span className="text-xs font-bold text-[#0D9488]">Coming Soon</span>
      </div>

      {/* DAILY REMINDERS */}
      <div className="rounded-2xl border border-[#A7F3D0] bg-[#ECFDF5] p-4 transition hover:-translate-y-0.5 shadow-sm">
        <div className="flex items-center gap-3 mb-1.5">
          <span className="text-xl">🎁</span>
          <h4 className="font-serif font-bold text-base text-[#2D264B]">Daily Reminders</h4>
        </div>
        <p className="text-xs text-[#6B638B] leading-relaxed mb-3">
          Gentle nudges for your better days.
        </p>
        <Link href="/register" className="text-xs font-bold text-[#059669] hover:underline">
          Enable →
        </Link>
      </div>

      {/* TRACK PROGRESS */}
      <div className="rounded-2xl border border-[#DDD6FE] bg-[#F4EBF5] p-4 transition hover:-translate-y-0.5 shadow-sm">
        <div className="flex items-center gap-3 mb-1.5">
          <span className="text-xl">📈</span>
          <h4 className="font-serif font-bold text-base text-[#2D264B]">Track Progress</h4>
        </div>
        <p className="text-xs text-[#6B638B] leading-relaxed mb-3">
          See how far you&apos;ve come.
        </p>
        <Link href="/profile" className="text-xs font-bold text-[#7464AC] hover:underline">
          View Profile →
        </Link>
      </div>

      {/* PRIVATE CARD */}
      <div className="rounded-2xl border border-[#EAE3D6] bg-[#FEF9F5] p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F4EBF5] text-base">
            🔒
          </span>
          <div>
            <p className="text-xs font-bold text-[#2D264B]">Your data is private</p>
            <p className="text-[11px] text-[#6B638B]">We use encryption &amp; auto-delete your data after 90 days.</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
