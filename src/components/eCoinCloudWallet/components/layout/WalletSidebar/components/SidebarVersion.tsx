'use client';

import React from 'react';

export default function SidebarVersion() {
  return (
    <div className="flex items-center justify-between text-[9px] font-mono font-bold text-neutral-500 uppercase tracking-widest select-none">
      <span>Versão</span>
      <span className="text-[#00FF9C] bg-[#00FF9C]/5 px-1.5 py-0.5 rounded border border-[#00FF9C]/10">
        v1.2.0-Alpha
      </span>
    </div>
  );
}