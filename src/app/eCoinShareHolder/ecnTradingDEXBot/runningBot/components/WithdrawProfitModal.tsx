'use client';

import React, { useEffect } from 'react';
import { X, Award } from 'lucide-react';
import { useAccount, useReadContract } from 'wagmi';
import { formatUnits } from 'viem';

import TxButton from '@/components/TxButton';
import ClaimCooldown from '@/components/ClaimCooldown';
import { RunningBotItem } from '../../types/ecnTrading';
import { CONTRACTS } from '@/lib/contracts/contracts';
import { miningStakingAbi } from '@/lib/abis/miningStakingAbi';
import { useTransactionState } from '@/hooks/useTransactionState';
import { useMiningStaking } from '@/hooks/useMiningStaking';

interface WithdrawProfitModalProps {
  bot: RunningBotItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function WithdrawProfitModal({
  bot,
  isOpen,
  onClose,
}: WithdrawProfitModalProps) {
  const { address } = useAccount();
  const claimTx = useTransactionState();
  const mining = useMiningStaking();

  const { data: pending } = useReadContract({
    abi: miningStakingAbi,
    address: CONTRACTS.MINING_STAKING,
    functionName: 'pendingRewards',
    chainId: 56,
    args: address ? [address] : undefined,
  });

  const pendingUSDT = pending ? Number(formatUnits(pending[0], 18)) : 0;
  const pendingEUSD = pending ? Number(formatUnits(pending[1], 18)) : 0;
  const totalRewardsUSD = pendingUSDT + pendingEUSD;
  const withdrawFeeUSD = totalRewardsUSD * 0.01;
  const withdrawNetUSD = totalRewardsUSD - withdrawFeeUSD;

  useEffect(() => {
    if (mining.claimConfirmed) {
      claimTx.setState('success');
      const timer = setTimeout(() => {
        claimTx.setState('idle');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [mining.claimConfirmed, claimTx]);

  if (!isOpen || !bot) return null;

  const handleClaimRewards = async () => {
    try {
      claimTx.setState('wallet');
      await mining.claim();
      claimTx.setState('submitted');
    } catch (error) {
      console.error('Erro ao Sacar Lucros:', error);
      claimTx.setState('error');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg bg-gradient-to-b from-[#D4AF37]/15 via-[#0d0d0f] to-[#0d0d0f] border border-[#D4AF37]/30 rounded-3xl p-6 relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-2 text-[#D4AF37] font-bold text-base mb-4">
          <Award size={22} />
          <span>Resgatar Lucro Realizado ({bot.pair})</span>
        </div>

        <div className="text-center py-6 border-y border-white/10 mb-5 bg-black/30 rounded-2xl">
          <span className="text-[10px] text-gray-400 uppercase tracking-widest block mb-2 font-mono">
            Lucro Pronto para Saque
          </span>

          <div className="space-y-1 font-mono">
            <div className="text-2xl font-black text-emerald-400">
              {pendingUSDT.toFixed(6)} USDT
            </div>
            <div className="text-xl font-bold text-blue-400">
              {pendingEUSD.toFixed(6)} eDollar
            </div>
          </div>
        </div>

        {totalRewardsUSD > 0 && (
          <div className="bg-black/50 border border-white/5 rounded-2xl p-4 mb-5 space-y-2 font-mono text-xs">
            <div className="flex justify-between text-gray-300">
              <span>Total Bruto</span>
              <span className="font-bold text-white">${totalRewardsUSD.toFixed(4)} USD</span>
            </div>
            <div className="flex justify-between text-red-400">
              <span>Taxa de Processamento (1%)</span>
              <span>-${withdrawFeeUSD.toFixed(4)} USD</span>
            </div>
            <div className="h-px bg-white/10 my-1" />
            <div className="flex justify-between text-sm font-black text-emerald-400">
              <span>Rendimento Líquido</span>
              <span>${withdrawNetUSD.toFixed(4)} USD</span>
            </div>
          </div>
        )}

        <TxButton
          state={claimTx.state}
          idleText="SACAR LUCROS AGORA"
          className="w-full py-4 rounded-xl font-black uppercase text-xs tracking-widest bg-[#D4AF37] text-black hover:bg-white transition-all cursor-pointer shadow-lg shadow-[#D4AF37]/20"
          onClick={handleClaimRewards}
        />

        <div className="text-center text-[10px] text-white/40 mt-3 font-mono">
          <ClaimCooldown />
        </div>
      </div>
    </div>
  );
}