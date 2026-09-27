'use client';

import React, { useEffect } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import { formatUnits } from 'viem';

import EcnTradingAICompoundingConceptCTA from '@/components/CTA/EcnTradingAICompoundingConceptCTA/EcnTradingAICompoundingConceptCTA';

import { CONTRACTS } from '@/lib/contracts/contracts';
import { miningStakingAbi } from '@/lib/abis/miningStakingAbi';
import { useTransactionState } from '@/hooks/useTransactionState';
import { useMiningStaking } from '@/hooks/useMiningStaking';

export default function EDollarProfit() {
  const { address } = useAccount();

  const claimTx = useTransactionState();
  const mining = useMiningStaking();

  // 📊 Leitura do saldo pendente em eUSD (index 1)
  const { data: pending } = useReadContract({
    abi: miningStakingAbi,
    address: CONTRACTS.MINING_STAKING,
    functionName: 'pendingRewards',
    chainId: 56,
    args: address ? [address] : undefined,
  });

  const pendingEUSD = pending ? Number(formatUnits(pending[1], 18)) : 0;
  const withdrawFeeEUSD = pendingEUSD * 0.01;
  const withdrawNetEUSD = pendingEUSD - withdrawFeeEUSD;

  useEffect(() => {
    if (mining.claimConfirmed) {
      claimTx.setState('success');
      const timer = setTimeout(() => {
        claimTx.setState('idle');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [mining.claimConfirmed, claimTx]);

  const handleClaimRewards = async () => {
    try {
      claimTx.setState('wallet');
      await mining.claim();
      claimTx.setState('submitted');
    } catch (error) {
      console.error('Erro ao resgatar dividendos eDollar:', error);
      claimTx.setState('error');
    }
  };

  const formatEUSD = (val: number) => {
    const formatted = val.toLocaleString('pt-PT', {
      minimumFractionDigits: 9,
      maximumFractionDigits: 9,
    });
    return `${formatted} EUSD`;
  };

  return (
    <div className="space-y-5">
      {/* Lucro Total eDollar Card (Gradiente e Borda Azul) */}
      <div className="bg-gradient-to-r from-blue-950 to-indigo-950 border border-blue-500/30 rounded-2xl p-4">
        <span className="text-xs text-blue-300 block">Lucro Total eDollar (Realizado)</span>
        <div className="text-2xl font-extrabold text-white my-1">
          {formatEUSD(pendingEUSD)}
        </div>
        <span className="text-xs text-blue-400 font-bold bg-blue-500/20 px-2 py-0.5 rounded-full inline-block">
          ▲ +12,45%
        </span>
      </div>

      {/* Disponível para Levantamento eDollar */}
      <div className="bg-[#12181F] border border-gray-800 rounded-2xl p-4">
        <span className="text-xs text-gray-400 block mb-1">Disponível para Levantamento (eDollar)</span>
        <div className="text-xl font-bold text-blue-400 mb-4">
          {formatEUSD(withdrawNetEUSD)}
        </div>

        <button
          onClick={handleClaimRewards}
          disabled={claimTx.state === 'wallet' || claimTx.state === 'submitted' || pendingEUSD <= 0}
          className="w-full py-3 bg-blue-600 text-white font-extrabold rounded-xl hover:bg-blue-500 shadow-lg shadow-blue-600/20 mb-3 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {claimTx.state === 'wallet'
            ? 'Confirmar na Carteira...'
            : claimTx.state === 'submitted'
            ? 'A Processar...'
            : claimTx.state === 'success'
            ? 'Sucesso!'
            : 'Levantar Lucros eDollar'}
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