'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, TrendingUp } from 'lucide-react';
import { useAccount, useReadContracts } from 'wagmi';
import { formatUnits } from 'viem';

import { useMiningStakingeCoin } from '@/hooks/eCoinMining/useMiningStakingeCoin';
import { CONTRACTS } from '@/lib/contracts/contracts';
import { eCoinMiningStakingAbi } from '@/lib/abis/eCoinMining/eCoinMiningStakingAbi';

interface UserProfitCapacityProps {
  gasBalance?: number;
  maxCapacity?: number;
  usedCapacity?: number;
  remainingCapacity?: number;
  willMine?: boolean;
  stakeActive?: boolean;
  csECoinAmount?: number;
  usedCapacityECoin?: number;
}

export default function UserProfitCapacity(props: UserProfitCapacityProps) {
  const { address } = useAccount();
  const mining = useMiningStakingeCoin();

  const contractConfig = {
    abi: eCoinMiningStakingAbi,
    address: CONTRACTS.eCoin_Mining_Staking_eCoin,
    chainId: 56,
  } as const;

  const { data: reads } = useReadContracts({
    contracts: address
      ? [
          {
            ...contractConfig,
            functionName: 'preview',
            args: [address],
          },
          {
            ...contractConfig,
            functionName: 'users',
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

  // preview(address) -> (pendingECoin, remainingCapacity, usedCapacity, maxCapacity, willAccumulate)
  const rawPreview =
    address && reads?.[0]?.status === 'success'
      ? (reads[0].result as readonly [bigint, bigint, bigint, bigint, boolean])
      : undefined;

  const contractRemaining = rawPreview
    ? Number(formatUnits(rawPreview[1] ?? 0n, 18))
    : Number(mining.previewData?.remainingCapacity ?? 0);

  const contractUsed = rawPreview
    ? Number(formatUnits(rawPreview[2] ?? 0n, 18))
    : Number(mining.previewData?.usedCapacity ?? 0);

  const contractMax = rawPreview
    ? Number(formatUnits(rawPreview[3] ?? 0n, 18))
    : Number(mining.previewData?.maxCapacity ?? 0);

  const rawUser =
    address && reads?.[1]?.status === 'success'
      ? (reads[1].result as readonly [bigint, bigint, bigint])
      : undefined;

  const stakedECoin = rawUser
    ? Number(formatUnits(rawUser[0] ?? 0n, 18))
    : Number(mining.userStake ?? 0);

  const contractStakeActive =
    stakedECoin > 0 || Boolean(mining.isMiningActive);

  const contractWillMine =
    rawPreview !== undefined
      ? Boolean(rawPreview[4])
      : contractRemaining > 0 && contractStakeActive;

  const maxCapacity = props.maxCapacity ?? contractMax;
  const usedCapacity =
    props.usedCapacity ?? props.usedCapacityECoin ?? contractUsed;
  const remainingCapacity = props.remainingCapacity ?? contractRemaining;
  const stakeActive = props.stakeActive ?? contractStakeActive;
  const willMine = props.willMine ?? contractWillMine;

  const roiProgress =
    maxCapacity > 0 ? (usedCapacity / maxCapacity) * 100 : 0;

  return (
    <div className="bg-[#0B0E14]/80 p-4 md:p-5 rounded-2xl border border-[#D4AF37]/25 shadow-xl w-full">
      {/* CABEÇALHO DA CARD */}
      <div className="flex items-center justify-between gap-1.5 text-xs text-gray-400 mb-1">
        <div className="flex items-center gap-1.5">
          <Zap className="w-4 h-4 text-[#D4AF37]" />
          <span className="font-semibold">Capacidade de Lucros (PC) Restante</span>
        </div>
        <span className="text-[10px] font-bold text-[#D4AF37] font-mono">
          CS • eCoin
        </span>
      </div>

      {/* EXIBIÇÃO DA CAPACIDADE RESTANTE EM ECOIN */}
      <div className="mt-1 mb-4 flex items-baseline gap-2 flex-wrap">
        <span className="text-xl md:text-2xl font-black text-[#D4AF37] break-all font-mono">
          {remainingCapacity.toFixed(9)} eCoin
        </span>
      </div>

      {/* ROI PROGRESS */}
      <div className="mt-4 pt-4 border-t border-gray-800/80">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-white/50 text-xs uppercase">
            <TrendingUp size={14} />
            <span>Progresso do Teto PC (130%)</span>
          </div>

          <span className="text-white text-xs font-bold">
            {roiProgress.toFixed(2)}%
          </span>
        </div>

        <div className="w-full h-3.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            animate={{
              width: `${Math.min(roiProgress, 100)}%`,
            }}
            transition={{
              duration: 1.2,
            }}
            className="h-full bg-gradient-to-r from-[#D4AF37] via-amber-400 to-red-500"
          />
        </div>

        <div className="mt-2.5 flex justify-between text-[10px] text-white/30">
          <span>0%</span>
          <span>Esgotamento da Capacidade de Lucro</span>
          <span>100% (Teto ROI)</span>
        </div>
      </div>

      {/* STATUS PANEL */}
      <div
        className={`mt-5 rounded-xl border p-4 transition-all ${
          remainingCapacity <= 0
            ? 'border-red-500/20 bg-red-500/5'
            : willMine
            ? 'border-green-500/20 bg-green-500/5'
            : 'border-red-500/20 bg-red-500/5'
        }`}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3
              className={`text-xs md:text-sm font-black ${
                remainingCapacity <= 0
                  ? 'text-red-400'
                  : willMine
                  ? 'text-green-400'
                  : 'text-red-400'
              }`}
            >
              {willMine
                ? '🟢 Realização de lucros Ativa (eCoin)'
                : '🔴 Realização de lucros Pausada'}
            </h3>

            <p className="text-[11px] text-white/40 mt-1 leading-relaxed">
              {remainingCapacity <= 0
                ? 'Os Lucros do Bot ecnTrading excederam a sua capacidade de Lucros em eCoin. Recarregue a sua capacidade (CS) em eCoin para continuar a receber lucros.'
                : willMine
                ? 'Capacidade de Lucro (PC) em eCoin disponível para crédito regular dos lucros dos bots eCoin & BuyBack.'
                : stakeActive
                ? 'Adquira mais Capacidade de Lucro (PC) em eCoin para retomar o recebimento dos rendimentos.'
                : 'Ative sua posição de Shareholder e ou ecnTrader em eCoin para liberar o recebimento.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}