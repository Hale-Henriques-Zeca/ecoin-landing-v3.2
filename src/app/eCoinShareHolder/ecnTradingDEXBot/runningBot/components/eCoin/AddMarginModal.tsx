'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useAccount, useReadContracts } from 'wagmi';
import { formatUnits, erc20Abi } from 'viem';
import { RunningBotItem } from '../../../types/ecnTrading';
import { CONTRACTS } from '@/lib/contracts/contracts';
import { eCoinMiningStakingAbi } from '@/lib/abis/eCoinMining/eCoinMiningStakingAbi';
import { useMiningStakingeCoin } from '@/hooks/eCoinMining/useMiningStakingeCoin';
import { useTransactionStateeCoin } from '@/hooks/eCoinMining/useTransactionStateeCoin';
import TxButton from '@/components/TxButton';

function useSafeNumberInput(initial = '') {
  const [value, setValue] = useState(initial);
  const onChange = (input: string) => {
    const raw = input.replace(',', '.').replace(/[^\d.]/g, '');
    if (/^\d*\.?\d*$/.test(raw)) {
      setValue(raw);
    }
  };
  const normalizedValue = value.replace(',', '.').trim() || '0';
  const isValid = value !== '' && !isNaN(Number(normalizedValue)) && Number(normalizedValue) > 0;
  return { value, normalizedValue, setValue, onChange, isValid };
}

interface AddMarginModalProps {
  bot?: RunningBotItem | null;
  pairName?: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function AddMarginModal({
  bot,
  pairName,
  isOpen,
  onClose,
}: AddMarginModalProps) {
  const { address } = useAccount();
  const mining = useMiningStakingeCoin();
  const txState = useTransactionStateeCoin();
  const marginInput = useSafeNumberInput('');

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
    if (mining.stakeConfirmed) {
      txState.setState('success');
      refetch();
      const timer = setTimeout(() => {
        txState.setState('idle');
        onClose();
      }, 1200);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mining.stakeConfirmed]);

  if (!isOpen) return null;

  const displayPair = bot?.pair ?? pairName ?? 'E-Coin Bot';

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

  const handleSetPercentage = (pct: number) => {
    const val = (walletBal * pct) / 100;
    marginInput.setValue(val > 0 ? val.toString() : '0');
  };

  const handleConfirmMargin = async () => {
    if (!marginInput.isValid) {
      alert('Insira uma quantidade válida de eCoin.');
      return;
    }

    try {
      txState.setState('wallet');
      await mining.stake(marginInput.normalizedValue);
      txState.setState('submitted');
    } catch (err) {
      console.error('Erro ao adicionar margem em eCoin:', err);
      txState.setState('error');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-[#12181F] border border-[#D4AF37]/30 rounded-2xl p-5 w-full max-w-md relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white cursor-pointer"
        >
          <X size={20} />
        </button>

        <h2 className="text-base font-bold text-[#D4AF37] mb-1 flex items-center gap-2">
          Adicionar Margem (PM) — {displayPair}
        </h2>
        <p className="text-xs text-gray-400 mb-4">
          Aumente sua retenção de eCoin para expandir a participação de mercado no pool de liquidez do robô.
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

        <div className="relative mb-3">
          <input
            type="text"
            inputMode="decimal"
            placeholder="0.00"
            value={marginInput.value}
            onChange={(e) => marginInput.onChange(e.target.value)}
            className="w-full bg-[#0B0E14] border border-gray-700 rounded-xl px-3 py-2.5 text-sm font-bold text-[#D4AF37] focus:outline-none focus:border-[#D4AF37]"
          />
          <span className="absolute right-3 top-3 text-xs font-bold text-[#D4AF37]">eCoin</span>
        </div>

        {/* Porcentagens rápidas */}
        <div className="flex justify-between gap-2 mb-5">
          {[25, 50, 75, 100].map((pct) => (
            <button
              key={pct}
              type="button"
              onClick={() => handleSetPercentage(pct)}
              className="flex-1 py-1.5 bg-gray-800 text-xs text-gray-300 rounded-lg hover:bg-[#D4AF37]/20 hover:text-[#D4AF37] transition cursor-pointer"
            >
              {pct}%
            </button>
          ))}
        </div>

        <TxButton
          state={txState.state}
          idleText="Confirmar Adição de Margem (eCoin)"
          onClick={handleConfirmMargin}
          className="w-full py-3 bg-gradient-to-r from-[#D4AF37] to-amber-500 text-black font-extrabold rounded-xl hover:brightness-110 shadow-lg shadow-[#D4AF37]/20 cursor-pointer disabled:opacity-50"
        />
      </div>
    </div>
  );
}