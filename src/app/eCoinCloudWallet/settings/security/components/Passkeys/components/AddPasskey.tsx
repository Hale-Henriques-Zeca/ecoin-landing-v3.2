'use client';

import React from 'react';
import { Fingerprint, Plus } from 'lucide-react';

export default function AddPasskey() {
  return (
    <button className="h-8 px-3 bg-[#00FF9C]/10 text-[#00FF9C] border border-[#00FF9C]/20 rounded-xl font-mono text-[10px] font-bold uppercase flex items-center gap-1.5 hover:bg-[#00FF9C]/20 transition-all">
      <Plus size={12} /> Registrar Passkey WebAuthn
    </button>
  );
}