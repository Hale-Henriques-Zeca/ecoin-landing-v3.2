'use client';

import React, { useEffect } from 'react';
import { useAccount, useReadContracts } from 'wagmi';
import { formatUnits } from 'viem';

import EcnTradingAICompoundingConceptCTA from '@/components/CTA/EcnTradingAICompoundingConceptCTA/EcnTradingAICompoundingConceptCTA';

import { CONTRACTS } from '@/lib/contracts/contracts';
import { eCoinMiningStakingAbi } from '@/lib/abis/eCoinMining/eCoinMiningStakingAbi';
import { useMiningStakingeCoin } from '@/hooks/eCoinMining/useMiningStakingeCoin';
import { useTransactionStateeCoin } from '@/hooks/eCoinMining/useTransactionStateeCoin';

export default function ECoinProfit() {
  const { address } = useAccount();

  const claimTx = useTransactionStateeCoin();
  const mining = useMiningStakingeCoin();

  const contractConfig = {
    abi: eCoinMiningStakingAbi,
    address: CONTRACTS.eCoin_Mining_Staking_eCoin,
    chainId: 56,
  } as const;

  // 📊 Leitura multicall direta para espelhar exatamente o cálculo de _update() no contrato
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
      enabled: Boolean(address),
      refetchInterval: 10000,
    },
  });

  // Cálculo normalizado em bigint (evita exibir overflow que o contrato devolve ao buffer)
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

  const handleClaimRewards = async () => {
    try {
      claimTx.setState('wallet');
      await mining.claim();
      claimTx.setState('submitted');
    } catch (error) {
      console.error('Erro ao resgatar dividendos eCoin:', error);
      claimTx.setState('error');
    }
  };

  const formatECoin = (val: number) => {
    const formatted = val.toLocaleString('pt-PT', {
      minimumFractionDigits: 9,
      maximumFractionDigits: 9,
    });
    return `${formatted} eCoin`;
  };

  return (
    <div className="space-y-5">
      {/* Lucro Total eCoin Card (Gradiente e Borda Dourada) */}
      <div className="bg-gradient-to-r from-amber-950 via-yellow-950 to-amber-900 border border-[#D4AF37]/30 rounded-2xl p-4">
        <span className="text-xs text-[#D4AF37] block font-medium">
          Lucro Total eCoin (Realizado)
        </span>
        <div className="text-2xl font-extrabold text-white my-1">
          {formatECoin(pendingECoin)}
        </div>
        <span className="text-xs text-[#D4AF37] font-bold bg-[#D4AF37]/20 px-2 py-0.5 rounded-full inline-block">
          ▲ +12,45%
        </span>
      </div>

      {/* Disponível para Levantamento eCoin */}
      <div className="bg-[#12181F] border border-gray-800 rounded-2xl p-4">
        <span className="text-xs text-gray-400 block mb-1">
          Disponível para Levantamento (eCoin)
        </span>
        <div className="text-xl font-bold text-[#D4AF37] mb-4">
          {formatECoin(withdrawNetECoin)}
        </div>

        <button
          onClick={handleClaimRewards}
          disabled={
            claimTx.state === 'wallet' ||
            claimTx.state === 'submitted' ||
            pendingECoin <= 0
          }
          className="w-full py-3 bg-[#D4AF37] text-black font-extrabold rounded-xl hover:bg-[#e5c14b] shadow-lg shadow-[#D4AF37]/20 mb-3 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
        >
          {claimTx.state === 'wallet'
            ? 'Confirmar na Carteira...'
            : claimTx.state === 'submitted'
            ? 'A Processar...'
            : claimTx.state === 'success'
            ? 'Sucesso!'
            : 'Levantar Lucros eCoin'}
        </button>

        <div className="grid grid-cols-2 gap-2 text-center text-xs">
          <button className="py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700">
            Reinvestir
          </button>
          <button className="py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700">
            Converter
          </button>
        </div>
      </div>

      {/* CTA Component */}
      <EcnTradingAICompoundingConceptCTA />
    </div>
  );
}