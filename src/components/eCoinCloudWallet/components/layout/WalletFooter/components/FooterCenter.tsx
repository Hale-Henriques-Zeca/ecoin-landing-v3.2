'use client';

import React from 'react';
import { Zap } from 'lucide-react';

interface FooterCenterProps {
  network?: string;
  gasSponsored?: boolean;
}

export default function FooterCenter({
  network = 'BNB Smart Chain',
  gasSponsored = true
}: FooterCenterProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 text-[10px] md:text-xs select-none">
      {/* Network Badge */}
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.02] border border-white/5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00FF9C]" />
        <span className="font-mono text-neutral-400 font-bold">{network}</span>
      </div>

      {/* Status do ecGas Sponsor */}
      {gasSponsored && (
        <div className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#D4AF37]/5 border border-[#D4AF37]/15 text-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.05)] animate-pulse">
          <Zap size={10} className="fill-[#D4AF37]" />
          <span className="font-mono font-bold tracking-wider uppercase text-[9px]">ecGas Sponsored</span>
        </div>
      )}
    </div>
  );
}