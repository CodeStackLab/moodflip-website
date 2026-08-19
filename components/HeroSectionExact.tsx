"use client";

import React, { useState, useEffect } from "react";
import styles from "./HeroSectionExact.module.css";

export type MoodType = "Sad" | "Fearful" | "Angry" | "Disgusted" | "Bad";

// -- ICONS ------------------------------------------------------------------

function MoonStarsLonelyIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 6a4 4 0 0 1 3 4 4 4 0 0 1-4 4 3.9 3.9 0 0 1-1.2-.2A4.2 4.2 0 0 0 14 6z" strokeWidth="1.4" />
      <path d="M22 6.5l.5 1 1 .5-1 .5-.5 1-.5-1-1-.5 1-.5.5-1z" fill="currentColor" stroke="none" />
      <circle cx="18" cy="16" r="3.2" />
      <path d="M13 29v-4a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v4" />
      <path d="M11 29h14" />
    </svg>
  );
}
function RejectedIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="18" r="11" />
      <circle cx="14" cy="15" r="1.2" fill="currentColor" />
      <circle cx="22" cy="15" r="1.2" fill="currentColor" />
      <path d="M14 23a5 5 0 0 1 8 0" />
      <circle cx="25" cy="24" r="4.5" fill="#FAF8FD" stroke="currentColor" strokeWidth="1.5" />
      <path d="M23.2 22.2l3.6 3.6m0-3.6l-3.6 3.6" strokeWidth="1.5" />
    </svg>
  );
}
function BrokenHeartIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 10.5C16.5 7.5 12 7.5 9.5 10c-3 3-2 8 8.5 16.5 10.5-8.5 11.5-13.5 8.5-16.5-2.5-2.5-7-2.5-8.5.5z" />
      <path d="M18 11l-2 5 3.5 3-2.5 5 1 2.5" strokeWidth="1.6" />
    </svg>
  );
}
function AshamedIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="13" r="3.5" />
      <path d="M14 13c-.5-3 1.5-5 4-5s4.5 2 4 5" />
      <path d="M12 28v-3a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v3" />
      <path d="M14.5 17l-1.5 5h3l2-3" />
      <path d="M21.5 17l1.5 5h-3l-2-3" />
    </svg>
  );
}
function GuiltyIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 11a3.5 3.5 0 0 1 6.5-1.5A3 3 0 0 1 24 12a2.5 2.5 0 0 1-1 4.8H12a3 3 0 0 1 0-5.8z" strokeWidth="1.4" />
      <path d="M14 18.5l-.8 2m4.8-2l-.8 2m4.8-2l-.8 2" strokeWidth="1.4" />
      <circle cx="18" cy="24.5" r="2.8" />
      <path d="M13.5 31c.5-2.5 2-4 4.5-4s4 1.5 4.5 4" />
    </svg>
  );
}
function EmptyIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="14" r="3.5" />
      <path d="M11.5 29c.5-4 3.5-6.5 6.5-6.5s6 2.5 6.5 6.5" />
      <circle cx="18" cy="22" r="5" strokeDasharray="2.5 2.5" strokeWidth="1.5" />
    </svg>
  );
}
function OverwhelmedIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8c-3 0-5 1.5-5 4s3 3.5 6 3.5 5-1.5 5-3.5-2-3-4.5-3-4.5 2-3 4.5 4 2 4.5 0c.5-1.5-.5-3-2-3s-2.5 1-2.5 2.5" strokeWidth="1.4" />
      <circle cx="18" cy="20" r="3.2" />
      <path d="M12 30c.5-3.5 3-5.5 6-5.5s5.5 2 6 5.5" />
    </svg>
  );
}
function AbandonedIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="15" r="3.2" />
      <path d="M12.5 28.5c.5-3.5 2.5-5 5.5-5s5 1.5 5.5 5" />
      <path d="M9 25a11 11 0 0 1 18 0" strokeDasharray="3 3" strokeWidth="1.5" />
    </svg>
  );
}
function AnxiousIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="14" r="3.5" />
      <path d="M12 29c.5-4 3-6 6-6s5.5 2 6 6" />
      <path d="M10 20c2-3 5-4 8-3" strokeDasharray="2 2" strokeWidth="1.4" />
      <path d="M26 20c-2-3-5-4-8-3" strokeDasharray="2 2" strokeWidth="1.4" />
    </svg>
  );
}
function TerrifiedIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="17" r="11" />
      <circle cx="14" cy="14" r="1.5" fill="currentColor" />
      <circle cx="22" cy="14" r="1.5" fill="currentColor" />
      <path d="M13 22a6 6 0 0 0 10 0" />
      <path d="M10 10l2 2M26 10l-2 2" strokeWidth="1.4" />
    </svg>
  );
}
function FrustratedIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="17" r="11" />
      <circle cx="14" cy="15" r="1.2" fill="currentColor" />
      <circle cx="22" cy="15" r="1.2" fill="currentColor" />
      <path d="M14 23a5 5 0 0 0 8 0" />
      <path d="M12 11l2 2M24 11l-2 2" />
    </svg>
  );
}
function FuriousIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="17" r="11" />
      <path d="M12 12l4 3M24 12l-4 3" strokeWidth="2" />
      <circle cx="14" cy="15" r="1.5" fill="currentColor" />
      <circle cx="22" cy="15" r="1.5" fill="currentColor" />
      <path d="M14 24a5 5 0 0 0 8 0" />
    </svg>
  );
}
function IrritatedIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="18" r="11" />
      <circle cx="14" cy="16" r="1.2" fill="currentColor" />
      <circle cx="22" cy="16" r="1.2" fill="currentColor" />
      <path d="M14 24a5 5 0 0 0 8 0" />
      <path d="M11 12l2 1M25 12l-2 1" strokeWidth="1.4" />
    </svg>
  );
}
function BitterIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="18" r="11" />
      <path d="M13 22a6 6 0 0 0 10 0" />
      <line x1="14" y1="15" x2="16" y2="15" strokeWidth="2" />
      <line x1="20" y1="15" x2="22" y2="15" strokeWidth="2" />
    </svg>
  );
}
function RepulsedIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="18" r="11" />
      <circle cx="14" cy="16" r="1.2" fill="currentColor" />
      <circle cx="22" cy="16" r="1.2" fill="currentColor" />
      <path d="M14 24a4 4 0 0 0 8 0" />
      <path d="M16 12c0-1 1-2 2-2s2 1 2 2" strokeWidth="1.4" />
    </svg>
  );
}
function DisappointedIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="18" r="11" />
      <circle cx="14" cy="16" r="1.2" fill="currentColor" />
      <circle cx="22" cy="16" r="1.2" fill="currentColor" />
      <path d="M14 24a5 5 0 0 0 8 0" />
      <path d="M12 13l2 2M24 13l-2 2" strokeWidth="1.3" />
    </svg>
  );
}
function UncomfortableIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="14" r="3.5" />
      <path d="M12 29v-4a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v4" />
      <path d="M12 22l2-1M24 22l-2-1" strokeWidth="1.3" />
    </svg>
  );
}
function CriticalIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="14" r="3.5" />
      <path d="M12 29v-4a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v4" />
      <path d="M11 10h5M20 10h5" strokeWidth="1.4" />
    </svg>
  );
}
function PressuredIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="16" r="3.5" />
      <path d="M12 30v-4a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v4" />
      <path d="M18 5v4M14 6l1 3M22 6l-1 3" strokeWidth="1.4" />
    </svg>
  );
}
function ExhaustedIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="14" r="3.5" />
      <path d="M12 29v-4a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v4" />
      <path d="M12 22l6-2 6 2" strokeWidth="1.3" strokeDasharray="2 1.5" />
    </svg>
  );
}
function BurnedOutIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="15" r="3.5" />
      <path d="M12 30v-4a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v4" />
      <path d="M16 7c0-2 1-3 2-3 0 2 2 3 2 5s-1 3-2 3-2-1-2-2" strokeWidth="1.3" />
    </svg>
  );
}
function FranticIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="14" r="3.5" />
      <path d="M12 29v-4a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v4" />
      <path d="M10 20l2-2 2 2 2-2 2 2 2-2 2 2" strokeWidth="1.3" />
    </svg>
  );
}
function ScatteredIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="14" r="3.5" />
      <path d="M12 29v-4a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v4" />
      <circle cx="9" cy="10" r="1.5" strokeWidth="1.3" />
      <circle cx="27" cy="10" r="1.5" strokeWidth="1.3" />
      <circle cx="9" cy="22" r="1.5" strokeWidth="1.3" />
      <circle cx="27" cy="22" r="1.5" strokeWidth="1.3" />
    </svg>
  );
}
function MeditatingZenIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="20" cy="11" r="3.2" />
      <path d="M20 15v8" />
      <path d="M14 18c-3 1.5-4 4.5-3 7 1 2.5 3.5 2 4.5 0l2.5-4" />
      <path d="M26 18c3 1.5 4 4.5 3 7-1 2.5-3.5 2-4.5 0l-2.5-4" />
      <path d="M11 29c2-2 5.5-3 9-3s7 1 9 3" />
    </svg>
  );
}
function BotanicalBranchSvg() {
  return (
    <svg width="48" height="68" viewBox="0 0 50 70" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M25 66C24 48 30 30 38 6" stroke="#8E9B82" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M25 54C16 52 14 44 20 42C25 40 26 48 25 54Z" fill="#9BAA8E" opacity="0.8" />
      <path d="M26 50C34 47 38 41 33 37C28 34 26 44 26 50Z" fill="#A8B79B" opacity="0.85" />
      <path d="M28 38C20 35 19 28 24 26C29 25 29 32 28 38Z" fill="#9BAA8E" opacity="0.8" />
      <path d="M30 34C38 31 40 24 35 22C30 20 29 28 30 34Z" fill="#A8B79B" opacity="0.85" />
      <path d="M33 22C27 18 28 12 32 11C36 11 35 17 33 22Z" fill="#9BAA8E" opacity="0.8" />
      <path d="M38 6C36 2 40 1 41 3C42 5 40 6 38 6Z" fill="#88987B" />
    </svg>
  );
}

