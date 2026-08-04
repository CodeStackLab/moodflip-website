'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function UserDashboardPage() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: 'Emma Johnson',
    email: 'emma.johnson@example.com',
    bio: 'Finding calm and clarity one daily mindset shift at a time.',
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get('tab');
      if (tabParam) {
        setActiveTab(tabParam);
      }
    }
  }, []);

  const changeTab = (tabName: string) => {
    setActiveTab(tabName);
    setSidebarOpen(false);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('tab', tabName);
      window.history.pushState({}, '', url.toString());
    }
  };

  // Mock data
  const checkins = [
    { id: 1, mood: 'Anxious', targetMood: 'Calm & Confident', icon: '😰', targetIcon: '🟢', time: 'May 20, 2026 10:30 AM', action: 'Took 60-second breathing action' },
    { id: 2, mood: 'Angry', targetMood: 'Peaceful', icon: '😡', targetIcon: '🟢', time: 'May 19, 2026 7:45 PM', action: 'Took 60-second release action' },
    { id: 3, mood: 'Overwhelmed', targetMood: 'Organized', icon: '🌧️', targetIcon: '🟢', time: 'May 19, 2026 1:20 PM', action: 'Took 60-second grounding action' },
    { id: 4, mood: 'Lonely', targetMood: 'Connected', icon: '💔', targetIcon: '🟢', time: 'May 18, 2026 9:10 PM', action: 'Took 60-second reflection action' },
    { id: 5, mood: 'Stressed', targetMood: 'Relaxed', icon: '😫', targetIcon: '🟢', time: 'May 18, 2026 11:00 AM', action: 'Took 60-second gratitude action' },
  ];

  const filteredCheckins = checkins.filter(c => 
    c.mood.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.targetMood.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

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
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#7147E8] via-[#A855F7] to-[#EC4899] flex items-center justify-center text-white text-xs shadow-xs">
              😊
            </div>
            <span className="font-serif font-extrabold text-xl text-[#1A1338]">mood<span className="text-[#7147E8]">flip</span></span>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/admin" className="px-2.5 py-1 rounded-xl bg-[#7147E8] text-white font-bold text-xs shadow-xs">
            ⚙️ Admin
          </Link>
          <Link href="/" className="px-2.5 py-1 rounded-xl bg-[#F0EBFA] border border-[#E0D4F7] text-[#7147E8] font-bold text-xs">
            🏠 Home
          </Link>
        </div>
      </div>

      {/* MAIN CONTAINER FRAME */}
      <div className="flex-1 flex overflow-hidden relative">

        {/* 1. LEFT SIDEBAR */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-50 w-[270px] bg-[#FAF8FD] border-r border-[#EAE3F2] p-5 flex flex-col justify-between shrink-0 transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="space-y-4">
            {/* DESKTOP BRAND LOGO */}
            <div className="hidden lg:flex items-center gap-2.5 px-2 pt-1 mb-2">
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#7147E8] via-[#A855F7] to-[#EC4899] flex items-center justify-center text-white font-bold text-base shadow-xs group-hover:scale-105 transition-transform">
                  😊
                </div>
                <span className="font-serif text-2xl font-extrabold text-[#1A1338] tracking-tight">
                  mood<span className="text-[#7147e8]">flip</span>
                </span>
              </Link>
            </div>

            {/* QUICK ROUTE BUTTONS: HOMEPAGE & ADMIN */}
            <div className="space-y-1.5">
              <Link
                href="/"
                className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl text-xs font-extrabold text-[#7147E8] bg-[#F0EBFA] hover:bg-[#E4DAF9] transition-all border border-[#E0D4F7] shadow-xs"
              >
                <span>🏠 Back to Homepage</span>
              </Link>
              <Link
                href="/admin"
                className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl text-xs font-extrabold text-white bg-gradient-to-r from-[#7147E8] to-[#9333EA] hover:opacity-95 transition-all shadow-xs"
              >
                <span>⚙️ Switch to Admin Dashboard</span>
              </Link>
            </div>

            {/* NAVIGATION MENU */}
            <nav className="space-y-4 pt-1">
              {/* Dashboard Main */}
              <button
                onClick={() => changeTab('Dashboard')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                  activeTab === 'Dashboard'
                    ? 'bg-gradient-to-r from-[#7147E8] to-[#8C60F7] text-white shadow-md shadow-[#7147E8]/20'
                    : 'text-[#5B5278] hover:bg-[#F0EBFA] hover:text-[#1A1338]'
                }`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 001 1v4a1 1 0 001 1m-6 0h6" />
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
                  <button 
                    onClick={() => changeTab('Mood Library')} 
                    className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all text-left ${activeTab === 'Mood Library' ? 'bg-[#F0EBFA] text-[#7147E8] font-bold' : 'text-[#5B5278] hover:bg-[#F0EBFA] hover:text-[#1A1338]'}`}
                  >
                    <span>🎛️</span> <span>Mood Library</span>
                  </button>
                  <button 
                    onClick={() => changeTab('60-Second Actions')} 
                    className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all text-left ${activeTab === '60-Second Actions' ? 'bg-[#F0EBFA] text-[#7147E8] font-bold' : 'text-[#5B5278] hover:bg-[#F0EBFA] hover:text-[#1A1338]'}`}
                  >
                    <span>⏱️</span> <span>60-Second Actions</span>
                  </button>
                  <button 
                    onClick={() => changeTab('My Check-ins')} 
                    className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all text-left ${activeTab === 'My Check-ins' ? 'bg-[#F0EBFA] text-[#7147E8] font-bold' : 'text-[#5B5278] hover:bg-[#F0EBFA] hover:text-[#1A1338]'}`}
                  >
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
                  <button 
                    onClick={() => changeTab('My 7-Day Plan')} 
                    className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all text-left ${activeTab === 'My 7-Day Plan' ? 'bg-[#F0EBFA] text-[#7147E8] font-bold' : 'text-[#5B5278] hover:bg-[#F0EBFA] hover:text-[#1A1338]'}`}
                  >
                    <span>📅</span> <span>My 7-Day Plan</span>
                  </button>
                  <button 
                    onClick={() => changeTab('My 30-Day Plan')} 
                    className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all text-left ${activeTab === 'My 30-Day Plan' ? 'bg-[#F0EBFA] text-[#7147E8] font-bold' : 'text-[#5B5278] hover:bg-[#F0EBFA] hover:text-[#1A1338]'}`}
                  >
                    <span>🗓️</span> <span>My 30-Day Plan</span>
                  </button>
                  <button 
                    onClick={() => changeTab('Downloads')} 
                    className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all text-left ${activeTab === 'Downloads' ? 'bg-[#F0EBFA] text-[#7147E8] font-bold' : 'text-[#5B5278] hover:bg-[#F0EBFA] hover:text-[#1A1338]'}`}
                  >
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
                  <button 
                    onClick={() => changeTab('Profile Settings')} 
                    className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all text-left ${activeTab === 'Profile Settings' ? 'bg-[#F0EBFA] text-[#7147E8] font-bold' : 'text-[#5B5278] hover:bg-[#F0EBFA] hover:text-[#1A1338]'}`}
                  >
                    <span>⚙️</span> <span>Profile Settings</span>
                  </button>
                  <button 
                    onClick={() => changeTab('Notifications')} 
                    className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all text-left ${activeTab === 'Notifications' ? 'bg-[#F0EBFA] text-[#7147E8] font-bold' : 'text-[#5B5278] hover:bg-[#F0EBFA] hover:text-[#1A1338]'}`}
                  >
                    <span>🔔</span> <span>Notifications</span>
                  </button>
                  <button 
                    onClick={() => changeTab('Privacy & Data')} 
                    className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all text-left ${activeTab === 'Privacy & Data' ? 'bg-[#F0EBFA] text-[#7147E8] font-bold' : 'text-[#5B5278] hover:bg-[#F0EBFA] hover:text-[#1A1338]'}`}
                  >
                    <span>🔒</span> <span>Privacy &amp; Data</span>
                  </button>
                  <button 
                    onClick={() => changeTab('Help & Support')} 
                    className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all text-left ${activeTab === 'Help & Support' ? 'bg-[#F0EBFA] text-[#7147E8] font-bold' : 'text-[#5B5278] hover:bg-[#F0EBFA] hover:text-[#1A1338]'}`}
                  >
                    <span>❓</span> <span>Help &amp; Support</span>
                  </button>
                  <Link href="/login" className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold text-gray-500 hover:bg-rose-50 hover:text-rose-600 transition-all">
                    <span>🚪</span> <span>Logout</span>
                  </Link>
                </div>
              </div>
            </nav>
          </div>

          {/* SIDEBAR BOTTOM PROMO CARD WITH OFFICIAL 3D BOOK COVER IMAGE */}
          <div className="mt-6 relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#F7F4FD] to-[#EFE8FC] p-4 text-center border border-[#E3D9F8] shadow-xs">
            <div className="w-28 h-36 mx-auto mb-2 flex items-center justify-center">
              <img 
                src="/7day-book-cover-3d-v6.png" 
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
            <button 
              onClick={() => changeTab('My 7-Day Plan')}
              className="w-full block py-2 px-3 rounded-xl bg-gradient-to-r from-[#7147E8] to-[#9333EA] text-white text-xs font-bold shadow-xs hover:opacity-95 transition"
            >
              View Plan Now
            </button>
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
                placeholder="Search moods, actions, or plans..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#F5F2FA] border border-[#EBE5F5] rounded-xl pl-10 pr-10 py-2 text-xs text-[#1A1338] placeholder-gray-400 focus:outline-none focus:border-[#7147E8] focus:bg-white transition-all"
              />
            </div>

            {/* Top Right Controls & Profile */}
            <div className="flex items-center gap-3 self-end sm:self-auto">
              <button 
                onClick={() => changeTab('Notifications')}
                className="relative w-9 h-9 rounded-xl bg-[#F5F2FA] border border-[#EBE5F5] flex items-center justify-center text-sm text-[#5B5278] hover:bg-[#EBE4F7] transition-all cursor-pointer"
                title="View Notifications"
              >
                🔔
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#EC4899] text-white text-[9px] font-extrabold rounded-full flex items-center justify-center">3</span>
              </button>
              <div className="h-6 w-px bg-gray-200 mx-1" />
              <div onClick={() => changeTab('Profile Settings')} className="flex items-center gap-2.5 pl-1 cursor-pointer group">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" alt="Emma Johnson" className="w-9 h-9 rounded-full object-cover border border-purple-200 group-hover:border-[#7147E8] transition-all" />
                <div className="text-left hidden sm:block">
                  <span className="block text-xs font-bold text-[#1A1338] group-hover:text-[#7147E8] transition-colors">{userProfile.name}</span>
                  <span className="block text-[10px] text-[#7147E8] font-semibold">User Dashboard</span>
                </div>
              </div>
            </div>
          </div>

          {/* DYNAMIC TAB CONTENT RENDERER */}
          {activeTab === 'Dashboard' && (
            <>
              {/* HERO WELCOME ROW */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="font-serif text-2xl md:text-3xl font-extrabold text-[#1A1338] tracking-tight">
                    Welcome back, {userProfile.name.split(' ')[0]}! 👋
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

              {/* TOP 4 STATS CARDS */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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

              {/* MIDDLE CONTENT SECTION */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                {/* COLUMN 1: RECENT CHECK-INS CARD */}
                <div className="lg:col-span-5 bg-white border border-[#EAE3F2] rounded-2xl p-5 shadow-xs flex flex-col space-y-3 self-start">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-serif font-bold text-base text-[#1A1338]">Recent Check-ins</h3>
                    <button onClick={() => changeTab('My Check-ins')} className="text-xs font-bold text-[#7147E8] hover:underline cursor-pointer">View all</button>
                  </div>

                  <div className="space-y-2.5">
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

                {/* COLUMN 2: MOOD INSIGHTS DONUT CARD */}
                <div className="lg:col-span-4 bg-white border border-[#EAE3F2] rounded-2xl p-5 shadow-xs flex flex-col space-y-4 self-start">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif font-bold text-base text-[#1A1338]">Mood Insights</h3>
                    <div className="border border-gray-200 rounded-lg px-2 py-1 text-xs font-semibold text-gray-600 flex items-center gap-1 cursor-pointer">
                      This Month <span className="text-[9px]">˅</span>
                    </div>
                  </div>

                  {/* Donut Chart */}
                  <div className="flex items-center justify-center gap-6 py-2">
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

                  <div className="rounded-xl bg-[#F4EFFC] border border-[#E7DDFA] p-3 text-xs text-[#5B5278] flex items-start gap-2">
                    <span className="text-sm">✨</span>
                    <div>
                      <strong className="block text-[#1A1338] font-bold">Great job being consistent!</strong>
                      <span className="text-[11px]">Your top mood this month is Anxious. Keep using your 60-second actions.</span>
                    </div>
                  </div>
                </div>

                {/* COLUMN 3: RIGHT SIDE CARDS */}
                <div className="lg:col-span-3 space-y-4">
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

                    <button onClick={() => changeTab('Mood Library')} className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#FAF8FD] hover:bg-[#F0EBFA] transition-all text-left">
                      <div className="flex items-center gap-2.5">
                        <span className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center text-xs">🎛️</span>
                        <div>
                          <strong className="block text-xs font-bold text-[#1A1338]">Mood Library</strong>
                          <span className="text-[10px] text-gray-400">Explore all moods</span>
                        </div>
                      </div>
                      <span className="text-xs text-gray-300">›</span>
                    </button>

                    <button onClick={() => changeTab('My 7-Day Plan')} className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#FAF8FD] hover:bg-[#F0EBFA] transition-all text-left">
                      <div className="flex items-center gap-2.5">
                        <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs">📅</span>
                        <div>
                          <strong className="block text-xs font-bold text-[#1A1338]">My 7-Day Plan</strong>
                          <span className="text-[10px] text-gray-400">Continue your plan</span>
                        </div>
                      </div>
                      <span className="text-xs text-gray-300">›</span>
                    </button>

                    <button onClick={() => changeTab('Downloads')} className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#FAF8FD] hover:bg-[#F0EBFA] transition-all text-left">
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
                </div>
              </div>
            </>
          )}

          {/* TAB 2: MOOD LIBRARY */}
          {activeTab === 'Mood Library' && (
            <div className="bg-white border border-[#EAE3F2] rounded-2xl p-6 shadow-xs space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#EAE3F2] pb-4">
                <div>
                  <h2 className="font-serif text-2xl font-extrabold text-[#1A1338]">Mood Library 🎛️</h2>
                  <p className="text-xs text-[#68607F] mt-1">Browse all supported mood categories and flip your mindset instantly.</p>
                </div>
                <Link href="/" className="px-4 py-2 rounded-xl bg-[#7147E8] text-white text-xs font-extrabold shadow-xs hover:opacity-95">
                  Start New Check-in
                </Link>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {[
                  { name: 'Sad', emoji: '😢', tone: 'Low', target: 'Hopeful & Calm' },
                  { name: 'Hopeless', emoji: '☁️', tone: 'Low', target: 'Inspired' },
                  { name: 'Anxious', emoji: '🫀', tone: 'Anxious', target: 'Calm & Grounded' },
                  { name: 'Worried', emoji: '🌧️', tone: 'Anxious', target: 'Reassured' },
                  { name: 'Stressed', emoji: '⚡', tone: 'Overwhelmed', target: 'Relaxed' },
                  { name: 'Angry', emoji: '😡', tone: 'Angry', target: 'Peaceful' },
                  { name: 'Lonely', emoji: '🧍', tone: 'Lonely', target: 'Connected' },
                  { name: 'Frustrated', emoji: '💢', tone: 'Angry', target: 'Focused' },
                  { name: 'Insecure', emoji: '🛡️', tone: 'Anxious', target: 'Confident' },
                  { name: 'Guilty', emoji: '😞', tone: 'Low', target: 'Forgiven & Free' },
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#FAF8FD] border border-[#F0EBFA] hover:border-[#7147E8] transition-all flex flex-col justify-between space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl">{item.emoji}</span>
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-purple-100 text-[#7147E8]">{item.tone}</span>
                    </div>
                    <div>
                      <strong className="block text-sm font-bold text-[#1A1338]">{item.name}</strong>
                      <span className="text-[11px] text-emerald-600 font-semibold">➔ {item.target}</span>
                    </div>
                    <Link href="/" className="w-full text-center py-1.5 rounded-xl bg-white border border-[#EAE3F2] text-xs font-bold text-[#7147E8] hover:bg-[#F0EBFA] transition">
                      Flip Mood
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: 60-SECOND ACTIONS */}
          {activeTab === '60-Second Actions' && (
            <div className="bg-white border border-[#EAE3F2] rounded-2xl p-6 shadow-xs space-y-6">
              <div>
                <h2 className="font-serif text-2xl font-extrabold text-[#1A1338]">60-Second Micro-Actions ⏱️</h2>
                <p className="text-xs text-[#68607F] mt-1">Short, research-backed actions to shift your energy in under 1 minute.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {[
                  { title: '4-7-8 Breathing Reset', icon: '🧘', color: 'bg-emerald-50 text-emerald-700 border-emerald-100', desc: 'Inhale 4s, hold 7s, exhale 8s to calm nervous system.' },
                  { title: 'Gratitude Reflection', icon: '🍃', color: 'bg-amber-50 text-amber-700 border-amber-100', desc: 'Name 3 small things that went right today.' },
                  { title: '5-4-3-2-1 Grounding', icon: '👁️', color: 'bg-sky-50 text-sky-700 border-sky-100', desc: 'Notice 5 things you see, 4 you can touch, 3 you hear.' },
                  { title: 'Positive Affirmation', icon: '✨', color: 'bg-purple-50 text-purple-700 border-purple-100', desc: 'Repeat: "I am doing my best and that is enough."' },
                  { title: 'Physical Tension Release', icon: '💪', color: 'bg-rose-50 text-rose-700 border-rose-100', desc: 'Squeeze shoulders up for 5s then drop and exhale.' },
                  { title: 'Water & Hydrate', icon: '💧', color: 'bg-blue-50 text-blue-700 border-blue-100', desc: 'Drink a glass of cold water mindfully.' },
                ].map((act, i) => (
                  <div key={i} className={`p-5 rounded-2xl border ${act.color} flex flex-col justify-between space-y-4`}>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{act.icon}</span>
                      <strong className="text-sm font-bold">{act.title}</strong>
                    </div>
                    <p className="text-xs opacity-90 leading-relaxed">{act.desc}</p>
                    <button 
                      onClick={() => alert(`Starting 60-second action: ${act.title}!`)}
                      className="w-full py-2 rounded-xl bg-white text-[#1A1338] text-xs font-extrabold shadow-xs hover:bg-gray-50 transition border border-gray-200"
                    >
                      Start 60-Sec Timer ⏱️
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: MY CHECK-INS */}
          {activeTab === 'My Check-ins' && (
            <div className="bg-white border border-[#EAE3F2] rounded-2xl p-6 shadow-xs space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-serif text-2xl font-extrabold text-[#1A1338]">My Check-ins History 📑</h2>
                  <p className="text-xs text-[#68607F] mt-1">Review all your past mood check-ins and progress over time.</p>
                </div>
                <button 
                  onClick={() => alert('Exporting your check-ins history to CSV...')}
                  className="px-4 py-2 rounded-xl bg-[#F0EBFA] border border-[#E0D4F7] text-[#7147E8] font-extrabold text-xs hover:bg-[#E4DAF9] transition"
                >
                  📥 Export CSV
                </button>
              </div>

              <div className="overflow-x-auto rounded-xl border border-[#EAE3F2]">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF8FD] text-[#68607F] font-bold border-b border-[#EAE3F2]">
                    <tr>
                      <th className="p-3">Initial Mood</th>
                      <th className="p-3">Target Shift</th>
                      <th className="p-3">Action Taken</th>
                      <th className="p-3">Date & Time</th>
                      <th className="p-3 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EAE3F2]">
                    {checkins.map(c => (
                      <tr key={c.id} className="hover:bg-[#FAF8FD]">
                        <td className="p-3 font-bold text-[#1A1338] flex items-center gap-2">
                          <span>{c.icon}</span> {c.mood}
                        </td>
                        <td className="p-3 font-bold text-emerald-600">
                          {c.targetMood}
                        </td>
                        <td className="p-3 text-[#5B5278]">{c.action}</td>
                        <td className="p-3 text-gray-400">{c.time}</td>
                        <td className="p-3 text-right">
                          <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 font-extrabold text-[10px]">
                            Completed
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: MY 7-DAY PLAN */}
          {activeTab === 'My 7-Day Plan' && (
            <div className="bg-white border border-[#EAE3F2] rounded-2xl p-6 shadow-xs space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#EAE3F2] pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-serif text-2xl font-extrabold text-[#1A1338]">7-Day Mindset Plan 📅</h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#7147E8] text-white text-[10px] font-extrabold">Active</span>
                  </div>
                  <p className="text-xs text-[#68607F] mt-1">Day 3 of 7 · 43% Completed</p>
                </div>
                <button 
                  onClick={() => alert('Downloading official 7-Day Plan PDF Guide!')}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#7147E8] to-[#9333EA] text-white text-xs font-extrabold shadow-xs hover:opacity-95"
                >
                  📥 Download Printable PDF
                </button>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5 bg-[#FAF8FD] p-4 rounded-xl border border-[#F0EBFA]">
                <div className="flex justify-between text-xs font-bold text-[#1A1338]">
                  <span>Overall Progress</span>
                  <span>43%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-gradient-to-r from-[#7147E8] to-[#EC4899] h-2.5 rounded-full w-[43%]" />
                </div>
              </div>

              {/* 7 Days Grid */}
              <div className="space-y-3">
                {[
                  { day: 1, title: 'Understanding Your Triggers', status: 'Completed', icon: '✅' },
                  { day: 2, title: 'Shifting Frustration into Focus', status: 'Completed', icon: '✅' },
                  { day: 3, title: 'Building 60-Second Habits Today', status: 'In Progress', icon: '🔄' },
                  { day: 4, title: 'Overcoming Mind Overwhelm', status: 'Locked', icon: '🔒' },
                  { day: 5, title: 'Cultivating Inner Gratitude', status: 'Locked', icon: '🔒' },
                  { day: 6, title: 'Reframing Negative Self-Talk', status: 'Locked', icon: '🔒' },
                  { day: 7, title: 'Sustaining Long-term Clarity', status: 'Locked', icon: '🔒' },
                ].map((d) => (
                  <div key={d.day} className={`p-4 rounded-xl border flex items-center justify-between ${d.status === 'In Progress' ? 'bg-[#F4EFFC] border-[#7147E8]' : 'bg-[#FAF8FD] border-[#F0EBFA]'}`}>
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-white font-bold text-xs flex items-center justify-center border border-gray-200 text-[#7147E8]">
                        Day {d.day}
                      </span>
                      <div>
                        <strong className="block text-sm font-bold text-[#1A1338]">{d.title}</strong>
                        <span className="text-[11px] text-[#68607F]">{d.status}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => alert(`Opening Day ${d.day}: ${d.title}`)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold ${d.status === 'In Progress' ? 'bg-[#7147E8] text-white' : 'bg-white text-gray-700 border border-gray-200'}`}
                    >
                      {d.status === 'Completed' ? 'Review' : d.status === 'In Progress' ? 'Continue Day 3' : 'View'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: MY 30-DAY PLAN */}
          {activeTab === 'My 30-Day Plan' && (
            <div className="bg-white border border-[#EAE3F2] rounded-2xl p-6 shadow-xs space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#EAE3F2] pb-4">
                <div>
                  <h2 className="font-serif text-2xl font-extrabold text-[#1A1338]">30-Day Transformation Plan 🗓️</h2>
                  <p className="text-xs text-[#68607F] mt-1">Deep, lasting mindset change over 4 structured weeks.</p>
                </div>
                <Link href="/pricing" className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#7147E8] to-[#9333EA] text-white text-xs font-extrabold shadow-xs">
                  Unlock Full 30-Day Plan
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { week: 'Week 1', title: 'Foundation & Awareness', desc: 'Recognize emotional patterns and build basic check-in routines.' },
                  { week: 'Week 2', title: 'Emotional Regulation', desc: 'Master 60-second micro-actions for anxiety & overwhelm.' },
                  { week: 'Week 3', title: 'Cognitive Reframing', desc: 'Replace negative self-talk with empowering affirmations.' },
                  { week: 'Week 4', title: 'Mastery & Growth', desc: 'Establish lifelong resilience habits and daily reflection routines.' },
                ].map((w, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-[#FAF8FD] border border-[#F0EBFA] space-y-2">
                    <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-purple-100 text-[#7147E8]">{w.week}</span>
                    <strong className="block text-base font-bold text-[#1A1338] pt-1">{w.title}</strong>
                    <p className="text-xs text-[#5B5278] leading-relaxed">{w.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: DOWNLOADS */}
          {activeTab === 'Downloads' && (
            <div className="bg-white border border-[#EAE3F2] rounded-2xl p-6 shadow-xs space-y-6">
              <div>
                <h2 className="font-serif text-2xl font-extrabold text-[#1A1338]">Downloads &amp; Printables 📥</h2>
                <p className="text-xs text-[#68607F] mt-1">Access your offline PDF guides, daily mindset worksheets, and wallpapers.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { name: '7-Day Mindset Plan (PDF)', size: '2.4 MB', icon: '📄' },
                  { name: 'Daily Mood Tracker Worksheet', size: '1.1 MB', icon: '📝' },
                  { name: '60-Sec Calm Wallpaper Pack', size: '5.8 MB', icon: '🖼️' },
                ].map((d, i) => (
                  <div key={i} className="p-4 rounded-xl bg-[#FAF8FD] border border-[#F0EBFA] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{d.icon}</span>
                      <div>
                        <strong className="block text-xs font-bold text-[#1A1338]">{d.name}</strong>
                        <span className="text-[10px] text-gray-400">{d.size}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => alert(`Downloading ${d.name}...`)}
                      className="px-3 py-1.5 rounded-lg bg-[#7147E8] text-white font-bold text-xs"
                    >
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: PROFILE SETTINGS */}
          {activeTab === 'Profile Settings' && (
            <div className="bg-white border border-[#EAE3F2] rounded-2xl p-6 shadow-xs space-y-6">
              <div>
                <h2 className="font-serif text-2xl font-extrabold text-[#1A1338]">Account Settings ⚙️</h2>
                <p className="text-xs text-[#68607F] mt-1">Manage your profile details and preferences.</p>
              </div>

              {savedSuccess && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
                  ✓ Profile settings saved successfully!
                </div>
              )}

              <form onSubmit={handleProfileSave} className="space-y-4 max-w-lg">
                <div>
                  <label className="block text-xs font-bold text-[#1A1338] mb-1">Full Name</label>
                  <input 
                    type="text" 
                    value={userProfile.name}
                    onChange={e => setUserProfile({ ...userProfile, name: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-gray-200 text-xs font-medium focus:outline-none focus:border-[#7147E8]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#1A1338] mb-1">Email Address</label>
                  <input 
                    type="email" 
                    value={userProfile.email}
                    onChange={e => setUserProfile({ ...userProfile, email: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-gray-200 text-xs font-medium focus:outline-none focus:border-[#7147E8]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#1A1338] mb-1">Bio / Personal Note</label>
                  <textarea 
                    value={userProfile.bio}
                    onChange={e => setUserProfile({ ...userProfile, bio: e.target.value })}
                    rows={3}
                    className="w-full p-2.5 rounded-xl border border-gray-200 text-xs font-medium focus:outline-none focus:border-[#7147E8]"
                  />
                </div>
                <button type="submit" className="px-5 py-2.5 rounded-xl bg-[#7147E8] text-white text-xs font-extrabold shadow-xs hover:opacity-95">
                  Save Changes
                </button>
              </form>
            </div>
          )}

          {/* TAB 9: NOTIFICATIONS */}
          {activeTab === 'Notifications' && (
            <div className="bg-white border border-[#EAE3F2] rounded-2xl p-6 shadow-xs space-y-6">
              <div>
                <h2 className="font-serif text-2xl font-extrabold text-[#1A1338]">Notification Center 🔔</h2>
                <p className="text-xs text-[#68607F] mt-1">Customize gentle reminders and mindset nudges.</p>
              </div>

              <div className="space-y-4 max-w-lg">
                <div className="flex items-center justify-between p-4 rounded-xl bg-[#FAF8FD] border border-[#F0EBFA]">
                  <div>
                    <strong className="block text-xs font-bold text-[#1A1338]">Daily Check-in Nudge</strong>
                    <span className="text-[11px] text-gray-500">Receive a gentle reminder every morning at 9:00 AM</span>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={notificationsEnabled} 
                    onChange={e => setNotificationsEnabled(e.target.checked)}
                    className="w-4 h-4 accent-[#7147E8] cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-[#FAF8FD] border border-[#F0EBFA]">
                  <div>
                    <strong className="block text-xs font-bold text-[#1A1338]">Streak Milestone Alerts</strong>
                    <span className="text-[11px] text-gray-500">Celebrate 5-day, 10-day, and 30-day reflection streaks</span>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#7147E8] cursor-pointer" />
                </div>

                <button 
                  onClick={() => alert('Notification preferences saved!')}
                  className="px-5 py-2.5 rounded-xl bg-[#7147E8] text-white text-xs font-extrabold"
                >
                  Save Notification Preferences
                </button>
              </div>
            </div>
          )}

          {/* TAB 10: PRIVACY & DATA */}
          {activeTab === 'Privacy & Data' && (
            <div className="bg-white border border-[#EAE3F2] rounded-2xl p-6 shadow-xs space-y-6">
              <div>
                <h2 className="font-serif text-2xl font-extrabold text-[#1A1338]">Privacy &amp; Data Control 🔒</h2>
                <p className="text-xs text-[#68607F] mt-1">Your privacy comes first. Manage or auto-delete your data.</p>
              </div>

              <div className="space-y-4 max-w-xl">
                <div className="p-4 rounded-xl bg-purple-50 border border-purple-100 text-xs text-[#5B5278] space-y-1">
                  <strong className="block text-[#1A1338] font-bold">🛡️ 90-Day Auto-Deletion Policy</strong>
                  <p>MoodFlip automatically deletes all inactive user reflection logs after 90 days for complete privacy.</p>
                </div>

                <div className="p-4 rounded-xl border border-gray-200 space-y-3">
                  <strong className="block text-xs font-bold text-[#1A1338]">Download Personal Data Archive</strong>
                  <p className="text-xs text-gray-500">Download a complete CSV backup of all your check-ins and reflection logs.</p>
                  <button 
                    onClick={() => alert('Generating full data archive CSV download...')}
                    className="px-4 py-2 rounded-xl bg-[#F0EBFA] border border-[#E0D4F7] text-[#7147E8] font-extrabold text-xs"
                  >
                    Export My Data CSV
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 11: HELP & SUPPORT */}
          {activeTab === 'Help & Support' && (
            <div className="bg-white border border-[#EAE3F2] rounded-2xl p-6 shadow-xs space-y-6">
              <div>
                <h2 className="font-serif text-2xl font-extrabold text-[#1A1338]">Help &amp; Support ❓</h2>
                <p className="text-xs text-[#68607F] mt-1">We are here to support your self-reflection journey.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="p-5 rounded-2xl bg-[#FAF8FD] border border-[#F0EBFA] space-y-3">
                  <strong className="block text-sm font-bold text-[#1A1338]">Contact Support Team</strong>
                  <p className="text-xs text-[#5B5278]">Have questions or feedback? Send us a message and we will reply within 24 hours.</p>
                  <input type="text" placeholder="Your Subject" className="w-full p-2.5 rounded-xl border border-gray-200 text-xs" />
                  <textarea placeholder="How can we help you?" rows={3} className="w-full p-2.5 rounded-xl border border-gray-200 text-xs" />
                  <button onClick={() => alert('Thank you! Support message sent.')} className="w-full py-2 rounded-xl bg-[#7147E8] text-white text-xs font-extrabold">
                    Send Message
                  </button>
                </div>

                <div className="p-5 rounded-2xl bg-rose-50 border border-rose-100 space-y-3">
                  <strong className="block text-sm font-bold text-rose-900">🚨 Emergency Resources</strong>
                  <p className="text-xs text-rose-800 leading-relaxed">
                    MoodFlip is a self-reflection utility, not a medical service or therapy replacement. If you are in crisis, please contact local emergency services immediately:
                  </p>
                  <ul className="text-xs text-rose-900 font-bold space-y-1 list-disc pl-4">
                    <li>US/Canada: Call or Text 988</li>
                    <li>UK: Call 111 or 999</li>
                    <li>International: Visit findahelpline.com</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* BOTTOM PRIVACY BANNER */}
          <div className="bg-[#FAF8FD] border border-[#EAE3F2] rounded-xl p-3 text-center text-xs font-medium text-[#68607F]">
            🔒 Your data is private and secure. We automatically delete inactive data after 90 days.
          </div>

        </main>

      </div>
    </div>
  );
}
