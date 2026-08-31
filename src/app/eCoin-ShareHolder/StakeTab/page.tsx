"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Coins } from "lucide-react";

import StakeTab from "@/components/mining/StakeTab";

export default function StakeTabPage() {
  const router = useRouter();

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
          <Coins size={16} className="text-[#D4AF37]" />
          <span className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-widest">Gestão de Ações</span>
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
          Gestão de <span className="text-[#D4AF37]">Staking & Ações</span>
        </h1>
        <p className="text-xs sm:text-sm text-gray-400">
          Retenha, bloqueie e/ou solicite o resgate de suas eCoins para assegurar participação ativa nos dividendos.
        </p>
      </motion.div>

      {/* 🪙 COMPONENTE DE STAKE */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <StakeTab />
      </motion.div>
    </div>
  );
}