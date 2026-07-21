'use client';

import React from 'react';
import { AlertOctagon } from 'lucide-react';

export default function DeleteWarning() {
  return (
    <div className="p-3 bg-red-950/20 border border-red-500/20 rounded-xl text-[10px] text-red-300 font-mono flex items-start gap-2">
      <AlertOctagon size={16} className="shrink-0 mt-0.5 text-red-500" />
      <p>
        A exclusão da conta apaga todos os dados e chaves vinculadas ao Cloud Vault. Certifique-se de realizar o backup das suas chaves.
      </p>
    </div>
  );
}