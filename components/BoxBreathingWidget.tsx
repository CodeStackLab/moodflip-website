'use client';

import React, { useState, useEffect } from 'react';

export default function BoxBreathingWidget() {
  const [isActive, setIsActive] = useState(false);
  const [tick, setTick] = useState(0);

  // 1-second interval timer driving single integer 'tick'
  useEffect(() => {
    if (!isActive) {
      setTick(0);
      return;
    }

    const timer = setInterval(() => {
      setTick((t) => t + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive]);

  // Derive phase index & remaining seconds mathematically from 'tick'
  // Phase 0 (0-3s): Breathe In
  // Phase 1 (4-7s): Breath Hold 1
  // Phase 2 (8-11s): Breathe Out
  // Phase 3 (12-15s): Breath Hold 2
  const currentPhaseIndex = Math.floor((tick % 16) / 4);
  const secondsLeft = 4 - (tick % 4);

  const getPhaseText = () => {
    switch (currentPhaseIndex) {
      case 0:
        return 'BREATHE IN';
      case 1:
        return 'BREATH HOLD';
      case 2:
        return 'BREATHE OUT';
      case 3:
        return 'BREATH HOLD';
      default:
        return 'BREATHE IN';
    }
  };

  const getPhaseSubText = () => {
    switch (currentPhaseIndex) {
      case 0:
        return 'Breathe In slowly for 4 seconds';
      case 1:
        return 'Hold your breath for 4 seconds';
      case 2:
        return 'Breathe Out slowly for 4 seconds';
      case 3:
        return 'Hold your breath for 4 seconds';
      default:
        return 'Click start to practice 4-4-4-4 box breathing';
    }
  };

  const getPhaseColor = () => {
    switch (currentPhaseIndex) {
      case 0:
        return 'from-[#8C60F7] to-[#7147E8] text-white shadow-purple-300';
      case 1:
        return 'from-[#F472B6] to-[#EC4899] text-white shadow-pink-300';
      case 2:
        return 'from-[#FBBF24] to-[#F59E0B] text-white shadow-amber-300';
      case 3:
        return 'from-[#34D399] to-[#10B981] text-white shadow-emerald-300';
      default:
        return 'from-[#8C60F7] to-[#7147E8] text-white shadow-purple-300';
    }
  };

  // Dynamic Scale Style:
  // Phase 0 (Breathe In): scale(0.85) -> scale(1.22) over 4000ms
  // Phase 1 (Hold 1): scale(1.22) fixed (no scale animation)
  // Phase 2 (Breathe Out): scale(1.22) -> scale(0.85) over 4000ms
  // Phase 3 (Hold 2): scale(0.85) fixed (no scale animation)
  const getScaleStyle = (): React.CSSProperties => {
    if (!isActive) {
      return { transform: 'scale(0.85)', transition: 'none' };
    }

    if (currentPhaseIndex === 0) {
      return {
        transform: 'scale(1.22)',
        transition: 'transform 3950ms cubic-bezier(0.4, 0, 0.2, 1)'
      };
    }

    if (currentPhaseIndex === 1) {
      return {
        transform: 'scale(1.22)',
        transition: 'none'
      };
    }

    if (currentPhaseIndex === 2) {
      return {
        transform: 'scale(0.85)',
        transition: 'transform 3950ms cubic-bezier(0.4, 0, 0.2, 1)'
      };
    }

    // Phase 3: Hold 2
    return {
      transform: 'scale(0.85)',
      transition: 'none'
    };
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#FAF8FD] to-[#F3EFFE] border border-[#EAE3F2] rounded-3xl my-4 text-center space-y-4 select-none">
      <div className="flex items-center justify-between w-full max-w-xs text-xs font-black text-[#5B5278]">
        <span>🧘 Box Breathing Guide</span>
        <span className="bg-purple-100 text-[#7147E8] px-2.5 py-0.5 rounded-full text-[10px] font-extrabold">4s - 4s - 4s - 4s</span>
      </div>

      {/* Animated Circle Container */}
      <div className="relative w-44 h-44 flex items-center justify-center my-2">
        {/* Outer Glow Ring */}
        <div
          style={getScaleStyle()}
          className={`absolute inset-0 rounded-full bg-gradient-to-br ${getPhaseColor()} opacity-25 blur-xl`}
        />

        {/* Main Solid Circle */}
        <div
          style={getScaleStyle()}
          className={`w-36 h-36 rounded-full bg-gradient-to-br ${getPhaseColor()} flex flex-col items-center justify-center shadow-lg cursor-pointer select-none`}
          onClick={() => setIsActive((prev) => !prev)}
        >
          <span className="text-xs font-extrabold tracking-wider uppercase opacity-95 text-center px-2">
            {getPhaseText()}
          </span>
          <span className="text-3xl font-black mt-1">
            {secondsLeft}
          </span>
        </div>
      </div>

      <div className="space-y-1">
        <button
          onClick={() => setIsActive((prev) => !prev)}
          className={`px-5 py-2 rounded-2xl text-xs font-black transition-all cursor-pointer ${
            isActive
              ? 'bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100'
              : 'bg-[#7147E8] text-white shadow-md shadow-[#7147E8]/30 hover:scale-105'
          }`}
        >
          {isActive ? '⏸ Pause Breathing' : '▶ Start 4-4-4-4 Box Breathing'}
        </button>
        <p className="text-[11px] text-gray-500 font-medium pt-1">
          {isActive ? getPhaseSubText() : 'Click start to practice 4-4-4-4 box breathing'}
        </p>
      </div>
    </div>
  );
}
