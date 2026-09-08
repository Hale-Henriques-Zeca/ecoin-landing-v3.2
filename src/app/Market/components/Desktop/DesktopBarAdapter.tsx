'use client';

import React from 'react';

interface DesktopBarAdapterProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const DesktopBarAdapter: React.FC<DesktopBarAdapterProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const navItems = [
    { id: 'all', label: 'Overview' },
    { id: 'markets', label: 'Live Markets' },
    { id: 'performance', label: 'AI Bots' },
    { id: 'pools', label: 'Capital & Profit' },
    { id: 'rewards', label: 'Reward Pools' },
    { id: 'activity', label: 'Trading Feed' },
  ];

  return (
    <nav className="hidden lg:flex items-center justify-between bg-slate-900/80 border border-slate-800 rounded-2xl p-2 shadow-xl backdrop-blur-md">
      <div className="flex items-center gap-1">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-3 px-3">
        <span className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          ECN NETWORK: ACTIVE
        </span>
      </div>
    </nav>
  );
};

export default DesktopBarAdapter;