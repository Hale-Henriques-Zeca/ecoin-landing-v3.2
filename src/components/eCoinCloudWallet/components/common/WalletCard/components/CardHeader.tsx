'use client';

import React from 'react';

interface CardHeaderProps {
  title?: React.ReactNode;
  action?: React.ReactNode;
}

export default function CardHeader({ title, action }: CardHeaderProps) {
  if (!title && !action) return null;
  return (
    <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-white/[0.04]">
      {title && (
        <div className="font-mono text-xs font-bold tracking-widest text-[#D4AF37] uppercase select-none">
          {title}
        </div>
      )}
      {action && <div className="flex items-center">{action}</div>}
    </div>
  );
}