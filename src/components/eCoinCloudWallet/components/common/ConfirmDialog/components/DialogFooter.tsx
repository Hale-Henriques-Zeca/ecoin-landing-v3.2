'use client';

import React from 'react';

interface DialogFooterProps {
  children: React.ReactNode;
}

export default function DialogFooter({ children }: DialogFooterProps) {
  return (
    <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/5">
      {children}
    </div>
  );
}