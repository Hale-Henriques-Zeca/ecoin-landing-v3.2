'use client';

import React from 'react';
import { Bell } from 'lucide-react';

interface NotificationButtonProps {
  count?: number;
  onClick?: () => void;
}

export default function NotificationButton({ count = 0, onClick }: NotificationButtonProps) {
  return (
    <button
      onClick={onClick}
      className="p-2 rounded-lg hover:bg-white/5 text-neutral-400 hover:text-white transition-all duration-200 relative group"
      aria-label={`${count} notificações não lidas`}
    >
      <Bell size={18} className="group-hover:scale-105 transition-transform" />
      
      {/* Badge condicional */}
      {count > 0 && (
        <span className="absolute top-1.5 right-1.5 min-w-[12px] h-[12px] px-0.5 bg-[#00FF9C] text-black font-mono font-black text-[8px] rounded-full flex items-center justify-center ring-2 ring-[#050505]">
          {count > 9 ? '9+' : count}
        </span>
      )}
    </button>
  );
}