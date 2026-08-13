'use client';

import React, { useState, useEffect } from 'react';

export default function BoxBreathingWidget() {
  const [mode, setMode] = useState<'box' | 'timer'>('box');
  const [timerPreset, setTimerPreset] = useState<number>(60); // 60s default
  const [secondsRemaining, setSecondsRemaining] = useState<number>(60);
  const [isActive, setIsActive] = useState(false);
  const [tick, setTick] = useState(0);

  // 1-second interval timer driving single integer 'tick' or timer countdown
  useEffect(() => {
    if (!isActive) {
      return;
    }

    const timer = setInterval(() => {
      setTick((t) => t + 1);
      if (mode === 'timer') {
        setSecondsRemaining((s) => {
          if (s <= 1) {
            setIsActive(false);
            return timerPreset;
          }
          return s - 1;
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, mode, timerPreset]);

  // Derive phase index & remaining seconds mathematically from 'tick'
  const currentPhaseIndex = Math.floor((tick % 16) / 4);
  const secondsLeft = 4 - (tick % 4);

  const getPhaseText = () => {
    if (mode === 'timer') {
      return isActive ? (secondsRemaining % 8 < 4 ? 'BREATHE IN' : 'BREATHE OUT') : `${timerPreset}s RESET`;
    }
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
    if (mode === 'timer') {
      return isActive
        ? `Rhythmic breathing reset: ${secondsRemaining}s remaining`
        : `Click start for ${timerPreset}-second deep breathing reset`;
    }
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
    if (mode === 'timer') {
      return 'from-[#7147E8] to-[#9333EA] text-white shadow-purple-300';
    }
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

  const getScaleStyle = (): React.CSSProperties => {
    if (!isActive) {
      return { transform: 'scale(0.88)', transition: 'none' };
    }

    if (mode === 'timer') {
      const isInhale = secondsRemaining % 8 < 4;
      return {
        transform: isInhale ? 'scale(1.2)' : 'scale(0.88)',
        transition: 'transform 3950ms cubic-bezier(0.4, 0, 0.2, 1)'
      };
    }

    if (currentPhaseIndex === 0) {
      return {
        transform: 'scale(1.2)',
        transition: 'transform 3950ms cubic-bezier(0.4, 0, 0.2, 1)'
      };
    }

    if (currentPhaseIndex === 1 || currentPhaseIndex === 3) {
      return {
        transform: currentPhaseIndex === 1 ? 'scale(1.2)' : 'scale(0.88)',
        transition: 'none'
      };
    }

    if (currentPhaseIndex === 2) {
      return {
        transform: 'scale(0.88)',
        transition: 'transform 3950ms cubic-bezier(0.4, 0, 0.2, 1)'
      };
    }

    return { transform: 'scale(0.88)', transition: 'none' };
  };

  const handleReset = () => {
    setIsActive(false);
    setTick(0);
    setSecondsRemaining(timerPreset);
  };

  const selectTimerPreset = (duration: number) => {
    setMode('timer');
    setTimerPreset(duration);
    setSecondsRemaining(duration);
    setIsActive(false);
    setTick(0);
  };

  return (
    <div className="flex flex-col items-center justify-center p-3.5 sm:p-7 bg-gradient-to-b from-[#FAF8FD] to-[#F3EFFE] border border-[#EAE3F2] rounded-2xl sm:rounded-3xl my-3 text-center space-y-4 select-none w-full max-w-2xl mx-auto shadow-xs">
      
      {/* ULTRA RESPONSIVE HEADER */}
      <div className="flex flex-col items-center gap-2.5 w-full text-xs font-black text-[#5B5278] border-b border-purple-100/80 pb-3">
        <span className="flex items-center gap-1.5 text-sm sm:text-base font-extrabold text-[#1A1338] whitespace-nowrap">
          <span>🧘</span> <span>Mindset &amp; Mood Breath Guide</span>
        </span>
        
        {/* TIMER DURATION PRESET SLIDER PILLS */}
        <div className="flex items-center justify-center bg-[#EAE3F2] p-1 rounded-2xl gap-1 w-full max-w-full overflow-x-auto">
          <button
            type="button"
            onClick={() => { setMode('box'); handleReset(); }}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap font-extrabold text-xs shrink-0 active:scale-95 ${mode === 'box' ? 'bg-[#7147E8] text-white shadow-xs' : 'text-[#5B5278] hover:text-[#1A1338]'}`}
          >
            4-4-4-4 Box
          </button>
          {[30, 60, 90, 120].map((dur) => (
            <button
              key={dur}
              type="button"
              onClick={() => selectTimerPreset(dur)}
              className={`px-2.5 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap font-extrabold text-xs shrink-0 active:scale-95 ${mode === 'timer' && timerPreset === dur ? 'bg-[#7147E8] text-white shadow-xs' : 'text-[#5B5278] hover:text-[#1A1338]'}`}
            >
              {dur}s
            </button>
          ))}
        </div>
      </div>

      {/* Animated Circle Container - Scaled for Mobile & Desktop */}
      <div className="relative w-40 h-40 sm:w-48 sm:h-48 flex items-center justify-center my-1 shrink-0">
        {/* Outer Glow Ring */}
        <div
          style={getScaleStyle()}
          className={`absolute inset-0 rounded-full bg-gradient-to-br ${getPhaseColor()} opacity-25 blur-xl`}
        />

        {/* Main Solid Circle */}
        <div
          style={getScaleStyle()}
          className={`w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br ${getPhaseColor()} flex flex-col items-center justify-center shadow-lg cursor-pointer select-none`}
          onClick={() => setIsActive((prev) => !prev)}
        >
          <span className="text-[11px] sm:text-xs font-extrabold tracking-wider uppercase opacity-95 text-center px-2 whitespace-nowrap">
            {getPhaseText()}
          </span>
          <span className="text-3xl sm:text-4xl font-black mt-0.5">
            {mode === 'box' ? secondsLeft : (isActive ? secondsRemaining : `${timerPreset}s`)}
          </span>
        </div>
      </div>

      {/* Action Controls & Subtext */}
      <div className="space-y-2 w-full max-w-sm">
        <div className="flex items-center gap-2 justify-center">
          <button
            type="button"
            onClick={() => setIsActive((prev) => !prev)}
            className={`w-full sm:w-auto px-6 sm:px-8 py-3 rounded-xl sm:rounded-full text-xs sm:text-sm font-extrabold transition-all cursor-pointer shadow-md active:scale-95 ${
              isActive
                ? 'bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100'
                : 'bg-[#7147E8] text-white hover:bg-[#5f38d4] hover:scale-105'
            }`}
          >
            {isActive ? '⏸ Pause Breathing' : (mode === 'box' ? '▶ Start 4-4-4-4 Box Breathing' : `▶ Start ${timerPreset}s Action Reset`)}
          </button>

          {isActive && (
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-3 rounded-xl sm:rounded-full text-xs font-extrabold bg-gray-200 text-[#5B5278] hover:bg-gray-300 transition-all cursor-pointer shrink-0 active:scale-95"
              title="Reset Timer"
            >
              🔄
            </button>
          )}
        </div>

        <p className="text-[11px] sm:text-xs text-gray-500 font-semibold pt-0.5 leading-relaxed px-2">
          {isActive ? getPhaseSubText() : (mode === 'box' ? 'Click start to practice 4-4-4-4 box breathing' : `Click start for ${timerPreset}-second deep breathing reset`)}
        </p>
      </div>
    </div>
  );
}
