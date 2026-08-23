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
        
        {/* ── TOP HERO WITH SUNRISE BACKGROUND & TEXT ON TOP OF IT ── */}
        <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-[#E4DAD7] shadow-[0_4px_20px_rgba(26,20,63,0.04)] bg-[#FEFAF8] min-h-[220px] sm:min-h-[270px] flex flex-col items-center justify-center text-center p-6 sm:p-10">
          {/* Sunrise Background Image */}
          <img
            src="/peaceful-sunrise-bg.png"
            alt="MoodFlip Peaceful Sunrise"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-65 pointer-events-none"
          />
          {/* Soft warm gradient overlay for crystal clear text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#FCF5EE]/30 via-transparent to-[#FCF5EE]/70 pointer-events-none" />

          {/* Text ON TOP of the Sunrise Image */}
          <div className="relative z-10 max-w-2xl mx-auto space-y-2.5">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1A143F] tracking-tight drop-shadow-2xs">
              About MoodFlip
            </h1>
            <p className="text-base sm:text-lg md:text-xl font-bold text-[#1A143F] leading-relaxed max-w-xl mx-auto pt-1">
              MoodFlip helps you notice your current mood, understand the feeling behind it, and make one step toward feeling better.
            </p>
          </div>
        </div>

        {/* ── MAIN CONTENT CARD (Exact Google Doc Structure) ── */}
        <div className="rounded-2xl sm:rounded-3xl border border-[#E4DAD7] bg-[#FEFAF8] p-6 sm:p-12 shadow-[0_4px_24px_rgba(26,20,63,0.04)] space-y-6 text-[#1A143F]">
          
          {/* Paragraph 2 */}
          <p className="text-sm sm:text-base md:text-lg text-[#1A143F] leading-relaxed">
            You start by choosing your current mood, then a more specific feeling. MoodFlip then suggests a better-feeling and a short 60-second action that you can try straight away.
          </p>

          {/* Paragraph 3 */}
          <p className="text-sm sm:text-base md:text-lg text-[#1A143F] leading-relaxed">
            MoodFlip is designed for small emotional shifts - not big promises. It is not therapy, medical advice, diagnosis, treatment, or crisis support.
          </p>

          {/* Our Aim Section */}
          <div className="space-y-3 pt-2 bg-[#FAF3EC] p-6 rounded-2xl border border-[#E8DDD8]">
            <h2 className="text-lg sm:text-xl font-extrabold text-[#4F438B]">
              Our aim is simple:
            </h2>
            <ul className="space-y-2 pl-6 text-sm sm:text-base md:text-lg text-[#1A143F] font-bold list-disc">
              <li>Notice your mood.</li>
              <li>Name the feeling behind your mood.</li>
              <li>Take one step toward feeling better.</li>
            </ul>
          </div>

          {/* Paragraph 4 */}
          <p className="text-sm sm:text-base md:text-lg text-[#1A143F] leading-relaxed pt-2">
            You can use the basic MoodFlip tool without creating a profile. If you choose to create a profile, you can save check-ins and create personalised mood reports.
          </p>

          {/* Paragraph 5 (Bold Closing) */}
          <p className="text-base sm:text-lg md:text-xl font-bold text-[#1A143F] leading-relaxed pt-4 border-t border-[#E4DAD7]">
            Your mood does not have to stay where it is. MoodFlip helps you notice what you feel, shows you a direction to feel better, and you can take one small action toward it.
          </p>

          {/* Action CTA */}
          <div className="pt-4 flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#7464AC] to-[#4F438B] text-white text-sm md:text-base font-extrabold shadow-md hover:scale-[1.02] hover:opacity-95 transition-all"
            >
              <span>⚡ Try the Mood Tool</span>
            </Link>
            <Link
              href="/privacy"
              className="text-sm font-bold text-[#7464AC] hover:underline"
            >
              Privacy Policy →
            </Link>
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
