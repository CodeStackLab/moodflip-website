"use client";

import React, { useState, useEffect } from "react";
import styles from "./HeroSectionExact.module.css";

export type MainMoodFamily = "Sad" | "Fearful" | "Angry" | "Disgusted" | "Bad";

export interface ThirdLayerFeeling {
  id: string;
  name: string;
  targetMood: string;
  actionTitle: string;
  actionDesc: string;
  icon: (props: { className?: string }) => React.ReactNode;
}

export interface SecondLayerBranch {
  id: string;
  name: string;
  feelings: ThirdLayerFeeling[];
}

export interface MoodFamilyConfig {
  name: MainMoodFamily;
  label: string;
  branches: SecondLayerBranch[];
}

// ─────────────────────────────────────────────────────────────────────────────
// CUSTOM LINE-ART SVG ICONS
// ─────────────────────────────────────────────────────────────────────────────

function LonelyHuddledIcon({ className }: { className?: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M14 6a4 4 0 0 1 3 4 4 4 0 0 1-4 4 3.9 3.9 0 0 1-1.2-.2A4.2 4.2 0 0 0 14 6z" strokeWidth="1.4" />
      <path d="M22 6.5l.5 1 1 .5-1 .5-.5 1-.5-1-1-.5 1-.5.5-1z" fill="currentColor" stroke="none" />
      <circle cx="18" cy="16" r="3.2" />
      <path d="M13 29v-4a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v4" />
      <path d="M11 29h14" />
    </svg>
  );
}

function AbandonedAuraIcon({ className }: { className?: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="18" cy="15" r="3.2" />
      <path d="M12.5 28.5c.5-3.5 2.5-5 5.5-5s5 1.5 5.5 5" />
      <path d="M9 25a11 11 0 0 1 18 0" strokeDasharray="3 3" strokeWidth="1.5" />
    </svg>
  );
}

function BrokenHeartIcon({ className }: { className?: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 10.5C16.5 7.5 12 7.5 9.5 10c-3 3-2 8 8.5 16.5 10.5-8.5 11.5-13.5 8.5-16.5-2.5-2.5-7-2.5-8.5.5z" />
      <path d="M18 11l-2 5 3.5 3-2.5 5 1 2.5" strokeWidth="1.6" />
    </svg>
  );
}

function AshamedHeadBowedIcon({ className }: { className?: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="18" cy="13" r="3.5" />
      <path d="M14 13c-.5-3 1.5-5 4-5s4.5 2 4 5" />
      <path d="M12 28v-3a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v3" />
      <path d="M14.5 17l-1.5 5h3l2-3" />
      <path d="M21.5 17l1.5 5h-3l-2-3" />
    </svg>
  );
}

function RainCloudGuiltyIcon({ className }: { className?: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 11a3.5 3.5 0 0 1 6.5-1.5A3 3 0 0 1 24 12a2.5 2.5 0 0 1-1 4.8H12a3 3 0 0 1 0-5.8z" strokeWidth="1.4" />
      <path d="M14 18.5l-.8 2m4.8-2l-.8 2m4.8-2l-.8 2" strokeWidth="1.4" />
      <circle cx="18" cy="24.5" r="2.8" />
      <path d="M13.5 31c.5-2.5 2-4 4.5-4s4 1.5 4.5 4" />
    </svg>
  );
}

function EmptySilhouetteIcon({ className }: { className?: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="18" cy="14" r="3.5" />
      <path d="M11.5 29c.5-4 3.5-6.5 6.5-6.5s6 2.5 6.5 6.5" />
      <circle cx="18" cy="22" r="5" strokeDasharray="2.5 2.5" strokeWidth="1.5" />
    </svg>
  );
}

function SpiralOverwhelmedIcon({ className }: { className?: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 8c-3 0-5 1.5-5 4s3 3.5 6 3.5 5-1.5 5-3.5-2-3-4.5-3-4.5 2-3 4.5 4 2 4.5 0c.5-1.5-.5-3-2-3s-2.5 1-2.5 2.5" strokeWidth="1.4" />
      <circle cx="18" cy="20" r="3.2" />
      <path d="M12 30c.5-3.5 3-5.5 6-5.5s5.5 2 6 5.5" />
    </svg>
  );
}

function RejectedSadFaceIcon({ className }: { className?: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="18" cy="18" r="11" />
      <circle cx="14" cy="15" r="1.2" fill="currentColor" />
      <circle cx="22" cy="15" r="1.2" fill="currentColor" />
      <path d="M14 23a5 5 0 0 1 8 0" />
      <circle cx="25" cy="24" r="4" fill="#FAF8FD" stroke="currentColor" strokeWidth="1.4" />
      <path d="M23.5 22.5l3 3m0-3l-3 3" strokeWidth="1.4" />
    </svg>
  );
}

function AnxiousWavesIcon({ className }: { className?: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="18" cy="18" r="11" />
      <path d="M12 18c2-2 4 2 6 0s4 2 6 0" strokeWidth="1.6" />
      <circle cx="14" cy="13" r="1.2" fill="currentColor" />
      <circle cx="22" cy="13" r="1.2" fill="currentColor" />
    </svg>
  );
}

