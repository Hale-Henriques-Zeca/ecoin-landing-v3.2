'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';
import ActionIcon from './ActionIcon';
import ActionLabel from './ActionLabel';

interface ActionItemProps {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
}

export default function ActionItem({ label, icon, onClick }: ActionItemProps) {
  return (
    <button
      onClick={onClick}
      className="group flex flex-col items-center justify-center p-2 rounded-xl hover:bg-white/[0.01] transition-all select-none"
    >
      <ActionIcon icon={icon} />
      <ActionLabel>{label}</ActionLabel>
    </button>
  );
}