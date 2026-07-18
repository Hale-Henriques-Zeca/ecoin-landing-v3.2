'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatisticIconProps {
  icon: LucideIcon;
}

export default function StatisticIcon({ icon: Icon }: StatisticIconProps) {
  return (
    <div className="w-7 h-7 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-center shrink-0">
      <Icon size={13} className="text-[#D4AF37]" />
    </div>
  );
}