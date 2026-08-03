'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function UserDashboardPage() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Check-ins History
  const [checkins] = useState([
    { id: 1, mood: 'Anxious', targetMood: 'Calm & Confident', icon: '😰', targetIcon: '🟢', time: 'May 20, 2025 10:30 AM', action: 'Took 60-second action' },
    { id: 2, mood: 'Angry', targetMood: 'Peaceful', icon: '😡', targetIcon: '🟢', time: 'May 19, 2025 7:45 PM', action: 'Took 60-second action' },
    { id: 3, mood: 'Overwhelmed', targetMood: 'Organized', icon: '🌧️', targetIcon: '🟢', time: 'May 19, 2025 1:20 PM', action: 'Took 60-second action' },
    { id: 4, mood: 'Lonely', targetMood: 'Connected', icon: '💔', targetIcon: '🟢', time: 'May 18, 2025 9:10 PM', action: 'Took 60-second action' },
    { id: 5, mood: 'Stressed', targetMood: 'Relaxed', icon: '😫', targetIcon: '🟢', time: 'May 18, 2025 11:00 AM', action: 'Took 60-second action' },
  ]);

  const filteredCheckins = checkins.filter(c => 
    c.mood.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.targetMood.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F7F5FC] text-[#1A1338] font-sans antialiased flex flex-col">

      {/* MOBILE TOP NAVBAR WITH HAMBURGER BUTTON */}
      <div className="lg:hidden bg-white border-b border-[#EAE3F2] px-4 py-3 flex items-center justify-between shadow-xs sticky top-0 z-40">
        <div className="flex items-center gap-2.5">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-xl bg-[#FAF8FD] text-[#1A1338] border border-[#EAE3F2] text-lg font-bold"
            aria-label="Toggle menu"
          >
            {sidebarOpen ? '✕' : '☰'}
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#7147E8] to-[#EC4899] flex items-center justify-center text-white text-xs">
              😊
            </div>
            <span className="font-serif font-extrabold text-xl text-[#1A1338]">moodflip</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" alt="Emma" className="w-8 h-8 rounded-full object-cover border border-purple-200" />
        </div>
      </div>

      {/* MAIN CONTAINER FRAME MATCHING MOCKUP IMAGE 1 */}
      <div className="flex-1 flex overflow-hidden relative">

        {/* 1. LEFT SIDEBAR */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-50 w-[270px] bg-[#FAF8FD] border-r border-[#EAE3F2] p-5 flex flex-col justify-between shrink-0 transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="space-y-6">
            {/* DESKTOP BRAND LOGO */}
            <div className="hidden lg:flex items-center gap-2.5 px-2 pt-1">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#7147E8] via-[#A855F7] to-[#EC4899] flex items-center justify-center text-white font-bold text-lg shadow-sm">
                😊
              </div>
              <span className="font-serif text-2xl font-extrabold text-[#1A1338] tracking-tight">
                moodflip
              </span>
            </div>

            {/* NAVIGATION MENU */}
            <nav className="space-y-4">
              {/* Dashboard Main */}
              <button
                onClick={() => { setActiveTab('Dashboard'); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                  activeTab === 'Dashboard'
                    ? 'bg-gradient-to-r from-[#7147E8] to-[#8C60F7] text-white shadow-md shadow-[#7147E8]/20'
                    : 'text-[#5B5278] hover:bg-[#F0EBFA] hover:text-[#1A1338]'
                }`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>Dashboard</span>
              </button>

              {/* MOOD TOOLS SECTION */}
              <div>
                <span className="block text-[10px] font-extrabold text-[#A097B8] uppercase tracking-wider px-3.5 mb-1.5">
                  Mood Tools
                </span>
                <div className="space-y-0.5">
                  <Link href="/" className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#5B5278] hover:bg-[#F0EBFA] hover:text-[#1A1338] transition-all">
                    <span>😊</span> <span>Check-in Now</span>
                  </Link>
                  <button onClick={() => setActiveTab('Mood Library')} className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#5B5278] hover:bg-[#F0EBFA] hover:text-[#1A1338] transition-all text-left">
                    <span>🎛️</span> <span>Mood Library</span>
                  </button>
                  <button onClick={() => setActiveTab('60-Second Actions')} className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#5B5278] hover:bg-[#F0EBFA] hover:text-[#1A1338] transition-all text-left">
                    <span>⏱️</span> <span>60-Second Actions</span>
                  </button>
                  <button onClick={() => setActiveTab('My Check-ins')} className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#5B5278] hover:bg-[#F0EBFA] hover:text-[#1A1338] transition-all text-left">
                    <span>📑</span> <span>My Check-ins</span>
                  </button>
                </div>
              </div>

              {/* MY PLAN SECTION */}
              <div>
                <span className="block text-[10px] font-extrabold text-[#A097B8] uppercase tracking-wider px-3.5 mb-1.5">
                  My Plan
                </span>
                <div className="space-y-0.5">
                  <button onClick={() => setActiveTab('My 7-Day Plan')} className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#5B5278] hover:bg-[#F0EBFA] hover:text-[#1A1338] transition-all text-left">
                    <span>📅</span> <span>My 7-Day Plan</span>
                  </button>
                  <button onClick={() => setActiveTab('My 30-Day Plan')} className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#5B5278] hover:bg-[#F0EBFA] hover:text-[#1A1338] transition-all text-left">
                    <span>📅</span> <span>My 30-Day Plan</span>
                  </button>
                  <button onClick={() => setActiveTab('Downloads')} className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#5B5278] hover:bg-[#F0EBFA] hover:text-[#1A1338] transition-all text-left">
                    <span>📥</span> <span>Downloads</span>
                  </button>
                </div>
              </div>

              {/* ACCOUNT SECTION */}
              <div>
                <span className="block text-[10px] font-extrabold text-[#A097B8] uppercase tracking-wider px-3.5 mb-1.5">
                  Account
                </span>
                <div className="space-y-0.5">
                  <button onClick={() => setActiveTab('Profile Settings')} className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#5B5278] hover:bg-[#F0EBFA] hover:text-[#1A1338] transition-all text-left">
                    <span>⚙️</span> <span>Profile Settings</span>
                  </button>
                  <button onClick={() => setActiveTab('Notifications')} className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#5B5278] hover:bg-[#F0EBFA] hover:text-[#1A1338] transition-all text-left">
                    <span>🔔</span> <span>Notifications</span>
                  </button>
                  <button onClick={() => setActiveTab('Privacy & Data')} className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#5B5278] hover:bg-[#F0EBFA] hover:text-[#1A1338] transition-all text-left">
                    <span>🔒</span> <span>Privacy &amp; Data</span>
                  </button>
                  <button onClick={() => setActiveTab('Help & Support')} className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#5B5278] hover:bg-[#F0EBFA] hover:text-[#1A1338] transition-all text-left">
                    <span>❓</span> <span>Help &amp; Support</span>
                  </button>
                  <Link href="/login" className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold text-gray-500 hover:bg-rose-50 hover:text-rose-600 transition-all">
                    <span>🚪</span> <span>Logout</span>
                  </Link>
                </div>
              </div>
            </nav>
          </div>

          {/* SIDEBAR BOTTOM PROMO CARD WITH OFFICIAL 3D BOOK IMAGE (7day-plan-book.png) */}
          <div className="mt-6 relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#F7F4FD] to-[#EFE8FC] p-4 text-center border border-[#E3D9F8] shadow-sm">
            {/* 3D BOOK COVER IMAGE (7day-plan-book.png) */}
            <div className="w-28 h-36 mx-auto mb-2 flex items-center justify-center">
              <img 
                src="/7day-plan-book.png" 
                alt="MoodFlip 7-Day Plan Book" 
                className="w-full h-full object-contain drop-shadow-md hover:scale-105 transition-transform"
              />
            </div>
            <h4 className="font-serif font-extrabold text-sm text-[#1A1338] mb-1">
              Build a Better Mindset
            </h4>
            <p className="text-[11px] text-[#5B5278] leading-snug mb-3">
              Get your personalized 7-Day plan and start transforming your days.
            </p>
            <Link 
              href="/pricing" 
              className="w-full block py-2 px-3 rounded-xl bg-gradient-to-r from-[#7147E8] to-[#9333EA] text-white text-xs font-bold shadow-xs hover:opacity-95 transition"
            >
              Upgrade Now
            </Link>
          </div>
        </aside>

        {/* MOBILE OVERLAY BACKDROP */}
        {sidebarOpen && (
          <div 
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 lg:hidden"
          />
        )}

        {/* 2. MAIN USER DASHBOARD CONTENT AREA */}
        <main className="flex-1 p-4 md:p-8 bg-[#FAF9FE] flex flex-col gap-6 overflow-y-auto w-full">

          {/* TOP SEARCH & PROFILE HEADER BAR */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-3 md:p-4 rounded-2xl border border-[#EAE3F2] shadow-xs">
            {/* Search Input */}
            <div className="relative w-full sm:w-[420px]">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
              <input
                type="text"
                placeholder="Search moods, actions, or insights..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#F5F2FA] border border-[#EBE5F5] rounded-xl pl-10 pr-10 py-2 text-xs text-[#1A1338] placeholder-gray-400 focus:outline-none focus:border-[#7147E8] focus:bg-white transition-all"
              />
            </div>

            {/* Top Right Controls & Profile */}
            <div className="flex items-center gap-3 self-end sm:self-auto">
              <button 
                onClick={() => alert('Notifications (3): 7-Day streak reminder, new gratitude action available!')}
                className="relative w-9 h-9 rounded-xl bg-[#F5F2FA] border border-[#EBE5F5] flex items-center justify-center text-sm text-[#5B5278] hover:bg-[#EBE4F7] transition-all cursor-pointer"
              >
                🔔
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#EC4899] text-white text-[9px] font-extrabold rounded-full flex items-center justify-center">3</span>
              </button>
              <div className="h-6 w-px bg-gray-200 mx-1" />
              <div className="flex items-center gap-2.5 pl-1 cursor-pointer">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" alt="Emma Johnson" className="w-9 h-9 rounded-full object-cover border border-purple-200" />
                <div className="text-left hidden sm:block">
                  <span className="block text-xs font-bold text-[#1A1338]">Emma Johnson</span>
                  <span className="block text-[10px] text-[#7147E8] font-semibold">View Profile ˅</span>
                </div>
              </div>
            </div>
          </div>

          {/* HERO WELCOME ROW */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="font-serif text-2xl md:text-3xl font-extrabold text-[#1A1338] tracking-tight">
                Welcome back, Emma! 👋
              </h1>
              <p className="text-xs md:text-sm text-[#68607F] font-medium mt-0.5">
                You&apos;ve taken 12 steps toward a better you this week.
              </p>
            </div>
            <Link 
              href="/"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#7147E8] to-[#9333EA] text-white text-xs font-extrabold shadow-md shadow-[#7147E8]/20 hover:opacity-95 transition flex items-center gap-2 self-start sm:self-auto"
            >
              <span>✨</span> Check-in Now
            </Link>
          </div>

          {/* TOP 4 STATS CARDS MATCHING MOCKUP IMAGE 1 */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Stat 1 */}
            <div className="bg-white border border-[#EAE3F2] rounded-2xl p-4 shadow-xs flex items-center gap-3.5 hover:shadow-md transition-all">
              <div className="w-11 h-11 rounded-2xl bg-[#7147E8]/10 text-[#7147E8] flex items-center justify-center text-xl shrink-0">
                📅
              </div>
              <div>
                <span className="block text-[11px] font-bold text-[#68607F]">Total Check-ins</span>
                <div className="font-serif text-2xl font-extrabold text-[#1A1338]">24</div>
                <span className="text-[10px] text-gray-400 font-medium">This month</span>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="bg-white border border-[#EAE3F2] rounded-2xl p-4 shadow-xs flex items-center gap-3.5 hover:shadow-md transition-all">
              <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl shrink-0">
                📈
              </div>
              <div>
                <span className="block text-[11px] font-bold text-[#68607F]">This Week</span>
                <div className="font-serif text-2xl font-extrabold text-[#1A1338]">12</div>
                <span className="text-[10px] text-gray-400 font-medium">Check-ins</span>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="bg-white border border-[#EAE3F2] rounded-2xl p-4 shadow-xs flex items-center gap-3.5 hover:shadow-md transition-all">
              <div className="w-11 h-11 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center text-xl shrink-0">
                ❤️
              </div>
              <div>
                <span className="block text-[11px] font-bold text-[#68607F]">Current Streak</span>
                <div className="font-serif text-2xl font-extrabold text-[#1A1338]">5</div>
                <span className="text-[10px] text-gray-400 font-medium">Days</span>
              </div>
            </div>

            {/* Stat 4 */}
            <div className="bg-white border border-[#EAE3F2] rounded-2xl p-4 shadow-xs flex items-center gap-3.5 hover:shadow-md transition-all">
              <div className="w-11 h-11 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center text-xl shrink-0">
                ⭐
              </div>
              <div>
                <span className="block text-[11px] font-bold text-[#68607F]">Total Actions Taken</span>
                <div className="font-serif text-2xl font-extrabold text-[#1A1338]">36</div>
                <span className="text-[10px] text-gray-400 font-medium">60-second actions</span>
              </div>
            </div>
          </div>

          {/* MIDDLE CONTENT SECTION (3 COLUMNS MATCHING MOCKUP IMAGE 1) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

            {/* COLUMN 1: RECENT CHECK-INS CARD (5 Columns) */}
            <div className="lg:col-span-5 bg-white border border-[#EAE3F2] rounded-2xl p-5 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif font-bold text-base text-[#1A1338]">Recent Check-ins</h3>
                <button onClick={() => setActiveTab('My Check-ins')} className="text-xs font-bold text-[#7147E8] hover:underline cursor-pointer">View all</button>
              </div>

              <div className="space-y-3">
                {filteredCheckins.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-[#FAF8FD] border border-[#F0EBFA] hover:bg-[#F3EEFC] transition-all">
                    <div className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-full bg-white border border-purple-100 flex items-center justify-center text-base shadow-xs">
                        {item.icon}
                      </span>
                      <div>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-[#1A1338]">
                          <span>{item.mood}</span>
                          <span className="text-[#7147E8]">➔</span>
                          <span className="text-emerald-600">{item.targetMood}</span>
                        </div>
                        <span className="text-[11px] text-[#68607F] font-medium block">{item.action}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-gray-400 block">{item.time}</span>
                      <span className="text-xs text-gray-300">›</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* COLUMN 2: MOOD INSIGHTS DONUT CARD (4 Columns) */}
            <div className="lg:col-span-4 bg-white border border-[#EAE3F2] rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif font-bold text-base text-[#1A1338]">Mood Insights</h3>
                <div className="border border-gray-200 rounded-lg px-2 py-1 text-xs font-semibold text-gray-600 flex items-center gap-1 cursor-pointer">
                  This Month <span className="text-[9px]">˅</span>
                </div>
              </div>

              {/* Donut Chart */}
              <div className="flex items-center justify-center gap-6 my-auto">
                <div className="relative w-36 h-36 shrink-0 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="38" fill="none" stroke="#10B981" strokeWidth="18" strokeDasharray="238.7" strokeDashoffset="0" />
                    <circle cx="50" cy="50" r="38" fill="none" stroke="#EC4899" strokeWidth="18" strokeDasharray="238.7" strokeDashoffset="24" />
                    <circle cx="50" cy="50" r="38" fill="none" stroke="#3B82F6" strokeWidth="18" strokeDasharray="238.7" strokeDashoffset="60" />
                    <circle cx="50" cy="50" r="38" fill="none" stroke="#F97316" strokeWidth="18" strokeDasharray="238.7" strokeDashoffset="108" />
                    <circle cx="50" cy="50" r="38" fill="none" stroke="#7147E8" strokeWidth="18" strokeDasharray="238.7" strokeDashoffset="168" />
                  </svg>
                  <div className="absolute text-center">
                    <span className="block font-serif font-extrabold text-xs text-[#1A1338]">Your</span>
                    <span className="block font-serif font-extrabold text-xs text-[#1A1338]">Moods</span>
                  </div>
                </div>

                <div className="space-y-1.5 text-[11px] font-semibold text-[#5B5278] flex-1">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#7147E8]" /> Anxious</span>
                    <strong className="text-[#1A1338]">30%</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#F97316]" /> Stressed</span>
                    <strong className="text-[#1A1338]">25%</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]" /> Overwhelmed</span>
                    <strong className="text-[#1A1338]">20%</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#EC4899]" /> Angry</span>
                    <strong className="text-[#1A1338]">15%</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" /> Others</span>
                    <strong className="text-[#1A1338]">10%</strong>
                  </div>
                </div>
              </div>

              {/* Bottom Tip Banner */}
              <div className="rounded-xl bg-[#F4EFFC] border border-[#E7DDFA] p-3 text-xs text-[#5B5278] flex items-start gap-2">
                <span className="text-sm">✨</span>
                <div>
                  <strong className="block text-[#1A1338] font-bold">Great job being consistent!</strong>
                  <span className="text-[11px]">Your top mood this month is Anxious. Keep using your 60-second actions.</span>
                </div>
              </div>
            </div>

            {/* COLUMN 3: RIGHT SIDE CARDS (3 Columns) */}
            <div className="lg:col-span-3 space-y-4">

              {/* DAILY MOTIVATION CARD WITH SUNSET BACKGROUND (user-bg-sunset.jpg) */}
              <div 
                className="relative overflow-hidden rounded-2xl border border-[#EAE3D6] p-5 shadow-xs flex flex-col justify-between min-h-[160px] bg-cover bg-center text-center"
                style={{ backgroundImage: "url('/user-bg-sunset.jpg')" }}
              >
                <div className="absolute inset-0 bg-white/40 pointer-events-none" />
                <div className="relative z-10 my-auto">
                  <span className="block text-[11px] font-bold text-[#68607F] uppercase tracking-wider mb-1">Daily Motivation</span>
                  <p className="font-serif font-extrabold text-sm text-[#1A1338] leading-relaxed max-w-[200px] mx-auto">
                    &quot;Small steps today create a better you tomorrow.&quot; 💕
                  </p>
                </div>
              </div>

              {/* QUICK ACTIONS CARD */}
              <div className="bg-white border border-[#EAE3F2] rounded-2xl p-4 shadow-xs space-y-2">
                <h4 className="font-serif font-bold text-sm text-[#1A1338] mb-2 px-1">Quick Actions</h4>
                
                <Link href="/" className="flex items-center justify-between p-2.5 rounded-xl bg-[#FAF8FD] hover:bg-[#F0EBFA] transition-all">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-purple-100 text-[#7147E8] flex items-center justify-center text-xs">😊</span>
                    <div>
                      <strong className="block text-xs font-bold text-[#1A1338]">Check-in Now</strong>
                      <span className="text-[10px] text-gray-400">How are you feeling?</span>
                    </div>
                  </div>
                  <span className="text-xs text-gray-300">›</span>
                </Link>

                <button onClick={() => setActiveTab('Mood Library')} className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#FAF8FD] hover:bg-[#F0EBFA] transition-all text-left">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center text-xs">🎛️</span>
                    <div>
                      <strong className="block text-xs font-bold text-[#1A1338]">Mood Library</strong>
                      <span className="text-[10px] text-gray-400">Explore all moods</span>
                    </div>
                  </div>
                  <span className="text-xs text-gray-300">›</span>
                </button>

                <button onClick={() => setActiveTab('My 7-Day Plan')} className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#FAF8FD] hover:bg-[#F0EBFA] transition-all text-left">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs">📅</span>
                    <div>
                      <strong className="block text-xs font-bold text-[#1A1338]">My 7-Day Plan</strong>
                      <span className="text-[10px] text-gray-400">Continue your plan</span>
                    </div>
                  </div>
                  <span className="text-xs text-gray-300">›</span>
                </button>

                <button onClick={() => setActiveTab('Downloads')} className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#FAF8FD] hover:bg-[#F0EBFA] transition-all text-left">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center text-xs">📥</span>
                    <div>
                      <strong className="block text-xs font-bold text-[#1A1338]">Downloads</strong>
                      <span className="text-[10px] text-gray-400">View your plans</span>
                    </div>
                  </div>
                  <span className="text-xs text-gray-300">›</span>
                </button>
              </div>

              {/* UPGRADE BANNER */}
              <div className="rounded-2xl bg-gradient-to-r from-[#7147E8] to-[#9333EA] p-4 text-white shadow-md space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-base">🎁</span>
                  <strong className="text-xs font-bold">Upgrade to 7-Day Plan</strong>
                </div>
                <p className="text-[11px] text-white/90 leading-relaxed">
                  Get personalized daily guidance, actions &amp; printable PDF.
                </p>
                <Link href="/pricing" className="block w-full text-center py-2 rounded-xl bg-white text-[#7147E8] text-xs font-extrabold shadow-xs hover:bg-gray-50 transition">
                  Upgrade Now
                </Link>
              </div>

              {/* YOUR CURRENT PLAN */}
              <div className="bg-white border border-[#EAE3F2] rounded-2xl p-4 shadow-xs space-y-3">
                <span className="block text-[11px] font-bold text-[#68607F]">Your Current Plan</span>
                <div className="flex items-center justify-between">
                  <div>
                    <strong className="block text-xs font-bold text-[#1A1338]">7-Day Plan</strong>
                    <span className="text-[10px] text-gray-400 font-medium">Day 3 of 7</span>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-purple-100 text-[#7147E8] flex items-center justify-center text-sm">📅</div>
                </div>

                {/* Progress bar */}
                <div className="space-y-1">
                  <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div className="bg-[#7147E8] h-2 rounded-full w-[43%]" />
                  </div>
                  <div className="text-right text-[10px] font-bold text-gray-400">43%</div>
                </div>

                <button onClick={() => setActiveTab('My 7-Day Plan')} className="w-full py-2 rounded-xl bg-[#FAF8FD] border border-[#EAE3F2] text-[#7147E8] text-xs font-bold hover:bg-[#F0EBFA] transition">
                  Continue Plan
                </button>
              </div>

            </div>

          </div>

          {/* RECOMMENDED FOR YOU ROW */}
          <div className="bg-white border border-[#EAE3F2] rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-bold text-base text-[#1A1338]">Recommended For You</h3>
              <button className="text-xs font-bold text-[#7147E8] hover:underline">View all ˅</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-[#FAF8FD] border border-[#F0EBFA] flex items-start gap-3.5 hover:shadow-sm transition-all">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-base shrink-0">🍃</div>
                <div>
                  <strong className="block text-xs font-bold text-[#1A1338] mb-0.5">Try Gratitude</strong>
                  <span className="block text-[10px] text-[#7147E8] font-semibold mb-1">60-Second Action</span>
                  <p className="text-[11px] text-[#68607F] leading-relaxed mb-2">A simple gratitude practice can boost your mood instantly.</p>
                  <Link href="/" className="text-xs font-extrabold text-[#7147E8] hover:underline">Try Now →</Link>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF8FD] border border-[#F0EBFA] flex items-start gap-3.5 hover:shadow-sm transition-all">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#7147E8] flex items-center justify-center text-base shrink-0">🧘</div>
                <div>
                  <strong className="block text-xs font-bold text-[#1A1338] mb-0.5">Deep Breathing</strong>
                  <span className="block text-[10px] text-[#7147E8] font-semibold mb-1">60-Second Action</span>
                  <p className="text-[11px] text-[#68607F] leading-relaxed mb-2">Calm your mind and body with this powerful breathing exercise.</p>
                  <Link href="/" className="text-xs font-extrabold text-[#7147E8] hover:underline">Try Now →</Link>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF8FD] border border-[#F0EBFA] flex items-start gap-3.5 hover:shadow-sm transition-all">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center text-base shrink-0">☀️</div>
                <div>
                  <strong className="block text-xs font-bold text-[#1A1338] mb-0.5">Morning Mindset</strong>
                  <span className="block text-[10px] text-[#7147E8] font-semibold mb-1">60-Second Action</span>
                  <p className="text-[11px] text-[#68607F] leading-relaxed mb-2">Start your day with positivity and set the right tone.</p>
                  <Link href="/" className="text-xs font-extrabold text-[#7147E8] hover:underline">Try Now →</Link>
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM PRIVACY BANNER */}
          <div className="bg-[#FAF8FD] border border-[#EAE3F2] rounded-xl p-3 text-center text-xs font-medium text-[#68607F]">
            🔒 Your data is private and secure. We automatically delete inactive data after 90 days.
          </div>

        </main>

      </div>
    </div>
  );
}
