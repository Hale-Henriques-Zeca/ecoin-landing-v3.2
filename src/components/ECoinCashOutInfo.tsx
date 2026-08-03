'use client';

import React from 'react';
import Link from 'next/link';

export default function ECoinCashOutInfo() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center relative overflow-hidden w-full p-6">
      
      {/* 🌟 Glows Ambientais ePay */}
      <div className="absolute -top-24 -right-20 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-10 w-96 h-96 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* ================= HERO CARD REDIRECT ================= */}
      <section className="relative z-10 max-w-3xl w-full text-center space-y-8 bg-slate-900/80 border border-slate-800/90 rounded-3xl p-8 md:p-14 backdrop-blur-xl shadow-2xl">
        
        {/* Indicador de Status / Rede */}
        <div className="flex items-center justify-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
          <span className="text-xs font-bold tracking-widest uppercase text-emerald-400 ml-1">
            EdenKingDom Protocol • ePay Gateway
          </span>
        </div>

        {/* Título Principal */}
        <div className="space-y-3">
          <h1 className="text-3xl md:text-5xl font-black leading-tight tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-amber-400 to-red-500">
            ePay Cash Out Gateway
          </h1>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
            Aceda ao portal oficial de conversão e levantamento em dinheiro físico / Fiat através da nossa <strong>Rede Licenciada de Agentes ePay</strong>.
          </p>
        </div>

        {/* Destaque de Vantagens */}
        <div className="py-2 flex items-center justify-center gap-2 flex-wrap">
          <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-wide uppercase">
            ⚡ Saques Instantâneos
          </span>
          <span className="px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold tracking-wide uppercase">
            🛡️ Custódia P2P Segura
          </span>
          <span className="px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold tracking-wide uppercase">
            💵 Fiat & Mobile Money
          </span>
        </div>

        {/* Botão Principal de Redirecionamento */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/ecoin-offramp"
            className="w-full sm:w-auto px-10 py-4 rounded-2xl
            bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-500 text-slate-950 font-black text-sm uppercase tracking-wider
            hover:shadow-xl hover:shadow-emerald-500/25 hover:scale-[1.02]
            transition-all duration-300 flex items-center justify-center gap-3 group"
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

      </section>

    </main>
  );
}