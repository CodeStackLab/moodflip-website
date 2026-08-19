'use client';

import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const resources = [
  {
    category: '🧠 Mindset Tools',
    icon: '🧠',
    color: 'from-violet-500 to-purple-700',
    bgLight: 'bg-[#F4EFFC]',
    textColor: 'text-[#7147E8]',
    items: [
      { title: 'Instant Mood Flip', desc: 'Select your current mood and receive a targeted 60-second action to shift it.', link: '/#check-in', badge: 'Tool' },
      { title: '7-Day Mindset Plan', desc: 'Structured daily check-ins and micro-actions over 7 days.', link: '/profile?tab=My%207-Day%20Plan', badge: 'Plan' },
      { title: 'Daily Check-in Tracker', desc: 'Log and track your mood patterns over time in your personal dashboard.', link: '/profile?tab=My+Check-ins', badge: 'Tool' },
    ],
  },
  {
    category: '🫀 Breathing & Grounding',
    icon: '🫀',
    color: 'from-rose-500 to-pink-600',
    bgLight: 'bg-rose-50',
    textColor: 'text-rose-600',
    items: [
      { title: 'Box Breathing', desc: '4-4-4-4 breathing pattern to calm your nervous system in under a minute.', link: '/#check-in', badge: 'Exercise' },
      { title: '5-4-3-2-1 Grounding', desc: 'Anchor yourself to the present moment during anxiety or overwhelm.', link: '/#check-in', badge: 'Exercise' },
      { title: 'Evening Unwind', desc: 'A short wind-down routine to process and release the day before sleep.', link: '/#check-in', badge: 'Exercise' },
    ],
  },
  {
    category: '📅 Downloads & Plans',
    icon: '📅',
    color: 'from-emerald-500 to-teal-600',
    bgLight: 'bg-emerald-50',
    textColor: 'text-emerald-600',
    items: [
      { title: '7-Day Mindset Plan PDF', desc: 'Download your complete 7-day emotional reset workbook — free.', link: '/profile?tab=Downloads', badge: 'Free PDF' },
      { title: '30-Day Resilience Challenge', desc: 'Build lasting emotional habits with daily micro-practices.', link: '/profile?tab=My+30-Day+Plan', badge: 'Plan' },
      { title: 'Completion Certificate', desc: 'Get a personalised PDF certificate when you finish your plan.', link: '/profile?tab=Downloads', badge: 'PDF' },
    ],
  },
  {
    category: '💆 Daily Practices',
    icon: '💆',
    color: 'from-amber-500 to-orange-600',
    bgLight: 'bg-amber-50',
    textColor: 'text-amber-600',
    items: [
      { title: 'Morning Gratitude Reset', desc: 'Start every day with a quick gratitude check-in to set a positive tone.', link: '/#check-in', badge: 'Exercise' },
      { title: 'Progressive Muscle Relaxation', desc: 'Release physical tension stored in your body from daily stress.', link: '/#check-in', badge: 'Exercise' },
      { title: 'Micro-Action Library', desc: 'Browse 60-second actions mapped to every mood state.', link: '/#check-in', badge: 'Tool' },
    ],
  },
  {
    category: '🆘 Crisis Resources',
    icon: '🆘',
    color: 'from-blue-500 to-indigo-600',
    bgLight: 'bg-blue-50',
    textColor: 'text-blue-600',
    items: [
      { title: 'National Crisis Line (US)', desc: 'Call or text 988 for immediate mental health crisis support.', link: 'tel:988', badge: 'External' },
      { title: 'Crisis Text Line', desc: 'Text HOME to 741741 for free crisis counseling, available 24/7.', link: 'https://www.crisistextline.org', badge: 'External' },
      { title: 'IASP Crisis Centers', desc: 'Find crisis support centers worldwide at iasp.info.', link: 'https://www.iasp.info/resources/Crisis_Centres/', badge: 'External' },
    ],
  },
];

