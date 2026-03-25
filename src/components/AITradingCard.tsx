"use client";

import Link from "next/link";
import { Cpu, Zap, Activity } from "lucide-react";

export default function AITradingCard() {
  return (
    <div className="w-full flex justify-center px-4">
      {/* Aumentado para 450px e removido o aspect-square para ser um retângulo */}
      <div className="w-full max-w-[1200px] md:max-w-[1200px]">
        <div className="
          relative
          overflow-hidden
          bg-gradient-to-br from-[#D4AF37]/20 via-black/60 to-[#F5F5F5]/10
          border border-[#D4AF37]/40
          rounded-3xl p-7
          backdrop-blur-2xl
          hover:scale-[1.02]
          hover:shadow-[0_0_50px_rgba(212,175,55,0.2)]
          transition-all duration-500
          group
          flex flex-col gap-4
        ">

          {/* 🔥 Glow AI mais intenso */}
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#D4AF37]/15 rounded-full blur-3xl group-hover:bg-[#D4AF37]/25 transition-all duration-700" />

          {/* 🔹 HEADER */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#D4AF37]/10 rounded-lg">
                <Cpu size={24} className="text-[#D4AF37] animate-pulse" />
              </div>
              <h3 className="text-base font-bold text-[#D4AF37] tracking-tight">
                E-Coin AI Trading Robot 🚀
              </h3>
            </div>

            <div className="flex items-center gap-2 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              <Activity size={12} className="text-emerald-500 animate-pulse" />
              <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">
                Live Engine
              </span>
            </div>
          </div>

          {/* 🔹 DESCRIPTION */}
          <p className="text-[#F5F5F5]/90 text-sm leading-relaxed mt-2">
            Maximize os seus rendimentos com o nosso <span className="text-[#D4AF37] font-bold">Neural Bot</span> de arbitragem triangular. Operações de alta frequência na Binance com liquidação instantânea em E-Coin.
          </p>

          {/* 🔹 DATA PANEL (HORIZONTAL) */}
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div className="bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-sm">
              <p className="text-[9px] text-white/40 uppercase font-bold tracking-widest mb-1">Current Spread</p>
              <p className="text-sm font-mono text-[#D4AF37]">+0.12%</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-sm">
              <p className="text-[9px] text-white/40 uppercase font-bold tracking-widest mb-1">Execution Latency</p>
              <p className="text-sm font-mono text-emerald-400">9ms</p>
            </div>
          </div>

          {/* 🔹 BUTTON */}
          <Link
            href="/ecoin-ai-trading"
            className="
              mt-2 flex items-center justify-center gap-3
              py-4 rounded-2xl font-black text-xs
              bg-gradient-to-r from-[#D4AF37] to-[#F5F5F5]
              text-black
              hover:brightness-110
              hover:gap-5
              transition-all duration-300 uppercase tracking-[0.2em]
            "
          >
            <Zap size={16} fill="black" />
            Ativar Neural Bot 🤖
          </Link>

          {/* 🔹 FOOT */}
          <div className="flex justify-center items-center gap-2 mt-1">
            <div className="h-[1px] flex-1 bg-white/5"></div>
            <p className="text-[8px] text-white/20 uppercase tracking-[0.3em]">
              Powered by E-Coin Neural Core V3
            </p>
            <div className="h-[1px] flex-1 bg-white/5"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
