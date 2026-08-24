"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./HeroSectionExact.module.css";
import { COUNSELOR_MOODS, CounselorPromptItem } from "@/data/moods";

export type MainMoodFamily = "Sad" | "Fearful" | "Angry" | "Disgusted" | "Bad";

export interface ThirdLayerFeeling {
  id: string;
  name: string;
  targetMood: string;
  actionTitle: string;
  actionDesc: string;
  icon: (props: { className?: string }) => React.ReactNode;
  chips: string[];
}

export interface MoodFamilyConfig {
  name: MainMoodFamily;
  label: string;
  feelings: ThirdLayerFeeling[];
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. EXACT CLOUD ILLUSTRATIONS (USING USER SLICED PNG ASSETS)
// ─────────────────────────────────────────────────────────────────────────────

function SadCloudSvg({ className }: { className?: string }) {
  return (
    <img
      src="/moods/clouds/cloud-sad.png"
      alt="Sad Cloud"
      className={className}
      style={{ width: "100%", maxWidth: "175px", height: "auto", objectFit: "contain" }}
    />
  );
}

function FearfulCloudSvg({ className }: { className?: string }) {
  return (
    <img
      src="/moods/clouds/cloud-fearful.png"
      alt="Fearful Cloud"
      className={className}
      style={{ width: "100%", maxWidth: "175px", height: "auto", objectFit: "contain" }}
    />
  );
}

function AngryCloudSvg({ className }: { className?: string }) {
  return (
    <img
      src="/moods/clouds/cloud-angry.png"
      alt="Angry Cloud"
      className={className}
      style={{ width: "100%", maxWidth: "175px", height: "auto", objectFit: "contain" }}
    />
  );
}

function DisgustedCloudSvg({ className }: { className?: string }) {
  return (
    <img
      src="/moods/clouds/cloud-disgusted.png"
      alt="Disgusted Cloud"
      className={className}
      style={{ width: "100%", maxWidth: "175px", height: "auto", objectFit: "contain" }}
    />
  );
}

function StressedCloudSvg({ className }: { className?: string }) {
  return (
    <img
      src="/moods/clouds/cloud-stressed.png"
      alt="Stressed Cloud"
      className={className}
      style={{ width: "100%", maxWidth: "180px", height: "auto", objectFit: "contain" }}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. 8 FEELING CARD ICONS (USING USER SLICED PNG ASSETS)
// ─────────────────────────────────────────────────────────────────────────────

function LonelyHuddledIcon({ className }: { className?: string }) {
  return (
    <img
      src="/moods/feelings/icon-lonely.png"
      alt="Lonely"
      className={className}
      style={{ width: "34px", height: "34px", objectFit: "contain" }}
    />
  );
}

function RejectedSadFaceIcon({ className }: { className?: string }) {
  return (
    <img
      src="/moods/feelings/icon-rejected.png"
      alt="Rejected"
      className={className}
      style={{ width: "34px", height: "34px", objectFit: "contain" }}
    />
  );
}

function BrokenHeartIcon({ className }: { className?: string }) {
  return (
    <img
      src="/moods/feelings/icon-hurt.png"
      alt="Hurt"
      className={className}
      style={{ width: "34px", height: "34px", objectFit: "contain" }}
    />
  );
}

function AshamedHeadBowedIcon({ className }: { className?: string }) {
  return (
    <img
      src="/moods/feelings/icon-ashamed.png"
      alt="Ashamed"
      className={className}
      style={{ width: "34px", height: "34px", objectFit: "contain" }}
    />
  );
}

function RainCloudGuiltyIcon({ className }: { className?: string }) {
  return (
    <img
      src="/moods/feelings/icon-guilty.png"
      alt="Guilty"
      className={className}
      style={{ width: "34px", height: "34px", objectFit: "contain" }}
    />
  );
}

function EmptySilhouetteIcon({ className }: { className?: string }) {
  return (
    <img
      src="/moods/feelings/icon-empty.png"
      alt="Empty"
      className={className}
      style={{ width: "34px", height: "34px", objectFit: "contain" }}
    />
  );
}

function SpiralOverwhelmedIcon({ className }: { className?: string }) {
  return (
    <img
      src="/moods/feelings/icon-overwhelmed.png"
      alt="Overwhelmed"
      className={className}
      style={{ width: "34px", height: "34px", objectFit: "contain" }}
    />
  );
}

function AbandonedAuraIcon({ className }: { className?: string }) {
  return (
    <img
      src="/moods/feelings/icon-abandoned.png"
      alt="Abandoned"
      className={className}
      style={{ width: "34px", height: "34px", objectFit: "contain" }}
    />
  );
}

// Meditating Zen Lotus Mascot Badge (Exact Clone from Reference Screenshot)
function MeditatingZenIcon({ className }: { className?: string }) {
  return (
    <svg width="76" height="76" viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Soft cream-sage circular badge background */}
      <circle cx="38" cy="38" r="36" fill="#EAE9E1" />
      
      {/* Ambient background particles */}
      <circle cx="20" cy="24" r="1.2" fill="#B0AFA6" />
      <circle cx="56" cy="23" r="1.2" fill="#B0AFA6" />
      <circle cx="54" cy="54" r="1.2" fill="#B0AFA6" />
      
      {/* Zen Meditating Figure */}
      {/* Head */}
      <circle cx="38" cy="20" r="5.5" stroke="#161C52" strokeWidth="2.2" fill="none" />
      
      {/* Torso & Neck */}
      <path d="M34 28.5c-2.5 3-4 6.5-4 11.5h16c0-5-1.5-8.5-4-11.5" stroke="#161C52" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      
      {/* Chest subtle accents */}
      <circle cx="36" cy="34" r="0.8" fill="#161C52" />
      <circle cx="40" cy="34" r="0.8" fill="#161C52" />
      
      {/* Arms resting on knees with open palms */}
      <path d="M30 33L23 40.5l4 5.5h3" stroke="#161C52" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M46 33L53 40.5l-4 5.5h-3" stroke="#161C52" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      
      {/* Cross-legged Lotus Base */}
      <path d="M26 46c-4 2-5 5.5-1.5 8 3.5 2.5 17 2.5 27 0 3.5-2.5 2.5-6-1.5-8" stroke="#161C52" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M29 51c5.5 2 12.5 2 18 0" stroke="#161C52" strokeWidth="2" strokeLinecap="round" fill="none" />
      
      {/* Left Leaf sprig (Green watercolor leaves) */}
      <path d="M19 40c-1-3.5-4.5-4.5-4.5-4.5s0 4.5 2.5 6.5c1.2 1 2 1 2 1" fill="#7E9A70" stroke="#5E7852" strokeWidth="0.8" />
      <path d="M18 43.5c-2.5 1-4.5-.5-4.5-.5s1 3.5 3.5 4c1.2.2 2-.5 2-.5" fill="#7E9A70" stroke="#5E7852" strokeWidth="0.8" />
      
      {/* Right Leaf sprig (Green watercolor leaves) */}
      <path d="M57 40c1-3.5 4.5-4.5 4.5-4.5s0 4.5-2.5 6.5c-1.2 1-2 1-2 1" fill="#7E9A70" stroke="#5E7852" strokeWidth="0.8" />
      <path d="M58 43.5c2.5 1 4.5-.5 4.5-.5s-1 3.5-3.5 4c-1.2.2-2-.5-2-.5" fill="#7E9A70" stroke="#5E7852" strokeWidth="0.8" />
    </svg>
  );
}

// Eucalyptus / Olive Branch Decorative SVG (Realistic watercolor leafy stem on the right of the card)
function BotanicalBranchSvg({ className }: { className?: string }) {
  return (
    <svg width="48" height="74" viewBox="0 0 48 74" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Stem */}
      <path d="M18 72C22 55 25 35 34 4" stroke="#687C5E" strokeWidth="1.8" strokeLinecap="round" />
      {/* Bottom Left Leaf */}
      <path d="M20 58C12 56 10 47 18 45C22 44 22 52 20 58Z" fill="#93A686" stroke="#5F7350" strokeWidth="0.8" />
      {/* Bottom Right Leaf */}
      <path d="M22 53C31 50 35 43 28 39C23 36 21 47 22 53Z" fill="#A4B797" stroke="#5F7350" strokeWidth="0.8" />
      {/* Mid Left Leaf */}
      <path d="M24 40C15 37 14 29 20 27C25 25 26 33 24 40Z" fill="#889C7B" stroke="#5F7350" strokeWidth="0.8" />
      {/* Mid Right Leaf */}
      <path d="M27 35C35 31 37 23 31 21C26 19 25 28 27 35Z" fill="#9EAF90" stroke="#5F7350" strokeWidth="0.8" />
      {/* Top Left Leaf */}
      <path d="M30 23C23 19 24 13 28 12C32 11 32 18 30 23Z" fill="#889C7B" stroke="#5F7350" strokeWidth="0.8" />
      {/* Top Right Leaf */}
      <path d="M32 18C38 14 39 8 35 7C31 6 31 13 32 18Z" fill="#A4B797" stroke="#5F7350" strokeWidth="0.8" />
      {/* Apex Tip Leaf */}
      <path d="M34 4C32 1 36 0 37 2C38 4 36 5 34 4Z" fill="#718663" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. MOOD CONFIGS & FEELINGS HIERARCHY
// ─────────────────────────────────────────────────────────────────────────────

export const MOOD_HIERARCHY: Record<MainMoodFamily, MoodFamilyConfig> = {
  Sad: {
    name: "Sad",
    label: "Sad",
    feelings: [
      { id: "lonely", name: "Lonely", targetMood: "Peaceful", actionTitle: "60-sec action to get to a peaceful mood", actionDesc: "Breathe in for 4, breathe out for 6. Repeat 6 times while relaxing your jaw and shoulders.", icon: LonelyHuddledIcon, chips: ["Isolated", "Left out", "Unseen", "Disconnected"] },
      { id: "rejected", name: "Rejected", targetMood: "Accepted & Valued", actionTitle: "60-sec Self-Validation Grounding", actionDesc: "Place both feet flat, inhale worthiness, and say: 'My value is intrinsic and unchanged.'", icon: RejectedSadFaceIcon, chips: ["Excluded", "Inadequate", "Unwanted", "Discarded"] },
      { id: "hurt", name: "Hurt", targetMood: "Healing & Gentle", actionTitle: "60-sec Heart-Healing Breath", actionDesc: "Gently place your hand over your heart. Breathe softly into the tenderness for 60 seconds.", icon: BrokenHeartIcon, chips: ["Crushed", "Heartbroken", "Damaged", "Stung"] },
      { id: "ashamed", name: "Ashamed", targetMood: "Self-Forgiving", actionTitle: "60-sec Compassionate Self-Talk", actionDesc: "Remind yourself: 'I am a human learning and growing. I deserve gentleness today.'", icon: AshamedHeadBowedIcon, chips: ["Guilty", "Disgraced", "Exposed", "Flawed"] },
      { id: "guilty", name: "Guilty", targetMood: "Light & Clear", actionTitle: "60-sec Forgiveness Release", actionDesc: "Inhale compassion, exhale guilt. State one positive intention for moving forward.", icon: RainCloudGuiltyIcon, chips: ["Regretful", "Blameworthy", "Remorseful", "Burdened"] },
      { id: "empty", name: "Empty", targetMood: "Nourished & Present", actionTitle: "60-sec Mindful Sensory Reset", actionDesc: "Notice 3 physical sensations around you right now: feet on floor, air on skin, ambient sound.", icon: EmptySilhouetteIcon, chips: ["Numb", "Hollow", "Drained", "Vague"] },
      { id: "overwhelmed", name: "Overwhelmed", targetMood: "Calm & Ordered", actionTitle: "60-sec Box Breathing 4-4-4-4", actionDesc: "Inhale for 4s, hold for 4s, exhale for 4s, hold for 4s. Feel the inner noise settle.", icon: SpiralOverwhelmedIcon, chips: ["Swamped", "Drowning", "Paralyzed", "Scattered"] },
      { id: "abandoned", name: "Abandoned", targetMood: "Anchored & Whole", actionTitle: "60-sec Hand-on-Heart Connection", actionDesc: "Wrap your arms in a self-hug. Whisper: 'I am here for myself right now in this moment.'", icon: AbandonedAuraIcon, chips: ["Forsaken", "Stranded", "Forgotten", "Deserted"] },
    ],
  },
  Fearful: {
    name: "Fearful",
    label: "Fearful",
    feelings: [
      { id: "scared", name: "Scared", targetMood: "Safe & Grounded", actionTitle: "60-sec 5-4-3-2-1 Sensory Grounding", actionDesc: "Name 5 things you can see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste.", icon: LonelyHuddledIcon, chips: ["Terrified", "Alarmed", "Frightened", "Panicked"] },
      { id: "anxious", name: "Anxious", targetMood: "Centred & Calm", actionTitle: "60-sec Physiological Sigh", actionDesc: "Take two quick deep inhales through your nose, then one long slow exhale through your mouth.", icon: RejectedSadFaceIcon, chips: ["Worried", "Uneasy", "On Edge", "Jittery"] },
      { id: "insecure", name: "Insecure", targetMood: "Confident & Rooted", actionTitle: "60-sec Posture Power Shift", actionDesc: "Roll shoulders back, lift chest, take three expansive deep breaths of self-assurance.", icon: BrokenHeartIcon, chips: ["Doubtful", "Inadequate", "Vulnerable", "Unsure"] },
      { id: "weak", name: "Weak", targetMood: "Capable & Resilient", actionTitle: "60-sec Strength Recall", actionDesc: "Recall one hard thing you successfully overcame in the past. You are stronger than this moment.", icon: AshamedHeadBowedIcon, chips: ["Fragile", "Helpless", "Powerless", "Defenseless"] },
      { id: "threatened", name: "Threatened", targetMood: "Protected & Secure", actionTitle: "60-sec Boundary Visualization", actionDesc: "Visualize a warm, golden shield of calm safety surrounding your entire body.", icon: RainCloudGuiltyIcon, chips: ["Defensive", "Exposed", "Vulnerable", "Under Attack"] },
      { id: "nervous", name: "Nervous", targetMood: "Steady & Composed", actionTitle: "60-sec Slow Belly Breathing", actionDesc: "Place hand on stomach. Count 4 on the inhale, 6 on the exhale, relaxing tense muscles.", icon: EmptySilhouetteIcon, chips: ["Apprehensive", "Tense", "Restless", "Flustered"] },
      { id: "exposed", name: "Exposed", targetMood: "Shielded & Whole", actionTitle: "60-sec Safe Haven Affirmation", actionDesc: "Acknowledge your vulnerability as courage. Breathe into your quiet center.", icon: SpiralOverwhelmedIcon, chips: ["Unprotected", "Naked", "Visible", "Judged"] },
      { id: "persecuted", name: "Persecuted", targetMood: "Clear & Free", actionTitle: "60-sec Release Exhale", actionDesc: "Exhale the weight of external expectations. Inhale your personal truth and peace.", icon: AbandonedAuraIcon, chips: ["Targeted", "Victimized", "Blamed", "Hounded"] },
    ],
  },
  Angry: {
    name: "Angry",
    label: "Angry",
    feelings: [
      { id: "let_down", name: "Let Down", targetMood: "Self-Sufficient & Free", actionTitle: "60-sec Expectation Release", actionDesc: "Inhale patience, exhale resentment. Focus only on what is within your personal control.", icon: LonelyHuddledIcon, chips: ["Betrayed", "Disappointed", "Deceived", "Disillusioned"] },
      { id: "humiliated", name: "Humiliated", targetMood: "Dignified & Proud", actionTitle: "60-sec Inner Royalty Reset", actionDesc: "Stand tall. Your worth is never decided by external judgment or transient moments.", icon: RejectedSadFaceIcon, chips: ["Embarrassed", "Shamed", "Ridiculed", "Scorned"] },
      { id: "bitter", name: "Bitter", targetMood: "Peaceful & Light", actionTitle: "60-sec Forgiveness Breath", actionDesc: "Bitterness hurts only you. Breathe out the poison, breathe in spacious freedom.", icon: BrokenHeartIcon, chips: ["Resentful", "Indignant", "Spiteful", "Grudging"] },
      { id: "mad", name: "Mad", targetMood: "Cooled & Clear", actionTitle: "60-sec Ice-Water Palm Reset", actionDesc: "Clench your fists tight for 5 seconds, then release completely with a long cooling breath.", icon: AshamedHeadBowedIcon, chips: ["Furious", "Enraged", "Livid", "Boiling"] },
      { id: "aggressive", name: "Aggressive", targetMood: "Channelled & Calm", actionTitle: "60-sec Energy Re-direction", actionDesc: "Step away. Shake out your hands and arms vigorously to discharge excess cortisol.", icon: RainCloudGuiltyIcon, chips: ["Hostile", "Confrontational", "Fierce", "Combative"] },
      { id: "frustrated", name: "Frustrated", targetMood: "Patient & Focused", actionTitle: "60-sec Step-Back Pause", actionDesc: "Pause the task. Take 3 deep belly breaths and reframe: 'One single step at a time.'", icon: EmptySilhouetteIcon, chips: ["Stuck", "Impatient", "Exasperated", "Thwarted"] },
      { id: "distant", name: "Distant", targetMood: "Reconnected", actionTitle: "60-sec Warm Touch Check-in", actionDesc: "Rub palms together until warm, place over your eyes, and take a deep restoring breath.", icon: SpiralOverwhelmedIcon, chips: ["Withdrawn", "Detached", "Aloof", "Cold"] },
      { id: "critical", name: "Critical", targetMood: "Appreciative & Kind", actionTitle: "60-sec 3-Gratitudes Shift", actionDesc: "Name 3 small things that went right today or 3 qualities you appreciate about yourself.", icon: AbandonedAuraIcon, chips: ["Skeptical", "Dismissive", "Judgmental", "Hypercritical"] },
    ],
  },
  Disgusted: {
    name: "Disgusted",
    label: "Disgusted",
    feelings: [
      { id: "disapproving", name: "Disapproving", targetMood: "Open & Neutral", actionTitle: "60-sec Perspective Expansion", actionDesc: "Inhale non-judgment. Allow others their journey while keeping your inner peace intact.", icon: LonelyHuddledIcon, chips: ["Critical", "Unimpressed", "Dismissive", "Fault-finding"] },
      { id: "disappointed", name: "Disappointed", targetMood: "Hopeful & Realigned", actionTitle: "60-sec New Opportunity Focus", actionDesc: "Acknowledge the sadness of unmet hopes, then find one fresh doorway opening ahead.", icon: RejectedSadFaceIcon, chips: ["Deflated", "Disheartened", "Let Down", "Unfulfilled"] },
      { id: "awful", name: "Awful", targetMood: "Restored & Renewed", actionTitle: "60-sec Fresh Air Inhale", actionDesc: "Step outside or open a window. Take 5 deep breaths of crisp fresh air into your lungs.", icon: BrokenHeartIcon, chips: ["Nauseated", "Revolted", "Horrified", "Shattered"] },
      { id: "repelled", name: "Repelled", targetMood: "Clean & Anchored", actionTitle: "60-sec Boundary Affirmation", actionDesc: "Visualize clear boundaries. You choose what energy to allow into your personal space.", icon: AshamedHeadBowedIcon, chips: ["Averse", "Sickened", "Disgusted", "Offended"] },
      { id: "judgmental", name: "Judgmental", targetMood: "Compassionate", actionTitle: "60-sec Soft Eyes Practice", actionDesc: "Soften the tension around your eyes and temples. Choose understanding over judgment.", icon: RainCloudGuiltyIcon, chips: ["Opinionated", "Condescending", "Self-Righteous", "Smug"] },
      { id: "embarrassed", name: "Embarrassed", targetMood: "Self-Accepting", actionTitle: "60-sec Universal Human Shared Moment", actionDesc: "Smile gently. Every person on earth makes mistakes. You are completely okay.", icon: EmptySilhouetteIcon, chips: ["Flustered", "Awkward", "Self-Conscious", "Chagrined"] },
      { id: "appalled", name: "Appalled", targetMood: "Serene & Grounded", actionTitle: "60-sec Inner Mountain Stance", actionDesc: "Stand like an unmovable mountain. External storms come and go, but the mountain remains.", icon: SpiralOverwhelmedIcon, chips: ["Shocked", "Outraged", "Scandalized", "Dismayed"] },
      { id: "revolted", name: "Revolted", targetMood: "Purified & Clear", actionTitle: "60-sec Cleansing Exhale", actionDesc: "Take a deep breath and exhale with an audible 'haaaa' sound to release negative physical tension.", icon: AbandonedAuraIcon, chips: ["Grossed Out", "Repulsed", "Nauseous", "Sick"] },
    ],
  },
  Bad: {
    name: "Bad",
    label: "Bad",
    feelings: [
      { id: "tired", name: "Tired", targetMood: "Energized & Rested", actionTitle: "60-sec Energy Palm Warmth", actionDesc: "Gently close your eyes, take 4 slow breaths, and give yourself permission to rest guilt-free.", icon: LonelyHuddledIcon, chips: ["Exhausted", "Depleted", "Fatigued", "Weary"] },
      { id: "stressed", name: "Stressed", targetMood: "Decompressed", actionTitle: "60-sec Progressive Muscle Release", actionDesc: "Shrug shoulders to ears, hold 5s, drop them completely with a deep exhale.", icon: RejectedSadFaceIcon, chips: ["Overloaded", "Pressured", "Strained", "Frazzled"] },
      { id: "busy", name: "Busy", targetMood: "Present & Simple", actionTitle: "60-sec Monotask Pause", actionDesc: "Stop multitasking right now. Focus 100% of your attention on the single breath in front of you.", icon: BrokenHeartIcon, chips: ["Rushed", "Hectic", "Distracted", "Frantic"] },
      { id: "bored", name: "Bored", targetMood: "Curious & Alive", actionTitle: "60-sec Curiosity Ignition", actionDesc: "Look around and notice 1 detail in your environment you have never paid attention to before.", icon: AshamedHeadBowedIcon, chips: ["Apathetic", "Unstimulated", "Restless", "Listless"] },
      { id: "unfocused", name: "Unfocused", targetMood: "Laser-Sharp & Centred", actionTitle: "60-sec One-Point Gaze Focus", actionDesc: "Pick one stationary point across the room. Breathe evenly while keeping soft steady gaze on it.", icon: RainCloudGuiltyIcon, chips: ["Scattered", "Brain Fog", "Dazed", "Daydreaming"] },
      { id: "overwhelmed_stress", name: "Overwhelmed", targetMood: "Peaceful", actionTitle: "60-sec action to get to a peaceful mood", actionDesc: "Breathe in for 4, breathe out for 6. Repeat 6 times while relaxing your jaw and shoulders.", icon: EmptySilhouetteIcon, chips: ["Drowning", "Paralyzed", "Swamped", "Buried"] },
      { id: "pressured", name: "Pressured", targetMood: "Free & Unhurried", actionTitle: "60-sec Time Abundance Reset", actionDesc: "Whisper to yourself: 'I have enough time for what truly matters in this exact moment.'", icon: SpiralOverwhelmedIcon, chips: ["Constrained", "Hounded", "Urgent", "Stifled"] },
      { id: "apathetic", name: "Apathetic", targetMood: "Sparked & Engaged", actionTitle: "60-sec Micro-Stretch Awakening", actionDesc: "Reach both arms straight overhead toward the sky. Inhale vitality, exhale stagnation.", icon: AbandonedAuraIcon, chips: ["Indifferent", "Unmotivated", "Detached", "Passive"] },
    ],
  },
};

export const MAIN_MOOD_FAMILIES: MainMoodFamily[] = [
  "Sad",
  "Fearful",
  "Angry",
  "Disgusted",
  "Bad",
];

interface HeroSectionExactProps {
  onFlipTriggered?: (mood: string, feelings: string) => void;
  aiData?: {
    reframingQuote?: string;
    actionTitle?: string;
    actionSteps?: string[];
    scienceInsight?: string;
  } | null;
  aiLoading?: boolean;
}

export default function HeroSectionExact({
  onFlipTriggered,
  aiData,
  aiLoading = false,
}: HeroSectionExactProps) {
  // State
  const [selectedMood, setSelectedMood] = useState<MainMoodFamily>("Sad");
  const [selectedFeelingId, setSelectedFeelingId] = useState<string>("rejected");
  const [selectedChip, setSelectedChip] = useState<string>("Excluded");
  const [isFlipping, setIsFlipping] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [savedMsg, setSavedMsg] = useState("");
  const [hasFlipped, setHasFlipped] = useState(false); // true after first flip — shows Save button prominently
  const [isSaving, setIsSaving] = useState(false); // loading state for save button
  const [counselorMoods, setCounselorMoods] = useState<CounselorPromptItem[]>(COUNSELOR_MOODS);
  const [freeFlipCount, setFreeFlipCount] = useState<number>(0);
  const [actionRotationIndex, setActionRotationIndex] = useState<Record<string, number>>({});
  const [showSecondVisitPopup, setShowSecondVisitPopup] = useState(false);
  const [dailyCheckInCount, setDailyCheckInCount] = useState(0);
  const [progressMsg, setProgressMsg] = useState("");

  // Outcome state that ONLY updates when user clicks "Flip Your Mood" (or on initial load / reset)
  const [flippedOutcome, setFlippedOutcome] = useState<{
    targetMood: string;
    actionTitle: string;
    actionDesc: string;
  }>({
    targetMood: "Accepted & Valued",
    actionTitle: "60-sec Self-Validation Grounding",
    actionDesc: "Place both feet flat, inhale worthiness, and say: 'My value is intrinsic and unchanged.'"
  });

  // Global Ads Setting State (controlled by Admin Panel - disabled globally by default)
  const [adsEnabled, setAdsEnabled] = useState<boolean>(false);
  const [popupSettings, setPopupSettings] = useState({
    enabled: true,
    targetAudience: "unregistered",
    frequencyHours: 12,
    maxDailyLimit: 2,
    showDelaySeconds: 4,
    // Spec §16 Popup #8 — exact wording
    modalTitle: "Save your MoodFlip check-ins?",
    modalDescription: "Create a free profile to save your moods, actions, and progress toward your 7-Day MoodFlip Report.",
    buttonText: "Create Free Profile",
    buttonLink: "/register",
    showMaybeLater: true,
  });
  const [mobileActiveView, setMobileActiveView] = useState<"input" | "outcome">("input");
  const outcomeRef = useRef<HTMLDivElement>(null);

  // Load and subscribe to Admin Ads toggle
  useEffect(() => {
    const checkAds = () => {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem("moodflip_ads_settings");
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            if (typeof parsed.globalEnabled === "boolean") {
              setAdsEnabled(parsed.globalEnabled);
              return;
            }
          } catch (e) {}
        }
        setAdsEnabled(false);
      }
    };

    checkAds();
    window.addEventListener("moodflip_ads_updated", checkAds);
    window.addEventListener("storage", checkAds);
    return () => {
      window.removeEventListener("moodflip_ads_updated", checkAds);
      window.removeEventListener("storage", checkAds);
    };
  }, []);

