'use client';

import React from 'react';
import EcnTradingAICompoundingConceptCTA from '@/components/CTA/EcnTradingAICompoundingConceptCTA/EcnTradingAICompoundingConceptCTA';

export default function ECoinProfit() {
  return (
    <div className="space-y-5">
      {/* Lucro Total eCoin Card (Gradiente e Borda Dourada) */}
      <div className="bg-gradient-to-r from-amber-950 via-yellow-950 to-amber-900 border border-[#D4AF37]/30 rounded-2xl p-4">
        <span className="text-xs text-[#D4AF37] block font-medium">Lucro Total eCoin (Realizado)</span>
        <div className="text-2xl font-extrabold text-white my-1">
          0.00 eCoin
        </div>
        <span className="text-xs text-[#D4AF37] font-bold bg-[#D4AF37]/20 px-2 py-0.5 rounded-full inline-block">
          ▲ +0,00%
        </span>
      </div>

      {/* Disponível para Levantamento eCoin */}
      <div className="bg-[#12181F] border border-gray-800 rounded-2xl p-4">
        <span className="text-xs text-gray-400 block mb-1">Disponível para Levantamento (eCoin)</span>
        <div className="text-xl font-bold text-[#D4AF37] mb-4">
          0.00 eCoin
        </div>

        <button
          disabled
          className="w-full py-3 bg-[#D4AF37]/50 text-black font-extrabold rounded-xl shadow-lg mb-3 cursor-not-allowed"
        >
          Levantar Lucros eCoin
        </button>

        <div className="grid grid-cols-2 gap-2 text-center text-xs">
          <button className="py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700">
            Reinvestir
          </button>
          <button className="py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700">
            Converter
          </button>
        </div>
      </div>

      {/* CTA Component */}
      <EcnTradingAICompoundingConceptCTA />
    </div>
  );
}