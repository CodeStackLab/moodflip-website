import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'About MoodFlip | Self-Reflection & Emotional Shifts',
  description: 'MoodFlip helps you notice your current mood, understand the feeling behind it, and make one step toward feeling better.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FCF5EE] text-[#1A143F] font-sans antialiased relative flex flex-col justify-between selection:bg-[#F4EBF5] selection:text-[#7464AC]">
      <Header />

      {/* ── BACKGROUND ARTWORK (Peaceful sunrise/sun style - Soft & Faded) ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex items-start justify-center opacity-25">
        <img
          src="/peaceful-sunrise-bg.png"
          alt="Peaceful Sunrise Backdrop"
          className="w-full max-w-5xl object-cover object-top filter contrast-105"
        />
      </div>

      {/* ── MAIN CONTENT ── */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 w-full">
        {/* TOP HERO HEADING */}
        <div className="text-center space-y-3 mb-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F4EBF5] border border-[#E4DAD7] px-4 py-1 text-xs font-extrabold text-[#7464AC] uppercase tracking-wider shadow-2xs">
            🌸 Notice &bull; Name &bull; Shift
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#1A143F] tracking-tight">
            About MoodFlip
          </h1>
        </div>

        {/* MAIN WARM-CREAM CONTENT CARD */}
        <div className="rounded-3xl border border-[#E4DAD7] bg-[#FEFAF8]/95 backdrop-blur-sm p-6 sm:p-12 shadow-[0_12px_40px_rgba(79,67,139,0.05)] space-y-8">
          {/* Paragraph 1 */}
          <p className="text-base sm:text-lg text-[#1A143F] font-medium leading-relaxed">
            MoodFlip helps you notice your current mood, understand the feeling behind it, and make one step toward feeling better.
          </p>

          {/* Paragraph 2 */}
          <p className="text-base sm:text-lg text-[#5C527A] leading-relaxed">
            You start by choosing your current mood, then a more specific feeling. MoodFlip then suggests a better-feeling and a short 60-second action that you can try straight away.
          </p>

          {/* Disclaimer Box */}
          <div className="rounded-2xl border border-[#E4DAD7] bg-[#FCF3E9] p-5 sm:p-6 space-y-2">
            <div className="flex items-center gap-2 text-[#7464AC] font-bold text-sm">
              <span>🌿</span>
              <span>Self-Reflection Philosophy</span>
            </div>
            <p className="text-sm sm:text-base text-[#5C527A] leading-relaxed">
              MoodFlip is designed for small emotional shifts - not big promises. It is not therapy, medical advice, diagnosis, treatment, or crisis support.
            </p>
          </div>

          {/* Our Aim Card */}
          <div className="space-y-4 pt-2">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1A143F]">
              Our aim is simple:
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-[#E4DAD7] bg-[#FCF5EE] p-5 space-y-2 shadow-2xs hover:border-[#7464AC] transition-colors">
                <div className="w-8 h-8 rounded-full bg-[#F4EBF5] text-[#7464AC] font-black text-sm flex items-center justify-center border border-[#E4DAD7]">
                  1
                </div>
                <h3 className="font-bold text-sm text-[#1A143F]">Notice your mood.</h3>
                <p className="text-xs text-[#5C527A] leading-relaxed">
                  Acknowledge and gently check in with how you feel right now.
                </p>
              </div>

              <div className="rounded-2xl border border-[#E4DAD7] bg-[#FCF5EE] p-5 space-y-2 shadow-2xs hover:border-[#7464AC] transition-colors">
                <div className="w-8 h-8 rounded-full bg-[#F4EBF5] text-[#7464AC] font-black text-sm flex items-center justify-center border border-[#E4DAD7]">
                  2
                </div>
                <h3 className="font-bold text-sm text-[#1A143F]">Name the feeling behind your mood.</h3>
                <p className="text-xs text-[#5C527A] leading-relaxed">
                  Identify specific underlying emotions with clarity and ease.
                </p>
              </div>

              <div className="rounded-2xl border border-[#E4DAD7] bg-[#FCF5EE] p-5 space-y-2 shadow-2xs hover:border-[#7464AC] transition-colors">
                <div className="w-8 h-8 rounded-full bg-[#F4EBF5] text-[#7464AC] font-black text-sm flex items-center justify-center border border-[#E4DAD7]">
                  3
                </div>
                <h3 className="font-bold text-sm text-[#1A143F]">Take one step toward feeling better.</h3>
                <p className="text-xs text-[#5C527A] leading-relaxed">
                  Engage in a practical 60-second micro-action designed for shift.
                </p>
              </div>
            </div>
          </div>

          <hr className="border-[#E4DAD7]" />

          {/* Paragraph 4 */}
          <div className="space-y-3">
            <p className="text-base sm:text-lg text-[#5C527A] leading-relaxed">
              You can use the basic MoodFlip tool without creating a profile. If you choose to create a profile, you can save check-ins and create personalised mood reports.
            </p>
          </div>

          {/* Closing Statement */}
          <div className="rounded-2xl border border-[#EDAA7A]/40 bg-gradient-to-r from-[#FCF3E9] to-[#F4EBF5] p-6 text-center space-y-3">
            <p className="text-base sm:text-lg font-bold text-[#1A143F] leading-relaxed max-w-2xl mx-auto">
              Your mood does not have to stay where it is. MoodFlip helps you notice what you feel, shows you a direction to feel better, and you can take one small action toward it.
            </p>
            <div className="pt-2">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#7464AC] to-[#4F438B] text-white text-sm font-extrabold shadow-md hover:scale-[1.02] hover:opacity-95 transition-all"
              >
                <span>⚡ Try MoodFlip Tool</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
