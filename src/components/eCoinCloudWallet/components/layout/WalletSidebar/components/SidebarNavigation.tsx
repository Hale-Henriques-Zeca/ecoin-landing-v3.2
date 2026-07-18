'use client';

import React from 'react';
import { SIDEBAR_GROUPS } from './navigation';
import SidebarGroup from './SidebarGroup';

interface SidebarNavigationProps {
  onItemClick?: () => void;
}

export default function SidebarNavigation({ onItemClick }: SidebarNavigationProps) {
  return (
    <nav className="flex-1 px-4 py-6 space-y-6 overflow-y-auto custom-scrollbar">
      {SIDEBAR_GROUPS.map((group) => (
        <SidebarGroup
          key={group.id}
          title={group.title}
          items={group.items}
          onItemClick={onItemClick}
        />
      ))}
    </nav>
  );
}