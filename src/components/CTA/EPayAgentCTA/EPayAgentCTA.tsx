"use client";

import React from "react";
import Link from "next/link";

export default function EPayAgentCTA() {
  return (
    <div className="w-full bg-slate-900/80 border border-slate-800/90 rounded-3xl p-6 md:p-10 backdrop-blur-xl shadow-2xl relative overflow-hidden text-center space-y-6">
      {/* Glow Ambientais */}
      <div className="absolute -top-16 -right-16 w-64 h-64 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Indicador de Status / Rede */}
      <div className="flex items-center justify-center gap-2 relative z-10">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
        <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
        <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
        <span className="text-xs font-bold tracking-widest uppercase text-emerald-400 ml-1">
          EdenKingDom Protocol • ePay Gateway
        </span>
      </div>

      {/* Título Principal */}
      <div className="space-y-2 relative z-10">
        <h2 className="text-2xl md:text-4xl font-black leading-tight tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-amber-400 to-red-500">
          ePay Cash Out Gateway
        </h2>
        <p className="text-slate-300 text-xs md:text-sm leading-relaxed max-w-xl mx-auto">
          Aceda ao portal oficial de conversão e levantamento em dinheiro físico / Fiat através da nossa <strong>Rede Licenciada de Agentes ePay</strong>.
        </p>
      </div>

      {/* Destaque de Vantagens */}
      <div className="py-2 flex items-center justify-center gap-2 flex-wrap relative z-10">
        <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold uppercase">
          ⚡ Saques Instantâneos
        </span>
        <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[11px] font-bold uppercase">
          🛡️ Custódia P2P Segura
        </span>
        <span className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-[11px] font-bold uppercase">
          💵 Fiat & Mobile Money
        </span>
      </div>

      {/* Botão Principal de Redirecionamento */}
      <div className="pt-2 flex justify-center relative z-10">
        <Link
          href="/ecoin-offramp"
          className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-500 text-slate-950 font-black text-xs uppercase tracking-wider hover:shadow-xl hover:shadow-emerald-500/25 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3 group"
        >
          <span>Ir para eCoin Off-Ramp</span>
          <svg
            className="w-4 h-4 transition-transform group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}