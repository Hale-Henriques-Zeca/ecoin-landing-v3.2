'use client';

import React from 'react';
import { Inbox } from 'lucide-react';

export default function EmptyIcon() {
  return (
    <div className="relative w-16 h-16 rounded-2xl bg-white/[0.01] border border-white/5 flex items-center justify-center shrink-0">
      <div className="absolute inset-0 bg-gradient-to-tr from-[#D4AF37]/5 via-transparent to-[#00FF9C]/5 rounded-2xl opacity-50" />
      <Inbox size={26} className="text-neutral-600 relative z-10" />
    </div>
  );
}