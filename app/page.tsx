'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdBanner from '@/components/AdBanner';
import TrustSection from '@/components/TrustSection';
import MoreForYou from '@/components/MoreForYou';
import SiteLoader from '@/components/SiteLoader';
import { MOODS, MoodCategory, MoodItem } from '@/data/moods';

const FAQS = [
  ['Is MoodFlip completely free to use?', 'Yes! The interactive mood tool is 100% free with no account or credit card required. Tap and flip as often as you like.'],
  ['Do I need to sign up or create a profile?', 'No. You can use the full tool without signing up. An optional free account lets you save your check-ins and track 7-day emotional growth.'],
  ['Is MoodFlip therapy or medical advice?', 'No. MoodFlip is an interactive self-reflection and mindset reset tool, not therapy, clinical treatment, or crisis intervention.'],
  ['How does the 90-day automatic data cleanup work?', 'To protect your privacy, any optional saved check-ins are automatically deleted after 90 days of profile inactivity.'],
];

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<MoodCategory>('All');
  const [selectedMood, setSelectedMood] = useState<MoodItem | null>(null);
  const [selectedFeeling, setSelectedFeeling] = useState<string | null>(null);
  const [activeResult, setActiveResult] = useState<MoodItem | null>(null);
  const [actionIndex, setActionIndex] = useState<number>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const [timerRunning, setTimerRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [showWelcomePopup, setShowWelcomePopup] = useState(true);

  const filteredMoods = useMemo(() => {
    if (selectedCategory === 'All') return MOODS;
    return MOODS.filter(m => m.category === selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerRunning && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0) {
      setTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timeLeft]);

  const handleSelectMood = (item: MoodItem) => {
    setSelectedMood(item);
    setSelectedFeeling(null);
    setActiveResult(null);
  };

  const handleSelectFeeling = (feeling: string) => {
    setSelectedFeeling(feeling);
    setActiveResult(null);
  };

  const handleFlipMood = async () => {
    if (!selectedMood || !selectedFeeling) return;
    setIsFlipping(true);
    await new Promise(r => setTimeout(r, 350));
    setActiveResult(selectedMood);
    setActionIndex(0);
    setIsFlipping(false);
    setTimerRunning(false);
    setTimeLeft(60);
    setSavedSuccess(false);

    setTimeout(() => {
      document.getElementById('resultCenterCard')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  };

  const handleTryAnother = () => {
    if (!activeResult) return;
    if (activeResult.actions && activeResult.actions.length > 1) {
      setActionIndex((prev) => (prev + 1) % activeResult.actions.length);
    }
    setTimerRunning(false);
    setTimeLeft(60);
  };

  const startTimer = () => {
    if (timeLeft === 0) setTimeLeft(60);
    setTimerRunning(!timerRunning);
  };

  const handleSaveCheckin = () => {
    if (!activeResult || !selectedFeeling) return;
    try {
      const existing = JSON.parse(localStorage.getItem('moodflip_history') || '[]');
      const newEntry = {
        id: Date.now().toString(),
        primaryMood: activeResult.category,
        subFeeling: selectedFeeling,
        targetMood: activeResult.target,
        actionShown: activeResult.actions[actionIndex] || activeResult.actionTitle,
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem('moodflip_history', JSON.stringify([newEntry, ...existing]));
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (_) {}
  };

  const currentActionText = activeResult
    ? (activeResult.actions[actionIndex] || activeResult.actionDesc)
    : '';

  return (
    <>
      <SiteLoader />
      <div className="min-h-screen bg-[#FDFBF7] text-[#2D264B]">
        <Header />

        <main className="mx-auto max-w-[1340px] px-4 py-4">
          <AdBanner slot="top-banner" />

          {/* MAIN 3-COLUMN GRID */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.15fr_1fr_260px]">

            {/* LEFT SELECTION CARD */}
            <div className="flex flex-col justify-between rounded-3xl border border-[#EAE3D6] bg-white p-6 shadow-sm">
              <div>
                {/* STEP 1 HEADER */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#6C5CE7] text-xs font-black text-white">
                      1
                    </span>
                    <span className="text-xs font-black uppercase tracking-wider text-[#6C5CE7]">
                      STEP 1 · CHOOSE YOUR MOOD
                    </span>
                  </div>
                  <span className="font-serif text-sm font-bold text-[#6C5CE7] bg-[#F5F3FF] px-3 py-1 rounded-full">
                    1 of 2
                  </span>
                </div>

                <h2 className="font-serif text-2xl font-bold text-[#2D264B] mb-1">
                  How are you feeling right now?
                </h2>
                <p className="text-xs text-[#6B638B] mb-4">
                  Select the mood that feels closest to you.
                </p>

                {/* CATEGORY FILTER PILLS */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {(['All', 'Low', 'Anxious', 'Angry', 'Overwhelmed', 'Lonely'] as MoodCategory[]).map(cat => (
                    <button
                      key={cat}
                      className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-bold transition ${
                        selectedCategory === cat
                          ? 'border-[#6C5CE7] bg-[#6C5CE7] text-white shadow-sm'
                          : 'border-[#EAE3D6] bg-[#FAF6EE] text-[#4B5563] hover:border-[#C7D2FE] hover:bg-white'
                      }`}
                      onClick={() => setSelectedCategory(cat)}
                    >
                      {cat === 'All' && <span>🎛️</span>}
                      <span>{cat}</span>
                    </button>
                  ))}
                </div>

                {/* MOOD ITEMS GRID (4x3) */}
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5 mb-5">
                  {filteredMoods.map(item => {
                    const isSelected = selectedMood?.id === item.id;
                    return (
                      <button
                        key={item.id}
                        className={`flex flex-col items-center justify-center rounded-2xl p-3 border-2 transition-all ${
                          isSelected
                            ? 'border-[#6C5CE7] shadow-md -translate-y-0.5'
                            : 'border-transparent hover:border-[#DDD6FE] hover:-translate-y-0.5'
                        }`}
                        style={{ background: item.bgColor, color: item.textColor }}
                        onClick={() => handleSelectMood(item)}
                      >
                        <span className="text-2xl mb-1">{item.emoji}</span>
                        <span className="text-xs font-bold">{item.name}</span>
                      </button>
                    );
                  })}
                </div>

                {/* TIP BANNER */}
                <div className="flex items-center gap-2 rounded-xl border border-[#DDD6FE] bg-[#F5F3FF] px-3.5 py-2.5 text-xs font-semibold text-[#6C5CE7] mb-6">
                  <span>✨</span>
                  <span><strong>Tip:</strong> There&apos;s no right or wrong choice. Be honest with how you feel.</span>
                </div>

                {/* STEP 2 HEADER */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#6C5CE7] text-xs font-black text-white">
                      2
                    </span>
                    <span className="text-xs font-black uppercase tracking-wider text-[#6C5CE7]">
                      STEP 2 · PICK EXACT FEELING
                    </span>
                  </div>
                  <span className="font-serif text-sm font-bold text-[#6C5CE7] bg-[#F5F3FF] px-3 py-1 rounded-full">
                    2 of 2
                  </span>
                </div>

                {/* FEELINGS AREA */}
                {!selectedMood ? (
                  <div className="rounded-2xl border-2 dashed border-[#DDD6FE] bg-[#FDFBF7] p-5 text-center text-xs font-semibold text-[#6B638B] mb-6">
                    👆 Select a mood above to see specific feelings
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedMood.feelings.map(feel => {
                      const isSelected = selectedFeeling === feel;
                      return (
                        <button
                          key={feel}
                          className={`rounded-xl border px-3.5 py-2 text-xs font-bold transition ${
                            isSelected
                              ? 'border-[#6C5CE7] bg-[#F5F3FF] text-[#6C5CE7] shadow-sm'
                              : 'border-[#EAE3D6] bg-[#FAF6EE] text-[#2D264B] hover:border-[#6C5CE7] hover:bg-white'
                          }`}
                          onClick={() => handleSelectFeeling(feel)}
                        >
                          {feel}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* FLIP BUTTON */}
              <button
                className={`flex w-full items-center justify-center gap-2 rounded-2xl py-4 font-bold text-sm uppercase tracking-wider transition ${
                  selectedMood && selectedFeeling && !isFlipping
                    ? 'bg-gradient-to-r from-[#6C5CE7] to-[#8A7CF0] text-white shadow-lg shadow-purple-200 hover:-translate-y-0.5'
                    : 'bg-[#F5F3FF] text-[#A78BFA] cursor-not-allowed'
                }`}
                disabled={!selectedMood || !selectedFeeling || isFlipping}
                onClick={handleFlipMood}
              >
                <span>✨</span>
                <span>{isFlipping ? 'FLIPPING MOOD...' : 'FLIP MY MOOD'}</span>
                <span>→</span>
              </button>
            </div>

            {/* CENTER RESULT CARD (SUNSET / SUNRISE PANEL) */}
            <div
              id="resultCenterCard"
              className="relative flex min-h-[500px] flex-col items-center justify-center overflow-hidden rounded-3xl border border-[#EAE3D6] p-6 text-center shadow-sm"
              style={{
                background: `
                  radial-gradient(circle at 50% 30%, #FFF5D4 0%, #FFE6A3 40%, #FCD385 65%, transparent 85%),
                  linear-gradient(180deg, #FDFBF7 0%, #F9F1E2 100%)
                `,
              }}
            >
              {/* TOP ACTIONS */}
              <div className="absolute top-4 right-4 flex gap-2 z-10">
                <button className="flex items-center gap-1 rounded-full border border-black/10 bg-white/80 backdrop-blur-md px-3 py-1.5 text-xs font-bold text-[#4B5563] hover:bg-white">
                  <span>🔖</span> Save
                </button>
                <button className="flex items-center gap-1 rounded-full border border-black/10 bg-white/80 backdrop-blur-md px-3 py-1.5 text-xs font-bold text-[#4B5563] hover:bg-white">
                  <span>↗</span> Share
                </button>
              </div>

              <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-[#DDD6FE] bg-white/90 backdrop-blur-md px-3.5 py-1 text-xs font-bold text-[#6C5CE7] shadow-sm">
                <span>✓</span> Here&apos;s your positive flip
              </div>

              {!activeResult ? (
                <div className="flex flex-col items-center max-w-sm">
                  <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#FFF9E6] to-[#FFE082] border-2 border-[#FFCA28] text-4xl shadow-md">
                    🌅
                  </div>
                  <h2 className="font-serif text-3xl font-bold text-[#2D264B] mb-2">
                    Towards Calm &amp; Clarity
                  </h2>
                  <p className="text-xs text-[#6B638B] leading-relaxed">
                    You&apos;ve got this. Small steps, big shifts. Select a feeling on the left and tap FLIP MY MOOD.
                  </p>
                </div>
              ) : (
                <div className="w-full flex flex-col items-center">
                  <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#FFF9E6] to-[#FFE082] border-2 border-[#FFCA28] text-4xl shadow-md">
                    🌅
                  </div>

                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2D264B] mb-1">
                    {activeResult.target}
                  </h2>
                  <p className="text-xs text-[#6B638B] mb-6">
                    You&apos;ve got this. Small steps, big shifts.
                  </p>

                  {/* ACTION CARD */}
                  <div className="w-full rounded-2xl border border-amber-200/60 bg-white p-5 text-left shadow-md mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-[#D97706] flex items-center gap-1">
                        ✨ Your 60-Second Action
                      </span>
                      <span className="rounded-full bg-[#F3F4F6] px-2.5 py-0.5 text-[11px] font-semibold text-[#6B638B]">
                        ⏱ 60s
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-4 mb-3">
                      <button
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#6C5CE7] text-white font-bold text-base shadow-md hover:scale-105 transition"
                        onClick={startTimer}
                        title="Start timer"
                      >
                        {timerRunning ? `${timeLeft}s` : '▶'}
                      </button>
                      <div className="flex-1">
                        <h3 className="font-serif font-bold text-base text-[#2D264B]">
                          {activeResult.actionTitle}
                        </h3>
                        <p className="text-xs text-[#6B638B] leading-relaxed">
                          {currentActionText}
                        </p>
                      </div>
                      <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-full border-2 border-[#6C5CE7] bg-[#F5F3FF]">
                        <span className="text-sm font-black text-[#6C5CE7]">{timerRunning ? timeLeft : '60'}</span>
                        <span className="text-[9px] font-bold text-[#6C5CE7] uppercase">SEC</span>
                      </div>
                    </div>

                    <div className="border-t border-gray-100 pt-2.5 text-xs text-[#373153]">
                      <strong className="text-[#6C5CE7] block mb-0.5">♡ Why this helps</strong>
                      <span className="text-[#6B638B]">{activeResult.whyHelps}</span>
                    </div>
                  </div>

                  {/* BOTTOM ACTION BUTTONS */}
                  <div className="flex w-full gap-3">
                    <button
                      className="flex-1 rounded-full border border-[#6C5CE7] bg-white py-2.5 text-xs font-bold text-[#6C5CE7] hover:bg-[#F5F3FF]"
                      onClick={handleTryAnother}
                    >
                      ↺ Try Another
                    </button>
                    <button
                      className={`flex-[1.3] rounded-full py-2.5 text-xs font-bold text-white shadow-md transition ${
                        savedSuccess ? 'bg-emerald-600' : 'bg-[#6C5CE7] hover:bg-[#5B4B9A]'
                      }`}
                      onClick={handleSaveCheckin}
                    >
                      {savedSuccess ? '✅ Saved!' : '🔖 Save to My Check-ins'}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT SIDEBAR */}
            <MoreForYou />

          </div>

          <TrustSection />

          <AdBanner slot="bottom-banner" />

          {/* FAQ SECTION */}
          <section className="mt-12 max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <span className="inline-block rounded-full bg-[#F5F3FF] border border-[#DDD6FE] px-3.5 py-1 text-xs font-bold text-[#6C5CE7] uppercase tracking-wider mb-2">
                Got Questions?
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#2D264B]">
                Frequently asked questions
              </h2>
            </div>

            <div className="flex flex-col gap-3">
              {FAQS.map(([q, a], idx) => (
                <div key={idx} className="rounded-2xl border border-[#EAE3D6] bg-white shadow-sm">
                  <button
                    className="flex w-full items-center justify-between p-4 text-left font-bold text-sm text-[#2D264B]"
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  >
                    <span>{q}</span>
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F5F3FF] text-[#6C5CE7] font-bold text-base">
                      {openFaq === idx ? '−' : '+'}
                    </span>
                  </button>
                  {openFaq === idx && (
                    <div className="border-t border-[#EAE3D6] p-4 text-xs text-[#6B638B] leading-relaxed">
                      {a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* FLOATING WELCOME POPUP */}
        {showWelcomePopup && (
          <div className="fixed bottom-6 right-6 w-80 rounded-3xl border border-[#EAE3D6] bg-white p-5 shadow-xl z-50 animate-bounce-short">
            <button
              className="absolute top-3 right-3 text-lg font-bold text-gray-400 hover:text-gray-600"
              onClick={() => setShowWelcomePopup(false)}
            >
              ×
            </button>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F5F3FF] text-2xl mb-3">
              👤
            </div>
            <h3 className="font-serif font-bold text-base text-[#2D264B] mb-1">
              Welcome Back! 👋
            </h3>
            <p className="text-xs text-[#6B638B] leading-relaxed mb-4">
              Create a profile to save your mood check-ins and get personalized support.
            </p>
            <Link href="/register" className="block w-full text-center rounded-full bg-[#6C5CE7] py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#5B4B9A] mb-2">
              Create My Profile
            </Link>
            <button
              className="w-full rounded-full border border-[#EAE3D6] py-2 text-xs font-bold text-[#4B5563] hover:bg-[#FAF6EE] mb-2"
              onClick={() => setShowWelcomePopup(false)}
            >
              Maybe Later
            </button>
            <div className="text-[10px] text-center text-gray-400">It only takes 30 seconds.</div>
          </div>
        )}

        <Footer />
      </div>
    </>
  );
}
