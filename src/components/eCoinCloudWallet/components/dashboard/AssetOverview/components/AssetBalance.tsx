'use client';

import React from 'react';
import CurrencyAmount from '../../../common/CurrencyAmount';

interface AssetBalanceProps {
  balance: number;
  symbol: string;
  fiatBalance: number;
}

export default function AssetBalance({ balance, symbol, fiatBalance }: AssetBalanceProps) {
  return (
    <CurrencyAmount
      amount={balance}
      symbol={symbol}
      fiatAmount={fiatBalance}
      align="right"
    />
  );
}