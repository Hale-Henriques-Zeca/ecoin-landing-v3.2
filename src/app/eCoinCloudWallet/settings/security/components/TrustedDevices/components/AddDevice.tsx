'use client';

import React from 'react';
import { Plus } from 'lucide-react';

export default function AddDevice() {
  return (
    <button className="h-8 px-3 bg-white/5 text-white border border-white/10 rounded-xl font-mono text-[10px] font-bold uppercase flex items-center gap-1.5 hover:bg-white/10 transition-all">
      <Plus size={12} /> Registrar Novo Dispositivo
    </button>
  );
}