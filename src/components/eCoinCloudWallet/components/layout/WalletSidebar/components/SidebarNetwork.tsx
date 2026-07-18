'use client';

import React from 'react';

export default function SidebarNetwork() {
  return (
    <div className="p-3 rounded-xl bg-white/[0.01] border border-white/5 select-none">
      <div className="flex items-center gap-2.5">
        <div className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF9C] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FF9C]" />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider leading-none">
            REDE ATIVA
          </span>
          <span className="text-[9px] font-mono text-[#00FF9C] font-bold tracking-wide mt-0.5">
            Eden Chain Mainnet
          </span>
        </div>
      </div>
    </div>
  );
}