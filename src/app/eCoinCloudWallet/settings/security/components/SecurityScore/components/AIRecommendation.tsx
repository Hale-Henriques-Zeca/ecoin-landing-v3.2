'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';

export default function AIRecommendation() {
  return (
    <div className="bg-gradient-to-r from-purple-950/30 to-black border border-purple-500/20 rounded-xl p-3.5 font-mono">
      <div className="flex items-center gap-2 text-[#D4AF37] text-[10px] font-bold uppercase mb-1">
        <Sparkles size={12} /> Diagnóstico eCoin AI Engine
      </div>
      <p className="text-[11px] text-neutral-300 leading-relaxed">
        Sua conta possui padrões normais de navegação. Nenhuma tentativa de força bruta ou Phishing foi detectada nas últimas 72 horas.
      </p>
    </div>
  );
}