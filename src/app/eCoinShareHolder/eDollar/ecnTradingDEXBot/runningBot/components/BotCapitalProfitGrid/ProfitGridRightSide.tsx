'use client';

import React from 'react';
import { useAccount, useReadContract } from 'wagmi';
import { formatUnits } from 'viem';
import { RunningBotItem } from '../../../types/ecnTrading';
import { CONTRACTS } from '@/lib/contracts/contracts';
import { miningStakingAbi } from '@/lib/abis/miningStakingAbi';

interface ProfitGridRightSideProps {
  bot: RunningBotItem;
  onOpenAddCapacity: (bot: RunningBotItem) => void;
  onOpenWithdrawProfit: (bot: RunningBotItem) => void;
}

export default function ProfitGridRightSide({
  bot,
  onOpenAddCapacity,
  onOpenWithdrawProfit,
}: ProfitGridRightSideProps) {
  const { address } = useAccount();

  const { data: pending } = useReadContract({
    abi: miningStakingAbi,
    address: CONTRACTS.MINING_STAKING,
    functionName: 'pendingRewards',
    chainId: 56,
    args: address ? [address] : undefined,
  });

  const pendingUSDT = pending ? Number(formatUnits(pending[0], 18)) : 0;

  return (
    <div className="p-3 bg-gradient-to-br from-emerald-950/60 to-emerald-900/40 border-l border-emerald-500/20 flex flex-col justify-between">
      <div>
        <span className="text-[10px] text-emerald-300 block font-mono uppercase tracking-wider">
          Lucro Realizado (Profit)
        </span>
        <span className="text-lg font-extrabold text-emerald-400 block my-0.5 font-mono">
          {pendingUSDT.toFixed(9)} USDT
        </span>
        <span className="text-[10px] text-emerald-400 font-semibold block mb-3 font-mono">
          ({bot.lucroRealizadoPercent})
        </span>
      </div>

      {/* Botões de Ação de Lucro (+ Add Capacity / Collect Profit) */}
      <div className="flex items-center gap-2 pt-2 border-t border-emerald-500/20">
        <button
          type="button"
          onClick={() => onOpenAddCapacity(bot)}
          className="text-[10px] bg-emerald-500 text-black font-extrabold px-3 py-1.5 rounded-lg hover:bg-emerald-400 shadow-sm transition-all flex-1 text-center cursor-pointer"
        >
          + Add Capacity
        </button>

        <button
          type="button"
          onClick={() => onOpenWithdrawProfit(bot)}
          className="text-[10px] bg-[#D4AF37] text-black font-extrabold px-3 py-1.5 rounded-lg hover:bg-white shadow-sm transition-all flex-1 text-center cursor-pointer"
        >
          Collect Profit
        </button>
      </div>
    </div>
  );
}