import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'About MoodFlip | Self-Reflection & Mindset Utility',
  description: 'MoodFlip helps you notice your current mood, understand the feeling behind it, and make one step toward feeling better.',
};

export default function AboutPage() {
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
        <div className="rounded-2xl sm:rounded-3xl border border-[#E4DAD7] bg-[#FEFAF8] p-6 sm:p-12 shadow-[0_4px_24px_rgba(26,20,63,0.04)] space-y-6 text-[#1A143F]">
          
          {/* Main Title */}
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1A143F] tracking-tight">
            About MoodFlip
          </h1>

          {/* Paragraph 1 (Bold Lead) */}
          <p className="text-base sm:text-lg font-bold text-[#1A143F] leading-relaxed">
            MoodFlip helps you notice your current mood, understand the feeling behind it, and make one step toward feeling better.
          </p>

          {/* Paragraph 2 */}
          <p className="text-sm sm:text-base text-[#1A143F] leading-relaxed">
            You start by choosing your current mood, then a more specific feeling. MoodFlip then suggests a better-feeling and a short 60-second action that you can try straight away.
          </p>

          {/* Paragraph 3 */}
          <p className="text-sm sm:text-base text-[#1A143F] leading-relaxed">
            MoodFlip is designed for small emotional shifts - not big promises. It is not therapy, medical advice, diagnosis, treatment, or crisis support.
          </p>

          {/* Our Aim Section */}
          <div className="space-y-2.5 pt-2">
            <h2 className="text-base sm:text-lg font-bold text-[#4F438B]">
              Our aim is simple:
            </h2>
            <ul className="space-y-1.5 pl-5 text-sm sm:text-base text-[#1A143F] font-semibold list-disc">
              <li>Notice your mood.</li>
              <li>Name the feeling behind your mood.</li>
              <li>Take one step toward feeling better.</li>
            </ul>
          </div>

          {/* Paragraph 4 */}
          <p className="text-sm sm:text-base text-[#1A143F] leading-relaxed pt-2">
            You can use the basic MoodFlip tool without creating a profile. If you choose to create a profile, you can save check-ins and create personalised mood reports.
          </p>

          {/* Paragraph 5 (Bold Closing) */}
          <p className="text-base sm:text-lg font-bold text-[#1A143F] leading-relaxed pt-2 border-t border-[#E4DAD7]">
            Your mood does not have to stay where it is. MoodFlip helps you notice what you feel, shows you a direction to feel better, and you can take one small action toward it.
          </p>

          {/* Action CTA */}
          <div className="pt-4 flex items-center justify-start gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#7464AC] to-[#4F438B] text-white text-sm font-extrabold shadow-md hover:scale-[1.02] hover:opacity-95 transition-all"
            >
              <span>⚡ Try the Mood Tool</span>
            </Link>
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
