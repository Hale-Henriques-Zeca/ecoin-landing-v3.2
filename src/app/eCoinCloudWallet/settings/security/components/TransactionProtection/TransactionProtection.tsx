'use client';

import React from 'react';
import { Shield } from 'lucide-react';
import {
  LargeTransferAlert,
  NewAddressAlert,
  DailyLimit,
  SpendingLimit,
  AITransactionReview,
  ProtectionStatus
} from './components';

export default function TransactionProtection() {
  return (
    <div className="bg-black/40 border border-white/5 rounded-2xl p-5 font-mono flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
          <Shield size={14} className="text-yellow-500" /> Proteção de Transações & Regras de Gastos
        </h3>
        <ProtectionStatus />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <LargeTransferAlert />
        <NewAddressAlert />
        <DailyLimit />
        <SpendingLimit />
      </div>

      <AITransactionReview />
    </div>
  );
}