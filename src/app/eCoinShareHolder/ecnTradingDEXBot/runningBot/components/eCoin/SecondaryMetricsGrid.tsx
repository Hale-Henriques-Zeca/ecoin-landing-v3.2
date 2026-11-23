'use client';

import React, { useEffect, useState } from 'react';
import { useAccount, useReadContracts } from 'wagmi';
import { formatUnits } from 'viem';
import { useMiningStakingeCoin } from '@/hooks/eCoinMining/useMiningStakingeCoin';
import { RunningBotItem } from '../../../types/ecnTrading';
import { CONTRACTS } from '@/lib/contracts/contracts';
import { eCoinMiningStakingAbi } from '@/lib/abis/eCoinMining/eCoinMiningStakingAbi';

interface SecondaryMetricsGridProps {
  bot: RunningBotItem;
}

export default function SecondaryMetricsGrid({ bot }: SecondaryMetricsGridProps) {
  const mining = useMiningStakingeCoin();
  const { address } = useAccount();

  const contractConfig = {
    abi: eCoinMiningStakingAbi,
    address: CONTRACTS.eCoin_Mining_Staking_eCoin,
    chainId: 56,
  } as const;

  // Leitura das recompensas pendentes, taxa por segundo e share BP no contrato ECoinMiningStakingECoin
  const { data: reads } = useReadContracts({
    contracts: address
      ? [
          {
            ...contractConfig,
            functionName: 'pendingRewards',
            args: [address],
          },
          {
            ...contractConfig,
            functionName: 'rewardRates',
            args: [address],
          },
          {
            ...contractConfig,
            functionName: 'userShareBP',
            args: [address],
          },
          {
            ...contractConfig,
            functionName: 'isMiningActive',
            args: [address],
          },
        ]
      : [],
    query: {
      enabled: Boolean(address),
      refetchInterval: 10000,
    },
  });

  const pendingECoin =
    address && reads?.[0]?.status === 'success'
      ? Number(formatUnits((reads[0].result as bigint) ?? 0n, 18))
      : Number(mining.pendingECoin ?? 0);

  const rawRates =
    address && reads?.[1]?.status === 'success'
      ? (reads[1].result as readonly [bigint, bigint, bigint, bigint])
      : undefined;

  const ecoinPerSecond = rawRates
    ? Number(formatUnits(rawRates[0] ?? 0n, 18))
    : Number(mining.rates?.ecoinPerSecond ?? 0);

  const userShareBP =
    address && reads?.[2]?.status === 'success'
      ? Number(reads[2].result ?? 0)
      : 0;

  const isMiningActive =
    address && reads?.[3]?.status === 'success'
      ? Boolean(reads[3].result)
      : Boolean(mining.isMiningActive);

  const [liveECoin, setLiveECoin] = useState(pendingECoin);

  useEffect(() => {
    setLiveECoin(pendingECoin);
  }, [pendingECoin]);

  // Ticker em tempo real sincronizado com ecoinPerSecond on-chain
  useEffect(() => {
    if (!isMiningActive && pendingECoin <= 0) return;

    const timer = setInterval(() => {
      setLiveECoin((prev) =>
        prev + (ecoinPerSecond > 0 ? ecoinPerSecond : pendingECoin > 0 ? pendingECoin * 0.00015 : 0.00001)
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [pendingECoin, ecoinPerSecond, isMiningActive]);

  const sharePercent =
    userShareBP > 0 ? userShareBP / 100 : Number(mining?.share ?? 0);

  return (
    <div className="grid grid-cols-2 gap-2 text-xs mb-3 font-mono">
      <div className="bg-[#0B0E14]/60 p-2 rounded-lg border border-gray-800/80">
        <span className="text-gray-400 text-[10px] block">Lucro Não Realizado:</span>
        <span className="text-[#D4AF37] font-bold block tracking-tight truncate">
          {liveECoin.toFixed(9)} eCoin
        </span>
      </div>

      <div className="bg-[#0B0E14]/60 p-2 rounded-lg border border-gray-800/80 text-right">
        <span className="text-gray-400 text-[10px] block">Pool Share:</span>
        <span className="text-yellow-400 font-semibold block">
          {sharePercent > 0 ? `${sharePercent.toFixed(6)}%` : bot.poolShare}
        </span>
      </div>
    </div>
  );
}