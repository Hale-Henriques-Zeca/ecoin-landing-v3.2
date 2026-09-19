'use client';

import { ShieldCheck, Info, ShoppingBag } from 'lucide-react';

interface CommitmentSealCardProps {
  csUsdtAmount: number;
  maxCapacityUsdt: number;
  usedCapacityUsdt: number;
  onBuyCS?: () => void;
  onInfoClick?: () => void;
}

export default function CommitmentSealCard({
  csUsdtAmount,
  maxCapacityUsdt,
  usedCapacityUsdt,
  onBuyCS,
  onInfoClick,
}: CommitmentSealCardProps) {
  const usagePercent = maxCapacityUsdt > 0 ? Math.min(100, (usedCapacityUsdt / maxCapacityUsdt) * 100) : 0;

  return (
    <div className="bg-[#12181F] border border-emerald-500/30 rounded-2xl p-4 shadow-lg">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold text-gray-200">Commitment Seal (CS)</span>
        </div>
        {onInfoClick && (
          <button
            onClick={onInfoClick}
            className="text-gray-400 hover:text-emerald-400 transition-colors"
            type="button"
          >
            <Info className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2 bg-[#0B0E14] p-3 rounded-xl border border-gray-800 mb-3">
        <div>
          <span className="text-[10px] text-gray-400 block">Selo Adquirido</span>
          <span className="text-sm font-extrabold text-white">
            ${csUsdtAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })} USDT
          </span>
        </div>
        <div className="text-right">
          <span className="text-[10px] text-gray-400 block">Teto de Mineração (130%)</span>
          <span className="text-sm font-extrabold text-emerald-400">
            ${maxCapacityUsdt.toLocaleString('en-US', { minimumFractionDigits: 2 })} USDT
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2">
        <div className="flex-1">
          <div className="flex justify-between text-[10px] text-gray-400 mb-1">
            <span>Uso da Capacidade</span>
            <span className="text-emerald-400 font-semibold">{usagePercent.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-emerald-400 h-full rounded-full transition-all duration-300"
              style={{ width: `${usagePercent}%` }}
            />
          </div>
        </div>

        {onBuyCS && (
          <button
            onClick={onBuyCS}
            className="flex items-center gap-1 text-[11px] bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold px-3 py-1.5 rounded-lg transition-colors shadow-sm shrink-0 ml-2"
            type="button"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Comprar CS</span>
          </button>
        )}
      </div>
    </div>
  );
}