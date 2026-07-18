'use client';

import React from 'react';
import AssetIcon from './AssetIcon';
import AssetBalance from './AssetBalance';
import AssetPrice from './AssetPrice';
import AssetTrend from './AssetTrend';

interface AssetRowProps {
  name: string;
  symbol: string;
  iconUrl?: string;
  balance: number;
  fiatBalance: number;
  price: number;
  trend24h: number;
  onClick?: () => void;
}

export default function AssetRow({
  name,
  symbol,
  iconUrl,
  balance,
  fiatBalance,
  price,
  trend24h,
  onClick,
}: AssetRowProps) {
  return (
    <div
      onClick={onClick}
      className={`
        flex items-center justify-between p-3 rounded-xl border border-transparent 
        hover:border-white/5 hover:bg-white/[0.01] transition-all duration-200 cursor-pointer
      `}
    >
      {/* Ativo Esquerda */}
      <div className="flex items-center gap-3">
        <AssetIcon src={iconUrl} symbol={symbol} />
        <div className="flex flex-col">
          <span className="text-xs font-bold text-white tracking-wide">{name}</span>
          <div className="flex items-center gap-1.5 mt-0.5">
            <AssetPrice price={price} />
            <AssetTrend trend24h={trend24h} />
          </div>
        </div>
      </div>

      {/* Saldo Direita */}
      <AssetBalance balance={balance} symbol={symbol} fiatBalance={fiatBalance} />
    </div>
  );
}