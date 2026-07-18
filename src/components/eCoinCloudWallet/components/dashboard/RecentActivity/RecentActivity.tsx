'use client';

import React from 'react';
import WalletCard from '../../common/WalletCard';
import Divider from '../../common/Divider';
import { ActivityItem } from './components';
import { ActivityType } from './components/ActivityIcon';
import { StatusVariant } from '../../common/StatusBadge/components/StatusDot';

export interface ActivityData {
  id: string;
  type: ActivityType;
  status: StatusVariant;
  date: string;
  amount: number;
  symbol: string;
  address?: string;
}

export interface RecentActivityProps {
  activities: ActivityData[];
  onViewAll?: () => void;
  className?: string;
}

export default function RecentActivity({
  activities,
  onViewAll,
  className = '',
}: RecentActivityProps) {
  const headerAction = onViewAll && (
    <button
      onClick={onViewAll}
      className="font-mono text-[9px] font-bold tracking-widest text-[#D4AF37] hover:text-white uppercase transition-colors"
    >
      Ver Histórico
    </button>
  );

  return (
    <WalletCard title="Atividade Recente" headerAction={headerAction} className={`w-full ${className}`}>
      {activities.length === 0 ? (
        <div className="py-6 text-center text-xs font-mono text-neutral-500 uppercase tracking-widest">
          Sem transações recentes
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {activities.map((act, index) => (
            <React.Fragment key={act.id}>
              <ActivityItem
                type={act.type}
                status={act.status}
                date={act.date}
                amount={act.amount}
                symbol={act.symbol}
                address={act.address}
              />
              {index < activities.length - 1 && <Divider className="opacity-30" />}
            </React.Fragment>
          ))}
        </div>
      )}
    </WalletCard>
  );
}