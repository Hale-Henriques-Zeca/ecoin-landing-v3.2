'use client';

import React from 'react';
import { LogOut } from 'lucide-react';

export default function LogoutAllSessions() {
  return (
    <button className="text-[10px] font-bold text-red-400 hover:text-red-300 uppercase flex items-center gap-1.5 font-mono">
      <LogOut size={12} /> Encerrar Todas as Outras Sessões
    </button>
  );
}