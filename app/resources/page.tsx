'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import { defaultBlogPosts, BlogPost } from '@/lib/blogData';

const resources = [
  {
    category: '🧠 Mindset Science',
    icon: '🧠',
    color: 'from-violet-500 to-purple-700',
    bgLight: 'bg-[#F4EFFC]',
    textColor: 'text-[#7147E8]',
    items: [
      { title: 'Understanding Neuroplasticity', desc: 'How your brain physically changes with new thought patterns.', link: '/blog/how-to-flip-your-mood-in-60-seconds', badge: 'Article' },
      { title: 'Cognitive Reframing Basics', desc: 'The science behind changing how you interpret events.', link: '/blog/understanding-emotional-triggers', badge: 'Article' },
      { title: '7-Day Mindset Reset Plan', desc: 'Structured day-by-day guide to rewire negative thinking.', link: '/blog/7-day-mindset-reset-guide', badge: 'Guide' },
    ],
  },
  {
    category: '🫀 Anxiety & Stress',
    icon: '🫀',
    color: 'from-rose-500 to-pink-600',
    bgLight: 'bg-rose-50',
    textColor: 'text-rose-600',
    items: [
      { title: 'Anxiety Relief Without Medication', desc: 'Evidence-based techniques for managing everyday anxiety.', link: '/blog/anxiety-relief-without-medication', badge: 'Article' },
      { title: 'Box Breathing Practice', desc: '4-4-4-4 breathing that calms your nervous system instantly.', link: '/#check-in', badge: 'Exercise' },
      { title: '5-4-3-2-1 Grounding Technique', desc: 'Anchor yourself to the present moment during anxiety spikes.', link: '/#check-in', badge: 'Exercise' },
    ],
  },
  {
    category: '📅 Structured Plans',
    icon: '📅',
    color: 'from-emerald-500 to-teal-600',
    bgLight: 'bg-emerald-50',
    textColor: 'text-emerald-600',
    items: [
      { title: '7-Day Mindset Plan PDF', desc: 'Download your complete 7-day emotional reset workbook.', link: '/profile?tab=Downloads', badge: 'Free PDF' },
      { title: '30-Day Resilience Challenge', desc: 'Build lasting emotional habits with daily micro-practices.', link: '/profile?tab=My+30-Day+Plan', badge: 'Plan' },
      { title: 'Daily Check-in Tracker', desc: 'Track your mood patterns and emotional growth over time.', link: '/profile?tab=My+Check-ins', badge: 'Tool' },
    ],
  },
  {
    category: '💆 Daily Practices',
    icon: '💆',
    color: 'from-amber-500 to-orange-600',
    bgLight: 'bg-amber-50',
    textColor: 'text-amber-600',
    items: [
      { title: 'Morning Gratitude Reset', desc: 'Start every day with an evidence-based gratitude practice.', link: '/#check-in', badge: 'Exercise' },
      { title: 'Progressive Muscle Relaxation', desc: 'Release physical tension stored in your body from stress.', link: '/#check-in', badge: 'Exercise' },
      { title: 'Evening Emotional Unwind', desc: 'Process and release the day\'s emotions before sleep.', link: '/#check-in', badge: 'Exercise' },
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
      { title: 'Crisis Text Line', desc: 'Text HOME to 741741 for free crisis counseling.', link: 'https://www.crisistextline.org', badge: 'External' },
      { title: 'IASP Crisis Centers', desc: 'Find crisis centers worldwide at iasp.info.', link: 'https://www.iasp.info/resources/Crisis_Centres/', badge: 'External' },
    ],
  },
];

const quickTools = [
  { icon: '⚡', title: 'Instant Mood Flip', desc: 'Select your current mood and get a 60-second action instantly.', link: '/#check-in', cta: 'Flip Now', color: 'from-violet-500 to-purple-700' },
  { icon: '📊', title: 'Mood Dashboard', desc: 'Track your emotional patterns with your personal dashboard.', link: '/profile?tab=Dashboard', cta: 'View Stats', color: 'from-blue-500 to-cyan-600' },
  { icon: '📥', title: 'Free PDF Download', desc: 'Get your 7-Day Mindset Plan PDF — no signup required.', link: '/profile?tab=Downloads', cta: 'Download Free', color: 'from-emerald-500 to-teal-600' },
  { icon: '📝', title: 'Mindset Blog', desc: 'Science-backed articles on emotional wellbeing & resilience.', link: '/blog', cta: 'Read Articles', color: 'from-rose-500 to-pink-600' },
];

