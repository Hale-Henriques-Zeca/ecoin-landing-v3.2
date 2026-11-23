'use client';

import React from 'react';
import { useAccount, useReadContract } from 'wagmi';
import { formatUnits } from 'viem';
import { RunningBotItem } from '../../../../types/ecnTrading';
import { CONTRACTS } from '@/lib/contracts/contracts';
import { eCoinMiningStakingAbi } from '@/lib/abis/eCoinMining/eCoinMiningStakingAbi';
import { useMiningStakingeCoin } from '@/hooks/eCoinMining/useMiningStakingeCoin';

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
  const mining = useMiningStakingeCoin();

  const { data: pending } = useReadContract({
    abi: eCoinMiningStakingAbi,
    address: CONTRACTS.eCoin_Mining_Staking_eCoin,
    functionName: 'pendingRewards',
    chainId: 56,
    args: address ? [address] : undefined,
    query: { enabled: Boolean(address), refetchInterval: 10000 },
  });

  const pendingECoin =
    pending !== undefined
      ? Number(formatUnits((pending as bigint) ?? 0n, 18))
      : Number(mining.pendingECoin ?? 0);

  return (
    <div className="p-3 bg-gradient-to-br from-amber-950/60 via-yellow-950/40 to-amber-900/30 border-l border-[#D4AF37]/20 flex flex-col justify-between">
      <div>
        <span className="text-[10px] text-[#D4AF37] block font-mono uppercase tracking-wider">
          Lucro Realizado (Profit)
        </span>
        <span className="text-lg font-extrabold text-white block my-0.5 font-mono">
          {pendingECoin.toFixed(9)} eCoin
        </span>
        <span className="text-[10px] text-[#D4AF37] font-semibold block mb-3 font-mono">
          ({bot.lucroRealizadoPercent})
        </span>
      </div>

      {/* Botões de Ação de Lucro (+ Add Capacity / Collect Profit) */}
      <div className="flex items-center gap-2 pt-2 border-t border-[#D4AF37]/20">
        <button
          type="button"
          onClick={() => onOpenAddCapacity(bot)}
          className="text-[10px] bg-amber-500 text-black font-extrabold px-3 py-1.5 rounded-lg hover:bg-amber-400 shadow-sm transition-all flex-1 text-center cursor-pointer"
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