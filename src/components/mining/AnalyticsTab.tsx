"use client";

import { Coins, Award, ShieldCheck, Users } from "lucide-react";
import StatCard from "@/components/mining/StatCard";
import MiningAnalyticsPanel from "@/components/MiningAnalyticsPanel";
import EcoinWalletDashboard from "@/components/EcoinWalletDashboard";

interface AnalyticsTabProps {
  stats?: {
    myStake?: string | number;
    share?: string | number;
    totalStaked?: string | number;
    totalStakers?: string | number;
  };
  pendingUSDT?: number;
  pendingEUSD?: number;
  usedCapacity?: number;
  maxCapacity?: number;
  overflow?: {
    totalUSDT?: number;
    totalEUSD?: number;
  };
}

export default function AnalyticsTab({
  stats = {},
  pendingUSDT = 0,
  pendingEUSD = 0,
  usedCapacity = 0,
  maxCapacity = 0,
  overflow = { totalUSDT: 0, totalEUSD: 0 },
}: AnalyticsTabProps) {
  const totalRewards = pendingUSDT + pendingEUSD;
  const efficiency = maxCapacity > 0 ? (usedCapacity / maxCapacity) * 100 : 0;
  const recycled = (overflow.totalUSDT || 0) + (overflow.totalEUSD || 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Minha Retenção"
          value={stats.myStake ?? "0 eCoin"}
          icon={Coins}
          color="gold"
        />
        <StatCard
          label="Quota de Dividendos"
          value={stats.share ?? "0.00%"}
          icon={Award}
          color="purple"
        />
        <StatCard
          label="Retenção Global"
          value={stats.totalStaked ?? "0 eCoin"}
          icon={ShieldCheck}
          color="green"
        />
        <StatCard
          label="Acionistas Ativos"
          value={stats.totalStakers ?? "0"}
          icon={Users}
          color="blue"
        />
      </div>

      <MiningAnalyticsPanel
        totalRewards={totalRewards}
        totalGasUsed={usedCapacity}
        efficiency={efficiency}
        sessions={5}
        recycled={recycled}
        apr={148.22}
      />

      <div className="bg-[#0d0d0f] border border-white/5 rounded-3xl p-6">
        <EcoinWalletDashboard />
      </div>
    </div>
  );
}