'use client';

import React from 'react';

interface EmptyTitleProps {
  children: React.ReactNode;
}

export default function EmptyTitle({ children }: EmptyTitleProps) {
  return (
    <h3 className="text-sm font-bold text-neutral-200 tracking-wider text-center mt-5 select-none">
      {children}
    </h3>
  );
}