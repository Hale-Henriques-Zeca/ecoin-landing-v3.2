'use client';

import React from 'react';

interface SectionTitleProps {
  children: React.ReactNode;
}

export default function SectionTitle({ children }: SectionTitleProps) {
  return (
    <h2 className="text-sm md:text-base font-bold tracking-wider text-white select-none">
      {children}
    </h2>
  );
}