import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Medical & General Disclaimer | MoodFlip',
  description: 'MoodFlip is a self-reflection and emotional awareness utility. It is not therapy, medical advice, diagnosis, treatment, or crisis support.',
};

export default function DisclaimerPage() {
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
              Medical &amp; General Disclaimer
            </h1>
            <p className="text-xs sm:text-sm text-[#533B93] font-extrabold tracking-wide uppercase">
              Last updated: 21 August 2026
            </p>
            <p className="text-base sm:text-lg md:text-xl text-[#1A143F] font-bold leading-relaxed max-w-2xl mx-auto">
              MoodFlip is designed for small emotional shifts — not big promises. It is a self-reflection tool, not medical or psychological therapy.
            </p>
          </div>
        </div>

        {/* ── MAIN CONTENT CARD ── */}
        <div className="rounded-2xl sm:rounded-3xl border border-[#E4DAD7] bg-[#FEFAF8] p-6 sm:p-12 shadow-[0_4px_24px_rgba(26,20,63,0.04)] space-y-8 text-[#1A143F]">

          {/* Section 1: Not Medical Advice */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#4F438B]">
              1. Not Medical, Psychiatric, or Psychological Advice
            </h2>
            <p className="text-sm sm:text-base leading-relaxed">
              MoodFlip is a self-reflection and emotional awareness utility. The content, guided prompts, 60-second micro-actions, and mood tracking features provided through MoodFlip are intended solely for personal self-reflection, mindfulness, and general lifestyle education.
            </p>
            <p className="text-sm sm:text-base leading-relaxed">
              MoodFlip does <strong>NOT</strong> provide medical advice, diagnosis, treatment, clinical therapy, or psychiatric consultations. The service is not a substitute for professional medical advice, clinical diagnosis, or qualified mental health treatment.
            </p>
          </section>

          {/* Section 2: Crisis & Emergency Notice */}
          <section className="space-y-3 bg-[#FAF3EC] p-6 rounded-2xl border border-[#E8DDD8]">
            <h2 className="text-lg sm:text-xl font-bold text-[#4F438B] flex items-center gap-2">
              <span>🚨</span> 2. Emergency &amp; Crisis Support Resources
            </h2>
            <p className="text-sm sm:text-base leading-relaxed font-medium">
              If you are feeling overwhelmed, unsafe, experiencing suicidal thoughts, or in an emotional or medical emergency, please do <strong>NOT</strong> rely on MoodFlip. Contact qualified emergency medical services or a 24/7 crisis line immediately:
            </p>
            <ul className="space-y-2 pl-5 list-disc text-sm sm:text-base font-semibold text-[#1A143F]">
              <li><strong>United States &amp; Canada:</strong> Call or text <span className="text-[#7464AC] font-black">988</span> (Suicide &amp; Crisis Lifeline) or text HOME to 741741.</li>
              <li><strong>United Kingdom:</strong> Call <span className="text-[#7464AC] font-black">111</span> (NHS Mental Health) or Samaritans at <span className="text-[#7464AC] font-black">116 123</span>.</li>
              <li><strong>Australia:</strong> Call <span className="text-[#7464AC] font-black">13 11 14</span> (Lifeline).</li>
              <li><strong>International:</strong> Contact your local emergency medical service (e.g. 911, 999, 112) or go to the nearest hospital emergency room.</li>
            </ul>
          </section>

          {/* Section 3: No Doctor-Patient Relationship */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#4F438B]">
              3. No Doctor-Patient or Therapeutic Relationship
            </h2>
            <p className="text-sm sm:text-base leading-relaxed">
              Use of the MoodFlip website, applications, or downloadable reports does not establish a doctor-patient, therapist-client, or other healthcare professional relationship between you and MoodFlip or its creators.
            </p>
            <p className="text-sm sm:text-base leading-relaxed">
              Always seek the advice of your physician, psychiatrist, licensed therapist, or other qualified health provider with any questions you may have regarding a medical or mental health condition. Never disregard professional medical advice or delay seeking it because of something you have read or experienced on MoodFlip.
            </p>
          </section>

          {/* Section 4: Individual Results May Vary */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#4F438B]">
              4. Individual Results and Micro-Actions
            </h2>
            <p className="text-sm sm:text-base leading-relaxed">
              MoodFlip suggests small, simple 60-second actions (such as gentle breathing, stepping away from screens, or jotting down thoughts) designed for slight, immediate mood shifts. Because individual circumstances, physical abilities, and psychological states vary greatly, results are not guaranteed and will differ from person to person.
            </p>
            <p className="text-sm sm:text-base leading-relaxed">
              Participate only in exercises and activities that you feel comfortable and safe performing. Discontinue any exercise or action immediately if you experience physical discomfort, heightened anxiety, or distress.
            </p>
          </section>

          {/* Section 5: AI-Assisted Reflections */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-[#4F438B]">
              5. Automated &amp; AI-Assisted Content
            </h2>
            <p className="text-sm sm:text-base leading-relaxed">
              Certain features within MoodFlip may utilize automated algorithms or artificial intelligence to provide personalized prompts, reframing suggestions, or summary reports. While we strive for supportive and helpful outputs, AI-generated reflections may occasionally be inaccurate, incomplete, or unsuitable for your specific situation.
            </p>
          </section>

          {/* Navigation Links */}
          <div className="pt-6 border-t border-[#E4DAD7] flex flex-wrap items-center justify-between gap-4 text-sm font-bold text-[#7464AC]">
            <Link href="/" className="hover:underline">
              ← Back to Home
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/about" className="hover:underline">About</Link>
              <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
              <Link href="/terms" className="hover:underline">Terms of Service</Link>
            </div>
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
