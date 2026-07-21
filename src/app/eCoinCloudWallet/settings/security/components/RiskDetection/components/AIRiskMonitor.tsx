'use client';

import React from 'react';
import { Cpu } from 'lucide-react';

export default function AIRiskMonitor() {
  return (
    <div className="flex items-center gap-2 text-[#00FF9C] text-xs font-bold uppercase font-mono">
      <Cpu size={16} /> eCoin AI Security Engine v2.4
    </div>
  );
}