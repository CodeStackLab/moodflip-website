import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2D264B]">
      <Header />
      <main className="mx-auto max-w-4xl px-6 py-12">
        <span className="inline-block rounded-full bg-[#F5F3FF] border border-[#DDD6FE] px-3.5 py-1 text-xs font-bold text-[#6C5CE7] uppercase tracking-wider mb-4">
          Why MoodFlip
        </span>
        <h1 className="font-serif text-4xl font-bold text-[#2D264B] mb-4">
          A small reset can change the next moment.
        </h1>
        <p className="text-base text-[#6B638B] leading-relaxed mb-8">
          MoodFlip is a calm, tap-only self-reflection tool for moving through everyday emotional friction with one clear next step.
        </p>

        <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
          <div className="flex justify-center">
            <img
              src="/about-moodflip.png"
              alt="About MoodFlip illustration"
              className="w-full max-w-sm rounded-3xl border border-[#EAE3D6] shadow-md object-cover hover:scale-[1.02] transition-transform duration-300"
            />
          </div>
          <div className="rounded-3xl border border-[#EAE3D6] bg-white p-8 shadow-sm">
            <h2 className="font-serif text-2xl font-bold text-[#2D264B] mb-3">
              About MoodFlip
            </h2>
            <p className="text-sm text-[#6B638B] leading-relaxed mb-3">
              MoodFlip is a self-reflection utility designed to help you find your mood match, meaningfully.
            </p>
            <p className="text-xs text-[#8E85A3] leading-relaxed mb-5 italic">
              We are not a therapy or medical service. We provide simple tools, not medical advice.
            </p>
            <ul className="space-y-2.5 text-sm text-[#2D264B]">
              <li className="flex items-center gap-2">
                <span className="text-[#6C5CE7] font-bold">—</span> No typing or journaling required
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#6C5CE7] font-bold">—</span> Use the core tool without an account
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#6C5CE7] font-bold">—</span> Optional private check-in history
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#6C5CE7] font-bold">—</span> Designed for phone, tablet, and desktop
              </li>
            </ul>
          </div>
        </div>

        <div className="rounded-3xl bg-[#1E1935] text-white p-8">
          <h3 className="font-serif text-xl font-bold mb-2">A self-help tool, not clinical care</h3>
          <p className="text-sm text-purple-200/80 leading-relaxed">
            MoodFlip is not therapy, medical advice, diagnosis, treatment, or crisis support. If you may be in danger or need urgent help, contact local emergency services or a qualified professional.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
