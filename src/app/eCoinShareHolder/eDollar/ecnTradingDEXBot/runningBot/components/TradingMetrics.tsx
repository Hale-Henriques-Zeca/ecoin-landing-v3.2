'use client';

import React from 'react';
import { Activity, Zap, TrendingUp, Shield } from 'lucide-react';

interface TradingMetricsProps {
  pair: string;
}

export default function TradingMetrics({ pair }: TradingMetricsProps) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-[#0B0E14] p-3 rounded-xl border border-gray-800">
          <span className="text-[10px] text-gray-400 flex items-center gap-1">
            <Activity className="w-3 h-3 text-emerald-400" /> Ordens Executadas
          </span>
          <span className="text-sm font-bold text-white mt-1 block">1 428 ordens</span>
        </div>
        <div className="bg-[#0B0E14] p-3 rounded-xl border border-gray-800">
          <span className="text-[10px] text-gray-400 flex items-center gap-1">
            <Zap className="w-3 h-3 text-yellow-400" /> Frequência / Hora
          </span>
          <span className="text-sm font-bold text-yellow-400 mt-1 block">~18 ops/h</span>
        </div>
        <div className="bg-[#0B0E14] p-3 rounded-xl border border-gray-800">
          <span className="text-[10px] text-gray-400 flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-blue-400" /> Taxa de Acerto (Win Rate)
          </span>
          <span className="text-sm font-bold text-emerald-400 mt-1 block">99.82%</span>
        </div>
        <div className="bg-[#0B0E14] p-3 rounded-xl border border-gray-800">
          <span className="text-[10px] text-gray-400 flex items-center gap-1">
            <Shield className="w-3 h-3 text-purple-400" /> Proteção de Derrapagem
          </span>
          <span className="text-sm font-bold text-purple-400 mt-1 block">&lt; 0.05%</span>
        </div>
      </div>
    </div>
  );
}