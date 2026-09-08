'use client';

import React from 'react';

export type ProfitPeriod = 'today' | 'week' | 'month' | 'year';

interface ProfitPeriodSelectorProps {
  selectedPeriod: ProfitPeriod;
  onSelectPeriod: (period: ProfitPeriod) => void;
}

export const ProfitPeriodSelector: React.FC<ProfitPeriodSelectorProps> = ({
  selectedPeriod,
  onSelectPeriod,
}) => {
  const periods: { key: ProfitPeriod; label: string }[] = [
    { key: 'today', label: 'Today' },
    { key: 'week', label: '7 Days' },
    { key: 'month', label: '30 Days' },
    { key: 'year', label: '1 Year' },
  ];

  return (
    <div className="flex items-center gap-1 bg-slate-900/90 border border-slate-800 p-1 rounded-xl">
      {periods.map((period) => {
        const isActive = selectedPeriod === period.key;
        return (
          <button
            key={period.key}
            onClick={() => onSelectPeriod(period.key)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 ${
              isActive
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            {period.label}
          </button>
        );
      })}
    </div>
  );
};

export default ProfitPeriodSelector;