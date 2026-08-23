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

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full space-y-6">
        
        {/* ── TOP SUNRISE ARTWORK BANNER (Exact Mockup Match) ── */}
        <div className="w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-[#E4DAD7] shadow-sm bg-[#FEFAF8] flex items-center justify-center">
          <img
            src="/peaceful-sunrise-bg.png"
            alt="MoodFlip Peaceful Sunrise Landscape"
            className="w-full h-auto max-h-[260px] object-cover object-center"
          />
        </div>

        {/* ── MAIN CONTENT CARD (Exact Google Doc Structure) ── */}
        <div className="rounded-2xl sm:rounded-3xl border border-[#E4DAD7] bg-[#FEFAF8] p-6 sm:p-12 shadow-[0_4px_24px_rgba(26,20,63,0.04)] space-y-7 text-[#1A143F]">
          
          {/* Header Section */}
          <div className="space-y-2 border-b border-[#E4DAD7] pb-4">
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1A143F] tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-xs sm:text-sm text-[#7E7096] font-semibold">
              Last updated: 21 August 2026
            </p>
            <p className="text-sm sm:text-base text-[#1A143F] leading-relaxed pt-1">
              MoodFlip respects your privacy. This Privacy Policy explains what information we may collect and how it is used.
            </p>
          </div>

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
              <ul className="space-y-1 pl-5 list-disc text-[#1A143F]">
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
          <section className="space-y-2 pt-2 border-t border-[#E4DAD7]">
            <h2 className="text-base sm:text-lg font-bold text-[#4F438B]">
              6. Not medical or crisis support
            </h2>
            <div className="space-y-1.5 text-sm sm:text-base text-[#1A143F] leading-relaxed pl-1">
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
