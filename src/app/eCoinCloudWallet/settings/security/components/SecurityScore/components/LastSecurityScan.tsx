'use client';

import React from 'react';
import { Clock } from 'lucide-react';

export default function LastSecurityScan({ date }: { date: string }) {
  return (
    <div className="flex items-center gap-1.5 text-[10px] text-neutral-500 font-mono">
      <Clock size={11} className="text-[#D4AF37]" />
      <span>Último scan: {date}</span>
    </div>
  );
}