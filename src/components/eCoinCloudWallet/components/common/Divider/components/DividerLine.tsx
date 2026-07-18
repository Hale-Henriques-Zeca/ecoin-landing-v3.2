'use client';

import React from 'react';

interface DividerLineProps {
  gradient?: boolean;
}

export default function DividerLine({ gradient = false }: DividerLineProps) {
  if (gradient) {
    return (
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37]/45 to-transparent" />
    );
  }
  return <div className="h-px w-full bg-white/10" />;
}