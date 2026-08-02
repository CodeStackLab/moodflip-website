'use client';

import React from 'react';

const TRUST_ITEMS = [
  {
    icon: '🔒',
    title: 'Private & Secure',
    desc: 'Your data is encrypted and protected.',
    bgColor: 'bg-[#EEF2FF]',
    textColor: 'text-[#4F46E5]',
  },
  {
    icon: '🛡️',
    title: '90-Day Auto Delete',
    desc: 'We automatically delete your data after 90 days.',
    bgColor: 'bg-[#ECFDF5]',
    textColor: 'text-[#059669]',
  },
  {
    icon: '❤️',
    title: 'Not Therapy',
    desc: 'MoodFlip is a self-reflection utility, not a medical service.',
    bgColor: 'bg-[#FFF1F2]',
    textColor: 'text-[#E11D48]',
  },
  {
    icon: '👥',
    title: "You're Not Alone",
    desc: 'Millions use MoodFlip for small shifts, every day.',
    bgColor: 'bg-[#EFF6FF]',
    textColor: 'text-[#2563EB]',
  },
  {
    icon: '✨',
    title: 'Made with Care',
    desc: 'Simple tools for a better you, one step at a time.',
    bgColor: 'bg-[#FEF3C7]',
    textColor: 'text-[#D97706]',
  },
];

export default function TrustSection() {
  return (
    <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {TRUST_ITEMS.map((item) => (
        <div
          key={item.title}
          className="flex items-start gap-3 rounded-2xl border border-[#EAE3D6] bg-white p-4 shadow-sm transition hover:shadow-md"
        >
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-bold text-lg ${item.bgColor} ${item.textColor}`}
          >
            {item.icon}
          </div>
          <div>
            <h5 className="text-sm font-bold text-[#2D264B]">{item.title}</h5>
            <p className="mt-1 text-xs text-[#6B638B] leading-relaxed">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
