'use client';

import React from 'react';
import { CardHeader, CardBody, CardFooter } from './components';

export interface WalletCardProps {
  title?: React.ReactNode;
  headerAction?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  glow?: boolean;
  className?: string;
}

export default function WalletCard({
  title,
  headerAction,
  footer,
  children,
  glow = false,
  className = ''
}: WalletCardProps) {
  return (
    <div className={`
      relative rounded-2xl bg-[#050505]/90 border border-white/5 p-4 md:p-5
      backdrop-blur-xl transition-all duration-300 hover:border-white/[0.08]
      ${glow ? 'shadow-[0_0_30px_rgba(212,175,55,0.03)]' : ''}
      ${className}
    `}>
      {/* Glow Sutil de Acentuação Lateral */}
      {glow && (
        <div className="absolute top-0 bottom-0 left-0 w-[2px] bg-gradient-to-b from-[#D4AF37] to-transparent opacity-40 rounded-l-2xl" />
      )}

      <CardHeader title={title} action={headerAction} />
      <CardBody>{children}</CardBody>
      <CardFooter>{footer}</CardFooter>
    </div>
  );
}