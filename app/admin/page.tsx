'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState('May 9 - May 15, 2026');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('All');
  const [activeModal, setActiveModal] = useState<string | null>(null);

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

  // Full Interactive Dummy Users Data
  const [users] = useState([
    { id: 1, name: 'Sarah Johnson', email: 'sarah.johnson@example.com', joinDate: 'May 15, 2026', visitCount: 24, status: 'Active', avatarBg: 'bg-purple-100 text-purple-700' },
    { id: 2, name: 'Michael Chen', email: 'michael.chen@example.com', joinDate: 'May 15, 2026', visitCount: 18, status: 'Active', avatarBg: 'bg-blue-100 text-blue-700' },
    { id: 3, name: 'Aisha Patel', email: 'aisha.patel@example.com', joinDate: 'May 14, 2026', visitCount: 31, status: 'Active', avatarBg: 'bg-pink-100 text-pink-700' },
    { id: 4, name: 'Daniel Kim', email: 'daniel.kim@example.com', joinDate: 'May 14, 2026', visitCount: 12, status: 'Inactive', avatarBg: 'bg-indigo-100 text-indigo-700' },
    { id: 5, name: 'Emily Davis', email: 'emily.davis@example.com', joinDate: 'May 13, 2026', visitCount: 27, status: 'Active', avatarBg: 'bg-emerald-100 text-emerald-700' },
  ]);

  // Full Interactive Dummy Check-ins Data
  const [checkins] = useState([
    { id: 1, user: 'Sarah J.', mood: '😊 Calm', positiveMood: '😄 Happy', action: 'Breathe & Relax', time: 'May 15, 2026 8:42 AM' },
    { id: 2, user: 'Michael C.', mood: '😰 Anxious', positiveMood: '😌 Calm', action: 'Grounding Exercise', time: 'May 15, 2026 8:31 AM' },
    { id: 3, user: 'Aisha P.', mood: '😔 Sad', positiveMood: '😄 Happy', action: 'Gratitude Journal', time: 'May 15, 2026 7:58 AM' },
    { id: 4, user: 'Daniel K.', mood: '😡 Angry', positiveMood: '😌 Calm', action: 'Take a Break', time: 'May 15, 2026 7:44 AM' },
    { id: 5, user: 'Emily D.', mood: '😄 Happy', positiveMood: '😌 Calm', action: 'Affirmation', time: 'May 15, 2026 7:20 AM' },
  ]);

  // Email Leads Data
  const [leads] = useState([
    { id: 1, email: 'lead.alex@example.com', date: 'May 15, 2026', source: '7-Day Plan Popup' },
    { id: 2, email: 'lead.maria@example.com', date: 'May 14, 2026', source: 'Mood Library Download' },
    { id: 3, email: 'lead.sam@example.com', date: 'May 14, 2026', source: 'Homepage Subscribe' },
    { id: 4, email: 'lead.david@example.com', date: 'May 13, 2026', source: '7-Day Plan Checkout' },
    { id: 5, email: 'lead.priya@example.com', date: 'May 12, 2026', source: 'Daily Reminder Prompt' },
  ]);

  // Ad Spaces State
  const [adsEnabled, setAdsEnabled] = useState({
    headerBanner: true,
    sidebarAd: true,
    inContentAd: false,
  });

  // Export Users CSV
  const exportUsersCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + ["ID,Name,Email,Join Date,Visit Count,Status", ...users.map(u => `${u.id},"${u.name}",${u.email},${u.joinDate},${u.visitCount},${u.status}`)].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `moodflip_users_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export Leads CSV
  const exportLeadsCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + ["ID,Email,Date,Source", ...leads.map(l => `${l.id},${l.email},${l.date},${l.source}`)].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `moodflip_leads_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered Users
  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || u.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Filtered Check-ins
  const filteredCheckins = checkins.filter(c => 
    c.user.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.mood.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.action.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FAF9FE] text-[#1A1338] font-sans antialiased flex flex-col">

      {/* MOBILE TOP NAVBAR */}
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
          <Link href="/profile" className="px-2.5 py-1 rounded-xl bg-[#7147E8] text-white font-bold text-xs">
            👤 User
          </Link>
          <Link href="/" className="px-2.5 py-1 rounded-xl bg-[#F0EBFA] border border-[#E0D4F7] text-[#7147E8] font-bold text-xs">
            🏠 Home
          </Link>
        </div>
      </div>

      {/* MAIN LAYOUT */}
      <div className="flex-1 flex overflow-hidden relative">

        {/* 1. LEFT SIDEBAR */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-50 w-[280px] bg-[#FAF8FD] border-r border-[#EAE3F2] p-5 flex flex-col justify-between shrink-0 transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div>
            {/* DESKTOP BRAND LOGO */}
            <div className="hidden lg:flex items-center gap-2.5 mb-4 px-2 pt-1">
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#7147E8] via-[#A855F7] to-[#EC4899] flex items-center justify-center text-white font-bold text-base shadow-xs group-hover:scale-105 transition-transform">
                  😊
                </div>
                <span className="font-serif text-2xl font-extrabold text-[#1A1338] tracking-tight">
                  mood<span className="text-[#7147e8]">flip</span>
                </span>
              </Link>
            </div>

            {/* QUICK ROUTE BUTTONS */}
            <div className="space-y-1.5 mb-4">
              <Link
                href="/"
                className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl text-xs font-extrabold text-[#7147E8] bg-[#F0EBFA] hover:bg-[#E4DAF9] transition-all border border-[#E0D4F7] shadow-xs"
              >
                <span>🏠 Back to Homepage</span>
              </Link>
              <Link
                href="/profile"
                className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl text-xs font-extrabold text-white bg-gradient-to-r from-[#7147E8] to-[#9333EA] hover:opacity-95 transition-all shadow-xs"
              >
                <span>👤 Switch to User Dashboard</span>
              </Link>
            </div>

            {/* NAVIGATION MENU */}
            <nav className="space-y-1">
              {[
                { name: 'Dashboard', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
                { name: 'Users', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
                { name: 'Check-ins', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
                { name: 'Mood Library', icon: 'M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
                { name: 'Plans & Payments', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v10a2 2 0 002 2z' },
                { name: 'Reports', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
                { name: 'Email Leads', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
                { name: 'Analytics', icon: 'M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z' },
                { name: 'Ad Spaces', icon: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z' },
                { name: 'Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => changeTab(item.name)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                    activeTab === item.name
                      ? 'bg-gradient-to-r from-[#7147E8] to-[#8C60F7] text-white shadow-md shadow-[#7147E8]/20'
                      : 'text-[#5B5278] hover:bg-[#F0EBFA] hover:text-[#1A1338]'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                  </svg>
                  <span>{item.name}</span>
                </button>
              ))}

              <Link
                href="/login"
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold text-gray-500 hover:bg-rose-50 hover:text-rose-600 transition-all cursor-pointer mt-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Logout</span>
              </Link>
            </nav>
          </div>

          {/* SIDEBAR MOTIVATIONAL CARD */}
          <div 
            className="mt-6 relative overflow-hidden rounded-[26px] border border-[#EAE3D6] p-6 shadow-md flex flex-col justify-between text-center min-h-[300px] bg-cover bg-center"
            style={{ backgroundImage: "url('/login-bg.jpg')" }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/40 to-transparent pointer-events-none" />

            <div className="relative z-10 text-center pt-2">
              <h4 className="font-serif font-extrabold text-base md:text-lg text-[#1A1338] leading-snug mb-2 tracking-tight">
                Spread positivity.<br />Inspire change.
              </h4>
              <p className="text-xs text-[#5B5278] font-medium leading-relaxed max-w-[210px] mx-auto">
                Thank you for helping millions live better.
              </p>
            </div>

            <div className="relative z-10 w-12 h-12 rounded-full bg-[#7147E8] text-white flex items-center justify-center shadow-lg shadow-[#7147E8]/40 mx-auto mt-6 mb-2">
              ❤️
            </div>
          </div>
        </aside>

        {/* MOBILE OVERLAY BACKDROP */}
        {sidebarOpen && (
          <div 
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 lg:hidden"
          />
        )}

        {/* 2. MAIN DASHBOARD CONTENT AREA */}
        <main className="flex-1 p-4 md:p-8 bg-[#FAF9FE] flex flex-col gap-6 overflow-y-auto w-full">

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
              <button 
                onClick={() => alert('Notifications (8): New user registration, 7-Day plan sale, export completed.')}
                className="relative w-9 h-9 rounded-xl bg-[#F5F2FA] border border-[#EBE5F5] flex items-center justify-center text-[#5B5278] hover:bg-[#EBE4F7] transition-all cursor-pointer"
                title="Notifications"
              >
                🔔
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#EC4899] text-white text-[9px] font-extrabold rounded-full flex items-center justify-center">8</span>
              </button>
              <div className="h-6 w-px bg-gray-200 mx-1" />
              <Link href="/profile" className="flex items-center gap-2.5 pl-1 cursor-pointer group">
                <div className="w-9 h-9 rounded-full bg-[#7147E8] text-white font-extrabold flex items-center justify-center text-sm shadow-xs group-hover:scale-105 transition-transform">
                  A
                </div>
                <div className="text-left hidden sm:block">
                  <span className="block text-xs font-bold text-[#1A1338]">Admin Panel</span>
                  <span className="block text-[10px] text-[#7147E8] font-semibold">Switch to User Profile ➔</span>
                </div>
              </Link>
            </div>
          </div>

          {/* PAGE TITLE & DATE SELECTOR ROW */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h1 className="font-serif text-2xl md:text-3xl font-extrabold text-[#1A1338] tracking-tight">
                {activeTab === 'Dashboard' ? 'Admin Dashboard' : `Admin — ${activeTab}`}
              </h1>
              <p className="text-xs md:text-sm text-[#68607F] font-medium mt-0.5">
                Overview of users, check-ins, revenue and platform management
              </p>
            </div>
            <div className="flex items-center gap-2 bg-white border border-[#EAE3F2] rounded-xl px-3.5 py-2 shadow-xs cursor-pointer self-start sm:self-auto">
              <span>📅</span>
              <select 
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="text-xs font-bold text-[#1A1338] bg-transparent focus:outline-none cursor-pointer"
              >
                <option>May 9 - May 15, 2026</option>
                <option>May 1 - May 8, 2026</option>
                <option>April 2026</option>
                <option>Last 30 Days</option>
              </select>
            </div>
          </div>

          {/* DYNAMIC TAB CONTENT RENDERER */}
          {activeTab === 'Dashboard' && (
            <>
              {/* TOP 6 METRIC CARDS ROW */}
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3.5">
                <div className="bg-white border border-[#EAE3F2] rounded-2xl p-4 shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
                  <span className="text-[11px] font-bold text-[#68607F] mb-1">Total Users</span>
                  <div className="font-serif text-xl font-extrabold text-[#1A1338]">12,458</div>
                  <div className="text-[10px] font-bold text-emerald-600 mt-1">↑ 8.7% vs last 7d</div>
                </div>

                <div className="bg-white border border-[#EAE3F2] rounded-2xl p-4 shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
                  <span className="text-[11px] font-bold text-[#68607F] mb-1">Total Check-ins</span>
                  <div className="font-serif text-xl font-extrabold text-[#1A1338]">89,142</div>
                  <div className="text-[10px] font-bold text-emerald-600 mt-1">↑ 12.4% vs last 7d</div>
                </div>

                <div className="bg-white border border-[#EAE3F2] rounded-2xl p-4 shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
                  <span className="text-[11px] font-bold text-[#68607F] mb-1">Active Paid Users</span>
                  <div className="font-serif text-xl font-extrabold text-[#1A1338]">3,276</div>
                  <div className="text-[10px] font-bold text-emerald-600 mt-1">↑ 9.3% vs last 7d</div>
                </div>

                <div className="bg-white border border-[#EAE3F2] rounded-2xl p-4 shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
                  <span className="text-[11px] font-bold text-[#68607F] mb-1">7-Day Plan Sales</span>
                  <div className="font-serif text-xl font-extrabold text-[#1A1338]">1,842</div>
                  <div className="text-[10px] font-bold text-emerald-600 mt-1">↑ 15.2% vs last 7d</div>
                </div>

                <div className="bg-white border border-[#EAE3F2] rounded-2xl p-4 shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
                  <span className="text-[11px] font-bold text-[#68607F] mb-1">Revenue</span>
                  <div className="font-serif text-xl font-extrabold text-[#1A1338]">$18,942</div>
                  <div className="text-[10px] font-bold text-emerald-600 mt-1">↑ 13.1% vs last 7d</div>
                </div>

                <div className="bg-white border border-[#EAE3F2] rounded-2xl p-4 shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
                  <span className="text-[11px] font-bold text-[#68607F] mb-1">Avg. Daily Visits</span>
                  <div className="font-serif text-xl font-extrabold text-[#1A1338]">5,819</div>
                  <div className="text-[10px] font-bold text-emerald-600 mt-1">↑ 10.8% vs last 7d</div>
                </div>
              </div>

              {/* MIDDLE SECTION GRID */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                {/* WEEKLY ACTIVITY LINE CHART */}
                <div className="lg:col-span-5 bg-white border border-[#EAE3F2] rounded-2xl p-5 shadow-xs flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-serif font-bold text-base text-[#1A1338]">Weekly Activity (Check-ins)</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#7147E8]" />
                        <span className="text-xs text-gray-500 font-medium">Check-ins</span>
                      </div>
                    </div>
                  </div>

                  <div className="w-full h-[180px] relative mt-2">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 400 150">
                      <line x1="0" y1="30" x2="400" y2="30" stroke="#F1EEF8" strokeDasharray="3 3" />
                      <line x1="0" y1="70" x2="400" y2="70" stroke="#F1EEF8" strokeDasharray="3 3" />
                      <line x1="0" y1="110" x2="400" y2="110" stroke="#F1EEF8" strokeDasharray="3 3" />
                      <defs>
                        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#7147E8" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#7147E8" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <path d="M 10 100 L 70 85 L 130 90 L 190 60 L 250 50 L 310 40 L 370 65 L 370 140 L 10 140 Z" fill="url(#chartGrad)" />
                      <path d="M 10 100 Q 40 92 70 85 T 130 90 T 190 60 T 250 50 T 310 40 T 370 65" fill="none" stroke="#7147E8" strokeWidth="3" />
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

                {/* MOOD DISTRIBUTION DONUT CHART */}
                <div className="lg:col-span-4 bg-white border border-[#EAE3F2] rounded-2xl p-5 shadow-xs flex flex-col justify-between">
                  <h3 className="font-serif font-bold text-base text-[#1A1338] mb-2">Mood Distribution (All Time)</h3>

                  <div className="flex items-center gap-4 my-auto">
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
                    </div>
                  </div>
                </div>

                {/* QUICK ACTIONS BUTTONS */}
                <div className="lg:col-span-3 bg-white border border-[#EAE3F2] rounded-2xl p-5 shadow-xs flex flex-col justify-between">
                  <h3 className="font-serif font-bold text-base text-[#1A1338] mb-3">Quick Actions</h3>
                  <div className="space-y-2">
                    <button onClick={exportUsersCSV} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl border border-[#EBE5F5] bg-[#FAF8FD] hover:bg-[#F0EBFA] text-xs font-bold text-[#7147E8] transition-all cursor-pointer">
                      <span>📥 Export Users CSV</span>
                    </button>
                    <button onClick={exportLeadsCSV} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl border border-[#EBE5F5] bg-[#FAF8FD] hover:bg-[#F0EBFA] text-xs font-bold text-[#7147E8] transition-all cursor-pointer">
                      <span>✉️ Export Leads CSV</span>
                    </button>
                    <button onClick={() => setActiveModal('addMood')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl border border-[#EBE5F5] bg-[#FAF8FD] hover:bg-[#F0EBFA] text-xs font-bold text-[#7147E8] transition-all cursor-pointer">
                      <span>➕ Add Mood Page</span>
                    </button>
                    <button onClick={() => setActiveModal('createPlan')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl border border-[#EBE5F5] bg-[#FAF8FD] hover:bg-[#F0EBFA] text-xs font-bold text-[#7147E8] transition-all cursor-pointer">
                      <span>🎁 Create Plan</span>
                    </button>
                    <button onClick={() => changeTab('Reports')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl border border-[#EBE5F5] bg-[#FAF8FD] hover:bg-[#F0EBFA] text-xs font-bold text-[#7147E8] transition-all cursor-pointer">
                      <span>📊 View Reports</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* LOWER SECTION ROW 1 */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                {/* RECENT USERS TABLE */}
                <div className="lg:col-span-5 bg-white border border-[#EAE3F2] rounded-2xl p-5 shadow-xs flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-serif font-bold text-base text-[#1A1338]">Recent Users</h3>
                    <button onClick={() => changeTab('Users')} className="text-xs font-bold text-[#7147E8] hover:underline cursor-pointer">View All</button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-gray-100 text-gray-400 font-bold uppercase text-[10px]">
                          <th className="pb-2.5">Name</th>
                          <th className="pb-2.5">Email</th>
                          <th className="pb-2.5">Join Date</th>
                          <th className="pb-2.5">Visits</th>
                          <th className="pb-2.5">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50 text-[#1A1338] font-medium">
                        {filteredUsers.slice(0, 5).map((u) => (
                          <tr key={u.id} className="hover:bg-[#FAF8FD] transition-all">
                            <td className="py-2.5 font-bold text-[11px]">{u.name}</td>
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
                </div>

                {/* LATEST CHECK-INS TABLE */}
                <div className="lg:col-span-4 bg-white border border-[#EAE3F2] rounded-2xl p-5 shadow-xs flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-serif font-bold text-base text-[#1A1338]">Latest Check-ins</h3>
                    <button onClick={() => changeTab('Check-ins')} className="text-xs font-bold text-[#7147E8] hover:underline cursor-pointer">View All</button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-gray-100 text-gray-400 font-bold uppercase text-[10px]">
                          <th className="pb-2.5">User</th>
                          <th className="pb-2.5">Mood</th>
                          <th className="pb-2.5">Action Shown</th>
                          <th className="pb-2.5">Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50 text-[#1A1338] font-medium">
                        {filteredCheckins.slice(0, 5).map((c) => (
                          <tr key={c.id} className="hover:bg-[#FAF8FD] transition-all">
                            <td className="py-2.5 font-bold text-[11px]">{c.user}</td>
                            <td className="py-2.5 text-[11px]">{c.mood}</td>
                            <td className="py-2.5 text-[11px] font-semibold text-[#7147E8]">{c.action}</td>
                            <td className="py-2.5 text-[10px] text-gray-400">{c.time}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* CONSENT & PRIVACY CARDS */}
                <div className="lg:col-span-3 space-y-4">
                  <div className="bg-white border border-[#EAE3F2] rounded-2xl p-4 shadow-xs">
                    <h4 className="font-serif font-bold text-sm text-[#1A1338] mb-1">Consent &amp; Privacy</h4>
                    <p className="text-xs text-[#5B5278] leading-relaxed mb-2.5">
                      Users must consent to store their mood, moods, dates, actions and purchase history.
                    </p>
                    <button onClick={() => alert('Consent Logs: 12,458 users granted active consent.')} className="text-xs font-extrabold text-[#7147E8] hover:underline cursor-pointer">
                      View Consent Logs →
                    </button>
                  </div>

                  <div className="bg-white border border-[#EAE3F2] rounded-2xl p-4 shadow-xs">
                    <h4 className="font-serif font-bold text-sm text-[#1A1338] mb-1">90-Day Auto Deletion</h4>
                    <p className="text-xs text-[#5B5278] leading-relaxed mb-2.5">
                      User data is automatically deleted 90 days after account deletion.
                    </p>
                    <button onClick={() => alert('Deletion Queue: 0 pending deletions.')} className="text-xs font-extrabold text-[#7147E8] hover:underline cursor-pointer">
                      View Deletion Logs →
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* VIEW TAB 2: USERS MANAGEMENT */}
          {activeTab === 'Users' && (
            <div className="bg-white border border-[#EAE3F2] rounded-2xl p-6 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h2 className="font-serif font-bold text-xl text-[#1A1338]">User Management</h2>
                  <p className="text-xs text-gray-500">View, search and manage all registered MoodFlip users</p>
                </div>
                <div className="flex gap-2">
                  <select 
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="border border-[#EAE3F2] rounded-xl px-3 py-1.5 text-xs font-bold text-[#1A1338]"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Active">Active Only</option>
                    <option value="Inactive">Inactive Only</option>
                  </select>
                  <button onClick={exportUsersCSV} className="bg-[#7147E8] text-white px-3.5 py-1.5 rounded-xl text-xs font-bold hover:bg-[#5E36D4]">
                    Export CSV
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-gray-200 text-gray-400 font-bold uppercase text-[10px]">
                      <th className="py-3">User</th>
                      <th className="py-3">Email Address</th>
                      <th className="py-3">Joined Date</th>
                      <th className="py-3">Check-in Count</th>
                      <th className="py-3">Status</th>
                      <th className="py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-medium">
                    {filteredUsers.map((u) => (
                      <tr key={u.id} className="hover:bg-[#FAF8FD]">
                        <td className="py-3 flex items-center gap-2.5">
                          <span className={`w-8 h-8 rounded-full ${u.avatarBg} font-bold flex items-center justify-center text-xs`}>
                            {u.name.charAt(0)}
                          </span>
                          <span className="font-bold text-sm">{u.name}</span>
                        </td>
                        <td className="py-3 text-gray-600">{u.email}</td>
                        <td className="py-3">{u.joinDate}</td>
                        <td className="py-3 font-bold">{u.visitCount} check-ins</td>
                        <td className="py-3">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${u.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                            {u.status}
                          </span>
                        </td>
                        <td className="py-3">
                          <button onClick={() => alert(`Editing user: ${u.name}`)} className="text-[#7147E8] font-bold hover:underline">
                            Edit User
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* VIEW TAB 3: CHECK-INS ACTIVITY LOG */}
          {activeTab === 'Check-ins' && (
            <div className="bg-white border border-[#EAE3F2] rounded-2xl p-6 shadow-xs space-y-4">
              <h2 className="font-serif font-bold text-xl text-[#1A1338]">Check-ins Activity Log</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-gray-200 text-gray-400 font-bold uppercase text-[10px]">
                      <th className="py-3">ID</th>
                      <th className="py-3">User</th>
                      <th className="py-3">Initial Mood</th>
                      <th className="py-3">Target Positive Mood</th>
                      <th className="py-3">Mindset Shift Action</th>
                      <th className="py-3">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-medium">
                    {filteredCheckins.map((c) => (
                      <tr key={c.id} className="hover:bg-[#FAF8FD]">
                        <td className="py-3 text-gray-400">#{c.id}</td>
                        <td className="py-3 font-bold text-sm">{c.user}</td>
                        <td className="py-3"><span className="bg-purple-50 text-purple-700 px-2.5 py-1 rounded-md font-bold">{c.mood}</span></td>
                        <td className="py-3"><span className="bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-md font-bold">{c.positiveMood}</span></td>
                        <td className="py-3 font-bold text-[#7147E8]">{c.action}</td>
                        <td className="py-3 text-gray-400">{c.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* VIEW TAB 4: MOOD LIBRARY MANAGEMENT */}
          {activeTab === 'Mood Library' && (
            <div className="bg-white border border-[#EAE3F2] rounded-2xl p-6 shadow-xs space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif font-bold text-xl text-[#1A1338]">Mood Library Management</h2>
                  <p className="text-xs text-gray-500">Configure supported moods, feelings tags and counterpart shifts.</p>
                </div>
                <button onClick={() => setActiveModal('addMood')} className="bg-[#7147E8] text-white px-4 py-2 rounded-xl text-xs font-bold hover:opacity-95">
                  ➕ Add New Mood
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: 'Anxious', emoji: '😰', target: 'Calm & Confident', category: 'Anxious', feelings: ['Nervous', 'Uneasy', 'On edge'] },
                  { name: 'Angry', emoji: '😡', target: 'Peaceful', category: 'Angry', feelings: ['Mad', 'Furious', 'Resentful'] },
                  { name: 'Overwhelmed', emoji: '🌸', target: 'Organized & Serene', category: 'Overwhelmed', feelings: ['Flooded', 'Scattered', 'Too much'] },
                  { name: 'Sad', emoji: '😢', target: 'Hopeful', category: 'Low', feelings: ['Down', 'Heavy', 'Blue'] },
                  { name: 'Lonely', emoji: '🧍', target: 'Connected', category: 'Lonely', feelings: ['Disconnected', 'Left out', 'Missing someone'] },
                  { name: 'Stressed', emoji: '⚡', target: 'Relaxed', category: 'Overwhelmed', feelings: ['Pressured', 'Tense', 'Rushed'] },
                ].map((m, i) => (
                  <div key={i} className="p-4 rounded-xl bg-[#FAF8FD] border border-[#F0EBFA] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{m.emoji}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-100 text-[#7147E8]">{m.category}</span>
                    </div>
                    <strong className="block text-sm font-bold">{m.name} ➔ <span className="text-emerald-600">{m.target}</span></strong>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {m.feelings.map(f => (
                        <span key={f} className="text-[10px] bg-white border border-gray-200 px-2 py-0.5 rounded-md text-gray-600">{f}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW TAB 5: PLANS & PAYMENTS */}
          {activeTab === 'Plans & Payments' && (
            <div className="bg-white border border-[#EAE3F2] rounded-2xl p-6 shadow-xs space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif font-bold text-xl text-[#1A1338]">Plans &amp; Payments Management</h2>
                  <p className="text-xs text-gray-500">Track 7-Day &amp; 30-Day Plan pricing, sales and revenue metrics.</p>
                </div>
                <button onClick={() => setActiveModal('createPlan')} className="bg-[#7147E8] text-white px-4 py-2 rounded-xl text-xs font-bold">
                  🎁 Create New Plan
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="p-5 rounded-2xl bg-[#FAF8FD] border border-[#F0EBFA] space-y-3">
                  <div className="flex items-center justify-between">
                    <strong className="text-base font-bold text-[#1A1338]">7-Day Mindset Plan</strong>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-extrabold">$9.99 / one-time</span>
                  </div>
                  <p className="text-xs text-[#5B5278]">Total Sales: 1,842 units · Total Revenue: $18,401</p>
                  <button onClick={exportUsersCSV} className="px-3.5 py-2 rounded-xl bg-[#7147E8] text-white text-xs font-bold">
                    Export Subscribers List
                  </button>
                </div>

                <div className="p-5 rounded-2xl bg-[#FAF8FD] border border-[#F0EBFA] space-y-3">
                  <div className="flex items-center justify-between">
                    <strong className="text-base font-bold text-[#1A1338]">30-Day Transformation Plan</strong>
                    <span className="px-2.5 py-1 rounded-full bg-purple-100 text-[#7147E8] text-xs font-extrabold">$19.99 (Draft)</span>
                  </div>
                  <p className="text-xs text-[#5B5278]">Total Sales: 0 units · Launching soon</p>
                  <button onClick={() => alert('30-Day Plan settings edited')} className="px-3.5 py-2 rounded-xl bg-gray-100 text-gray-700 border border-gray-200 text-xs font-bold">
                    Edit Plan Details
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* VIEW TAB 6: REPORTS */}
          {activeTab === 'Reports' && (
            <div className="bg-white border border-[#EAE3F2] rounded-2xl p-6 shadow-xs space-y-5">
              <h2 className="font-serif font-bold text-xl text-[#1A1338]">Reports &amp; Platform Logs</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { name: 'Monthly User Retention Report', date: 'May 2026', format: 'PDF' },
                  { name: 'Mood Shift Efficacy Analysis', date: 'May 2026', format: 'CSV' },
                  { name: '90-Day Auto-Deletion Audit Log', date: 'May 2026', format: 'LOG' },
                ].map((rep, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-[#FAF8FD] border border-[#F0EBFA] flex items-center justify-between">
                    <div>
                      <strong className="block text-xs font-bold text-[#1A1338]">{rep.name}</strong>
                      <span className="text-[10px] text-gray-400">{rep.date} · {rep.format}</span>
                    </div>
                    <button onClick={() => alert(`Downloading report: ${rep.name}`)} className="px-3 py-1.5 rounded-lg bg-[#7147E8] text-white text-xs font-bold">
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW TAB 7: EMAIL LEADS */}
          {activeTab === 'Email Leads' && (
            <div className="bg-white border border-[#EAE3F2] rounded-2xl p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif font-bold text-xl text-[#1A1338]">Collected Email Leads ({leads.length})</h2>
                  <p className="text-xs text-gray-500">Leads captured through 7-Day Plan popups and daily reminders.</p>
                </div>
                <button onClick={exportLeadsCSV} className="bg-[#7147E8] text-white px-4 py-2 rounded-xl text-xs font-bold">
                  ✉️ Export Leads CSV
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-gray-200 text-gray-400 font-bold uppercase text-[10px]">
                      <th className="py-3">ID</th>
                      <th className="py-3">Email Address</th>
                      <th className="py-3">Date Captured</th>
                      <th className="py-3">Source Channel</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-medium">
                    {leads.map((l) => (
                      <tr key={l.id} className="hover:bg-[#FAF8FD]">
                        <td className="py-3 text-gray-400">#{l.id}</td>
                        <td className="py-3 font-bold text-sm text-[#1A1338]">{l.email}</td>
                        <td className="py-3 text-gray-500">{l.date}</td>
                        <td className="py-3"><span className="bg-purple-100 text-[#7147E8] px-2.5 py-1 rounded-md font-bold">{l.source}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* VIEW TAB 8: ANALYTICS */}
          {activeTab === 'Analytics' && (
            <div className="bg-white border border-[#EAE3F2] rounded-2xl p-6 shadow-xs space-y-5">
              <h2 className="font-serif font-bold text-xl text-[#1A1338]">Traffic &amp; Engagement Analytics</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-[#FAF8FD] border border-[#F0EBFA]">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Daily Active Users</span>
                  <div className="font-serif text-2xl font-extrabold text-[#1A1338]">3,420</div>
                </div>
                <div className="p-4 rounded-xl bg-[#FAF8FD] border border-[#F0EBFA]">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Conversion Rate</span>
                  <div className="font-serif text-2xl font-extrabold text-emerald-600">14.8%</div>
                </div>
                <div className="p-4 rounded-xl bg-[#FAF8FD] border border-[#F0EBFA]">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Bounce Rate</span>
                  <div className="font-serif text-2xl font-extrabold text-sky-600">22.4%</div>
                </div>
                <div className="p-4 rounded-xl bg-[#FAF8FD] border border-[#F0EBFA]">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Avg. Session Time</span>
                  <div className="font-serif text-2xl font-extrabold text-purple-600">4m 12s</div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW TAB 9: AD SPACES */}
          {activeTab === 'Ad Spaces' && (
            <div className="bg-white border border-[#EAE3F2] rounded-2xl p-6 shadow-xs space-y-6">
              <div>
                <h2 className="font-serif font-bold text-xl text-[#1A1338]">Google AdSense &amp; Ad Spaces</h2>
                <p className="text-xs text-gray-500">Configure live advertisement slots across MoodFlip desktop and mobile pages.</p>
              </div>

              <div className="space-y-4 max-w-lg">
                <div className="flex items-center justify-between p-4 rounded-xl bg-[#FAF8FD] border border-[#F0EBFA]">
                  <div>
                    <strong className="block text-xs font-bold text-[#1A1338]">Header Banner Ad (728x90)</strong>
                    <span className="text-[11px] text-gray-500">Displayed below hero section</span>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={adsEnabled.headerBanner}
                    onChange={e => setAdsEnabled({ ...adsEnabled, headerBanner: e.target.checked })}
                    className="w-4 h-4 accent-[#7147E8] cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-[#FAF8FD] border border-[#F0EBFA]">
                  <div>
                    <strong className="block text-xs font-bold text-[#1A1338]">Sidebar Ad Unit (300x250)</strong>
                    <span className="text-[11px] text-gray-500">Displayed in sidebar panel</span>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={adsEnabled.sidebarAd}
                    onChange={e => setAdsEnabled({ ...adsEnabled, sidebarAd: e.target.checked })}
                    className="w-4 h-4 accent-[#7147E8] cursor-pointer"
                  />
                </div>

                <button onClick={() => alert('Ad space settings updated successfully!')} className="bg-[#7147E8] text-white px-5 py-2.5 rounded-xl text-xs font-bold">
                  Save Ad Settings
                </button>
              </div>
            </div>
          )}

          {/* VIEW TAB 10: SETTINGS */}
          {activeTab === 'Settings' && (
            <div className="bg-white border border-[#EAE3F2] rounded-2xl p-6 shadow-xs space-y-6">
              <div>
                <h2 className="font-serif font-bold text-xl text-[#1A1338]">Platform System Settings ⚙️</h2>
                <p className="text-xs text-gray-500">Global site configuration and security settings.</p>
              </div>

              <div className="space-y-4 max-w-lg">
                <div>
                  <label className="block text-xs font-bold mb-1">Site Title</label>
                  <input type="text" defaultValue="MoodFlip | Self-Reflection Utility" className="w-full border p-2.5 rounded-xl text-xs" />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">Admin Email</label>
                  <input type="email" defaultValue="admin@moodflip.coach" className="w-full border p-2.5 rounded-xl text-xs" />
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-[#FAF8FD] border border-[#F0EBFA]">
                  <div>
                    <strong className="block text-xs font-bold text-[#1A1338]">90-Day Auto Delete Policy</strong>
                    <span className="text-[11px] text-gray-500 font-medium">Auto-wipe inactive data after 90 days</span>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#7147E8] cursor-pointer" />
                </div>
                <button onClick={() => alert('System settings saved!')} className="bg-[#7147E8] text-white px-5 py-2.5 rounded-xl text-xs font-bold">
                  Save Settings
                </button>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* MODAL DIALOGS FOR QUICK ACTIONS */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-[#EAE3F2] shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-bold text-lg text-[#1A1338]">
                {activeModal === 'addMood' ? '➕ Add New Mood Page' : '🎁 Create New Plan'}
              </h3>
              <button onClick={() => setActiveModal(null)} className="text-gray-400 font-bold hover:text-black">✕</button>
            </div>
            {activeModal === 'addMood' ? (
              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold mb-1">Mood Title</label>
                  <input type="text" placeholder="e.g. Overwhelmed to Serene" className="w-full border p-2.5 rounded-xl" />
                </div>
                <div>
                  <label className="block font-bold mb-1">Mindset Action</label>
                  <input type="text" placeholder="e.g. 60-Second Breathing Reset" className="w-full border p-2.5 rounded-xl" />
                </div>
                <button onClick={() => { alert('New Mood Page added!'); setActiveModal(null); }} className="w-full bg-[#7147E8] text-white py-2.5 rounded-xl font-bold">
                  Save &amp; Publish Mood Page
                </button>
              </div>
            ) : (
              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold mb-1">Plan Title</label>
                  <input type="text" placeholder="e.g. 30-Day Transformation Plan" className="w-full border p-2.5 rounded-xl" />
                </div>
                <div>
                  <label className="block font-bold mb-1">Price ($)</label>
                  <input type="number" placeholder="29" className="w-full border p-2.5 rounded-xl" />
                </div>
                <button onClick={() => { alert('New Plan Created!'); setActiveModal(null); }} className="w-full bg-[#7147E8] text-white py-2.5 rounded-xl font-bold">
                  Publish Plan
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
