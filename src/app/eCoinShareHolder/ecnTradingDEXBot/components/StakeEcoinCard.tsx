'use client';

import { Coins, Info, Plus } from 'lucide-react';

interface StakeEcoinCardProps {
  stakedAmount: number;
  tokenSymbol?: string;
  poolSharePercent: number;
  onStakeMore?: () => void;
  onInfoClick?: () => void;
}

export default function StakeEcoinCard({
  stakedAmount,
  tokenSymbol = 'E-Coin',
  poolSharePercent,
  onStakeMore,
  onInfoClick,
}: StakeEcoinCardProps) {
  return (
    <div className="bg-[#12181F] border border-yellow-500/30 rounded-2xl p-4 shadow-lg">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-yellow-400">
            <Coins className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold text-gray-200">Staking E-Coin (PPP)</span>
        </div>
        {onInfoClick && (
          <button
            onClick={onInfoClick}
            className="text-gray-400 hover:text-yellow-400 transition-colors"
            type="button"
          >
            <Info className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="bg-[#0B0E14] p-3 rounded-xl border border-gray-800 mb-3">
        <div className="flex justify-between items-baseline mb-1">
          <span className="text-[10px] text-gray-400">Total Alocado em Stake</span>
          <span className="text-xs font-semibold text-yellow-400">
            {poolSharePercent}% Cota
          </span>
        </div>
        <div className="text-lg font-extrabold text-white">
          {stakedAmount.toLocaleString('en-US')}
          <span className="text-xs font-normal text-yellow-400/80 ml-1.5">
            {tokenSymbol}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2">
        <p className="text-[10px] text-gray-400 leading-tight">
          Sua fatia do pool determina o peso nos lucros diários do ecossistema.
        </p>
        {onStakeMore && (
          <button
            onClick={onStakeMore}
            className="flex items-center gap-1 text-[11px] bg-gradient-to-r from-yellow-500 to-amber-400 hover:from-yellow-400 hover:to-amber-300 text-black font-extrabold px-3 py-1.5 rounded-lg transition-colors shadow-sm shrink-0"
            type="button"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            <span>Alocar Mais</span>
          </button>
        )}
      </div>
    </div>
  );
}