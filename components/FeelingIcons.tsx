import React from 'react';

// Line-art SVG icons matching the reference mockup

export function LonelyIcon({ size = 32, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Crescent moon and star background */}
      <path d="M12 12C12 8.686 14.686 6 18 6C16 8.5 16 11.5 18 14C19.5 16 17 18 14.5 18C13 18 12 15 12 12Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
      <path d="M22 8L22.8 9.6L24.5 9.8L23.2 11L23.6 12.7L22 11.8L20.4 12.7L20.8 11L19.5 9.8L21.2 9.6L22 8Z" fill={color} opacity="0.4" />
      {/* Sitting person curled up holding knees */}
      <circle cx="26" cy="21" r="4.5" stroke={color} strokeWidth="2" />
      <path d="M26 25.5V36" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {/* Bent legs holding knees */}
      <path d="M26 36C26 36 33 34 33 29C33 26 29 27 26 28.5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Arm hugging knee */}
      <path d="M26 28C26 28 31 28 30 32" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function RejectedIcon({ size = 32, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Sad face outline */}
      <circle cx="24" cy="24" r="16" stroke={color} strokeWidth="2" />
      {/* Sad eyes */}
      <circle cx="18" cy="20" r="1.5" fill={color} />
      <circle cx="30" cy="20" r="1.5" fill={color} />
      {/* Downward mouth */}
      <path d="M17 31C19.5 28.5 28.5 28.5 31 31" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {/* Small X badge on lower right */}
      <circle cx="34" cy="34" r="6" fill="#ffffff" stroke={color} strokeWidth="2" />
      <path d="M31.5 31.5L36.5 36.5M36.5 31.5L31.5 36.5" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function HurtIcon({ size = 32, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Broken heart outline with zig-zag fracture line */}
      <path d="M24 38C24 38 10 29.5 10 18C10 12.5 14.5 8 20 8C23.2 8 26 9.8 27.5 12.5" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M27.5 12.5C29 9.8 31.8 8 35 8C40.5 8 45 12.5 45 18C45 29.5 31 38 31 38" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {/* Jagged fracture line down middle */}
      <path d="M24 10L22 17L26 23L21 29L24 35" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function AshamedIcon({ size = 32, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Person bowing head with hands covering eyes/face */}
      <circle cx="24" cy="14" r="5" stroke={color} strokeWidth="2" />
      <path d="M15 38C15 30 19 24 24 24C29 24 33 30 33 38" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {/* Hands crossing over face */}
      <path d="M17 22L22 14M31 22L26 14" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function GuiltyIcon({ size = 32, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Rain cloud over head */}
      <path d="M16 14C14 14 12 16 12 18C12 18.5 12.1 19 12.3 19.5C10.9 20.1 10 21.4 10 23C10 25.2 11.8 27 14 27H30C32.2 27 34 25.2 34 23C34 21.2 32.8 19.7 31.1 19.2C30.9 16.3 28.5 14 25.5 14C24.8 14 24.1 14.1 23.5 14.4C22.4 12.3 20.3 11 17.8 11" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      {/* Rain drops falling */}
      <path d="M16 29.5V32M22 29.5V32.5M28 29.5V32" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      {/* Person looking down under rain */}
      <circle cx="22" cy="38" r="3.5" stroke={color} strokeWidth="1.8" />
      <path d="M16 45C16 41.5 18.5 39.5 22 39.5C25.5 39.5 28 41.5 28 45" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function EmptyIcon({ size = 32, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Head and torso outline */}
      <circle cx="24" cy="14" r="5" stroke={color} strokeWidth="2" />
      <path d="M13 38C13 29 18 24 24 24C30 24 35 29 35 38" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {/* Dashed empty circle in chest */}
      <circle cx="24" cy="31" r="4.5" stroke={color} strokeWidth="1.8" strokeDasharray="3 2" />
    </svg>
  );
}

export function OverwhelmedIcon({ size = 32, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Chaotic swirl above head */}
      <path d="M18 14C18 10 22 8 25 10C28 12 24 16 21 15C19 14 20 11 23 11C27 11 29 14 27 17C25 20 20 19 19 17" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      {/* Head and torso outline */}
      <circle cx="24" cy="24" r="5" stroke={color} strokeWidth="2" />
      <path d="M13 44C13 36 18 32 24 32C30 32 35 36 35 44" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function AbandonedIcon({ size = 32, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Person inside outer dashed circle */}
      <circle cx="24" cy="16" r="4.5" stroke={color} strokeWidth="2" />
      <path d="M15 36C15 29 19 25 24 25C29 25 33 29 33 36" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {/* Dashed outer boundary circle surrounding the person */}
      <circle cx="24" cy="25" r="17" stroke={color} strokeWidth="1.8" strokeDasharray="4 3" opacity="0.65" />
    </svg>
  );
}

export function TrashIcon({ size = 26, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 6H21M19 6V20C19 21.1046 18.1046 22 17 22H7C5.89543 22 5 21.1046 5 20V6M8 6V4C8 2.89543 8.89543 2 10 2H14C15.1046 2 16 2.89543 16 4V6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 11V17M14 11V17" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function MeditateIcon({ size = 34, color = '#2e5a3c' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Lotus pose meditating person */}
      <circle cx="24" cy="13" r="4" stroke={color} strokeWidth="2" />
      <path d="M24 17V27" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {/* Arms resting on knees */}
      <path d="M24 22L16 27L12 25M24 22L32 27L36 25" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Crossed legs lotus position */}
      <path d="M12 33C12 33 16 36 24 36C32 36 36 33 36 33" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {/* Small heart above meditating head */}
      <path d="M24 6C23 4.5 21.5 4.5 21 5.5C20.5 6.5 22 8.5 24 9.5C26 8.5 27.5 6.5 27 5.5C26.5 4.5 25 4.5 24 6Z" fill={color} opacity="0.8" />
    </svg>
  );
}

export function BotanicalSprig({ size = 48, color = '#4a7c59' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Elegant leaf sprig / branch */}
      <path d="M10 54C20 45 32 32 50 10" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M50 10C42 12 36 18 34 26C38 24 45 18 50 10Z" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M40 22C32 21 26 26 23 32C28 32 35 28 40 22Z" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M30 33C22 31 16 35 13 41C18 41 25 38 30 33Z" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M46 15C48 23 54 27 60 28C59 21 53 16 46 15Z" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M36 27C37 34 43 38 48 39C47 32 42 28 36 27Z" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}
