'use client';

import React, { useEffect, useState } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import { formatUnits } from 'viem';
import { useMiningStakingeDollar } from '@/hooks/eDollarMining/useMiningStakingeDollar';
import { RunningBotItem } from '../../../types/ecnTrading';
import { CONTRACTS } from '@/lib/contracts/contracts';
import { eDollarMiningStakingAbi } from '@/lib/abis/eDollarMining/eDollarMiningStakingAbi';

interface EDollarSecondaryMetricsGridProps {
  bot: RunningBotItem;
}

export default function EDollarSecondaryMetricsGrid({
  bot,
}: EDollarSecondaryMetricsGridProps) {
  const mining = useMiningStakingeDollar();
  const { address } = useAccount();

  // Leitura das recompensas pendentes em eDollar / eUSD (index 1)
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
  const [liveEUSD, setLiveEUSD] = useState(pendingEUSD);

  useEffect(() => {
    setLiveEUSD(pendingEUSD);
  }, [pendingEUSD]);

  // Ticker em tempo real para eDollar (EUSD)
  useEffect(() => {
    const timer = setInterval(() => {
      setLiveEUSD((prev) =>
        prev + (pendingEUSD > 0 ? pendingEUSD * 0.00015 : 0.00001)
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [pendingEUSD]);

  return (
    <div className="grid grid-cols-2 gap-2 text-xs mb-3 font-mono">
      <div className="bg-[#0B0E14]/60 p-2 rounded-lg border border-blue-500/20">
        <span className="text-gray-400 text-[10px] block">Lucro Não Realizado:</span>
        <span className="text-blue-400 font-bold block tracking-tight truncate">
          {liveEUSD.toFixed(9)} EUSD
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