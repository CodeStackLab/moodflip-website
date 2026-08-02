import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TermsPage() {
  return (
    <div className="site-shell">
      <Header />
      <main style={{ maxWidth: '800px', margin: '3rem auto', padding: '0 1.5rem' }}>
        <h1 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: '2.5rem', marginBottom: '1rem', color: '#2D264B' }}>
          Terms of Service
        </h1>
        <p style={{ color: '#6B638B', lineHeight: '1.7', marginBottom: '1.5rem' }}>
          Welcome to MoodFlip. By accessing or using our website at moodflip.coach, you agree to comply with and be bound by these Terms of Service.
        </p>

        <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.4rem', marginTop: '2rem', marginBottom: '0.75rem', color: '#2D264B' }}>
          1. Educational &amp; Self-Reflection Purpose
        </h2>
        <p style={{ color: '#6B638B', lineHeight: '1.7', marginBottom: '1.5rem' }}>
          MoodFlip is a free, tap-only self-reflection utility offering practical 60-second mood-shift actions. MoodFlip is not therapy, professional counselling, clinical treatment, or medical advice.
        </p>

        <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.4rem', marginTop: '2rem', marginBottom: '0.75rem', color: '#2D264B' }}>
          2. Privacy &amp; Data Protection
        </h2>
        <p style={{ color: '#6B638B', lineHeight: '1.7', marginBottom: '1.5rem' }}>
          Your check-ins are stored locally on your device or linked to your optional free account. Saved check-ins are automatically purged after 90 days of profile inactivity.
        </p>

        <h2 style={{ fontFamily: 'Fraunces, Georgia, serif', fontSize: '1.4rem', marginTop: '2rem', marginBottom: '0.75rem', color: '#2D264B' }}>
          3. Limitation of Liability
        </h2>
        <p style={{ color: '#6B638B', lineHeight: '1.7', marginBottom: '1.5rem' }}>
          MoodFlip shall not be liable for any indirect, incidental, or consequential damages resulting from the use or inability to use our services.
        </p>
      </main>
      <Footer />
    </div>
  );
}
