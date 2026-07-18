'use client';

import React from 'react';

interface PreviewFooterProps {
  children?: React.ReactNode;
}

export default function PreviewFooter({ children }: PreviewFooterProps) {
  if (!children) return null;
  return (
    <div className="mt-4 pt-3 border-t border-white/[0.04] flex items-center justify-between">
      {children}
    </div>
  );
}