export default function ResourcesPage() {
  const [latestPosts, setLatestPosts] = useState(defaultBlogPosts.slice(0, 3));

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('moodflip_blog_posts');
      if (saved) {
        try {
          const posts = JSON.parse(saved);
          setLatestPosts(posts.filter((p: any) => p.published).slice(0, 3));
        } catch (e) {}
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F7FC] text-[#1A1338] font-sans antialiased">
      {/* GLOBAL HEADER */}
      <Header />

      {/* HERO */}
      <section className="bg-gradient-to-br from-[#1A0A3B] via-[#2D1065] to-[#7147E8] text-white py-16 sm:py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 left-[10%] w-64 h-64 rounded-full bg-purple-400 blur-3xl" />
          <div className="absolute bottom-10 right-[10%] w-80 h-80 rounded-full bg-pink-500 blur-3xl" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="inline-block text-xs font-black uppercase tracking-widest bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full mb-5">
            📚 Free Wellness Resources
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-extrabold leading-tight mb-5">
            Your Emotional Wellness<br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#FF9F8D]"> Resource Hub</span>
          </h1>
          <p className="text-base sm:text-xl text-white/80 font-semibold max-w-2xl mx-auto mb-10">
            Curated guides, exercises, articles, and tools to help you build lasting emotional resilience — all free.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/#check-in" className="bg-white text-[#7147E8] px-6 py-3 rounded-2xl font-extrabold text-sm shadow-lg hover:scale-[1.02] transition-transform">
              ⚡ Try Instant Mood Flip
            </Link>
            <Link href="/blog" className="border border-white/40 text-white px-6 py-3 rounded-2xl font-extrabold text-sm hover:bg-white/10 transition">
              📝 Read the Blog
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
      <section className="max-w-6xl mx-auto px-4 pb-16 space-y-10">
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

      {/* LATEST FROM BLOG */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-serif text-2xl font-extrabold text-[#1A1338]">Latest from the Blog</h2>
            <p className="text-sm text-[#68607F] font-semibold mt-0.5">Science-backed wellness reading.</p>
          </div>
          <Link href="/blog" className="text-xs font-extrabold text-[#7147E8] hover:underline">View All →</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {latestPosts.map(post => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
              <div className="bg-white border border-[#EAE3F2] rounded-2xl overflow-hidden hover:shadow-lg hover:border-[#7147E8]/40 transition-all">
                <div className={`h-28 bg-gradient-to-br ${post.coverColor} flex items-center justify-center`}>
                  <span className="text-4xl">{post.emoji}</span>
                </div>
                <div className="p-4">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#7147E8]">{post.category}</span>
                  <h4 className="font-serif text-sm font-extrabold text-[#1A1338] mt-1 group-hover:text-[#7147E8] transition leading-snug">{post.title}</h4>
                  <p className="text-xs text-[#68607F] mt-1.5 line-clamp-2">{post.excerpt}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-[#EAE3F2] py-8 px-4 text-center text-xs text-[#8A829E] font-semibold">
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="relative inline-block w-[22px] h-[16px] rounded-b-[14px] bg-gradient-to-br from-[#ff9f8d] via-[#d950c0] to-[#7148e9]">
            <span className="absolute left-[5px] top-[3px] w-[12px] h-[7px] rounded-b-[9px] bg-white" />
          </span>
          <span className="font-serif text-base font-extrabold text-[#15183b]">mood<span className="text-[#7148e9]">flip</span></span>
        </div>
        <div className="flex items-center justify-center gap-4 flex-wrap mb-3">
          <Link href="/" className="hover:text-[#7147E8] transition">Home</Link>
          <Link href="/resources" className="hover:text-[#7147E8] transition">Resources</Link>
          <Link href="/blog" className="hover:text-[#7147E8] transition">Blog</Link>
          <Link href="/terms" className="hover:text-[#7147E8] transition">Terms</Link>
          <Link href="/privacy" className="hover:text-[#7147E8] transition">Privacy</Link>
          <Link href="/contact" className="hover:text-[#7147E8] transition">Contact</Link>
        </div>
        <p>© 2026 MoodFlip. All rights reserved.</p>
      </footer>
    </div>
  );
}
