'use client';

import React from 'react';
import { Copy, QrCode, ExternalLink, Check } from 'lucide-react';

interface AddressActionsProps {
  address: string;
  onShowQR?: () => void;
  explorerUrl?: string;
}

export default function AddressActions({ address, onShowQR, explorerUrl }: AddressActionsProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex items-center gap-2 mt-2">
      <button
        onClick={handleCopy}
        className="flex-1 flex items-center justify-center gap-1.5 h-9 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 text-xs font-mono font-bold text-neutral-300 hover:text-white transition-all active:scale-98"
      >
        {copied ? (
          <>
            <Check size={13} className="text-[#00FF9C]" />
            <span className="text-[#00FF9C]">Copiado!</span>
          </>
        ) : (
          <>
            <Copy size={13} />
            <span>Copiar</span>
          </>
        )}
      </button>

      {onShowQR && (
        <button
          onClick={onShowQR}
          className="p-2.5 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 text-neutral-300 hover:text-white transition-all active:scale-98"
          title="Mostrar Código QR"
        >
          <QrCode size={14} />
        </button>
      )}

      {explorerUrl && (
        <a
          href={explorerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 text-neutral-300 hover:text-[#D4AF37] transition-all active:scale-98"
          title="Ver no Explorer"
        >
          <ExternalLink size={14} />
        </a>
      )}
    </div>
  );
}