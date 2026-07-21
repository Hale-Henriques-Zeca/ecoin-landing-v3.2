'use client';

import React from 'react';
import { Trash2 } from 'lucide-react';

export default function RemoveDevice() {
  return (
    <button className="text-neutral-500 hover:text-red-400 p-1 transition-colors">
      <Trash2 size={13} />
    </button>
  );
}