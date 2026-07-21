'use client';

import React from 'react';
import { Check } from 'lucide-react';

export default function PhoneLogin() {
  return (
    <div className="bg-neutral-900/40 p-3 rounded-xl border border-white/5 flex justify-between items-center font-mono">
      <div>
        <span className="text-xs font-bold text-white block">Telefone 2FA</span>
        <span className="text-[10px] text-neutral-500">+258 84 *** *890</span>
      </div>
      <span className="p-1.5 rounded-lg bg-[#00FF9C]/10 text-[#00FF9C]">
        <Check size={14} />
      </span>
    </div>
  );
}