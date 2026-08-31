"use client";

import React from "react";

export default function StakeLoading() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 space-y-4 bg-[#020617] text-white">
      {/* 🌀 Container do Spinner */}
      <div className="relative flex items-center justify-center">
        {/* Glow Dourado de fundo */}
        <div className="absolute w-16 h-16 bg-[#D4AF37]/20 rounded-full blur-xl animate-pulse" />

        {/* Anel Externo Giratório (Gold & Amber) */}
        <div className="w-12 h-12 rounded-full border-2 border-white/10 border-t-[#D4AF37] border-r-amber-400 animate-spin" />

        {/* Core Interno Pulsante */}
        <div className="absolute w-4 h-4 rounded-full bg-[#D4AF37] animate-ping opacity-75" />
        <div className="absolute w-2 h-2 rounded-full bg-amber-300" />
      </div>

      {/* 💬 Texto de Status */}
      <div className="flex flex-col items-center space-y-1 text-center">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold tracking-wider text-slate-200 uppercase">
            Carregando o painel de Retenção de Ações
          </span>
          <span className="flex space-x-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-bounce [animation-delay:-0.3s]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-bounce [animation-delay:-0.15s]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-bounce" />
          </span>
        </div>
        
        <p className="text-[11px] text-slate-400 font-mono">
          Sincronizando contratos de Retenção de Ações e saldo de cotas ativas...
        </p>
      </div>

      {/* 🛡️ Badge Protocol */}
      <div className="pt-2">
        <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-semibold text-[#D4AF37] uppercase tracking-wider">
          eCoin ShareHolder Protocol
        </span>
      </div>
    </div>
  );
}