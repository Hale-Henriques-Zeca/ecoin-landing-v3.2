'use client';

import React from 'react';
import { Download, Share2, Copy, Check } from 'lucide-react';

interface QRActionsProps {
  address: string;
  qrValue: string;
}

export default function QRActions({ address, qrValue }: QRActionsProps) {
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

  const handleDownload = () => {
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qrValue)}&color=050505&bgcolor=ffffff&qzone=2`;
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = `ecoin-wallet-qr.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'eCoin Wallet Address',
          text: address,
        });
      } catch (err) {
        console.warn('Partilha cancelada ou não suportada:', err);
      }
    } else {
      alert('A partilha nativa não é suportada neste navegador.');
    }
  };

  return (
    <div className="grid grid-cols-3 gap-2 mt-4">
      <button
        onClick={handleCopy}
        className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 transition-all active:scale-95 group"
      >
        {copied ? (
          <Check size={14} className="text-[#00FF9C] mb-1" />
        ) : (
          <Copy size={14} className="text-neutral-400 group-hover:text-white mb-1" />
        )}
        <span className="text-[9px] font-mono font-bold tracking-wider text-neutral-400 group-hover:text-white uppercase">
          {copied ? 'Pronto' : 'Copiar'}
        </span>
      </button>

      <button
        onClick={handleDownload}
        className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 transition-all active:scale-95 group"
      >
        <Download size={14} className="text-neutral-400 group-hover:text-white mb-1" />
        <span className="text-[9px] font-mono font-bold tracking-wider text-neutral-400 group-hover:text-white uppercase">
          Salvar
        </span>
      </button>

      <button
        onClick={handleShare}
        className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 transition-all active:scale-95 group"
      >
        <Share2 size={14} className="text-neutral-400 group-hover:text-white mb-1" />
        <span className="text-[9px] font-mono font-bold tracking-wider text-neutral-400 group-hover:text-white uppercase">
          Partilhar
        </span>
      </button>
    </div>
  );
}