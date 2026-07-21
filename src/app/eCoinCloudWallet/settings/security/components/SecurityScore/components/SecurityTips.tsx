'use client';

import React from 'react';
import { Lightbulb } from 'lucide-react';

export default function SecurityTips() {
  return (
    <div className="p-3 bg-neutral-900/50 border border-white/5 rounded-xl font-mono text-[11px] text-neutral-400 flex items-start gap-2.5">
      <Lightbulb size={16} className="text-[#D4AF37] shrink-0 mt-0.5" />
      <p>Aumente a segurança ativando autenticação por biometria ou Passkey no seu dispositivo principal.</p>
    </div>
  );
}