'use client';

import React from 'react';
import { X } from 'lucide-react';

interface DrawerCloseButtonProps {
  onClose: () => void;
}

export default function DrawerCloseButton({ onClose }: DrawerCloseButtonProps) {
  return (
    <button 
      onClick={onClose}
      className="p-1.5 rounded-lg border border-[#D4AF37]/20 bg-[#0A0A0A] text-[#D4AF37] hover:text-white transition-colors active:scale-90"
      aria-label="Fechar Menu"
    >
      <X size={16} />
    </button>
  );
}