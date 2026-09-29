'use client';

import React from 'react';
import { Wallet, TrendingUp, Coins, ShieldCheck, Sparkles } from 'lucide-react';
import { useAccount, useReadContract } from 'wagmi';
import { formatUnits } from 'viem';

import { useMiningStaking } from '@/hooks/useMiningStaking';
import { useOverflowAnalytics } from '@/hooks/useOverflowAnalytics';
import { useEcGas } from '@/hooks/useEcGas';
import { CONTRACTS } from '@/lib/contracts/contracts';
import { miningStakingAbi } from '@/lib/abis/miningStakingAbi';

interface UserStakingProps {
  allocatedAssets?: number;
  growthPercentage?: number;
  showDetails?: boolean;
}

export default function UserStaking({
  allocatedAssets,
  growthPercentage = 6.26,
  showDetails = false,
}: UserStakingProps) {
  const { address } = useAccount();

  // 📊 1. Leitura autônoma de Hooks de Mineração e Staking
  const mining = useMiningStaking();
  const overflow = useOverflowAnalytics();
  const gas = useEcGas(address);

  // 🔗 2. Leitura direta do Contrato de Dividendos/Staking na BSC (Chain 56)
  const { data: pending } = useReadContract({
    abi: miningStakingAbi,
    address: CONTRACTS.MINING_STAKING,
    functionName: 'pendingRewards',
    chainId: 56,
    args: address ? [address] : undefined,
  });

  // 💰 3. Processamento de Valores em Tempo Real
  const pendingUSDT = pending ? Number(formatUnits(pending[0], 18)) : 0;
  const pendingEUSD = pending ? Number(formatUnits(pending[1], 18)) : 0;
  const totalPendingRewards = pendingUSDT + pendingEUSD;

  // Patrimônio Alocado (Staked / Assets na Blockchain)
  const rawStake = Number(mining.userStakeFormatted || mining.userStake || 0);
  const actualAllocated = allocatedAssets ?? rawStake;

  // Cota de Dividendos do Usuário
  const userShare = Number(mining.share || 0).toFixed(4);

  return (
    <div className="relative overflow-hidden rounded-2xl md:rounded-3xl border border-white/10 bg-[#09090b]/80 backdrop-blur-xl p-4 md:p-5 w-full transition-all duration-300 hover:border-[#D4AF37]/30">
      {/* Brilho sutil de fundo */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 via-transparent to-transparent pointer-events-none" />

      {/* Cabeçalho do Card */}
      <div className="relative z-10 flex justify-between items-center mb-3">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5 font-mono">
          <Wallet className="w-4 h-4 text-[#D4AF37]" />
          Fundos Alocados em E-Coin
        </span>
    
      </div>

      {/* Valor do Patrimônio Alocado & % de Rendimento */}
      <div className="relative z-10 flex items-baseline justify-between flex-wrap gap-2 mb-2">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl md:text-4xl font-black tracking-tight text-white font-mono break-all">
            {actualAllocated.toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 6,
            })}
          </span>
        </div>

        <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-[#00FF9C]/10 border border-[#00FF9C]/20 text-[#00FF9C] text-xs font-bold font-mono">
          <TrendingUp className="w-3.5 h-3.5" />
          +{growthPercentage.toFixed(2)}%
        </div>
      </div>

      {/* Detalhes Adicionais Conectados à Blockchain */}
      {showDetails && (
        <div className="relative z-10 mt-4 pt-3 border-t border-white/10 grid grid-cols-2 gap-2 text-xs font-mono">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 uppercase flex items-center gap-1">
              <Coins className="w-3 h-3 text-[#D4AF37]" /> Cota Global
            </span>
            <span className="font-bold text-white">{userShare}%</span>
          </div>

          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 uppercase flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-emerald-400" /> Dividendos Pendentes
            </span>
            <span className="font-bold text-emerald-400">
              ${totalPendingRewards.toFixed(4)} USD
            </span>
          </div>
        </div>
      )}

      {/* Status de Proteção */}
      <div className="relative z-10 mt-3 flex items-center justify-between text-[10px] text-gray-500 font-mono">
        <span className="flex items-center gap-1 text-slate-400">
          <ShieldCheck className="w-3 h-3 text-emerald-500" /> Smart Contract Active
        </span>
        <span className="text-slate-500">{mining.totalStakers || 0} ecnTraders ativos</span>
      </div>
    </div>
  );
}