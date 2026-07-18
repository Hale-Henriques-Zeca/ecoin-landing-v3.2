'use client';

import React from 'react';

interface ErrorDescriptionProps {
  children: React.ReactNode;
}

export default function ErrorDescription({ children }: ErrorDescriptionProps) {
  return (
    <p className="text-xs text-neutral-500 font-mono font-semibold text-center mt-1.5 max-w-sm select-none leading-relaxed">
      {children}
    </p>
  );
}