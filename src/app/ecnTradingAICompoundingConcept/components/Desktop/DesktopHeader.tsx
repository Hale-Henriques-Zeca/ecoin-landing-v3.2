'use client';

import React from 'react';
import { Search, Globe, Shield, RefreshCw, Wallet, Coins } from 'lucide-react';

export default function DesktopHeader() {
  return (
    <div className="h-16 px-6 flex items-center justify-between gap-4 bg-slate-950/80 border-b border-slate-800/80 backdrop-blur-xl">
      {/* BARRA DE PESQUISA & ATIVOS */}
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Pesquisar contratos, pools de liquidez e ordens AI..."
            className="w-full bg-slate-900/80 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
          />
        </div>
      </div>

      {/* PAINEL DE TICKERS E STATUS DA REDE */}
      <div className="flex items-center gap-4">
        {/* TICKERS DE PREÇO AO VIVO */}
        <div className="hidden lg:flex items-center gap-3 px-3 py-1.5 bg-slate-900/60 border border-slate-800 rounded-xl text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <Coins className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-slate-400">eCoin:</span>
            <span className="text-white font-bold">$1.00</span>
          </div>
          <span className="text-slate-700">|</span>
          <div className="flex items-center gap-1.5">
            <span className="text-emerald-400 font-bold">$eDollar:</span>
            <span className="text-white font-bold">$1.00</span>
          </div>
        </div>

        {/* INDICADOR DE CONEXÃO DA REDE */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs">
          <Globe className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-slate-300 font-mono">BNB Smart Chain</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-1" />
        </div>

        {/* BOTAO DE REFRESH DO POOL */}
        <button 
          aria-label="Atualizar dados de trading"
          className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
        </button>

        {/* CONECTAR CARTEIRA */}
        <button className="px-4 py-2 bg-gradient-to-r from-[#D4AF37] via-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg shadow-amber-500/10 flex items-center gap-2 transition-all">
          <Wallet className="w-4 h-4" />
          <span>Conectar Carteira</span>
        </button>
      </div>
    </div>
  );
}