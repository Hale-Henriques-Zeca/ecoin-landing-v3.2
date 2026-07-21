'use client';

import React from 'react';

export default function DailyLimit() {
  return (
    <div className="bg-neutral-900/40 p-3 rounded-xl border border-white/5 flex items-center justify-between font-mono">
      <div>
        <span className="text-xs font-bold text-white block">Limite Diário Padrão</span>
        <span className="text-[10px] text-neutral-500">Teto máximo sem aprovação multisig</span>
      </div>
      <span className="text-xs font-bold text-[#D4AF37]">$10,000.00</span>
    </div>
  );
}