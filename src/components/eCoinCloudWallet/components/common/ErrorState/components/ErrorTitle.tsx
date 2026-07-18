'use client';

import React from 'react';

interface ErrorTitleProps {
  children: React.ReactNode;
}

export default function ErrorTitle({ children }: ErrorTitleProps) {
  return (
    <h3 className="text-sm font-bold text-red-400 tracking-wider text-center mt-5 select-none uppercase font-mono">
      {children}
    </h3>
  );
}