'use client';

import React, { useState } from 'react';
import DesktopSidebar from './components/Desktop/DesktopSidebar';
import DesktopHeader from './components/Desktop/DesktopHeader';
import MobileHeader from './components/Mobile/MobileHeader';
import MobileBar from './components/Mobile/MobileBar';

import WhyEcnTrading from './components/WhyEcnTrading';
import CompoundingEffectConcept from './components/CompoundingEffectConcept';
import MiningpageCTA from '@/components/CTA/MiningpageCTA/MiningpageCTA';

export default function EcnTradingAICompoundingConceptPage() {
  // Estado para alternar entre as abas principais
  const [activeTab, setActiveTab] = useState<'why' | 'compound'>('why');

  return (
    <div className="min-h-screen bg-[#070a12] text-white flex flex-col md:flex-row">
      
      {/* SIDEBAR DESKTOP (Apenas telas grandes md+) */}
      <aside className="hidden md:block w-64 shrink-0 border-r border-slate-800/80 bg-slate-950/90 min-h-screen">
        <DesktopSidebar />
      </aside>

      {/* ÁREA PRINCIPAL */}
      <div className="flex-1 flex flex-col min-w-0 pb-24 md:pb-12">
        
        {/* NAVEGAÇÃO SUPERIOR RESPONSIVA */}
        <header className="sticky top-0 z-40 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80">
          {/* Header Mobile */}
          <div className="md:hidden">
            <MobileHeader />
          </div>
          {/* Header Desktop */}
          <div className="hidden md:block">
            <DesktopHeader />
          </div>
        </header>

        {/* MENSAGEM / CONTROLES DE ABAS DA PÁGINA */}
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-8">
          
          {/* CABEÇALHO DO MÓDULO */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-slate-900/60 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
                ecnTrading AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-amber-500">Compounding Concept</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Conceito de Inteligência de Mercado, Manifesto do CEO e Simulações de Escala Neural.
              </p>
            </div>

            {/* SELETOR DE ABAS */}
            <div className="inline-flex p-1.5 bg-black/80 border border-slate-800 rounded-2xl w-full sm:w-auto">
              <button
                onClick={() => setActiveTab('why')}
                className={`flex-1 sm:flex-none px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeTab === 'why'
                    ? 'bg-gradient-to-r from-[#D4AF37] to-amber-600 text-slate-950 shadow-lg shadow-amber-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Por que o ecnTrading Bot?
              </button>

              <button
                onClick={() => setActiveTab('compound')}
                className={`flex-1 sm:flex-none px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeTab === 'compound'
                    ? 'bg-gradient-to-r from-[#D4AF37] to-amber-600 text-slate-950 shadow-lg shadow-amber-500/20'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Efeito Compounding
              </button>
            </div>
          </div>

          {/* EXIBIÇÃO DINÂMICA CONFORME A ABA SELECIONADA */}
          <div className="transition-all duration-300">
            {activeTab === 'why' ? (
              <WhyEcnTrading />
            ) : (
              <CompoundingEffectConcept />
            )}
          </div>

          {/* CTAS COMPLEMENTARES NO RODAPÉ */}
<div className="flex justify-center items-center pt-8 border-t border-slate-800">
  <div className="w-full max-w-xl">
    <MiningpageCTA />
  </div>
</div>

        </main>
      </div>

      {/* BARRA NAVEGAÇÃO INFERIOR FIXA PARA MOBILE */}
      <div className="md:hidden">
        <MobileBar />
      </div>

    </div>
  );
}