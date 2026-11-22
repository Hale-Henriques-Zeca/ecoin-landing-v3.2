'use client';

import React from 'react';
import { Flame, RefreshCw, Coins, TrendingUp } from 'lucide-react';

export default function BuyBackOverview() {
  return (
    <div className="bg-gradient-to-br from-[#12181F] to-[#0D1219] border border-[#D4AF37]/30 rounded-2xl p-4 shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-full blur-2xl pointer-events-none" />

      <div className="flex justify-between items-center mb-3">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
          <Coins className="w-4 h-4 text-[#D4AF37]" />
          Fundo de Buy-Back
        </span>
        <span className="px-2 py-0.5 text-[10px] font-bold bg-[#00FF9C]/10 text-[#00FF9C] border border-[#00FF9C]/20 rounded-full flex items-center gap-1">
          <RefreshCw className="w-3 h-3 animate-spin text-[#00FF9C]" />
          AUTOMAÇÃO ATIVA
        </span>
      </div>

      <div className="flex items-baseline gap-2 mb-4">
        <span className="text-2xl font-black tracking-tight text-white">$452,810.00</span>
        <span className="text-xs font-bold text-[#00FF9C] flex items-center">
          <TrendingUp className="w-3 h-3 mr-0.5" />
          +12.4% (24h)
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2.5 pt-3 border-t border-gray-800/80">
        <div className="bg-[#0B0E14]/80 p-2.5 rounded-xl border border-gray-800">
          <div className="flex items-center gap-1.5 text-[10px] text-gray-400 mb-1">
            <Flame className="w-3.5 h-3.5 text-orange-500" />
            <span>Tokens Queimados</span>
          </div>
          <span className="text-sm font-extrabold text-[#D4AF37]">1,284,500 eCoin</span>
        </div>

        <div className="bg-[#0B0E14]/80 p-2.5 rounded-xl border border-gray-800">
          <div className="flex items-center gap-1.5 text-[10px] text-gray-400 mb-1">
            <Coins className="w-3.5 h-3.5 text-[#00FF9C]" />
            <span>Reserva USDT</span>
          </div>
          <span className="text-sm font-extrabold text-[#00FF9C]">185,400 USDT</span>
        </div>
      </div>
    </div>
  );
}