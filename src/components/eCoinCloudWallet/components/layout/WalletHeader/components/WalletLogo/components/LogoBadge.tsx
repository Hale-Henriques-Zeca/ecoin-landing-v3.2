'use client';

import React from 'react';

export type BadgeType = 'BETA' | 'PRO' | 'DEV' | 'NONE';

interface LogoBadgeProps {
  type?: BadgeType;
  text?: string;
}

export default function LogoBadge({ type = 'BETA', text }: LogoBadgeProps) {
  if (type === 'NONE') return null;

  const config = {
    BETA: {
      bg: 'bg-[#00FF9C]/5 border-[#00FF9C]/20',
      text: 'text-[#00FF9C]',
      label: 'BETA'
    },
    PRO: {
      bg: 'bg-[#D4AF37]/5 border-[#D4AF37]/20',
      text: 'text-[#D4AF37]',
      label: 'PRO'
    },
    DEV: {
      bg: 'bg-blue-500/5 border-blue-500/20',
      text: 'text-blue-400',
      label: 'DEV'
    }
  };

  const active = config[type] || config.BETA;
  const displayText = text || active.label;

  return (
    <div className={`
      px-1.5 py-0.5 rounded text-[8px] font-mono font-bold tracking-widest border uppercase shrink-0 select-none
      ${active.bg} ${active.text}
    `}>
      {displayText}
    </div>
  );
}