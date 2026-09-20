'use client';

import { PieChart, Info } from 'lucide-react';

interface PoolShareCardProps {
  userShare: string;
  totalStaked: string;
  onInfoClick?: () => void;
}

export default function PoolShareCard({ userShare, totalStaked, onInfoClick }: PoolShareCardProps) {
  return (
    <div className="bg-[#12181F] border border-yellow-500/20 rounded-2xl p-4 shadow-lg">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-yellow-400">
            <PieChart className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold text-gray-200">Participação no Pool (PPP)</span>
        </div>
        {onInfoClick && (
          <button onClick={onInfoClick} className="text-gray-400 hover:text-yellow-400">
            <Info className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 bg-[#0B0E14] p-3 rounded-xl border border-gray-800">
        <div>
          <span className="text-[10px] text-gray-400 block">Sua Cota</span>
          <span className="text-base font-extrabold text-emerald-400">{userShare}</span>
        </div>
        <div className="text-right">
          <span className="text-[10px] text-gray-400 block">Total do Pool</span>
          <span className="text-xs font-semibold text-white mt-1 block">{totalStaked}</span>
        </div>
      </div>
    </div>
  );
}