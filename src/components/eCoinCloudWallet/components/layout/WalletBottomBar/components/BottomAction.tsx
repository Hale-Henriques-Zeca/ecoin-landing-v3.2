'use client';

import React from 'react';
import { X } from 'lucide-react';

interface BottomActionProps {
  onClick: () => void;
  isOpen: boolean;
}

export default function BottomAction({ onClick, isOpen }: BottomActionProps) {
  return (
    <div className="flex flex-col items-center justify-center px-2 relative -top-3 select-none">
      <button
        onClick={onClick}
        className={`w-13 h-13 rounded-full flex items-center justify-center border transition-all duration-300 active:scale-95 shadow-[0_4px_20px_rgba(0,0,0,0.5)] ${
          isOpen
            ? 'bg-[#D4AF37] border-[#D4AF37] text-black rotate-135 shadow-[0_0_20px_rgba(212,175,55,0.4)]'
            : 'bg-gradient-to-b from-[#111] to-black border-[#D4AF37]/30 text-[#D4AF37] hover:border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.05)]'
        }`}
        aria-label="Abrir hub de ações"
      >
        <span className={`text-2xl font-light transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>
          {isOpen ? <X size={20} className="stroke-[2.5]" /> : '◎'}
        </span>
      </button>
      <span className={`text-[10px] mt-1.5 font-bold tracking-wider transition-colors duration-200 ${
        isOpen ? 'text-[#D4AF37]' : 'text-neutral-500'
      }`}>
        HUB
      </span>
    </div>
  );
}