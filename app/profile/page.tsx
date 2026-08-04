'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
// AdBanner removed — ads only shown on homepage and blog

export default function UserDashboardPage() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [userProfile, setUserProfile] = useState({
    name: 'Emma Johnson',
    email: 'emma.johnson@example.com',
    bio: 'Finding calm and clarity one daily mindset shift at a time.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
  });

  // 💳 PAYMENT & PLAN STATE
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{ name: string; price: number; period: string }>({
    name: '7-Day Mindset Plan',
    price: 9.99,
    period: 'one-time',
  });
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('userLoggedIn');
      localStorage.removeItem('isLoggedIn');
      window.location.href = '/login';
    }
  };

  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'paypal'>('stripe');
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [userPlan, setUserPlan] = useState({
    name: '7-Day Plan',
    day: 3,
    totalDays: 7,
    progress: 43,
    isPaid: true,
  });

  // Stripe & PayPal form states
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [cardName, setCardName] = useState('Emma Johnson');
  const [paypalEmail, setPaypalEmail] = useState('emma.johnson@example.com');

  // Admin Payment Settings loaded from localStorage
  const [adminGateways, setAdminGateways] = useState({
    stripeEnabled: true,
    paypalEnabled: false,
  });

  // ⏱️ 60-SECOND ACTIONS PLAYER STATE
  const [selectedActionIndex, setSelectedActionIndex] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(60);
  const [timerRunning, setTimerRunning] = useState(false);
  const [actionCompletedCount, setActionCompletedCount] = useState(36);

  // 📝 CHECK-INS FILTER STATE
  const [selectedMoodFilter, setSelectedMoodFilter] = useState('All');

  // 👤 PROFILE FORM STATE
  const [profileSuccessMsg, setProfileSuccessMsg] = useState('');

  // 🔔 NOTIFICATIONS PREFERENCES STATE
  const [notifSettings, setNotifSettings] = useState({
    emailReminders: true,
    pushNotifs: true,
    weeklyDigest: true,
    promotionalOffers: true,
    securityAlerts: true,
  });
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Great job! You completed Day 3 of your 7-Day Mindset Plan.', time: '2 hours ago', unread: true, icon: '🎉' },
    { id: 2, text: 'New 60-Second Action added: Morning Gratitude Reset.', time: '1 day ago', unread: true, icon: '✨' },
    { id: 3, text: 'Your monthly mood report is ready for download.', time: '3 days ago', unread: false, icon: '📊' },
  ]);

  // Load params & Admin payment gateway settings with real-time sync
  useEffect(() => {
    const loadRealtimeSettings = () => {
      if (typeof window !== 'undefined') {
        const savedGateways = localStorage.getItem('moodflip_payment_settings');
        if (savedGateways) {
          try {
            const parsed = JSON.parse(savedGateways);
            setAdminGateways({
              stripeEnabled: parsed.stripeEnabled ?? true,
              paypalEnabled: parsed.paypalEnabled ?? false,
            });
            if (!parsed.stripeEnabled && parsed.paypalEnabled) {
              setPaymentMethod('paypal');
            }
          } catch (e) {}
        }
      }
    };

    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get('tab');
      if (tabParam) {
        setActiveTab(tabParam);
      }
      loadRealtimeSettings();

      window.addEventListener('storage', loadRealtimeSettings);
      return () => window.removeEventListener('storage', loadRealtimeSettings);
    }
  }, []);

  // ⏱️ TIMER TICK EFFECT
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && timerRunning) {
      setTimerRunning(false);
      setActionCompletedCount((prev) => prev + 1);
      alert('🎉 60-Second Action Completed! Your mindset has been refreshed.');
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerSeconds]);

  const changeTab = (tabName: string) => {
    setActiveTab(tabName);
    setSidebarOpen(false);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('tab', tabName);
      window.history.pushState({}, '', url.toString());
    }
  };

  const openPaymentModal = (planName: string, price: number, period: string = 'one-time') => {
    setSelectedPlan({ name: planName, price, period });
    setPaymentSuccess(false);
    setPaymentProcessing(false);
    setPaymentModalOpen(true);
  };

  const processPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentProcessing(true);

    setTimeout(() => {
      setPaymentProcessing(false);
      setPaymentSuccess(true);
      setUserPlan({
        name: selectedPlan.name,
        day: 1,
        totalDays: selectedPlan.name.includes('30') ? 30 : 7,
        progress: 14,
        isPaid: true,
      });

      // Instant PDF Download simulator
      const element = document.createElement('a');
      const file = new Blob([`Official MoodFlip ${selectedPlan.name} PDF Guide\n\nThank you ${userProfile.name} for your order!\nPrice Paid: $${selectedPlan.price}\n\nYour mindset transformation starts now.`], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `MoodFlip_${selectedPlan.name.replace(/\s+/g, '_')}_Guide.pdf`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 1500);
  };

  const checkins = [
    { id: 1, mood: 'Anxious', targetMood: 'Calm & Confident', icon: '😰', time: 'May 20, 2025 10:30 AM', action: 'Took 60-second action', category: 'Anxious' },
    { id: 2, mood: 'Angry', targetMood: 'Peaceful', icon: '😡', time: 'May 19, 2025 7:45 PM', action: 'Took 60-second action', category: 'Angry' },
    { id: 3, mood: 'Overwhelmed', targetMood: 'Organized', icon: '🌧️', time: 'May 19, 2025 1:20 PM', action: 'Took 60-second action', category: 'Overwhelmed' },
    { id: 4, mood: 'Lonely', targetMood: 'Connected', icon: '💔', time: 'May 18, 2025 9:10 PM', action: 'Took 60-second action', category: 'Lonely' },
    { id: 5, mood: 'Stressed', targetMood: 'Relaxed', icon: '😫', time: 'May 18, 2025 11:00 AM', action: 'Took 60-second action', category: 'Stressed' },
  ];

  const filteredCheckins = checkins.filter((c) => {
    const matchesSearch = c.mood.toLowerCase().includes(searchQuery.toLowerCase()) || c.targetMood.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedMoodFilter === 'All' || c.mood === selectedMoodFilter;
    return matchesSearch && matchesFilter;
  });

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserProfile((prev) => ({ ...prev, avatar: reader.result as string }));
        setProfileSuccessMsg('✓ Profile picture updated successfully!');
        setTimeout(() => setProfileSuccessMsg(''), 3000);
      };
      reader.readAsDataURL(file);
    }
  };

  const actionsList = [
    { title: 'Try Gratitude Reset', icon: '🍃', category: 'Gratitude', desc: 'Focus on 3 things you are deeply thankful for right now.', color: 'from-emerald-500 to-teal-600' },
    { title: 'Deep Breathing 4-7-8', icon: '🧘', category: 'Breathing', desc: 'Inhale for 4s, hold for 7s, exhale slowly for 8s to calm your nervous system.', color: 'from-[#7147E8] to-[#9333EA]' },
    { title: 'Morning Positivity Shift', icon: '☀️', category: 'Mindset', desc: 'Set your daily intention and release negative morning tension.', color: 'from-amber-500 to-orange-600' },
    { title: '5-4-3-2-1 Grounding', icon: '🌱', category: 'Grounding', desc: 'Acknowledge 5 things around you to stop spiraling anxious thoughts.', color: 'from-sky-500 to-blue-600' },
    { title: 'Anger & Frustration Release', icon: '🔥', category: 'Release', desc: 'Unclench your jaw, relax your shoulders, and breathe out anger.', color: 'from-rose-500 to-pink-600' },
  ];

  return (
    <div className="min-h-screen bg-[#F8F7FC] text-[#1A1338] font-sans antialiased flex flex-col">

      {/* ── TOP GLOBAL NAVBAR ── */}
      <header className="bg-white border-b border-[#EAE3F2] px-4 lg:px-8 py-3.5 flex items-center justify-between shadow-2xs sticky top-0 z-40">
        {/* Left Logo */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-[#F5F2FA] border border-[#EBE5F5] flex items-center justify-center text-base sm:text-lg text-[#1A1338] font-bold hover:bg-[#EBE4F7] transition-all cursor-pointer shrink-0 shadow-2xs"
            aria-label="Toggle menu"
          >
            {sidebarOpen ? '✕' : '☰'}
          </button>

          <Link href="/" className="flex items-center gap-2 sm:gap-2.5 text-decoration-none group shrink-0">
            <span className="relative inline-block w-[28px] h-[21px] sm:w-[32px] sm:h-[24px] rounded-b-[19px] bg-gradient-to-br from-[#ff9f8d] via-[#d950c0] to-[#7148e9] shrink-0 mt-0.5">
              <span className="absolute left-[6px] sm:left-[7px] top-[3px] sm:top-[4px] w-[16px] sm:w-[18px] h-[9px] sm:h-[10px] rounded-b-[12px] bg-white" />
              <span className="absolute -top-[5px] sm:-top-[6px] left-[2px] sm:left-[3px] w-[7px] sm:w-[8px] h-[7px] sm:h-[8px] rounded-full bg-[#ffad64] z-10" />
              <span className="absolute -top-[5px] sm:-top-[6px] right-[2px] sm:right-[3px] w-[7px] sm:w-[8px] h-[7px] sm:h-[8px] rounded-full bg-[#ffad64] z-10" />
            </span>
            <span className="font-serif text-xl sm:text-2xl font-extrabold text-[#15183b] tracking-tight whitespace-nowrap">
              mood<span className="text-[#7148e9]">flip</span>
            </span>
          </Link>
        </div>

        {/* Center Search Input */}
        <div className="relative hidden md:block w-full max-w-[480px]">
          <input
            type="text"
            placeholder="Search moods, actions, or insights..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#F4EFFB] border border-[#E8DEF8] rounded-2xl pl-4 pr-10 py-2.5 text-sm font-medium text-[#1A1338] placeholder-gray-400 focus:outline-none focus:border-[#7147E8] focus:bg-white transition-all shadow-2xs"
          />
          <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
        </div>

        {/* Right Controls & Profile */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button 
            onClick={() => changeTab('Notifications')}
            className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-[#F5F2FA] border border-[#EBE5F5] flex items-center justify-center text-sm sm:text-base text-[#5B5278] hover:bg-[#EBE4F7] transition-all cursor-pointer shadow-2xs shrink-0"
            title="View Notifications"
          >
            🔔
            {notifications.some(n => n.unread) && (
              <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-[#EC4899] text-white text-[9px] sm:text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                {notifications.filter(n => n.unread).length}
              </span>
            )}
          </button>

          <div className="hidden sm:block h-6 w-px bg-gray-200" />

          {/* User Profile Avatar & Direct Logout Button */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              onClick={() => changeTab('Profile Settings')}
              className="flex items-center gap-2.5 cursor-pointer group hover:bg-[#F5F2FA] p-1 rounded-2xl transition-all"
              title="View Profile Settings"
            >
              <img 
                src={userProfile.avatar} 
                alt={userProfile.name} 
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-purple-200 group-hover:border-[#7147E8] transition-all shadow-xs shrink-0" 
              />
              <div className="text-left hidden sm:block min-w-0">
                <span className="block text-xs sm:text-sm font-extrabold text-[#1A1338] group-hover:text-[#7147E8] transition-colors truncate">{userProfile.name}</span>
                <span className="block text-[11px] text-gray-500 font-medium truncate">{userProfile.email}</span>
              </div>
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 font-extrabold text-xs hover:bg-rose-600 hover:text-white transition-all cursor-pointer shadow-2xs shrink-0"
              title="Logout Account"
            >
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>


      {/* ── MAIN LAYOUT FRAME ── */}
      <div className="flex-1 flex overflow-hidden relative">

        {/* 1. LEFT SIDEBAR */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-50 w-[275px] bg-[#FAF8FD] border-r border-[#EAE3F2] p-4.5 flex flex-col justify-between shrink-0 transition-transform duration-300 ease-in-out overflow-y-auto overflow-x-hidden
          ${sidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div>
            <nav className="space-y-4">
              {/* Dashboard */}
              <button
                onClick={() => changeTab('Dashboard')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-[14px] font-extrabold transition-all mt-2 ${
                  activeTab === 'Dashboard'
                    ? 'bg-[#ECE6FA] text-[#7147E8] shadow-sm shadow-[#7147E8]/10 scale-[1.01]'
                    : 'text-[#4A4268] hover:bg-[#F0EBFA] hover:text-[#1A1338]'
                }`}
              >
                <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 001 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>Dashboard</span>
              </button>



              {/* MOOD TOOLS */}
              <div>
                <span className="block text-[11px] font-black text-[#8A81A8] uppercase tracking-widest px-3 mb-2">
                  MOOD TOOLS
                </span>
                <div className="space-y-1">
                  <Link href="/#check-in" className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-[13.5px] font-bold text-[#4A4268] hover:bg-[#F0EBFA] hover:text-[#7147E8] transition-all">
                    <span>😊</span> <span>Check-in Now</span>
                  </Link>
                  <button 
                    onClick={() => changeTab('Mood Library')} 
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-[13.5px] font-bold transition-all text-left ${activeTab === 'Mood Library' ? 'bg-[#ECE6FA] text-[#7147E8] font-extrabold' : 'text-[#4A4268] hover:bg-[#F0EBFA] hover:text-[#7147E8]'}`}
                  >
                    <span>🎛️</span> <span>Mood Library</span>
                  </button>
                  <button 
                    onClick={() => changeTab('60-Second Actions')} 
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-[13.5px] font-bold transition-all text-left ${activeTab === '60-Second Actions' ? 'bg-[#ECE6FA] text-[#7147E8] font-extrabold' : 'text-[#4A4268] hover:bg-[#F0EBFA] hover:text-[#7147E8]'}`}
                  >
                    <span>⏱️</span> <span>60-Second Actions</span>
                  </button>
                  <button 
                    onClick={() => changeTab('My Check-ins')} 
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-[13.5px] font-bold transition-all text-left ${activeTab === 'My Check-ins' ? 'bg-[#ECE6FA] text-[#7147E8] font-extrabold' : 'text-[#4A4268] hover:bg-[#F0EBFA] hover:text-[#7147E8]'}`}
                  >
                    <span>🔖</span> <span>My Check-ins</span>
                  </button>
                </div>
              </div>

              {/* MY PLAN */}
              <div>
                <span className="block text-[11px] font-black text-[#8A81A8] uppercase tracking-widest px-3 mb-2">
                  MY PLAN
                </span>
                <div className="space-y-1">
                  <button 
                    onClick={() => changeTab('My 7-Day Plan')} 
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-[13.5px] font-bold transition-all text-left ${activeTab === 'My 7-Day Plan' ? 'bg-[#ECE6FA] text-[#7147E8] font-extrabold' : 'text-[#4A4268] hover:bg-[#F0EBFA] hover:text-[#7147E8]'}`}
                  >
                    <span>📅</span> <span>My 7-Day Plan</span>
                  </button>
                  <button 
                    onClick={() => changeTab('My 30-Day Plan')} 
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-[13.5px] font-bold transition-all text-left ${activeTab === 'My 30-Day Plan' ? 'bg-[#ECE6FA] text-[#7147E8] font-extrabold' : 'text-[#4A4268] hover:bg-[#F0EBFA] hover:text-[#7147E8]'}`}
                  >
                    <span>🗓️</span> <span>My 30-Day Plan</span>
                  </button>
                  <button 
                    onClick={() => changeTab('Downloads')} 
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-[13.5px] font-bold transition-all text-left ${activeTab === 'Downloads' ? 'bg-[#ECE6FA] text-[#7147E8] font-extrabold' : 'text-[#4A4268] hover:bg-[#F0EBFA] hover:text-[#7147E8]'}`}
                  >
                    <span>📥</span> <span>Downloads</span>
                  </button>
                </div>
              </div>

              {/* ACCOUNT */}
              <div>
                <span className="block text-[11px] font-black text-[#8A81A8] uppercase tracking-widest px-3 mb-2">
                  ACCOUNT
                </span>
                <div className="space-y-1">
                  <button 
                    onClick={() => changeTab('Profile Settings')} 
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-[13.5px] font-bold transition-all text-left ${activeTab === 'Profile Settings' ? 'bg-[#ECE6FA] text-[#7147E8] font-extrabold' : 'text-[#4A4268] hover:bg-[#F0EBFA] hover:text-[#7147E8]'}`}
                  >
                    <span>👤</span> <span>Profile Settings</span>
                  </button>
                  <button 
                    onClick={() => changeTab('Notifications')} 
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-[13.5px] font-bold transition-all text-left ${activeTab === 'Notifications' ? 'bg-[#ECE6FA] text-[#7147E8] font-extrabold' : 'text-[#4A4268] hover:bg-[#F0EBFA] hover:text-[#7147E8]'}`}
                  >
                    <span>🔔</span> <span>Notifications</span>
                  </button>
                  <button 
                    onClick={() => changeTab('Privacy & Data')} 
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-[13.5px] font-bold transition-all text-left ${activeTab === 'Privacy & Data' ? 'bg-[#ECE6FA] text-[#7147E8] font-extrabold' : 'text-[#4A4268] hover:bg-[#F0EBFA] hover:text-[#7147E8]'}`}
                  >
                    <span>🔒</span> <span>Privacy &amp; Data</span>
                  </button>
                  <button 
                    onClick={() => changeTab('Help & Support')} 
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-[13.5px] font-bold transition-all text-left ${activeTab === 'Help & Support' ? 'bg-[#ECE6FA] text-[#7147E8] font-extrabold' : 'text-[#4A4268] hover:bg-[#F0EBFA] hover:text-[#7147E8]'}`}
                  >
                    <span>❓</span> <span>Help &amp; Support</span>
                  </button>
                  <Link 
                    href="/login" 
                    className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-[13.5px] font-bold text-rose-500 hover:bg-rose-50 hover:text-rose-600 transition-all text-left mt-1 cursor-pointer"
                  >
                    <svg className="w-5 h-5 text-rose-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Logout</span>
                  </Link>
                </div>
              </div>

            </nav>
          </div>

          {/* Sidebar 3D Promo Book Card — Direct flex child of aside (justify-between) for TRUE BOTTOM placement & compact height */}
          <div className="mt-4 mb-2 w-[94%] mx-auto relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#F7F4FD] to-[#EFE8FC] p-3 text-center border border-[#E3D9F8] shadow-sm shrink-0">
            <div className="w-28 h-36 mx-auto mb-1 flex items-center justify-center">
              <img 
                src="/7day-book-cover-3d-v6.png" 
                alt="MoodFlip 7-Day Plan Book" 
                className="w-full h-full object-contain drop-shadow-md hover:scale-105 transition-transform"
              />
            </div>
            <h4 className="font-serif font-extrabold text-sm text-[#1A1338] mb-0.5 tracking-tight">
              Build a Better Mindset
            </h4>
            <p className="text-[10.5px] text-[#5B5278] leading-tight mb-2 font-semibold">
              Get your personalized 7-Day plan &amp; start transforming your days.
            </p>
            <button 
              onClick={() => openPaymentModal('7-Day Mindset Plan', 9.99)}
              className="w-full block py-1.5 px-3 rounded-xl bg-[#7147E8] hover:bg-[#5f38d4] text-white text-xs font-extrabold shadow-2xs hover:scale-[1.01] transition-transform cursor-pointer"
            >
              Upgrade Now ($9.99)
            </button>
          </div>
        </aside>

        {/* Mobile Backdrop */}
        {sidebarOpen && (
          <div 
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 lg:hidden"
          />
        )}

        {/* 2. MAIN DASHBOARD CONTENT AREA */}
        <main className="flex-1 p-3.5 sm:p-4.5 md:p-6 bg-[#F8F7FC] overflow-y-auto overflow-x-hidden w-full min-w-0">


          {/* TAB 1: DASHBOARD OVERVIEW */}
          {activeTab === 'Dashboard' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start min-w-0">
              
              {/* ── LEFT MAIN SECTION (8 COLS) ── */}
              <div className="lg:col-span-8 space-y-5 min-w-0">
                
                {/* Top Hero Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 min-w-0">
                  <div>
                    <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1A1338] tracking-tight">
                      Welcome back, {userProfile.name.split(' ')[0]}! 👋
                    </h1>
                    <p className="text-xs sm:text-sm md:text-base text-[#68607F] font-semibold mt-1">
                      You&apos;ve taken 12 steps toward a better you this week.
                    </p>
                  </div>
                  <Link 
                    href="/#check-in"
                    className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-2xl bg-[#7147E8] hover:bg-[#5f38d4] text-white text-xs sm:text-sm font-extrabold shadow-md shadow-[#7147E8]/25 hover:scale-[1.02] transition-all flex items-center gap-2 self-start sm:self-auto shrink-0 cursor-pointer"
                  >
                    <span>✨</span> Check-in Now
                  </Link>
                </div>

                {/* Top 4 Stat Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-4 gap-2.5 sm:gap-3 min-w-0">
                  <div className="bg-white border border-[#EAE3F2] rounded-2xl p-3 sm:p-4 shadow-xs flex items-center gap-2.5 sm:gap-3 hover:shadow-md hover:scale-[1.01] transition-all min-w-0 overflow-hidden">
                    <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-[#F3EAFF] text-[#7147E8] flex items-center justify-center text-lg sm:text-xl shrink-0 shadow-2xs">
                      📅
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="block text-[10px] sm:text-[11px] font-extrabold text-[#68607F] uppercase tracking-wider truncate">Total Check-ins</span>
                      <div className="font-serif text-xl sm:text-2xl md:text-3xl font-extrabold text-[#1A1338] mt-0.5">24</div>
                      <span className="text-[10px] sm:text-[11px] text-gray-500 font-semibold mt-0.5 block truncate">This month</span>
                    </div>
                  </div>

                  <div className="bg-white border border-[#EAE3F2] rounded-2xl p-3 sm:p-4 shadow-xs flex items-center gap-2.5 sm:gap-3 hover:shadow-md hover:scale-[1.01] transition-all min-w-0 overflow-hidden">
                    <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-[#EDFBF2] text-emerald-600 flex items-center justify-center text-lg sm:text-xl shrink-0 shadow-2xs">
                      📈
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="block text-[10px] sm:text-[11px] font-extrabold text-[#68607F] uppercase tracking-wider truncate">This Week</span>
                      <div className="font-serif text-xl sm:text-2xl md:text-3xl font-extrabold text-[#1A1338] mt-0.5">12</div>
                      <span className="text-[10px] sm:text-[11px] text-gray-500 font-semibold mt-0.5 block truncate">Check-ins</span>
                    </div>
                  </div>

                  <div className="bg-white border border-[#EAE3F2] rounded-2xl p-3 sm:p-4 shadow-xs flex items-center gap-2.5 sm:gap-3 hover:shadow-md hover:scale-[1.01] transition-all min-w-0 overflow-hidden">
                    <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-[#FFF0F4] text-rose-500 flex items-center justify-center text-lg sm:text-xl shrink-0 shadow-2xs">
                      ❤️
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="block text-[10px] sm:text-[11px] font-extrabold text-[#68607F] uppercase tracking-wider truncate">Current Streak</span>
                      <div className="font-serif text-xl sm:text-2xl md:text-3xl font-extrabold text-[#1A1338] mt-0.5">5</div>
                      <span className="text-[10px] sm:text-[11px] text-gray-500 font-semibold mt-0.5 block truncate">Days</span>
                    </div>
                  </div>

                  <div className="bg-white border border-[#EAE3F2] rounded-2xl p-3 sm:p-4 shadow-xs flex items-center gap-2.5 sm:gap-3 hover:shadow-md hover:scale-[1.01] transition-all min-w-0 overflow-hidden">
                    <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-[#EFF6FF] text-sky-600 flex items-center justify-center text-lg sm:text-xl shrink-0 shadow-2xs">
                      ⭐
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="block text-[10px] sm:text-[11px] font-extrabold text-[#68607F] uppercase tracking-wider truncate">Total Actions</span>
                      <div className="font-serif text-xl sm:text-2xl md:text-3xl font-extrabold text-[#1A1338] mt-0.5">{actionCompletedCount}</div>
                      <span className="text-[10px] sm:text-[11px] text-gray-500 font-semibold mt-0.5 block truncate">60s micro-actions</span>
                    </div>
                  </div>
                </div>

                {/* Side-by-Side Row: Recent Check-ins & Mood Insights */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
                  
                  {/* Recent Check-ins Card */}
                  <div className="bg-white border border-[#EAE3F2] rounded-2xl p-5 shadow-2xs flex flex-col justify-between space-y-3">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-serif font-extrabold text-lg md:text-xl text-[#1A1338]">Recent Check-ins</h3>
                      <button onClick={() => changeTab('My Check-ins')} className="text-xs md:text-sm font-extrabold text-[#7147E8] hover:underline cursor-pointer">View all</button>
                    </div>

                    <div className="space-y-2.5 flex-1 flex flex-col justify-around">
                      {filteredCheckins.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-3 rounded-2xl bg-[#FAF8FD] border border-[#F0EBFA] hover:bg-[#F3EEFC] hover:border-purple-200 transition-all cursor-pointer">
                          <div className="flex items-center gap-3">
                            <span className="w-9 h-9 rounded-full bg-white border border-purple-100 flex items-center justify-center text-base shadow-2xs shrink-0">
                              {item.icon}
                            </span>
                            <div>
                              <div className="flex items-center gap-1.5 text-sm font-extrabold text-[#1A1338]">
                                <span>{item.mood}</span>
                                <span className="text-[#7147E8]">➔</span>
                                <span className="text-emerald-600">{item.targetMood}</span>
                              </div>
                              <span className="text-xs font-semibold text-[#68607F] block">{item.action}</span>
                            </div>
                          </div>
                          <div className="text-right flex items-center gap-2">
                            <span className="text-xs font-medium text-gray-400 block">{item.time}</span>
                            <span className="text-sm text-gray-300">›</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Mood Insights Card */}
                  <div className="bg-white border border-[#EAE3F2] rounded-2xl p-5 shadow-2xs flex flex-col justify-between space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif font-extrabold text-lg md:text-xl text-[#1A1338]">Mood Insights</h3>
                      <div className="border border-gray-200 rounded-xl px-3 py-1.5 text-xs font-bold text-gray-700 bg-white flex items-center gap-1.5 cursor-pointer shadow-2xs">
                        This Month <span className="text-[10px]">˅</span>
                      </div>
                    </div>

                    {/* Donut Chart */}
                    <div className="flex items-center justify-center gap-5 py-2">
                      <div className="relative w-36 h-36 shrink-0 flex items-center justify-center">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="38" fill="none" stroke="#10B981" strokeWidth="18" strokeDasharray="238.7" strokeDashoffset="0" />
                          <circle cx="50" cy="50" r="38" fill="none" stroke="#EC4899" strokeWidth="18" strokeDasharray="238.7" strokeDashoffset="24" />
                          <circle cx="50" cy="50" r="38" fill="none" stroke="#3B82F6" strokeWidth="18" strokeDasharray="238.7" strokeDashoffset="60" />
                          <circle cx="50" cy="50" r="38" fill="none" stroke="#F97316" strokeWidth="18" strokeDasharray="238.7" strokeDashoffset="108" />
                          <circle cx="50" cy="50" r="38" fill="none" stroke="#7147E8" strokeWidth="18" strokeDasharray="238.7" strokeDashoffset="168" />
                        </svg>
                        <div className="absolute text-center leading-tight">
                          <span className="block font-serif font-extrabold text-sm text-[#1A1338]">Your</span>
                          <span className="block font-serif font-extrabold text-sm text-[#1A1338]">Moods</span>
                        </div>
                      </div>

                      <div className="space-y-1.5 text-xs md:text-sm font-bold text-[#1A1338] flex-1">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#7147E8]" /> Anxious</span>
                          <strong>30%</strong>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#F97316]" /> Stressed</span>
                          <strong>25%</strong>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]" /> Overwhelmed</span>
                          <strong>20%</strong>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#EC4899]" /> Angry</span>
                          <strong>15%</strong>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" /> Others</span>
                          <strong>10%</strong>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl bg-[#F4EFFC] border border-[#E7DDFA] p-3.5 text-xs md:text-sm text-[#4A4268] flex items-center gap-3">
                      <span className="text-lg shrink-0">✨</span>
                      <div>
                        <strong className="block text-[#1A1338] font-extrabold text-xs md:text-sm">Great job being consistent!</strong>
                        <span className="text-xs font-semibold text-[#5B5278]">Your top mood this month is Anxious. Keep using your 60-second actions.</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Recommended For You Section */}
                <div className="bg-white border border-[#EAE3F2] rounded-2xl p-5 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif font-extrabold text-lg md:text-xl text-[#1A1338]">Recommended For You</h3>
                    <span onClick={() => changeTab('60-Second Actions')} className="text-xs md:text-sm font-extrabold text-[#7147E8] cursor-pointer hover:underline flex items-center gap-1">
                      View all 60-Second Actions →
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 min-w-0">
                    {/* Card 1 */}
                    <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-[#EAE3F2] shadow-xs hover:shadow-md hover:scale-[1.01] transition-all flex flex-col justify-between space-y-2.5 min-w-0 overflow-hidden">
                      <div className="w-9 h-9 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-lg shadow-2xs shrink-0">
                        🍃
                      </div>
                      <div className="min-w-0">
                        <strong className="block text-sm sm:text-base font-extrabold text-[#1A1338] truncate">Try Gratitude</strong>
                        <span className="block text-[11px] font-extrabold text-emerald-600 uppercase tracking-wider mt-0.5 truncate">60-Second Action</span>
                        <p className="text-xs text-[#5B5278] leading-relaxed font-medium mt-1 line-clamp-2">A simple gratitude practice can boost your mood instantly.</p>
                      </div>
                      <button onClick={() => { setSelectedActionIndex(0); changeTab('60-Second Actions'); }} className="text-xs font-extrabold text-[#7147E8] hover:underline pt-1 text-left cursor-pointer">
                        Try Now →
                      </button>
                    </div>

                    {/* Card 2 */}
                    <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-[#EAE3F2] shadow-xs hover:shadow-md hover:scale-[1.01] transition-all flex flex-col justify-between space-y-2.5 min-w-0 overflow-hidden">
                      <div className="w-9 h-9 rounded-2xl bg-purple-100 text-[#7147E8] flex items-center justify-center text-lg shadow-2xs shrink-0">
                        🧘
                      </div>
                      <div className="min-w-0">
                        <strong className="block text-sm sm:text-base font-extrabold text-[#1A1338] truncate">Deep Breathing</strong>
                        <span className="block text-[11px] font-extrabold text-[#7147E8] uppercase tracking-wider mt-0.5 truncate">60-Second Action</span>
                        <p className="text-xs text-[#5B5278] leading-relaxed font-medium mt-1 line-clamp-2">Calm your mind and body with this powerful breathing exercise.</p>
                      </div>
                      <button onClick={() => { setSelectedActionIndex(1); changeTab('60-Second Actions'); }} className="text-xs font-extrabold text-[#7147E8] hover:underline pt-1 text-left cursor-pointer">
                        Try Now →
                      </button>
                    </div>

                    {/* Card 3 */}
                    <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-[#EAE3F2] shadow-xs hover:shadow-md hover:scale-[1.01] transition-all flex flex-col justify-between space-y-2.5 min-w-0 overflow-hidden">
                      <div className="w-9 h-9 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center text-lg shadow-2xs shrink-0">
                        ☀️
                      </div>
                      <div className="min-w-0">
                        <strong className="block text-sm sm:text-base font-extrabold text-[#1A1338] truncate">Morning Mindset</strong>
                        <span className="block text-[11px] font-extrabold text-amber-600 uppercase tracking-wider mt-0.5 truncate">60-Second Action</span>
                        <p className="text-xs text-[#5B5278] leading-relaxed font-medium mt-1 line-clamp-2">Start your day with positivity and set the right tone.</p>
                      </div>
                      <button onClick={() => { setSelectedActionIndex(2); changeTab('60-Second Actions'); }} className="text-xs font-extrabold text-[#7147E8] hover:underline pt-1 text-left cursor-pointer">
                        Try Now →
                      </button>
                    </div>
                  </div>
                </div>

                {/* Privacy Banner */}
                <div className="p-4 rounded-2xl bg-[#F4EFFC]/70 border border-[#EAE3F2] text-center text-xs md:text-sm text-[#5B5278] flex items-center justify-center gap-2.5 shadow-2xs font-semibold">
                  <span className="text-lg">🔒</span>
                  <span>Your data is private and secure. We automatically delete inactive data after 90 days.</span>
                </div>

              </div>

              {/* ── RIGHT WIDGETS COLUMN (4 COLS) ── */}
              <div className="lg:col-span-12 xl:col-span-4 space-y-5 w-full min-w-0">

                {/* Daily Motivation Card */}
                <div className="overflow-hidden rounded-2xl border border-[#EAE3F2] shadow-2xs bg-white flex flex-col">
                  <div className="w-full overflow-hidden rounded-t-2xl h-[160px]">
                    <img
                      src="/daily-motivation-bg.png"
                      alt="Daily Motivation Sunrise"
                      className="w-full h-full object-cover"
                      style={{ objectPosition: 'center 30%' }}
                    />
                  </div>
                  <div className="px-5 py-4.5 text-center flex flex-col items-center bg-white">
                    <h4 className="font-serif font-extrabold text-base text-[#1A1338] mb-1.5 tracking-tight">
                      Daily Motivation
                    </h4>
                    <p className="font-serif text-sm md:text-base text-[#383054] font-semibold leading-snug max-w-[240px] mx-auto italic">
                      &quot;Small steps today create a better you tomorrow.&quot; 💕
                    </p>
                  </div>
                </div>

                {/* Quick Actions Card */}
                <div className="bg-white border border-[#EAE3F2] rounded-2xl p-5 shadow-2xs space-y-3">
                  <h4 className="font-serif font-extrabold text-base text-[#1A1338] mb-2 px-1">Quick Actions</h4>
                  
                  <Link href="/" className="flex items-center justify-between p-3.5 rounded-2xl bg-[#FAF8FD] border border-[#F0EBFA] hover:bg-[#F0EBFA] hover:border-purple-200 transition-all">
                    <div className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-xl bg-purple-100 text-[#7147E8] flex items-center justify-center text-base font-bold">😊</span>
                      <div>
                        <strong className="block text-sm font-extrabold text-[#1A1338]">Check-in Now</strong>
                        <span className="text-xs text-gray-500 font-medium">How are you feeling?</span>
                      </div>
                    </div>
                    <span className="text-base text-gray-300 font-bold">›</span>
                  </Link>

                  <button onClick={() => changeTab('Mood Library')} className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-[#FAF8FD] border border-[#F0EBFA] hover:bg-[#F0EBFA] hover:border-purple-200 transition-all text-left cursor-pointer">
                    <div className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center text-base font-bold">🎛️</span>
                      <div>
                        <strong className="block text-sm font-extrabold text-[#1A1338]">Mood Library</strong>
                        <span className="text-xs text-gray-500 font-medium">Explore all moods</span>
                      </div>
                    </div>
                    <span className="text-base text-gray-300 font-bold">›</span>
                  </button>

                  <button onClick={() => changeTab('My 7-Day Plan')} className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-[#FAF8FD] border border-[#F0EBFA] hover:bg-[#F0EBFA] hover:border-purple-200 transition-all text-left cursor-pointer">
                    <div className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-base font-bold">📅</span>
                      <div>
                        <strong className="block text-sm font-extrabold text-[#1A1338]">My 7-Day Plan</strong>
                        <span className="text-xs text-gray-500 font-medium">Continue your plan</span>
                      </div>
                    </div>
                    <span className="text-base text-gray-300 font-bold">›</span>
                  </button>

                  <button onClick={() => changeTab('Downloads')} className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-[#FAF8FD] border border-[#F0EBFA] hover:bg-[#F0EBFA] hover:border-purple-200 transition-all text-left cursor-pointer">
                    <div className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center text-base font-bold">📥</span>
                      <div>
                        <strong className="block text-sm font-extrabold text-[#1A1338]">Downloads</strong>
                        <span className="text-xs text-gray-500 font-medium">View your plans</span>
                      </div>
                    </div>
                    <span className="text-base text-gray-300 font-bold">›</span>
                  </button>
                </div>

                {/* Upgrade Solid Purple Card */}
                <div className="rounded-2xl bg-gradient-to-br from-[#7147E8] via-[#8356F8] to-[#9333EA] p-4 sm:p-5 text-white shadow-lg shadow-[#7147E8]/20 space-y-3 w-full min-w-0 overflow-hidden">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-extrabold uppercase tracking-wider">
                    <span className="shrink-0">👑</span> <span className="truncate">Upgrade to 7-Day Plan</span>
                  </div>
                  <p className="text-xs sm:text-sm text-purple-100 font-medium leading-relaxed">
                    Get personalized daily guidance, actions &amp; printable PDF.
                  </p>
                  <button 
                    onClick={() => openPaymentModal('7-Day Mindset Plan', 9.99)}
                    className="w-full py-2.5 sm:py-3 rounded-xl bg-white text-[#7147E8] font-extrabold text-xs sm:text-sm shadow-md hover:bg-purple-50 transition cursor-pointer hover:scale-[1.01] block truncate"
                  >
                    Upgrade Now ($9.99)
                  </button>
                </div>

                {/* Your Current Plan Card */}
                <div className="bg-white border border-[#EAE3F2] rounded-2xl p-4 sm:p-5 shadow-2xs space-y-3.5 w-full min-w-0 overflow-hidden">
                  <h4 className="font-serif font-extrabold text-base text-[#1A1338]">Your Current Plan</h4>
                  <div className="flex items-center justify-between text-xs sm:text-sm min-w-0 gap-2">
                    <div className="flex items-center gap-2 font-bold text-[#1A1338] min-w-0 shrink">
                      <span className="p-1.5 sm:p-2 rounded-xl bg-purple-100 text-[#7147E8] text-sm sm:text-base shrink-0">📅</span>
                      <span className="font-extrabold truncate">{userPlan.name}</span>
                    </div>
                    <span className="text-[11px] sm:text-xs text-gray-600 font-bold shrink-0 text-right">Day {userPlan.day} of {userPlan.totalDays}</span>
                  </div>
                  <div className="space-y-1.5 min-w-0">
                    <div className="flex justify-between text-xs font-extrabold text-[#7147E8]">
                      <span>Progress</span>
                      <span>{userPlan.progress}%</span>
                    </div>
                    <div className="w-full h-3 rounded-full bg-purple-100 overflow-hidden p-0.5">
                      <div className="h-full bg-gradient-to-r from-[#7147E8] to-[#9333EA] rounded-full transition-all duration-500 shadow-xs" style={{ width: `${userPlan.progress}%` }} />
                    </div>
                  </div>
                  <button 
                    onClick={() => changeTab('My 7-Day Plan')}
                    className="w-full py-2.5 rounded-xl bg-[#FAF8FD] border border-[#F0EBFA] text-[#7147E8] font-extrabold text-xs sm:text-sm hover:bg-[#F0EBFA] transition cursor-pointer"
                  >
                    Continue Plan
                  </button>
                </div>

              </div>

            </div>
          )}

          {/* TAB 2: 60-SECOND ACTIONS PLAYER */}
          {activeTab === '60-Second Actions' && (
            <div className="bg-white border border-[#EAE3F2] rounded-3xl p-5 sm:p-8 shadow-2xs space-y-6 sm:space-y-8 w-full max-w-4xl mx-auto min-w-0">
              <div>
                <h2 className="font-serif font-extrabold text-2xl md:text-3xl text-[#1A1338]">60-Second Actions Player ⏱️</h2>
                <p className="text-xs md:text-base text-[#68607F] font-semibold mt-1">Select an action and press Start for a 60-second mindset reset.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 min-w-0">
                {actionsList.map((act, idx) => (
                  <div
                    key={idx}
                    onClick={() => { setSelectedActionIndex(idx); setTimerSeconds(60); setTimerRunning(false); }}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between min-w-0 ${
                      selectedActionIndex === idx
                        ? 'border-[#7147E8] bg-[#F4EFFC] shadow-md scale-[1.02]'
                        : 'border-[#F0EBFA] bg-[#FAF8FD] hover:border-purple-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl sm:text-3xl">{act.icon}</span>
                      <span className="text-[10px] sm:text-xs font-extrabold px-2.5 py-1 rounded-full bg-white text-[#7147E8] shadow-2xs">{act.category}</span>
                    </div>
                    <strong className="block text-sm sm:text-base font-extrabold text-[#1A1338]">{act.title}</strong>
                    <p className="text-xs text-[#68607F] font-medium mt-1 leading-relaxed line-clamp-2">{act.desc}</p>
                  </div>
                ))}
              </div>

              {/* LIVE TIMER PLAYER BOX */}
              <div className={`p-6 sm:p-10 rounded-3xl bg-gradient-to-br ${actionsList[selectedActionIndex].color} text-white shadow-2xl flex flex-col items-center text-center space-y-5 sm:space-y-6 relative overflow-hidden w-full min-w-0`}>
                <span className="text-4xl sm:text-6xl">{actionsList[selectedActionIndex].icon}</span>
                <div className="px-2">
                  <h3 className="font-serif text-2xl sm:text-3xl font-extrabold">{actionsList[selectedActionIndex].title}</h3>
                  <p className="text-xs sm:text-sm md:text-base text-white/90 font-medium max-w-md mx-auto mt-2 leading-relaxed">{actionsList[selectedActionIndex].desc}</p>
                </div>

                {/* ANIMATED BREATHING CIRCLE */}
                <div className="relative w-36 h-36 sm:w-48 sm:h-48 flex items-center justify-center my-2 sm:my-4">
                  <div className={`absolute inset-0 rounded-full border-4 border-white/40 ${timerRunning ? 'animate-ping duration-1000' : ''}`} />
                  <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-white/20 backdrop-blur-md border border-white/50 flex flex-col items-center justify-center shadow-inner">
                    <span className="font-serif text-3xl sm:text-5xl font-extrabold">{timerSeconds}s</span>
                    <span className="text-[10px] sm:text-xs uppercase font-extrabold tracking-widest text-white/90 mt-1">{timerRunning ? 'Breathing...' : 'Ready'}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto justify-center min-w-0">
                  {!timerRunning ? (
                    <button
                      onClick={() => { if (timerSeconds === 0) setTimerSeconds(60); setTimerRunning(true); }}
                      className="w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-3.5 rounded-full bg-white text-[#1A1338] font-extrabold text-sm sm:text-base shadow-xl hover:bg-gray-100 transition cursor-pointer hover:scale-105 shrink-0"
                    >
                      ▶ Start 60s Reset
                    </button>
                  ) : (
                    <button
                      onClick={() => setTimerRunning(false)}
                      className="w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-3.5 rounded-full bg-black/40 backdrop-blur-md text-white font-extrabold text-sm sm:text-base border border-white/30 hover:bg-black/60 transition cursor-pointer shrink-0"
                    >
                      ⏸ Pause Timer
                    </button>
                  )}
                  <button
                    onClick={() => { setTimerRunning(false); setTimerSeconds(60); }}
                    className="w-full sm:w-auto px-6 py-3 sm:py-3.5 rounded-full bg-white/20 hover:bg-white/30 text-white font-extrabold text-xs sm:text-sm transition cursor-pointer shrink-0"
                  >
                    🔄 Reset
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: MY CHECK-INS HISTORY */}
          {activeTab === 'My Check-ins' && (
            <div className="bg-white border border-[#EAE3F2] rounded-3xl p-5 sm:p-8 shadow-2xs space-y-6 w-full max-w-4xl mx-auto min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
                <div>
                  <h2 className="font-serif font-extrabold text-2xl md:text-3xl text-[#1A1338]">My Check-ins History 🔖</h2>
                  <p className="text-xs md:text-base text-[#68607F] font-semibold mt-1">Track all your emotional shifts and 60-second actions taken over time.</p>
                </div>
                <Link href="/#check-in" className="px-5 py-2.5 sm:px-5 sm:py-3 rounded-2xl bg-[#7147E8] text-white text-xs sm:text-sm font-extrabold shadow-md hover:bg-[#5f38d4] self-start sm:self-auto shrink-0">
                  + New Check-in
                </Link>
              </div>

              {/* MOOD FILTER PILLS */}
              <div className="flex flex-wrap gap-2 sm:gap-2.5 min-w-0">
                {['All', 'Anxious', 'Angry', 'Overwhelmed', 'Lonely', 'Stressed'].map((mood) => (
                  <button
                    key={mood}
                    onClick={() => setSelectedMoodFilter(mood)}
                    className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                      selectedMoodFilter === mood
                        ? 'bg-[#7147E8] text-white shadow-sm'
                        : 'bg-[#F4EFFC] text-[#5B5278] hover:bg-[#EBE4F7]'
                    }`}
                  >
                    {mood}
                  </button>
                ))}
              </div>

              {/* MOBILE CARDS VIEW (< md) */}
              <div className="block md:hidden space-y-3 min-w-0">
                {filteredCheckins.map((item) => (
                  <div key={item.id} className="p-4 rounded-2xl bg-[#FAF8FD] border border-[#F0EBFA] space-y-2.5 min-w-0 shadow-2xs">
                    <div className="flex items-center justify-between min-w-0 gap-2">
                      <div className="flex items-center gap-2 font-extrabold text-[#1A1338] text-sm sm:text-base min-w-0">
                        <span className="text-xl shrink-0">{item.icon}</span>
                        <span className="truncate">{item.mood}</span>
                        <span className="text-xs text-emerald-600 font-extrabold shrink-0">➔ {item.targetMood}</span>
                      </div>
                      <button
                        onClick={() => { setSelectedActionIndex(0); changeTab('60-Second Actions'); }}
                        className="px-3 py-1 rounded-xl bg-purple-100 text-[#7147E8] font-extrabold text-xs hover:bg-purple-200 cursor-pointer shrink-0"
                      >
                        Re-flip
                      </button>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500 font-medium pt-2 border-t border-purple-100/60 min-w-0">
                      <span className="font-semibold text-[#5B5278] truncate">⚡ {item.action}</span>
                      <span className="font-mono text-[11px] text-gray-400 shrink-0 ml-2">{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* DESKTOP TABLE VIEW (>= md) */}
              <div className="hidden md:block overflow-x-auto min-w-full">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 text-gray-500 font-extrabold uppercase text-xs">
                      <th className="py-3.5 px-3">Date &amp; Time</th>
                      <th className="py-3.5 px-3">Starting Mood</th>
                      <th className="py-3.5 px-3">Flipped Target</th>
                      <th className="py-3.5 px-3">Action Taken</th>
                      <th className="py-3.5 px-3 text-right">Replay</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-semibold">
                    {filteredCheckins.map((item) => (
                      <tr key={item.id} className="hover:bg-[#FAF8FD] transition-colors">
                        <td className="py-4 px-3 text-gray-500 font-mono text-xs">{item.time}</td>
                        <td className="py-4 px-3 font-extrabold text-[#1A1338]">
                          <span className="mr-2 text-base">{item.icon}</span>{item.mood}
                        </td>
                        <td className="py-4 px-3 font-extrabold text-emerald-600">
                          ➔ {item.targetMood}
                        </td>
                        <td className="py-4 px-3 text-[#5B5278]">{item.action}</td>
                        <td className="py-4 px-3 text-right">
                          <button onClick={() => { setSelectedActionIndex(0); changeTab('60-Second Actions'); }} className="px-4 py-1.5 rounded-xl bg-purple-100 text-[#7147E8] font-extrabold text-xs hover:bg-purple-200 cursor-pointer">
                            Re-flip
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: MY 7-DAY PLAN */}
          {activeTab === 'My 7-Day Plan' && (
            <div className="bg-white border border-[#EAE3F2] rounded-3xl p-5 sm:p-8 shadow-2xs space-y-6 w-full max-w-4xl mx-auto min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4 min-w-0">
                <div>
                  <h2 className="font-serif font-extrabold text-2xl md:text-3xl text-[#1A1338]">My 7-Day Mindset Plan 📅</h2>
                  <p className="text-xs md:text-base text-[#68607F] font-semibold mt-1">Your personalized step-by-step daily guide to mental clarity.</p>
                </div>
                <button onClick={() => openPaymentModal('7-Day Mindset Plan', 9.99)} className="px-5 py-2.5 sm:px-5 sm:py-3 rounded-2xl bg-[#7147E8] text-white text-xs sm:text-sm font-extrabold shadow-md hover:bg-[#5f38d4] self-start sm:self-auto shrink-0 cursor-pointer">
                  📥 Download Official PDF ($9.99)
                </button>
              </div>

              <div className="space-y-3.5">
                {[
                  { day: 1, title: 'Day 1: Identify Triggers & Name the Feeling', status: 'Completed', date: 'May 18', desc: 'Learned to separate the emotion from identity.' },
                  { day: 2, title: 'Day 2: 60-Second Grounding Technique', status: 'Completed', date: 'May 19', desc: 'Practiced 5-4-3-2-1 sensory awareness.' },
                  { day: 3, title: 'Day 3: Gratitude Shift & Self-Talk Reframe', status: 'Active Today', date: 'May 20', desc: 'Replace "Why me?" with "What is this teaching me?"' },
                  { day: 4, title: 'Day 4: Somatic Breathing & Tension Release', status: 'Upcoming', date: 'May 21', desc: 'Unclench jaw, drop shoulders, 4-7-8 breathing.' },
                  { day: 5, title: 'Day 5: Boundary Setting & Mental Energy Protection', status: 'Upcoming', date: 'May 22', desc: 'Learn to say no without guilt.' },
                  { day: 6, title: 'Day 6: Evening Mind Cleanup & Reflection', status: 'Upcoming', date: 'May 23', desc: 'Dump worries onto paper before sleep.' },
                  { day: 7, title: 'Day 7: Lasting Resilience Habit Anchor', status: 'Upcoming', date: 'May 24', desc: 'Anchor daily micro-check-in habit.' },
                ].map((d) => (
                  <div
                    key={d.day}
                    className={`p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                      d.status === 'Completed'
                        ? 'bg-[#F6FDF9] border-[#E2F7EC]'
                        : d.status === 'Active Today'
                        ? 'bg-[#FAF8FD] border-[#7147E8] ring-2 ring-[#7147E8]/20 shadow-sm'
                        : 'bg-white border border-gray-200 opacity-75'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className={`text-xs font-black px-3 py-1 rounded-full ${
                          d.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : d.status === 'Active Today' ? 'bg-[#7147E8] text-white' : 'bg-gray-100 text-gray-500'
                        }`}>
                          {d.status}
                        </span>
                        <span className="text-xs text-gray-400 font-bold">{d.date}</span>
                      </div>
                      <strong className="block text-base md:text-lg font-extrabold text-[#1A1338]">{d.title}</strong>
                      <p className="text-xs md:text-sm text-[#68607F] font-semibold mt-1">{d.desc}</p>
                    </div>

                    <button
                      onClick={() => { setSelectedActionIndex(0); changeTab('60-Second Actions'); }}
                      className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-extrabold shrink-0 cursor-pointer ${
                        d.status === 'Active Today'
                          ? 'bg-[#7147E8] text-white hover:bg-[#5f38d4] shadow-sm'
                          : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {d.status === 'Completed' ? 'Review Day' : d.status === 'Active Today' ? 'Start Exercise →' : 'Locked'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: MY 30-DAY PLAN */}
          {activeTab === 'My 30-Day Plan' && (
            <div className="bg-white border border-[#EAE3F2] rounded-3xl p-5 sm:p-8 shadow-2xs space-y-6 w-full max-w-4xl mx-auto min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4 min-w-0">
                <div>
                  <h2 className="font-serif font-extrabold text-2xl md:text-3xl text-[#1A1338]">My 30-Day Transformation Plan 🗓️</h2>
                  <p className="text-xs md:text-base text-[#68607F] font-semibold mt-1">Build permanent emotional resilience over 4 structured weeks.</p>
                </div>
                <button onClick={() => openPaymentModal('30-Day Transformation Plan', 19.99)} className="px-5 py-2.5 sm:px-5 sm:py-3 rounded-2xl bg-[#7147E8] text-white text-xs sm:text-sm font-extrabold shadow-md hover:bg-[#5f38d4] self-start sm:self-auto shrink-0 cursor-pointer">
                  Unlock 30-Day Plan ($19.99)
                </button>
              </div>

              {/* 30-DAY CALENDAR GRID */}
              <div className="min-w-0">
                <h4 className="font-serif font-extrabold text-base sm:text-lg text-[#1A1338] mb-3">30-Day Tracker Calendar</h4>
                <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-10 gap-1.5 sm:gap-2.5 min-w-0">
                  {Array.from({ length: 30 }).map((_, i) => {
                    const dayNum = i + 1;
                    const isDone = dayNum <= 5;
                    const isActive = dayNum === 6;
                    return (
                      <div
                        key={dayNum}
                        className={`p-2 sm:p-3.5 rounded-xl sm:rounded-2xl border text-center flex flex-col items-center justify-between min-h-[60px] sm:min-h-[70px] min-w-0 overflow-hidden ${
                          isDone
                            ? 'bg-[#E2F7EC] border-emerald-300 text-emerald-800'
                            : isActive
                            ? 'bg-[#7147E8] border-[#7147E8] text-white font-black shadow-md'
                            : 'bg-[#FAF8FD] border-gray-200 text-gray-500'
                        }`}
                      >
                        <span className="text-[9px] sm:text-[10px] uppercase font-black tracking-tighter">Day</span>
                        <span className="font-serif text-sm sm:text-lg font-extrabold my-0.5">{dayNum}</span>
                        <span className="text-[9px] sm:text-[10px] font-bold truncate max-w-full px-0.5">{isDone ? '✓' : isActive ? 'Today' : '🔒'}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: DOWNLOADS */}
          {activeTab === 'Downloads' && (
            <div className="bg-white border border-[#EAE3F2] rounded-3xl p-5 sm:p-8 shadow-2xs space-y-6 w-full max-w-4xl mx-auto min-w-0">
              <div>
                <h2 className="font-serif font-extrabold text-2xl md:text-3xl text-[#1A1338]">Downloadable Resources 📥</h2>
                <p className="text-xs md:text-base text-[#68607F] font-semibold mt-1">Access all your PDF workbooks, 60-second action guides, and printable trackers.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 min-w-0">
                {[
                  { title: 'MoodFlip 7-Day Mindset Guide (PDF)', size: '4.2 MB', desc: 'Complete 7-day step-by-step exercise workbook.', icon: '📘' },
                  { title: '60-Second Micro-Actions Cheat Sheet', size: '1.8 MB', desc: 'Printable pocket guide for fast emotional resets.', icon: '📗' },
                  { title: 'Daily Reflection Printable Journal', size: '2.5 MB', desc: 'Daily morning & evening mindset prompts.', icon: '📙' },
                  { title: '30-Day Emotional Resilience E-Book', size: '8.1 MB', desc: 'Comprehensive guide to long-term emotional mastery.', icon: '📕' },
                ].map((res, i) => (
                  <div key={i} className="p-4 sm:p-5 rounded-2xl bg-[#FAF8FD] border border-[#F0EBFA] flex flex-col sm:flex-row sm:items-center justify-between gap-4 min-w-0 overflow-hidden shadow-2xs">
                    <div className="flex items-start sm:items-center gap-3.5 min-w-0">
                      <span className="text-3xl sm:text-4xl shrink-0 mt-0.5 sm:mt-0">{res.icon}</span>
                      <div className="min-w-0 flex-1">
                        <strong className="block text-sm sm:text-base font-extrabold text-[#1A1338] leading-snug">{res.title}</strong>
                        <span className="text-xs text-gray-500 font-medium block mt-1 leading-relaxed">{res.desc} · <strong className="text-[#7147E8] font-bold">{res.size}</strong></span>
                      </div>
                    </div>
                    <button
                      onClick={() => openPaymentModal(res.title, 9.99)}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#7147E8] text-white text-xs sm:text-sm font-extrabold hover:bg-[#5f38d4] transition shrink-0 cursor-pointer shadow-xs text-center"
                    >
                      Download PDF
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: PROFILE SETTINGS */}
          {activeTab === 'Profile Settings' && (
            <div className="bg-white border border-[#EAE3F2] rounded-3xl p-5 sm:p-8 shadow-2xs space-y-6 w-full max-w-4xl mx-auto min-w-0">
              <div>
                <h2 className="font-serif font-extrabold text-2xl md:text-3xl text-[#1A1338]">Profile Settings 👤</h2>
                <p className="text-xs md:text-sm text-[#68607F] font-semibold mt-1">Manage your account information and preferences.</p>
              </div>

              {profileSuccessMsg && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-bold">
                  {profileSuccessMsg}
                </div>
              )}

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setProfileSuccessMsg('✓ Profile settings updated successfully!');
                  setTimeout(() => setProfileSuccessMsg(''), 3000);
                }}
                className="space-y-5 text-sm"
              >
                {/* Profile Picture Upload Card */}
                <div className="p-5 rounded-2xl bg-[#FAF8FD] border border-[#F0EBFA] flex flex-col sm:flex-row items-center gap-5 shadow-2xs">
                  <div className="relative group">
                    <img 
                      src={userProfile.avatar} 
                      alt={userProfile.name} 
                      className="w-24 h-24 rounded-full object-cover border-4 border-[#7147E8] shadow-md group-hover:opacity-90 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#7147E8] text-white flex items-center justify-center text-xs shadow-md hover:scale-110 transition cursor-pointer"
                      title="Upload New Photo"
                    >
                      📷
                    </button>
                  </div>

                  <div className="text-center sm:text-left space-y-2 flex-1">
                    <div>
                      <strong className="block text-base font-extrabold text-[#1A1338]">Profile Picture</strong>
                      <span className="text-xs text-gray-500 font-medium">PNG, JPG, or GIF up to 5MB. Updates instantly!</span>
                    </div>

                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-4 py-2.5 rounded-xl bg-[#7147E8] text-white text-xs font-extrabold shadow-sm hover:bg-[#5f38d4] transition cursor-pointer"
                      >
                        📷 Upload New Photo
                      </button>
                      <button
                        type="button"
                        onClick={() => setUserProfile(prev => ({ ...prev, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80' }))}
                        className="px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-gray-600 text-xs font-bold hover:bg-gray-50 transition cursor-pointer"
                      >
                        Reset Photo
                      </button>
                    </div>

                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleAvatarChange}
                      accept="image/*"
                      className="hidden"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-extrabold text-[#1A1338] mb-1.5">Full Name</label>
                  <input
                    type="text"
                    value={userProfile.name}
                    onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
                    className="w-full border border-gray-200 p-3.5 rounded-2xl bg-[#FAF8FD] font-semibold text-sm focus:outline-none focus:border-[#7147E8]"
                  />
                </div>

                <div>
                  <label className="block font-extrabold text-[#1A1338] mb-1.5">Email Address</label>
                  <input
                    type="email"
                    value={userProfile.email}
                    onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
                    className="w-full border border-gray-200 p-3.5 rounded-2xl bg-[#FAF8FD] font-semibold text-sm focus:outline-none focus:border-[#7147E8]"
                  />
                </div>

                <div>
                  <label className="block font-extrabold text-[#1A1338] mb-1.5">Personal Mindset Bio</label>
                  <textarea
                    rows={3}
                    value={userProfile.bio}
                    onChange={(e) => setUserProfile({ ...userProfile, bio: e.target.value })}
                    className="w-full border border-gray-200 p-3.5 rounded-2xl bg-[#FAF8FD] font-semibold text-sm focus:outline-none focus:border-[#7147E8]"
                  />
                </div>

                <button type="submit" className="px-8 py-3.5 rounded-2xl bg-[#7147E8] text-white font-extrabold text-sm hover:bg-[#5f38d4] transition cursor-pointer shadow-md">
                  Save Changes
                </button>
              </form>
            </div>
          )}

          {/* TAB 8: NOTIFICATIONS */}
          {activeTab === 'Notifications' && (
            <div className="bg-white border border-[#EAE3F2] rounded-3xl p-6 sm:p-8 shadow-2xs space-y-6 w-full max-w-4xl mx-auto min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4 min-w-0">
                <div>
                  <h2 className="font-serif font-extrabold text-2xl md:text-3xl text-[#1A1338]">Notifications 🔔</h2>
                  <p className="text-xs md:text-sm text-[#68607F] font-semibold mt-0.5">Manage your notification alerts and daily reminders.</p>
                </div>
                <button
                  onClick={() => setNotifications(notifications.map(n => ({ ...n, unread: false })))}
                  className="text-xs md:text-sm font-extrabold text-[#7147E8] hover:underline cursor-pointer self-start sm:self-auto shrink-0"
                >
                  Mark all as read
                </button>
              </div>

              {/* TOGGLES */}
              <div className="space-y-3.5 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 p-4 sm:p-5 rounded-2xl bg-[#FAF8FD] border border-[#F0EBFA] min-w-0">
                  <div className="min-w-0">
                    <strong className="block text-base font-extrabold text-[#1A1338]">Email Daily Mindset Reminders</strong>
                    <span className="text-xs text-gray-500 font-medium leading-relaxed block">Receive gentle daily check-in prompts via email.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifSettings.emailReminders}
                    onChange={(e) => setNotifSettings({ ...notifSettings, emailReminders: e.target.checked })}
                    className="w-5 h-5 accent-[#7147E8] shrink-0 cursor-pointer self-start sm:self-auto"
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 p-4 sm:p-5 rounded-2xl bg-[#FAF8FD] border border-[#F0EBFA] min-w-0">
                  <div className="min-w-0">
                    <strong className="block text-base font-extrabold text-[#1A1338]">Weekly Progress &amp; Check-in Summary Digest</strong>
                    <span className="text-xs text-gray-500 font-medium leading-relaxed block">Receive a weekly summary email with mood trends and achievement stats.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifSettings.weeklyDigest}
                    onChange={(e) => setNotifSettings({ ...notifSettings, weeklyDigest: e.target.checked })}
                    className="w-5 h-5 accent-[#7147E8] shrink-0 cursor-pointer self-start sm:self-auto"
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 p-4 sm:p-5 rounded-2xl bg-[#FAF8FD] border border-[#F0EBFA] min-w-0">
                  <div className="min-w-0">
                    <strong className="block text-base font-extrabold text-[#1A1338]">Promotional Discounts &amp; Special Mindset Offers</strong>
                    <span className="text-xs text-gray-500 font-medium leading-relaxed block">Get early access to 50% discount offers and new mindset exercise releases.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifSettings.promotionalOffers}
                    onChange={(e) => setNotifSettings({ ...notifSettings, promotionalOffers: e.target.checked })}
                    className="w-5 h-5 accent-[#7147E8] shrink-0 cursor-pointer self-start sm:self-auto"
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 p-4 sm:p-5 rounded-2xl bg-[#FAF8FD] border border-[#F0EBFA] min-w-0">
                  <div className="min-w-0">
                    <strong className="block text-base font-extrabold text-[#1A1338]">Account Security &amp; Login Alerts</strong>
                    <span className="text-xs text-gray-500 font-medium leading-relaxed block">Get security alerts whenever your account logs in from a new device.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifSettings.securityAlerts}
                    onChange={(e) => setNotifSettings({ ...notifSettings, securityAlerts: e.target.checked })}
                    className="w-5 h-5 accent-[#7147E8] shrink-0 cursor-pointer self-start sm:self-auto"
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 p-4 sm:p-5 rounded-2xl bg-[#FAF8FD] border border-[#F0EBFA] min-w-0">
                  <div className="min-w-0">
                    <strong className="block text-base font-extrabold text-[#1A1338]">Browser Push Notifications</strong>
                    <span className="text-xs text-gray-500 font-medium leading-relaxed block">Get instant 60-second action reminders on your device screen.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifSettings.pushNotifs}
                    onChange={(e) => setNotifSettings({ ...notifSettings, pushNotifs: e.target.checked })}
                    className="w-5 h-5 accent-[#7147E8] shrink-0 cursor-pointer self-start sm:self-auto"
                  />
                </div>
              </div>

              {/* NOTIFICATION FEED */}
              <div className="space-y-2.5 pt-2 min-w-0">
                <h4 className="font-serif font-extrabold text-base text-[#1A1338]">Recent Activity Feed</h4>
                {notifications.map((n) => (
                  <div key={n.id} className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 min-w-0 ${n.unread ? 'bg-[#F4EFFC] border-purple-200' : 'bg-white border-gray-100'}`}>
                    <div className="flex items-center gap-3.5 min-w-0">
                      <span className="text-2xl shrink-0">{n.icon}</span>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-[#1A1338] truncate">{n.text}</p>
                        <span className="text-xs text-gray-400 font-medium block">{n.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 9: PRIVACY & DATA */}
          {activeTab === 'Privacy & Data' && (
            <div className="bg-white border border-[#EAE3F2] rounded-3xl p-6 sm:p-8 shadow-2xs space-y-6 w-full max-w-4xl mx-auto min-w-0">
              <div>
                <h2 className="font-serif font-extrabold text-2xl md:text-3xl text-[#1A1338]">Privacy &amp; Data 🔒</h2>
                <p className="text-xs md:text-sm text-[#68607F] font-semibold mt-1">Your emotional reflection data is 100% private and protected.</p>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm space-y-1 min-w-0">
                <strong className="block font-extrabold text-base">✓ Encrypted Local Storage</strong>
                <p className="font-medium text-xs sm:text-sm leading-relaxed">We store your check-ins securely. No personal data is ever sold to third parties.</p>
              </div>

              <div className="space-y-4 text-sm min-w-0">
                <div className="p-4.5 rounded-2xl bg-[#FAF8FD] border border-[#F0EBFA] flex flex-col sm:flex-row sm:items-center justify-between gap-4 min-w-0">
                  <div className="min-w-0">
                    <strong className="block font-extrabold text-[#1A1338]">Export My Data</strong>
                    <span className="text-xs text-gray-500 font-medium leading-relaxed block">Download a full JSON file of all check-in history.</span>
                  </div>
                  <button
                    onClick={() => {
                      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(checkins, null, 2));
                      const a = document.createElement('a');
                      a.href = dataStr;
                      a.download = 'moodflip_user_data.json';
                      a.click();
                    }}
                    className="px-5 py-2.5 rounded-xl bg-[#7147E8] hover:bg-[#5f38d4] text-white font-extrabold text-xs md:text-sm shadow-xs shrink-0 cursor-pointer self-start sm:self-auto"
                  >
                    Export JSON
                  </button>
                </div>

                <div className="p-4.5 rounded-2xl bg-rose-50 border border-rose-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 min-w-0">
                  <div className="min-w-0">
                    <strong className="block font-extrabold text-rose-700">Delete Account &amp; History</strong>
                    <span className="text-xs text-rose-500 font-medium leading-relaxed block">Permanently wipe all check-ins and progress.</span>
                  </div>
                  <button onClick={() => alert('Account deletion request submitted.')} className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs md:text-sm shadow-xs shrink-0 cursor-pointer self-start sm:self-auto">
                    Delete Data
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 10: HELP & SUPPORT */}
          {activeTab === 'Help & Support' && (
            <div className="bg-white border border-[#EAE3F2] rounded-3xl p-6 sm:p-8 shadow-2xs space-y-6 w-full max-w-4xl mx-auto min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EAE3F2] pb-4">
                <div>
                  <h2 className="font-serif font-extrabold text-2xl md:text-3xl text-[#1A1338]">Help &amp; Support ❓</h2>
                  <p className="text-xs md:text-sm text-[#68607F] font-semibold mt-1">Frequently asked questions and direct support line.</p>
                </div>
                <Link
                  href="/contact"
                  className="px-5 py-2.5 rounded-2xl bg-[#7147E8] text-white text-xs md:text-sm font-extrabold shadow-sm hover:bg-[#5f38d4] transition self-start sm:self-auto shrink-0 flex items-center gap-2"
                >
                  <span>✉️</span> Contact Us Page
                </Link>
              </div>

              {/* Direct Contact Support Inquiry Card */}
              <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#FAF8FD] to-[#F3EEFC] border border-[#E0D4F8] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 min-w-0">
                <div className="space-y-1.5 min-w-0">
                  <div className="flex items-center gap-2 text-sm md:text-base font-extrabold text-[#7147E8]">
                    <span className="text-xl">📩</span> <span>Need Personal Assistance or Have an Inquiry?</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#5B5278] font-semibold leading-relaxed">
                    Have questions about your plan, billing, or technical feedback? Send an inquiry on our official Contact Us page or email <strong className="text-[#7147E8]">support@moodflip.coach</strong>.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="px-6 py-3 rounded-2xl bg-[#7147E8] hover:bg-[#5f38d4] text-white text-xs md:text-sm font-extrabold shadow-md hover:scale-[1.02] transition-transform shrink-0 self-start sm:self-auto flex items-center gap-2"
                >
                  <span>💬</span> Contact Us Now →
                </Link>
              </div>

              <div className="space-y-3.5 min-w-0">
                <h4 className="font-serif font-extrabold text-lg text-[#1A1338]">Frequently Asked Questions</h4>
                {[
                  { q: 'How do 60-second micro-actions work?', a: 'Micro-actions combine somatic breathing, gratitude grounding, and cognitive reframing to interrupt emotional spirals in under a minute.' },
                  { q: 'Is MoodFlip therapy or medical advice?', a: 'No. MoodFlip is a self-reflection mindset utility designed for daily emotional clarity and stress release.' },
                  { q: 'How do I download the 7-Day Plan PDF?', a: 'Go to the Downloads tab or click Upgrade Now to receive your instant PDF workbook.' },
                ].map((faq, idx) => (
                  <div key={idx} className="p-4 sm:p-5 rounded-2xl bg-[#FAF8FD] border border-[#F0EBFA] space-y-1.5 min-w-0">
                    <strong className="block text-base font-extrabold text-[#1A1338]">{faq.q}</strong>
                    <p className="text-xs sm:text-sm text-[#5B5278] font-medium leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 11: MOOD LIBRARY */}
          {activeTab === 'Mood Library' && (
            <div className="bg-white border border-[#EAE3F2] rounded-3xl p-6 md:p-8 shadow-2xs space-y-6 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EAE3F2] pb-4">
                <div>
                  <h2 className="font-serif text-2xl md:text-3xl font-extrabold text-[#1A1338]">Mood Library 🎛️</h2>
                  <p className="text-xs md:text-sm text-[#68607F] font-semibold mt-1">Browse all supported mood categories and flip your mindset instantly.</p>
                </div>
                <Link href="/#check-in" className="px-5 py-2.5 rounded-2xl bg-[#7147E8] text-white text-xs md:text-sm font-extrabold shadow-sm hover:opacity-95 self-start sm:self-auto shrink-0">
                  Start New Check-in
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 min-w-0">
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
                  <div key={idx} className="p-4 rounded-2xl bg-[#FAF8FD] border border-[#F0EBFA] hover:border-[#7147E8] hover:shadow-md transition-all flex flex-col justify-between space-y-3 min-w-0 overflow-hidden">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl shrink-0">{item.emoji}</span>
                      <span className="text-[11px] font-extrabold px-2.5 py-1 rounded-full bg-purple-100 text-[#7147E8] shrink-0 uppercase tracking-wider">{item.tone}</span>
                    </div>
                    <div className="min-w-0">
                      <strong className="block text-base font-extrabold text-[#1A1338] truncate">{item.name}</strong>
                      <span className="text-xs text-emerald-600 font-extrabold block truncate mt-0.5">➔ {item.target}</span>
                    </div>
                    <Link href="/#check-in" className="w-full text-center py-2 px-3 rounded-xl bg-white border border-[#EAE3F2] text-xs font-extrabold text-[#7147E8] hover:bg-[#F0EBFA] transition shadow-2xs block truncate">
                      Flip Mood
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

        </main>
      </div>

      {/* 💳 STRIPE PAYMENT MODAL */}
      {paymentModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-3xl p-5 sm:p-7 md:p-8 max-w-lg w-full border border-[#EAE3F2] shadow-2xl space-y-4 sm:space-y-5 relative animate-in fade-in zoom-in duration-200 my-auto max-h-[92vh] overflow-y-auto min-w-0">
            <button
              onClick={() => setPaymentModalOpen(false)}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 text-gray-400 hover:text-gray-700 font-bold text-base sm:text-lg cursor-pointer z-10"
            >
              ✕
            </button>

            {!paymentSuccess ? (
              <>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] sm:text-xs font-black px-2.5 sm:px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                      <span>🔒</span> SECURE 256-BIT STRIPE CHECKOUT
                    </span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-extrabold text-[#1A1338] mt-2 sm:mt-2.5 leading-tight">
                    Upgrade to {selectedPlan.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#68607F] font-semibold mt-1">
                    Get instant access to full daily exercises and downloadable PDF guides.
                  </p>
                </div>

                {/* ORDER SUMMARY BANNER */}
                <div className="p-3.5 sm:p-4.5 rounded-2xl bg-gradient-to-r from-[#FAF8FD] to-[#F4EFFC] border border-[#E3D9F8] flex items-center justify-between gap-3 shadow-2xs min-w-0">
                  <div className="min-w-0 flex-1">
                    <strong className="block text-sm sm:text-base font-extrabold text-[#1A1338] truncate">{selectedPlan.name}</strong>
                    <span className="text-[11px] sm:text-xs font-extrabold text-[#7147E8] block mt-0.5 truncate">✓ Instant PDF Download Included</span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-serif text-2xl sm:text-3xl font-extrabold text-[#7147E8]">${selectedPlan.price}</span>
                    <span className="block text-[9px] sm:text-[10px] text-gray-500 uppercase font-black tracking-wider">{selectedPlan.period}</span>
                  </div>
                </div>

                {/* ACCEPTED CARD CARDS */}
                <div className="flex items-center justify-between pt-0.5">
                  <span className="text-[11px] sm:text-xs font-extrabold text-gray-700 uppercase tracking-wide">Credit or Debit Card</span>
                  <div className="flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs font-bold text-gray-600 bg-gray-100 px-2 sm:px-2.5 py-1 rounded-lg shrink-0">
                    <span>💳 VISA</span>
                    <span>•</span>
                    <span>MC</span>
                    <span>•</span>
                    <span>AMEX</span>
                  </div>
                </div>

                {/* STRIPE PAYMENT FORM */}
                <form onSubmit={processPayment} autoComplete="off" className="space-y-4 text-xs md:text-sm min-w-0">
                  <div className="space-y-3 sm:space-y-3.5 p-3.5 sm:p-4.5 rounded-2xl bg-[#FAF8FD] border border-[#F0EBFA] shadow-2xs min-w-0">
                    
                    {/* Cardholder Name */}
                    <div>
                      <label className="block font-extrabold text-[#1A1338] mb-1 text-xs sm:text-sm">Cardholder Name</label>
                      <div className="relative">
                        <input
                          type="text"
                          name="card_name"
                          autoComplete="cc-name"
                          required
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          className="w-full border border-gray-200 pl-9 sm:pl-10 pr-3 py-2.5 sm:py-3 rounded-xl bg-white font-semibold text-xs sm:text-sm focus:outline-none focus:border-[#7147E8] focus:ring-2 focus:ring-[#7147E8]/20 transition-all"
                          placeholder="Emma Johnson"
                        />
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs sm:text-sm">👤</span>
                      </div>
                    </div>

                    {/* Card Number */}
                    <div>
                      <label className="block font-extrabold text-[#1A1338] mb-1 text-xs sm:text-sm">Card Number</label>
                      <div className="relative">
                        <input
                          type="text"
                          name="card_number"
                          autoComplete="cc-number"
                          required
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full border border-gray-200 pl-9 sm:pl-10 pr-3 py-2.5 sm:py-3 rounded-xl bg-white font-mono font-bold text-xs sm:text-sm focus:outline-none focus:border-[#7147E8] focus:ring-2 focus:ring-[#7147E8]/20 transition-all"
                          placeholder="4532 8890 1234 5678"
                        />
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs sm:text-sm">💳</span>
                      </div>
                    </div>

                    {/* Expiry Date & CVC Code */}
                    <div className="grid grid-cols-2 gap-2.5 sm:gap-3 min-w-0">
                      <div>
                        <label className="block font-extrabold text-[#1A1338] mb-1 text-xs sm:text-sm truncate">Expiry Date</label>
                        <div className="relative">
                          <input
                            type="text"
                            name="card_expiry"
                            autoComplete="cc-exp"
                            required
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            className="w-full border border-gray-200 pl-8 sm:pl-9 pr-2 py-2.5 sm:py-3 rounded-xl bg-white font-mono font-bold text-xs sm:text-sm focus:outline-none focus:border-[#7147E8] focus:ring-2 focus:ring-[#7147E8]/20 transition-all"
                            placeholder="MM / YY"
                          />
                          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs">📅</span>
                        </div>
                      </div>
                      <div>
                        <label className="block font-extrabold text-[#1A1338] mb-1 text-xs sm:text-sm truncate">CVC Code</label>
                        <div className="relative">
                          <input
                            type="password"
                            name="card_cvc"
                            autoComplete="cc-csc"
                            required
                            maxLength={4}
                            value={cardCvc}
                            onChange={(e) => setCardCvc(e.target.value)}
                            className="w-full border border-gray-200 pl-8 sm:pl-9 pr-2 py-2.5 sm:py-3 rounded-xl bg-white font-mono font-bold text-xs sm:text-sm focus:outline-none focus:border-[#7147E8] focus:ring-2 focus:ring-[#7147E8]/20 transition-all"
                            placeholder="123"
                          />
                          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs">🔒</span>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* SUBMIT PAY BUTTON */}
                  <button
                    type="submit"
                    disabled={paymentProcessing}
                    className="w-full py-3.5 sm:py-4 rounded-2xl font-extrabold text-sm sm:text-base text-white bg-gradient-to-r from-[#7147E8] to-[#9333EA] hover:from-[#5f38d4] hover:to-[#7e22ce] shadow-lg shadow-[#7147E8]/25 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {paymentProcessing ? (
                      <>
                        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Processing Payment...</span>
                      </>
                    ) : (
                      <>
                        <span>🔒</span> Pay ${selectedPlan.price} via Stripe
                      </>
                    )}
                  </button>
                  <p className="text-[10.5px] sm:text-xs text-gray-500 font-semibold text-center flex items-center justify-center gap-1.5 leading-snug">
                    <span>🛡️</span> Guaranteed Safe &amp; Secure Checkout · Money back guarantee
                  </p>
                </form>
              </>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl mx-auto shadow-md animate-bounce">
                  ✓
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-extrabold text-[#1A1338]">Payment Successful! 🎉</h3>
                  <p className="text-sm text-[#68607F] font-semibold mt-1 max-w-xs mx-auto">
                    Welcome to the <strong>{selectedPlan.name}</strong>. Your printable PDF is now unlocked!
                  </p>
                </div>
                <div className="pt-2">
                  <button
                    onClick={() => setPaymentModalOpen(false)}
                    className="px-8 py-3.5 rounded-2xl bg-[#7147E8] text-white font-extrabold text-sm shadow-md hover:bg-[#5f38d4] transition cursor-pointer"
                  >
                    Done &amp; Start Exploring →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
