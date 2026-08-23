'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function NotFound() {
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; delay: number; duration: number; emoji: string }[]>([]);

  useEffect(() => {
    setMounted(true);
    const emojis = ['😢', '😰', '😔', '☁️', '🌧️', '💔', '🫀', '🧍'];
    const newParticles = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 20 + 16,
      delay: Math.random() * 4,
      duration: Math.random() * 4 + 4,
      emoji: emojis[i % emojis.length],
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F5FC] flex flex-col items-center justify-center relative overflow-hidden px-4 py-12 font-sans">

      {/* Floating emoji particles */}
      {mounted && particles.map((p) => (
        <span
          key={p.id}
          className="absolute pointer-events-none select-none opacity-20"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            fontSize: `${p.size}px`,
            animation: `float ${p.duration}s ease-in-out ${p.delay}s infinite alternate`,
          }}
        >
          {p.emoji}
        </span>
      ))}

      {/* Gradient blobs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-200/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-pink-200/30 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none" />

      {/* Main card */}
      <div className="relative z-10 bg-[#FEF9F5]/90 backdrop-blur-xl border border-[#E8E0F4] rounded-[32px] shadow-2xl shadow-purple-100/60 max-w-2xl w-full p-10 md:p-14 flex flex-col items-center text-center gap-6">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 mb-2 group">
          <span className="relative inline-block w-[32px] h-[24px] rounded-b-[19px] bg-gradient-to-br from-[#ff9f8d] via-[#d950c0] to-[#7148e9]">
            <span className="absolute left-[7px] top-[4px] w-[18px] h-[10px] rounded-b-[12px] bg-[#FEF9F5]" />
            <span className="absolute -top-[6px] left-[3px] w-[8px] h-[8px] rounded-full bg-[#ffad64] z-10" />
            <span className="absolute -top-[6px] right-[3px] w-[8px] h-[8px] rounded-full bg-[#ffad64] z-10" />
          </span>
          <span className="font-serif text-2xl font-extrabold text-[#15183b] tracking-tight">
            mood<span className="text-[#7148e9]">flip</span>
          </span>
        </Link>

        {/* 404 number */}
        <div className="relative">
          <div
            className="font-serif font-black text-[100px] md:text-[140px] leading-none select-none"
            style={{
              background: 'linear-gradient(135deg, #7464AC 0%, #d950c0 50%, #ff9f8d 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 8px 24px rgba(113,71,232,0.18))',
            }}
          >
            404
          </div>
          {/* Mood face overlay */}
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-5xl animate-bounce">😔</div>
        </div>

        {/* Spacer for emoji */}
        <div className="h-3" />

        {/* Headline */}
        <div>
          <h1 className="font-serif text-3xl md:text-4xl font-extrabold text-[#1A1338] tracking-tight leading-tight mb-3">
            This page took a mental break
          </h1>
          <p className="text-[#5C527A] text-base md:text-lg font-semibold leading-relaxed max-w-md mx-auto">
            The page you&apos;re looking for has drifted away — like a thought you can&apos;t quite catch. Let&apos;s help you find your way back.
          </p>
        </div>

        {/* Reframing quote card */}
        <div className="w-full bg-gradient-to-r from-[#F5F0FF] to-[#FDF0FA] border border-[#E3D9F8] rounded-2xl px-6 py-4 flex items-start gap-3">
          <span className="text-2xl shrink-0">✨</span>
          <p className="text-sm font-semibold text-[#4B3F7A] italic leading-relaxed text-left">
            &ldquo;Getting lost is just the universe asking you to discover a new path. Every detour leads somewhere meaningful.&rdquo;
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
          <Link
            href="/"
            className="flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#7464AC] to-[#9C8CC4] text-white font-extrabold text-sm shadow-lg shadow-[#7464AC]/30 hover:opacity-90 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
          >
            <span>🏠</span> Back to MoodFlip
          </Link>
          <Link
            href="/login"
            className="flex-1 py-3.5 px-6 rounded-2xl bg-[#FEF9F5] border-2 border-[#E3D9F8] text-[#7464AC] font-extrabold text-sm hover:bg-[#F5F0FF] hover:border-[#7464AC] transition-all flex items-center justify-center gap-2"
          >
            <span>👤</span> Login
          </Link>
          <Link
            href="/#check-in"
            className="flex-1 py-3.5 px-6 rounded-2xl bg-[#FEF9F5] border-2 border-[#E3D9F8] text-[#7464AC] font-extrabold text-sm hover:bg-[#F5F0FF] hover:border-[#7464AC] transition-all flex items-center justify-center gap-2"
          >
            <span>😊</span> Check-in Now
          </Link>
        </div>

        {/* Quick links */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-bold text-[#8A81A8]">
          <Link href="/" className="hover:text-[#7464AC] transition-colors">Mood Tool</Link>
          <span>·</span>
          <Link href="/about" className="hover:text-[#7464AC] transition-colors">About</Link>
          <span>·</span>
          <Link href="/contact" className="hover:text-[#7464AC] transition-colors">Contact</Link>
          <span>·</span>
          <Link href="/privacy" className="hover:text-[#7464AC] transition-colors">Privacy Policy</Link>
        </div>

        {/* 60-second mood action */}
        <div className="w-full bg-[#FEF9F5] border border-[#E4DAD7] rounded-2xl p-4 flex items-center gap-4 mt-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#7464AC] to-[#9C8CC4] flex items-center justify-center text-2xl shrink-0 shadow-md">
            🌟
          </div>
          <div className="text-left min-w-0">
            <strong className="block text-sm font-extrabold text-[#1A1338]">Feeling lost? Try a 60-Second Reset</strong>
            <p className="text-xs text-[#5C527A] font-medium mt-0.5">Take a breath, pick a mood, and get your mindset back on track.</p>
          </div>
          <Link
            href="/#check-in"
            className="shrink-0 px-4 py-2 rounded-xl bg-[#7464AC] text-white text-xs font-extrabold hover:bg-[#7464AC] transition shadow-sm"
          >
            Flip Mood →
          </Link>
        </div>
      </div>

      {/* Float animation */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          100% { transform: translateY(-20px) rotate(10deg); }
        }
      `}</style>
    </div>
  );
}
