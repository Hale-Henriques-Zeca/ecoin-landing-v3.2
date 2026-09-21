'use client';

import React, { useState } from 'react';
import ECoinShareHolderSeat from './components/ECoinShareHolderSeat';
import ECoinSmartPoolsExplanation from './components/ECoinSmartPoolsExplanation';

export default function ECoinSmartAIRewardsPoolsPage() {
  // Estado para alternar entre as abas: 'seat' ou 'explanation'
  const [activeTab, setActiveTab] = useState<'seat' | 'explanation'>('seat');

  return (
    <main className="min-h-screen bg-[#070A12] text-white pt-6 pb-20 px-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Cabeçalho da Página */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 border border-slate-800/80 rounded-2xl p-4 sm:p-6 backdrop-blur-xl shadow-2xl">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🤖</span>
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white flex items-center gap-2">
                eCoin Smart AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-amber-300 to-yellow-500">Rewards Pools</span>
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-400">
              Gerenciamento de Assentos ShareHolder, Recompensas de Inteligência Artificial e Exploração de Pools.
            </p>
          </div>

          {/* SWITCH CONTROLLER / SELETOR DE ABAS */}
          <div className="inline-flex p-1.5 bg-slate-950/80 border border-slate-800 rounded-xl shadow-inner self-start md:self-auto">
            <button
              onClick={() => setActiveTab('seat')}
              className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all duration-300 ${
                activeTab === 'seat'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-amber-600 text-slate-950 shadow-lg shadow-amber-500/20 scale-[1.02]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/50'
              }`}
            >
              <span>👑</span>
              <span>ShareHolder Seats</span>
            </button>

            <button
              onClick={() => setActiveTab('explanation')}
              className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all duration-300 ${
                activeTab === 'explanation'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-amber-600 text-slate-950 shadow-lg shadow-amber-500/20 scale-[1.02]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/50'
              }`}
            >
              <span>📊</span>
              <span>Pools & Explanations</span>
            </button>
          </div>
        </div>

        {/* ÁREA DE EXIBIÇÃO DINÂMICA DO COMPONENTE */}
        <div className="transition-all duration-300 ease-in-out">
          {activeTab === 'seat' ? (
            <div className="animate-fadeIn">
              <ECoinShareHolderSeat />
            </div>
          ) : (
            <div className="animate-fadeIn">
              <ECoinSmartPoolsExplanation />
            </div>
          )}
        </div>

      </div>
    </main>
  );
}