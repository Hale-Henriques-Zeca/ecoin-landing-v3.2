'use client';

import React from 'react';
import CurrencyAmount from '../../../common/CurrencyAmount';

interface BalanceAmountProps {
  amount: number;
  symbol: string;
  fiatAmount?: number;
  fiatSymbol?: string;
  isBalanceHidden: boolean;
}

export default function BalanceAmount({
  amount,
  symbol,
  fiatAmount,
  fiatSymbol = 'USD',
  isBalanceHidden,
}: BalanceAmountProps) {
  if (isBalanceHidden) {
    return (
      <div className="flex flex-col py-1">
        <div className="font-mono text-xl md:text-2xl font-black text-white tracking-wider">
          •••••• <span className="text-xs text-[#D4AF37]">{symbol}</span>
        </div>
        <div className="text-xs font-mono text-neutral-500 tracking-wider mt-1">
          &approx; •••••• {fiatSymbol}
        </div>
      </div>
    );
  }

  return (
    <div className="py-1">
      <CurrencyAmount
        amount={amount}
        symbol={symbol}
        fiatAmount={fiatAmount}
        fiatSymbol={fiatSymbol}
        align="left"
      />
    </div>
  );
}