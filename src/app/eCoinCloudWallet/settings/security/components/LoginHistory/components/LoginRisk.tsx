'use client';

import React from 'react';

export default function LoginRisk({ risk }: { risk: 'Baixo' | 'Médio' | 'Alto' }) {
  const colors = {
    Baixo: 'text-[#00FF9C]',
    Médio: 'text-yellow-400',
    Alto: 'text-red-500'
  };

  return <span className={`text-[9px] uppercase font-bold ${colors[risk]}`}>Risco {risk}</span>;
}