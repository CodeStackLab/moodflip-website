'use client';

import React from 'react';

const TRUST_ITEMS = [
  {
    icon: '🔒',
    title: 'Private & Secure',
    desc: 'Your data is encrypted and protected.',
    bgColor: 'bg-[#F4EBF5]',
    textColor: 'text-[#7464AC]',
  },
  {
    icon: '🛡️',
    title: '90-Day Auto Delete',
    desc: 'We automatically delete your data after 90 days.',
    bgColor: 'bg-[#FCF3E9]',
    textColor: 'text-[#7D8164]',
  },
  {
    icon: '❤️',
    title: 'Not Therapy',
    desc: 'MoodFlip is a self-reflection utility, not medical advice.',
    bgColor: 'bg-[#FAF5F6]',
    textColor: 'text-[#E49C8C]',
  },
  {
    icon: '👥',
    title: "You're Not Alone",
    desc: 'Millions use MoodFlip for small shifts, every day.',
    bgColor: 'bg-[#F4EBF5]',
    textColor: 'text-[#7464AC]',
  },
  {
    icon: '⭐',
    title: 'Made with Care',
    desc: 'Simple tools for a better you, one step at a time.',
    bgColor: 'bg-[#FDE8C8]',
    textColor: 'text-[#EDAA7A]',
  },
];

export default function TrustSection() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
      {TRUST_ITEMS.map((item) => (
        <div
          key={item.title}
          className="flex items-start gap-3 rounded-2xl border border-[#E4DAD7] bg-[#FEFAF8] p-4 shadow-[0_4px_16px_rgba(26,20,63,0.02)] transition-all duration-200 hover:border-[#7666AB] hover:shadow-[0_8px_24px_rgba(116,100,172,0.08)] hover:-translate-y-0.5"
        >
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg ${item.bgColor} ${item.textColor}`}
          >
            {item.icon}
          </div>
          <div>
            <h5 className="text-[13.5px] font-bold text-[#1A143F] font-serif leading-snug">{item.title}</h5>
            <p className="mt-0.5 text-[11.5px] text-[#5C527A] leading-relaxed font-sans">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
