"use client";

import React from "react";
import { motion } from "framer-motion";

export default function LevelTree() {
  return (
    <div className="w-full bg-[#0a0a0a] border border-[#333] rounded-2xl p-6 shadow-2xl backdrop-blur-xl">
      <h2 className="text-2xl font-black text-[#D4AF37] mb-2 text-center tracking-wide font-mono">
        Estrutura Unificada de Rede (3 Níveis de Acionistas)
      </h2>
      <p className="text-xs text-center text-white/50 mb-6 font-sans">
        Arquitetura On-Chain de distribuição automática de bonificações
      </p>

      <div className="flex flex-col items-center gap-6 text-gray-200">
        {/* Topo: Você */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="py-3 px-6 bg-gradient-to-r from-[#D4AF37]/20 via-[#111] to-[#D4AF37]/20 border border-[#D4AF37] rounded-xl shadow-[0_0_15px_rgba(212,175,55,0.2)] text-center"
        >
          <span className="text-lg font-bold text-[#D4AF37] block">👑 Você (Acionista Líder)</span>
          <span className="text-[10px] text-white/60 font-mono">Receptor On-Chain dos 3 Níveis</span>
        </motion.div>

        {/* Conector Vertical */}
        <div className="w-0.5 h-6 bg-gradient-to-b from-[#D4AF37] to-emerald-500/50" />

        {/* Nível 1 */}
        <div className="w-full max-w-md">
          <motion.div
            whileHover={{ y: -2 }}
            className="p-4 bg-[#111] border border-emerald-500/40 rounded-xl text-center shadow-lg"
          >
            <div className="text-emerald-400 font-bold text-sm font-mono">🟡 Nível 1 (Diretos)</div>
            <div className="text-xs text-white/70 mt-1">
              <strong>ecGas:</strong> 14% | <strong>Trading:</strong> 15% | <strong>Claim Fee:</strong> 0.21%
            </div>
          </motion.div>
        </div>

        {/* Conector Vertical */}
        <div className="w-0.5 h-6 bg-emerald-500/50" />

        {/* Nível 2 */}
        <div className="w-full max-w-md">
          <motion.div
            whileHover={{ y: -2 }}
            className="p-4 bg-[#111] border border-cyan-500/40 rounded-xl text-center shadow-lg"
          >
            <div className="text-cyan-400 font-bold text-sm font-mono">🔵 Nível 2 (Indiretos)</div>
            <div className="text-xs text-white/70 mt-1">
              <strong>ecGas:</strong> 4% | <strong>Trading:</strong> 3% | <strong>Claim Fee:</strong> 0.075%
            </div>
          </motion.div>
        </div>

        {/* Conector Vertical */}
        <div className="w-0.5 h-6 bg-cyan-500/50" />

        {/* Nível 3 */}
        <div className="w-full max-w-md">
          <motion.div
            whileHover={{ y: -2 }}
            className="p-4 bg-[#111] border border-fuchsia-500/40 rounded-xl text-center shadow-lg"
          >
            <div className="text-fuchsia-400 font-bold text-sm font-mono">🟣 Nível 3 (Geração 3)</div>
            <div className="text-xs text-white/70 mt-1">
              <strong>ecGas:</strong> 2% | <strong>Trading:</strong> 2% | <strong>Claim Fee:</strong> 0.015%
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}