const quickTools = [
  { icon: '⚡', title: 'Instant Mood Flip', desc: 'Select your current mood and get a 60-second action instantly.', link: '/#check-in', cta: 'Flip Now', color: 'from-violet-500 to-purple-700' },
  { icon: '📊', title: 'Mood Dashboard', desc: 'Track your emotional patterns with your personal check-in dashboard.', link: '/profile?tab=Dashboard', cta: 'View Stats', color: 'from-blue-500 to-cyan-600' },
  { icon: '📥', title: 'Free PDF Download', desc: 'Get your 7-Day Mindset Plan PDF — included with your free account.', link: '/profile?tab=Downloads', cta: 'Download Free', color: 'from-emerald-500 to-teal-600' },
  { icon: '🆘', title: 'Crisis Support', desc: 'Immediate links to crisis helplines if you need urgent support now.', link: '#crisis', cta: 'View Resources', color: 'from-rose-500 to-pink-600' },
];

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-[#F8F7FC] text-[#1A1338] font-sans antialiased">
      {/* GLOBAL HEADER */}
      <Header />

      {/* HERO */}
      <section className="bg-gradient-to-b from-[#F9F7FD] via-[#F3EEFA] to-[#F8F7FC] border-b border-[#EAE3F2] py-10 sm:py-14 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <div className="absolute -top-10 left-[10%] w-64 h-64 rounded-full bg-[#EAE0FD] blur-3xl" />
          <div className="absolute bottom-0 right-[10%] w-80 h-80 rounded-full bg-[#FCE7F3] blur-3xl" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider bg-[#EAE0FD] border border-[#D8C8F8] text-[#7147E8] px-3.5 py-1.5 rounded-full mb-4">
            📚 Free Wellness Resources
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold leading-tight text-[#15183B] mb-3">
            Your Emotional Wellness<br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7147E8] to-[#D950C0]"> Resource Hub</span>
          </h1>
          <p className="text-sm sm:text-lg text-[#68607F] font-semibold max-w-2xl mx-auto mb-7">
            Curated exercises, tools, and plans to help you build lasting emotional resilience — all free.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-sm mx-auto sm:max-w-none">
            <Link href="/#check-in" className="w-full sm:w-auto bg-[#7147E8] text-white px-6 py-3 rounded-xl font-extrabold text-sm shadow-md hover:bg-[#5f38d4] hover:scale-[1.01] transition-all text-center">
              ⚡ Try Instant Mood Flip
            </Link>
            <Link href="/profile?tab=Downloads" className="w-full sm:w-auto bg-white border border-[#EAE3F2] text-[#15183B] px-6 py-3 rounded-xl font-extrabold text-sm hover:bg-[#F4EFFC] hover:border-[#D8C8F8] transition text-center">
              📥 Download Free PDF
            </Link>
          </div>
        </div>
      </section>

      {/* QUICK TOOLS */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <div className="text-center mb-8">
          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#1A1338]">Quick Access Tools</h2>
          <p className="text-sm text-[#68607F] font-semibold mt-1">Jump directly to the tools you need most.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {quickTools.map((tool, i) => (
            <Link key={i} href={tool.link} className="group block">
              <div className="bg-white border border-[#EAE3F2] rounded-2xl p-5 hover:shadow-lg hover:border-[#7147E8]/40 transition-all h-full flex flex-col">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${tool.color} flex items-center justify-center text-2xl mb-4 shadow-sm`}>
                  {tool.icon}
                </div>
                <h3 className="font-serif text-base font-extrabold text-[#1A1338] mb-1.5 group-hover:text-[#7147E8] transition">{tool.title}</h3>
                <p className="text-xs text-[#68607F] font-medium leading-relaxed flex-1 mb-4">{tool.desc}</p>
                <span className="text-xs font-extrabold text-[#7147E8] group-hover:underline">{tool.cta} →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* RESOURCE CATEGORIES */}
      <section id="crisis" className="max-w-6xl mx-auto px-4 pb-20 space-y-10">
        <div className="text-center mb-2">
          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#1A1338]">Curated Resource Library</h2>
          <p className="text-sm text-[#68607F] font-semibold mt-1">Everything you need for emotional wellness in one place.</p>
        </div>

        {resources.map((cat, ci) => (
          <div key={ci} className="bg-white border border-[#EAE3F2] rounded-3xl overflow-hidden shadow-xs">
            {/* Category header */}
            <div className={`bg-gradient-to-r ${cat.color} px-6 py-4 flex items-center gap-3`}>
              <span className="text-2xl">{cat.icon}</span>
              <h3 className="font-serif text-lg font-extrabold text-white">{cat.category}</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#EAE3F2]">
              {cat.items.map((item, ii) => (
                <Link key={ii} href={item.link} className="group block p-5 hover:bg-[#FAF8FD] transition-colors">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="font-serif text-sm font-extrabold text-[#1A1338] group-hover:text-[#7147E8] transition leading-snug">{item.title}</h4>
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0 ${cat.bgLight} ${cat.textColor}`}>
                      {item.badge}
                    </span>
                  </div>
                  <p className="text-xs text-[#68607F] font-medium leading-relaxed">{item.desc}</p>
                  <span className={`text-xs font-extrabold mt-3 block ${cat.textColor} group-hover:underline`}>Access →</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
