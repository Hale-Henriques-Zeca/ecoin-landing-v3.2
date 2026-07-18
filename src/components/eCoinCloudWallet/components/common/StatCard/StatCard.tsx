'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';
import { StatIcon, StatTitle, StatValue, StatTrend } from './components';

export interface StatCardProps {
  title: string;
  value: string | React.ReactNode;
  icon?: LucideIcon;
  trend?: number;
  className?: string;
}

export default function StatCard({
  title,
  value,
  icon,
  trend,
  className = ''
}: StatCardProps) {
  return (
    <div className={`
      flex items-start justify-between p-4 rounded-xl bg-[#050505]/80 
      border border-white/5 backdrop-blur-md transition-all duration-300 hover:border-white/[0.08] ${className}
    `}>
      <div>
        <StatTitle>{title}</StatTitle>
        <StatValue>{value}</StatValue>
        <StatTrend trend={trend} />
      </div>
      <StatIcon icon={icon} />
    </div>
  );
}