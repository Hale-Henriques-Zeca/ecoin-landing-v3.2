'use client';

import React from 'react';

interface SectionSubtitleProps {
  children?: React.ReactNode;
}

export default function SectionSubtitle({ children }: SectionSubtitleProps) {
  if (!children) return null;
  return (
    <p className="text-[10px] md:text-xs font-mono font-semibold text-neutral-500 tracking-normal mt-0.5 select-none">
      {children}
    </p>
  );
}