  // Sync Mood Library from localStorage if updated by Admin
  const syncMoodLibrary = () => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("moodflip_counselor_moods");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setCounselorMoods(parsed);
          }
        } catch (e) {}
      }
    }
  };

  useEffect(() => {
    syncMoodLibrary();
    if (typeof window !== "undefined") {
      const savedCount = parseInt(localStorage.getItem("moodflip_free_flip_count") || "0", 10);
      setFreeFlipCount(savedCount);

      // Load live Admin Popup Settings
      let currentPopupConfig = popupSettings;
      const savedPopupCfg = localStorage.getItem("moodflip_popup_settings");
      if (savedPopupCfg) {
        try {
          currentPopupConfig = { ...popupSettings, ...JSON.parse(savedPopupCfg) };
          setPopupSettings(currentPopupConfig);
        } catch (e) {}
      }

      // ── Admin-Controlled Profile Invitation Popup ──
      // Spec §10: Show popup ONLY on the 2nd site visit and beyond
      if (currentPopupConfig.enabled) {
        const isLoggedIn =
          localStorage.getItem('userLoggedIn') === 'true' ||
          localStorage.getItem('isLoggedIn') === 'true';

        // Check Target Audience (unregistered only vs all)
        const shouldTarget = currentPopupConfig.targetAudience === 'all' || !isLoggedIn;

        if (shouldTarget) {
          // Track site visit count — spec §10: popup only on 2nd+ visit
          const visitCountRaw = localStorage.getItem('moodflip_site_visit_count');
          const visitCount = visitCountRaw ? parseInt(visitCountRaw, 10) : 0;
          const newVisitCount = visitCount + 1;
          localStorage.setItem('moodflip_site_visit_count', String(newVisitCount));

          // Only show popup from the 2nd visit onward
          if (newVisitCount >= 2) {
            const now = Date.now();
            const todayKey = new Date().toISOString().split('T')[0];
            const popupRaw = localStorage.getItem('moodflip_popup_data');
            const popupData: { lastShown?: number; todayDate?: string; todayCount?: number } =
              popupRaw ? JSON.parse(popupRaw) : {};

            const todayCount = popupData.todayDate === todayKey ? (popupData.todayCount || 0) : 0;
            const lastShown  = popupData.lastShown || 0;
            const hoursSinceLast = (now - lastShown) / (1000 * 60 * 60);

            const freqHours = Number(currentPopupConfig.frequencyHours) || 12;
            const maxDaily = Number(currentPopupConfig.maxDailyLimit) || 2;
            const delaySec = Number(currentPopupConfig.showDelaySeconds) || 4;

            // Check if frequency interval and daily limit allow showing
            if (todayCount < maxDaily && (lastShown === 0 || hoursSinceLast >= freqHours)) {
              setTimeout(() => {
                setShowSecondVisitPopup(true);
                localStorage.setItem('moodflip_popup_data', JSON.stringify({
                  lastShown: now,
                  todayDate: todayKey,
                  todayCount: todayCount + 1,
                }));
              }, delaySec * 1000);
            }
          }
        }
      }

      // ── #21: Load today's check-in count ──
      const today = new Date().toISOString().split("T")[0];
      const dailyData = JSON.parse(localStorage.getItem("moodflip_daily_checkins") || "{}");
      setDailyCheckInCount(dailyData[today] || 0);
    }

    const handlePopupSettingsUpdate = () => {
      if (typeof window !== "undefined") {
        const savedPopupCfg = localStorage.getItem("moodflip_popup_settings");
        if (savedPopupCfg) {
          try { setPopupSettings(prev => ({ ...prev, ...JSON.parse(savedPopupCfg) })); } catch (e) {}
        }
      }
    };

    window.addEventListener("moodflip_popup_settings_updated", handlePopupSettingsUpdate);
    window.addEventListener("storage", handlePopupSettingsUpdate);
    return () => {
      window.removeEventListener("moodflip_popup_settings_updated", handlePopupSettingsUpdate);
      window.removeEventListener("storage", handlePopupSettingsUpdate);
    };
  }, []);

  // Update outcome when AI data arrives after flip
  useEffect(() => {
    if (aiData?.actionTitle || aiData?.reframingQuote) {
      setFlippedOutcome(prev => ({
        targetMood: aiData.reframingQuote ? (activeFeeling.targetMood || prev.targetMood) : prev.targetMood,
        actionTitle: aiData.actionTitle || prev.actionTitle,
        actionDesc: (aiData.actionSteps && aiData.actionSteps.length > 0) ? aiData.actionSteps.join(" ") : prev.actionDesc
      }));
    }
  }, [aiData]);

  // Timer countdown
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  // Derived Active Config
  const activeMoodConfig = MOOD_HIERARCHY[selectedMood];
  const activeFeeling =
    activeMoodConfig.feelings.find((f) => f.id === selectedFeelingId) ||
    activeMoodConfig.feelings[0];

  // Match with Counselor Library
  const findMatchingLibraryMood = (): CounselorPromptItem | undefined => {
    const exactNameMatch = counselorMoods.find(
      (m) =>
        m.name.toLowerCase() === activeFeeling.name.toLowerCase() ||
        m.name.toLowerCase() === selectedChip.toLowerCase()
    );
    if (exactNameMatch) return exactNameMatch;

    const feelingTagMatch = counselorMoods.find((m) =>
      m.feelings?.some(
        (f) =>
          f.toLowerCase() === activeFeeling.name.toLowerCase() ||
          f.toLowerCase() === selectedChip.toLowerCase()
      )
    );
    if (feelingTagMatch) return feelingTagMatch;

    return counselorMoods.find((m) => m.category === selectedMood);
  };

  const matchedLibraryMood = findMatchingLibraryMood();

  // Handlers
  const handleMoodSelect = (mood: MainMoodFamily) => {
    setSelectedMood(mood);
    const newFeelings = MOOD_HIERARCHY[mood].feelings;
    if (newFeelings.length > 0) {
      setSelectedFeelingId(newFeelings[0].id);
      setSelectedChip(newFeelings[0].chips[0] || newFeelings[0].name);
    }
  };

  const handleFeelingSelect = (feeling: ThirdLayerFeeling) => {
    setSelectedFeelingId(feeling.id);
    if (feeling.chips && feeling.chips.length > 0) {
      setSelectedChip(feeling.chips[0]);
    }
  };

  const handleChipSelect = (chip: string) => {
    setSelectedChip(chip);
  };

  const handleClearSelection = () => {
    setSelectedMood("Sad");
    setSelectedFeelingId("rejected");
    setSelectedChip("Excluded");
    setFlippedOutcome({
      targetMood: "Accepted & Valued",
      actionTitle: "60-sec Self-Validation Grounding",
      actionDesc: "Place both feet flat, inhale worthiness, and say: 'My value is intrinsic and unchanged.'"
    });
    setTimerSeconds(60);
    setIsTimerRunning(false);
  };

  const handleSaveToProfile = async () => {
    if (typeof window === "undefined") return;
    if (isSaving) return; // Prevent double-click

    // ── Spec v4: Enforce max 3 saved check-ins per calendar day ──
    const today = new Date().toISOString().split("T")[0];
    const dailyData = JSON.parse(localStorage.getItem("moodflip_daily_checkins") || "{}");
    const todayCount = dailyData[today] || 0;
    if (todayCount >= 3) {
      setSavedMsg("You've saved today's 3 check-ins. You can still use the free MoodFlip tool. You can save more check-ins tomorrow.");
      setTimeout(() => setSavedMsg(""), 6000);
      return;
    }

    setIsSaving(true);

    const checkin = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      timestamp: Date.now(),
      mood: selectedMood,
      feeling: `${activeFeeling.name} (${selectedChip})`,
      targetMood: displayedTransformedMood,
      action: displayedActionTitle,
      actionDesc: displayedActionDesc,
    };

    try {
      // ── Save to localStorage (always works, even offline) ──
      const existing = JSON.parse(localStorage.getItem("moodflip_checkin_history") || "[]");
      const updated = [checkin, ...existing.slice(0, 49)];
      localStorage.setItem("moodflip_checkin_history", JSON.stringify(updated));

      // Update daily count
      const newCount = todayCount + 1;
      dailyData[today] = newCount;
      localStorage.setItem("moodflip_daily_checkins", JSON.stringify(dailyData));
      setDailyCheckInCount(newCount);

      // ── Also save to Supabase if user email is stored ──
      const userEmail = localStorage.getItem("moodflip_user_email");
      if (userEmail) {
        try {
          await fetch("/api/user/activity", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: userEmail,
              checkin: {
                mood: selectedMood,
                feeling: `${activeFeeling.name} (${selectedChip})`,
                target_mood: displayedTransformedMood,
                action_title: displayedActionTitle,
                action_desc: displayedActionDesc,
                saved_at: today,
              }
            })
          });
        } catch {
          // Supabase save failed silently — localStorage already saved
        }
      }

      // ── Spec v4: 7-Day Report Progress Messages ──
      const savedDays = new Set<string>(
        (updated as {date:string}[]).map((c) => c.date.split("T")[0])
      );
      const daysSaved = savedDays.size;

      let progressNote = `Saved. Today's check-ins: [${newCount}/3] 7-Day Report progress: Day [${Math.min(daysSaved, 7)}] of 7`;

      if (updated.length === 1) {
        // Message 1: After first saved check-in
        progressNote = "Your first MoodFlip check-in is saved. You can save up to 3 check-ins per day. After 7 days, you'll be able to download your personalised 7-Day MoodFlip Report.";
      } else if (daysSaved >= 7) {
        // Message 5: 7-day report ready
        progressNote = "Your 7-Day MoodFlip Report is ready. Download your personalised report with your saved moods, positive moods, 60-second actions, and mood pattern summary. Download for US$7";
      }

      setSavedMsg(progressNote);
      setProgressMsg(progressNote);
      setTimeout(() => setSavedMsg(""), 7000);
    } catch (e) {
      setSavedMsg("Saved locally!");
      setTimeout(() => setSavedMsg(""), 3000);
    }
  };

  const handleFlip = () => {
    syncMoodLibrary();

    setHasFlipped(true); // Show Save My Profile button prominently after flip
    setIsFlipping(true);
    setTimerSeconds(60);
    setIsTimerRunning(false);
    setSavedMsg(""); // Clear previous save message on new flip

    // Get current mood identifier and rotating action from live Counselor library
    const currentMoodKey = matchedLibraryMood?.id || activeFeeling.id || selectedMood;
    const availableActions = matchedLibraryMood?.actions && matchedLibraryMood.actions.length > 0 
      ? matchedLibraryMood.actions 
      : (matchedLibraryMood?.actionDesc ? [matchedLibraryMood.actionDesc] : (activeFeeling.actionDesc ? [activeFeeling.actionDesc] : []));

    const currentIndex = actionRotationIndex[currentMoodKey] || 0;
    const chosenAction = availableActions.length > 0 
      ? availableActions[currentIndex % availableActions.length]
      : "Breathe in for 4, breathe out for 6. Repeat 6 times while relaxing your jaw and shoulders.";

    // Advance rotation index for subsequent flips
    if (availableActions.length > 1) {
      setActionRotationIndex(prev => ({
        ...prev,
        [currentMoodKey]: (currentIndex + 1) % availableActions.length
      }));
    }

    // Compute and update outcome prioritizing Google Sheet synced library
    const newTargetMood =
      matchedLibraryMood?.target || activeFeeling.targetMood || "Peaceful";
    const newActionTitle =
      matchedLibraryMood?.actionTitle ||
      activeFeeling.actionTitle ||
      "60-sec action to get to a peaceful mood";

    setFlippedOutcome({
      targetMood: newTargetMood,
      actionTitle: newActionTitle,
      actionDesc: chosenAction,
    });

    if (onFlipTriggered) {
      onFlipTriggered(selectedMood, `${activeFeeling.name} (${selectedChip})`);
    }

    setMobileActiveView("outcome");

    setTimeout(() => {
      setIsFlipping(false);
    }, 600);
  };

  // Outcome texts rendered on right panel (only changes when user flips)
  const displayedTransformedMood = flippedOutcome.targetMood;
  const displayedActionTitle = flippedOutcome.actionTitle;
  const displayedActionDesc = flippedOutcome.actionDesc;

  return (
    <section className={styles.heroWrapper} id="hero-section">

      {/* ── TOP AD BANNER (Controlled by Admin / Backend - Disabled by default) ── */}
      {adsEnabled && (
        <div className={styles.topAdBanner}>
          <span className={styles.adBannerTitle}>Google Ad Space</span>
          <span className={styles.adBannerDimensions}>728 x 90</span>
        </div>
      )}

      {/* ── MAIN WORKSPACE CONTAINER ── */}
      <div className={styles.workspaceRow}>

        {/* ── CENTRAL APP CARD ── */}
        <div className={styles.mainCard}>

          {/* Mobile Tab Switcher (Visible on Mobile only - Allows instant switch without scrolling) */}
          <div className={styles.mobileHeroToggle}>
            <button
              type="button"
              className={`${styles.mobileHeroTab} ${mobileActiveView === "input" ? styles.mobileHeroTabActive : ""}`}
              onClick={() => setMobileActiveView("input")}
            >
              <span>☁️</span> 1. Select Mood
            </button>
            <button
              type="button"
              className={`${styles.mobileHeroTab} ${mobileActiveView === "outcome" ? styles.mobileHeroTabActive : ""}`}
              onClick={() => setMobileActiveView("outcome")}
            >
              <span>🌅</span> 2. Result &amp; Action ✨
            </button>
          </div>

          {/* 1. LEFT COLUMN: 3-Step Guide (Exact Clone) */}
          <div className={`${styles.leftStepsCol} ${mobileActiveView === "outcome" ? styles.mobileHiddenOnOutcome : ""}`}>
            <div className={styles.mobileStepsRow}>
              {/* Step 1 */}
              <div className={styles.stepBox}>
                <div className={styles.stepBadge}>Step 1</div>
                <div className={styles.stepTitle}>
                  <span className={styles.stepLine}>Choose your</span>
                  <span className={styles.stepLine}>main mood</span>
                </div>
                <div className={styles.stepSub}>Click a cloud</div>
              </div>

              <div className={styles.stepDashedArrow}>
                <svg width="12" height="30" viewBox="0 0 12 30" fill="none" className={styles.desktopArrowSvg}>
                  <line x1="6" y1="0" x2="6" y2="22" stroke="#C4BADB" strokeWidth="1.5" strokeDasharray="3.5 3.5" />
                  <path d="M2.5 18L6 22.5L9.5 18" stroke="#C4BADB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className={styles.mobileArrowSpan}>➔</span>
              </div>

              {/* Step 2 */}
              <div className={styles.stepBox}>
                <div className={styles.stepBadge}>Step 2</div>
                <div className={styles.stepTitle}>
                  <span className={styles.stepLine}>Pick feeling</span>
                  <span className={styles.stepLine}>closest to you</span>
                </div>
                <div className={styles.stepSub}>Click a card</div>
              </div>

              <div className={styles.stepDashedArrow}>
                <svg width="12" height="30" viewBox="0 0 12 30" fill="none" className={styles.desktopArrowSvg}>
                  <line x1="6" y1="0" x2="6" y2="22" stroke="#C4BADB" strokeWidth="1.5" strokeDasharray="3.5 3.5" />
                  <path d="M2.5 18L6 22.5L9.5 18" stroke="#C4BADB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className={styles.mobileArrowSpan}>➔</span>
              </div>

              {/* Step 3 */}
              <div className={styles.stepBox}>
                <div className={styles.stepBadge}>Step 3</div>
                <div className={styles.stepTitle}>
                  <span className={styles.stepLine}>Choose more</span>
                  <span className={styles.stepLine}>specific feeling</span>
                </div>
                <div className={styles.stepSub}>Click a chip</div>
              </div>
            </div>

            {/* Clear Selection Button */}
            <button
              type="button"
              className={styles.clearSelectionBtn}
              onClick={handleClearSelection}
              aria-label="Clear selection and start over"
            >
              <div className={styles.clearIconWrap}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7464AC" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
              </div>
              <div className={styles.clearTextWrap}>
                <span className={styles.clearTitle}>Clear selection</span>
                <span className={styles.clearSub}>Start over</span>
              </div>
            </button>
          </div>

          {/* 2. MIDDLE COLUMN: Interactive Mood Tool */}
          <div className={`${styles.centerMoodCol} ${mobileActiveView === "outcome" ? styles.mobileHiddenOnOutcome : ""}`}>

            {/* LAYER 1: 5 Clouds Row */}
            <div className={styles.cloudRow} role="group" aria-label="1. Choose Main Mood Cloud">
              {MAIN_MOOD_FAMILIES.map((mood) => {
                const isSelected = selectedMood === mood;
                return (
                  <button
                    key={mood}
                    type="button"
                    className={`${styles.cloudBtn} ${isSelected ? styles.cloudBtnActive : ""}`}
                    onClick={() => handleMoodSelect(mood)}
                    aria-pressed={isSelected}
                  >
                    <div className={styles.cloudSvgWrap}>
                      {mood === "Sad" && <SadCloudSvg />}
                      {mood === "Fearful" && <FearfulCloudSvg />}
                      {mood === "Angry" && <AngryCloudSvg />}
                      {mood === "Disgusted" && <DisgustedCloudSvg />}
                      {mood === "Bad" && <StressedCloudSvg />}
                    </div>
                    <span className={styles.cloudName}>
                      {mood}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* LAYER 2: 2x4 Grid of 8 Feeling Cards */}
            <div className={styles.feelingsGrid} role="group" aria-label="2. Choose Specific Feeling Card">
              {activeMoodConfig.feelings.slice(0, 8).map((feeling) => {
                const isSelected = selectedFeelingId === feeling.id;
                const IconComp = feeling.icon;
                return (
                  <button
                    key={feeling.id}
                    type="button"
                    className={`${styles.feelingCard} ${isSelected ? styles.feelingCardActive : ""}`}
                    onClick={() => handleFeelingSelect(feeling)}
                    aria-pressed={isSelected}
                  >
                    <div className={styles.feelingIconWrap}>
                      <IconComp />
                    </div>
                    <span className={styles.feelingName}>{feeling.name}</span>
                  </button>
                );
              })}
            </div>

            {/* LAYER 3: Chips & Note Enclosed Box (Exact Match) */}
            <div className={styles.chipsBoxContainer}>
              <div className={styles.chipsRow} role="radiogroup" aria-label="3. Pick Exact Specific Feeling Chip">
                {activeFeeling.chips.map((chip) => {
                  const isSelected = selectedChip === chip;
                  return (
                    <button
                      key={chip}
                      type="button"
                      className={`${styles.chipPill} ${isSelected ? styles.chipPillActive : ""}`}
                      onClick={() => handleChipSelect(chip)}
                      role="radio"
                      aria-checked={isSelected}
                    >
                      {chip}
                    </button>
                  );
                })}
              </div>

              {/* Explanatory Note (Exact Match with Sparkle Icon) */}
              <div className={styles.chipsExplanationNote}>
                <svg className={styles.noteSparkleSvg} width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="#9C8CC4" />
                  <circle cx="5" cy="5" r="1.2" fill="#9C8CC4" />
                  <circle cx="19" cy="5" r="1.2" fill="#9C8CC4" />
                  <circle cx="19" cy="19" r="1.2" fill="#9C8CC4" />
                  <circle cx="5" cy="19" r="1.2" fill="#9C8CC4" />
                </svg>
                <span>These are examples. You can explore what feels right for you.</span>
              </div>
            </div>
          </div>

          {/* Divider Hearts Top and Bottom */}
          <div className={styles.dividerHeartTop}>♡</div>
          <div className={styles.dividerHeartBottom}>♡</div>

          {/* 3. CENTER OVERLAPPING FLIP YOUR MOOD ARROW BUTTON (EXACT MATCH) */}
          <button
            type="button"
            className={`${styles.flipMoodArrowBtn} ${isFlipping ? styles.flipMoodArrowFlipping : ""} ${mobileActiveView === "outcome" ? styles.mobileHiddenOnOutcome : ""}`}
            onClick={handleFlip}
            disabled={aiLoading}
            aria-label="Flip Your Mood"
          >
            <img
              src="/flip-your-mood-arrow.png"
              alt="Flip Your Mood"
              className={styles.flipMoodArrowImg}
            />
          </button>

          {/* 4. RIGHT COLUMN: Outcome Display & Action Card */}
          <div className={`${styles.rightOutcomeCol} ${mobileActiveView === "input" ? styles.mobileHiddenOnInput : ""}`} ref={outcomeRef} id="outcome-panel">
            {/* Sunrise Landscape Art Background using user-provided artwork */}
            <div className={styles.sunburstBg} aria-hidden="true">
              <img
                src="/sunrise-artwork.png"
                alt="Sunrise Artwork"
                className={styles.sunriseArtworkImg}
              />
            </div>

            {/* Outcome Header */}
            <div className={styles.outcomeTopHeader}>
              <div className={styles.sunTopHeart}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#E66A6A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <div className={styles.outcomeSubtitle}>You can change your mood to be:</div>
              <h2 className={styles.outcomeMoodHeading}>
                {displayedTransformedMood.includes(" & ") ? (
                  <>
                    <span className={styles.headingLine1}>
                      {displayedTransformedMood.split(" & ")[0]} &amp;
                    </span>
                    <span className={styles.headingLine2}>
                      {displayedTransformedMood.split(" & ")[1]}
                      <span className={styles.headingLeafBranch}>
                        <img
                          src="/action-botanical-branch.png"
                          alt="Leaf Branch"
                          className={styles.headingLeafImg}
                        />
                      </span>
                    </span>
                  </>
                ) : (
                  <span className={styles.headingLine1}>
                    {displayedTransformedMood}
                    <span className={styles.headingLeafBranch}>
                      <img
                        src="/action-botanical-branch.png"
                        alt="Leaf Branch"
                        className={styles.headingLeafImg}
                      />
                    </span>
                  </span>
                )}
              </h2>

              {/* Sub-divider line with delicate center heart */}
              <div className={styles.outcomeUnderlineHeart}>
                <span className={styles.outcomeDividerLine} />
                <span className={styles.outcomeDividerHeart}>♡</span>
                <span className={styles.outcomeDividerLine} />
              </div>
            </div>

            {/* 60-Second Action Floating Card (Exact Clone from Reference) */}
            <div className={styles.actionFloatingCard}>
              <div className={styles.actionCardInner}>
                {/* Left: User-provided Zen Mascot PNG (ChatGPT Image 07_48_59 PM) */}
                <div className={styles.actionZenBadge}>
                  <img
                    src="/zen-mascot-orb.png?v=3"
                    alt="Zen Mascot"
                    className={styles.zenMascotImg}
                  />
                </div>

                <div className={styles.actionCardText}>
                  <div className={styles.actionCardTitle}>{displayedActionTitle}</div>
                  
                  {/* Subtle divider with centered tiny heart */}
                  <div className={styles.actionHeartDivider}>
                    <span className={styles.actionHeartLine} />
                    <span className={styles.actionSmallHeart}>♡</span>
                    <span className={styles.actionHeartLine} />
                  </div>

                  <p className={styles.actionCardDesc}>{displayedActionDesc}</p>
                </div>

                {/* Right: User-provided Botanical Branch PNG (ChatGPT Image 07_48_49 PM) */}
                <div className={styles.actionCardBotanical}>
                  <img
                    src="/action-botanical-branch.png?v=3"
                    alt="Botanical Leaf Branch"
                    className={styles.botanicalBranchImg}
                  />
                </div>
              </div>
            </div>

            {/* ── #20: SAVE MY PROFILE button — appears after every flip ── */}
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
              marginTop: 16,
              padding: "12px 16px",
              borderRadius: 16,
              background: hasFlipped ? "rgba(116,100,172,0.07)" : "transparent",
              border: hasFlipped ? "1.5px solid rgba(116,100,172,0.18)" : "1.5px solid transparent",
              transition: "all 0.4s ease",
            }}>
              {/* Label shown only after flip */}
              {hasFlipped && (
                <div style={{ fontSize: 11, color: "#9C8CC4", fontWeight: 600, letterSpacing: 0.5, textTransform: "uppercase" }}>
                  📌 Save this check-in
                </div>
              )}

              <button
                type="button"
                onClick={handleSaveToProfile}
                disabled={isSaving}
                style={{
                  background: hasFlipped
                    ? "linear-gradient(135deg, #7464AC 0%, #9C6FBF 100%)"
                    : "linear-gradient(135deg, #b0a8cc 0%, #c8b8d8 100%)",
                  color: "#fff",
                  border: "none",
                  borderRadius: 14,
                  padding: "11px 32px",
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: isSaving ? "not-allowed" : "pointer",
                  letterSpacing: 0.3,
                  boxShadow: hasFlipped
                    ? "0 4px 18px rgba(116,100,172,0.35)"
                    : "0 2px 8px rgba(116,100,172,0.12)",
                  transition: "all 0.3s ease",
                  // Pulse animation after flip
                  animation: hasFlipped && !isSaving ? "savePulse 2s ease-in-out 3" : "none",
                  opacity: isSaving ? 0.7 : 1,
                }}
                onMouseOver={(e) => { if (!isSaving) e.currentTarget.style.transform = "scale(1.04)"; }}
                onMouseOut={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
                aria-label="Save this mood check-in to your profile"
              >
                {isSaving ? "⏳ Saving..." : "💾 Save My Profile"}
              </button>

              {/* CSS animation for pulse effect */}
              <style>{`
                @keyframes savePulse {
                  0%, 100% { box-shadow: 0 4px 18px rgba(116,100,172,0.35); }
                  50% { box-shadow: 0 4px 28px rgba(116,100,172,0.7), 0 0 0 6px rgba(116,100,172,0.12); }
                }
              `}</style>

              {savedMsg && (
                <div style={{
                  fontSize: 12,
                  color: "#5A4A7A",
                  textAlign: "center",
                  maxWidth: 260,
                  lineHeight: 1.5,
                  fontWeight: 600,
                  background: "rgba(116,100,172,0.07)",
                  padding: "8px 12px",
                  borderRadius: 10,
                  marginTop: 4,
                }}>
                  ✅ {savedMsg}
                </div>
              )}
              <div style={{ fontSize: 11, color: "#A899C0", textAlign: "center", maxWidth: 220 }}>
                {dailyCheckInCount}/3 check-ins saved today
              </div>
            </div>

            {/* Mobile-Only Switch Back Action Button (Zero Scrolling Needed) */}
            <div className={styles.mobileOutcomeActionsBar}>
              <button
                type="button"
                className={styles.mobileBackToMoodBtn}
                onClick={() => setMobileActiveView("input")}
              >
                <span>🔄</span> Flip Another Mood / Change Selection
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* ── BOTTOM AD BANNER (Controlled by Admin / Backend - Disabled by default) ── */}
      {adsEnabled && (
        <div className={styles.bottomAdResponsiveBanner}>
          <span className={styles.adBannerTitle}>Google Ad Space</span>
          <span className={styles.adBannerDimensions}>728 x 90</span>
        </div>
      )}

      {/* ── MOTIVATIONAL BAR (Exact Sketch Match) ── */}
      <div className={styles.bottomMotivationalBar}>
        <div className={styles.motivationalItem}>
          <span className={styles.motivationalIconCircle}>
            <img
              src="/motivational-hands-heart.png"
              alt="Hands Holding Heart"
              className={styles.motivationalOrbImg}
            />
          </span>
          <div className={styles.motivationalText}>
            <span className={styles.motivationalTitle}>Small shifts can change how you feel.</span>
            <span className={styles.motivationalSub}>You've got this.</span>
          </div>
        </div>

        <div className={styles.motivationalCenterHeart}>
          <svg width="24" height="56" viewBox="0 0 24 56" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.desktopHeartSvg}>
            {/* Top Dotted Line */}
            <line x1="12" y1="2" x2="12" y2="18" stroke="#DACFE0" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="1 5" />
            {/* Center Peach Heart */}
            <path d="M12 35.5l-1.45-1.32C5.4 29.36 2 26.28 2 22.5 2 19.42 4.42 17 7.5 17c1.74 0 3.41.81 4.5 2.09C13.09 17.81 14.76 17 16.5 17 19.58 17 22 19.42 22 22.5c0 3.78-3.4 6.86-8.55 11.68L12 35.5z" fill="none" stroke="#EAA492" strokeWidth="1.8" />
            {/* Bottom Dotted Line */}
            <line x1="12" y1="38" x2="12" y2="54" stroke="#DACFE0" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="1 5" />
          </svg>
          <span className={styles.mobileMotivationalHeart}>♡</span>
        </div>

        <div className={styles.motivationalItem}>
          <span className={styles.motivationalIconCircle}>
            <img
              src="/motivational-leaves-orb.png"
              alt="Leaves in Orb"
              className={styles.motivationalOrbImg}
            />
          </span>
          <div className={styles.motivationalText}>
            <span className={styles.motivationalTitle}>Be kind to yourself.</span>
            <span className={styles.motivationalSub}>One choice at a time.</span>
          </div>
        </div>
      </div>

      {/* ── ADMIN-CONTROLLED PROFILE INVITATION POPUP ── */}
      {showSecondVisitPopup && popupSettings.enabled && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={popupSettings.modalTitle || "Welcome back! Create a free profile"}
          style={{
            position: "fixed", inset: 0, zIndex: 9000,
            background: "rgba(80,60,110,0.45)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: 20,
          }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowSecondVisitPopup(false); }}
        >
          <div style={{
            background: "#FAF7FD",
            borderRadius: 22,
            padding: "32px 28px",
            maxWidth: 380,
            width: "100%",
            textAlign: "center",
            boxShadow: "0 8px 40px rgba(116,100,172,0.25)",
            position: "relative",
          }}>
            <button
              onClick={() => setShowSecondVisitPopup(false)}
              style={{ position: "absolute", top: 14, right: 18, background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#A899C0" }}
              aria-label="Close popup"
            >×</button>
            <div style={{ fontSize: 38, marginBottom: 10 }}>🌸</div>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: "#3D2D5E", marginBottom: 8 }}>
              {popupSettings.modalTitle || "Save your MoodFlip check-ins?"}
            </h2>
            <p style={{ fontSize: 14, color: "#5A4A7A", lineHeight: 1.6, marginBottom: 20 }}>
              {popupSettings.modalDescription || "Create a free profile to save your moods, actions, and progress toward your 7-Day MoodFlip Report."}
            </p>
            <a
              href={popupSettings.buttonLink || "/register"}
              style={{
                display: "inline-block",
                background: "linear-gradient(135deg, #7464AC 0%, #9C6FBF 100%)",
                color: "#fff", borderRadius: 14, padding: "11px 28px",
                fontWeight: 700, fontSize: 14, textDecoration: "none",
                boxShadow: "0 3px 14px rgba(116,100,172,0.22)",
                marginBottom: 10,
              }}
            >
              {popupSettings.buttonText || "Create Free Profile"}
            </a>
            {popupSettings.showMaybeLater !== false && (
              <>
                <br />
                <button
                  onClick={() => setShowSecondVisitPopup(false)}
                  style={{ background: "none", border: "none", fontSize: 12, color: "#A899C0", cursor: "pointer", marginTop: 6 }}
                >
                  Maybe later
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
