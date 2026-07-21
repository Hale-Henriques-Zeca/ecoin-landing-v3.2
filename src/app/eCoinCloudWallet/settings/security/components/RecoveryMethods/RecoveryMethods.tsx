'use client';

import React from 'react';
import { RefreshCw } from 'lucide-react';
import {
  EmailRecovery,
  PhoneRecovery,
  GuardianRecovery,
  BackupDevice,
  RecoveryStatus,
  RecoveryActions,
  RecoveryHistory
} from './components';

export default function RecoveryMethods() {
  return (
    <div className="bg-black/40 border border-white/5 rounded-2xl p-5 font-mono flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
          <RefreshCw size={14} className="text-[#D4AF37]" /> Métodos de Recuperação de Carteira
        </h3>
        <RecoveryStatus />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        <EmailRecovery />
        <PhoneRecovery />
        <GuardianRecovery />
        <BackupDevice />
      </div>

      <div className="flex justify-between items-center border-t border-white/5 pt-3">
        <RecoveryHistory />
        <RecoveryActions />
      </div>
    </div>
  );
}