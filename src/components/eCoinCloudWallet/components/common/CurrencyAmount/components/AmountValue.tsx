'use client';

import React from 'react';

interface AmountValueProps {
  value: number;
}

export default function AmountValue({ value }: AmountValueProps) {
  // Formata o número com separador de milhares e decimais fixos (até 6 casas para cripto)
  const formatted = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 6
  }).format(value);

  return (
    <span className="font-mono text-base md:text-lg font-black tracking-tight text-white">
      {formatted}
    </span>
  );
}