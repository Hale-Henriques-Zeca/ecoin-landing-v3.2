'use client';

import React from 'react';
import ActivityIcon, { ActivityType } from './ActivityIcon';
import ActivityStatus from './ActivityStatus';
import ActivityDate from './ActivityDate';
import ActivityAmount from './ActivityAmount';
import { StatusVariant } from '../../../common/StatusBadge/components/StatusDot';

interface ActivityItemProps {
  type: ActivityType;
  status: StatusVariant;
  date: string;
  amount: number;
  symbol: string;
  address?: string;
}

export default function ActivityItem({
  type,
  status,
  date,
  amount,
  symbol,
  address,
}: ActivityItemProps) {
  const typeLabels = {
    deposit: 'Depósito Recebido',
    receive: 'Transferência Recebida',
    send: 'Envio Efetuado',
    convert: 'Conversão Swap',
    reward: 'Recompensa Mint',
    claim: 'Claim Reivindicado',
  };

  const truncatedAddress = address ? `${address.slice(0, 5)}...${address.slice(-4)}` : '';

  return (
    <div className="flex items-center justify-between p-3.5 bg-white/[0.01] border border-white/[0.03] rounded-xl hover:border-white/10 transition-all select-none">
      {/* Esquerda: Ícone & Info */}
      <div className="flex items-center gap-3">
        <ActivityIcon type={type} />
        <div className="flex flex-col justify-center leading-none">
          <span className="text-xs font-bold text-white tracking-wide">
            {typeLabels[type]}
          </span>
          <div className="flex items-center gap-2 mt-1">
            <ActivityDate date={date} />
            {address && (
              <span className="font-mono text-[9px] font-extrabold text-neutral-500 uppercase">
                {truncatedAddress}
              </span>
            )}
            <ActivityStatus status={status} />
          </div>
        </div>
      </div>

      {/* Direita: Valor líquido */}
      <ActivityAmount amount={amount} symbol={symbol} type={type} />
    </div>
  );
}