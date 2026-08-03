'use client';

import React, { useState } from 'react';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState('May 9 - May 15, 2026');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('All');
  const [activeModal, setActiveModal] = useState<string | null>(null);

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
  ]);

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
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#7147E8] to-[#EC4899] flex items-center justify-center text-white text-xs">
              😊
            </div>
            <span className="font-serif font-extrabold text-xl text-[#1A1338]">moodflip</span>
          </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-[#7147E8] text-white font-extrabold flex items-center justify-center text-xs">
          A
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
            <div className="hidden lg:flex items-center gap-2.5 mb-7 px-2 pt-1">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#7147E8] via-[#A855F7] to-[#EC4899] flex items-center justify-center text-white font-bold text-lg shadow-sm">
                😊
              </div>
              <span className="font-serif text-2xl font-extrabold text-[#1A1338] tracking-tight">
                moodflip
              </span>
            </div>

            {/* NAVIGATION MENU WITH PROFESSIONAL VECTOR SVG ICONS */}
            <nav className="space-y-1">
              {/* 1. Dashboard */}
              <button
                onClick={() => { setActiveTab('Dashboard'); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                  activeTab === 'Dashboard'
                    ? 'bg-gradient-to-r from-[#7147E8] to-[#8C60F7] text-white shadow-md shadow-[#7147E8]/20'
                    : 'text-[#5B5278] hover:bg-[#F0EBFA] hover:text-[#1A1338]'
                }`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                <span>Dashboard</span>
              </button>

              {/* 2. Users */}
              <button
                onClick={() => { setActiveTab('Users'); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                  activeTab === 'Users'
                    ? 'bg-gradient-to-r from-[#7147E8] to-[#8C60F7] text-white shadow-md shadow-[#7147E8]/20'
                    : 'text-[#5B5278] hover:bg-[#F0EBFA] hover:text-[#1A1338]'
                }`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span>Users</span>
              </button>

              {/* 3. Check-ins */}
              <button
                onClick={() => { setActiveTab('Check-ins'); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                  activeTab === 'Check-ins'
                    ? 'bg-gradient-to-r from-[#7147E8] to-[#8C60F7] text-white shadow-md shadow-[#7147E8]/20'
                    : 'text-[#5B5278] hover:bg-[#F0EBFA] hover:text-[#1A1338]'
                }`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                <span>Check-ins</span>
              </button>

              {/* 4. Mood Library */}
              <button
                onClick={() => { setActiveTab('Mood Library'); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                  activeTab === 'Mood Library'
                    ? 'bg-gradient-to-r from-[#7147E8] to-[#8C60F7] text-white shadow-md shadow-[#7147E8]/20'
                    : 'text-[#5B5278] hover:bg-[#F0EBFA] hover:text-[#1A1338]'
                }`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Mood Library</span>
              </button>

              {/* 5. Plans & Payments */}
              <button
                onClick={() => { setActiveTab('Plans & Payments'); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                  activeTab === 'Plans & Payments'
                    ? 'bg-gradient-to-r from-[#7147E8] to-[#8C60F7] text-white shadow-md shadow-[#7147E8]/20'
                    : 'text-[#5B5278] hover:bg-[#F0EBFA] hover:text-[#1A1338]'
                }`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Plans &amp; Payments</span>
              </button>

              {/* 6. Reports */}
              <button
                onClick={() => { setActiveTab('Reports'); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                  activeTab === 'Reports'
                    ? 'bg-gradient-to-r from-[#7147E8] to-[#8C60F7] text-white shadow-md shadow-[#7147E8]/20'
                    : 'text-[#5B5278] hover:bg-[#F0EBFA] hover:text-[#1A1338]'
                }`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <span>Reports</span>
              </button>

              {/* 7. Email Leads */}
              <button
                onClick={() => { setActiveTab('Email Leads'); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                  activeTab === 'Email Leads'
                    ? 'bg-gradient-to-r from-[#7147E8] to-[#8C60F7] text-white shadow-md shadow-[#7147E8]/20'
                    : 'text-[#5B5278] hover:bg-[#F0EBFA] hover:text-[#1A1338]'
                }`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Email Leads</span>
              </button>

              {/* 8. Analytics */}
              <button
                onClick={() => { setActiveTab('Analytics'); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                  activeTab === 'Analytics'
                    ? 'bg-gradient-to-r from-[#7147E8] to-[#8C60F7] text-white shadow-md shadow-[#7147E8]/20'
                    : 'text-[#5B5278] hover:bg-[#F0EBFA] hover:text-[#1A1338]'
                }`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
                <span>Analytics</span>
              </button>

              {/* 9. Ad Spaces */}
              <button
                onClick={() => { setActiveTab('Ad Spaces'); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                  activeTab === 'Ad Spaces'
                    ? 'bg-gradient-to-r from-[#7147E8] to-[#8C60F7] text-white shadow-md shadow-[#7147E8]/20'
                    : 'text-[#5B5278] hover:bg-[#F0EBFA] hover:text-[#1A1338]'
                }`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                </svg>
                <span>Ad Spaces</span>
              </button>

              {/* 10. Settings */}
              <button
                onClick={() => { setActiveTab('Settings'); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                  activeTab === 'Settings'
                    ? 'bg-gradient-to-r from-[#7147E8] to-[#8C60F7] text-white shadow-md shadow-[#7147E8]/20'
                    : 'text-[#5B5278] hover:bg-[#F0EBFA] hover:text-[#1A1338]'
                }`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Settings</span>
              </button>

              {/* 11. Logout */}
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to log out of Admin Dashboard?')) {
                    window.location.href = '/login';
                  }
                }}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold text-gray-500 hover:bg-rose-50 hover:text-rose-600 transition-all cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Logout</span>
              </button>
            </nav>
          </div>

          {/* SIDEBAR MOTIVATIONAL CARD WITH FULL SUNSET BACKGROUND MATCHING SCREENSHOT 1 & 2 */}
          <div 
            className="mt-6 relative overflow-hidden rounded-[26px] border border-[#EAE3D6] p-6 shadow-md flex flex-col justify-between text-center min-h-[340px] bg-cover bg-center"
            style={{ backgroundImage: "url('/login-bg.jpg')" }}
          >
            {/* Soft Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/40 to-transparent pointer-events-none" />

            <div className="relative z-10 text-center pt-2">
              <h4 className="font-serif font-extrabold text-base md:text-lg text-[#1A1338] leading-snug mb-2 tracking-tight">
                Spread positivity.<br />Inspire change.
              </h4>
              <p className="text-xs text-[#5B5278] font-medium leading-relaxed max-w-[210px] mx-auto">
                Thank you for helping millions live better.
              </p>
            </div>

            {/* Glowing Heart Pill Circle Icon at Bottom Center */}
            <div className="relative z-10 w-12 h-12 rounded-full bg-[#7147E8] text-white flex items-center justify-center shadow-lg shadow-[#7147E8]/40 mx-auto mt-6 mb-2">
              <svg className="w-5.5 h-5.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
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
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
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
                onClick={() => alert('Notifications (8): New user registration, 7-Day plan sale, eQTL export completed.')}
                className="relative w-9 h-9 rounded-xl bg-[#F5F2FA] border border-[#EBE5F5] flex items-center justify-center text-[#5B5278] hover:bg-[#EBE4F7] transition-all cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#EC4899] text-white text-[9px] font-extrabold rounded-full flex items-center justify-center">8</span>
              </button>
              <button 
                onClick={() => alert('Messages (3): User inquiry about 7-Day Plan, Feedback submission.')}
                className="relative w-9 h-9 rounded-xl bg-[#F5F2FA] border border-[#EBE5F5] flex items-center justify-center text-[#5B5278] hover:bg-[#EBE4F7] transition-all cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
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
                {activeTab === 'Dashboard' ? 'Admin Dashboard' : `Admin — ${activeTab}`}
              </h1>
              <p className="text-xs md:text-sm text-[#68607F] font-medium mt-0.5">
                Overview of users, check-ins, revenue and activity
              </p>
            </div>
            <div className="flex items-center gap-2 bg-white border border-[#EAE3F2] rounded-xl px-3.5 py-2 shadow-xs cursor-pointer self-start sm:self-auto">
              <svg className="w-4 h-4 text-[#7147E8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
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

          {/* VIEW TAB 1: DASHBOARD OVERVIEW */}
          {activeTab === 'Dashboard' && (
            <>
              {/* TOP 6 METRIC CARDS ROW */}
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3.5">
                <div className="bg-white border border-[#EAE3F2] rounded-2xl p-4 shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-[#68607F]">Total Users</span>
                    <div className="w-7 h-7 rounded-lg bg-[#7147E8]/10 text-[#7147E8] flex items-center justify-center">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="font-serif text-xl font-extrabold text-[#1A1338]">12,458</div>
                  <div className="text-[10px] font-bold text-emerald-600 mt-1 flex items-center gap-0.5">
                    <span>↑ 8.7%</span> <span className="text-gray-400 font-normal">vs last 7 days</span>
                  </div>
                </div>

                <div className="bg-white border border-[#EAE3F2] rounded-2xl p-4 shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-[#68607F]">Total Check-ins</span>
                    <div className="w-7 h-7 rounded-lg bg-[#7147E8]/10 text-[#7147E8] flex items-center justify-center">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  <div className="font-serif text-xl font-extrabold text-[#1A1338]">89,142</div>
                  <div className="text-[10px] font-bold text-emerald-600 mt-1 flex items-center gap-0.5">
                    <span>↑ 12.4%</span> <span className="text-gray-400 font-normal">vs last 7 days</span>
                  </div>
                </div>

                <div className="bg-white border border-[#EAE3F2] rounded-2xl p-4 shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-[#68607F]">Active Paid Users</span>
                    <div className="w-7 h-7 rounded-lg bg-[#7147E8]/10 text-[#7147E8] flex items-center justify-center">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    </div>
                  </div>
                  <div className="font-serif text-xl font-extrabold text-[#1A1338]">3,276</div>
                  <div className="text-[10px] font-bold text-emerald-600 mt-1 flex items-center gap-0.5">
                    <span>↑ 9.3%</span> <span className="text-gray-400 font-normal">vs last 7 days</span>
                  </div>
                </div>

                <div className="bg-white border border-[#EAE3F2] rounded-2xl p-4 shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-[#68607F]">7-Day Plan Sales</span>
                    <div className="w-7 h-7 rounded-lg bg-[#7147E8]/10 text-[#7147E8] flex items-center justify-center">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                  </div>
                  <div className="font-serif text-xl font-extrabold text-[#1A1338]">1,842</div>
                  <div className="text-[10px] font-bold text-emerald-600 mt-1 flex items-center gap-0.5">
                    <span>↑ 15.2%</span> <span className="text-gray-400 font-normal">vs last 7 days</span>
                  </div>
                </div>

                <div className="bg-white border border-[#EAE3F2] rounded-2xl p-4 shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-[#68607F]">Revenue</span>
                    <div className="w-7 h-7 rounded-lg bg-[#7147E8]/10 text-[#7147E8] flex items-center justify-center">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  <div className="font-serif text-xl font-extrabold text-[#1A1338]">$18,942</div>
                  <div className="text-[10px] font-bold text-emerald-600 mt-1 flex items-center gap-0.5">
                    <span>↑ 13.1%</span> <span className="text-gray-400 font-normal">vs last 7 days</span>
                  </div>
                </div>

                <div className="bg-white border border-[#EAE3F2] rounded-2xl p-4 shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-[#68607F]">Avg. Daily Visits</span>
                    <div className="w-7 h-7 rounded-lg bg-[#7147E8]/10 text-[#7147E8] flex items-center justify-center">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="font-serif text-xl font-extrabold text-[#1A1338]">5,819</div>
                  <div className="text-[10px] font-bold text-emerald-600 mt-1 flex items-center gap-0.5">
                    <span>↑ 10.8%</span> <span className="text-gray-400 font-normal">vs last 7 days</span>
                  </div>
                </div>
              </div>

              {/* MIDDLE SECTION GRID (CHARTS & QUICK ACTIONS) */}
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
                    <div className="border border-gray-200 rounded-lg px-2.5 py-1 text-xs font-semibold text-gray-600 flex items-center gap-1 cursor-pointer">
                      This Week <span className="text-[9px]">˅</span>
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
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-gray-300" /> 💭 Other</span>
                        <strong className="text-[#1A1338]">7.7%</strong>
                      </div>
                    </div>
                  </div>
                </div>

                {/* QUICK ACTIONS BUTTONS WITH VECTOR SVG ICONS MATCHING SCREENSHOT 3 */}
                <div className="lg:col-span-3 bg-white border border-[#EAE3F2] rounded-2xl p-5 shadow-xs flex flex-col justify-between">
                  <h3 className="font-serif font-bold text-base text-[#1A1338] mb-3">Quick Actions</h3>
                  <div className="space-y-2">
                    <button onClick={exportUsersCSV} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl border border-[#EBE5F5] bg-[#FAF8FD] hover:bg-[#F0EBFA] text-xs font-bold text-[#7147E8] transition-all cursor-pointer">
                      <svg className="w-4 h-4 text-[#7147E8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      <span>Export Users CSV</span>
                    </button>
                    <button onClick={exportLeadsCSV} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl border border-[#EBE5F5] bg-[#FAF8FD] hover:bg-[#F0EBFA] text-xs font-bold text-[#7147E8] transition-all cursor-pointer">
                      <svg className="w-4 h-4 text-[#7147E8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>Export Leads CSV</span>
                    </button>
                    <button onClick={() => setActiveModal('addMood')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl border border-[#EBE5F5] bg-[#FAF8FD] hover:bg-[#F0EBFA] text-xs font-bold text-[#7147E8] transition-all cursor-pointer">
                      <svg className="w-4 h-4 text-[#7147E8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Add Mood Page</span>
                    </button>
                    <button onClick={() => setActiveModal('createPlan')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl border border-[#EBE5F5] bg-[#FAF8FD] hover:bg-[#F0EBFA] text-xs font-bold text-[#7147E8] transition-all cursor-pointer">
                      <svg className="w-4 h-4 text-[#7147E8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 00-2 2v6a2 2 0 002 2h14a2 2 0 002-2v-6a2 2 0 00-2-2H5z" />
                      </svg>
                      <span>Create Plan</span>
                    </button>
                    <button onClick={() => setActiveTab('Reports')} className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl border border-[#EBE5F5] bg-[#FAF8FD] hover:bg-[#F0EBFA] text-xs font-bold text-[#7147E8] transition-all cursor-pointer">
                      <svg className="w-4 h-4 text-[#7147E8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      <span>View Reports</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* LOWER SECTION ROW 1 (TABLES & PRIVACY CARDS MATCHING SCREENSHOT 3) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                {/* RECENT USERS TABLE */}
                <div className="lg:col-span-5 bg-white border border-[#EAE3F2] rounded-2xl p-5 shadow-xs flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-serif font-bold text-base text-[#1A1338]">Recent Users</h3>
                    <button onClick={() => setActiveTab('Users')} className="text-xs font-bold text-[#7147E8] hover:underline cursor-pointer">View All</button>
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
                        {filteredUsers.slice(0, 5).map((u) => (
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
                    <span>Showing 1 to {Math.min(5, filteredUsers.length)} of {users.length} users</span>
                    <div className="flex items-center gap-1 font-bold">
                      <span className="px-2 py-1 bg-gray-100 rounded text-gray-600">1</span>
                      <span className="px-2 py-1 hover:bg-gray-100 rounded cursor-pointer">2</span>
                      <span className="px-2 py-1 hover:bg-gray-100 rounded cursor-pointer">3</span>
                    </div>
                  </div>
                </div>

                {/* LATEST CHECK-INS TABLE */}
                <div className="lg:col-span-4 bg-white border border-[#EAE3F2] rounded-2xl p-5 shadow-xs flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-serif font-bold text-base text-[#1A1338]">Latest Check-ins</h3>
                    <button onClick={() => setActiveTab('Check-ins')} className="text-xs font-bold text-[#7147E8] hover:underline cursor-pointer">View All</button>
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
                        {filteredCheckins.slice(0, 5).map((c) => (
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
                    <button onClick={() => setActiveTab('Check-ins')} className="text-[11px] font-bold text-[#7147E8] hover:underline cursor-pointer">View All Check-ins →</button>
                  </div>
                </div>

                {/* CONSENT & PRIVACY CARDS WITH PROFESSIONAL ROUNDED VECTOR SVG BADGES MATCHING SCREENSHOT 3 */}
                <div className="lg:col-span-3 space-y-4">
                  <div className="bg-white border border-[#EAE3F2] rounded-2xl p-4 shadow-xs">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#F0EBFA] text-[#7147E8] flex items-center justify-center shrink-0">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-serif font-bold text-sm text-[#1A1338] mb-1">
                          Consent &amp; Privacy
                        </h4>
                        <p className="text-xs text-[#5B5278] leading-relaxed mb-2.5">
                          Users must consent to store their mood, moods, dates, actions and purchase history.
                        </p>
                        <button onClick={() => alert('Consent Logs: 12,458 users have granted active data consent.')} className="text-xs font-extrabold text-[#7147E8] hover:underline cursor-pointer">
                          View Consent Logs →
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-[#EAE3F2] rounded-2xl p-4 shadow-xs">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#F0EBFA] text-[#7147E8] flex items-center justify-center shrink-0">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-serif font-bold text-sm text-[#1A1338] mb-1">
                          90-Day Auto Deletion
                        </h4>
                        <p className="text-xs text-[#5B5278] leading-relaxed mb-2.5">
                          User data is automatically deleted 90 days after account deletion.
                        </p>
                        <button onClick={() => alert('Deletion Logs: 0 pending deletions in queue.')} className="text-xs font-extrabold text-[#7147E8] hover:underline cursor-pointer">
                          View Deletion Logs →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* LOWER SECTION ROW 2 (PURCHASE STATUS & ENCOURAGEMENT BANNER MATCHING SCREENSHOT 1) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                {/* PURCHASE STATUS TABLE */}
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
                            <button onClick={() => setActiveTab('Users')} className="px-2.5 py-1 rounded bg-[#7147E8]/10 text-[#7147E8] font-bold text-[10px] hover:bg-[#7147E8]/20 cursor-pointer">View Users</button>
                            <button onClick={exportUsersCSV} className="px-2.5 py-1 rounded border border-gray-200 text-gray-600 font-bold text-[10px] hover:bg-gray-50 cursor-pointer">Export CSV</button>
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

                {/* BOTTOM ENCOURAGEMENT BANNER CARD WITH OFFICIAL WHITE SMILE CIRCLE BADGE MATCHING SCREENSHOT 1 */}
                <div 
                  className="lg:col-span-4 relative overflow-hidden rounded-2xl border border-[#EAE3F2] p-6 shadow-sm flex flex-col items-center justify-center text-center min-h-[170px] bg-cover bg-center" 
                  style={{ backgroundImage: "url('/login-bg.jpg')" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/80 to-white/40 pointer-events-none" />

                  <div className="relative z-10">
                    {/* OFFICIAL WHITE CIRCLE SMILE BADGE MATCHING SCREENSHOT 1 */}
                    <div className="w-14 h-14 rounded-full bg-white text-[#7147E8] flex items-center justify-center mx-auto mb-3 shadow-md border border-purple-50">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#7147E8] via-[#A855F7] to-[#EC4899] flex items-center justify-center text-white text-base shadow-xs font-bold">
                        😊
                      </div>
                    </div>

                    <h4 className="font-serif font-extrabold text-base md:text-lg text-[#1A1338] mb-1 tracking-tight">
                      You&apos;re making a difference
                    </h4>
                    <p className="text-xs text-[#5B5278] font-semibold max-w-xs mx-auto leading-relaxed">
                      Empowering minds. Building a kinder world.
                    </p>
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

          {/* VIEW TAB 3: CHECK-INS LOG */}
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

          {/* OTHER TABS FALLBACK */}
          {['Mood Library', 'Plans & Payments', 'Reports', 'Email Leads', 'Analytics', 'Ad Spaces', 'Settings'].includes(activeTab) && (
            <div className="bg-white border border-[#EAE3F2] rounded-2xl p-8 shadow-xs text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-[#7147E8]/10 text-[#7147E8] text-2xl font-bold flex items-center justify-center mx-auto">
                ⚙️
              </div>
              <h2 className="font-serif font-bold text-2xl text-[#1A1338]">{activeTab} Section</h2>
              <p className="text-sm text-gray-500 max-w-md mx-auto">
                Managing live data and settings for {activeTab}. Connected to MoodFlip live database.
              </p>
              <button onClick={() => setActiveTab('Dashboard')} className="bg-[#7147E8] text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-md hover:bg-[#5E36D4]">
                Return to Overview Dashboard
              </button>
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
