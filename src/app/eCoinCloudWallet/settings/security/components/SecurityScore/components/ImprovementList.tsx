'use client';

import React from 'react';
import { AlertTriangle, PlusCircle } from 'lucide-react';

export default function ImprovementList() {
  const improvements = [
    { title: 'Adicionar segundo Guardião', pts: '+4 pts' },
    { title: 'Configurar YubiKey / WebAuthn', pts: '+5 pts' },
  ];

  return (
    <div className="flex flex-col gap-2 font-mono">
      <span className="text-[10px] uppercase font-bold text-neutral-400">Melhorias Recomendadas</span>
      {improvements.map((imp, idx) => (
        <div key={idx} className="flex justify-between items-center p-2 bg-black/40 border border-white/5 rounded-lg text-[11px]">
          <span className="text-neutral-300 flex items-center gap-1.5">
            <AlertTriangle size={12} className="text-yellow-500" /> {imp.title}
          </span>
          <span className="text-[#00FF9C] font-bold text-[10px]">{imp.pts}</span>
        </div>
      ))}
    </div>
  );
}