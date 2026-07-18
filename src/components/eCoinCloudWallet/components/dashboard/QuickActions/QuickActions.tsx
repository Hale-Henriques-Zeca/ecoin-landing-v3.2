'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';
import WalletCard from '../../common/WalletCard';
import { ActionGrid, ActionItem } from './components';

export interface ActionDefinition {
  id: string;
  label: string;
  icon: LucideIcon;
}

export interface QuickActionsProps {
  actions: ActionDefinition[];
  onActionClick: (actionId: string) => void;
  className?: string;
}

export default function QuickActions({
  actions,
  onActionClick,
  className = '',
}: QuickActionsProps) {
  return (
    <WalletCard title="Acesso Rápido" className={`w-full max-w-md ${className}`}>
      <ActionGrid>
        {actions.map((act) => (
          <ActionItem
            key={act.id}
            label={act.label}
            icon={act.icon}
            onClick={() => onActionClick(act.id)}
          />
        ))}
      </ActionGrid>
    </WalletCard>
  );
}