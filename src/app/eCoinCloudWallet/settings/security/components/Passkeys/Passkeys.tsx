'use client';

import React from 'react';
import { Fingerprint } from 'lucide-react';
import { RegisteredPasskeys, AddPasskey } from './components';

export default function Passkeys() {
  return (
    <div className="bg-black/40 border border-white/5 rounded-2xl p-5 font-mono">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
          <Fingerprint size={14} className="text-[#00FF9C]" /> Passkeys & Chaves Biométricas
        </h3>
        <AddPasskey />
      </div>
      <RegisteredPasskeys />
    </div>
  );
}