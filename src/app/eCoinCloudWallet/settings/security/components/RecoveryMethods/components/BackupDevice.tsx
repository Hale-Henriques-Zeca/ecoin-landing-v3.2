'use client';

import React from 'react';
import { Key } from 'lucide-react';

export default function BackupDevice() {
  return (
    <div className="bg-neutral-900/40 p-3.5 rounded-xl border border-white/5 flex items-center justify-between font-mono">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-[#D4AF37]/10 text-[#D4AF37] rounded-lg">
          <Key size={16} />
        </div>
        <div>
          <span className="text-xs font-bold text-white block">Hardware Key Backup</span>
          <span className="text-[10px] text-neutral-500">YubiKey 5C NFC</span>
        </div>
      </div>
      <span className="text-[10px] text-[#D4AF37] font-bold">Ativo</span>
    </div>
  );
}