function ScaredShockIcon({ className }: { className?: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="18" cy="18" r="11" />
      <circle cx="14" cy="15" r="2" />
      <circle cx="22" cy="15" r="2" />
      <circle cx="18" cy="23" r="2" />
      <path d="M8 8l3 3m17-3l-3 3" strokeWidth="1.5" />
    </svg>
  );
}

function FlameBurstIcon({ className }: { className?: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 6c2 4 7 7 7 13a7 7 0 0 1-14 0c0-3 2-6 4-8 1 2 2 3 3 2 1-2 0-5 0-7z" />
      <circle cx="18" cy="23" r="2.5" fill="currentColor" opacity="0.3" stroke="none" />
    </svg>
  );
}

function BlockedWallIcon({ className }: { className?: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="8" y="10" width="20" height="16" rx="3" />
      <line x1="8" y1="18" x2="28" y2="18" />
      <line x1="18" y1="10" x2="18" y2="18" />
      <line x1="13" y1="18" x2="13" y2="26" />
      <line x1="23" y1="18" x2="23" y2="26" />
    </svg>
  );
}

function ShieldDefensiveIcon({ className }: { className?: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 7l9 3v8c0 6-9 11-9 11s-9-5-9-11v-8l9-3z" />
      <line x1="18" y1="13" x2="18" y2="21" strokeDasharray="2 2" />
    </svg>
  );
}

