'use client';

import React from 'react';
import StatusBadge from '../../../common/StatusBadge';
import { StatusVariant } from '../../../common/StatusBadge/components/StatusDot';

interface ActivityStatusProps {
  status: StatusVariant;
}

export default function ActivityStatus({ status }: ActivityStatusProps) {
  const labels = {
    connected: 'Concluído',
    pending: 'Pendente',
    offline: 'Falhado',
    sponsored: 'Gas Sponsorizado',
    processing: 'Processando',
  };

  return <StatusBadge variant={status} label={labels[status]} className="border-0 bg-transparent p-0 scale-90" />;
}