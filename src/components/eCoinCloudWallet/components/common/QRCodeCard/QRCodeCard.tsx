'use client';

import React from 'react';
import { QRHeader, QRImage, QRFooter, QRActions } from './components';

export interface QRCodeCardProps {
  address: string;
  qrValue?: string; // Se diferente do endereço
  title?: string;
  networkName?: string;
  logoUrl?: string;
  className?: string;
}

export default function QRCodeCard({
  address,
  qrValue,
  title,
  networkName,
  logoUrl,
  className = ''
}: QRCodeCardProps) {
  const value = qrValue || address;

  return (
    <div className={`
      p-5 rounded-2xl bg-[#050505]/95 border border-white/5 backdrop-blur-xl
      hover:border-white/[0.08] transition-all duration-300 max-w-sm w-full mx-auto
      shadow-[0_0_40px_rgba(0,255,156,0.01)] ${className}
    `}>
      <QRHeader title={title} networkName={networkName} />
      <QRImage qrValue={value} logoUrl={logoUrl} />
      <QRFooter address={address} />
      <QRActions address={address} qrValue={value} />
    </div>
  );
}