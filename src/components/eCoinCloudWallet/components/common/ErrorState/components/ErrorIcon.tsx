'use client';

import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function ErrorIcon() {
  return (
    <div className="relative w-16 h-16 rounded-2xl bg-red-500/5 border border-red-500/20 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(239,68,68,0.05)] animate-pulse">
      <AlertCircle size={28} className="text-red-400" />
    </div>
  );
}