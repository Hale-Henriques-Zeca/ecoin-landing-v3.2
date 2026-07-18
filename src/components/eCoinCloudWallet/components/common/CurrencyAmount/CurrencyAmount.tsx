'use client';

import React from 'react';
import { AmountValue, AmountSymbol, FiatValue } from './components';

export interface CurrencyAmountProps {
  amount: number;
  symbol: string;
  fiatAmount?: number;
  fiatSymbol?: string;
  align?: 'left' | 'right' | 'center';
  className?: string;
}

export default function CurrencyAmount({
  amount,
  symbol,
  fiatAmount,
  fiatSymbol = 'USD',
  align = 'left',
  className = ''
}: CurrencyAmountProps) {
  const alignments = {
    left: 'items-start',
    right: 'items-end text-right',
    center: 'items-center text-center'
  };

  return (
    <div className={`flex flex-col leading-none ${alignments[align]} ${className}`}>
      {/* Cripto Ativo Líquido */}
      <div className="flex items-baseline gap-1.5">
        <AmountValue value={amount} />
        <AmountSymbol symbol={symbol} />
      </div>

      {/* Estimativa Fiat Equivalente */}
      <FiatValue fiatAmount={fiatAmount} fiatSymbol={fiatSymbol} />
    </div>
  );
}