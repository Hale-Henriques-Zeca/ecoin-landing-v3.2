'use client';

import React from 'react';

export default function SidebarUser() {
  // Mock de dados para manter o visual premium e representativo
  const username = "Edenit Developer";
  const tier = "Diamond Node";

  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-[#080808] border border-[#D4AF37]/15 select-none shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
      {/* Avatar do Node Miner */}
      <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#D4AF37]/35 to-black border border-[#D4AF37]/40 flex items-center justify-center font-bold text-[10px] text-[#D4AF37]">
        ED
      </div>
      
      <div className="flex flex-col flex-1 min-w-0">
        <span className="text-[11px] font-bold text-neutral-200 truncate leading-none">
          {username}
        </span>
        <span className="text-[9px] text-[#D4AF37] tracking-wider uppercase font-extrabold mt-1">
          {tier}
        </span>
      </div>
    </div>
  );
}