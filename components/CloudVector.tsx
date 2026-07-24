'use client';

import React from 'react';

interface CloudVectorProps {
  type: string;
  color: string;
}

export default function CloudVector({ type, color }: CloudVectorProps) {
  return (
    <svg className="cloud-vector" viewBox="0 0 100 70" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Cloud Shape Outer Contour */}
      <path
        d="M22 50 C12 50, 6 40, 13 30 C8 20, 22 10, 38 16 C48 5, 68 7, 75 18 C88 14, 96 26, 91 38 C98 45, 92 56, 80 54 Z"
        fill="#f8f4fd"
        stroke={color}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {type === 'sad' && (
        <g stroke={color} strokeWidth="2.2" strokeLinecap="round">
          <circle cx="36" cy="34" r="2" fill={color} />
          <circle cx="64" cy="34" r="2" fill={color} />
          <path d="M42 44 Q50 38 58 44" fill="none" />
        </g>
      )}

      {type === 'fearful' && (
        <g stroke={color} strokeWidth="2.2" strokeLinecap="round">
          <circle cx="36" cy="34" r="3.5" fill="none" />
          <circle cx="36" cy="34" r="1.2" fill={color} />
          <circle cx="64" cy="34" r="3.5" fill="none" />
          <circle cx="64" cy="34" r="1.2" fill={color} />
          <ellipse cx="50" cy="44" rx="4" ry="3" fill={color} fillOpacity="0.3" />
        </g>
      )}

      {type === 'angry' && (
        <g stroke={color} strokeWidth="2.5" strokeLinecap="round">
          <path d="M30 28 L42 34" />
          <path d="M70 28 L58 34" />
          <circle cx="37" cy="38" r="2" fill={color} />
          <circle cx="63" cy="38" r="2" fill={color} />
          <path d="M40 47 L60 47" fill="none" />
        </g>
      )}

      {type === 'disgusted' && (
        <g stroke={color} strokeWidth="2.2" strokeLinecap="round">
          <path d="M32 30 L40 34" />
          <path d="M68 30 L60 34" />
          <circle cx="37" cy="37" r="1.8" fill={color} />
          <circle cx="63" cy="37" r="1.8" fill={color} />
          <path d="M40 45 Q45 50 50 45 T60 47" fill="none" />
        </g>
      )}

      {type === 'bad' && (
        <g stroke={color} strokeWidth="2.2" strokeLinecap="round">
          <path d="M32 34 L42 34" />
          <path d="M58 34 L68 34" />
          <path d="M42 44 L58 44" fill="none" />
        </g>
      )}
    </svg>
  );
}
