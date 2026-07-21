'use client';

import React from 'react';
import { ShieldCheck } from 'lucide-react';
import {
  AuthenticatorApp,
  SMSVerification,
  EmailVerification,
  BackupCodes,
  RecoveryCodes,
  EnableTwoFactor,
  TwoFactorStatus
} from './components';

export default function TwoFactor() {
  return (
    <div className="bg-black/40 border border-white/5 rounded-2xl p-5 font-mono flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
          <ShieldCheck size={14} className="text-[#00FF9C]" /> Autenticação de Dois Fatores (2FA)
        </h3>
        <TwoFactorStatus />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <AuthenticatorApp />
        <SMSVerification />
        <EmailVerification />
        <BackupCodes />
        <RecoveryCodes />
      </div>

      <div className="flex justify-end pt-2">
        <EnableTwoFactor />
      </div>
    </div>
  );
}