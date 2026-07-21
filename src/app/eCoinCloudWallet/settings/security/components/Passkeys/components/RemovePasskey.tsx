'use client';

import React from 'react';
import { Trash2 } from 'lucide-react';

export default function RemovePasskey() {
  return (
    <button className="text-[10px] text-red-400 hover:text-red-300 font-mono flex items-center gap-1">
      <Trash2 size={10} /> Revogar Passkey
    </button>
  );
}