'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { defaultBlogPosts, BlogPost } from '@/lib/blogData';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>(defaultBlogPosts);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('moodflip_blog_posts');
      if (saved) {
        try { setPosts(JSON.parse(saved)); } catch (e) {}
      }
    }
  }, []);

  const publishedPosts = posts.filter(p => p.published);
  const categories = ['All', ...Array.from(new Set(publishedPosts.map(p => p.category)))];

  const filteredPosts = publishedPosts.filter(p => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const featuredPost = filteredPosts[0];
  const restPosts = filteredPosts.slice(1);

  return (
    <div className="min-h-screen bg-[#F8F7FC] text-[#1A1338] font-sans antialiased">
      {/* NAVBAR */}
      <header className="bg-white/90 backdrop-blur-md border-b border-[#EAE3F2] px-4 lg:px-8 py-4 flex items-center justify-between sticky top-0 z-40 shadow-2xs">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="relative inline-block w-[30px] h-[22px] rounded-b-[19px] bg-gradient-to-br from-[#ff9f8d] via-[#d950c0] to-[#7148e9] shrink-0 mt-0.5 shadow-sm">
            <span className="absolute left-[6px] top-[3px] w-[17px] h-[9px] rounded-b-[12px] bg-white" />
            <span className="absolute -top-[5px] left-[2px] w-[7px] h-[7px] rounded-full bg-[#ffad64] z-10" />
            <span className="absolute -top-[5px] right-[2px] w-[7px] h-[7px] rounded-full bg-[#ffad64] z-10" />
          </span>
          <span className="font-serif text-xl font-extrabold text-[#15183b]">
            mood<span className="text-[#7148e9]">flip</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-[#4A4268]">
          <Link href="/" className="hover:text-[#7147E8] transition">Home</Link>
          <Link href="/resources" className="hover:text-[#7147E8] transition">Resources</Link>
          <Link href="/blog" className="text-[#7147E8] font-extrabold">Blog</Link>
          <Link href="/contact" className="hover:text-[#7147E8] transition">Contact</Link>
        </nav>
        <Link href="/profile" className="bg-gradient-to-r from-[#7147E8] to-[#9333EA] text-white px-4 py-2 rounded-xl text-sm font-extrabold shadow-sm hover:opacity-90 transition">
          My Profile →
        </Link>
      </header>

      {/* HERO */}
      <section className="bg-gradient-to-br from-[#7147E8] via-[#9333EA] to-[#c026d3] text-white py-16 sm:py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block text-xs font-black uppercase tracking-widest bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full mb-5">
            📝 MoodFlip Blog
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold leading-tight mb-4">
            Mindset & Emotional<br className="hidden sm:block" /> Wellness Insights
          </h1>
          <p className="text-base sm:text-lg text-white/80 font-semibold max-w-2xl mx-auto mb-8">
            Science-backed articles on emotional resilience, mindset shifts, anxiety relief, and daily wellbeing practices.
          </p>
          <div className="relative max-w-lg mx-auto">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full bg-white/15 backdrop-blur-sm border border-white/30 rounded-2xl pl-11 pr-4 py-3 text-sm font-semibold text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40"
            />
          </div>
        </div>
      </section>

      {/* CATEGORY PILLS */}
      <section className="max-w-6xl mx-auto px-4 py-6 overflow-x-auto">
        <div className="flex items-center gap-2.5 min-w-max mx-auto justify-center flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-[#7147E8] text-white shadow-md'
                  : 'bg-white border border-[#EAE3F2] text-[#4A4268] hover:border-[#7147E8] hover:text-[#7147E8]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 pb-20 space-y-10">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-20">
            <span className="text-5xl">📭</span>
            <p className="mt-4 text-lg font-bold text-[#4A4268]">No articles found</p>
            <p className="text-sm text-gray-400 mt-1">Try a different search or category.</p>
          </div>
        ) : (
          <>
            {/* FEATURED POST */}
            {featuredPost && (
              <Link href={`/blog/${featuredPost.slug}`} className="block group">
                <div className={`relative rounded-3xl bg-gradient-to-br ${featuredPost.coverColor} p-8 sm:p-10 text-white overflow-hidden shadow-xl hover:shadow-2xl transition-shadow`}>
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none" />
                  <div className="relative z-10 max-w-3xl">
                    <div className="flex items-center gap-3 mb-5">
                      <span className="text-4xl">{featuredPost.emoji}</span>
                      <span className="text-xs font-black uppercase tracking-widest bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                        ⭐ Featured · {featuredPost.category}
                      </span>
                    </div>
                    <h2 className="font-serif text-2xl sm:text-4xl font-extrabold leading-tight mb-4 group-hover:underline decoration-white/40 underline-offset-4">
                      {featuredPost.title}
                    </h2>
                    <p className="text-sm sm:text-base text-white/80 font-semibold leading-relaxed mb-6 max-w-2xl">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-white/70 font-semibold">
                      <span>✍️ {featuredPost.author}</span>
                      <span>📅 {featuredPost.date}</span>
                      <span>⏱ {featuredPost.readTime}</span>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* REMAINING POSTS GRID */}
            {restPosts.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {restPosts.map(post => (
                  <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
                    <div className="bg-white border border-[#EAE3F2] rounded-2xl overflow-hidden hover:shadow-lg hover:border-[#7147E8]/40 transition-all h-full flex flex-col">
                      <div className={`h-36 bg-gradient-to-br ${post.coverColor} flex items-center justify-center`}>
                        <span className="text-5xl drop-shadow-lg">{post.emoji}</span>
                      </div>
                      <div className="p-5 flex flex-col flex-1 space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#F0EBFA] text-[#7147E8]">
                            {post.category}
                          </span>
                          <span className="text-[10px] text-gray-400 font-semibold ml-auto">{post.readTime}</span>
                        </div>
                        <h3 className="font-serif text-base font-extrabold text-[#1A1338] leading-snug group-hover:text-[#7147E8] transition">
                          {post.title}
                        </h3>
                        <p className="text-xs text-[#68607F] font-medium leading-relaxed flex-1 line-clamp-3">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-[10px] text-gray-400 font-semibold">
                          <span>{post.date}</span>
                          <span className="text-[#7147E8] font-extrabold group-hover:underline">Read →</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </main>

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
