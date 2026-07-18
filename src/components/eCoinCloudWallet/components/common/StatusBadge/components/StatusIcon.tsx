'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatusIconProps {
  icon?: LucideIcon;
}

export default function StatusIcon({ icon: Icon }: StatusIconProps) {
  if (!Icon) return null;
  return <Icon size={12} className="text-neutral-400 shrink-0" />;
}