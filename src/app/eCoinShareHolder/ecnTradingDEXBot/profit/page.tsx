'use client';

import MobileBar from '../components/Mobile/MobileBar';
import EcnTradingAICompoundingConceptCTA from '@/components/CTA/EcnTradingAICompoundingConceptCTA/EcnTradingAICompoundingConceptCTA';

export default function ProfitPage() {
  return (
    <div className="min-h-screen bg-[#0B0E14] text-white pb-24 px-4 pt-4">
      <h1 className="text-xl font-bold text-yellow-400 mb-1">Meus Lucros</h1>
      <p className="text-xs text-gray-400 mb-4">Resultados realizados pelos robôs de mineração e arbitragem.</p>

      {/* Lucro Total Card */}
      <div className="bg-gradient-to-r from-emerald-950 to-teal-900 border border-emerald-500/30 rounded-2xl p-4 mb-5">
        <span className="text-xs text-emerald-300 block">Lucro Total (Realizado)</span>
        <div className="text-2xl font-extrabold text-white my-1">$8 709,24</div>
        <span className="text-xs text-emerald-400 font-bold bg-emerald-500/20 px-2 py-0.5 rounded-full inline-block">
          ▲ +12,45%
        </span>
      </div>

      {/* Disponível para Levantamento */}
      <div className="bg-[#12181F] border border-gray-800 rounded-2xl p-4 mb-6">
        <span className="text-xs text-gray-400 block mb-1">Disponível para Levantamento</span>
        <div className="text-xl font-bold text-emerald-400 mb-4">$1 827,36</div>

        <button className="w-full py-3 bg-emerald-500 text-black font-extrabold rounded-xl hover:bg-emerald-400 shadow-lg shadow-emerald-500/20 mb-3">
          Levantar Lucros
        </button>

        <div className="grid grid-cols-2 gap-2 text-center text-xs">
          <button className="py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700">Reinvestir</button>
          <button className="py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700">Converter</button>
        </div>
      </div>

      {/* CTA no Topo */}
            <EcnTradingAICompoundingConceptCTA />
      

      
    </div>
  );
}