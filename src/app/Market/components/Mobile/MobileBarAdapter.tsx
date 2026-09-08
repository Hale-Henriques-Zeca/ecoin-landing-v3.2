'use client';

import React from 'react';

interface MobileBarAdapterProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const MobileBarAdapter: React.FC<MobileBarAdapterProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const tabs = [
    { id: 'markets', label: 'Markets', icon: '📊' },
    { id: 'performance', label: 'Bots', icon: '🤖' },
    { id: 'pools', label: 'Pools', icon: '🏦' },
    { id: 'rewards', label: 'Rewards', icon: '🪙' },
    { id: 'activity', label: 'Activity', icon: '🔄' },
  ];

  return (
    <div className="lg:hidden sticky top-4 z-40 bg-slate-900/90 border border-slate-800 rounded-2xl p-1.5 backdrop-blur-md shadow-2xl">
      <div className="grid grid-cols-5 gap-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all text-center ${
                isActive
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <span className="text-base leading-none mb-1">{tab.icon}</span>
              <span className="text-[10px] truncate max-w-full font-semibold">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MobileBarAdapter;