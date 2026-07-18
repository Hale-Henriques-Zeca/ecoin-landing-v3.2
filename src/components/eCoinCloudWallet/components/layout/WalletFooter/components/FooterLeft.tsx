'use client';

import React from 'react';

export default function FooterLeft() {
  return (
    <div className="flex flex-col select-none">
      <div className="flex items-center gap-1.5">
        <span className="text-xs font-bold text-[#D4AF37] tracking-wider uppercase">eCoin</span>
        <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Cloud Wallet</span>
      </div>
      <p className="text-[10px] text-neutral-500 font-mono mt-0.5">
        © 2026 EdenKingdom. Todos os direitos reservados.
      </p>
    </div>
  );
}