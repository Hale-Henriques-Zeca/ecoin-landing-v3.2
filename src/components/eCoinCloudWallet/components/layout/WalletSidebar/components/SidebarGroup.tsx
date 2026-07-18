'use client';

import React from 'react';
import SidebarItem from './SidebarItem';

interface SidebarGroupProps {
  title: string;
  items: readonly {
    readonly title: string;
    readonly href: string;
    readonly icon: React.ComponentType<{ size: number; className?: string }>;
    readonly badge?: string;
  }[];
  onItemClick?: () => void;
}

export default function SidebarGroup({ title, items, onItemClick }: SidebarGroupProps) {
  return (
    <div className="space-y-1.5 select-none">
      <h4 className="text-[10px] font-bold tracking-widest text-neutral-500 uppercase px-4">
        {title}
      </h4>
      <div className="space-y-1">
        {items.map((item, idx) => (
          <SidebarItem
            key={idx}
            icon={item.icon}
            title={item.title}
            href={item.href}
            badge={item.badge}
            onClick={onItemClick}
          />
        ))}
      </div>
    </div>
  );
}