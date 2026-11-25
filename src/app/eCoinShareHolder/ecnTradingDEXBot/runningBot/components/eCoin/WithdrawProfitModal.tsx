'use client';

import React, { useEffect } from 'react';
import { X, Award } from 'lucide-react';
import { useAccount, useReadContracts } from 'wagmi';
import { formatUnits } from 'viem';

import TxButton from '@/components/TxButton';
import ClaimCooldown from '@/components/mining/eCoin/ClaimCooldown';
import { RunningBotItem } from '../../../types/ecnTrading';
import { CONTRACTS } from '@/lib/contracts/contracts';
import { eCoinMiningStakingAbi } from '@/lib/abis/eCoinMining/eCoinMiningStakingAbi';
import { useTransactionStateeCoin } from '@/hooks/eCoinMining/useTransactionStateeCoin';
import { useMiningStakingeCoin } from '@/hooks/eCoinMining/useMiningStakingeCoin';

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
  const claimTx = useTransactionStateeCoin();
  const mining = useMiningStakingeCoin();

  const contractConfig = {
    abi: eCoinMiningStakingAbi,
    address: CONTRACTS.eCoin_Mining_Staking_eCoin,
    chainId: 56,
  } as const;

  // 📊 Leitura multicall estática para espelhar exatamente o cálculo de _update() no contrato
  const { data: reads, refetch } = useReadContracts({
    contracts: address
      ? [
          {
            ...contractConfig,
            functionName: 'pendingRewards',
            args: [address],
          },
          {
            ...contractConfig,
            functionName: 'users',
            args: [address],
          },
          {
            ...contractConfig,
            functionName: 'gasCapacity',
            args: [address],
          },
          {
            ...contractConfig,
            functionName: 'gasConsumed',
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
      enabled: Boolean(address && isOpen),
      refetchInterval: 10000,
    },
  });

  // Cálculo normalizado em bigint (respeita o teto de capacidade CS e ignora overflow devolvido ao buffer)
  const hasAllReads =
    Boolean(address) &&
    reads?.[0]?.status === 'success' &&
    reads?.[1]?.status === 'success' &&
    reads?.[2]?.status === 'success' &&
    reads?.[3]?.status === 'success' &&
    reads?.[4]?.status === 'success';

  let pendingECoin = Number(mining.pendingECoin ?? 0);

  if (hasAllReads && reads) {
    const rawPendingBN = (reads[0].result as bigint) ?? 0n;
    const userTuple = reads[1].result as readonly [bigint, bigint, bigint];
    const storedPendingBN = userTuple?.[2] ?? 0n;
    const gasCapacityBN = (reads[2].result as bigint) ?? 0n;
    const gasConsumedBN = (reads[3].result as bigint) ?? 0n;
    const isMiningActive = Boolean(reads[4].result);

    const unclaimedBN =
      rawPendingBN > storedPendingBN ? rawPendingBN - storedPendingBN : 0n;

    const remainingGasBN =
      isMiningActive && gasCapacityBN > gasConsumedBN
        ? gasCapacityBN - gasConsumedBN
        : 0n;

    const acceptedBN =
      unclaimedBN <= remainingGasBN ? unclaimedBN : remainingGasBN;

    pendingECoin = Number(formatUnits(storedPendingBN + acceptedBN, 18));
  }

  // Taxa de 1% do ECoinMiningFeeCollectorECoin (CLAIM_FEE_BP = 100)
  const withdrawFeeECoin = pendingECoin * 0.01;
  const withdrawNetECoin = Math.max(0, pendingECoin - withdrawFeeECoin);

  useEffect(() => {
    if (mining.claimConfirmed) {
      claimTx.setState('success');
      refetch();
      const timer = setTimeout(() => {
        claimTx.setState('idle');
      }, 2000);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mining.claimConfirmed]);

  if (!isOpen || !bot) return null;

  const handleClaimRewards = async () => {
    try {
      claimTx.setState('wallet');
      await mining.claim();
      claimTx.setState('submitted');
    } catch (error) {
      console.error('Erro ao Sacar Lucros em eCoin:', error);
      claimTx.setState('error');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg bg-gradient-to-b from-[#D4AF37]/15 via-[#0d0d0f] to-[#0d0d0f] border border-[#D4AF37]/30 rounded-3xl p-6 relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition cursor-pointer"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-2 text-[#D4AF37] font-bold text-base mb-4">
          <Award size={22} />
          <span>Resgatar Lucro Realizado ({bot.pair})</span>
        </div>

        <div className="text-center py-6 border-y border-white/10 mb-5 bg-black/30 rounded-2xl">
          <span className="text-[10px] text-gray-400 uppercase tracking-widest block mb-2 font-mono">
            Lucro Pronto para Saque (Exclusivo eCoin)
          </span>

          <div className="font-mono">
            <div className="text-2xl font-black text-[#D4AF37]">
              {pendingECoin.toFixed(6)} eCoin
            </div>
          </div>
        </div>

        {pendingECoin > 0 && (
          <div className="bg-black/50 border border-white/5 rounded-2xl p-4 mb-5 space-y-2 font-mono text-xs">
            <div className="flex justify-between text-gray-300">
              <span>Total Bruto</span>
              <span className="font-bold text-white">
                {pendingECoin.toFixed(6)} eCoin
              </span>
            </div>
            <div className="flex justify-between text-red-400">
              <span>Taxa de Processamento (1%)</span>
              <span>-{withdrawFeeECoin.toFixed(6)} eCoin</span>
            </div>
            <div className="h-px bg-white/10 my-1" />
            <div className="flex justify-between text-sm font-black text-[#D4AF37]">
              <span>Rendimento Líquido</span>
              <span>{withdrawNetECoin.toFixed(6)} eCoin</span>
            </div>
          </div>
        )}

        <TxButton
          state={claimTx.state}
          disabled={pendingECoin <= 0}
          idleText="SACAR LUCROS ECOIN AGORA"
          className="w-full py-4 rounded-xl font-black uppercase text-xs tracking-widest bg-[#D4AF37] text-black hover:bg-white transition-all cursor-pointer shadow-lg shadow-[#D4AF37]/20 disabled:opacity-50"
          onClick={handleClaimRewards}
        />

        <div className="text-center text-[10px] text-white/40 mt-3 font-mono">
          <ClaimCooldown />
        </div>
      </div>
    </div>
  );
}