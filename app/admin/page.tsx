'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState('May 9 - May 15, 2026');

  // Dummy Users Data
  const [users] = useState([
    { id: 1, name: 'Sarah Johnson', email: 'sarah.johnson@example.com', joinDate: 'May 15, 2026', visitCount: 24, status: 'Active', avatarBg: 'bg-purple-100 text-purple-700' },
    { id: 2, name: 'Michael Chen', email: 'michael.chen@example.com', joinDate: 'May 15, 2026', visitCount: 18, status: 'Active', avatarBg: 'bg-blue-100 text-blue-700' },
    { id: 3, name: 'Aisha Patel', email: 'aisha.patel@example.com', joinDate: 'May 14, 2026', visitCount: 31, status: 'Active', avatarBg: 'bg-pink-100 text-pink-700' },
    { id: 4, name: 'Daniel Kim', email: 'daniel.kim@example.com', joinDate: 'May 14, 2026', visitCount: 12, status: 'Inactive', avatarBg: 'bg-indigo-100 text-indigo-700' },
    { id: 5, name: 'Emily Davis', email: 'emily.davis@example.com', joinDate: 'May 13, 2026', visitCount: 27, status: 'Active', avatarBg: 'bg-emerald-100 text-emerald-700' },
  ]);

  // Dummy Check-ins Data
  const [checkins] = useState([
    { id: 1, user: 'Sarah J.', mood: '😊 Calm', positiveMood: '😄 Happy', action: 'Breathe & Relax', time: 'May 15, 2026 8:42 AM', avatarBg: 'bg-purple-100 text-purple-700' },
    { id: 2, user: 'Michael C.', mood: '😰 Anxious', positiveMood: '😌 Calm', action: 'Grounding Exercise', time: 'May 15, 2026 8:31 AM', avatarBg: 'bg-blue-100 text-blue-700' },
    { id: 3, user: 'Aisha P.', mood: '😔 Sad', positiveMood: '😄 Happy', action: 'Gratitude Journal', time: 'May 15, 2026 7:58 AM', avatarBg: 'bg-pink-100 text-pink-700' },
    { id: 4, user: 'Daniel K.', mood: '😡 Angry', positiveMood: '😌 Calm', action: 'Take a Break', time: 'May 15, 2026 7:44 AM', avatarBg: 'bg-indigo-100 text-indigo-700' },
    { id: 5, user: 'Emily D.', mood: '😄 Happy', positiveMood: '😌 Calm', action: 'Affirmation', time: 'May 15, 2026 7:20 AM', avatarBg: 'bg-emerald-100 text-emerald-700' },
  ]);

  const navItems = [
    { name: 'Dashboard', icon: '📊' },
    { name: 'Users', icon: '👤' },
    { name: 'Check-ins', icon: '📋' },
    { name: 'Mood Library', icon: '😊' },
    { name: 'Plans & Payments', icon: '💳' },
    { name: 'Reports', icon: '📈' },
    { name: 'Email Leads', icon: '✉️' },
    { name: 'Analytics', icon: '📊' },
    { name: 'Ad Spaces', icon: '📢' },
    { name: 'Settings', icon: '⚙️' },
    { name: 'Logout', icon: '🚪' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ECE5F6] via-[#FAF8FE] to-[#F3ECFB] p-3 md:p-6 text-[#1A1338] font-sans antialiased">
      {/* OUTER MAX-WIDTH APP FRAME MATCHING MOCKUP IMAGE 3 */}
      <div className="mx-auto max-w-[1560px] w-full bg-[#FFFFFF] border border-[#181940]/14 rounded-[28px] shadow-2xl overflow-hidden flex flex-col lg:flex-row min-h-[920px]">

        {/* 1. LEFT SIDEBAR */}
        <aside className="w-full lg:w-[260px] bg-[#FAF8FD] border-r border-[#EAE3F2] p-5 flex flex-col justify-between shrink-0">
          <div>
            {/* BRAND LOGO */}
            <div className="flex items-center gap-2.5 mb-8 px-2 pt-1">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#7147E8] via-[#A855F7] to-[#EC4899] flex items-center justify-center text-white font-bold text-lg shadow-sm">
                😊
              </div>
              <span className="font-serif text-2xl font-extrabold text-[#1A1338] tracking-tight">
                moodflip
              </span>
            </div>

            {/* NAVIGATION MENU */}
            <nav className="space-y-1.5">
              {navItems.map((item) => {
                const isActive = activeTab === item.name;
                return (
                  <button
                    key={item.name}
                    onClick={() => setActiveTab(item.name)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-[#7147E8] to-[#8C60F7] text-white shadow-md shadow-[#7147E8]/20'
                        : 'text-[#5B5278] hover:bg-[#F0EBFA] hover:text-[#1A1338]'
                    }`}
                  >
                    <span className="text-base">{item.icon}</span>
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* BOTTOM SIDEBAR MOTIVATIONAL CARD */}
          <div className="mt-8 relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#7147E8] to-[#9333EA] p-5 text-white shadow-lg">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none" />
            <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-3">
              ❤️
            </div>
            <h4 className="font-serif font-bold text-sm leading-tight mb-1">Spread positivity.</h4>
            <h4 className="font-serif font-bold text-sm leading-tight mb-2">Inspire change.</h4>
            <p className="text-[11px] text-white/80 leading-relaxed font-medium">
              Thank you for helping millions live better.
            </p>
          </div>
        </aside>

        {/* 2. MAIN DASHBOARD CONTENT AREA */}
        <main className="flex-1 p-5 md:p-8 bg-[#FAF9FE] flex flex-col gap-6 overflow-x-hidden">

          {/* TOP SEARCH & PROFILE HEADER BAR */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-3 md:p-4 rounded-2xl border border-[#EAE3F2] shadow-xs">
            {/* Search Input */}
            <div className="relative w-full sm:w-[420px]">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
              <input
                type="text"
                placeholder="Search users, emails, check-ins, plans..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#F5F2FA] border border-[#EBE5F5] rounded-xl pl-10 pr-12 py-2 text-xs text-[#1A1338] placeholder-gray-400 focus:outline-none focus:border-[#7147E8] focus:bg-white transition-all"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-400 bg-white border border-gray-200 px-1.5 py-0.5 rounded-md">
                ⌘K
              </span>
            </div>

            {/* Top Right Controls & Profile */}
            <div className="flex items-center gap-3 self-end sm:self-auto">
              <button className="relative w-9 h-9 rounded-xl bg-[#F5F2FA] border border-[#EBE5F5] flex items-center justify-center text-sm text-[#5B5278] hover:bg-[#EBE4F7] transition-all">
                🔔
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#EC4899] text-white text-[9px] font-extrabold rounded-full flex items-center justify-center">8</span>
              </button>
              <button className="relative w-9 h-9 rounded-xl bg-[#F5F2FA] border border-[#EBE5F5] flex items-center justify-center text-sm text-[#5B5278] hover:bg-[#EBE4F7] transition-all">
                ✉️
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#7147E8] text-white text-[9px] font-extrabold rounded-full flex items-center justify-center">3</span>
              </button>
              <div className="h-6 w-px bg-gray-200 mx-1" />
              <div className="flex items-center gap-2.5 pl-1 cursor-pointer">
                <div className="w-9 h-9 rounded-full bg-[#7147E8] text-white font-extrabold flex items-center justify-center text-sm shadow-xs">
                  A
                </div>
                <span className="text-xs font-bold text-[#1A1338]">Admin</span>
                <span className="text-[10px] text-gray-400">˅</span>
              </div>
            </div>
          </div>

          {/* PAGE TITLE & DATE SELECTOR ROW */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h1 className="font-serif text-2xl md:text-3xl font-extrabold text-[#1A1338] tracking-tight">
                Admin Dashboard
              </h1>
              <p className="text-xs md:text-sm text-[#68607F] font-medium mt-0.5">
                Overview of users, check-ins, revenue and activity
              </p>
            </div>
            <div className="flex items-center gap-2 bg-white border border-[#EAE3F2] rounded-xl px-3.5 py-2 shadow-xs cursor-pointer self-start sm:self-auto">
              <span className="text-xs">📅</span>
              <span className="text-xs font-bold text-[#1A1338]">{dateRange}</span>
              <span className="text-[10px] text-gray-400 ml-1">˅</span>
            </div>
          </div>

          {/* 3. TOP 6 METRIC CARDS ROW */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3.5">
            {/* Card 1 */}
            <div className="bg-white border border-[#EAE3F2] rounded-2xl p-4 shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-[#68607F]">Total Users</span>
                <div className="w-7 h-7 rounded-lg bg-[#7147E8]/10 text-[#7147E8] flex items-center justify-center text-xs">👤</div>
              </div>
              <div className="font-serif text-xl font-extrabold text-[#1A1338]">12,458</div>
              <div className="text-[10px] font-bold text-emerald-600 mt-1 flex items-center gap-0.5">
                <span>↑ 8.7%</span> <span className="text-gray-400 font-normal">vs last 7 days</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white border border-[#EAE3F2] rounded-2xl p-4 shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-[#68607F]">Total Check-ins</span>
                <div className="w-7 h-7 rounded-lg bg-[#7147E8]/10 text-[#7147E8] flex items-center justify-center text-xs">📋</div>
              </div>
              <div className="font-serif text-xl font-extrabold text-[#1A1338]">89,142</div>
              <div className="text-[10px] font-bold text-emerald-600 mt-1 flex items-center gap-0.5">
                <span>↑ 12.4%</span> <span className="text-gray-400 font-normal">vs last 7 days</span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white border border-[#EAE3F2] rounded-2xl p-4 shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-[#68607F]">Active Paid Users</span>
                <div className="w-7 h-7 rounded-lg bg-[#7147E8]/10 text-[#7147E8] flex items-center justify-center text-xs">👑</div>
              </div>
              <div className="font-serif text-xl font-extrabold text-[#1A1338]">3,276</div>
              <div className="text-[10px] font-bold text-emerald-600 mt-1 flex items-center gap-0.5">
                <span>↑ 9.3%</span> <span className="text-gray-400 font-normal">vs last 7 days</span>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white border border-[#EAE3F2] rounded-2xl p-4 shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-[#68607F]">7-Day Plan Sales</span>
                <div className="w-7 h-7 rounded-lg bg-[#7147E8]/10 text-[#7147E8] flex items-center justify-center text-xs">🛍️</div>
              </div>
              <div className="font-serif text-xl font-extrabold text-[#1A1338]">1,842</div>
              <div className="text-[10px] font-bold text-emerald-600 mt-1 flex items-center gap-0.5">
                <span>↑ 15.2%</span> <span className="text-gray-400 font-normal">vs last 7 days</span>
              </div>
            </div>

            {/* Card 5 */}
            <div className="bg-white border border-[#EAE3F2] rounded-2xl p-4 shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-[#68607F]">Revenue</span>
                <div className="w-7 h-7 rounded-lg bg-[#7147E8]/10 text-[#7147E8] flex items-center justify-center text-xs">👛</div>
              </div>
              <div className="font-serif text-xl font-extrabold text-[#1A1338]">$18,942</div>
              <div className="text-[10px] font-bold text-emerald-600 mt-1 flex items-center gap-0.5">
                <span>↑ 13.1%</span> <span className="text-gray-400 font-normal">vs last 7 days</span>
              </div>
            </div>

            {/* Card 6 */}
            <div className="bg-white border border-[#EAE3F2] rounded-2xl p-4 shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-[#68607F]">Avg. Daily Visits</span>
                <div className="w-7 h-7 rounded-lg bg-[#7147E8]/10 text-[#7147E8] flex items-center justify-center text-xs">👁️</div>
              </div>
              <div className="font-serif text-xl font-extrabold text-[#1A1338]">5,819</div>
              <div className="text-[10px] font-bold text-emerald-600 mt-1 flex items-center gap-0.5">
                <span>↑ 10.8%</span> <span className="text-gray-400 font-normal">vs last 7 days</span>
              </div>
            </div>
          </div>

          {/* 4. MIDDLE SECTION GRID (CHARTS & QUICK ACTIONS) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

            {/* LEFT: WEEKLY ACTIVITY LINE CHART (5 Columns) */}
            <div className="lg:col-span-5 bg-white border border-[#EAE3F2] rounded-2xl p-5 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-serif font-bold text-base text-[#1A1338]">Weekly Activity (Check-ins)</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#7147E8]" />
                    <span className="text-xs text-gray-500 font-medium">Check-ins</span>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg px-2.5 py-1 text-xs font-semibold text-gray-600 flex items-center gap-1 cursor-pointer">
                  This Week <span className="text-[9px]">˅</span>
                </div>
              </div>

              {/* SVG Line Graph */}
              <div className="w-full h-[180px] relative mt-2">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 400 150">
                  {/* Grid Lines */}
                  <line x1="0" y1="30" x2="400" y2="30" stroke="#F1EEF8" strokeDasharray="3 3" />
                  <line x1="0" y1="70" x2="400" y2="70" stroke="#F1EEF8" strokeDasharray="3 3" />
                  <line x1="0" y1="110" x2="400" y2="110" stroke="#F1EEF8" strokeDasharray="3 3" />

                  {/* Gradient Area Fill */}
                  <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#7147E8" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#7147E8" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 10 100 L 70 85 L 130 90 L 190 60 L 250 50 L 310 40 L 370 65 L 370 140 L 10 140 Z"
                    fill="url(#chartGrad)"
                  />
                  {/* Line Curve */}
                  <path
                    d="M 10 100 Q 40 92 70 85 T 130 90 T 190 60 T 250 50 T 310 40 T 370 65"
                    fill="none"
                    stroke="#7147E8"
                    strokeWidth="3"
                  />
                  {/* Data Points */}
                  {[
                    { x: 10, y: 100 },
                    { x: 70, y: 85 },
                    { x: 130, y: 90 },
                    { x: 190, y: 60 },
                    { x: 250, y: 50 },
                    { x: 310, y: 40 },
                    { x: 370, y: 65 },
                  ].map((pt, i) => (
                    <circle key={i} cx={pt.x} cy={pt.y} r="4.5" fill="#7147E8" stroke="#FFFFFF" strokeWidth="2" />
                  ))}
                </svg>

                {/* X-Axis Labels */}
                <div className="flex justify-between text-[11px] text-gray-400 font-semibold mt-2 px-1">
                  <span>Fri 9</span>
                  <span>Sat 10</span>
                  <span>Sun 11</span>
                  <span>Mon 12</span>
                  <span>Tue 13</span>
                  <span>Wed 14</span>
                  <span>Thu 15</span>
                </div>
              </div>
            </div>

            {/* MIDDLE: MOOD DISTRIBUTION DONUT CHART (4 Columns) */}
            <div className="lg:col-span-4 bg-white border border-[#EAE3F2] rounded-2xl p-5 shadow-xs flex flex-col justify-between">
              <h3 className="font-serif font-bold text-base text-[#1A1338] mb-2">Mood Distribution (All Time)</h3>

              <div className="flex items-center gap-4 my-auto">
                {/* SVG Donut */}
                <div className="relative w-36 h-36 shrink-0 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="38" fill="none" stroke="#F87171" strokeWidth="18" strokeDasharray="238.7" strokeDashoffset="0" />
                    <circle cx="50" cy="50" r="38" fill="none" stroke="#60A5FA" strokeWidth="18" strokeDasharray="238.7" strokeDashoffset="30" />
                    <circle cx="50" cy="50" r="38" fill="none" stroke="#A78BFA" strokeWidth="18" strokeDasharray="238.7" strokeDashoffset="65" />
                    <circle cx="50" cy="50" r="38" fill="none" stroke="#34D399" strokeWidth="18" strokeDasharray="238.7" strokeDashoffset="110" />
                    <circle cx="50" cy="50" r="38" fill="none" stroke="#FBBF24" strokeWidth="18" strokeDasharray="238.7" strokeDashoffset="175" />
                  </svg>
                  <div className="absolute text-center">
                    <span className="block font-serif font-extrabold text-sm text-[#1A1338]">89,142</span>
                    <span className="block text-[9px] font-bold text-gray-400 uppercase">Total</span>
                  </div>
                </div>

                {/* Legend List */}
                <div className="space-y-1.5 text-[11px] font-semibold text-[#5B5278] flex-1">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#FBBF24]" /> 😊 Happy</span>
                    <strong className="text-[#1A1338]">34.2%</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#34D399]" /> 🌿 Calm</span>
                    <strong className="text-[#1A1338]">25.6%</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#A78BFA]" /> 😰 Anxious</span>
                    <strong className="text-[#1A1338]">14.8%</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#60A5FA]" /> 😔 Sad</span>
                    <strong className="text-[#1A1338]">11.3%</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#F87171]" /> 😡 Angry</span>
                    <strong className="text-[#1A1338]">6.4%</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-gray-300" /> 💭 Other</span>
                    <strong className="text-[#1A1338]">7.7%</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: QUICK ACTIONS (3 Columns) */}
            <div className="lg:col-span-3 bg-white border border-[#EAE3F2] rounded-2xl p-5 shadow-xs flex flex-col justify-between">
              <h3 className="font-serif font-bold text-base text-[#1A1338] mb-3">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-[#EBE5F5] bg-[#FAF8FD] hover:bg-[#F0EBFA] text-xs font-bold text-[#7147E8] transition-all">
                  <span>📥</span> Export Users CSV
                </button>
                <button className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-[#EBE5F5] bg-[#FAF8FD] hover:bg-[#F0EBFA] text-xs font-bold text-[#7147E8] transition-all">
                  <span>✉️</span> Export Leads CSV
                </button>
                <button className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-[#EBE5F5] bg-[#FAF8FD] hover:bg-[#F0EBFA] text-xs font-bold text-[#7147E8] transition-all">
                  <span>➕</span> Add Mood Page
                </button>
                <button className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-[#EBE5F5] bg-[#FAF8FD] hover:bg-[#F0EBFA] text-xs font-bold text-[#7147E8] transition-all">
                  <span>🎁</span> Create Plan
                </button>
                <button className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-[#EBE5F5] bg-[#FAF8FD] hover:bg-[#F0EBFA] text-xs font-bold text-[#7147E8] transition-all">
                  <span>📊</span> View Reports
                </button>
              </div>
            </div>

          </div>

          {/* 5. LOWER SECTION ROW 1 (TABLES & PRIVACY CARDS) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

            {/* RECENT USERS TABLE (5 Columns) */}
            <div className="lg:col-span-5 bg-white border border-[#EAE3F2] rounded-2xl p-5 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif font-bold text-base text-[#1A1338]">Recent Users</h3>
                <button className="text-xs font-bold text-[#7147E8] hover:underline">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-gray-100 text-gray-400 font-bold uppercase text-[10px]">
                      <th className="pb-2.5">Name</th>
                      <th className="pb-2.5">Email</th>
                      <th className="pb-2.5">Join Date</th>
                      <th className="pb-2.5">Visit Count</th>
                      <th className="pb-2.5">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 text-[#1A1338] font-medium">
                    {users.map((u) => (
                      <tr key={u.id} className="hover:bg-[#FAF8FD] transition-all">
                        <td className="py-2.5 flex items-center gap-2">
                          <span className={`w-6 h-6 rounded-full ${u.avatarBg} text-[10px] font-bold flex items-center justify-center`}>
                            {u.name.charAt(0)}
                          </span>
                          <span className="font-bold text-[11px]">{u.name}</span>
                        </td>
                        <td className="py-2.5 text-gray-500 text-[11px]">{u.email}</td>
                        <td className="py-2.5 text-[11px]">{u.joinDate}</td>
                        <td className="py-2.5 text-[11px] font-bold">{u.visitCount}</td>
                        <td className="py-2.5">
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold ${u.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                            {u.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
                <span>Showing 1 to 5 of 12,458 users</span>
                <div className="flex items-center gap-1 font-bold">
                  <span className="px-2 py-1 bg-gray-100 rounded text-gray-600">1</span>
                  <span className="px-2 py-1 hover:bg-gray-100 rounded cursor-pointer">2</span>
                  <span className="px-2 py-1 hover:bg-gray-100 rounded cursor-pointer">3</span>
                  <span>...</span>
                  <span className="px-2 py-1 hover:bg-gray-100 rounded cursor-pointer">2,492</span>
                </div>
              </div>
            </div>

            {/* LATEST CHECK-INS TABLE (4 Columns) */}
            <div className="lg:col-span-4 bg-white border border-[#EAE3F2] rounded-2xl p-5 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif font-bold text-base text-[#1A1338]">Latest Check-ins</h3>
                <button className="text-xs font-bold text-[#7147E8] hover:underline">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-gray-100 text-gray-400 font-bold uppercase text-[10px]">
                      <th className="pb-2.5">User</th>
                      <th className="pb-2.5">Selected Mood</th>
                      <th className="pb-2.5">Positive Mood</th>
                      <th className="pb-2.5">Action Shown</th>
                      <th className="pb-2.5">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 text-[#1A1338] font-medium">
                    {checkins.map((c) => (
                      <tr key={c.id} className="hover:bg-[#FAF8FD] transition-all">
                        <td className="py-2.5 font-bold text-[11px]">{c.user}</td>
                        <td className="py-2.5 text-[11px]">{c.mood}</td>
                        <td className="py-2.5 text-[11px]">{c.positiveMood}</td>
                        <td className="py-2.5 text-[11px] font-semibold text-[#7147E8]">{c.action}</td>
                        <td className="py-2.5 text-[10px] text-gray-400">{c.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 text-right">
                <button className="text-[11px] font-bold text-[#7147E8] hover:underline">View All Check-ins →</button>
              </div>
            </div>

            {/* CONSENT & PRIVACY LOGS CARDS (3 Columns) */}
            <div className="lg:col-span-3 space-y-4">
              <div className="bg-white border border-[#EAE3F2] rounded-2xl p-4 shadow-xs">
                <div className="flex items-center gap-2 text-sm font-serif font-bold text-[#1A1338] mb-1.5">
                  <span>🛡️</span> Consent &amp; Privacy
                </div>
                <p className="text-xs text-[#5B5278] leading-relaxed mb-3">
                  Users must consent to store their mood, moods, dates, actions and purchase history.
                </p>
                <button className="text-xs font-extrabold text-[#7147E8] hover:underline">
                  View Consent Logs →
                </button>
              </div>

              <div className="bg-white border border-[#EAE3F2] rounded-2xl p-4 shadow-xs">
                <div className="flex items-center gap-2 text-sm font-serif font-bold text-[#1A1338] mb-1.5">
                  <span>⏱️</span> 90-Day Auto Deletion
                </div>
                <p className="text-xs text-[#5B5278] leading-relaxed mb-3">
                  User data is automatically deleted 90 days after account deletion.
                </p>
                <button className="text-xs font-extrabold text-[#7147E8] hover:underline">
                  View Deletion Logs →
                </button>
              </div>
            </div>

          </div>

          {/* 6. LOWER SECTION ROW 2 (PURCHASE STATUS & ENCOURAGEMENT BANNER) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

            {/* PURCHASE STATUS TABLE (8 Columns) */}
            <div className="lg:col-span-8 bg-white border border-[#EAE3F2] rounded-2xl p-5 shadow-xs">
              <h3 className="font-serif font-bold text-base text-[#1A1338] mb-4">Purchase Status</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-gray-100 text-gray-400 font-bold uppercase text-[10px]">
                      <th className="pb-2.5">Plans</th>
                      <th className="pb-2.5">Status</th>
                      <th className="pb-2.5">Total Users</th>
                      <th className="pb-2.5">Active Users</th>
                      <th className="pb-2.5">Expired Users</th>
                      <th className="pb-2.5">Revenue</th>
                      <th className="pb-2.5">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 text-[#1A1338] font-medium">
                    <tr className="hover:bg-[#FAF8FD]">
                      <td className="py-3 font-bold">7-Day Plan</td>
                      <td className="py-3"><span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-[10px] font-bold">Active</span></td>
                      <td className="py-3 font-bold">1,842</td>
                      <td className="py-3">1,512</td>
                      <td className="py-3 text-gray-400">330</td>
                      <td className="py-3 font-bold text-emerald-600">$9,842</td>
                      <td className="py-3 flex gap-2">
                        <button className="px-2.5 py-1 rounded bg-[#7147E8]/10 text-[#7147E8] font-bold text-[10px] hover:bg-[#7147E8]/20">View Users</button>
                        <button className="px-2.5 py-1 rounded border border-gray-200 text-gray-600 font-bold text-[10px] hover:bg-gray-50">Export CSV</button>
                      </td>
                    </tr>
                    <tr className="text-gray-400">
                      <td className="py-3 font-bold">30-Day Plan (Coming Soon)</td>
                      <td className="py-3"><span className="bg-purple-50 text-purple-400 px-2 py-0.5 rounded text-[10px] font-bold">Coming Soon</span></td>
                      <td className="py-3">-</td>
                      <td className="py-3">-</td>
                      <td className="py-3">-</td>
                      <td className="py-3">-</td>
                      <td className="py-3"><span className="text-[10px] italic">Coming Soon</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* ENCOURAGEMENT BANNER CARD (4 Columns) */}
            <div className="lg:col-span-4 relative overflow-hidden rounded-2xl border border-[#EAE3F2] p-6 shadow-xs flex flex-col items-center justify-center text-center min-h-[160px] bg-cover bg-center" style={{ backgroundImage: "url('/login-bg.jpg')" }}>
              <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/80 to-white/40 pointer-events-none" />
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-full bg-[#7147E8]/12 text-[#7147E8] text-xl font-bold flex items-center justify-center mx-auto mb-2 shadow-xs">
                  😊
                </div>
                <h4 className="font-serif font-extrabold text-base text-[#1A1338] mb-1">
                  You&apos;re making a difference
                </h4>
                <p className="text-xs text-[#5B5278] font-semibold max-w-xs mx-auto">
                  Empowering minds. Building a kinder world.
                </p>
              </div>
            </div>

          </div>

        </main>

      </div>
    </div>
  );
}
