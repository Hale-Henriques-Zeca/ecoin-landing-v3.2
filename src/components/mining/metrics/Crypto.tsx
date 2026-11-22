"use client";

import React from "react";
import { TrendingUp, Users, ShieldCheck, Award } from "lucide-react";
import { useAccount, useReadContract } from "wagmi";
import { formatUnits } from "viem";
import { CONTRACTS } from "@/lib/contracts/contracts";

// Abis da eCoin
import { eCoinMiningStakingAbi } from "@/lib/abis/eCoinMining/eCoinMiningStakingAbi";
import { eCoinEcGasSaleAbi } from "@/lib/abis/eCoinMining/eCoinEcGasSaleAbi";

// Contexts & Hooks da eCoin
import { useTransactionStateeCoin } from "@/hooks/eCoinMining/useTransactionStateeCoin";
import { useMiningStakingeCoin } from "@/hooks/eCoinMining/useMiningStakingeCoin";
import { useRewardStreamingeCoin } from "@/hooks/eCoinMining/useRewardStreamingeCoin";
import { useOverflowAnalyticseCoin } from "@/hooks/eCoinMining/useOverflowAnalyticseCoin";
import { useMiningFeeCollectoreCoin } from "@/hooks/eCoinMining/useMiningFeeCollectoreCoin";

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

export default function Crypto() {
  const { address } = useAccount();

  // Hooks e Contexts dedicados à eCoin
  const mining = useMiningStakingeCoin();
  const overflow = useOverflowAnalyticseCoin();
  const streaming = useRewardStreamingeCoin(address);
  const feeCollector = useMiningFeeCollectoreCoin();
  const txState = useTransactionStateeCoin();

  // Leituras diretas dos contratos da eCoin
  const { data: ecoinSaleEnabled } = useReadContract({
    address: CONTRACTS.ecGas_Sale_eCoin,
    abi: eCoinEcGasSaleAbi,
    functionName: "ecoinEnabled",
    chainId: 56,
  });

  const { data: totalStakedRaw } = useReadContract({
    abi: eCoinMiningStakingAbi,
    address: CONTRACTS.eCoin_Mining_Staking_eCoin,
    functionName: "totalStaked",
    chainId: 56,
  });

  const { data: totalStakersRaw } = useReadContract({
    abi: eCoinMiningStakingAbi,
    address: CONTRACTS.eCoin_Mining_Staking_eCoin,
    functionName: "totalStakers",
    chainId: 56,
  });

  const { data: rewardBufferRaw } = useReadContract({
    abi: eCoinMiningStakingAbi,
    address: CONTRACTS.eCoin_Mining_Staking_eCoin,
    functionName: "rewardBufferECoin",
    chainId: 56,
  });

  // Consolidação segura dos valores on-chain
  const totalStakedNum =
    mining.total > 0
      ? mining.total
      : totalStakedRaw
      ? Number(formatUnits(totalStakedRaw as bigint, 18))
      : 0;

  const totalStakersNum =
    mining.totalStakers > 0
      ? mining.totalStakers
      : totalStakersRaw
      ? Number(totalStakersRaw)
      : 0;

  const bufferECoin =
    mining.rewardBufferECoin > 0
      ? mining.rewardBufferECoin
      : rewardBufferRaw
      ? Number(formatUnits(rewardBufferRaw as bigint, 18))
      : 0;

  const overflowData = overflow as Record<string, number> | undefined;
  const overflowECoin =
    overflowData?.totalECoin ?? overflowData?.totalOverflow ?? 0;

  const feeData = feeCollector as Record<string, number> | undefined;
  const distributedFeesECoin = feeData?.totalDistributedECoin ?? 0;

  const totalDividendsECoin =
    bufferECoin +
    overflowECoin +
    distributedFeesECoin +
    (streaming?.visualECoin ?? 0);

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
      label: "Dividendos & Buffer eCoin",
      value: `${totalDividendsECoin.toLocaleString("en-US", {
        maximumFractionDigits: 2,
      })} eCoin`,
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

  // Mantém referência limpa de estado auxiliar
  void txState;

  return (
    <div className="max-w-5xl mx-auto border-t border-white/10 pt-8">
      <div className="flex flex-col items-center justify-center gap-2 mb-8">
        <h2 className="text-2xl md:text-3xl font-black text-center tracking-tight">
          📊 Métricas do <span className="text-[#D4AF37]">Ecossistema</span>{" "}
          (Pool eCoin)
        </h2>

        <span
          className={`px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest border ${
            ecoinSaleEnabled
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
              : "bg-amber-500/10 border-amber-500/30 text-amber-400"
          }`}
        >
          {ecoinSaleEnabled
            ? "Pool Nativo eCoin • ecGas 1.3x Ativo"
            : "Pool Nativo eCoin • Sincronizado"}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((item, i) => (
          <StatCard
            key={`crypto-ecosystem-metric-${i}`}
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