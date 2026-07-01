"use client";

import { Coins, Zap, ShieldCheck, TrendingUp } from "lucide-react";
import StatCard from "./StatCard"; 
import MiningAnalyticsPanel from "@/components/MiningAnalyticsPanel";
import EcoinWalletDashboard from "@/components/EcoinWalletDashboard";

interface AnalyticsTabProps {
  stats: {
    myStake: string | number;
    share: string | number;
    totalStaked: string | number;
    totalStakers: string | number;
  };
  pendingUSDT: number;
  pendingEUSD: number;
  usedCapacity: number;
  maxCapacity: number;
  overflow: { totalUSDT: number; totalEUSD: number };
}

export default function AnalyticsTab({
  stats,
  pendingUSDT,
  pendingEUSD,
  usedCapacity,
  maxCapacity,
  overflow,
}: AnalyticsTabProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Meu Depósito" value={stats.myStake} icon={Coins} color="gold" />
        <StatCard label="Ganhos Estimados" value={stats.share} icon={Zap} color="purple" />
        <StatCard label="Depósitos Globais" value={stats.totalStaked} icon={ShieldCheck} color="green" />
        <StatCard label="Mineradores Ativos" value={stats.totalStakers} icon={TrendingUp} color="blue" />
      </div>

      <MiningAnalyticsPanel
        totalRewards={pendingUSDT + pendingEUSD}
        totalGasUsed={usedCapacity}
        efficiency={maxCapacity > 0 ? (usedCapacity / maxCapacity) * 100 : 0}
        sessions={5}
        recycled={overflow.totalUSDT + overflow.totalEUSD}
        apr={148.22}
      />

      <div className="bg-[#0d0d0f] border border-white/5 rounded-3xl p-6">
        <EcoinWalletDashboard />
      </div>
    </div>
  );
}