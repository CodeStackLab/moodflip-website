import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2D264B]">
      <Header />
      <main className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="font-serif text-4xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-[#6B638B] leading-relaxed mb-6">
          At MoodFlip, we respect your privacy. We store as little data as possible and operate with an automatic 90-day data cleanup policy.
        </p>
        <div className="space-y-6 text-sm text-[#6B638B] leading-relaxed">
          <section>
            <h2 className="font-serif text-xl font-bold text-[#2D264B] mb-2">1. Data Storage</h2>
            <p>Your interactive check-ins are kept locally in your browser. Optional account sign-ups store only your email address and encrypted check-in preferences.</p>
          </section>
          <section>
            <h2 className="font-serif text-xl font-bold text-[#2D264B] mb-2">2. 90-Day Automatic Cleanup</h2>
            <p>Any account data or check-in records left inactive for 90 consecutive days are automatically purged from our database.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
