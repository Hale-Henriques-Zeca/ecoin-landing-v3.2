'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';
import { StatusDot, StatusText, StatusIcon } from './components';
import { StatusVariant } from './components/StatusDot';

export interface StatusBadgeProps {
  variant?: StatusVariant;
  label: string;
  icon?: LucideIcon;
  className?: string;
}

export default function StatusBadge({
  variant = 'connected',
  label,
  icon,
  className = ''
}: StatusBadgeProps) {
  return (
    <div className={`
      inline-flex items-center gap-2 px-2.5 py-1 rounded-full 
      bg-[#090909]/80 border border-white/5 backdrop-blur-md select-none
      ${className}
    `}>
      <StatusDot variant={variant} />
      <StatusIcon icon={icon} />
      <StatusText>{label}</StatusText>
    </div>
  );
}