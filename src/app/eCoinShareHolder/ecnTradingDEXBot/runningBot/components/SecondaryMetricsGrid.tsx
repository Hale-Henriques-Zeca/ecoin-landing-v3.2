'use client';

import React, { useEffect, useState } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import { formatUnits } from 'viem';
import { useMiningStaking } from '@/hooks/useMiningStaking';
import { RunningBotItem } from '../../types/ecnTrading';
import { CONTRACTS } from '@/lib/contracts/contracts';
import { miningStakingAbi } from '@/lib/abis/miningStakingAbi';

interface SecondaryMetricsGridProps {
  bot: RunningBotItem;
}

export default function SecondaryMetricsGrid({ bot }: SecondaryMetricsGridProps) {
  const mining = useMiningStaking();
  const { address } = useAccount();

  // Leitura das recompensas pendentes no contrato
  const { data: pending } = useReadContract({
    abi: miningStakingAbi,
    address: CONTRACTS.MINING_STAKING,
    functionName: 'pendingRewards',
    chainId: 56,
    args: address ? [address] : undefined,
  });

  const pendingUSDT = pending ? Number(formatUnits(pending[0], 18)) : 0;
  const [liveUSDT, setLiveUSDT] = useState(pendingUSDT);

  useEffect(() => {
    setLiveUSDT(pendingUSDT);
  }, [pendingUSDT]);

  // Efeito de ticker em tempo real
  useEffect(() => {
    const timer = setInterval(() => {
      setLiveUSDT((prev) =>
        prev + (pendingUSDT > 0 ? pendingUSDT * 0.00015 : 0.00001)
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [pendingUSDT]);

  return (
    <div className="grid grid-cols-2 gap-2 text-xs mb-3 font-mono">
      <div className="bg-[#0B0E14]/60 p-2 rounded-lg border border-gray-800/80">
        <span className="text-gray-400 text-[10px] block">Lucro Não Realizado:</span>
        <span className="text-emerald-400 font-bold block tracking-tight truncate">
          {liveUSDT.toFixed(9)} USDT
        </span>
      </div>

      <div className="bg-[#0B0E14]/60 p-2 rounded-lg border border-gray-800/80 text-right">
        <span className="text-gray-400 text-[10px] block">Pool Share:</span>
        <span className="text-yellow-400 font-semibold block">
          {mining?.share ? `${Number(mining.share).toFixed(9)}%` : bot.poolShare}
        </span>
      </div>
    </div>
  );
}