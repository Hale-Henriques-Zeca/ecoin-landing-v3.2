'use client';

import React from 'react';
import { Cpu } from 'lucide-react';

export default function SidebarHeader() {
  return (
    <div className="h-16 px-6 border-b border-[#D4AF37]/15 flex items-center gap-3 select-none">
      <div className="p-1.5 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#00FF9C]/50 flex items-center justify-center">
        <Cpu size={18} className="text-black stroke-[2.5]" />
      </div>
      <div className="flex flex-col">
        <span className="text-xs font-bold tracking-widest text-[#D4AF37] uppercase">eCoin</span>
        <span className="text-[10px] text-[#00FF9C] font-mono tracking-wider -mt-1 font-bold">
          CLOUD WALLET
        </span>
      </div>
    </div>
  );
}