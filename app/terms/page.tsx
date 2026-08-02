import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2D264B]">
      <Header />
      <main className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="font-serif text-4xl font-bold mb-4">Terms of Service</h1>
        <div className="rounded-3xl border border-[#EAE3D6] bg-white p-8 shadow-sm text-sm text-[#6B638B] leading-relaxed space-y-4">
          <p>Welcome to MoodFlip. By using our website and services, you agree to these terms.</p>
          <h2 className="font-serif text-xl font-bold text-[#2D264B]">1. Use of Service</h2>
          <p>MoodFlip is provided for personal self-reflection purposes. You agree not to misuse the platform or reverse-engineer our proprietary mood-flipping tools.</p>
          <h2 className="font-serif text-xl font-bold text-[#2D264B]">2. Intellectual Property</h2>
          <p>All design assets, typography, icons, and action texts are protected by intellectual property laws.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
