"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Gift } from "lucide-react";
import { useAccount, useReadContracts } from "wagmi";
import { formatUnits } from "viem";

import RecompensasTab from "@/components/mining/eCoin/RecompensasTab";

import { CONTRACTS } from "@/lib/contracts/contracts";
import { eCoinMiningStakingAbi } from "@/lib/abis/eCoinMining/eCoinMiningStakingAbi";
import { useTransactionStateeCoin } from "@/hooks/eCoinMining/useTransactionStateeCoin";
import { useMiningStakingeCoin } from "@/hooks/eCoinMining/useMiningStakingeCoin";

export default function ProfitTabPage() {
  const router = useRouter();
  const { address } = useAccount();

  const claimTx = useTransactionStateeCoin();
  const mining = useMiningStakingeCoin();

  const contractConfig = {
    abi: eCoinMiningStakingAbi,
    address: CONTRACTS.eCoin_Mining_Staking_eCoin,
    chainId: 56,
  } as const;

  // 📊 Leitura On-Chain no Contrato ECoinMiningStakingECoin (BSC - Chain 56)
  const { data: reads, refetch } = useReadContracts({
    contracts: address
      ? [
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
            functionName: "isMiningActive",
            args: [address],
          },
        ]
      : [],
    query: {
      enabled: Boolean(address),
      refetchInterval: 10000,
    },
  });

  // 💰 Recompensas Pendentes em eCoin
  const pendingECoin =
    address && reads?.[0]?.status === "success"
      ? Number(formatUnits((reads[0].result as bigint) ?? 0n, 18))
      : Number(mining.pendingECoin ?? 0);

  // Taxa de 1% do Collector (CLAIM_FEE_BP = 100)
  const withdrawFeeECoin = pendingECoin * 0.01;
  const withdrawNetECoin = Math.max(0, pendingECoin - withdrawFeeECoin);

  // 🔥 Preview de Capacidade de Gás (pendingECoin, remainingCapacity, usedCapacity, maxCapacity, willAccumulate)
  const rawPreview =
    address && reads?.[1]?.status === "success"
      ? (reads[1].result as readonly [bigint, bigint, bigint, bigint, boolean])
      : undefined;

  const remainingCapacity = rawPreview
    ? Number(formatUnits(rawPreview[1] ?? 0n, 18))
    : Number(mining.previewData?.remainingCapacity ?? 0);

  const usedCapacity = rawPreview
    ? Number(formatUnits(rawPreview[2] ?? 0n, 18))
    : Number(mining.previewData?.usedCapacity ?? 0);

  const maxCapacity = rawPreview
    ? Number(formatUnits(rawPreview[3] ?? 0n, 18))
    : Number(mining.previewData?.maxCapacity ?? 0);

  // 📈 Taxa Diária Estimada (ecoinPerSecond, ecoinPerMinute, ecoinPerHour, ecoinPerDay)
  const rawRates =
    address && reads?.[2]?.status === "success"
      ? (reads[2].result as readonly [bigint, bigint, bigint, bigint])
      : undefined;

  const ecoinPerDay = rawRates
    ? Number(formatUnits(rawRates[3] ?? 0n, 18))
    : Number(mining.rates?.ecoinPerDay ?? 0);

  // ⚡ Status de Mineração Ativa
  const isMiningActive =
    address && reads?.[3]?.status === "success"
      ? Boolean(reads[3].result)
      : rawPreview !== undefined
      ? Boolean(rawPreview[4])
      : Boolean(mining.isMiningActive);

  // ⏱️ Validação opcional de Cooldown / Tempo Mínimo de Stake vinda do Hook
  const miningMeta = mining as {
    canClaim?: boolean;
    claimBlockReason?: string;
  };
  const canClaim = miningMeta.canClaim ?? true;
  const claimBlockReason = miningMeta.claimBlockReason;

  // 🔄 Atualização de Estado da Transação ao Confirmar
  useEffect(() => {
    if (mining.claimConfirmed) {
      claimTx.setState("success");
      refetch();
      const timer = setTimeout(() => {
        claimTx.setState("idle");
      }, 2000);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mining.claimConfirmed]);

  // 💸 Função para Resgate de Dividendos em eCoin
  const handleClaimRewards = async () => {
    try {
      claimTx.setState("wallet");
      await mining.claim();
      claimTx.setState("submitted");
    } catch (error) {
      console.error("Erro ao resgatar recompensas eCoin:", error);
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
          <Gift size={16} className="text-[#D4AF37]" />
          <span className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-widest">
            Dividendos eCoin
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
          Dividendos &amp; <span className="text-[#D4AF37]">Recompensas</span>
        </h1>
        <p className="text-xs sm:text-sm text-gray-400">
          Acompanhe e resgate seus rendimentos acumulados em eCoin gerados pelo protocolo.
        </p>
      </motion.div>

      {/* 🎁 COMPONENTE DE RECOMPENSAS ALINHADO COM ECoinMiningStakingECoin */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <RecompensasTab
          pendingECoin={pendingECoin}
          withdrawFeeECoin={withdrawFeeECoin}
          withdrawNetECoin={withdrawNetECoin}
          isMiningActive={isMiningActive}
          usedCapacity={usedCapacity}
          maxCapacity={maxCapacity}
          remainingCapacity={remainingCapacity}
          ecoinPerDay={ecoinPerDay}
          canClaim={canClaim}
          claimBlockReason={claimBlockReason}
          claimTxState={claimTx.state}
          onClaim={handleClaimRewards}
        />
      </motion.div>
    </div>
  );
}