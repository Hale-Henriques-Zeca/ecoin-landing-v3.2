'use client';

import React from 'react';

interface CopyToastProps {
  visible: boolean;
}

export default function CopyToast({ visible }: CopyToastProps) {
  if (!visible) return null;
  return (
    <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-[#00FF9C] text-black text-[9px] font-mono font-bold tracking-wide rounded shadow-[0_0_10px_rgba(0,255,156,0.2)] animate-fade-in uppercase">
      Ok
    </span>
  );
}