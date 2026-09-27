'use client';

import React from 'react';
import { Wallet, TrendingUp, PieChart, Zap } from 'lucide-react';
import { useAccount } from 'wagmi';
import { useMiningStaking } from '@/hooks/useMiningStaking';
import { useEcGas } from '@/hooks/useEcGas';

interface MetricsProps {
  allocatedAssets?: number;
  growthPercentage?: number;
  pppShare?: number;
  csUsdtAmount?: number;
  usedCapacityUsdt?: number;
}

export default function Metrics({
  allocatedAssets,
  growthPercentage = 6.26,
  pppShare,
  csUsdtAmount,
  usedCapacityUsdt,
}: MetricsProps) {
  const { address } = useAccount();
  const mining = useMiningStaking();
  const gas = useEcGas(address);

  // 1. Patrimônio Alocado (Staked / Assets na Blockchain)
  const actualAllocated = allocatedAssets ?? Number(mining.userStakeFormatted || 0);

  // 2. Participação no Pool (PPP) %
  const actualPPP = pppShare ?? (mining.share ?? 0);

  // 3. Cálculo da Capacidade CS Restante (%)
  const actualCsUsdt = csUsdtAmount ?? Number(gas.userGasFormatted || 0);
  const maxCapacity = actualCsUsdt * 1.3; // Teto de 130%
  const actualUsed = usedCapacityUsdt ?? Number(mining.userStakeFormatted || 0);

  // % de Capacidade ainda disponível para mineração
  const remainingCsPercent = maxCapacity > 0
    ? Math.max(0, 100 - (actualUsed / maxCapacity) * 100)
    : 0;

  return (
    <div className="bg-gradient-to-br from-[#12181F] to-[#0D1219] border border-[#D4AF37]/30 rounded-2xl p-4 md:p-6 shadow-xl relative overflow-hidden">
      {/* Efeito Glow Dourado Background */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-full blur-2xl pointer-events-none" />

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
          ${actualAllocated.toLocaleString('en-US', { minimumFractionDigits: 15, maximumFractionDigits: 15 })}
        </span>
        <span className="text-xs md:text-sm font-bold text-[#00FF9C] flex items-center">
          <TrendingUp className="w-3.5 h-3.5 mr-0.5" />
          +{growthPercentage.toFixed(7)}%
        </span>
      </div>

      {/* Métrica Dividida (PPP & CS Restante) */}
      <div className="grid grid-cols-2 gap-2.5 md:gap-4 pt-3 border-t border-gray-800/80">
        {/* Participação Pool (PPP) */}
        <div className="bg-[#0B0E14]/80 p-2.5 md:p-4 rounded-xl border border-gray-800">
          <div className="flex items-center gap-1.5 text-[10px] md:text-xs text-gray-400 mb-1">
            <PieChart className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Participação Pool (PPP)</span>
          </div>
          <span className="text-sm md:text-lg font-extrabold text-[#D4AF37]">
            {actualPPP.toFixed(15)}%
          </span>
        </div>

        {/* Capacidade CS Restante */}
        <div className="bg-[#0B0E14]/80 p-2.5 md:p-4 rounded-xl border border-gray-800">
          <div className="flex items-center gap-1.5 text-[10px] md:text-xs text-gray-400 mb-1">
            <Zap className="w-3.5 h-3.5 text-[#00FF9C]" />
            <span>Capacidade CS Restante</span>
          </div>
          <span className="text-sm md:text-lg font-extrabold text-[#00FF9C]">
            {remainingCsPercent.toFixed(15)}%
          </span>
        </div>
      </div>
    </div>
  );
}