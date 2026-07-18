'use client';

import React, { useState } from 'react';
import { CopyIcon, CopyLabel, CopyToast } from './components';

export interface CopyButtonProps {
  value: string;
  showText?: boolean;
  toastFeedback?: boolean;
  className?: string;
}

export default function CopyButton({
  value,
  showText = true,
  toastFeedback = false,
  className = ''
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Falha ao copiar:', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`
        relative group inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg
        bg-[#090909]/60 border border-white/5 text-neutral-400 hover:text-white
        transition-all duration-200 active:scale-95 ${className}
      `}
      title="Copiar para a Área de Transferência"
    >
      <CopyToast visible={copied && toastFeedback} />
      <CopyIcon copied={copied} />
      <CopyLabel copied={copied} showText={showText} />
    </button>
  );
}