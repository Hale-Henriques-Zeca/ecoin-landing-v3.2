'use client';

import React from 'react';

interface FiatValueProps {
  fiatAmount?: number;
  fiatSymbol?: string;
}

export default function FiatValue({ fiatAmount, fiatSymbol = 'USD' }: FiatValueProps) {
  if (fiatAmount === undefined) return null;

  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: fiatSymbol,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(fiatAmount);

  return (
    <span className="text-[10px] md:text-xs font-mono font-semibold text-neutral-500 tracking-wider mt-0.5 select-none">
      &approx; {formatted}
    </span>
  );
}