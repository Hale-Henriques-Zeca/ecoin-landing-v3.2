'use client';

import React from 'react';
import { ArrowDownLeft, ArrowUpRight, Award, Layers, RefreshCw, Send } from 'lucide-react';

export type ActivityType = 'deposit' | 'receive' | 'convert' | 'reward' | 'claim' | 'send';

interface ActivityIconProps {
  type: ActivityType;
}

export default function ActivityIcon({ type }: ActivityIconProps) {
  const iconConfigs = {
    deposit: { icon: ArrowDownLeft, color: 'text-[#00FF9C] bg-[#00FF9C]/10 border-[#00FF9C]/20' },
    receive: { icon: ArrowDownLeft, color: 'text-[#00FF9C] bg-[#00FF9C]/10 border-[#00FF9C]/20' },
    send: { icon: ArrowUpRight, color: 'text-red-400 bg-red-500/10 border-red-500/20' },
    convert: { icon: RefreshCw, color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
    reward: { icon: Award, color: 'text-[#D4AF37] bg-[#D4AF37]/10 border-[#D4AF37]/20' },
    claim: { icon: Layers, color: 'text-purple-400 bg-purple-500/10 border-purple-500/20' },
  };

  const config = iconConfigs[type] || { icon: Send, color: 'text-white bg-white/10' };
  const Icon = config.icon;

  return (
    <div className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 ${config.color}`}>
      <Icon size={14} />
    </div>
  );
}