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
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#120B2E]/95 backdrop-blur-xl border-t border-white/10 shadow-[0_-4px_25px_rgba(0,0,0,0.3)] px-2 py-1.5"
        style={{ paddingBottom: 'calc(6px + env(safe-area-inset-bottom, 0px))' }}
      >
        <div className="flex items-center justify-around max-w-md mx-auto">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            const content = (
              <div className="flex flex-col items-center justify-center gap-1 cursor-pointer py-1 px-3 rounded-2xl transition-all duration-200">
                <div
                  className={`transition-all duration-200 ${
                    isActive ? 'text-[#F59E0B] scale-110' : 'text-white/60 hover:text-white'
                  }`}
                >
                  {item.icon}
                </div>
                <span
                  className={`text-[11px] font-extrabold tracking-tight transition-colors duration-200 ${
                    isActive ? 'text-[#F59E0B]' : 'text-white/60'
                  }`}
                >
                  {item.label}
                </span>
                {/* Dot Indicator beneath active tab (matching user screenshot) */}
                <div
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    isActive ? 'bg-[#F59E0B] scale-100 opacity-100' : 'bg-transparent scale-0 opacity-0'
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
        <div className="md:hidden fixed inset-0 z-50 bg-[#0B061A]/95 backdrop-blur-2xl flex flex-col p-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
            <Link href="/" onClick={() => setDrawerOpen(false)} className="inline-flex items-center bg-white px-3 py-1 rounded-xl shadow-xs">
              <img src="/moodflip-logo.png" alt="MoodFlip" className="h-6 w-auto object-contain" />
            </Link>
            <button
              onClick={() => setDrawerOpen(false)}
              className="w-9 h-9 rounded-full bg-white/10 text-white font-bold flex items-center justify-center text-lg cursor-pointer"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 space-y-3">
            <Link
              href="/"
              onClick={() => setDrawerOpen(false)}
              className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 text-white font-bold hover:bg-white/10"
            >
              <span className="text-xl">🏠</span>
              <span>Home & Daily Check-In</span>
            </Link>
            <Link
              href="/#check-in"
              onClick={() => setDrawerOpen(false)}
              className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 text-white font-bold hover:bg-white/10"
            >
              <span className="text-xl">⚡</span>
              <span>60-Second Mindset Flips</span>
            </Link>
            <Link
              href="/profile?tab=My%207-Day%20Plan"
              onClick={() => setDrawerOpen(false)}
              className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 text-white font-bold hover:bg-white/10"
            >
              <span className="text-xl">📅</span>
              <span>My 7-Day Plan</span>
            </Link>
            <Link
              href="/about"
              onClick={() => setDrawerOpen(false)}
              className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 text-white font-bold hover:bg-white/10"
            >
              <span className="text-xl">ℹ️</span>
              <span>About MoodFlip</span>
            </Link>
            <Link
              href="/contact"
              onClick={() => setDrawerOpen(false)}
              className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 text-white font-bold hover:bg-white/10"
            >
              <span className="text-xl">✉️</span>
              <span>Contact Support</span>
            </Link>
            <Link
              href="/privacy"
              onClick={() => setDrawerOpen(false)}
              className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 text-white font-bold hover:bg-white/10"
            >
              <span className="text-xl">🔒</span>
              <span>Privacy Policy</span>
            </Link>
            <Link
              href="/admin"
              onClick={() => setDrawerOpen(false)}
              className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 text-white font-bold hover:bg-white/10"
            >
              <span className="text-xl">⚙️</span>
              <span>Admin Dashboard</span>
            </Link>
          </div>

          <div className="pt-4 border-t border-white/10 flex gap-3">
            <Link
              href="/login"
              onClick={() => setDrawerOpen(false)}
              className="flex-1 py-3.5 rounded-xl bg-white/10 text-white font-extrabold text-center text-sm"
            >
              Login
            </Link>
            <Link
              href="/register"
              onClick={() => setDrawerOpen(false)}
              className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-[#7147E8] to-[#9333EA] text-white font-extrabold text-center text-sm shadow-lg"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
