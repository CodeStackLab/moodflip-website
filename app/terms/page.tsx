import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Terms of Service | MoodFlip',
  description: 'Terms of Service for using MoodFlip self-reflection utility and digital coaching downloads.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#FCF5EE] text-[#1A143F] font-sans antialiased flex flex-col justify-between selection:bg-[#F4EBF5] selection:text-[#7464AC]">
      <Header />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full space-y-6">
        
        {/* ── WIDE SUNRISE BANNER: TEXT DIRECTLY ON TOP OF ARTWORK ── */}
        <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-[#E4DAD7] shadow-sm min-h-[220px] sm:min-h-[280px] md:min-h-[300px] flex flex-col items-center justify-center text-center p-6 sm:p-10 bg-[#FCF5EE]">
          {/* Full Sunrise Landscape Artwork */}
          <img
            src="/peaceful-sunrise-bg.png"
            alt="MoodFlip Peaceful Sunrise"
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
          />

          {/* Text directly on top of the image */}
          <div className="relative z-10 max-w-3xl mx-auto space-y-3 px-2">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1A143F] tracking-tight">
              Terms of Service
            </h1>
            <p className="text-xs sm:text-sm text-[#533B93] font-extrabold tracking-wide uppercase">
              Last updated: 21 August 2026
            </p>
            <p className="text-base sm:text-lg md:text-xl text-[#1A143F] font-bold leading-relaxed max-w-2xl mx-auto">
              Please review these Terms of Service before using the MoodFlip self-reflection utility and downloads.
            </p>
          </div>
        </div>

        {/* ── MAIN CONTENT CARD ── */}
        <div className="rounded-2xl sm:rounded-3xl border border-[#E4DAD7] bg-[#FEFAF8] p-6 sm:p-12 shadow-[0_4px_24px_rgba(26,20,63,0.04)] space-y-8 text-[#1A143F]">

          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#4F438B]">
              1. Acceptance of Terms
            </h2>
            <p className="text-sm sm:text-base leading-relaxed">
              By accessing or using MoodFlip (&ldquo;Service&rdquo;), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#4F438B]">
              2. Nature of Service (Not Medical Advice)
            </h2>
            <p className="text-sm sm:text-base leading-relaxed">
              MoodFlip is a self-reflection and emotional awareness utility. <strong>MoodFlip is NOT a medical, psychiatric, or healthcare provider.</strong> Content, micro-actions, AI reflections, and assessments provided through MoodFlip are for educational and personal reflection purposes only and do not constitute professional diagnosis, clinical therapy, or medical treatment.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#4F438B]">
              3. User Profiles &amp; Accounts
            </h2>
            <p className="text-sm sm:text-base leading-relaxed">
              You may use the core MoodFlip tool without creating an account. If you choose to create a profile, you are responsible for maintaining the confidentiality of your account credentials. Inactive profiles and saved mood data are automatically deleted after 90 days in accordance with our Privacy Policy.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#4F438B]">
              4. Paid Downloads &amp; Subscriptions
            </h2>
            <p className="text-sm sm:text-base leading-relaxed">
              If you purchase a paid download, customized 7-day report, or coaching plan, payments are processed securely through accredited third-party payment gateways. We offer a 30-day money-back guarantee on eligible digital products.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#4F438B]">
              5. Intellectual Property
            </h2>
            <p className="text-sm sm:text-base leading-relaxed">
              All branding, text, illustrations, artwork, interactive widgets, and methodologies displayed on MoodFlip are the exclusive property of MoodFlip and protected by copyright and intellectual property laws.
            </p>
          </section>

          {/* Navigation Links */}
          <div className="pt-6 border-t border-[#E4DAD7] flex flex-wrap items-center justify-between gap-4 text-sm font-bold text-[#7464AC]">
            <Link href="/" className="hover:underline">
              ← Back to Home
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
              <Link href="/disclaimer" className="hover:underline">Disclaimer</Link>
              <Link href="/refund" className="hover:underline">Refund Policy</Link>
            </div>
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
