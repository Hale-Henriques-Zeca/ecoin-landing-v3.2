"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Users, Coins, Layers, Share2, Award } from "lucide-react";
import { useDexWallet } from "@/contexts/DexWalletContext";
import { useReferral } from "@/hooks/useReferral";

export default function EcoinNetworkAnalytics() {
  const { address, isConnected } = useDexWallet();
  const { getNetworkStats, getScore } = useReferral();

  const [network, setNetwork] = useState({
    l1Count: 0,
    l2Count: 0,
    l3Count: 0,
    totalMembers: 0,
    score: 0
  });

  const loadStats = useCallback(async () => {
    if (!isConnected || !address) return;

    try {
      const stats = await getNetworkStats(address);
      const userScore = await getScore(address);

      setNetwork({
        l1Count: Number(stats.l1Count),
        l2Count: Number(stats.l2Count),
        l3Count: Number(stats.l3Count),
        totalMembers: Number(stats.totalMembers),
        score: Number(userScore)
      });
    } catch (err) {
      console.error("Erro ao carregar Network Analytics:", err);
    }
  }, [address, isConnected, getNetworkStats, getScore]);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  return (
    <div className="bg-black/50 border border-white/10 rounded-2xl p-6 sm:p-8 mt-12 backdrop-blur-xl">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h2 className="text-2xl sm:text-3xl text-[#D4AF37] font-semibold flex items-center justify-center gap-2">
          📊 E-Coin Network Intelligence
        </h2>
        <p className="text-xs sm:text-sm text-gray-400 mt-1">
          Monitorização em tempo real do crescimento e arquitetura da sua rede de afiliação em 3 níveis.
        </p>
      </div>

      {/* TOP STATS SUMMARY */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-black/60 border border-white/10 rounded-xl p-5 text-center hover:border-[#3B82F6]/40 transition">
          <Users className="mx-auto text-[#3B82F6] mb-2" size={24} />
          <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Total Network</p>
          <p className="text-3xl font-bold text-white mt-1">{network.totalMembers}</p>
        </div>

        <div className="bg-black/60 border border-white/10 rounded-xl p-5 text-center hover:border-[#D4AF37]/40 transition">
          <Award className="mx-auto text-[#D4AF37] mb-2" size={24} />
          <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Reputation Score</p>
          <p className="text-3xl font-bold text-[#D4AF37] mt-1">{network.score}</p>
        </div>

        <div className="bg-black/60 border border-white/10 rounded-xl p-5 text-center hover:border-emerald-500/40 transition">
          <Share2 className="mx-auto text-emerald-400 mb-2" size={24} />
          <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Direct Invites (L1)</p>
          <p className="text-3xl font-bold text-emerald-400 mt-1">{network.l1Count}</p>
        </div>
      </div>

      {/* 3-LEVEL STRUCTURE MATRIX */}
      <div className="border border-white/10 rounded-xl bg-black/40 p-4 sm:p-6">
        <div className="flex items-center gap-2 mb-4">
          <Layers className="text-[#D4AF37]" size={18} />
          <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider">
            Estrutura da Rede (L1 / L2 / L3)
          </h3>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-black/60 border border-emerald-500/20 rounded-xl p-4 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-[9px] font-bold rounded-bl">
              70% Share
            </div>
            <p className="text-xs font-bold text-emerald-400 uppercase">Level 1 — Direct</p>
            <p className="text-2xl font-black text-white mt-2">{network.l1Count}</p>
            <p className="text-[10px] text-gray-400 mt-1">Membros diretos vinculados</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-black/60 border border-blue-500/20 rounded-xl p-4 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 px-2 py-0.5 bg-blue-500/10 text-blue-400 text-[9px] font-bold rounded-bl">
              20% Share
            </div>
            <p className="text-xs font-bold text-blue-400 uppercase">Level 2 — Indirect</p>
            <p className="text-2xl font-black text-white mt-2">{network.l2Count}</p>
            <p className="text-[10px] text-gray-400 mt-1">Indicados da sua 1ª linha</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-black/60 border border-purple-500/20 rounded-xl p-4 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 px-2 py-0.5 bg-purple-500/10 text-purple-400 text-[9px] font-bold rounded-bl">
              10% Share
            </div>
            <p className="text-xs font-bold text-purple-400 uppercase">Level 3 — Relative</p>
            <p className="text-2xl font-black text-white mt-2">{network.l3Count}</p>
            <p className="text-[10px] text-gray-400 mt-1">Expansão da rede estendida</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}