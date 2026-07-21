'use client';

import React from 'react';
import { Laptop, Check } from 'lucide-react';

export default function TouchID() {
  return (
    <div className="bg-neutral-900/40 p-3 rounded-xl border border-white/5 flex items-center justify-between font-mono">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-neutral-800 rounded-lg text-neutral-300">
          <Laptop size={16} />
        </div>
        <div>
          <span className="text-xs font-bold text-white block">MacBook Touch ID</span>
          <span className="text-[9px] text-neutral-500">MacBook Air M2</span>
        </div>
      </div>
      <Check size={14} className="text-[#00FF9C]" />
    </div>
  );
}