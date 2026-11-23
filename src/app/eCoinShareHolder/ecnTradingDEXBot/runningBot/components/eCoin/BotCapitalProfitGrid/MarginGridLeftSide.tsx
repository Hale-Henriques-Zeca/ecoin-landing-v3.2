'use client';

import React from 'react';
import { useAccount, useReadContract } from 'wagmi';
import { formatUnits } from 'viem';
import { RunningBotItem } from '../../../../types/ecnTrading';
import { CONTRACTS } from '@/lib/contracts/contracts';
import { eCoinMiningStakingAbi } from '@/lib/abis/eCoinMining/eCoinMiningStakingAbi';
import { useMiningStakingeCoin } from '@/hooks/eCoinMining/useMiningStakingeCoin';

interface MarginGridLeftSideProps {
  bot: RunningBotItem;
  onOpenAddMargin: (bot: RunningBotItem) => void;
  onOpenRemoveMargin: (bot: RunningBotItem) => void;
}

export default function MarginGridLeftSide({
  bot,
  onOpenAddMargin,
  onOpenRemoveMargin,
}: MarginGridLeftSideProps) {
  const { address } = useAccount();
  const mining = useMiningStakingeCoin();

  const { data: userInfo } = useReadContract({
    abi: eCoinMiningStakingAbi,
    address: CONTRACTS.eCoin_Mining_Staking_eCoin,
    functionName: 'users',
    chainId: 56,
    args: address ? [address] : undefined,
    query: { enabled: Boolean(address), refetchInterval: 10000 },
  });

  const rawUser = userInfo as readonly [bigint, bigint, bigint] | undefined;
  const staked = rawUser
    ? Number(formatUnits(rawUser[0] ?? 0n, 18))
    : Number(mining.userStake ?? 0);

  return (
    <div className="p-3 bg-[#0B0E14] flex flex-col justify-between h-full">
      {/* Capital de Trading em eCoin */}
      <div>
        <span className="text-[10px] text-gray-400 block font-mono uppercase tracking-wider">
          Capital de Trading (Profit Margin)
        </span>
        <span className="text-lg font-extrabold text-white block my-0.5 font-mono">
          {staked.toLocaleString('pt-BR', { maximumFractionDigits: 4 })} eCoin
        </span>
        <span className="text-[10px] text-[#D4AF37]/80 font-semibold block mb-3 font-mono">
          {bot.capitalTradingUsd}
        </span>
      </div>

      {/* Botões de Ação de Margem (+ Add / - Remove) */}
      <div className="flex items-center gap-2 pt-2 border-t border-gray-800/60">
        <button
          type="button"
          onClick={() => onOpenAddMargin(bot)}
          className="text-[10px] bg-[#D4AF37]/20 text-[#D4AF37] font-bold px-3 py-1.5 rounded-lg hover:bg-[#D4AF37]/30 border border-[#D4AF37]/30 transition-all flex-1 text-center cursor-pointer"
        >
          + Add Margin
        </button>

        <button
          type="button"
          onClick={() => onOpenRemoveMargin(bot)}
          className="text-[10px] bg-red-500/10 text-red-400 font-bold px-3 py-1.5 rounded-lg hover:bg-red-500/20 border border-red-500/20 transition-all flex-1 text-center cursor-pointer"
        >
          - Remove Margin
        </button>
      </div>
    </div>
  );
}