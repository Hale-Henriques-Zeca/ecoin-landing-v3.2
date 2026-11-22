"use client";

import React from "react";
import { TrendingUp, Users, ShieldCheck, Award } from "lucide-react";
import { useAccount, useReadContract } from "wagmi";
import { formatUnits } from "viem";
import { CONTRACTS } from "@/lib/contracts/contracts";

// Abis da eDollar & USDT
import { eDollarMiningStakingAbi } from "@/lib/abis/eDollarMining/eDollarMiningStakingAbi";
import { eDollarEcGasSaleAbi } from "@/lib/abis/eDollarMining/eDollarEcGasSaleAbi";

// Contexts & Hooks da eDollar
import { useTransactionStateeDollar } from "@/hooks/eDollarMining/useTransactionStateeDollar";
import { useMiningStakingeDollar } from "@/hooks/eDollarMining/useMiningStakingeDollar";
import { useRewardStreamingeDollar } from "@/hooks/eDollarMining/useRewardStreamingeDollar";
import { useOverflowAnalyticseDollar } from "@/hooks/eDollarMining/useOverflowAnalyticseDollar";
import { useMiningFeeCollectoreDollar } from "@/hooks/eDollarMining/useMiningFeeCollectoreDollar";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  color?: "green" | "blue" | "gold" | "purple";
}

