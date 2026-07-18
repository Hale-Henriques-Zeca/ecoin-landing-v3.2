'use client';

import React from 'react';

interface PageHeaderProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  actions?: React.ReactNode;
}

export default function PageHeader({ title, subtitle, actions }: PageHeaderProps) {
  if (!title && !subtitle && !actions) return null;

  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6">
      <div>
        <h1 className="text-xl md:text-2xl font-bold tracking-wider text-white">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs md:text-sm font-mono font-semibold text-[#D4AF37]/85 tracking-wide mt-1">
            {subtitle}
          </p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2.5 shrink-0">{actions}</div>}
    </header>
  );
}