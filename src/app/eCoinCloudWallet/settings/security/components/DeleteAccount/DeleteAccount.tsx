'use client';

import React from 'react';
import { Trash2 } from 'lucide-react';
import {
  DeleteWarning,
  DataExport,
  RecoveryNotice,
  DeleteButton
} from './components';

export default function DeleteAccount() {
  return (
    <div className="bg-black/40 border border-red-500/10 rounded-2xl p-5 font-mono flex flex-col gap-4">
      <h3 className="text-xs font-black text-red-500 uppercase tracking-wider flex items-center gap-2">
        <Trash2 size={14} /> Zona de Perigo • Eliminação da Conta
      </h3>
      <DeleteWarning />
      <div className="flex justify-between items-center pt-2">
        <div>
          <DataExport />
          <RecoveryNotice />
        </div>
        <DeleteButton />
      </div>
    </div>
  );
}