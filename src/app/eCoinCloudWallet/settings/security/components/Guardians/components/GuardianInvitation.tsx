'use client';

import React from 'react';
import { UserPlus } from 'lucide-react';

export default function GuardianInvitation() {
  return (
    <button className="h-8 px-3 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-xl font-mono text-[10px] font-bold uppercase flex items-center gap-1.5 hover:bg-purple-500/20 transition-all">
      <UserPlus size={12} /> Convidar Guardião
    </button>
  );
}