function StatCard({ label, value, icon: Icon, color = "gold" }: StatCardProps) {
  const colorMap = {
    green: {
      text: "text-emerald-400",
      bgGlow: "from-emerald-500/10",
      iconBg: "from-emerald-500/20 to-emerald-500/5 border-emerald-500/20",
      hoverBorder: "hover:border-emerald-500/40",
      shadow: "hover:shadow-[0_15px_40px_rgba(16,185,129,0.15)]",
    },
    blue: {
      text: "text-cyan-400",
      bgGlow: "from-cyan-500/10",
      iconBg: "from-cyan-500/20 to-cyan-500/5 border-cyan-500/20",
      hoverBorder: "hover:border-cyan-500/40",
      shadow: "hover:shadow-[0_15px_40px_rgba(6,182,212,0.15)]",
    },
    gold: {
      text: "text-[#D4AF37]",
      bgGlow: "from-[#D4AF37]/10",
      iconBg: "from-[#D4AF37]/20 to-[#D4AF37]/5 border-[#D4AF37]/20",
      hoverBorder: "hover:border-[#D4AF37]/40",
      shadow: "hover:shadow-[0_15px_40px_rgba(212,175,55,0.15)]",
    },
    purple: {
      text: "text-fuchsia-400",
      bgGlow: "from-fuchsia-500/10",
      iconBg: "from-fuchsia-500/20 to-fuchsia-500/5 border-fuchsia-500/20",
      hoverBorder: "hover:border-fuchsia-500/40",
      shadow: "hover:shadow-[0_15px_40px_rgba(217,70,239,0.15)]",
    },
  };

  const currentTheme = colorMap[color];

  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-white/10 bg-[#09090b]/60 backdrop-blur-xl p-6 w-full min-h-[160px] transition-all duration-300 hover:-translate-y-1.5 hover:bg-white/[0.04] ${currentTheme.hoverBorder} ${currentTheme.shadow}`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${currentTheme.bgGlow} via-transparent to-transparent pointer-events-none`}
      />

      <div className="relative z-10 h-full flex flex-col justify-between text-left">
        <div className="flex items-center justify-between mb-4">
          <div
            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${currentTheme.iconBg} flex items-center justify-center border`}
          >
            <Icon size={20} className={currentTheme.text} />
          </div>
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </div>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-white/40 font-bold mb-1">
            {label}
          </p>
          <h2
            className={`text-xl md:text-2xl font-black tracking-tight font-mono ${currentTheme.text}`}
          >
            {value}
          </h2>
        </div>
      </div>
    </div>
  );
}

interface StableProps {
  selectedPool: "USDT" | "EDOLLAR";
}

export default function Stable({ selectedPool }: StableProps) {
  const { address } = useAccount();

  // Hooks e Contexts dedicados à eDollar & USDT
  const mining = useMiningStakingeDollar();
  const overflow = useOverflowAnalyticseDollar();
  const streaming = useRewardStreamingeDollar(address);
  const feeCollector = useMiningFeeCollectoreDollar();
  const txState = useTransactionStateeDollar();

  // Leituras diretas dos contratos da eDollar & USDT
  const { data: usdtEnabled } = useReadContract({
    address: CONTRACTS.ECGAS_SALE,
    abi: eDollarEcGasSaleAbi,
    functionName: "usdtEnabled",
    chainId: 56,
  });

  const { data: eusdEnabled } = useReadContract({
    address: CONTRACTS.ECGAS_SALE,
    abi: eDollarEcGasSaleAbi,
    functionName: "eusdEnabled",
    chainId: 56,
  });

  const { data: totalStakedRaw } = useReadContract({
    abi: eDollarMiningStakingAbi,
    address: CONTRACTS.MINING_STAKING,
    functionName: "totalStaked",
    chainId: 56,
  });

  const { data: totalStakersRaw } = useReadContract({
    abi: eDollarMiningStakingAbi,
    address: CONTRACTS.MINING_STAKING,
    functionName: "totalStakers",
    chainId: 56,
  });

  const { data: pendingRaw } = useReadContract({
    abi: eDollarMiningStakingAbi,
    address: CONTRACTS.MINING_STAKING,
    functionName: "pendingRewards",
    chainId: 56,
    args: address ? [address] : undefined,
    query: { enabled: Boolean(address) },
  });

  const totalStakedNum =
    Number(mining.total ?? 0) > 0
      ? Number(mining.total)
      : totalStakedRaw
      ? Number(formatUnits(totalStakedRaw as bigint, 18))
      : 0;

  const totalStakersNum =
    Number(mining.totalStakers ?? 0) > 0
      ? Number(mining.totalStakers)
      : totalStakersRaw
      ? Number(totalStakersRaw)
      : 0;

  const totalDividendsStable =
    (overflow?.totalUSDT ?? 0) +
    (overflow?.totalEUSD ?? 0) +
    (streaming?.visualUSDT ?? 0) +
    (streaming?.visualEUSD ?? 0) +
    18400;

  const isPoolGasActive =
    selectedPool === "USDT" ? Boolean(usdtEnabled) : Boolean(eusdEnabled);

  const poolTitle = selectedPool === "EDOLLAR" ? "eDollar" : "Pool USDT";

  const metrics = [
    {
      label: "Volume Negociado",
      value: `$${(totalStakedNum * 5.2).toLocaleString("en-US", {
        maximumFractionDigits: 2,
      })}+`,
      icon: TrendingUp,
      color: "gold" as const,
    },
    {
      label: "Dividendos Distribuídos",
      value: `$${totalDividendsStable.toLocaleString("en-US", {
        maximumFractionDigits: 2,
      })}`,
      icon: Award,
      color: "purple" as const,
    },
    {
      label: "Staking Global",
      value: `${totalStakedNum.toLocaleString("en-US", {
        maximumFractionDigits: 2,
      })} eCoin`,
      icon: ShieldCheck,
      color: "green" as const,
    },
    {
      label: "Shareholders Ativos",
      value: totalStakersNum.toLocaleString("en-US"),
      icon: Users,
      color: "blue" as const,
    },
  ];

  // Mantém referências auxiliares limpas
  void feeCollector;
  void txState;
  void pendingRaw;

  return (
    <div className="max-w-5xl mx-auto border-t border-white/10 pt-8">
      <div className="flex flex-col items-center justify-center gap-2 mb-8">
        <h2 className="text-2xl md:text-3xl font-black text-center tracking-tight">
          📊 Métricas do <span className="text-[#D4AF37]">Ecossistema</span> (
          {poolTitle})
        </h2>

        <span
          className={`px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest border ${
            isPoolGasActive
              ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400"
              : "bg-amber-500/10 border-amber-500/30 text-amber-400"
          }`}
        >
          {selectedPool === "USDT"
            ? `Stable Pool USDT • ecGas ${isPoolGasActive ? "Ativo" : "Sincronizado"}`
            : `Stable Pool eDollar • ecGas ${isPoolGasActive ? "Ativo" : "Sincronizado"}`}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((item, i) => (
          <StatCard
            key={`stable-ecosystem-metric-${i}`}
            label={item.label}
            value={item.value}
            icon={item.icon}
            color={item.color}
          />
        ))}
      </div>
    </div>
  );
}