'use client';

import React from 'react';
import { Check, ShieldCheck } from 'lucide-react';

export default function GoogleLogin() {
  return (
    <div className="bg-neutral-900/40 p-3 rounded-xl border border-white/5 flex justify-between items-center font-mono">
      <div>
        <span className="text-xs font-bold text-white block">Google Cloud Identity</span>
        <span className="text-[10px] text-neutral-500">hale.dev@gmail.com</span>
      </div>
      <span className="p-1.5 rounded-lg bg-[#00FF9C]/10 text-[#00FF9C]">
        <Check size={14} />
      </span>
    </div>
  );
}