'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface InfoIconProps {
  icon?: LucideIcon;
}

export default function InfoIcon({ icon: Icon }: InfoIconProps) {
  if (!Icon) return null;
  return <Icon size={13} className="text-neutral-500 shrink-0" />;
}