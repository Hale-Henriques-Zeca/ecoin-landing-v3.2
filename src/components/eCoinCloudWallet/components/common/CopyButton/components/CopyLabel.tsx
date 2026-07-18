'use client';

import React from 'react';

interface CopyLabelProps {
  copied: boolean;
  showText?: boolean;
}

export default function CopyLabel({ copied, showText = true }: CopyLabelProps) {
  if (!showText) return null;
  return (
    <span className="font-mono text-[10px] font-bold tracking-wider uppercase select-none">
      {copied ? 'Copiado!' : 'Copiar'}
    </span>
  );
}