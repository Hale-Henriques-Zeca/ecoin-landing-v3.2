'use client';

import { TrendingUp, Info, Zap } from 'lucide-react';

interface ProfitCapacityCardProps {
  currentProfitUsdt: number;
  maxProfitUsdt: number;
  onInfoClick?: () => void;
}

export default function ProfitCapacityCard({
  currentProfitUsdt,
  maxProfitUsdt,
  onInfoClick,
}: ProfitCapacityCardProps) {
  const percentage = maxProfitUsdt > 0 ? Math.min(100, (currentProfitUsdt / maxProfitUsdt) * 100) : 0;
  const isCapReached = percentage >= 100;

  return (
    <div className="bg-[#12181F] border border-amber-500/30 rounded-2xl p-4 shadow-lg">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-400">
            <TrendingUp className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold text-gray-200">Capacidade de Lucro (130%)</span>
        </div>
        {onInfoClick && (
          <button
            onClick={onInfoClick}
            className="text-gray-400 hover:text-amber-400 transition-colors"
            type="button"
          >
            <Info className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="bg-[#0B0E14] p-3 rounded-xl border border-gray-800 mb-3">
        <div className="flex justify-between items-baseline mb-1">
          <span className="text-[10px] text-gray-400">Lucro Acumulado vs Teto</span>
          <span className={`text-xs font-semibold ${isCapReached ? 'text-red-400' : 'text-amber-400'}`}>
            {percentage.toFixed(1)}%
          </span>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-lg font-extrabold text-white">
            ${currentProfitUsdt.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
          <span className="text-xs font-medium text-gray-400">
            / ${maxProfitUsdt.toLocaleString('en-US', { minimumFractionDigits: 2 })} USDT
          </span>
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isCapReached ? 'bg-red-500' : 'bg-gradient-to-r from-amber-500 to-yellow-400'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="flex justify-between items-center text-[10px]">
          <span className="text-gray-400">
            {isCapReached ? 'Teto atingido! Renove o Commitment Seal.' : 'Progresso até o limite de rentabilidade'}
          </span>
          {isCapReached && (
            <span className="flex items-center gap-1 text-red-400 font-bold">
              <Zap className="w-3 h-3 fill-current" /> Limite Alcançado
            </span>
          )}
        </div>
      </div>
    </div>
  );
}