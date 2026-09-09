'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import HeroSectionExact from '@/components/HeroSectionExact';
import styles from './page.module.css';

export default function HomePage() {
  const [aiData, setAiData] = useState<{
    reframingQuote?: string;
    actionTitle?: string;
    actionSteps?: string[];
    scienceInsight?: string;
  } | null>(null);
  const [aiLoading, setAiLoading] = useState(false);

  const fetchAiFlip = async (moodName: string, feelingName: string) => {
    setAiLoading(true);
    try {
      const res = await fetch('/api/ai/flip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mood: moodName, feeling: feelingName })
      });
      const data = await res.json();
      if (data.success && data.aiData) {
        setAiData(data.aiData);
      }
    } catch (e) {
      // silently handle error
    } finally {
      setAiLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-[#FEF9F5] text-[#1A143F]">
      {/* Global Brand Header */}
      <Header />

      {/* Main Home Sections */}
      <main className={styles.homeContainer}>
        
        {/* Exact Reference-Matched Hero Section */}
        <section id="home" className="w-full pt-2 sm:pt-4">
          <HeroSectionExact
            onFlipTriggered={(mood, feeling) => {
              fetchAiFlip(mood, feeling);
            }}
            aiData={aiData}
            aiLoading={aiLoading}
          />
        </section>

      </main>
    </div>
  );
}
