'use client';

import React from 'react';
import { Wallet, Coins, ShieldCheck, Sparkles } from 'lucide-react';
import { useAccount, useReadContracts } from 'wagmi';
import { formatUnits } from 'viem';

import { useMiningStakingeCoin } from '@/hooks/eCoinMining/useMiningStakingeCoin';
import { CONTRACTS } from '@/lib/contracts/contracts';
import { eCoinMiningStakingAbi } from '@/lib/abis/eCoinMining/eCoinMiningStakingAbi';

interface UserStakingProps {
  allocatedAssets?: number;
  growthPercentage?: number;
  showDetails?: boolean;
}

export default function UserStaking({
  allocatedAssets,
  showDetails = false,
}: UserStakingProps) {
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
            functionName: 'users',
            args: [address],
          },
          {
            ...contractConfig,
            functionName: 'pendingRewards',
            args: [address],
          },
          {
            ...contractConfig,
            functionName: 'userShareBP',
            args: [address],
          },
        ]
      : [],
    query: {
      enabled: Boolean(address),
      refetchInterval: 10000,
    },
  });

  const rawUser =
    address && reads?.[0]?.status === 'success'
      ? (reads[0].result as readonly [bigint, bigint, bigint])
      : undefined;

  const contractStake = rawUser
    ? Number(formatUnits(rawUser[0] ?? 0n, 18))
    : Number(mining.userStakeFormatted || mining.userStake || 0);

  const actualAllocated = allocatedAssets ?? contractStake;

  const pendingECoin =
    address && reads?.[1]?.status === 'success'
      ? Number(formatUnits((reads[1].result as bigint) ?? 0n, 18))
      : Number(mining.pendingECoin || 0);

  const userShareBP =
    address && reads?.[2]?.status === 'success'
      ? Number(reads[2].result ?? 0)
      : 0;

  const userShare =
    userShareBP > 0
      ? (userShareBP / 100).toFixed(4)
      : Number(mining.share || 0).toFixed(4);

  const totalStakers = Number(
    (mining as { totalStakers?: number | bigint }).totalStakers ?? 0
  );

  return (
    <div className="relative overflow-hidden rounded-2xl md:rounded-3xl border border-[#D4AF37]/25 bg-[#09090b]/80 backdrop-blur-xl p-4 md:p-5 w-full transition-all duration-300 hover:border-[#D4AF37]/50">
      {/* Brilho dourado sutil de fundo */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/12 via-transparent to-transparent pointer-events-none" />

      {/* Cabeçalho do Card */}
      <div className="relative z-10 flex justify-between items-center mb-3">
        <span className="text-xs font-bold text-gray-300 tracking-wider flex items-center gap-1.5 font-mono">
          <Wallet className="w-4 h-4 text-[#D4AF37]" />
          Fundos Alocados em eCoin (Pool Nativo)
        </span>

        <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 font-mono">
          eCoin &amp; BuyBack
        </span>
      </div>

      {/* Valor do Patrimônio Alocado em eCoin */}
      <div className="relative z-10 flex items-baseline justify-between flex-wrap gap-2 mb-2">
        <div className="flex items-baseline gap-2.5 flex-wrap">
          <span className="text-2xl md:text-4xl font-black tracking-tight text-white font-mono break-all">
            {actualAllocated.toLocaleString('en-US', {
              minimumFractionDigits: 15,
              maximumFractionDigits: 15,
            })}
          </span>
          <span className="text-sm md:text-base font-extrabold text-[#D4AF37] font-mono">
            eCoin
          </span>
        </div>
      </div>

      {/* Detalhes Adicionais Conectados ao Contrato ECoinMiningStakingECoin */}
      {showDetails && (
        <div className="relative z-10 mt-4 pt-3 border-t border-white/10 grid grid-cols-2 gap-2 text-xs font-mono">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 uppercase flex items-center gap-1">
              <Coins className="w-3 h-3 text-[#D4AF37]" /> Cota Global eCoin
            </span>
            <span className="font-bold text-white">{userShare}%</span>
          </div>

          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 uppercase flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#D4AF37]" /> Dividendos Pendentes
            </span>
            <span className="font-bold text-[#D4AF37]">
              {pendingECoin.toFixed(6)} eCoin
            </span>
          </div>
        </div>
      )}

      {/* Status de Proteção */}
      <div className="relative z-10 mt-3 flex items-center justify-between text-[10px] text-gray-500 font-mono">
        <span className="flex items-center gap-1 text-slate-400">
          <ShieldCheck className="w-3 h-3 text-[#D4AF37]" /> eCoin Smart Contract Active
        </span>
        <span className="text-slate-500">{totalStakers} ecnTraders ativos</span>
      </div>
    </div>
  );
}