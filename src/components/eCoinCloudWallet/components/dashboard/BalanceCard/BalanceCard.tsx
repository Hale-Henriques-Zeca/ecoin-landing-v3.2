'use client';

import React from 'react';
import WalletCard from '../../common/WalletCard';
import Divider from '../../common/Divider';
import { BalanceHeader, BalanceAmount, BalanceChange, BalanceActions } from './components';

export interface BalanceCardProps {
  amount: number;
  symbol: string;
  fiatAmount?: number;
  fiatSymbol?: string;
  trend: number;
  lastUpdated?: string;
  isBalanceHidden: boolean;
  onToggleHide: () => void;
  onSend: () => void;
  onReceive: () => void;
  className?: string;
}

export default function BalanceCard({
  amount,
  symbol,
  fiatAmount,
  fiatSymbol = 'USD',
  trend,
  lastUpdated,
  isBalanceHidden,
  onToggleHide,
  onSend,
  onReceive,
  className = '',
}: BalanceCardProps) {
  return (
    <WalletCard glow className={`w-full max-w-md ${className}`}>
      <div className="flex flex-col gap-3">
        <BalanceHeader 
          lastUpdated={lastUpdated} 
          isBalanceHidden={isBalanceHidden} 
          onToggleHide={onToggleHide} 
        />
        <BalanceAmount 
          amount={amount} 
          symbol={symbol} 
          fiatAmount={fiatAmount} 
          fiatSymbol={fiatSymbol} 
          isBalanceHidden={isBalanceHidden} 
        />
        <BalanceChange trend={trend} />
        <Divider className="my-1 opacity-50" />
        <BalanceActions onSend={onSend} onReceive={onReceive} />
      </div>
    </WalletCard>
  );
}