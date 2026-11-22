'use client';

import React, { useState } from 'react';
import USDTProfit from './components/ProfitTypes/USDTProfit';
import EDollarProfit from './components/ProfitTypes/EDollarProfit';
import ECoinProfit from './components/ProfitTypes/ECoinProfit';

export default function ProfitPage() {
  const [activeTab, setActiveTab] = useState<'usdt' | 'edollar' | 'ecoin'>('usdt');

  return (
    <div className="min-h-screen bg-[#0B0E14] text-white pb-24 px-4 pt-4">
      <h1 className="text-xl font-bold text-yellow-400 mb-1">Meus Lucros</h1>
      <p className="text-xs text-gray-400 mb-4">
        Resultados realizados pelos robôs de mineração e arbitragem.
      </p>

      {/* 🎛️ Switch entre os 3 Tipos de Lucro com Cores Dinâmicas */}
      <div className="grid grid-cols-3 gap-2 p-1 bg-[#12181F] border border-gray-800 rounded-xl mb-5 text-xs font-bold">
        {/* Botão USDT (Verde) */}
        <button
          onClick={() => setActiveTab('usdt')}
          className={`py-2.5 rounded-lg transition-all ${
            activeTab === 'usdt'
              ? 'bg-emerald-500 text-black shadow-md shadow-emerald-500/20'
              : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
          }`}
        >
          USDT
        </button>

        {/* Botão eDollar (Azul) */}
        <button
          onClick={() => setActiveTab('edollar')}
          className={`py-2.5 rounded-lg transition-all ${
            activeTab === 'edollar'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
              : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
          }`}
        >
          eDollar
        </button>

        {/* Botão eCoin (Gold / Dourado) */}
        <button
          onClick={() => setActiveTab('ecoin')}
          className={`py-2.5 rounded-lg transition-all ${
            activeTab === 'ecoin'
              ? 'bg-[#D4AF37] text-black shadow-md shadow-[#D4AF37]/20'
              : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
          }`}
        >
          eCoin
        </button>
      </div>

      {/* 🔄 Renderização dinâmica conforme a Tab ativa */}
      {activeTab === 'usdt' && <USDTProfit />}
      {activeTab === 'edollar' && <EDollarProfit />}
      {activeTab === 'ecoin' && <ECoinProfit />}
    </div>
  );
}