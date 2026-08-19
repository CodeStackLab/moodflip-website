import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FDF8F5] text-[#1A143F] font-sans antialiased">
      <Header />

      {/* ── HERO BANNER ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF5F6] via-[#FCF3E9] to-[#FDF8F5] border-b border-[#E4DAD7] py-14 sm:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F4EBF5] border border-[#E4DAD7] px-4 py-1 text-xs font-extrabold text-[#7464AC] uppercase tracking-wider shadow-2xs">
            🌸 The MoodFlip Story &amp; Mission
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#1A143F] leading-[1.15] tracking-tight">
            A small emotional reset can<br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7464AC] to-[#4F438B]">
              change your entire day.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-[#5C527A] font-medium max-w-2xl mx-auto leading-relaxed">
            MoodFlip is a calm, tap-only self-reflection utility designed to help you identify difficult emotions and shift your energy in just 60 seconds.
          </p>
          <div className="pt-2 flex items-center justify-center gap-3 flex-wrap">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#7464AC] to-[#4F438B] text-white text-sm font-extrabold shadow-md hover:scale-[1.02] hover:opacity-95 transition-all"
            >
              <span>⚡ Try the Mood Tool</span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FEFAF8] border border-[#E4DAD7] text-[#5C527A] hover:text-[#7464AC] hover:border-[#7464AC] text-sm font-extrabold shadow-2xs transition-all"
            >
              <span>✉️ Contact Team</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-16">

        {/* SECTION 1: THE STORY BEHIND MOODFLIP */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-5 flex justify-center">
            <div className="relative rounded-3xl overflow-hidden border border-[#E4DAD7] bg-[#FEFAF8] shadow-md p-4 w-full max-w-sm">
              <img
                src="/about-moodflip.png"
                alt="About MoodFlip illustration"
                className="w-full h-auto rounded-2xl object-cover"
              />
              <div className="mt-3 text-center">
                <span className="text-xs font-bold text-[#7D8164] bg-[#FCF3E9] px-3 py-1 rounded-full inline-block border border-[#E4DAD7]">
                  🌿 Calm &bull; Private &bull; Self-Reflective
                </span>
              </div>
            </div>
          </div>

          <div className="md:col-span-7 space-y-4">
            <span className="text-xs font-black uppercase tracking-wider text-[#7464AC]">Why We Built This</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#1A143F] leading-snug">
              Emotional clarity shouldn&apos;t require hours of journaling or complicated apps.
            </h2>
            <p className="text-sm sm:text-base text-[#5C527A] leading-relaxed">
              When we feel stressed, overwhelmed, or anxious, the last thing we have the energy for is writing long essays or navigating bloated wellness platforms. We needed something fast, intuitive, and genuinely helpful.
            </p>
            <p className="text-sm sm:text-base text-[#5C527A] leading-relaxed">
              MoodFlip was created as a lightweight digital companion: you tap the emotion that feels closest to you, explore the nuanced feeling underneath, and receive an immediate, actionable 60-second micro-practice to shift your state.
            </p>
          </div>
        </section>

        {/* SECTION 2: THE 3 CORE PILLARS */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-[#7464AC]">How It Works</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#1A143F]">The 3 Principles of MoodFlip</h2>
            <p className="text-sm text-[#5C527A]">Everything in MoodFlip is built around simplicity, dignity, and practical action.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Pillar 1 */}
            <div className="rounded-3xl border border-[#E4DAD7] bg-[#FEFAF8] p-6 shadow-[0_10px_28px_rgba(26,20,63,0.03)] space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#F4EBF5] border border-[#E4DAD7] flex items-center justify-center text-2xl text-[#7464AC]">
                🧭
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1A143F]">1. Three-Layer Emotional Wheel</h3>
              <p className="text-xs sm:text-sm text-[#5C527A] leading-relaxed">
                Start from 5 core mood families (Sad, Disgusted, Angry, Fearful, Bad), narrow into sub-feelings, and pinpoint the exact feeling without typing a single word.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="rounded-3xl border border-[#E4DAD7] bg-[#FEFAF8] p-6 shadow-[0_10px_28px_rgba(26,20,63,0.03)] space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FCF3E9] border border-[#E4DAD7] flex items-center justify-center text-2xl text-[#7D8164]">
                ⚡
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1A143F]">2. 60-Second Micro-Actions</h3>
              <p className="text-xs sm:text-sm text-[#5C527A] leading-relaxed">
                Receive targeted grounding exercises, box breathing cycles, cognitive shifts, or gentle physical resets designed to take exactly one minute.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="rounded-3xl border border-[#E4DAD7] bg-[#FEFAF8] p-6 shadow-[0_10px_28px_rgba(26,20,63,0.03)] space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FAF5F6] border border-[#E4DAD7] flex items-center justify-center text-2xl text-[#E49C8C]">
                🔒
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1A143F]">3. Total Privacy &amp; Auto-Delete</h3>
              <p className="text-xs sm:text-sm text-[#5C527A] leading-relaxed">
                Use the basic tool 100% anonymously. If you create an optional profile, inactive data is automatically purged after 90 days. We never sell your data.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: KEY FEATURES COMPARISON */}
        <section className="rounded-3xl border border-[#E4DAD7] bg-[#FEFAF8] p-6 sm:p-10 shadow-[0_10px_28px_rgba(26,20,63,0.03)] space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-[#7464AC]">Feature Highlights</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#1A143F]">What Makes MoodFlip Different</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-[#5C527A]">
            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#FDF8F5] border border-[#E4DAD7]">
              <span className="text-[#7464AC] font-bold text-lg leading-none">✓</span>
              <div>
                <strong className="block text-[#1A143F] font-bold">No Account Required to Flip</strong>
                <span>Anyone can visit the homepage and flip their mood immediately with zero barriers.</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#FDF8F5] border border-[#E4DAD7]">
              <span className="text-[#7464AC] font-bold text-lg leading-none">✓</span>
              <div>
                <strong className="block text-[#1A143F] font-bold">Tap-Only Interaction</strong>
                <span>Designed for moments when your brain is tired. No typing, essays, or complex menus.</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#FDF8F5] border border-[#E4DAD7]">
              <span className="text-[#7464AC] font-bold text-lg leading-none">✓</span>
              <div>
                <strong className="block text-[#1A143F] font-bold">Personalized 7-Day Mindset Plan</strong>
                <span>Optional structured 7-day guidance with downloadable branded PDF reports.</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#FDF8F5] border border-[#E4DAD7]">
              <span className="text-[#7464AC] font-bold text-lg leading-none">✓</span>
              <div>
                <strong className="block text-[#1A143F] font-bold">Mobile, Tablet &amp; Desktop Optimized</strong>
                <span>Lightweight, ultra-fast interface that loads effortlessly on any screen.</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: CLEAR BOUNDARIES & DISCLAIMER */}
        <section className="rounded-3xl bg-[#FAF5F6] border border-[#E4DAD7] p-6 sm:p-8 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">🛡️</span>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#7464AC]">
              A Self-Reflection Utility — Not Clinical Therapy
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-[#5C527A] leading-relaxed">
            MoodFlip is an educational and self-reflection utility. It is <strong>not</strong> a medical service, psychotherapy provider, crisis counseling service, or substitute for professional psychiatric diagnosis or treatment.
          </p>
          <p className="text-xs text-[#7E7096] leading-relaxed">
            If you are in distress or experiencing an emergency, please reach out to your local healthcare professional or contact emergency services immediately.
          </p>
        </section>

        {/* SECTION 5: READY TO FLIP CTA */}
        <section className="text-center rounded-3xl bg-gradient-to-r from-[#7464AC] to-[#4F438B] text-white p-8 sm:p-12 shadow-lg shadow-[#4F438B]/20 space-y-4">
          <h2 className="font-serif text-2xl sm:text-4xl font-extrabold">Ready to shift your mood?</h2>
          <p className="text-sm sm:text-base text-purple-100 max-w-lg mx-auto font-medium">
            Take 60 seconds right now to notice how you feel and find your positive counterpart.
          </p>
          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#FEFAF8] text-[#7464AC] text-sm font-extrabold shadow-md hover:bg-white hover:scale-105 transition-all"
            >
              <span>✨ Start Your 60s Flip Now</span>
            </Link>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
