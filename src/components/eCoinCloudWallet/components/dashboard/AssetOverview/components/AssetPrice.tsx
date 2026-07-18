'use client';

import React from 'react';

interface AssetPriceProps {
  price: number;
  fiatSymbol?: string;
}

export default function AssetPrice({ price, fiatSymbol = 'USD' }: AssetPriceProps) {
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: fiatSymbol,
    minimumFractionDigits: 2,
    maximumFractionDigits: 6
  }).format(price);

  return (
    <span className="font-mono text-xs font-bold text-neutral-300">
      {formatted}
    </span>
  );
}