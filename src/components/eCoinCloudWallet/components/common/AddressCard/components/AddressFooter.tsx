'use client';

import React from 'react';

interface AddressFooterProps {
  description?: string;
}

export default function AddressFooter({ description }: AddressFooterProps) {
  if (!description) return null;
  return (
    <div className="pt-2 border-t border-white/[0.04]">
      <p className="text-[10px] font-mono text-neutral-500 leading-relaxed">
        {description}
      </p>
    </div>
  );
}