// -- MOOD DATA --------------------------------------------------------------

type FeelingItem = { id: string; name: string; icon: () => React.ReactNode };
type MoodConfig = { name: MoodType; feelings: FeelingItem[]; defaultTransformedMood: string; defaultActionTitle: string; defaultActionDescription: string };

const MOOD_DATA: Record<MoodType, MoodConfig> = {
  Sad: {
    name: "Sad",
    feelings: [
      { id: "lonely", name: "Lonely", icon: MoonStarsLonelyIcon },
      { id: "rejected", name: "Rejected", icon: RejectedIcon },
      { id: "hurt", name: "Hurt", icon: BrokenHeartIcon },
      { id: "ashamed", name: "Ashamed", icon: AshamedIcon },
      { id: "guilty", name: "Guilty", icon: GuiltyIcon },
      { id: "empty", name: "Empty", icon: EmptyIcon },
      { id: "overwhelmed", name: "Overwhelmed", icon: OverwhelmedIcon },
      { id: "abandoned", name: "Abandoned", icon: AbandonedIcon },
    ],
    defaultTransformedMood: "Peaceful",
    defaultActionTitle: "60-sec action to get to a peaceful mood",
    defaultActionDescription: "Breathe in for 4, breathe out for 6. Repeat 6 times while relaxing your jaw and shoulders.",
  },
  Fearful: {
    name: "Fearful",
    feelings: [
      { id: "anxious", name: "Anxious", icon: AnxiousIcon },
      { id: "panicked", name: "Panicked", icon: OverwhelmedIcon },
      { id: "insecure", name: "Insecure", icon: AshamedIcon },
      { id: "helpless", name: "Helpless", icon: MoonStarsLonelyIcon },
      { id: "vulnerable", name: "Vulnerable", icon: BrokenHeartIcon },
      { id: "terrified", name: "Terrified", icon: TerrifiedIcon },
      { id: "unsafe", name: "Unsafe", icon: RejectedIcon },
      { id: "uneasy", name: "Uneasy", icon: EmptyIcon },
    ],
    defaultTransformedMood: "Safe & Grounded",
    defaultActionTitle: "60-sec 5-4-3-2-1 Grounding Reset",
    defaultActionDescription: "Name 5 things you see, 4 you feel, 3 you hear, 2 you smell, and take 1 deep belly breath.",
  },
  Angry: {
    name: "Angry",
    feelings: [
      { id: "frustrated", name: "Frustrated", icon: FrustratedIcon },
      { id: "resentful", name: "Resentful", icon: BrokenHeartIcon },
      { id: "furious", name: "Furious", icon: FuriousIcon },
      { id: "irritated", name: "Irritated", icon: IrritatedIcon },
      { id: "betrayed", name: "Betrayed", icon: AbandonedIcon },
      { id: "bitter", name: "Bitter", icon: BitterIcon },
      { id: "enraged", name: "Enraged", icon: GuiltyIcon },
      { id: "hostile", name: "Hostile", icon: OverwhelmedIcon },
    ],
    defaultTransformedMood: "Calm & Centered",
    defaultActionTitle: "60-sec Tension Release Exhale",
    defaultActionDescription: "Unclench your jaw, drop your shoulders away from ears, and release fists with a long deep exhale.",
  },
  Disgusted: {
    name: "Disgusted",
    feelings: [
      { id: "repulsed", name: "Repulsed", icon: RepulsedIcon },
      { id: "judgmental", name: "Judgmental", icon: CriticalIcon },
      { id: "disappointed", name: "Disappointed", icon: DisappointedIcon },
      { id: "averse", name: "Averse", icon: EmptyIcon },
      { id: "uncomfortable", name: "Uncomfortable", icon: UncomfortableIcon },
      { id: "critical", name: "Critical", icon: IrritatedIcon },
      { id: "annoyed", name: "Annoyed", icon: FrustratedIcon },
      { id: "appalled", name: "Appalled", icon: MoonStarsLonelyIcon },
    ],
    defaultTransformedMood: "Refreshed & Clear",
    defaultActionTitle: "60-sec Sensory Reset",
    defaultActionDescription: "Sip cold water slowly, stretch your neck side to side, and focus on one comforting thought.",
  },
  Bad: {
    name: "Bad",
    feelings: [
      { id: "pressured", name: "Pressured", icon: PressuredIcon },
      { id: "exhausted", name: "Exhausted", icon: ExhaustedIcon },
      { id: "burned_out", name: "Burned Out", icon: BurnedOutIcon },
      { id: "frantic", name: "Frantic", icon: FranticIcon },
      { id: "overwhelmed", name: "Overwhelmed", icon: OverwhelmedIcon },
      { id: "scattered", name: "Scattered", icon: ScatteredIcon },
      { id: "tense", name: "Tense", icon: AshamedIcon },
      { id: "drained", name: "Drained", icon: EmptyIcon },
    ],
    defaultTransformedMood: "Serene & Restored",
    defaultActionTitle: "60-sec Box Breathing Flow",
    defaultActionDescription: "Inhale 4s, hold 4s, exhale 4s, hold 4s. Feel the weight lift off your chest.",
  },
};

