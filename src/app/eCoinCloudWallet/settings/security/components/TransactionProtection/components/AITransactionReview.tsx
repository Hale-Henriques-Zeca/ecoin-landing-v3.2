'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';

export default function AITransactionReview() {
  return (
    <div className="p-3 bg-purple-950/20 border border-purple-500/20 rounded-xl font-mono text-[11px] flex items-center gap-2 text-purple-300">
      <Sparkles size={14} className="text-[#D4AF37] shrink-0" />
      <span>eCoin AI analisa a calibração de slippage e riscos de honeypot antes do broadcast.</span>
    </div>
  );
}