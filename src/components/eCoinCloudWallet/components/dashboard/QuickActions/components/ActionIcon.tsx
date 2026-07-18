'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ActionIconProps {
  icon: LucideIcon;
}

export default function ActionIcon({ icon: Icon }: ActionIconProps) {
  return (
    <div className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center transition-all duration-300 group-hover:border-[#D4AF37]/40 group-hover:bg-[#D4AF37]/5 group-hover:scale-105 group-active:scale-95">
      <Icon size={16} className="text-neutral-400 group-hover:text-[#D4AF37] transition-colors" />
    </div>
  );
}