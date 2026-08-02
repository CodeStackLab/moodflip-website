import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2D264B]">
      <Header />
      <main className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="font-serif text-4xl font-bold mb-4">Medical &amp; Therapy Disclaimer</h1>
        <div className="rounded-3xl border border-[#EAE3D6] bg-white p-8 shadow-sm text-sm text-[#6B638B] leading-relaxed space-y-4">
          <p>
            <strong>MoodFlip is not therapy, medical advice, clinical treatment, or crisis support.</strong> It is an interactive self-reflection and mindset reset tool designed for everyday emotional awareness.
          </p>
          <p>
            If you are experiencing severe distress, self-harm thoughts, or a mental health crisis, please reach out immediately to qualified medical professionals or local crisis hotlines.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
