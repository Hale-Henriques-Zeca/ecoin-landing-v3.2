'use client';

import React from 'react';

export default function AppNetwork({ network }: { network: string }) {
  return <span className="text-[9px] bg-neutral-800 text-[#00FF9C] font-bold px-1.5 py-0.5 rounded">{network}</span>;
}