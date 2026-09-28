'use client';

import React from 'react';
import UserStaking from './Metrics/UserStaking';
import UserShare from './Metrics/UserShare';
import UserProfitCapacity from './Metrics/UserProfitCapacity';

interface MetricsProps {
  allocatedAssets?: number;
  growthPercentage?: number;
  pppShare?: number;
  csUsdtAmount?: number;
  usedCapacityUsdt?: number;
}

export default function Metrics({
  allocatedAssets,
  growthPercentage,
  pppShare,
  csUsdtAmount,
  usedCapacityUsdt,
}: MetricsProps) {
  return (
    <div className="bg-gradient-to-br from-[#12181F] to-[#0D1219] border border-[#D4AF37]/30 rounded-2xl p-4 md:p-6 shadow-xl relative overflow-hidden">
      {/* Efeito Glow Dourado Background */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-full blur-2xl pointer-events-none" />

      {/* 1. Subcomponente: Patrimônio Alocado & Rendimento */}
      <UserStaking
        allocatedAssets={allocatedAssets}
        growthPercentage={growthPercentage}
      />

      {/* Grid de Métricas Divididas */}
      <div className="grid grid-cols-2 gap-2.5 md:gap-4 pt-3 border-t border-gray-800/80">
        {/* 2. Subcomponente: Participação no Pool (PPP) */}
        <UserShare pppShare={pppShare} />

        {/* 3. Subcomponente: Capacidade CS Restante */}
        <UserProfitCapacity
          csUsdtAmount={csUsdtAmount}
          usedCapacityUsdt={usedCapacityUsdt}
        />
      </div>
    </div>
  );
}