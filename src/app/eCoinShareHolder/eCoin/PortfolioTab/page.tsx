"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Wallet } from "lucide-react";
import { useAccount, useReadContracts } from "wagmi";
import { formatUnits } from "viem";

import GasCapacityPanel from "@/components/mining/eCoin/MiningMainPage/Components/GasCapacityPanel";

import { CONTRACTS } from "@/lib/contracts/contracts";
import { eCoinMiningStakingAbi } from "@/lib/abis/eCoinMining/eCoinMiningStakingAbi";
import { useMiningStakingeCoin } from "@/hooks/eCoinMining/useMiningStakingeCoin";

export default function PortfolioTabPage() {
  const router = useRouter();
  const { address } = useAccount();

  // 📊 Hook do ecossistema eCoin
  const mining = useMiningStakingeCoin();

  const contractConfig = {
    abi: eCoinMiningStakingAbi,
    address: CONTRACTS.eCoin_Mining_Staking_eCoin,
    chainId: 56,
  } as const;

  // 🔗 Leitura On-Chain direta no ECoinMiningStakingECoin (BSC - Chain 56)
  const { data: reads } = useReadContracts({
    contracts: address
      ? [
          {
            ...contractConfig,
            functionName: "preview",
            args: [address],
          },
          {
            ...contractConfig,
            functionName: "users",
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

  // 🔄 Mapeamento exato do retorno de preview(address) em ECoinMiningStakingECoin:
  // [0]: pendingECoin, [1]: remainingCapacity, [2]: usedCapacity, [3]: maxCapacity, [4]: willAccumulate
  const rawPreview =
    address && reads?.[0]?.status === "success"
      ? (reads[0].result as readonly [bigint, bigint, bigint, bigint, boolean])
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

  const csBalance = remainingCapacity;

  // 🪙 Staking ativo em eCoin
  const rawUser =
    address && reads?.[1]?.status === "success"
      ? (reads[1].result as readonly [bigint, bigint, bigint])
      : undefined;

  const stakedECoin = rawUser
    ? Number(formatUnits(rawUser[0] ?? 0n, 18))
    : Number(mining.userStake ?? 0);

  const stakeActive = stakedECoin > 0 || Boolean(mining.isMiningActive);

  // ⚡ Status efetivo de distribuição de dividendos (willAccumulate / isMiningActive)
  const willMine =
    address && reads?.[2]?.status === "success"
      ? Boolean(reads[2].result)
      : rawPreview !== undefined
      ? Boolean(rawPreview[4])
      : remainingCapacity > 0 && stakeActive;

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
          <Wallet size={16} className="text-[#D4AF37]" />
          <span className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-widest">
            Portfólio eCoin
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
          Motor de Capacidade CS &amp;{" "}
          <span className="text-[#D4AF37]">Dividendos</span>
        </h1>
        <p className="text-xs sm:text-sm text-gray-400">
          Controlador de limite do Selo de Compromisso (CS) em eCoin da sua conta.
        </p>
      </motion.div>

      {/* 💼 COMPONENTE DE PAINEL DE GAS ALINHADO COM ECoinMiningStakingECoin */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <GasCapacityPanel
          gasBalance={csBalance}
          maxCapacity={maxCapacity}
          usedCapacity={usedCapacity}
          remainingCapacity={remainingCapacity}
          willMine={willMine}
          stakeActive={stakeActive}
        />
      </motion.div>
    </div>
  );
}