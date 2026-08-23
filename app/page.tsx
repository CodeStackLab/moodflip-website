'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import HeroSectionExact from '@/components/HeroSectionExact';
import TrustSection from '@/components/TrustSection';
import Footer from '@/components/Footer';
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

  const handleSmartRedirect = (targetTab: string) => {
    const isLoggedIn = typeof window !== 'undefined' && (localStorage.getItem('userLoggedIn') === 'true' || localStorage.getItem('isLoggedIn') === 'true');
    if (isLoggedIn) {
      window.location.href = `/profile?tab=${encodeURIComponent(targetTab)}`;
    } else {
      window.location.href = `/register?redirect=${encodeURIComponent(`/profile?tab=${targetTab}`)}`;
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF8F5] text-[#1A143F]">
      {/* Global Brand Header */}
      <Header />

      {/* Main Home Sections */}
      <main className={styles.homeContainer}>
        
        {/* Exact Reference-Matched Hero Section */}
        <section id="home" className="w-full pt-4">
          <HeroSectionExact
            onFlipTriggered={(mood, feeling) => {
              fetchAiFlip(mood, feeling);
            }}
            aiData={aiData}
            aiLoading={aiLoading}
          />
        </section>

        {/* Clean Trust Strip */}
        <section className="w-full">
          <TrustSection />
        </section>

        {/* Section 1: How MoodFlip Works (5-Step Flow) */}
        <section id="how" className={styles.howSection}>
          <div className={styles.sectionHeader}>
            <h2>How MoodFlip Works</h2>
            <p>A simple 5-step journey to a better you.</p>
          </div>

          <div className={styles.stepsGrid}>
            {/* Step 1 */}
            <div className={styles.stepItem}>
              <div className={styles.stepIconBadge} style={{ background: '#F4EBF5', borderColor: '#E4DAD7' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="3" width="7.5" height="7.5" rx="2" fill="#7464AC" />
                  <rect x="13.5" y="3" width="7.5" height="7.5" rx="2" fill="#9C8CC4" />
                  <rect x="3" y="13.5" width="7.5" height="7.5" rx="2" fill="#9C8CC4" />
                  <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2" fill="#4F438B" />
                </svg>
              </div>
              <div className={styles.stepContentWrap}>
                <div className={styles.stepHeaderRow}>
                  <span className={styles.stepNumber}>1</span>
                  <h3 className={styles.stepTitle}>Choose Your Mood</h3>
                </div>
                <p className={styles.stepDesc}>Pick the mood that feels closest to you.</p>
              </div>
              <div className={styles.stepConnector} />
            </div>

            {/* Step 2 */}
            <div className={styles.stepItem}>
              <div className={styles.stepIconBadge} style={{ background: '#EEE0FC', borderColor: '#7666AB' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.5 14C19.433 14 21 12.433 21 10.5C21 8.76 19.73 7.32 18.06 7.05C17.62 4.73 15.57 3 13 3C10.74 3 8.84 4.32 8.19 6.25C7.5 6.16 4 7.73 4 9.66C4 10.84 4.21 11.37 4.21 11.84C2.91 12.37 2 13.64 2 15.12C2 17.1 3.61 18.71 5.59 18.71H17.5" fill="#7464AC" />
                </svg>
              </div>
              <div className={styles.stepContentWrap}>
                <div className={styles.stepHeaderRow}>
                  <span className={styles.stepNumber}>2</span>
                  <h3 className={styles.stepTitle}>Pick Exact Feeling</h3>
                </div>
                <p className={styles.stepDesc}>Select the feeling that matches you best.</p>
              </div>
              <div className={styles.stepConnector} />
            </div>

            {/* Step 3 */}
            <div className={styles.stepItem}>
              <div className={styles.stepIconBadge} style={{ background: '#FCF3E9', borderColor: '#E4DAD7' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#7D8164" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21.5 2v6h-6M2.5 22v-6h6"/>
                  <path d="M2.5 11.5a10 10 0 0 1 15.9-4.8L21.5 8M2.5 16l3.1 1.3a10 10 0 0 0 15.9-4.8"/>
                </svg>
              </div>
              <div className={styles.stepContentWrap}>
                <div className={styles.stepHeaderRow}>
                  <span className={styles.stepNumber}>3</span>
                  <h3 className={styles.stepTitle}>Flip Your Mood</h3>
                </div>
                <p className={styles.stepDesc}>We find your positive counterpart.</p>
              </div>
              <div className={styles.stepConnector} />
            </div>

            {/* Step 4 */}
            <div className={styles.stepItem}>
              <div className={styles.stepIconBadge} style={{ background: '#FAF5F6', borderColor: '#E4DAD7' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="11" fill="#E49C8C" />
                  <path d="M9.5 8L16.5 12L9.5 16V8Z" fill="white" />
                </svg>
              </div>
              <div className={styles.stepContentWrap}>
                <div className={styles.stepHeaderRow}>
                  <span className={styles.stepNumber}>4</span>
                  <h3 className={styles.stepTitle}>Get 60-Second Action</h3>
                </div>
                <p className={styles.stepDesc}>A short action to shift your energy.</p>
              </div>
              <div className={styles.stepConnector} />
            </div>

            {/* Step 5 */}
            <div className={styles.stepItem}>
              <div className={styles.stepIconBadge} style={{ background: '#FDE8C8', borderColor: '#E4DAD7' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 7C3 5.89543 3.89543 5 5 5H9.58579C10.1162 5 10.6249 5.21071 11 5.58579L12.4142 7H19C20.1046 7 21 7.89543 21 9V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17V7Z" fill="#EDAA7A" />
                  <rect x="7" y="13" width="2" height="3" rx="0.5" fill="white" />
                  <rect x="11" y="11" width="2" height="5" rx="0.5" fill="white" />
                  <rect x="15" y="9" width="2" height="7" rx="0.5" fill="white" />
                </svg>
              </div>
              <div className={styles.stepContentWrap}>
                <div className={styles.stepHeaderRow}>
                  <span className={styles.stepNumber}>5</span>
                  <h3 className={styles.stepTitle}>Save & Track Progress</h3>
                </div>
                <p className={styles.stepDesc}>Save your check-in and see growth.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: 7-Day Plan Promo */}
        <section className={styles.planSection}>
          <div className={styles.bookWrap}>
            <img
              src="/7day-book-cover-3d-v6.png"
              alt="MoodFlip 7-Day Plan Book"
              className={styles.bookImg}
            />
          </div>

          <div className={styles.planContent}>
            <h2>Build a Better Mindset in Just 7 Days</h2>
            <p>Simple daily check-ins, practical actions, real change.</p>
            <ul className={styles.planChecklist}>
              <li className={styles.checkItem}>
                <span className={styles.checkCircle}>✓</span>
                <span>Daily mood check-ins</span>
              </li>
              <li className={styles.checkItem}>
                <span className={styles.checkCircle}>✓</span>
                <span>Personalized 60-second actions</span>
              </li>
              <li className={styles.checkItem}>
                <span className={styles.checkCircle}>✓</span>
                <span>7-day PDF report</span>
              </li>
              <li className={styles.checkItem}>
                <span className={styles.checkCircle}>✓</span>
                <span>Gentle guidance for you</span>
              </li>
            </ul>
          </div>

          <div className={styles.priceCard}>
            <h3 className={styles.priceCardTitle}>7-Day Plan</h3>
            <p className={styles.priceCardSubtitle}>Perfect for getting started</p>
            <div className={styles.priceAmount}>
              <span className={styles.priceCurrency}>$</span>7
            </div>
            <span className={styles.priceNote}>One-time payment</span>
            <button
              type="button"
              onClick={() => handleSmartRedirect('My 7-Day Plan')}
              className={styles.planCtaButton}
            >
              Get 7-Day Plan Now
            </button>
            <span className={styles.secureText}>Secure payment • Instant PDF</span>
          </div>
        </section>

        {/* Section 3: Explore Your Feelings */}
        <section id="library" className={styles.librarySection}>
          <div className={styles.sectionHeader}>
            <h2>Explore Your Feelings</h2>
            <p>Browse common moods and learn how to shift them.</p>
          </div>

          <div className={styles.libraryGrid}>
            {[
              {
                title: 'Anxiety',
                sub: 'Find calm & clarity',
                bg: '#F4EBF5',
                iconBg: '#EEE0FC',
                icon: '🎯'
              },
              {
                title: 'Stress',
                sub: 'Find balance',
                bg: '#FCF3E9',
                iconBg: '#FDE8C8',
                icon: '🌩️'
              },
              {
                title: 'Sadness',
                sub: 'Find light again',
                bg: '#F4EBF5',
                iconBg: '#EEE0FC',
                icon: '😢'
              },
              {
                title: 'Anger',
                sub: 'Find peace',
                bg: '#FAF5F6',
                iconBg: '#FDE8C8',
                icon: '🔥'
              },
              {
                title: 'Loneliness',
                sub: 'Find connection',
                bg: '#F4EBF5',
                iconBg: '#EEE0FC',
                icon: '👤'
              },
              {
                title: 'Overwhelmed',
                sub: 'Find control',
                bg: '#EEE0FC',
                iconBg: '#F4EBF5',
                icon: '🌀'
              }
            ].map(mood => (
              <div
                key={mood.title}
                className={styles.moodCard}
                style={{ background: mood.bg }}
                onClick={() => handleSmartRedirect('Mood Library')}
              >
                <span className={styles.moodCardIcon} style={{ background: mood.iconBg }}>
                  {mood.icon}
                </span>
                <strong className={styles.moodCardTitle}>{mood.title}</strong>
                <span className={styles.moodCardSub}>{mood.sub}</span>
                <span className={styles.moodCardLink}>View →</span>
              </div>
            ))}
          </div>

          <button
            type="button"
            className={styles.allMoodsBtn}
            onClick={() => handleSmartRedirect('Mood Library')}
          >
            <span>View All Moods</span>
            <span>→</span>
          </button>
        </section>

        {/* Section 4: About MoodFlip */}
        <section id="about" className={styles.aboutSection}>
          <div className={styles.aboutIllustration}>
            <img
              src="/about-girl.png"
              alt="About MoodFlip"
              className={styles.aboutImg}
            />
          </div>

          <div className={styles.aboutContent}>
            <h2>About MoodFlip</h2>
            <p>
              MoodFlip is a self-reflection utility designed to help you find your mood match, meaningfully.
            </p>
            <p>
              We are not a therapy or medical service. We provide simple tools, not medical advice.
            </p>
            <p className={styles.emergencyNotice}>
              For emergencies, please contact local emergency services.
            </p>
          </div>

          <div className={styles.aboutFeaturesCard}>
            <div className={styles.featurePoint}>
              <span className={styles.featureIconWrap}>💗</span>
              <span>Self-reflection, not diagnosis</span>
            </div>
            <div className={styles.featurePoint}>
              <span className={styles.featureIconWrap}>🛠️</span>
              <span>Practical tools for daily life</span>
            </div>
            <div className={styles.featurePoint}>
              <span className={styles.featureIconWrap}>🌱</span>
              <span>Designed with care &amp; empathy</span>
            </div>
            <div className={styles.featurePoint}>
              <span className={styles.featureIconWrap}>🔒</span>
              <span>Your privacy comes first</span>
            </div>
          </div>
        </section>

      </main>

      {/* Global Brand Footer */}
      <Footer />
    </div>
  );
}
