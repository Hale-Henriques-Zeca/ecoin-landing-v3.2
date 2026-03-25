"use client";

import Link from "next/link";
import { Cpu, Zap, Activity } from "lucide-react";

export default function AITradingCard() {
  return (
    <div className="w-full flex justify-center">
  <div className="w-full max-w-[340px] aspect-square">

      <div className="
        relative h-full
        overflow-hidden
        bg-gradient-to-br from-[#D4AF37]/20 via-black/40 to-[#F5F5F5]/10
        border border-[#D4AF37]/30
        rounded-2xl p-5
        backdrop-blur-xl
        hover:scale-[1.03]
        hover:shadow-[0_0_40px_rgba(212,175,55,0.25)]
        transition-all duration-300
        group
        flex flex-col justify-between 
      ">

        {/* 🔥 Glow AI */}
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#D4AF37]/10 rounded-full blur-3xl group-hover:bg-[#D4AF37]/20 transition-all" />

        {/* 🔹 HEADER */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <Cpu size={22} className="text-[#D4AF37] animate-pulse" />
            <h3 className="text-sm font-bold text-[#D4AF37] leading-tight">
              E-Coin AI Trading Robot 🚀
            </h3>
          </div>

          <div className="flex items-center gap-1 bg-emerald-500/10 px-2 py-[2px] rounded border border-emerald-500/20">
            <Activity size={10} className="text-emerald-500 animate-pulse" />
            <span className="text-[9px] font-bold text-emerald-400 uppercase">
              Live
            </span>
          </div>
        </div>

        {/* 🔹 MINI DATA (TRADING FEEL) */}
        <div className="grid grid-cols-2 gap-3 my-3">
          <div className="bg-black/30 border border-white/5 rounded-lg p-2">
            <p className="text-[9px] text-white/40 uppercase">Spread</p>
            <p className="text-xs font-mono text-[#D4AF37]">+0.08%</p>
          </div>

          <div className="bg-black/30 border border-white/5 rounded-lg p-2">
            <p className="text-[9px] text-white/40 uppercase">Latency</p>
            <p className="text-xs font-mono text-emerald-400">12ms</p>
          </div>
        </div>

        {/* 🔹 DESCRIPTION */}
        
        <p className="text-[#F5F5F5]/80 mb-6 text-sm leading-relaxed"> Maximize os seus rendimentos com o nosso <span className="text-[#D4AF37] font-semibold">Neural Bot</span> de arbitragem triangular. Operações de alta frequência na Binance com liquidação instantânea em E-Coin. </p>

        {/* 🔹 BUTTON */}
        <Link
          href="/ecoin-ai-trading"
          className="
            mt-4 flex items-center justify-center gap-2
            py-3 rounded-xl font-bold text-[11px]
            bg-gradient-to-r from-[#D4AF37] to-[#F5F5F5]
            text-black
            hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]
            transition-all uppercase tracking-widest
          "
        >
          <Zap size={14} />
          Ativar Neural Bot 🤖
        </Link>

        {/* 🔹 FOOT */}
        <p className="text-[8px] text-center text-white/20 uppercase tracking-widest mt-2">
          Powered by E-Coin Neural Core V3
        </p>
      </div>
       </div>
    </div>
  );
}