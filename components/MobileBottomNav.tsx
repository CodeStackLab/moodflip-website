'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MobileBottomNav() {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState('home');
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (pathname === '/') {
      if (typeof window !== 'undefined' && window.location.hash === '#check-in') {
        setActiveTab('moods');
      } else {
        setActiveTab('home');
      }
    } else if (pathname.includes('/profile')) {
      if (typeof window !== 'undefined' && window.location.search.includes('7-Day')) {
        setActiveTab('plan');
      } else {
        setActiveTab('profile');
      }
    }
  }, [pathname]);

  const navItems = [
    {
      id: 'home',
      label: 'Home',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
      href: '/',
    },
    {
      id: 'moods',
      label: 'Flip',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      ),
      href: '/#check-in',
    },
    {
      id: 'plan',
      label: '7-Day Plan',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
      href: '/profile?tab=My%207-Day%20Plan',
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
      href: '/profile',
    },
    {
      id: 'menu',
      label: 'Menu',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      ),
      onClick: () => setDrawerOpen(true),
    },
  ];

  return (
    <>
      {/* Sleek App Bottom Navigation Bar (Mobile Only) */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FDF8F5]/96 backdrop-blur-xl border-t border-[#E4DAD7] shadow-[0_-4px_20px_rgba(26,20,63,0.06)] px-2 py-1.5"
        style={{ paddingBottom: 'calc(6px + env(safe-area-inset-bottom, 0px))' }}
      >
        <div className="flex items-center justify-around max-w-md mx-auto">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            const content = (
              <div className="flex flex-col items-center justify-center gap-0.5 cursor-pointer py-1 px-3 rounded-2xl transition-all duration-200">
                <div
                  className={`transition-all duration-200 ${
                    isActive ? 'text-[#7464AC] scale-105' : 'text-[#7E7096] hover:text-[#1A143F]'
                  }`}
                >
                  {item.icon}
                </div>
                <span
                  className={`text-[11px] font-bold tracking-tight transition-colors duration-200 ${
                    isActive ? 'text-[#7464AC]' : 'text-[#7E7096]'
                  }`}
                >
                  {item.label}
                </span>
                {/* Dot Indicator beneath active tab */}
                <div
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    isActive ? 'bg-[#7464AC] scale-100 opacity-100' : 'bg-transparent scale-0 opacity-0'
                  }`}
                />
              </div>
            );

            if (item.onClick) {
              return (
                <button key={item.id} type="button" onClick={item.onClick} className="focus:outline-none">
                  {content}
                </button>
              );
            }

            return (
              <Link key={item.id} href={item.href!} onClick={() => setActiveTab(item.id)}>
                {content}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Mobile Full Menu Drawer */}
      {drawerOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-[#1A143F]/60 backdrop-blur-md flex flex-col justify-end animate-in fade-in duration-200">
          <div className="w-full bg-[#FEFAF8] rounded-t-[28px] border-t border-[#E4DAD7] shadow-2xl p-6 space-y-4 max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-300">
            <div className="flex items-center justify-between border-b border-[#E4DAD7] pb-3">
              <Link href="/" onClick={() => setDrawerOpen(false)} className="inline-flex items-center">
                <img src="/moodflip-logo.png" alt="MoodFlip" className="h-8 w-auto object-contain mix-blend-multiply" />
              </Link>
              <button
                onClick={() => setDrawerOpen(false)}
                className="w-8 h-8 rounded-full bg-[#F4EBF5] text-[#7464AC] font-bold flex items-center justify-center text-sm cursor-pointer border border-[#E4DAD7]"
              >
                ✕
              </button>
            </div>

            <div className="space-y-1.5">
              <Link
                href="/"
                onClick={() => setDrawerOpen(false)}
                className="flex items-center gap-3 p-3 rounded-xl text-[#1A143F] font-bold text-sm hover:bg-[#F4EBF5] hover:text-[#7464AC] transition"
              >
                <span className="text-lg">🏠</span>
                <span>Home & Daily Check-In</span>
              </Link>
              <Link
                href="/#how"
                onClick={() => setDrawerOpen(false)}
                className="flex items-center gap-3 p-3 rounded-xl text-[#1A143F] font-bold text-sm hover:bg-[#F4EBF5] hover:text-[#7464AC] transition"
              >
                <span className="text-lg">✨</span>
                <span>How MoodFlip Works</span>
              </Link>
              <Link
                href="/profile?tab=My%207-Day%20Plan"
                onClick={() => setDrawerOpen(false)}
                className="flex items-center gap-3 p-3 rounded-xl text-[#1A143F] font-bold text-sm hover:bg-[#F4EBF5] hover:text-[#7464AC] transition"
              >
                <span className="text-lg">📅</span>
                <span>My 7-Day Plan</span>
              </Link>
              <Link
                href="/about"
                onClick={() => setDrawerOpen(false)}
                className="flex items-center gap-3 p-3 rounded-xl text-[#1A143F] font-bold text-sm hover:bg-[#F4EBF5] hover:text-[#7464AC] transition"
              >
                <span className="text-lg">ℹ️</span>
                <span>About MoodFlip</span>
              </Link>
              <Link
                href="/contact"
                onClick={() => setDrawerOpen(false)}
                className="flex items-center gap-3 p-3 rounded-xl text-[#1A143F] font-bold text-sm hover:bg-[#F4EBF5] hover:text-[#7464AC] transition"
              >
                <span className="text-lg">✉️</span>
                <span>Contact Support</span>
              </Link>
              <Link
                href="/privacy"
                onClick={() => setDrawerOpen(false)}
                className="flex items-center gap-3 p-3 rounded-xl text-[#1A143F] font-bold text-sm hover:bg-[#F4EBF5] hover:text-[#7464AC] transition"
              >
                <span className="text-lg">🔒</span>
                <span>Privacy Policy</span>
              </Link>
              <Link
                href="/admin"
                onClick={() => setDrawerOpen(false)}
                className="flex items-center gap-3 p-3 rounded-xl text-[#1A143F] font-bold text-sm hover:bg-[#F4EBF5] hover:text-[#7464AC] transition"
              >
                <span className="text-lg">⚙️</span>
                <span>Admin Dashboard</span>
              </Link>
            </div>

            <div className="pt-3 border-t border-[#E4DAD7] flex gap-3">
              <Link
                href="/login"
                onClick={() => setDrawerOpen(false)}
                className="flex-1 py-3 rounded-xl bg-[#F4EBF5] text-[#7464AC] font-bold text-center text-sm border border-[#E4DAD7]"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setDrawerOpen(false)}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#7464AC] to-[#4F438B] text-white font-bold text-center text-sm shadow-md"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
