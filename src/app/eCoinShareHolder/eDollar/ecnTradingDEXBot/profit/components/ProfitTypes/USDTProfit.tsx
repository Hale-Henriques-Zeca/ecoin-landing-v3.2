'use client';

import React, { useEffect } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import { formatUnits } from 'viem';

import EcnTradingAICompoundingConceptCTA from '@/components/CTA/EcnTradingAICompoundingConceptCTA/EcnTradingAICompoundingConceptCTA';

import { CONTRACTS } from '@/lib/contracts/contracts';
import { miningStakingAbi } from '@/lib/abis/miningStakingAbi';
import { useTransactionState } from '@/hooks/useTransactionState';
import { useMiningStaking } from '@/hooks/useMiningStaking';

export default function USDTProfit() {
  const { address } = useAccount();

  const claimTx = useTransactionState();
  const mining = useMiningStaking();

  // 📊 Leitura do saldo pendente em USDT (index 0)
  const { data: pending } = useReadContract({
    abi: miningStakingAbi,
    address: CONTRACTS.MINING_STAKING,
    functionName: 'pendingRewards',
    chainId: 56,
    args: address ? [address] : undefined,
  });

  const pendingUSDT = pending ? Number(formatUnits(pending[0], 18)) : 0;
  const withdrawFeeUSDT = pendingUSDT * 0.01;
  const withdrawNetUSDT = pendingUSDT - withdrawFeeUSDT;

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
      console.error('Erro ao resgatar dividendos USDT:', error);
      claimTx.setState('error');
    }
  };

  const formatUSD = (val: number) => {
    const formatted = val.toLocaleString('pt-PT', {
      minimumFractionDigits: 15,
      maximumFractionDigits: 15,
    });
    return `$${formatted}`;
  };

  return (
    <div className="space-y-5">
      {/* Lucro Total USDT Card */}
      <div className="bg-gradient-to-r from-emerald-950 to-teal-900 border border-emerald-500/30 rounded-2xl p-4">
        <span className="text-xs text-emerald-300 block">Lucro Total USDT (Realizado)</span>
        <div className="text-2xl font-extrabold text-white my-1">
          {formatUSD(pendingUSDT)}
        </div>
        <span className="text-xs text-emerald-400 font-bold bg-emerald-500/20 px-2 py-0.5 rounded-full inline-block">
          ▲ +12,45%
        </span>
      </div>

      {/* Disponível para Levantamento USDT */}
      <div className="bg-[#12181F] border border-gray-800 rounded-2xl p-4">
        <span className="text-xs text-gray-400 block mb-1">Disponível para Levantamento (USDT)</span>
        <div className="text-xl font-bold text-emerald-400 mb-4">
          {formatUSD(withdrawNetUSDT)}
        </div>

        <button
          onClick={handleClaimRewards}
          disabled={claimTx.state === 'wallet' || claimTx.state === 'submitted' || pendingUSDT <= 0}
          className="w-full py-3 bg-emerald-500 text-black font-extrabold rounded-xl hover:bg-emerald-400 shadow-lg shadow-emerald-500/20 mb-3 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {claimTx.state === 'wallet'
            ? 'Confirmar na Carteira...'
            : claimTx.state === 'submitted'
            ? 'A Processar...'
            : claimTx.state === 'success'
            ? 'Sucesso!'
            : 'Levantar Lucros USDT'}
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