function TeardropGriefIcon({ className }: { className?: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 8c4 6 7 11 7 14a7 7 0 1 1-14 0c0-3 3-8 7-14z" />
      <circle cx="16" cy="22" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function BatteryDrainedIcon({ className }: { className?: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="8" y="11" width="18" height="14" rx="2" />
      <path d="M28 15v6" strokeWidth="2" />
      <line x1="12" y1="18" x2="14" y2="18" strokeWidth="2" />
    </svg>
  );
}

function AverseTurnIcon({ className }: { className?: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="18" cy="18" r="11" />
      <path d="M14 22c2-1 6-1 8 0" />
      <line x1="12" y1="14" x2="16" y2="15" />
      <line x1="24" y1="14" x2="20" y2="15" />
    </svg>
  );
}

// Meditating Zen Lotus Figure for 60s action card
function MeditatingZenIcon({ className }: { className?: string }) {
  return (
    <svg width="36" height="36" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="20" cy="11" r="3.2" />
      <path d="M20 15v8" />
      <path d="M20 18c-.8-.8-2-.5-2 .5 0 1.2 2 2.2 2 2.2s2-1 2-2.2c0-1-.8-1.3-2-.5z" fill="#7D8164" stroke="none" />
      <path d="M14 18c-3 1.5-4 4.5-3 7 1 2.5 3.5 2 4.5 0l2.5-4" />
      <path d="M26 18c3 1.5 4 4.5 3 7-1 2.5-3.5 2-4.5 0l-2.5-4" />
      <path d="M11 29c2-2 5.5-3 9-3s7 1 9 3" />
      <path d="M13 27c2.5 2 11.5 2 14 0" />
    </svg>
  );
}

// Eucalyptus / Olive Branch Decorative SVG
function BotanicalBranchSvg({ className }: { className?: string }) {
  return (
    <svg width="48" height="68" viewBox="0 0 50 70" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M25 66C24 48 30 30 38 6" stroke="#8E9B82" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M25 54C16 52 14 44 20 42C25 40 26 48 25 54Z" fill="#9BAA8E" opacity="0.8" />
      <path d="M26 50C34 47 38 41 33 37C28 34 26 44 26 50Z" fill="#A8B79B" opacity="0.85" />
      <path d="M28 38C20 35 19 28 24 26C29 25 29 32 28 38Z" fill="#9BAA8E" opacity="0.8" />
      <path d="M30 34C38 31 40 24 35 22C30 20 29 28 30 34Z" fill="#A8B79B" opacity="0.85" />
      <path d="M33 22C27 18 28 12 32 11C36 11 35 17 33 22Z" fill="#9BAA8E" opacity="0.8" />
      <path d="M35 18C41 15 42 9 38 8C34 8 34 14 35 18Z" fill="#A8B79B" opacity="0.85" />
      <path d="M38 6C36 2 40 1 41 3C42 5 40 6 38 6Z" fill="#88987B" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 3-LAYER EMOTION WHEEL HIERARCHY (FeelingsWheel.app spec)
// ─────────────────────────────────────────────────────────────────────────────

export const MOOD_HIERARCHY: Record<MainMoodFamily, MoodFamilyConfig> = {
  Sad: {
    name: "Sad",
    label: "Sad",
    branches: [
      {
        id: "lonely",
        name: "Lonely",
        feelings: [
          { id: "isolated", name: "Isolated", targetMood: "Connected & Supported", actionTitle: "60-sec Reach Out & Connection Reset", actionDesc: "Text a friend or family member a warm heart emoji or positive thought right now.", icon: LonelyHuddledIcon },
          { id: "abandoned", name: "Abandoned", targetMood: "Whole & Valued", actionTitle: "60-sec Self-Compassion Hand on Heart", actionDesc: "Place your hand over your chest, breathe deeply, and remind yourself: 'I am safe and never truly alone.'", icon: AbandonedAuraIcon },
          { id: "left_out", name: "Left Out", targetMood: "Belonging & Peaceful", actionTitle: "60-sec Community Focus Breath", actionDesc: "Inhale acceptance for 4s, exhale rejection for 6s. Feel your feet firmly grounded on the earth.", icon: EmptySilhouetteIcon },
          { id: "empty", name: "Empty", targetMood: "Filled & Restored", actionTitle: "60-sec Warmth Sensory Anchor", actionDesc: "Hold a warm mug or wrap in a soft blanket and name 3 things that bring warmth to your life.", icon: EmptySilhouetteIcon },
        ],
      },
      {
        id: "hurt",
        name: "Hurt",
        feelings: [
          { id: "crushed", name: "Crushed", targetMood: "Healed & Resilient", actionTitle: "60-sec Gentle Heart Release", actionDesc: "Unclench your chest and jaw. Breathe in soothing calm for 4 seconds, exhale pain for 6 seconds.", icon: BrokenHeartIcon },
          { id: "rejected", name: "Rejected", targetMood: "Accepted & Worthy", actionTitle: "60-sec Self-Worth Affirmation", actionDesc: "Say out loud: 'One event or person's reaction does not define my inherent value.'", icon: RejectedSadFaceIcon },
          { id: "heartbroken", name: "Heartbroken", targetMood: "Peaceful & Tender", actionTitle: "60-sec Soothing Somatic Breath", actionDesc: "Take 6 slow, deep belly breaths with a longer exhale while softening your shoulder blades.", icon: BrokenHeartIcon },
          { id: "damaged", name: "Damaged", targetMood: "Renewed & Whole", actionTitle: "60-sec Resilience Mindset Anchor", actionDesc: "Remind yourself: 'Scars are proof of healing. I grow stronger through every trial.'", icon: TeardropGriefIcon },
        ],
      },
      {
        id: "guilty",
        name: "Guilty",
        feelings: [
          { id: "ashamed", name: "Ashamed", targetMood: "Forgiven & Light", actionTitle: "60-sec Release Burden Exhale", actionDesc: "Drop your shoulders and say: 'I did what I knew then. Today I choose grace and growth.'", icon: AshamedHeadBowedIcon },
          { id: "remorseful", name: "Remorseful", targetMood: "At Peace & Clear", actionTitle: "60-sec Constructive Action Choice", actionDesc: "Decide on one kind act you can do today to express care and move forward positively.", icon: RainCloudGuiltyIcon },
          { id: "regretful", name: "Regretful", targetMood: "Forward-Focused", actionTitle: "60-sec Present Moment Grounding", actionDesc: "Feel the floor beneath your feet. Focus on what you can influence right now in this moment.", icon: AshamedHeadBowedIcon },
          { id: "at_fault", name: "At Fault", targetMood: "Free & Self-Forgiving", actionTitle: "60-sec Grace Breathing Exercise", actionDesc: "Inhale self-forgiveness for 4s, exhale self-criticism for 6s. Repeat 5 times.", icon: RainCloudGuiltyIcon },
        ],
      },
      {
        id: "depressed",
        name: "Depressed",
        feelings: [
          { id: "hopeless", name: "Hopeless", targetMood: "Hopeful & Uplifted", actionTitle: "60-sec Micro-Step Ignition", actionDesc: "Stand up, stretch your arms overhead, drink a cool sip of water, and look at the sky.", icon: RainCloudGuiltyIcon },
          { id: "inferior", name: "Inferior", targetMood: "Confident & Unique", actionTitle: "60-sec Unique Strengths Reflection", actionDesc: "Name 3 unique strengths or kindnesses you have brought to others recently.", icon: AshamedHeadBowedIcon },
          { id: "numb", name: "Numb", targetMood: "Awakened & Alive", actionTitle: "60-sec 5-Sensory Activation", actionDesc: "Touch a textured object, splash cold water on your wrists, and take 3 deep revitalizing breaths.", icon: EmptySilhouetteIcon },
          { id: "heavy", name: "Heavy", targetMood: "Light & Unburdened", actionTitle: "60-sec Weight Release Shake-out", actionDesc: "Gently shake out your hands, arms, and shoulders for 60 seconds to release stored heaviness.", icon: LonelyHuddledIcon },
        ],
      },
    ],
  },
  Fearful: {
    name: "Fearful",
    label: "Fearful",
    branches: [
      {
        id: "anxious",
        name: "Anxious",
        feelings: [
          { id: "panicked", name: "Panicked", targetMood: "Safe & Centered", actionTitle: "60-sec 5-4-3-2-1 Sensory Grounding", actionDesc: "Name 5 things you see, 4 you feel, 3 you hear, 2 you smell, and take 1 deep belly breath.", icon: ScaredShockIcon },
          { id: "overwhelmed_f", name: "Overwhelmed", targetMood: "Calm & In Control", actionTitle: "60-sec Box Breathing Flow", actionDesc: "Inhale 4s, hold 4s, exhale 4s, hold empty 4s. Repeat 4 times to regulate your nervous system.", icon: SpiralOverwhelmedIcon },
          { id: "worried", name: "Worried", targetMood: "Confident & Grounded", actionTitle: "60-sec Worry Containment Exercise", actionDesc: "Acknowledge the worry, place it in an imaginary box, and return your full attention to this present minute.", icon: AnxiousWavesIcon },
          { id: "on_edge", name: "On Edge", targetMood: "Relaxed & Safe", actionTitle: "60-sec Muscle De-escalation", actionDesc: "Unclench jaw, drop shoulders 2 inches, open clenched fists, and take a long sighing exhale.", icon: ShieldDefensiveIcon },
        ],
      },
      {
        id: "scared",
        name: "Scared",
        feelings: [
          { id: "terrified", name: "Terrified", targetMood: "Protected & Grounded", actionTitle: "60-sec Safety Anchor Statement", actionDesc: "Feel your feet on the floor. Repeat aloud: 'Right here, right now, in this exact second, I am safe.'", icon: ScaredShockIcon },
          { id: "frightened", name: "Frightened", targetMood: "Courageous & Calm", actionTitle: "60-sec Deep Belly Breath", actionDesc: "Place both hands on your stomach. Feel your hands rise for 4s, then sink down slowly for 6s.", icon: ScaredShockIcon },
          { id: "shaken", name: "Shaken", targetMood: "Steady & Composed", actionTitle: "60-sec Steady Stance Grounding", actionDesc: "Plant both feet shoulder-width apart, roll your shoulders back, and feel the solid ground holding you.", icon: AnxiousWavesIcon },
          { id: "threatened", name: "Threatened", targetMood: "Secure & Supported", actionTitle: "60-sec Perimeter Safety Awareness", actionDesc: "Look slowly around your room. Observe 4 secure objects and affirm your safety.", icon: ShieldDefensiveIcon },
        ],
      },
      {
        id: "insecure",
        name: "Insecure",
        feelings: [
          { id: "inadequate", name: "Inadequate", targetMood: "More Than Enough", actionTitle: "60-sec Capability Remembrance", actionDesc: "Remember a difficult obstacle you overcame in the past. You possess that exact strength today.", icon: AshamedHeadBowedIcon },
          { id: "doubtful", name: "Doubtful", targetMood: "Decisive & Trusting", actionTitle: "60-sec Intuition Alignment", actionDesc: "Place a hand on your heart and take 3 slow breaths. Trust your inner wisdom.", icon: AnxiousWavesIcon },
          { id: "exposed", name: "Exposed", targetMood: "Safe & Dignified", actionTitle: "60-sec Energetic Boundary Wrap", actionDesc: "Cross your arms gently over your chest, hugging yourself warmly. You are protected and whole.", icon: ShieldDefensiveIcon },
          { id: "weak", name: "Weak", targetMood: "Strong & Capable", actionTitle: "60-sec Power Posture Shift", actionDesc: "Stand tall with hands on hips, lift your chin, take 3 powerful breaths, and feel your resilience.", icon: BatteryDrainedIcon },
        ],
      },
    ],
  },
  Angry: {
    name: "Angry",
    label: "Angry",
    branches: [
      {
        id: "frustrated",
        name: "Frustrated",
        feelings: [
          { id: "blocked", name: "Blocked", targetMood: "Creative & Flowing", actionTitle: "60-sec Perspective Step-Back", actionDesc: "Take 3 deep breaths. Ask: 'What is one creative alternative angle I haven't tried yet?'", icon: BlockedWallIcon },
          { id: "annoyed", name: "Annoyed", targetMood: "Patient & Untouchable", actionTitle: "60-sec Neutral Observer Breath", actionDesc: "Imagine the minor annoyance floating away like a cloud in the sky. It cannot steal your peace.", icon: FlameBurstIcon },
          { id: "impatient", name: "Impatient", targetMood: "Calm & Present", actionTitle: "60-sec Slow Count Down", actionDesc: "Count backwards from 10 to 1 with each slow exhale, relaxing muscles with each number.", icon: SpiralOverwhelmedIcon },
          { id: "irritated", name: "Irritated", targetMood: "Centered & Serene", actionTitle: "60-sec Cooling Breath Technique", actionDesc: "Breathe in through slightly parted teeth, exhale softly through warm mouth to cool heated energy.", icon: FlameBurstIcon },
        ],
      },
      {
        id: "mad",
        name: "Mad",
        feelings: [
          { id: "furious", name: "Furious", targetMood: "Peaceful & Balanced", actionTitle: "60-sec Heat Release Exhale", actionDesc: "Blow out a long, strong stream of air like blowing out a candle 10 feet away. Repeat 5 times.", icon: FlameBurstIcon },
          { id: "enraged", name: "Enraged", targetMood: "Grounded & Composed", actionTitle: "60-sec Physical Grip & Release", actionDesc: "Squeeze your fists tightly for 5 seconds, then deliberately open hands wide and drop shoulders.", icon: FlameBurstIcon },
          { id: "boiling", name: "Boiling", targetMood: "Cool & In Command", actionTitle: "60-sec Cold Water Reset", actionDesc: "Sip cold water slowly or hold an ice cube for 30 seconds to engage the vagus nerve.", icon: FlameBurstIcon },
          { id: "hostile", name: "Hostile", targetMood: "Gentle & Clear", actionTitle: "60-sec Heart Softening Breath", actionDesc: "Visualize softening the tension in your chest. Choose peace over unnecessary conflict.", icon: ShieldDefensiveIcon },
        ],
      },
      {
        id: "resentful",
        name: "Resentful",
        feelings: [
          { id: "bitter", name: "Bitter", targetMood: "Free & Unburdened", actionTitle: "60-sec Forgiveness for Self", actionDesc: "Say: 'I release this bitterness not for them, but so my own soul can be light and free.'", icon: BrokenHeartIcon },
          { id: "betrayed", name: "Betrayed", targetMood: "Healed & Forward-Looking", actionTitle: "60-sec Personal Sanctuary Anchor", actionDesc: "Place your hand on your heart and focus on building your own peaceful tomorrow.", icon: BrokenHeartIcon },
          { id: "grudging", name: "Grudging", targetMood: "Light-Hearted & Open", actionTitle: "60-sec Emotional Declutter Exhale", actionDesc: "Exhale the heavy grievance. Free up valuable mental space for what brings you joy today.", icon: BlockedWallIcon },
          { id: "critical", name: "Critical", targetMood: "Understanding & Kind", actionTitle: "60-sec Compassionate Reframing", actionDesc: "Look at the situation with gentle eyes. Everyone is fighting a hidden battle.", icon: AverseTurnIcon },
        ],
      },
    ],
  },
  Disgusted: {
    name: "Disgusted",
    label: "Disgusted",
    branches: [
      {
        id: "disapproving",
        name: "Disapproving",
        feelings: [
          { id: "judgmental", name: "Judgmental", targetMood: "Open & Gracious", actionTitle: "60-sec Mindful Non-Judgment Breath", actionDesc: "Notice the judgment without acting on it. Breathe in understanding, exhale rigid expectations.", icon: AverseTurnIcon },
          { id: "disappointed", name: "Disappointed", targetMood: "Hopeful & Clear", actionTitle: "60-sec Silver Lining Reframe", actionDesc: "Identify one lesson or hidden opportunity that emerges from this disappointment.", icon: TeardropGriefIcon },
          { id: "appalled", name: "Appalled", targetMood: "Centered & Dignified", actionTitle: "60-sec Core Peace Alignment", actionDesc: "Take 4 slow breaths. Focus on what is noble, pure, and uplifting in your surroundings.", icon: AverseTurnIcon },
          { id: "critical_d", name: "Critical", targetMood: "Gentle & Constructive", actionTitle: "60-sec Encouraging Thought", actionDesc: "Replace one critical thought with one constructive, supportive observation.", icon: AverseTurnIcon },
        ],
      },
      {
        id: "repelled",
        name: "Repelled",
        feelings: [
          { id: "averse", name: "Averse", targetMood: "Fresh & Harmonious", actionTitle: "60-sec Fresh Air Inhale", actionDesc: "Step outside or open a window. Take 3 full breaths of crisp, fresh air.", icon: AverseTurnIcon },
          { id: "hesitant", name: "Hesitant", targetMood: "Confident & Brave", actionTitle: "60-sec Decisive Step", actionDesc: "Commit to taking just one small, clear positive step forward right now.", icon: BlockedWallIcon },
          { id: "uncomfortable", name: "Uncomfortable", targetMood: "Ease & Comfort", actionTitle: "60-sec Physical Realignment", actionDesc: "Change your seating posture, roll your neck gently, and relax all facial muscles.", icon: SpiralOverwhelmedIcon },
          { id: "awful", name: "Awful", targetMood: "Uplifted & Refreshed", actionTitle: "60-sec Pleasant Memory Recall", actionDesc: "Bring to mind a moment of pure laughter or warmth and let it fill your heart.", icon: TeardropGriefIcon },
        ],
      },
    ],
  },
  Bad: {
    name: "Bad",
    label: "Bad / Stressed",
    branches: [
      {
        id: "overwhelmed_b",
        name: "Overwhelmed",
        feelings: [
          { id: "flooded", name: "Flooded", targetMood: "Calm & Organized", actionTitle: "60-sec One Thing at a Time Reset", actionDesc: "Write down the single most important task for today. Ignore everything else for now.", icon: SpiralOverwhelmedIcon },
          { id: "scattered", name: "Scattered", targetMood: "Focused & Clear", actionTitle: "60-sec Center Point Focus", actionDesc: "Stare at one single point in front of you for 30 seconds while breathing rhythmically.", icon: SpiralOverwhelmedIcon },
          { id: "pressured", name: "Pressured", targetMood: "Serene & Unhurried", actionTitle: "60-sec Pace Deceleration", actionDesc: "Intentionally slow down your movement and breathing. You have enough time for what matters.", icon: ShieldDefensiveIcon },
          { id: "too_much", name: "Too Much", targetMood: "Peaceful Simplicity", actionTitle: "60-sec Mental Weight Dump", actionDesc: "Exhale heavily and say: 'I give myself permission to rest and take this one step at a time.'", icon: BatteryDrainedIcon },
        ],
      },
      {
        id: "tired",
        name: "Tired",
        feelings: [
          { id: "drained", name: "Drained", targetMood: "Restored & Recharged", actionTitle: "60-sec Energy Recharging Stretch", actionDesc: "Stand up, interlace fingers behind your back, open your chest, and take 3 deep revitalizing breaths.", icon: BatteryDrainedIcon },
          { id: "exhausted", name: "Exhausted", targetMood: "Gently Supported", actionTitle: "60-sec Restful Eye Relaxation", actionDesc: "Close your eyes, cup warm palms over your eye sockets, and breathe softly for 60 seconds.", icon: BatteryDrainedIcon },
          { id: "burned_out", name: "Burned Out", targetMood: "Renewed & Gentle", actionTitle: "60-sec Guilt-Free Rest Boundary", actionDesc: "Acknowledge your hard work and schedule 15 minutes of uninterrupted rest today.", icon: BatteryDrainedIcon },
          { id: "weary", name: "Weary", targetMood: "Peaceful & Supported", actionTitle: "60-sec Slow Exhale Release", actionDesc: "Let your chair support your entire body weight completely. Surrender tension with each breath.", icon: LonelyHuddledIcon },
        ],
      },
      {
        id: "stressed",
        name: "Stressed",
        feelings: [
          { id: "tense", name: "Tense", targetMood: "Loose & Relaxed", actionTitle: "60-sec Progressive Shoulder Drop", actionDesc: "Shrug shoulders to ears on inhale, then let them drop completely on exhale. Repeat 5 times.", icon: ShieldDefensiveIcon },
          { id: "frantic", name: "Frantic", targetMood: "Still & Centered", actionTitle: "60-sec Stillness Meditation", actionDesc: "Remain completely motionless for 60 seconds, observing your calm natural breath.", icon: MeditatingZenIcon },
          { id: "rushed", name: "Rushed", targetMood: "Deliberate & In Control", actionTitle: "60-sec Gentle Slowdown", actionDesc: "Take 4 slow counts in, 6 slow counts out. Notice that rushing does not create speed.", icon: SpiralOverwhelmedIcon },
          { id: "burdened", name: "Burdened", targetMood: "Light & Capable", actionTitle: "60-sec Release Burden Exhale", actionDesc: "Roll your shoulders back, unclench hands, and visualize the heavy backpack lifting away.", icon: BlockedWallIcon },
        ],
      },
    ],
  },
};

const MAIN_MOOD_FAMILIES: MainMoodFamily[] = ["Sad", "Fearful", "Angry", "Disgusted", "Bad"];

interface HeroSectionExactProps {
  onFlipTriggered?: (mood: string, feeling: string) => void;
  aiData?: {
    reframingQuote?: string;
    actionTitle?: string;
    actionSteps?: string[];
  } | null;
  aiLoading?: boolean;
}

export default function HeroSectionExact({
  onFlipTriggered,
  aiData,
  aiLoading = false,
}: HeroSectionExactProps) {
  // Layer 1 State: Main Mood Family
  const [selectedMood, setSelectedMood] = useState<MainMoodFamily>("Sad");
  
  // Layer 2 State: Second-Layer Feeling Branch
  const [selectedBranchId, setSelectedBranchId] = useState<string>("lonely");
  
  // Layer 3 State: Third-Layer Nuanced Feeling
  const [selectedFeelingId, setSelectedFeelingId] = useState<string>("isolated");
  
  const [timerSeconds, setTimerSeconds] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);

  // Active configurations
  const activeMoodConfig = MOOD_HIERARCHY[selectedMood] || MOOD_HIERARCHY.Sad;
  const activeBranch = activeMoodConfig.branches.find((b) => b.id === selectedBranchId) || activeMoodConfig.branches[0];
  const activeFeeling = activeBranch.feelings.find((f) => f.id === selectedFeelingId) || activeBranch.feelings[0];

  // Timer countdown
  useEffect(() => {
    if (!isTimerRunning || timerSeconds <= 0) return;
    const interval = setInterval(() => {
      setTimerSeconds((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  useEffect(() => {
    if (timerSeconds === 0) {
      setIsTimerRunning(false);
    }
  }, [timerSeconds]);

  // Handler: Select Main Mood Family (Layer 1)
  const handleMoodSelect = (mood: MainMoodFamily) => {
    setSelectedMood(mood);
    const newConfig = MOOD_HIERARCHY[mood];
    if (newConfig && newConfig.branches.length > 0) {
      const firstBranch = newConfig.branches[0];
      setSelectedBranchId(firstBranch.id);
      if (firstBranch.feelings.length > 0) {
        setSelectedFeelingId(firstBranch.feelings[0].id);
      }
    }
  };

  // Handler: Select Feeling Branch (Layer 2)
  const handleBranchSelect = (branchId: string) => {
    setSelectedBranchId(branchId);
    const foundBranch = activeMoodConfig.branches.find((b) => b.id === branchId);
    if (foundBranch && foundBranch.feelings.length > 0) {
      setSelectedFeelingId(foundBranch.feelings[0].id);
    }
  };

  // Handler: Select Exact Feeling (Layer 3)
  const handleFeelingSelect = (feelingId: string) => {
    setSelectedFeelingId(feelingId);
  };

  // Handler: Clear Selection / Reset
  const handleClearSelection = () => {
    setSelectedMood("Sad");
    setSelectedBranchId("lonely");
    setSelectedFeelingId("isolated");
    setTimerSeconds(60);
    setIsTimerRunning(false);
  };

  // Handler: Flip Action
  const handleFlip = () => {
    setIsFlipping(true);
    setTimerSeconds(60);
    setIsTimerRunning(false);

    if (onFlipTriggered) {
      onFlipTriggered(selectedMood, `${activeBranch.name} → ${activeFeeling.name}`);
    }

    setTimeout(() => {
      setIsFlipping(false);
    }, 600);
  };

  // Outcome Display Values
  const displayedTransformedMood =
    aiData?.reframingQuote ? "Peaceful" : activeFeeling.targetMood;

  const displayedActionTitle =
    aiData?.actionTitle || activeFeeling.actionTitle;

  const displayedActionDesc =
    aiData?.actionSteps && aiData.actionSteps.length > 0
      ? aiData.actionSteps.join(" ")
      : activeFeeling.actionDesc;

  return (
    <section className={styles.heroContainer} id="hero-section">
      {/* Top Header / Brand Logo */}
      <div className={styles.topHeader}>
        <img
          src="/moodflip-logo.png"
          alt="MoodFlip"
          className={styles.heroLogoImg}
        />
      </div>

      {/* Main 2-Column Split Section */}
      <div className={styles.splitGrid}>
        {/* Subtle Vertical Divider with center heart */}
        <div className={styles.verticalDivider}>
          <span className={styles.dividerHeart}>{"\u2661"}</span>
        </div>

        {/* LEFT COLUMN: 3-Layer Interactive Selector */}
        <div className={styles.leftColumn}>
          {/* LAYER 1: Choose main mood family */}
          <div className={styles.moodRow}>
            <div className={styles.arrowBadge}>
              <span className={styles.badgeIconCircle}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
                </svg>
              </span>
              <div className={styles.badgeText}>
                <span>1. Mood</span>
                <span>family</span>
              </div>
            </div>

            <div className={styles.cloudList} role="group" aria-label="1. Choose Main Mood Family">
              {MAIN_MOOD_FAMILIES.map((mood) => {
                const isSelected = selectedMood === mood;
                const label = mood === "Bad" ? "Bad" : mood;
                return (
                  <button
                    key={mood}
                    type="button"
                    className={`${styles.cloudBtn} ${isSelected ? styles.cloudBtnSelected : ""}`}
                    onClick={() => handleMoodSelect(mood)}
                    aria-pressed={isSelected}
                  >
                    <span className={styles.cloudInner}>{label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* LAYER 2: Second-Layer Feeling Branch */}
          <div className={styles.branchRow}>
            <div className={styles.arrowBadge}>
              <span className={styles.badgeIconCircle}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </span>
              <div className={styles.badgeText}>
                <span>2. Feeling</span>
                <span>branch</span>
              </div>
            </div>

            <div className={styles.branchList} role="group" aria-label="2. Choose Secondary Feeling Branch">
              {activeMoodConfig.branches.map((branch) => {
                const isSelected = selectedBranchId === branch.id;
                return (
                  <button
                    key={branch.id}
                    type="button"
                    className={`${styles.branchBtn} ${isSelected ? styles.branchBtnSelected : ""}`}
                    onClick={() => handleBranchSelect(branch.id)}
                    aria-pressed={isSelected}
                  >
                    {branch.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* LAYER 3: Exact Nuanced Feeling Cards */}
          <div className={styles.feelingRow}>
            <div className={styles.arrowBadge}>
              <span className={styles.badgeIconCircle}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </span>
              <div className={styles.badgeText}>
                <span>3. Exact</span>
                <span>feeling</span>
              </div>
            </div>

            {/* Visual Feeling Tiles Grid */}
            <div className={styles.feelingGrid} role="radiogroup" aria-label="3. Pick Exact Feeling">
              {activeBranch.feelings.map((feeling) => {
                const isSelected = selectedFeelingId === feeling.id;
                const IconComponent = feeling.icon;
                return (
                  <button
                    key={feeling.id}
                    type="button"
                    className={`${styles.feelingCard} ${isSelected ? styles.feelingCardSelected : ""}`}
                    onClick={() => handleFeelingSelect(feeling.id)}
                    aria-checked={isSelected}
                    role="radio"
                  >
                    <span className={styles.feelingIconWrapper}>
                      <IconComponent />
                    </span>
                    <span className={styles.feelingLabel}>{feeling.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Row 4: Bottom Left Action (Clear selection / Start over) */}
          <div className={styles.leftBottomActions}>
            <button
              type="button"
              className={styles.clearBtn}
              onClick={handleClearSelection}
              aria-label="Clear selection and start over"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.clearIcon}>
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                <line x1="10" y1="11" x2="10" y2="17" />
                <line x1="14" y1="11" x2="14" y2="17" />
              </svg>
              <span className={styles.clearTitle}>Clear selection</span>
              <span className={styles.clearSubtitle}>Start over</span>
            </button>
          </div>
        </div>

        {/* Center Floating 3D Action Arrow ("Change My Mood ->") */}
        <div className={styles.centerCtaWrapper}>
          <button
            type="button"
            className={`${styles.changeMoodBtn} ${isFlipping ? styles.changeMoodBtnFlipping : ""}`}
            onClick={handleFlip}
            disabled={aiLoading}
            aria-label="Change My Mood"
          >
            <div className={styles.changeMoodBtnBevel}>
              <div className={styles.changeMoodInner}>
                <div className={styles.changeMoodLine1}>
                  {aiLoading ? "Thinking..." : "Change"}
                </div>
                <div className={styles.changeMoodLine2}>
                  <span>My Mood</span>
                  <svg className={styles.changeMoodArrowSvg} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="4" y1="12" x2="20" y2="12"></line>
                    <polyline points="13 5 20 12 13 19"></polyline>
                  </svg>
                </div>
              </div>
            </div>
          </button>
        </div>

        {/* RIGHT COLUMN: Transformed Mood Outcome Display */}
        <div
          className={styles.rightColumn}
          style={{
            transform: isFlipping ? "scale(1.01)" : "scale(1)",
            transition: "all 0.4s ease",
          }}
        >
          {/* Landscape Watercolor Illustration Background */}
          <div className={styles.landscapeBg} aria-hidden="true">
            {/* Birds */}
            <svg width="34" height="20" viewBox="0 0 34 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" className={styles.flyingBirds}>
              <path d="M2 10c3-4 6-4 9 0 3-4 6-4 9 0" />
              <path d="M18 5c2-3 4-3 6 0 2-3 4-3 6 0" />
            </svg>

            {/* Sun Dome with Radial Rays */}
            <div className={styles.sunDomeWrapper}>
              <div className={styles.sunDome} />
              <svg className={styles.sunRays} viewBox="0 0 440 240" fill="none" stroke="#ECCB82" strokeWidth="1.4" strokeLinecap="round" strokeDasharray="3 3">
                <line x1="220" y1="20" x2="220" y2="60" />
                <line x1="170" y1="30" x2="185" y2="68" />
                <line x1="270" y1="30" x2="255" y2="68" />
                <line x1="120" y1="55" x2="150" y2="85" />
                <line x1="320" y1="55" x2="290" y2="85" />
                <line x1="80" y1="95" x2="120" y2="115" />
                <line x1="360" y1="95" x2="320" y2="115" />
                <line x1="50" y1="150" x2="95" y2="150" />
                <line x1="390" y1="150" x2="345" y2="150" />
              </svg>
            </div>

            {/* Rolling Pastel Hills */}
            <div className={styles.hillsBack} />
            <div className={styles.hillsFront} />
          </div>

          {/* Outcome Header */}
          <div className={styles.outcomeHeader}>
            <span className={styles.outcomeHeartIcon}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </span>
            <div className={styles.outcomeSubtitle}>Your mood has changed to:</div>
            <h2 className={styles.outcomeMoodTitle}>{displayedTransformedMood}</h2>
          </div>

          {/* Floating 60-Second Action Card */}
          <div className={styles.actionCard}>
            {/* Meditating Lotus Icon Badge */}
            <div className={styles.actionIconBadge} aria-hidden="true">
              <MeditatingZenIcon />
            </div>

            {/* Action Text Content */}
            <div className={styles.actionContent}>
              <h3 className={styles.actionHeading}>{displayedActionTitle}</h3>

              {/* Delicate Heart Divider */}
              <div className={styles.actionDivider}>
                <span className={styles.actionDividerLine} />
                <span className={styles.actionDividerHeart}>{"\u2661"}</span>
                <span className={styles.actionDividerLine} />
              </div>

              <p className={styles.actionDescription}>{displayedActionDesc}</p>

              {/* Interactive 60s Breathing Timer Control */}
              <div className={styles.actionTimerRow}>
                <button
                  type="button"
                  className={styles.actionTimerBtn}
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  aria-label={isTimerRunning ? "Pause timer" : "Start 60-second breathing timer"}
                >
                  <span>{isTimerRunning ? "\u23F8 Pause" : "\u25B6 Start 60s Breath"}</span>
                  <span>({timerSeconds}s)</span>
                </button>

                {timerSeconds < 60 && (
                  <button
                    type="button"
                    style={{
                      background: "none",
                      border: "none",
                      color: "#7464AC",
                      fontSize: "11px",
                      cursor: "pointer",
                      textDecoration: "underline",
                      fontWeight: 700,
                    }}
                    onClick={() => {
                      setTimerSeconds(60);
                      setIsTimerRunning(false);
                    }}
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>

            {/* Botanical Eucalyptus / Olive Leaf Decoration */}
            <div className={styles.leafDecoration} aria-hidden="true">
              <BotanicalBranchSvg />
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM MOTIVATIONAL BANNER */}
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
              <path d="M11 20A7 7 0 0 1 4 13C4 7 11 3 20 3c0 9-4 16-10 17Z" />
              <path d="M4 13c7 0 12-4 16-10" />
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

