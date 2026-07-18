'use client';

import React from 'react';

interface ActionGridProps {
  children: React.ReactNode;
}

export default function ActionGrid({ children }: ActionGridProps) {
  return (
    <div className="grid grid-cols-3 gap-y-4 gap-x-2 w-full">
      {children}
    </div>
  );
}