'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, TrendingUp } from 'lucide-react';
import { useAccount } from 'wagmi';
import { formatUnits } from 'viem';

import { useMiningStaking } from '@/hooks/useMiningStaking';
import { useEcGas } from '@/hooks/useEcGas';

interface UserProfitCapacityProps {
  gasBalance?: number;
  maxCapacity?: number;
  usedCapacity?: number;
  remainingCapacity?: number;
  willMine?: boolean;
  stakeActive?: boolean;
  csUsdtAmount?: number;
  usedCapacityUsdt?: number;
}

export default function UserProfitCapacity(props: UserProfitCapacityProps) {
  const { address } = useAccount();
  const mining = useMiningStaking();
  const gas = useEcGas(address);

  const preview = gas.preview;

  const contractRemaining =
    preview && preview[2] !== undefined
      ? Number(formatUnits(preview[2], 18))
      : Number(mining.remainingCapacity || 0);

  const contractUsed =
    preview && preview[3] !== undefined
      ? Number(formatUnits(preview[3], 18))
      : Number(mining.usedCapacity || 0);

  const contractMax =
    preview && preview[4] !== undefined
      ? Number(formatUnits(preview[4], 18))
      : Number(mining.maxCapacity || 0);

  const contractStakeActive =
    Number(mining.userStake || 0) > 0 || Boolean(mining.stakeActive);

  const contractWillMine = contractRemaining > 0 && contractStakeActive;

  const maxCapacity = props.maxCapacity ?? contractMax;
  const usedCapacity =
    props.usedCapacity ?? props.usedCapacityUsdt ?? contractUsed;
  const remainingCapacity = props.remainingCapacity ?? contractRemaining;
  const stakeActive = props.stakeActive ?? contractStakeActive;
  const willMine = props.willMine ?? contractWillMine;

  const roiProgress =
    maxCapacity > 0 ? (usedCapacity / maxCapacity) * 100 : 0;

  return (
    <div className="bg-[#0B0E14]/80 p-4 md:p-5 rounded-2xl border border-gray-800 shadow-xl w-full">
      {/* CABEÇALHO DA CARD */}
      <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-1">
        <Zap className="w-4 h-4 text-[#00FF9C]" />
        <span className="font-semibold">Capacidade de Lucros (PC) Restante</span>
      </div>

      {/* EXIBIÇÃO DA CAPACIDADE RESTANTE */}
      <div className="mt-1 mb-4">
        <span className="text-xl md:text-2xl font-black text-[#00FF9C] break-all">
          {remainingCapacity.toFixed(9)}
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
            className="h-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-500"
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
            ? "border-red-500/20 bg-red-500/5"
            : willMine
              ? "border-green-500/20 bg-green-500/5"
              : "border-red-500/20 bg-red-500/5"
        }`}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3
              className={`text-xs md:text-sm font-black ${
                remainingCapacity <= 0
                  ? "text-red-400"
                  : willMine
                    ? "text-green-400"
                    : "text-red-400"
              }`}
            >
              {willMine
                ? "🟢 Realização de lucros Ativa"
                : "🔴 Realização de lucros Pausada"}
            </h3>

            <p className="text-[11px] text-white/40 mt-1 leading-relaxed">
              {remainingCapacity <= 0
                ? "Os Lucros do Bot ecnTrading excederam a sua capacidade de Lucros. Recarregue a sua capacidade de lucros para continuar a receber."
                : willMine
                  ? "Capacidade de Lucro (PC) disponível para crédito regular dos lucros do bot ativo."
                  : stakeActive
                    ? "Adquira mais Capacidade de Lucro (PC) para retomar o recebimento dos rendimentos."
                    : "Ative sua posição de Shareholder e ou ecnTrader para liberar o recebimento."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}