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
    <div className="min-h-screen bg-[#FCF5EE] text-[#1A143F] font-sans antialiased flex flex-col justify-between selection:bg-[#F4EBF5] selection:text-[#7464AC]">
      <Header />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full space-y-6">
        
        {/* ── WIDE SUNRISE BANNER: FULL NATURAL VIBRANCY (NO WASHED-OUT OVERLAYS) ── */}
        <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-[#E4DAD7] shadow-sm min-h-[230px] sm:min-h-[290px] md:min-h-[320px] flex flex-col items-center justify-center text-center p-6 sm:p-10 bg-[#FCF5EE]">
          {/* 100% Crisp Natural Sunrise Artwork */}
          <img
            src="/peaceful-sunrise-bg.png"
            alt="MoodFlip Peaceful Sunrise"
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
          />

          {/* Text directly on top of the vibrant background */}
          <div className="relative z-10 max-w-3xl mx-auto space-y-3 px-2">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1A143F] tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-xs sm:text-sm text-[#533B93] font-extrabold tracking-wide uppercase">
              Last updated: 21 August 2026
            </p>
            <p className="text-base sm:text-lg md:text-xl text-[#1A143F] font-bold leading-relaxed max-w-2xl mx-auto">
              MoodFlip respects your privacy. This Privacy Policy explains what information we may collect and how it is used.
            </p>
          </div>
        </div>

        {/* ── MAIN CONTENT CARD (Exact Google Doc Clauses) ── */}
        <div className="rounded-2xl sm:rounded-3xl border border-[#E4DAD7] bg-[#FEFAF8] p-6 sm:p-12 shadow-[0_4px_24px_rgba(26,20,63,0.04)] space-y-8 text-[#1A143F]">

          {/* Section 1 */}
          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-[#4F438B]">
              1. Using MoodFlip without a profile
            </h2>
            <div className="space-y-1.5 text-sm sm:text-base text-[#1A143F] leading-relaxed pl-1">
              <p>You can use the basic MoodFlip tool without creating a profile.</p>
              <p>If you do not create a profile, MoodFlip does not need to store your email address or saved mood history.</p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-[#4F438B]">
              2. Information we may collect
            </h2>
            <div className="space-y-2 text-sm sm:text-base text-[#1A143F] leading-relaxed pl-1">
              <p>If you create a profile, MoodFlip may store:</p>
              <ul className="space-y-1.5 pl-5 list-disc text-[#1A143F] font-medium">
                <li>your email address</li>
                <li>selected moods and feelings</li>
                <li>check-in dates</li>
                <li>actions shown to you</li>
                <li>purchase history for paid downloads</li>
              </ul>
              <p className="pt-1 text-[#1A143F]">
                This information is used to provide saved check-ins, personalised downloads, and relevant MoodFlip offers.
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-[#4F438B]">
              3. Paid downloads
            </h2>
            <div className="space-y-1.5 text-sm sm:text-base text-[#1A143F] leading-relaxed pl-1">
              <p>If you buy a paid MoodFlip download, payment may be processed through a secure third-party payment provider.</p>
              <p>MoodFlip does not need to store your full card details.</p>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-[#4F438B]">
              4. 90-day automatic deletion
            </h2>
            <div className="space-y-1.5 text-sm sm:text-base text-[#1A143F] leading-relaxed pl-1">
              <p>Inactive profiles and saved mood history are automatically deleted after 90 days.</p>
              <p>This helps keep stored information limited and relevant.</p>
            </div>
          </section>

          {/* Section 5 */}
          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-[#4F438B]">
              5. Email messages
            </h2>
            <div className="space-y-1.5 text-sm sm:text-base text-[#1A143F] leading-relaxed pl-1">
              <p>If you create a profile, you may receive emails related to your saved check-ins, paid downloads, reminders, or relevant MoodFlip offers.</p>
              <p>You can unsubscribe from marketing emails.</p>
            </div>
          </section>

          {/* Section 6 */}
          <section className="space-y-2 pt-4 border-t border-[#E4DAD7]">
            <h2 className="text-base sm:text-lg font-bold text-[#4F438B]">
              6. Not medical or crisis support
            </h2>
            <div className="space-y-1.5 text-sm sm:text-base text-[#1A143F] leading-relaxed pl-1">
              <p>MoodFlip is a self-reflection tool. It is not therapy, medical advice, diagnosis, treatment, or crisis support.</p>
              <p>If you feel unsafe or need urgent help, please contact emergency services or a crisis support service in your country.</p>
            </div>
          </section>

          {/* Return link */}
          <div className="pt-4 border-t border-[#E4DAD7] flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#7464AC] hover:underline"
            >
              ← Back to MoodFlip Home
            </Link>
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
