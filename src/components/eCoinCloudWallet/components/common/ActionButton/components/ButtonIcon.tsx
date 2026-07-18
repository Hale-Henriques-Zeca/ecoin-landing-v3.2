'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ButtonIconProps {
  icon?: LucideIcon;
  position?: 'left' | 'right';
}

export default function ButtonIcon({ icon: Icon, position = 'left' }: ButtonIconProps) {
  if (!Icon) return null;
  return (
    <Icon 
      size={14} 
      className={`shrink-0 transition-transform duration-200 group-hover:scale-110 ${
        position === 'left' ? 'mr-1.5' : 'ml-1.5'
      }`} 
    />
  );
}