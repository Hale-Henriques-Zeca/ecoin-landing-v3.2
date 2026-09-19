'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface BottomItemProps {
  icon: React.ComponentType<{ size: number; className?: string }>;
  title: string;
  href: string;
  badge?: React.ReactNode;
}

export default function BottomItem({ icon: Icon, title, href, badge }: BottomItemProps) {
  const pathname = usePathname();
  
  // Deteção inteligente de rota ativa na Home e subpáginas
  const isActive = href === '/' 
    ? pathname === '/' 
    : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className="flex flex-col items-center justify-center flex-1 h-full relative active:scale-90 transition-transform duration-150 select-none group"
    >
      {/* Indicador de brilho e linha superior no item ativo */}
      {isActive && (
        <span className="absolute top-0 w-8 h-[2px] rounded-b bg-[#00FF9C] shadow-[0_1px_10px_#00FF9C]" />
      )}

      <div className="relative">
        <Icon 
          size={20} 
          className={`transition-all duration-200 ${
            isActive 
              ? 'text-[#00FF9C] drop-shadow-[0_0_6px_rgba(0,255,156,0.6)]' 
              : 'text-neutral-400 group-hover:text-neutral-200'
          }`} 
        />
        {badge && (
          <span className="absolute -top-1.5 -right-2 flex h-2 w-2">
            {badge}
          </span>
        )}
      </div>
      
      <span className={`text-[10px] mt-1 font-medium tracking-wide transition-colors duration-200 ${
        isActive ? 'text-white font-bold' : 'text-neutral-400'
      }`}>
        {title}
      </span>
    </Link>
  );
}