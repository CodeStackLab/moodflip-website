'use client';

import React from 'react';

interface CloudVectorProps {
  type: string;
  color: string;
}

export default function CloudVector({ type, color }: CloudVectorProps) {
  // SVG vector sad/moody cloud styling
  return (
    <svg className="cloud-vector" viewBox="0 0 100 70" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Cloud Base Body */}
      <path
        d="M20 55 C10 55, 5 45, 12 35 C8 25, 20 15, 35 20 C45 8, 65 10, 72 22 C85 18, 95 30, 90 42 C98 50, 90 60, 80 58 Z"
        fill={color}
        fillOpacity="0.2"
        stroke={color}
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      
      {/* Face Expression Expressions according to feeling type */}
      {type === 'sad' && (
        <g stroke={color} strokeWidth="3" strokeLinecap="round">
          <circle cx="35" cy="38" r="2.5" fill={color} />
          <circle cx="65" cy="38" r="2.5" fill={color} />
          {/* Sad Frown */}
          <path d="M40 50 Q50 42 60 50" fill="none" />
          {/* Tear drop */}
          <path d="M35 44 Q33 48 35 50 Q37 48 35 44" fill="#60a5fa" fillOpacity="0.8" />
        </g>
      )}

      {type === 'disgusted' && (
        <g stroke={color} strokeWidth="3" strokeLinecap="round">
          <path d="M30 35 L40 38" />
          <path d="M70 35 L60 38" />
          {/* Wavy mouth */}
          <path d="M40 48 Q45 52 50 48 T60 50" fill="none" />
        </g>
      )}

      {type === 'angry' && (
        <g stroke={color} strokeWidth="3.5" strokeLinecap="round">
          {/* Angry Eyebrows */}
          <path d="M30 32 L42 38" />
          <path d="M70 32 L58 38" />
          <circle cx="36" cy="40" r="2" fill={color} />
          <circle cx="64" cy="40" r="2" fill={color} />
          {/* Angry mouth */}
          <path d="M38 52 L62 52" />
        </g>
      )}

      {type === 'fearful' && (
        <g stroke={color} strokeWidth="3" strokeLinecap="round">
          <circle cx="36" cy="36" r="4" fill="none" />
          <circle cx="64" cy="36" r="4" fill="none" />
          {/* Wide anxious mouth */}
          <ellipse cx="50" cy="48" rx="6" ry="4" fill={color} fillOpacity="0.4" />
        </g>
      )}

      {type === 'bad' && (
        <g stroke={color} strokeWidth="3" strokeLinecap="round">
          <path d="M32 38 L40 38" />
          <path d="M60 38 L68 38" />
          {/* Flat line mouth */}
          <path d="M42 48 L58 48" />
        </g>
      )}
    </svg>
  );
}
