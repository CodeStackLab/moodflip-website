'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

type Checkin = {
  id: string;
  primaryMood: string;
  subFeeling: string;
  targetMood: string;
  actionShown: string;
  createdAt: string;
};

export default function ProfilePage() {
  const [history, setHistory] = useState<Checkin[]>([]);

  useEffect(() => {
    try {
      const existing = JSON.parse(localStorage.getItem('moodflip_history') || '[]');
      setHistory(existing);
    } catch (_) {}
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2D264B]">
      <Header />
      <main className="mx-auto max-w-4xl px-6 py-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-serif text-3xl font-bold">Your Mood Profile</h1>
            <p className="text-xs text-[#6B638B]">Track your emotional check-ins &amp; 7-day progress</p>
          </div>
          <span className="rounded-full bg-[#F5F3FF] border border-[#DDD6FE] px-4 py-1.5 text-xs font-bold text-[#6C5CE7]">
            Total Check-ins: {history.length}
          </span>
        </div>

        {/* 7-DAY PROGRESS TRACKER */}
        <div className="rounded-3xl border border-[#EAE3D6] bg-white p-6 shadow-sm mb-8">
          <h2 className="font-serif text-lg font-bold mb-4">7-Day Progress Tracker</h2>
          <div className="grid grid-cols-7 gap-2 text-center">
            {[1, 2, 3, 4, 5, 6, 7].map((day) => {
              const checked = history.length >= day;
              return (
                <div
                  key={day}
                  className={`rounded-2xl p-3 border ${
                    checked
                      ? 'border-emerald-300 bg-emerald-50 text-emerald-700'
                      : 'border-[#EAE3D6] bg-[#FAF6EE] text-[#6B638B]'
                  }`}
                >
                  <span className="block text-[10px] font-bold uppercase mb-1">Day {day}</span>
                  <span className="text-base font-bold">{checked ? '✓' : '○'}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* SAVED CHECK-INS LIST */}
        <div className="rounded-3xl border border-[#EAE3D6] bg-white p-6 shadow-sm">
          <h2 className="font-serif text-lg font-bold mb-4">Saved Check-ins</h2>
          {history.length === 0 ? (
            <p className="text-xs text-[#6B638B] py-6 text-center">
              No saved check-ins yet. Try flipping your mood on the homepage and tapping &quot;Save to My Check-ins&quot;.
            </p>
          ) : (
            <div className="space-y-3">
              {history.map((item) => (
                <div key={item.id} className="rounded-2xl border border-[#EAE3D6] bg-[#FAF6EE] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-sm text-[#2D264B]">{item.subFeeling}</span>
                      <span className="text-xs text-[#6C5CE7]">→ {item.targetMood}</span>
                    </div>
                    <p className="text-xs text-[#6B638B]">{item.actionShown}</p>
                  </div>
                  <span className="text-[11px] text-[#6B638B] shrink-0">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
