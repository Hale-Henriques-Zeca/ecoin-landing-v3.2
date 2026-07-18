'use client';

import React from 'react';

interface QRImageProps {
  qrValue: string;
  logoUrl?: string;
}

export default function QRImage({ qrValue, logoUrl }: QRImageProps) {
  // Gera uma URL para o QR Code dinâmico usando um serviço público de CDN limpo
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(qrValue)}&color=ffffff&bgcolor=050505&qzone=2`;

  return (
    <div className="relative flex items-center justify-center p-4 bg-[#020202] border border-white/5 rounded-2xl w-full aspect-square overflow-hidden shadow-inner max-w-[240px] mx-auto">
      {/* Glow de Background */}
      <div className="absolute inset-0 bg-radial-gradient from-[#D4AF37]/5 to-transparent pointer-events-none" />
      
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img 
        src={qrCodeUrl} 
        alt="QR Code" 
        className="w-full h-full object-contain rounded-lg border border-white/[0.02]"
        crossOrigin="anonymous"
      />
      
      {/* Overlay opcional com Logo no Centro do QR */}
      {logoUrl && (
        <div className="absolute w-10 h-10 rounded-xl bg-[#050505] border border-white/10 flex items-center justify-center shadow-lg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoUrl} alt="Logo Center" className="w-6 h-6 object-contain" />
        </div>
      )}
    </div>
  );
}