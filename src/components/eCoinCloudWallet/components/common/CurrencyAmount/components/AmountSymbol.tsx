'use client';

import React from 'react';

interface AmountSymbolProps {
  symbol: string;
}

export default function AmountSymbol({ symbol }: AmountSymbolProps) {
  return (
    <span className="font-mono text-xs md:text-sm font-bold tracking-widest text-[#D4AF37] uppercase select-none">
      {symbol}
    </span>
  );
}