'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';
import { ButtonIcon, ButtonLoader, ButtonLabel } from './components';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'minimal';

export interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  label: string;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
}

export default function ActionButton({
  variant = 'primary',
  label,
  icon,
  iconPosition = 'left',
  loading = false,
  className = '',
  disabled,
  ...props
}: ActionButtonProps) {
  const baseStyle = "group inline-flex items-center justify-center h-11 px-5 rounded-xl border select-none transition-all duration-300 font-bold active:scale-97 disabled:opacity-55 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-[#D4AF37]/5 border-[#D4AF37]/30 hover:border-[#D4AF37]/60 text-[#D4AF37] hover:bg-[#D4AF37]/10 hover:shadow-[0_0_15px_rgba(212,175,55,0.1)]",
    secondary: "bg-[#090909]/80 border-white/5 hover:border-white/15 text-neutral-300 hover:text-white hover:bg-white/[0.02]",
    danger: "bg-red-500/5 border-red-500/20 hover:border-red-500/40 text-red-400 hover:bg-red-500/10 hover:shadow-[0_0_15px_rgba(239,68,68,0.1)]",
    minimal: "bg-transparent border-transparent text-neutral-400 hover:text-white hover:bg-white/5"
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <ButtonLoader />
      ) : (
        iconPosition === 'left' && <ButtonIcon icon={icon} position="left" />
      )}
      <ButtonLabel>{label}</ButtonLabel>
      {!loading && iconPosition === 'right' && <ButtonIcon icon={icon} position="right" />}
    </button>
  );
}