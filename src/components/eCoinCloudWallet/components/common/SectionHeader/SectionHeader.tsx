'use client';

import React from 'react';
import { SectionTitle, SectionSubtitle } from './components';
import Divider from '../Divider';

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  className?: string;
}

export default function SectionHeader({
  title,
  subtitle,
  action,
  className = ''
}: SectionHeaderProps) {
  return (
    <div className={`w-full flex flex-col gap-2 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <SectionTitle>{title}</SectionTitle>
          <SectionSubtitle>{subtitle}</SectionSubtitle>
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
      <Divider gradient glow />
    </div>
  );
}