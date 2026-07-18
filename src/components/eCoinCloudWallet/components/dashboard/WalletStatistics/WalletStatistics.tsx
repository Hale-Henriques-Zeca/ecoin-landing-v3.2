'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';
import WalletCard from '../../common/WalletCard';
import { StatisticItem } from './components';

export interface StatItemData {
  label: string;
  value: string | number;
  icon: LucideIcon;
}

export interface WalletStatisticsProps {
  stats: StatItemData[];
  className?: string;
}

export default function WalletStatistics({ stats, className = '' }: WalletStatisticsProps) {
  return (
    <WalletCard title="Métricas da Carteira" className={`w-full ${className}`}>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full">
        {stats.map((st) => (
          <StatisticItem
            key={st.label}
            label={st.label}
            value={st.value}
            icon={st.icon}
          />
        ))}
      </div>
    </WalletCard>
  );
}