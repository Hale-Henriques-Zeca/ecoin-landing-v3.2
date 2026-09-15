"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Gift } from "lucide-react";
import { useAccount, useReadContract } from "wagmi";
import { formatUnits } from "viem";

import RecompensasTab from "@/components/mining/RecompensasTab";

import { CONTRACTS } from "@/lib/contracts/contracts";
import { miningStakingAbi } from "@/lib/abis/miningStakingAbi";
import { useTransactionState } from "@/hooks/useTransactionState";
import { useMiningStaking } from "@/hooks/useMiningStaking";

export default function ProfitTabPage() {
  const router = useRouter();
  const { address } = useAccount();

  const claimTx = useTransactionState();
  const mining = useMiningStaking();

  // 📊 Leitura de Recompensas Pendentes via Contrato
  const { data: pending } = useReadContract({
    abi: miningStakingAbi,
    address: CONTRACTS.MINING_STAKING,
    functionName: "pendingRewards",
    chainId: 56,
    args: address ? [address] : undefined,
  });

  const pendingUSDT = pending ? Number(formatUnits(pending[0], 18)) : 0;
  const pendingEUSD = pending ? Number(formatUnits(pending[1], 18)) : 0;

  const totalRewardsUSD = pendingUSDT + pendingEUSD;
  const withdrawFeeUSD = totalRewardsUSD * 0.01;
  const withdrawNetUSD = totalRewardsUSD - withdrawFeeUSD;

  // 🔄 Atualização de Estado da Transação ao Confirmar
  useEffect(() => {
    if (mining.claimConfirmed) {
      claimTx.setState("success");
      setTimeout(() => {
        claimTx.setState("idle");
      }, 2000);
    }
  }, [mining.claimConfirmed]);

  // 💸 Função para Resgate de Dividendos
  const handleClaimRewards = async () => {
    try {
      claimTx.setState("wallet");
      await mining.claim();
      claimTx.setState("submitted");
    } catch (error) {
      console.error("Erro ao resgatar dividendos:", error);
      claimTx.setState("error");
    }
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
          <Gift size={16} className="text-[#D4AF37]" />
          <span className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-widest">Dividendos</span>
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
          Dividendos & <span className="text-[#D4AF37]">Recompensas</span>
        </h1>
        <p className="text-xs sm:text-sm text-gray-400">
          Acompanhe e resgate seus rendimentos acumulados em USDT e eUSD gerados pelo protocolo.
        </p>
      </motion.div>

      {/* 🎁 COMPONENTE DE RECOMPENSAS */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <RecompensasTab
          pendingUSDT={pendingUSDT}
          pendingEUSD={pendingEUSD}
          totalRewardsUSD={totalRewardsUSD}
          withdrawFeeUSD={withdrawFeeUSD}
          withdrawNetUSD={withdrawNetUSD}
          claimTxState={claimTx.state}
          onClaim={handleClaimRewards}
        />
      </motion.div>
    </div>
  );
}