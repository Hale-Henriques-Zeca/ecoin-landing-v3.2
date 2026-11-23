"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, BarChart3 } from "lucide-react";
import { useAccount, useReadContracts } from "wagmi";
import { formatUnits } from "viem";

import AnalyticsTab from "@/components/mining/eCoin/AnalyticsTab";

import { useMiningStakingeCoin } from "@/hooks/eCoinMining/useMiningStakingeCoin";
import { useOverflowAnalyticseCoin } from "@/hooks/eCoinMining/useOverflowAnalyticseCoin";
import { CONTRACTS } from "@/lib/contracts/contracts";
import { eCoinMiningStakingAbi } from "@/lib/abis/eCoinMining/eCoinMiningStakingAbi";

export default function AnalyticsTabPage() {
  const router = useRouter();
  const { address } = useAccount();

  // 📊 Hooks do ecossistema eCoin
  const mining = useMiningStakingeCoin();
  const overflow = useOverflowAnalyticseCoin();

  const contractConfig = {
    abi: eCoinMiningStakingAbi,
    address: CONTRACTS.eCoin_Mining_Staking_eCoin,
    chainId: 56,
  } as const;

  const baseContracts = [
    {
      ...contractConfig,
      functionName: "totalStaked",
    },
    {
      ...contractConfig,
      functionName: "totalStakers",
    },
  ] as const;

  const userContracts = address
    ? ([
        {
          ...contractConfig,
          functionName: "users",
          args: [address],
        },
        {
          ...contractConfig,
          functionName: "userShareBP",
          args: [address],
        },
        {
          ...contractConfig,
          functionName: "pendingRewards",
          args: [address],
        },
        {
          ...contractConfig,
          functionName: "preview",
          args: [address],
        },
        {
          ...contractConfig,
          functionName: "rewardRates",
          args: [address],
        },
        {
          ...contractConfig,
          functionName: "miningSession",
          args: [address],
        },
      ] as const)
    : ([] as const);

  // 🔗 Leitura On-Chain direta no ECoinMiningStakingECoin (BSC - Chain 56)
  const { data: reads } = useReadContracts({
    contracts: [...baseContracts, ...userContracts],
    query: {
      refetchInterval: 10000,
    },
  });

  // 🌐 Métricas Globais do Pool eCoin
  const miningMeta = mining as {
    total?: string | number;
    totalStakers?: string | number;
    userStake?: string | number;
    share?: number;
    pendingECoin?: number;
    previewData?: {
      usedCapacity?: number;
      maxCapacity?: number;
    };
    rates?: {
      ecoinPerDay?: number;
    };
  };

  const totalStaked =
    reads?.[0]?.status === "success"
      ? Number(formatUnits((reads[0].result as bigint) ?? 0n, 18))
      : Number(miningMeta.total ?? 0);

  const totalStakers =
    reads?.[1]?.status === "success"
      ? Number(reads[1].result ?? 0)
      : Number(miningMeta.totalStakers ?? 0);

  // 👤 Métricas Individuais do Usuário
  const rawUser =
    address && reads?.[2]?.status === "success"
      ? (reads[2].result as readonly [bigint, bigint, bigint])
      : undefined;

  const userStake = rawUser
    ? Number(formatUnits(rawUser[0] ?? 0n, 18))
    : Number(miningMeta.userStake ?? 0);

  const shareBP =
    address && reads?.[3]?.status === "success"
      ? Number(reads[3].result ?? 0)
      : 0;

  const sharePercent =
    shareBP > 0 ? shareBP / 100 : Number(miningMeta.share ?? 0);

  const pendingECoin =
    address && reads?.[4]?.status === "success"
      ? Number(formatUnits((reads[4].result as bigint) ?? 0n, 18))
      : Number(miningMeta.pendingECoin ?? 0);

  // 🔥 preview(address) -> (pendingECoin, remainingCapacity, usedCapacity, maxCapacity, willAccumulate)
  const rawPreview =
    address && reads?.[5]?.status === "success"
      ? (reads[5].result as readonly [bigint, bigint, bigint, bigint, boolean])
      : undefined;

  const usedCapacity = rawPreview
    ? Number(formatUnits(rawPreview[2] ?? 0n, 18))
    : Number(miningMeta.previewData?.usedCapacity ?? 0);

  const maxCapacity = rawPreview
    ? Number(formatUnits(rawPreview[3] ?? 0n, 18))
    : Number(miningMeta.previewData?.maxCapacity ?? 0);

  // 📈 rewardRates(address) -> (ecoinPerSecond, ecoinPerMinute, ecoinPerHour, ecoinPerDay)
  const rawRates =
    address && reads?.[6]?.status === "success"
      ? (reads[6].result as readonly [bigint, bigint, bigint, bigint])
      : undefined;

  const ecoinPerDay = rawRates
    ? Number(formatUnits(rawRates[3] ?? 0n, 18))
    : Number(miningMeta.rates?.ecoinPerDay ?? 0);

  const miningSession =
    address && reads?.[7]?.status === "success"
      ? Number(reads[7].result ?? 0)
      : maxCapacity > 0
      ? 1
      : 0;

  const apr =
    userStake > 0 && ecoinPerDay > 0
      ? Number((((ecoinPerDay * 365) / userStake) * 100).toFixed(2))
      : 0;

  const overflowMeta = overflow as {
    overflowECoin?: number;
    recycledECoin?: number;
    totalOverflow?: number;
  };
  const overflowECoin = Number(
    overflowMeta?.overflowECoin ??
      overflowMeta?.recycledECoin ??
      overflowMeta?.totalOverflow ??
      0
  );

  const stats = {
    myStake: `${userStake.toLocaleString("en-US", {
      maximumFractionDigits: 4,
    })} eCoin`,
    share: `${sharePercent.toFixed(4)}%`,
    totalStaked: `${totalStaked.toLocaleString("en-US", {
      maximumFractionDigits: 2,
    })} eCoin`,
    totalStakers: totalStakers.toString(),
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white px-4 sm:px-6 py-6 pb-24 space-y-6">
      {/* 🧭 CABEÇALHO COM BOTÃO DE VOLTAR AO HUB */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between border-b border-white/10 pb-4"
      >
        <button
          onClick={() => router.push("/eCoinShareHolder")}
          className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 hover:border-[#D4AF37]/50 transition-all duration-300 active:scale-95 cursor-pointer"
        >
          <ArrowLeft
            size={18}
            className="text-[#D4AF37] group-hover:-translate-x-1 transition-transform"
          />
          <span className="text-xs font-bold uppercase tracking-wider">
            Voltar ao Hub
          </span>
        </button>

        <div className="flex items-center gap-2 bg-[#D4AF37]/10 px-3 py-1.5 rounded-full border border-[#D4AF37]/20">
          <BarChart3 size={16} className="text-[#D4AF37]" />
          <span className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-widest">
            Analytics eCoin
          </span>
        </div>
      </motion.div>

      {/* 📝 TÍTULO E SUBTÍTULO DA PÁGINA */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-1"
      >
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
          Métricas &amp; <span className="text-[#D4AF37]">Analytics</span>
        </h1>
        <p className="text-xs sm:text-sm text-gray-400">
          Acompanhamento em tempo real do desempenho de retenção em eCoin,
          capacidade CS e dividendos distribuídos.
        </p>
      </motion.div>

      {/* 📊 COMPONENTE DE TAB ALINHADO COM ECoinMiningStakingECoin */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <AnalyticsTab
          stats={stats}
          pendingECoin={pendingECoin}
          usedCapacity={usedCapacity}
          maxCapacity={maxCapacity}
          overflowECoin={overflowECoin}
          sessions={miningSession}
          apr={apr}
        />
      </motion.div>
    </div>
  );
}