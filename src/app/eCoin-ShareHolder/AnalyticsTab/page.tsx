"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, BarChart3 } from "lucide-react";
import { useAccount, useReadContract } from "wagmi";
import { formatUnits } from "viem";

import AnalyticsTab from "@/components/mining/AnalyticsTab";

import { useMiningStaking } from "@/hooks/useMiningStaking";
import { useOverflowAnalytics } from "@/hooks/useOverflowAnalytics";
import { useEcGas } from "@/hooks/useEcGas";
import { CONTRACTS } from "@/lib/contracts/contracts";
import { miningStakingAbi } from "@/lib/abis/miningStakingAbi";

export default function AnalyticsTabPage() {
  const router = useRouter();
  const { address } = useAccount();

  // 📊 Leitura autônoma dos dados na blockchain
  const mining = useMiningStaking();
  const overflow = useOverflowAnalytics();
  const gas = useEcGas(address);

  const { data: pending } = useReadContract({
    abi: miningStakingAbi,
    address: CONTRACTS.MINING_STAKING,
    functionName: "pendingRewards",
    chainId: 56,
    args: address ? [address] : undefined,
  });

  const pendingUSDT = pending ? Number(formatUnits(pending[0], 18)) : 0;
  const pendingEUSD = pending ? Number(formatUnits(pending[1], 18)) : 0;

  const preview = gas.preview;
  const usedCapacity = preview ? Number(formatUnits(preview[3], 18)) : 0;
  const maxCapacity = preview ? Number(formatUnits(preview[4], 18)) : 0;

  const stats = {
    myStake: `${mining.userStake || "0"} eCoin`,
    share: `${(mining.share || 0).toFixed(4)}%`,
    totalStaked: `${mining.total || "0"} eCoin`,
    totalStakers: (mining.totalStakers || 0).toString(),
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
          onClick={() => router.push("/eCoin-ShareHolder")}
          className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 hover:border-[#D4AF37]/50 transition-all duration-300 active:scale-95"
        >
          <ArrowLeft size={18} className="text-[#D4AF37] group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-bold uppercase tracking-wider">Voltar ao Hub</span>
        </button>

        <div className="flex items-center gap-2 bg-[#D4AF37]/10 px-3 py-1.5 rounded-full border border-[#D4AF37]/20">
          <BarChart3 size={16} className="text-[#D4AF37]" />
          <span className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-widest">Analytics</span>
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
          Métricas & <span className="text-[#D4AF37]">Analytics</span>
        </h1>
        <p className="text-xs sm:text-sm text-gray-400">
          Acompanhamento em tempo real do desempenho de retenção, capacidade CS e dividendos distribuídos.
        </p>
      </motion.div>

      {/* 📊 COMPONENTE ÚNICO DE TAB (SHARED DESKTOP/MOBILE) */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <AnalyticsTab
          stats={stats}
          pendingUSDT={pendingUSDT}
          pendingEUSD={pendingEUSD}
          usedCapacity={usedCapacity}
          maxCapacity={maxCapacity}
          overflow={overflow}
        />
      </motion.div>
    </div>
  );
}