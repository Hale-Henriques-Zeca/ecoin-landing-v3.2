'use client';

import React from 'react';
import { Mail, Check } from 'lucide-react';

export default function EmailVerification() {
  return (
    <div className="bg-neutral-900/40 p-3.5 rounded-xl border border-white/5 flex items-center justify-between font-mono">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-neutral-800 rounded-lg text-neutral-300">
          <Mail size={16} />
        </div>
        <div>
          <span className="text-xs font-bold text-white block">E-mail OTP</span>
          <span className="text-[10px] text-neutral-500">hale@edenkingdom.org</span>
        </div>
      </div>
      <span className="flex items-center gap-1 text-[10px] text-[#00FF9C] bg-[#00FF9C]/10 px-2 py-0.5 rounded border border-[#00FF9C]/20 font-bold">
        <Check size={12} /> Ativo
      </span>
    </div>
  );
}