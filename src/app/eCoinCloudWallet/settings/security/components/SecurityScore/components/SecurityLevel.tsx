'use client';

import React from 'react';

export type SecurityLevelType = 'Excelente' | 'Bom' | 'Médio' | 'Crítico';

export default function SecurityLevel({ level }: { level: SecurityLevelType }) {
  const styles = {
    Excelente: 'bg-[#00FF9C]/10 text-[#00FF9C] border-[#00FF9C]/30',
    Bom: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    Médio: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
    Crítico: 'bg-red-500/10 text-red-500 border-red-500/30',
  };

  return (
    <span className={`text-[10px] uppercase font-black px-2.5 py-0.5 rounded border font-mono ${styles[level]}`}>
      Nível {level}
    </span>
  );
}