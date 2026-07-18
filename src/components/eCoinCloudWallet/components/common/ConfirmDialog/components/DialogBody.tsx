'use client';

import React from 'react';

interface DialogBodyProps {
  children: React.ReactNode;
}

export default function DialogBody({ children }: DialogBodyProps) {
  return (
    <div className="py-4 font-mono text-neutral-400 text-xs font-semibold leading-relaxed select-none">
      {children}
    </div>
  );
}