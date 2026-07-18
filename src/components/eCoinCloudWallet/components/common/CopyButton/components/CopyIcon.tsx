'use client';

import React from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyIconProps {
  copied: boolean;
}

export default function CopyIcon({ copied }: CopyIconProps) {
  if (copied) {
    return <Check size={13} className="text-[#00FF9C]" />;
  }
  return <Copy size={13} className="text-neutral-400 group-hover:text-white transition-colors" />;
}