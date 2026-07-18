'use client';

import React from 'react';

interface WalletViewportProps {
  children: React.ReactNode;
}

export default function WalletViewport({ children }: WalletViewportProps) {
  return (
    <main className="flex-1 w-full overflow-y-auto relative flex flex-col min-h-0 custom-scrollbar pb-[100px] lg:pb-0">
      {/* Area utilitária com largura limite para evitar quebras em ecrãs ultra-wide de trading */}
      <div className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
        {children}
      </div>
    </main>
  );
}