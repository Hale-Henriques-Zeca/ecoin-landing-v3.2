'use client';

import React from 'react';
import { useAccount, useReadContract } from 'wagmi';
import { formatUnits } from 'viem';
import { RunningBotItem } from '../../../../types/ecnTrading';
import { CONTRACTS } from '@/lib/contracts/contracts';
import { eDollarMiningStakingAbi } from '@/lib/abis/eDollarMining/eDollarMiningStakingAbi';

interface EDollarProfitGridRightSideProps {
  bot: RunningBotItem;
  onOpenAddCapacity: (bot: RunningBotItem) => void;
  onOpenWithdrawProfit: (bot: RunningBotItem) => void;
}

export default function EDollarProfitGridRightSide({
  bot,
  onOpenAddCapacity,
  onOpenWithdrawProfit,
}: EDollarProfitGridRightSideProps) {
  const { address } = useAccount();

  // 📊 Leitura do saldo pendente exclusivamente em eDollar / eUSD (index 1)
  const { data: pending } = useReadContract({
    abi: eDollarMiningStakingAbi,
    address: CONTRACTS.MINING_STAKING,
    functionName: 'pendingRewards',
    chainId: 56,
    args: address ? [address] : undefined,
    query: {
      enabled: Boolean(address),
      refetchInterval: 10000,
    },
  });

  const pendingEUSD = pending ? Number(formatUnits(pending[1], 18)) : 0;

  return (
    <div className="p-3 bg-gradient-to-br from-blue-950/70 to-indigo-950/50 border-l border-blue-500/20 flex flex-col justify-between">
      <div>
        <span className="text-[10px] text-blue-300 block font-mono uppercase tracking-wider">
          Lucro Realizado (Profit)
        </span>
        <span className="text-lg font-extrabold text-blue-400 block my-0.5 font-mono">
          {pendingEUSD.toFixed(9)} EUSD
        </span>
        <span className="text-[10px] text-blue-400 font-semibold block mb-3 font-mono">
          ({bot.lucroRealizadoPercent})
        </span>
      </div>

      {/* Botões de Ação de Lucro (+ Add Capacity / Collect Profit) */}
      <div className="flex items-center gap-2 pt-2 border-t border-blue-500/20">
        <button
          type="button"
          onClick={() => onOpenAddCapacity(bot)}
          className="text-[10px] bg-blue-600 text-white font-extrabold px-3 py-1.5 rounded-lg hover:bg-blue-500 shadow-sm transition-all flex-1 text-center cursor-pointer"
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