'use client';

import React, { useState } from 'react';
import { Copy, Check, LucideIcon } from 'lucide-react';
import { InfoLabel, InfoValue, InfoIcon, InfoBadge } from './components';

export interface InfoRowProps {
  label: string;
  value: string | React.ReactNode;
  icon?: LucideIcon;
  badge?: string;
  copyable?: boolean;
  highlightValue?: boolean;
  className?: string;
}

export default function InfoRow({
  label,
  value,
  icon,
  badge,
  copyable = false,
  highlightValue = false,
  className = ''
}: InfoRowProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!copyable || typeof value !== 'string') return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error('Falha ao copiar:', err);
    }
  };

  return (
    <div className={`flex items-center justify-between py-2.5 border-b border-white/[0.03] last:border-b-0 hover:bg-white/[0.01] px-1 rounded-lg transition-colors ${className}`}>
      
      {/* Esquerda: Ícone + Label */}
      <div className="flex items-center gap-1.5 select-none">
        <InfoIcon icon={icon} />
        <InfoLabel>{label}</InfoLabel>
        <InfoBadge>{badge}</InfoBadge>
      </div>

      {/* Direita: Valor + Cópia Opcional */}
      <div className="flex items-center gap-1.5 max-w-[65%]">
        <InfoValue highlight={highlightValue}>{value}</InfoValue>
        
        {copyable && typeof value === 'string' && (
          <button
            onClick={handleCopy}
            className="p-1 rounded hover:bg-white/5 text-neutral-500 hover:text-white transition-colors"
          >
            {copied ? (
              <Check size={12} className="text-[#00FF9C]" />
            ) : (
              <Copy size={12} />
            )}
          </button>
        )}
      </div>

    </div>
  );
}