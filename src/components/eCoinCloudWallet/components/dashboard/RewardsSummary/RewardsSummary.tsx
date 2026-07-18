'use client';

import React from 'react';
import WalletCard from '../../common/WalletCard';
import ActionButton from '../../common/ActionButton';
import { RewardCard } from './components';

export interface RewardItemData {
  id: string;
  title: string;
  earned: number;
  maxCapacity?: number;
  symbol: string;
}

export interface RewardsSummaryProps {
  rewards: RewardItemData[];
  totalEarned: number;
  totalSymbol: string;
  onClaimAll: () => void;
  className?: string;
}

export default function RewardsSummary({
  rewards,
  totalEarned,
  totalSymbol,
  onClaimAll,
  className = '',
}: RewardsSummaryProps) {
  const formattedTotal = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  }).format(totalEarned);

  const headerAction = (
    <div className="flex items-center gap-2 select-none">
      <span className="font-mono text-[9px] font-bold text-neutral-500 uppercase tracking-widest">
        Total pendente:
      </span>
      <span className="font-mono text-xs font-black text-white">
        {formattedTotal} <span className="text-[#D4AF37] text-[9px]">{totalSymbol}</span>
      </span>
    </div>
  );

  const footerAction = (
    <ActionButton
      variant="primary"
      label="Resgatar Todas as Recompensas"
      onClick={onClaimAll}
      className="w-full h-10 font-mono text-[10px] tracking-widest"
    />
  );

  return (
    <WalletCard
      title="Recompensas do Protocolo"
      headerAction={headerAction}
      footer={footerAction}
      className={`w-full ${className}`}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
        {rewards.map((rw) => (
          <RewardCard
            key={rw.id}
            title={rw.title}
            earned={rw.earned}
            maxCapacity={rw.maxCapacity}
            symbol={rw.symbol}
          />
        ))}
      </div>
    </WalletCard>
  );
}