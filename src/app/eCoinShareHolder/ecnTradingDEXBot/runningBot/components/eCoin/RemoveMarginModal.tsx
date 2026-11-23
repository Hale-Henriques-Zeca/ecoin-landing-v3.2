'use client';

import React, { useState, useEffect } from 'react';
import { X, ShieldAlert } from 'lucide-react';
import { useAccount, useReadContracts } from 'wagmi';
import { formatUnits, erc20Abi } from 'viem';
import { RunningBotItem } from '../../../types/ecnTrading';
import { CONTRACTS } from '@/lib/contracts/contracts';
import { eCoinMiningStakingAbi } from '@/lib/abis/eCoinMining/eCoinMiningStakingAbi';
import { useMiningStakingeCoin } from '@/hooks/eCoinMining/useMiningStakingeCoin';
import { useTransactionStateeCoin } from '@/hooks/eCoinMining/useTransactionStateeCoin';
import TxButton from '@/components/TxButton';

interface RemoveMarginModalProps {
  bot: RunningBotItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function RemoveMarginModal({
  bot,
  isOpen,
  onClose,
}: RemoveMarginModalProps) {
  const { address } = useAccount();
  const mining = useMiningStakingeCoin();
  const txState = useTransactionStateeCoin();
  const [amount, setAmount] = useState('');

  const contractsRecord = CONTRACTS as Record<string, `0x${string}` | undefined>;
  const ECOIN_TOKEN_ADDRESS = (
    contractsRecord.ECOIN ??
    contractsRecord.eCoin ??
    '0xDf69235019cc416dd5Be75dfc0eDc922aB4b5964'
  ) as `0x${string}`;

  const { data: reads, refetch } = useReadContracts({
    contracts: address
      ? [
          {
            address: CONTRACTS.eCoin_Mining_Staking_eCoin,
            abi: eCoinMiningStakingAbi,
            functionName: 'users',
            args: [address],
            chainId: 56,
          },
          {
            address: ECOIN_TOKEN_ADDRESS,
            abi: erc20Abi,
            functionName: 'balanceOf',
            args: [address],
            chainId: 56,
          },
        ]
      : [],
    query: {
      enabled: Boolean(address && isOpen),
    },
  });

  useEffect(() => {
    if (mining.unstakeConfirmed) {
      txState.setState('success');
      refetch();
      const timer = setTimeout(() => {
        txState.setState('idle');
        setAmount('');
        onClose();
      }, 1200);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mining.unstakeConfirmed]);

  if (!isOpen || !bot) return null;

  const rawUser =
    address && reads?.[0]?.status === 'success'
      ? (reads[0].result as readonly [bigint, bigint, bigint])
      : undefined;

  const staked = rawUser
    ? Number(formatUnits(rawUser[0] ?? 0n, 18))
    : Number(mining.userStake ?? 0);

  const walletBal =
    address && reads?.[1]?.status === 'success'
      ? Number(formatUnits((reads[1].result as bigint) ?? 0n, 18))
      : Number(mining.walletBalance ?? 0);

  const setPercentage = (percent: number) => {
    const value = (staked * percent) / 100;
    setAmount(value > 0 ? value.toString() : '0');
  };

  const handleRemoveMargin = async () => {
    if (!amount || Number(amount) <= 0) {
      alert('Por favor, insira uma quantia válida de eCoin para remoção.');
      return;
    }
    try {
      txState.setState('wallet');
      await mining.unstake(amount);
      txState.setState('submitted');
    } catch (error) {
      console.error('Erro ao remover margem em eCoin:', error);
      txState.setState('error');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-[#0D1219] border border-red-500/30 rounded-3xl p-6 relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition cursor-pointer"
        >
          <X size={20} />
        </button>

        <h3 className="text-base font-bold text-red-400 flex items-center gap-2 mb-1">
          <ShieldAlert size={20} /> Remover Margem ({bot.pair})
        </h3>
        <p className="text-xs text-gray-400 mb-4">
          Insira a quantidade de eCoin que deseja liberar de volta para a sua carteira.
        </p>

        <div className="bg-[#0B0E14] p-3 rounded-xl border border-gray-800 mb-4">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Saldo Disponível na Carteira:</span>
            <span className="text-[#D4AF37] font-bold">
              {walletBal.toLocaleString('pt-BR', { maximumFractionDigits: 4 })} eCoin
            </span>
          </div>
          <div className="flex justify-between text-xs text-gray-400">
            <span>Margem Retida No Trading Bot Atual:</span>
            <span className="text-emerald-400 font-bold">
              {staked.toLocaleString('pt-BR', { maximumFractionDigits: 4 })} eCoin
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-[10px] text-gray-400 uppercase font-bold mb-1 block">
              Quantidade para Liberação (eCoin)
            </label>
            <div className="relative">
              <input
                type="text"
                inputMode="decimal"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white font-mono font-bold focus:outline-none focus:border-red-500/50"
              />
              <button
                type="button"
                onClick={() => setPercentage(100)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold bg-red-500 text-white px-2.5 py-1 rounded hover:bg-red-600 transition cursor-pointer"
              >
                MAX
              </button>
            </div>
          </div>

          <div>
            <p className="text-[10px] text-gray-400 mb-1 uppercase">Selecione a Percentagem</p>
            <div className="grid grid-cols-4 gap-2">
              {[25, 50, 75, 100].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPercentage(p)}
                  className="text-xs py-2 rounded-lg bg-white/5 border border-white/10 hover:border-red-500/50 text-white transition font-mono cursor-pointer"
                >
                  {p}%
                </button>
              ))}
            </div>
          </div>

          <TxButton
            state={txState.state}
            idleText="CONFIRMAR REMOÇÃO DE MARGEM"
            onClick={handleRemoveMargin}
            className="w-full py-3.5 bg-red-500 hover:bg-red-600 text-white font-extrabold rounded-xl transition text-xs tracking-wider uppercase shadow-lg shadow-red-500/20 cursor-pointer disabled:opacity-50"
          />
        </div>
      </div>
    </div>
  );
}