'use client';

import React from 'react';
import { PieChart } from 'lucide-react';
import { useMiningStaking } from '@/hooks/useMiningStaking';

interface UserShareProps {
  pppShare?: number;
}

export default function UserShare({ pppShare }: UserShareProps) {
  const mining = useMiningStaking();

  // Participação no Pool (PPP) %
  const actualPPP = pppShare ?? (mining.share ?? 0);

  return (
    <div className="bg-[#0B0E14]/80 p-2.5 md:p-4 rounded-xl border border-gray-800">
      <div className="flex items-center gap-1.5 text-[10px] md:text-xs text-gray-400 mb-1">
        <PieChart className="w-3.5 h-3.5 text-[#D4AF37]" />
        <span>Participação Pool (PPP)</span>
      </div>
      <span className="text-sm md:text-lg font-extrabold text-[#D4AF37]">
        {actualPPP.toFixed(11)}%
      </span>
    </div>
  );
}