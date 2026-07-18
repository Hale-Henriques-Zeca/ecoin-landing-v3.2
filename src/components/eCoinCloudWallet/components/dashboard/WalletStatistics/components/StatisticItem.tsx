'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';
import StatisticIcon from './StatisticIcon';
import StatisticLabel from './StatisticLabel';
import StatisticValue from './StatisticValue';

interface StatisticItemProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
}

export default function StatisticItem({ label, value, icon }: StatisticItemProps) {
  return (
    <div className="flex items-center gap-3 p-3 bg-white/[0.01] border border-white/[0.03] rounded-xl hover:border-white/10 transition-colors">
      <StatisticIcon icon={icon} />
      <div className="flex flex-col leading-none">
        <StatisticLabel>{label}</StatisticLabel>
        <StatisticValue>{value}</StatisticValue>
      </div>
    </div>
  );
}