'use client';

import React from 'react';
import WalletCard from '../../common/WalletCard';
import Divider from '../../common/Divider';
import { AssetRow } from './components';

export interface AssetData {
  name: string;
  symbol: string;
  iconUrl?: string;
  balance: number;
  fiatBalance: number;
  price: number;
  trend24h: number;
}

export interface AssetOverviewProps {
  assets: AssetData[];
  onAssetClick?: (symbol: string) => void;
  onViewAll?: () => void;
  className?: string;
}

export default function AssetOverview({
  assets,
  onAssetClick,
  onViewAll,
  className = '',
}: AssetOverviewProps) {
  const headerAction = onViewAll && (
    <button
      onClick={onViewAll}
      className="font-mono text-[9px] font-bold tracking-widest text-[#D4AF37] hover:text-white uppercase transition-colors"
    >
      Ver Todos
    </button>
  );

  return (
    <WalletCard title="Meus Ativos" headerAction={headerAction} className={`w-full ${className}`}>
      <div className="flex flex-col gap-1.5">
        {assets.map((asset, index) => (
          <React.Fragment key={asset.symbol}>
            <AssetRow
              name={asset.name}
              symbol={asset.symbol}
              iconUrl={asset.iconUrl}
              balance={asset.balance}
              fiatBalance={asset.fiatBalance}
              price={asset.price}
              trend24h={asset.trend24h}
              onClick={() => onAssetClick?.(asset.symbol)}
            />
            {index < assets.length - 1 && <Divider className="opacity-30" />}
          </React.Fragment>
        ))}
      </div>
    </WalletCard>
  );
}