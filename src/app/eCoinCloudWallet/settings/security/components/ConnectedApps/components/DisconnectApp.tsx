'use client';

import React from 'react';
import { Unlink } from 'lucide-react';

export default function DisconnectApp() {
  return (
    <button className="text-neutral-500 hover:text-red-400 p-1 flex items-center gap-1 text-[10px] font-bold uppercase">
      <Unlink size={12} /> Revogar
    </button>
  );
}