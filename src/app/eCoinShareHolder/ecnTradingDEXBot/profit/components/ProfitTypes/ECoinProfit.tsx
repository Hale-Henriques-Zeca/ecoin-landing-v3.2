'use client';

import React, { useEffect, useState } from 'react';
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

  const [visualECoin, setVisualECoin] = useState<number>(0);

  const contractConfig = {
    abi: eCoinMiningStakingAbi,
    address: CONTRACTS.eCoin_Mining_Staking_eCoin,
    chainId: 56,
  } as const;

  // 📊 Leituras on-chain do ECoinMiningStakingECoin (pendingRewards, rewardRates, isMiningActive)
  const { data: contractReads, refetch } = useReadContracts({
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
    address && contractReads?.[0]?.status === 'success'
      ? Number(formatUnits((contractReads[0].result as bigint) ?? 0n, 18))
      : Number(mining.pendingECoin ?? 0);

  const rawRates =
    address && contractReads?.[1]?.status === 'success'
      ? (contractReads[1].result as readonly [bigint, bigint, bigint, bigint])
      : undefined;

  const ecoinPerSecond = rawRates
    ? Number(formatUnits(rawRates[0] ?? 0n, 18))
    : Number(mining.rates?.ecoinPerSecond ?? 0);

  const isMiningActive =
    address && contractReads?.[2]?.status === 'success'
      ? Boolean(contractReads[2].result)
      : Boolean(mining.isMiningActive);

  // Stream visual em tempo real sincronizado com pendingRewards + ecoinPerSecond
  useEffect(() => {
    setVisualECoin(pendingECoin);

    if (!isMiningActive || ecoinPerSecond <= 0) return;

    const timer = setInterval(() => {
      setVisualECoin((prev) => prev + ecoinPerSecond);
    }, 1000);

    return () => clearInterval(timer);
  }, [pendingECoin, ecoinPerSecond, isMiningActive]);

  // Taxa de 1% do ECoinMiningFeeCollectorECoin (CLAIM_FEE_BP = 100)
  const withdrawFeeECoin = visualECoin * 0.01;
  const withdrawNetECoin = visualECoin - withdrawFeeECoin;

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
          {formatECoin(visualECoin)}
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
            visualECoin <= 0
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