const MOOD_LIST: MoodType[] = ["Sad", "Fearful", "Angry", "Disgusted", "Bad"];

// -- COMPONENT --------------------------------------------------------------

export default function HeroSectionExact() {
  const [selectedMood, setSelectedMood] = useState<MoodType>("Sad");
  const [selectedFeeling, setSelectedFeeling] = useState<string>("Lonely");
  const [timerSeconds, setTimerSeconds] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [aiData, setAiData] = useState<{ reframingQuote?: string; actionTitle?: string; actionSteps?: string[] } | null>(null);
  const [aiLoading, setAiLoading] = useState(false);

  const currentConfig = MOOD_DATA[selectedMood] || MOOD_DATA.Sad;

  useEffect(() => {
    if (!isTimerRunning || timerSeconds <= 0) return;
    const interval = setInterval(() => setTimerSeconds((p) => p - 1), 1000);
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  useEffect(() => {
    if (timerSeconds === 0) setIsTimerRunning(false);
  }, [timerSeconds]);

  const handleMoodSelect = (mood: MoodType) => {
    setSelectedMood(mood);
    setAiData(null);
    const config = MOOD_DATA[mood];
    if (config?.feelings.length > 0) setSelectedFeeling(config.feelings[0].name);
  };

  const handleClearSelection = () => {
    setSelectedMood("Sad");
    setSelectedFeeling("Lonely");
    setTimerSeconds(60);
    setIsTimerRunning(false);
    setAiData(null);
  };

  const handleFlip = async () => {
    setIsFlipping(true);
    setTimerSeconds(60);
    setIsTimerRunning(false);
    setAiLoading(true);
    try {
      const res = await fetch("/api/ai/flip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mood: selectedMood, feeling: selectedFeeling }),
      });
      const data = await res.json();
      if (data.success && data.aiData) setAiData(data.aiData);
    } catch { /* silently handle */ }
    finally { setAiLoading(false); }
    setTimeout(() => setIsFlipping(false), 600);
  };

  const displayedTransformedMood = currentConfig.defaultTransformedMood;
  const displayedActionTitle = aiData?.actionTitle || currentConfig.defaultActionTitle;
  const displayedActionDesc = aiData?.actionSteps && aiData.actionSteps.length > 0
    ? aiData.actionSteps.join(" ")
    : currentConfig.defaultActionDescription;

  return (
    <section className={styles.heroContainer} id="hero-section">
      <div className={styles.topHeader}>
        <div className={styles.logoTitle} aria-label="MoodFlip">
          <span className={styles.logoMood}>Mood</span>
          <span className={styles.logoFlipWrapper}>
            <span>Fl</span>
            <span style={{ position: "relative", display: "inline-block" }}>
              <span className={styles.heartDot}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#E2786B" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </span>
              <span>i</span>
            </span>
            <span>p</span>
          </span>
        </div>
      </div>

      <div className={styles.splitGrid}>
        <div className={styles.verticalDivider} />

        {/* LEFT */}
        <div className={styles.leftColumn}>
          <div className={styles.moodRow}>
            <div className={styles.arrowBadge}>
              <span className={styles.badgeIconCircle}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
                </svg>
              </span>
              <div className={styles.badgeText}>
                <span>Choose your</span>
                <span>current mood</span>
              </div>
            </div>
            <div className={styles.cloudList} role="group" aria-label="Choose current mood">
              {MOOD_LIST.map((mood) => (
                <button key={mood} type="button"
                  className={`${styles.cloudBtn} ${selectedMood === mood ? styles.cloudBtnSelected : ""}`}
                  onClick={() => handleMoodSelect(mood)} aria-pressed={selectedMood === mood}>
                  {mood}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.feelingRow}>
            <div className={styles.arrowBadge}>
              <span className={styles.badgeIconCircle}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </span>
              <div className={styles.badgeText}>
                <span>Pick the feeling</span>
                <span>closest to how</span>
                <span>you feel</span>
              </div>
            </div>
            <div className={styles.feelingGrid} role="radiogroup" aria-label="Pick exact feeling">
              {currentConfig.feelings.map((feeling) => {
                const IconComp = feeling.icon;
                return (
                  <button key={feeling.id} type="button"
                    className={`${styles.feelingCard} ${selectedFeeling === feeling.name ? styles.feelingCardSelected : ""}`}
                    onClick={() => setSelectedFeeling(feeling.name)}
                    aria-checked={selectedFeeling === feeling.name} role="radio">
                    <span className={styles.feelingIconWrapper}><IconComp /></span>
                    <span className={styles.feelingLabel}>{feeling.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className={styles.leftBottomActions}>
            <button type="button" className={styles.clearBtn} onClick={handleClearSelection} aria-label="Clear selection and start over">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.clearIcon}>
                <path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                <line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" />
              </svg>
              <span className={styles.clearTitle}>Clear selection</span>
              <span className={styles.clearSubtitle}>Start over</span>
            </button>
          </div>
        </div>

        {/* CENTER CTA */}
        <div className={styles.centerCtaWrapper}>
          <button type="button" className={styles.changeMoodBtn} onClick={handleFlip} disabled={aiLoading}
            style={{ opacity: aiLoading ? 0.75 : 1, transform: isFlipping ? "scale(1.1) translateX(6px)" : undefined }}>
            <span className={styles.changeMoodText}>{aiLoading ? "Thinking..." : "Change\nMy Mood"}</span>
            <span className={styles.changeMoodArrow}>{"\u2192"}</span>
          </button>
        </div>

        {/* RIGHT */}
        <div className={styles.rightColumn} style={{ transform: isFlipping ? "scale(1.01)" : "scale(1)", transition: "all 0.4s ease" }}>
          <div className={styles.landscapeBg} aria-hidden="true">
            <svg width="34" height="20" viewBox="0 0 34 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" className={styles.flyingBirds}>
              <path d="M2 10c3-4 6-4 9 0 3-4 6-4 9 0" /><path d="M18 5c2-3 4-3 6 0 2-3 4-3 6 0" />
            </svg>
            <div className={styles.sunDomeWrapper}>
              <div className={styles.sunDome} />
              <svg className={styles.sunRays} viewBox="0 0 440 240" fill="none" stroke="#ECCB82" strokeWidth="1.4" strokeLinecap="round" strokeDasharray="3 3">
                <line x1="220" y1="20" x2="220" y2="60" /><line x1="170" y1="30" x2="185" y2="68" />
                <line x1="270" y1="30" x2="255" y2="68" /><line x1="120" y1="55" x2="150" y2="85" />
                <line x1="320" y1="55" x2="290" y2="85" /><line x1="80" y1="95" x2="120" y2="115" />
                <line x1="360" y1="95" x2="320" y2="115" /><line x1="50" y1="150" x2="95" y2="150" />
                <line x1="390" y1="150" x2="345" y2="150" />
              </svg>
            </div>
            <div className={styles.hillsBack} />
            <div className={styles.hillsFront} />
          </div>

          <div className={styles.outcomeHeader}>
            <span className={styles.outcomeHeartIcon}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </span>
            <div className={styles.outcomeSubtitle}>Your mood has changed to:</div>
            <h2 className={styles.outcomeMoodTitle}>{displayedTransformedMood}</h2>
          </div>

          <div className={styles.actionCard}>
            <div className={styles.actionIconBadge} aria-hidden="true"><MeditatingZenIcon /></div>
            <div className={styles.actionContent}>
              <h3 className={styles.actionHeading}>{displayedActionTitle}</h3>
              <div className={styles.actionDivider}>
                <span className={styles.actionDividerLine} />
                <span className={styles.actionDividerHeart}>{"\u2661"}</span>
                <span className={styles.actionDividerLine} />
              </div>
              <p className={styles.actionDescription}>{displayedActionDesc}</p>
              <div className={styles.actionTimerRow}>
                <button type="button" className={styles.actionTimerBtn}
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  aria-label={isTimerRunning ? "Pause timer" : "Start 60-second breathing timer"}>
                  <span>{isTimerRunning ? "\u23F8 Pause" : "\u25B6 Start 60s Breath"}</span>
                  <span>({timerSeconds}s)</span>
                </button>
                {timerSeconds < 60 && (
                  <button type="button"
                    style={{ background: "none", border: "none", color: "#8B7B9E", fontSize: "11px", cursor: "pointer", textDecoration: "underline", fontWeight: 600 }}
                    onClick={() => { setTimerSeconds(60); setIsTimerRunning(false); }}>
                    Reset
                  </button>
                )}
              </div>
            </div>
            <div className={styles.leafDecoration} aria-hidden="true"><BotanicalBranchSvg /></div>
          </div>
        </div>
      </div>

      <div className={styles.bottomBanner}>
        <div className={styles.bannerItem}>
          <span className={styles.bannerIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </span>
          <div className={styles.bannerText}>
            <span className={styles.bannerTitle}>Small shifts can change how you feel.</span>
            <span className={styles.bannerSubtitle}>You&apos;ve got this.</span>
          </div>
        </div>
        <div className={styles.bannerItem}>
          <span className={styles.bannerIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 20A7 7 0 0 1 4 13C4 7 11 3 20 3c0 9-4 16-10 17Z" /><path d="M4 13c7 0 12-4 16-10" />
            </svg>
          </span>
          <div className={styles.bannerText}>
            <span className={styles.bannerTitle}>Be kind to yourself.</span>
            <span className={styles.bannerSubtitle}>One choice at a time.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
