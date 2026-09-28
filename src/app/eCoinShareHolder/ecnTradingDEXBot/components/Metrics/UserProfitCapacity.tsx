'use client';

import React from 'react';
import { Zap } from 'lucide-react';
import { useAccount } from 'wagmi';
import { useMiningStaking } from '@/hooks/useMiningStaking';
import { useEcGas } from '@/hooks/useEcGas';

interface UserProfitCapacityProps {
  csUsdtAmount?: number;
  usedCapacityUsdt?: number;
}

export default function UserProfitCapacity({
  csUsdtAmount,
  usedCapacityUsdt,
}: UserProfitCapacityProps) {
  const { address } = useAccount();
  const mining = useMiningStaking();
  const gas = useEcGas(address);

  // Cálculo da Capacidade CS Restante (%)
  const actualCsUsdt = csUsdtAmount ?? Number(gas.userGasFormatted || 0);
  const maxCapacity = actualCsUsdt * 1.3; // Teto de 130%
  const actualUsed = usedCapacityUsdt ?? Number(mining.userStakeFormatted || 0);

  // % de Capacidade ainda disponível para mineração
  const remainingCsPercent = maxCapacity > 0
    ? Math.max(0, 100 - (actualUsed / maxCapacity) * 100)
    : 0;

  return (
    <div className="bg-[#0B0E14]/80 p-2.5 md:p-4 rounded-xl border border-gray-800">
      <div className="flex items-center gap-1.5 text-[10px] md:text-xs text-gray-400 mb-1">
        <Zap className="w-3.5 h-3.5 text-[#00FF9C]" />
        <span>Capacidade CS Restante</span>
      </div>
      <span className="text-sm md:text-lg font-extrabold text-[#00FF9C]">
        {remainingCsPercent.toFixed(11)}%
      </span>
    </div>
  );
}