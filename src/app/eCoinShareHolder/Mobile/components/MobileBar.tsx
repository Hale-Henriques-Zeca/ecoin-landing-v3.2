'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bot, Zap, DollarSign, Home, Wallet } from 'lucide-react';

export default function MobileBar() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Bot', href: '/eCoinShareHolder/Mobile/bot', icon: Bot },
    { label: 'Running Bot', href: '/eCoinShareHolder/Mobile/running-bot', icon: Zap },
    { label: 'Profit', href: '/eCoinShareHolder/Mobile/profit', icon: DollarSign },
    { label: 'Início', href: '/eCoinShareHolder/Mobile/home', icon: Home },
    { label: 'Assets', href: '/eCoinShareHolder/Mobile/assets', icon: Wallet },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-t border-yellow-500/20 px-2 py-2">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center gap-1 text-[11px] font-medium transition-colors ${
                isActive ? 'text-yellow-400 font-bold' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-yellow-400 stroke-[2.5]' : 'text-gray-400'}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}