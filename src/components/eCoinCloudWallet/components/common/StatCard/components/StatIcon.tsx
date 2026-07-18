'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatIconProps {
  icon?: LucideIcon;
}

export default function StatIcon({ icon: Icon }: StatIconProps) {
  if (!Icon) return null;
  return (
    <div className="w-8 h-8 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-center shrink-0">
      <Icon size={14} className="text-[#D4AF37]" />
    </div>
  );
}