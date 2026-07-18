'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { WALLET_ROUTES } from '@/components/eCoinCloudWallet/config/wallet/routes';

interface SidebarItemProps {
  icon: React.ComponentType<{ size: number; className?: string }>;
  title: string;
  href: string;
  badge?: string;
  onClick?: () => void;
}

export default function SidebarItem({ icon: Icon, title, href, badge, onClick }: SidebarItemProps) {
  const pathname = usePathname();
  
  const isActive = href === WALLET_ROUTES.dashboard 
    ? pathname === href 
    : pathname.startsWith(href);

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all duration-200 group select-none ${
        isActive
          ? 'bg-[#D4AF37]/05 border-[#D4AF37]/20 text-[#D4AF37]'
          : 'bg-transparent border-transparent text-neutral-400 hover:text-neutral-200 hover:bg-white/[0.02]'
      }`}
    >
      <div className="flex items-center gap-3">
        <Icon 
          size={18} 
          className={`transition-colors ${
            isActive ? 'text-[#D4AF37]' : 'text-neutral-500 group-hover:text-neutral-300'
          }`} 
        />
        <span className="text-xs font-semibold tracking-wide">{title}</span>
      </div>
      
      <div className="flex items-center gap-2">
        {badge && (
          <span className="px-1.5 py-0.5 text-[8px] font-mono font-bold rounded bg-[#00FF9C]/10 text-[#00FF9C] border border-[#00FF9C]/20 tracking-wider">
            {badge}
          </span>
        )}
        
        <ChevronRight 
          size={12} 
          className={`transition-transform duration-200 ${
            isActive 
              ? 'text-[#D4AF37] translate-x-0' 
              : 'text-neutral-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5'
          }`} 
        />
      </div>
    </Link>
  );
}