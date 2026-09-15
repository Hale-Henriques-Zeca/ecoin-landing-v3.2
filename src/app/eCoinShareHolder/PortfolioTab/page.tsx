"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Wallet } from "lucide-react";
import { useAccount } from "wagmi";
import { formatUnits } from "viem";

import GasCapacityPanel from "@/components/GasCapacityPanel";

import { useMiningStaking } from "@/hooks/useMiningStaking";
import { useEcGas } from "@/hooks/useEcGas";

export default function PortfolioTabPage() {
  const router = useRouter();
  const { address } = useAccount();

  // 📊 Leitura autônoma de dados de staking e ecGas
  const mining = useMiningStaking();
  const gas = useEcGas(address);

  // 🔄 Mapeamento exato da versão Laptop
  const preview = gas.preview;
  const remainingCapacity = preview ? Number(formatUnits(preview[2], 18)) : 0;
  const usedCapacity = preview ? Number(formatUnits(preview[3], 18)) : 0;
  const maxCapacity = preview ? Number(formatUnits(preview[4], 18)) : 0;
  const csBalance = remainingCapacity; 
  const stakeActive = Number(mining.userStake) > 0; 
  const simulatedWillMine = remainingCapacity > 0 && stakeActive;

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
          <Wallet size={16} className="text-[#D4AF37]" />
          <span className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-widest">Portfólio</span>
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
          Motor de Capacidade CS & <span className="text-[#D4AF37]">Dividendos</span>
        </h1>
        <p className="text-xs sm:text-sm text-gray-400">
          Controlador de limite do Selo de Compromisso (CS) da sua conta.
        </p>
      </motion.div>

      {/* 💼 COMPONENTE DE PAINEL DE GAS */}
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
          willMine={simulatedWillMine}
          stakeActive={stakeActive}
        />   
      </motion.div>
    </div>
  );
}