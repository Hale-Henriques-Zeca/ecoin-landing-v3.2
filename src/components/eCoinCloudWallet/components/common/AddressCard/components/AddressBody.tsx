'use client';

import React from 'react';

interface AddressBodyProps {
  address: string;
}

export default function AddressBody({ address }: AddressBodyProps) {
  return (
    <div className="py-4">
      <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-1 select-none">
        Endereço da Carteira
      </div>
      <div className="font-mono text-sm md:text-base font-black tracking-tight text-white break-all bg-white/[0.02] border border-white/5 p-3 rounded-xl">
        {address}
      </div>
    </div>
  );
}