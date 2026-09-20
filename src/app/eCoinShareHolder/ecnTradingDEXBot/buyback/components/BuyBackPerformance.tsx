'use client';

import React from 'react';
import { BarChart3, ArrowUpRight, Percent, Clock } from 'lucide-react';

export default function BuyBackPerformance() {
  return (
    <div className="bg-[#12181F] border border-gray-800 rounded-2xl p-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
          <BarChart3 className="w-4 h-4 text-[#D4AF37]" />
          Métricas de Desempenho
        </h3>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div className="bg-[#0B0E14] p-2.5 rounded-xl border border-gray-800 text-center">
          <span className="text-[10px] text-gray-400 block mb-0.5">Preço Médio</span>
          <span className="text-xs font-extrabold text-white">$0.352</span>
        </div>

        <div className="bg-[#0B0E14] p-2.5 rounded-xl border border-gray-800 text-center">
          <span className="text-[10px] text-gray-400 block mb-0.5">Impacto no Preço</span>
          <span className="text-xs font-extrabold text-[#00FF9C]">+2.18%</span>
        </div>

        <div className="bg-[#0B0E14] p-2.5 rounded-xl border border-gray-800 text-center">
          <span className="text-[10px] text-gray-400 block mb-0.5">Slippage Máx</span>
          <span className="text-xs font-extrabold text-[#D4AF37]">0.5%</span>
        </div>
      </div>
    </div>
  );
}