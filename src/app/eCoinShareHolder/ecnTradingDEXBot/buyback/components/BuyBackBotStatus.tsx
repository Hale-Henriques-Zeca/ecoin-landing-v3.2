'use client';

import React from 'react';
import { Bot, Cpu, ShieldCheck, Zap } from 'lucide-react';

export default function BuyBackBotStatus() {
  return (
    <div className="bg-[#12181F] border border-gray-800 rounded-2xl p-4 shadow-lg">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
          <Bot className="w-4 h-4 text-[#D4AF37]" />
          Status dos Motores Neurais
        </h3>
        <span className="text-[10px] text-gray-400 font-mono">DEX: PancakeSwap inf. & Uniswap</span>
      </div>

      <div className="space-y-2.5">
        <div className="bg-[#0B0E14] p-3 rounded-xl border border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#00FF9C]/10 text-[#00FF9C] rounded-lg">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">Bot Recompra Flash</span>
              <span className="text-[10px] text-gray-400">Gatilho: Dip &gt; 15-30%</span>
            </div>
          </div>
          <span className="px-2 py-0.5 text-[10px] font-bold bg-[#00FF9C]/10 text-[#00FF9C] rounded-md border border-[#00FF9C]/30">
            PRONTO
          </span>
        </div>

        <div className="bg-[#0B0E14] p-3 rounded-xl border border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#D4AF37]/10 text-[#D4AF37] rounded-lg">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">Bot Programado TWAP</span>
              <span className="text-[10px] text-gray-400">Execução a cada 15 min</span>
            </div>
          </div>
          <span className="px-2 py-0.5 text-[10px] font-bold bg-[#D4AF37]/10 text-[#D4AF37] rounded-md border border-[#D4AF37]/30 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-ping" />
            EXECUTANDO
          </span>
        </div>
      </div>
    </div>
  );
}