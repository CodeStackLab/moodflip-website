import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Refund & Cancellation Policy | MoodFlip',
  description: 'MoodFlip 30-Day 100% money-back guarantee and refund request details.',
};

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-[#FDF8F5] text-[#1A143F] font-sans antialiased flex flex-col justify-between selection:bg-[#F4EBF5] selection:text-[#7464AC]">
      <Header />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full space-y-6">
        
        {/* ── WIDE SUNRISE BANNER: TEXT DIRECTLY ON TOP OF ARTWORK ── */}
        <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-[#E4DAD7] shadow-sm min-h-[220px] sm:min-h-[280px] md:min-h-[300px] flex flex-col items-center justify-center text-center p-6 sm:p-10 bg-[#FDF8F5]">
          {/* Full Sunrise Landscape Artwork */}
          <img
            src="/peaceful-sunrise-bg.png"
            alt="MoodFlip Peaceful Sunrise"
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
          />

          {/* Text directly on top of the image */}
          <div className="relative z-10 max-w-3xl mx-auto space-y-3 px-2">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1A143F] tracking-tight">
              Refund &amp; Cancellation Policy
            </h1>
            <p className="text-xs sm:text-sm text-[#533B93] font-extrabold tracking-wide uppercase">
              Last updated: 21 August 2026
            </p>
            <p className="text-base sm:text-lg md:text-xl text-[#1A143F] font-bold leading-relaxed max-w-2xl mx-auto">
              We stand behind our self-reflection tools with a hassle-free 30-day money-back guarantee.
            </p>
          </div>
        </div>

        {/* ── MAIN CONTENT CARD ── */}
        <div className="rounded-2xl sm:rounded-3xl border border-[#E4DAD7] bg-[#FEFAF8] p-6 sm:p-12 shadow-[0_4px_24px_rgba(26,20,63,0.04)] space-y-8 text-[#1A143F]">

          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#4F438B]">
              1. 30-Day 100% Money-Back Guarantee
            </h2>
            <p className="text-sm sm:text-base leading-relaxed">
              We want you to feel completely satisfied with your MoodFlip experience. We offer a <strong>100% 30-day money-back guarantee</strong> on all paid 7-day personalized reports, guides, and download packages.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#4F438B]">
              2. How to Request a Refund
            </h2>
            <p className="text-sm sm:text-base leading-relaxed">
              To request a full refund, simply send an email to <a href="mailto:support@moodflip.coach" className="font-bold text-[#7464AC] underline">support@moodflip.coach</a> within 30 days of your purchase. Please include your order email or transaction confirmation.
            </p>
            <p className="text-sm sm:text-base leading-relaxed">
              No questions asked — refunds are credited back to your original payment method within 3 to 5 business days.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#4F438B]">
              3. Free Tier Usage
            </h2>
            <p className="text-sm sm:text-base leading-relaxed">
              The core MoodFlip mood check-in and 60-second action tool is completely free to use with no payment information required.
            </p>
          </section>

          {/* Navigation Links */}
          <div className="pt-6 border-t border-[#E4DAD7] flex flex-wrap items-center justify-between gap-4 text-sm font-bold text-[#7464AC]">
            <Link href="/" className="hover:underline">
              ← Back to Home
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
              <Link href="/terms" className="hover:underline">Terms of Service</Link>
              <Link href="/disclaimer" className="hover:underline">Disclaimer</Link>
            </div>
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
