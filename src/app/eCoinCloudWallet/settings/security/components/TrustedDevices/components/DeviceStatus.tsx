'use client';

import React from 'react';

export default function DeviceStatus({ active }: { active: boolean }) {
  return (
    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${
      active ? 'bg-[#00FF9C]/10 text-[#00FF9C]' : 'bg-neutral-800 text-neutral-400'
    }`}>
      {active ? 'Confiável' : 'Pendente'}
    </span>
  );
}