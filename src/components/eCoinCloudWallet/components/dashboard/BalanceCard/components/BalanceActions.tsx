'use client';

import React from 'react';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import ActionButton from '../../../common/ActionButton';

interface BalanceActionsProps {
  onSend: () => void;
  onReceive: () => void;
}

export default function BalanceActions({ onSend, onReceive }: BalanceActionsProps) {
  return (
    <div className="grid grid-cols-2 gap-3 mt-4">
      <ActionButton
        variant="secondary"
        label="Enviar"
        icon={ArrowUpRight}
        iconPosition="left"
        onClick={onSend}
        className="w-full h-10 rounded-xl font-mono"
      />
      <ActionButton
        variant="primary"
        label="Depositar"
        icon={ArrowDownLeft}
        iconPosition="left"
        onClick={onReceive}
        className="w-full h-10 rounded-xl font-mono"
      />
    </div>
  );
}