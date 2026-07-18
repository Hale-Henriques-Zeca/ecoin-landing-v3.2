'use client';

import React from 'react';

interface CardFooterProps {
  children?: React.ReactNode;
}

export default function CardFooter({ children }: CardFooterProps) {
  if (!children) return null;
  return (
    <div className="mt-4 pt-3 border-t border-white/[0.04] flex items-center justify-between">
      {children}
    </div>
  );
}