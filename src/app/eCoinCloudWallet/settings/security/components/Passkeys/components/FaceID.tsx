'use client';

import React from 'react';
import { Smartphone, Check } from 'lucide-react';

export default function FaceID() {
  return (
    <div className="bg-neutral-900/40 p-3 rounded-xl border border-white/5 flex items-center justify-between font-mono">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-neutral-800 rounded-lg text-neutral-300">
          <Smartphone size={16} />
        </div>
        <div>
          <span className="text-xs font-bold text-white block">Apple Face ID</span>
          <span className="text-[9px] text-neutral-500">iPhone 15 Pro</span>
        </div>
      </div>
      <Check size={14} className="text-[#00FF9C]" />
    </div>
  );
}