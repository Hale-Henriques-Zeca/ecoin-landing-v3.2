'use client';

import React from 'react';
import Link from 'next/link';
import { Bot, ArrowRight, Sparkles, TrendingUp } from 'lucide-react';

export default function EcnTradingCompoundConceptCTA() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-black border border-[#D4AF37]/30 rounded-[2.5rem] p-6 sm:p-8 shadow-2xl hover:border-[#D4AF37]/60 transition-all duration-300 group">
      
      {/* Efeitos de Iluminação em Segundo Plano (Glow Effects) */}
      <div className="absolute -top-20 -right-20 w-44 h-44 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#D4AF37]/20 transition-all duration-500" />
      <div className="absolute -bottom-20 -left-20 w-44 h-44 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col justify-between h-full space-y-6">
        
        {/* Cabeçalho e Título */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-mono font-bold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Modelo de Escala Neural</span>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-3 bg-white/5 border border-white/10 rounded-2xl text-[#D4AF37] shadow-inner group-hover:scale-105 transition-transform duration-300">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-white group-hover:text-[#D4AF37] transition-colors leading-snug">
                Entenda o porquê de se criar a ecnTrading Bot e o efeito de juros compostos
              </h3>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Descubra a matemática por trás da escala exponencial de rendimentos, negociações de alta frequência e como o acúmulo por ciclo transforma o ecossistema eCoin.
          </p>
        </div>

        {/* Botão de Redirecionamento */}
        <div className="pt-2">
          <Link
            href="/ecnTradingAICompoundingConcept"
            className="inline-flex items-center justify-center gap-2 w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-amber-400 to-yellow-500 text-black font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:brightness-110 active:scale-[0.98] transition-all"
          >
            <TrendingUp className="w-4 h-4" />
            <span>Acessar Simulação & Conceito</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </div>
  );
}