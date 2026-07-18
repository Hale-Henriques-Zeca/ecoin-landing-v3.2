'use client';

import React from 'react';

export default function LogoText() {
  return (
    <div className="flex flex-col leading-none select-none">
      <span className="font-bold text-sm md:text-base text-white tracking-wider group-hover:text-[#D4AF37] transition-colors">
        eCoin
      </span>
      <span className="text-[9px] text-neutral-500 font-medium tracking-widest uppercase mt-0.5">
        Cloud Wallet
      </span>
    </div>
  );
}