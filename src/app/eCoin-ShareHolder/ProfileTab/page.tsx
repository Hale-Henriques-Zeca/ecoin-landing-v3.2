"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, User, ShieldAlert } from "lucide-react";
import { useAccount } from "wagmi";

// Components
import { TeamLeaderCTA } from "@/components/CTA/TeamLeaderCTA/TeamLeaderCTA";
import SimulatorRedirectCard from "@/components/Cards/SimulatorRedirectCard";
import ProfitSimulatorCard from "@/components/Cards/ProfitSimulatorCard";
import ReferralCodePanel from "@/components/ReferralCodePanel";
import AdminPage from "@/components/AdminPage";

export default function ProfileTabPage() {
  const router = useRouter();
  const { isConnected, address } = useAccount();

  // 🛡️ Verificação de Owner/Admin
  const MINING_OWNER = process.env.NEXT_PUBLIC_MINING_OWNER?.toLowerCase();
  const isOwner = Boolean(
    isConnected && address && MINING_OWNER && address.toLowerCase() === MINING_OWNER
  );

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
          <User size={16} className="text-[#D4AF37]" />
          <span className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-widest">Perfil</span>
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
          Configurações & <span className="text-[#D4AF37]">Perfil</span>
        </h1>
        <p className="text-xs sm:text-sm text-gray-400">
          Gerencie seu código de indicação, simuladores de ganhos e ferramentas avançadas da sua conta.
        </p>
      </motion.div>

      {/* 👤 SEÇÕES E FERRAMENTAS DO PERFIL */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="space-y-6"
      >
        <TeamLeaderCTA />
        <SimulatorRedirectCard />
        <ProfitSimulatorCard />
        <ReferralCodePanel />

        {/* 👑 ÁREA ADMINISTRATIVA EXCLUSIVA DO OWNER */}
        {isOwner && (
          <div className="space-y-3 pt-4">
            <div className="flex items-center gap-2 text-[#D4AF37]">
              <ShieldAlert size={18} />
              <h2 className="text-sm font-bold uppercase tracking-wider">Painel do Administrador</h2>
            </div>
            <div className="bg-[#0d0d0f] border border-[#D4AF37]/30 rounded-3xl p-6 shadow-2xl shadow-[#D4AF37]/5">
              <AdminPage />
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}