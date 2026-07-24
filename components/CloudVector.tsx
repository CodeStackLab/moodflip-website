'use client';

import React from 'react';

interface CloudVectorProps {
  type: string;
  color: string;
}

export default function CloudVector({ type, color }: CloudVectorProps) {
  // Enhanced SVG vector expressive cartoon clouds based on Magnific Vector collection
  return (
    <svg className="cloud-vector" viewBox="0 0 100 75" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background Cloud Body */}
      <path
        d="M22 55 C12 55, 6 44, 13 33 C8 22, 22 12, 38 18 C48 6, 68 8, 75 20 C88 16, 96 28, 91 40 C98 48, 92 60, 80 58 Z"
        fill={color}
        fillOpacity="0.25"
        stroke={color}
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      
      {/* 1. SAD CLOUD (Raindrops & Sad Frown) */}
      {type === 'sad' && (
        <g stroke={color} strokeWidth="3" strokeLinecap="round">
          {/* Eyes */}
          <circle cx="36" cy="36" r="2.5" fill={color} />
          <circle cx="64" cy="36" r="2.5" fill={color} />
          {/* Cute Rosy Cheeks */}
          <ellipse cx="28" cy="42" rx="3" ry="1.5" fill="#f43f5e" fillOpacity="0.5" />
          <ellipse cx="72" cy="42" rx="3" ry="1.5" fill="#f43f5e" fillOpacity="0.5" />
          {/* Sad Mouth */}
          <path d="M40 48 Q50 40 60 48" fill="none" />
          {/* Rain Drops falling underneath */}
          <path d="M30 62 Q28 66 30 68 Q32 66 30 62" fill="#60a5fa" />
          <path d="M50 64 Q48 68 50 70 Q52 68 50 64" fill="#60a5fa" />
          <path d="M70 62 Q68 66 70 68 Q72 66 70 62" fill="#60a5fa" />
        </g>
      )}

      {/* 2. DISGUSTED CLOUD (Wavy tongue/mouth & Squeezed Eyes) */}
      {type === 'disgusted' && (
        <g stroke={color} strokeWidth="3" strokeLinecap="round">
          <path d="M30 33 L40 37" />
          <path d="M70 33 L60 37" />
          <circle cx="37" cy="40" r="2" fill={color} />
          <circle cx="63" cy="40" r="2" fill={color} />
          {/* Disgusted Wavy Mouth */}
          <path d="M40 48 Q45 53 50 48 T60 50" fill="none" />
        </g>
      )}

      {/* 3. ANGRY CLOUD (Angled Eyebrows & Lightning Bolt) */}
      {type === 'angry' && (
        <g stroke={color} strokeWidth="3.5" strokeLinecap="round">
          {/* Angry Eyebrows */}
          <path d="M28 30 L42 37" />
          <path d="M72 30 L58 37" />
          <circle cx="36" cy="41" r="2.5" fill={color} />
          <circle cx="64" cy="41" r="2.5" fill={color} />
          {/* Angry Grump Mouth */}
          <path d="M38 52 L62 52" fill="none" />
          {/* Yellow Lightning Bolt overhead */}
          <polygon points="50,2 45,14 51,14 46,24 57,10 51,10" fill="#f59e0b" stroke="#f59e0b" strokeWidth="1" />
        </g>
      )}

      {/* 4. FEARFUL CLOUD (Surprised Wide O-mouth) */}
      {type === 'fearful' && (
        <g stroke={color} strokeWidth="3" strokeLinecap="round">
          {/* Wide Anxious Eyes */}
          <circle cx="36" cy="36" r="4.5" fill="none" />
          <circle cx="36" cy="36" r="1.5" fill={color} />
          <circle cx="64" cy="36" r="4.5" fill="none" />
          <circle cx="64" cy="36" r="1.5" fill={color} />
          {/* O-Mouth */}
          <ellipse cx="50" cy="48" rx="5" ry="4" fill={color} fillOpacity="0.4" />
          {/* Sweat drop */}
          <path d="M74 24 Q72 28 74 30 Q76 28 74 24" fill="#c084fc" />
        </g>
      )}

      {/* 5. BAD CLOUD (Moody Flat Expression) */}
      {type === 'bad' && (
        <g stroke={color} strokeWidth="3" strokeLinecap="round">
          <path d="M30 36 L42 36" />
          <path d="M58 36 L70 36" />
          {/* Flat line mouth */}
          <path d="M40 48 L60 48" fill="none" />
        </g>
      )}
    </svg>
  );
}
