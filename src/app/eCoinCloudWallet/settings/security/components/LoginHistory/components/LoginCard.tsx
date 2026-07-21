'use client';

import React from 'react';

export default function LoginCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-neutral-900/30 p-3 rounded-xl border border-white/5 flex justify-between items-center font-mono text-[11px]">
      {children}
    </div>
  );
}