'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { defaultBlogPosts, BlogPost } from '@/lib/blogData';

// Simple markdown-to-JSX renderer
function renderMarkdown(content: string) {
  return content.split('\n').map((line, i) => {
    if (line.startsWith('## ')) return <h2 key={i} className="font-serif text-2xl font-extrabold text-[#1A1338] mt-8 mb-3">{line.slice(3)}</h2>;
    if (line.startsWith('### ')) return <h3 key={i} className="font-serif text-lg font-extrabold text-[#1A1338] mt-6 mb-2">{line.slice(4)}</h3>;
    if (line.startsWith('- **')) {
      const match = line.match(/^- \*\*(.+?)\*\*(.*)$/);
      if (match) return <li key={i} className="mb-2"><strong className="font-extrabold text-[#1A1338]">{match[1]}</strong>{match[2]}</li>;
    }
    if (line.startsWith('- ')) return <li key={i} className="mb-1">{line.slice(2)}</li>;
    if (line.match(/^\d+\. /)) return <li key={i} className="mb-1 list-decimal">{line.replace(/^\d+\. /, '')}</li>;
    if (line.startsWith('**') && line.endsWith('**')) return <p key={i} className="font-extrabold text-[#1A1338] my-2">{line.slice(2, -2)}</p>;
    if (line === '') return <div key={i} className="h-2" />;
    // Handle inline bold
    const parts = line.split(/(\*\*[^*]+\*\*)/g);
    return (
      <p key={i} className="text-[#5B5278] text-base leading-relaxed mb-0">
        {parts.map((part, j) =>
          part.startsWith('**') && part.endsWith('**')
            ? <strong key={j} className="font-extrabold text-[#1A1338]">{part.slice(2, -2)}</strong>
            : part
        )}
      </p>
    );
  });
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const [posts, setPosts] = useState<BlogPost[]>(defaultBlogPosts);
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    let allPosts = defaultBlogPosts;
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('moodflip_blog_posts');
      if (saved) {
        try { allPosts = JSON.parse(saved); } catch (e) {}
      }
    }
    setPosts(allPosts);
    const found = allPosts.find(p => p.slug === params.slug);
    setPost(found || null);
  }, [params.slug]);

  const relatedPosts = posts
    .filter(p => p.published && p.slug !== params.slug)
    .slice(0, 3);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#F8F7FC] flex items-center justify-center">
        <div className="text-center p-8">
          <span className="text-6xl">📭</span>
          <h1 className="font-serif text-2xl font-extrabold text-[#1A1338] mt-4 mb-2">Article Not Found</h1>
          <p className="text-[#68607F] mb-6">This article doesn't exist or has been unpublished.</p>
          <Link href="/blog" className="bg-[#7147E8] text-white px-6 py-3 rounded-xl font-extrabold text-sm hover:opacity-90 transition inline-block">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

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

      {/* HERO BANNER */}
      <div className={`bg-gradient-to-br ${post.coverColor} py-14 sm:py-20 px-4`}>
        <div className="max-w-3xl mx-auto text-white">
          <Link href="/blog" className="inline-flex items-center gap-2 text-xs font-extrabold text-white/70 hover:text-white transition mb-6 uppercase tracking-widest">
            ← Back to Blog
          </Link>
          <div className="flex items-center gap-3 mb-5">
            <span className="text-5xl">{post.emoji}</span>
            <span className="text-xs font-black uppercase tracking-widest bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
              {post.category}
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold leading-tight mb-4">
            {post.title}
          </h1>
          <p className="text-base sm:text-lg text-white/80 font-semibold leading-relaxed mb-6">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-5 text-xs text-white/70 font-semibold flex-wrap">
            <span>✍️ {post.author}</span>
            <span>📅 {post.date}</span>
            <span>⏱ {post.readTime}</span>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-3xl mx-auto px-4 py-12">
        <article className="bg-white rounded-3xl border border-[#EAE3F2] shadow-xs p-6 sm:p-10 space-y-2">
          <div className="prose-like text-[#5B5278] text-base leading-relaxed [&_ul]:pl-5 [&_ul]:space-y-1 [&_ol]:pl-5 [&_ol]:space-y-1">
            {renderMarkdown(post.content)}
          </div>
        </article>

        {/* CTA CARD */}
        <div className="mt-8 bg-gradient-to-r from-[#7147E8] to-[#9333EA] rounded-3xl p-6 sm:p-8 text-white text-center shadow-xl">
          <span className="text-4xl mb-3 block">🌟</span>
          <h3 className="font-serif text-xl sm:text-2xl font-extrabold mb-2">Ready to Flip Your Mindset?</h3>
          <p className="text-white/80 text-sm font-semibold mb-5 max-w-lg mx-auto">
            Try MoodFlip's 60-second micro-actions and start building emotional resilience today — completely free.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link href="/#check-in" className="bg-white text-[#7147E8] px-5 py-2.5 rounded-xl text-sm font-extrabold shadow-sm hover:opacity-90 transition">
              Try MoodFlip Free →
            </Link>
            <Link href="/blog" className="border border-white/40 text-white px-5 py-2.5 rounded-xl text-sm font-extrabold hover:bg-white/10 transition">
              More Articles
            </Link>
          </div>
        </div>

        {/* RELATED POSTS */}
        {relatedPosts.length > 0 && (
          <div className="mt-12">
            <h2 className="font-serif text-xl font-extrabold text-[#1A1338] mb-5">More Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedPosts.map(rp => (
                <Link key={rp.id} href={`/blog/${rp.slug}`} className="group block">
                  <div className="bg-white border border-[#EAE3F2] rounded-2xl overflow-hidden hover:shadow-md hover:border-[#7147E8]/40 transition-all">
                    <div className={`h-24 bg-gradient-to-br ${rp.coverColor} flex items-center justify-center`}>
                      <span className="text-4xl">{rp.emoji}</span>
                    </div>
                    <div className="p-4">
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#7147E8]">{rp.category}</span>
                      <h4 className="font-serif text-sm font-extrabold text-[#1A1338] mt-1 group-hover:text-[#7147E8] transition leading-snug">{rp.title}</h4>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <footer className="bg-white border-t border-[#EAE3F2] py-8 px-4 text-center text-xs text-[#8A829E] font-semibold">
        <div className="flex items-center justify-center gap-4 flex-wrap mb-3">
          <Link href="/" className="hover:text-[#7147E8] transition">Home</Link>
          <Link href="/blog" className="hover:text-[#7147E8] transition">Blog</Link>
          <Link href="/resources" className="hover:text-[#7147E8] transition">Resources</Link>
          <Link href="/terms" className="hover:text-[#7147E8] transition">Terms</Link>
          <Link href="/privacy" className="hover:text-[#7147E8] transition">Privacy</Link>
        </div>
        <p>© 2026 MoodFlip. All rights reserved.</p>
      </footer>
    </div>
  );
}
