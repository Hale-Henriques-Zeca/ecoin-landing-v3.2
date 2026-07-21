'use client';

import React from 'react';
import { Laptop, Smartphone } from 'lucide-react';

export default function DeviceIcon({ type }: { type: 'desktop' | 'mobile' }) {
  return (
    <div className="p-2 bg-neutral-800 text-neutral-300 rounded-lg">
      {type === 'desktop' ? <Laptop size={16} /> : <Smartphone size={16} />}
    </div>
  );
}