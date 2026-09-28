'use client';

import React from 'react';
import { Wallet, TrendingUp } from 'lucide-react';
import { useMiningStaking } from '@/hooks/useMiningStaking';

interface UserStakingProps {
  allocatedAssets?: number;
  growthPercentage?: number;
}

export default function UserStaking({
  allocatedAssets,
  growthPercentage = 6.26,
}: UserStakingProps) {
  const mining = useMiningStaking();

  // Patrimônio Alocado (Staked / Assets na Blockchain)
  const actualAllocated = allocatedAssets ?? Number(mining.userStakeFormatted || 0);

  return (
    <div>
      {/* Cabeçalho do Card */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
          <Wallet className="w-3.5 h-3.5 text-[#D4AF37]" />
          Patrimônio Alocado
        </span>
        <span className="px-2 py-0.5 text-[10px] font-bold bg-[#00FF9C]/10 text-[#00FF9C] border border-[#00FF9C]/20 rounded-full flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00FF9C] animate-pulse" />
          LIVE
        </span>
      </div>

      {/* Valor do Patrimônio Alocado & % de Rendimento */}
      <div className="flex items-baseline gap-2 mb-4">
        <span className="text-2xl md:text-4xl font-black tracking-tight text-white">
          ${actualAllocated.toLocaleString('en-US', { minimumFractionDigits: 11, maximumFractionDigits: 11 })}
        </span>
        <span className="text-xs md:text-sm font-bold text-[#00FF9C] flex items-center">
          <TrendingUp className="w-3.5 h-3.5 mr-0.5" />
          +{growthPercentage.toFixed(5)}%
        </span>
      </div>
    </div>
  );
}