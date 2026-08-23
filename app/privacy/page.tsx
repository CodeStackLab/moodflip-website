import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Privacy Policy | MoodFlip',
  description: 'MoodFlip respects your privacy. This Privacy Policy explains what information we may collect and how it is used.',
};

export default function PrivacyPage() {
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
            🔒 Privacy &amp; Data Transparency
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#1A143F] tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-[#7E7096] font-semibold bg-[#FCF3E9] inline-block px-4 py-1 rounded-full border border-[#E4DAD7]">
            Last updated: 21 August 2026
          </p>
        </div>

        {/* MAIN WARM-CREAM CONTENT CARD */}
        <div className="rounded-3xl border border-[#E4DAD7] bg-[#FEFAF8]/95 backdrop-blur-sm p-6 sm:p-12 shadow-[0_12px_40px_rgba(79,67,139,0.05)] space-y-10">
          {/* Intro */}
          <p className="text-base sm:text-lg text-[#1A143F] font-medium leading-relaxed">
            MoodFlip respects your privacy. This Privacy Policy explains what information we may collect and how it is used.
          </p>

          <hr className="border-[#E4DAD7]" />

          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1A143F] flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-[#F4EBF5] text-[#7464AC] font-black text-sm flex items-center justify-center border border-[#E4DAD7] shrink-0">1</span>
              <span>1. Using MoodFlip without a profile</span>
            </h2>
            <div className="pl-10 space-y-2 text-sm sm:text-base text-[#5C527A] leading-relaxed">
              <p>You can use the basic MoodFlip tool without creating a profile.</p>
              <p>If you do not create a profile, MoodFlip does not need to store your email address or saved mood history.</p>
            </div>
          </section>

          <hr className="border-[#E4DAD7]" />

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1A143F] flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-[#F4EBF5] text-[#7464AC] font-black text-sm flex items-center justify-center border border-[#E4DAD7] shrink-0">2</span>
              <span>2. Information we may collect</span>
            </h2>
            <div className="pl-10 space-y-3 text-sm sm:text-base text-[#5C527A] leading-relaxed">
              <p>If you create a profile, MoodFlip may store:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-[#1A143F] font-medium">
                <li>your email address</li>
                <li>selected moods and feelings</li>
                <li>check-in dates</li>
                <li>actions shown to you</li>
                <li>purchase history for paid downloads</li>
              </ul>
              <p className="pt-1">
                This information is used to provide saved check-ins, personalised downloads, and relevant MoodFlip offers.
              </p>
            </div>
          </section>

          <hr className="border-[#E4DAD7]" />

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1A143F] flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-[#F4EBF5] text-[#7464AC] font-black text-sm flex items-center justify-center border border-[#E4DAD7] shrink-0">3</span>
              <span>3. Paid downloads</span>
            </h2>
            <div className="pl-10 space-y-2 text-sm sm:text-base text-[#5C527A] leading-relaxed">
              <p>If you buy a paid MoodFlip download, payment may be processed through a secure third-party payment provider.</p>
              <p>MoodFlip does not need to store your full card details.</p>
            </div>
          </section>

          <hr className="border-[#E4DAD7]" />

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1A143F] flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-[#F4EBF5] text-[#7464AC] font-black text-sm flex items-center justify-center border border-[#E4DAD7] shrink-0">4</span>
              <span>4. 90-day automatic deletion</span>
            </h2>
            <div className="pl-10 space-y-2 text-sm sm:text-base text-[#5C527A] leading-relaxed">
              <p>Inactive profiles and saved mood history are automatically deleted after 90 days.</p>
              <p>This helps keep stored information limited and relevant.</p>
            </div>
          </section>

          <hr className="border-[#E4DAD7]" />

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1A143F] flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-[#F4EBF5] text-[#7464AC] font-black text-sm flex items-center justify-center border border-[#E4DAD7] shrink-0">5</span>
              <span>5. Email messages</span>
            </h2>
            <div className="pl-10 space-y-2 text-sm sm:text-base text-[#5C527A] leading-relaxed">
              <p>If you create a profile, you may receive emails related to your saved check-ins, paid downloads, reminders, or relevant MoodFlip offers.</p>
              <p>You can unsubscribe from marketing emails.</p>
            </div>
          </section>

          <hr className="border-[#E4DAD7]" />

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1A143F] flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-[#F4EBF5] text-[#7464AC] font-black text-sm flex items-center justify-center border border-[#E4DAD7] shrink-0">6</span>
              <span>6. Not medical or crisis support</span>
            </h2>
            <div className="pl-10 space-y-2 text-sm sm:text-base text-[#5C527A] leading-relaxed">
              <p>MoodFlip is a self-reflection tool. It is not therapy, medical advice, diagnosis, treatment, or crisis support.</p>
              <p>If you feel unsafe or need urgent help, please contact emergency services or a crisis support service in your country.</p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
