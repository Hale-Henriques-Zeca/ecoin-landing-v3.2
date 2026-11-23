'use client';

import { useState, useEffect } from 'react';
import { X, Coins } from 'lucide-react';
import { parseUnits, formatUnits, erc20Abi } from 'viem';
import {
  useAccount,
  useReadContracts,
  useWriteContract,
  useWaitForTransactionReceipt,
} from 'wagmi';
import { RunningBotItem } from '../../../types/ecnTrading';
import { CONTRACTS } from '@/lib/contracts/contracts';
import { useTransactionStateeCoin } from '@/hooks/eCoinMining/useTransactionStateeCoin';
import TxButton from '@/components/TxButton';

const ECOIN_GAS_SALE_ABI = [
  {
    name: 'ecoinEnabled',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ type: 'bool' }],
  },
  {
    name: 'buyECoin',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [{ name: 'ecoinAmount', type: 'uint256' }],
    outputs: [],
  },
] as const;

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

interface AddCapacityModalProps {
  bot?: RunningBotItem | null;
  pairName?: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function AddCapacityModal({
  bot,
  pairName,
  isOpen,
  onClose,
}: AddCapacityModalProps) {
  const { address } = useAccount();
  const txState = useTransactionStateeCoin();
  const csInput = useSafeNumberInput('100');

  const contractsRecord = CONTRACTS as Record<string, `0x${string}` | undefined>;
  const ECOIN_TOKEN_ADDRESS = (
    contractsRecord.ECOIN ??
    contractsRecord.eCoin ??
    '0xDf69235019cc416dd5Be75dfc0eDc922aB4b5964'
  ) as `0x${string}`;

  const ECOIN_GAS_SALE_ADDRESS = (
    contractsRecord.eCoin_EcGas_Sale_eCoin ??
    contractsRecord.ECGAS_SALE_ECOIN ??
    contractsRecord.eCoin_Gas_Sale_eCoin ??
    '0x93E5e623601303346A7790062473946Daf6F6D0b'
  ) as `0x${string}`;

  const { data: reads, refetch } = useReadContracts({
    contracts: [
      {
        address: ECOIN_GAS_SALE_ADDRESS,
        abi: ECOIN_GAS_SALE_ABI,
        functionName: 'ecoinEnabled',
        chainId: 56,
      },
      ...(address
        ? [
            {
              address: ECOIN_TOKEN_ADDRESS,
              abi: erc20Abi,
              functionName: 'balanceOf',
              args: [address],
              chainId: 56,
            } as const,
            {
              address: ECOIN_TOKEN_ADDRESS,
              abi: erc20Abi,
              functionName: 'allowance',
              args: [address, ECOIN_GAS_SALE_ADDRESS],
              chainId: 56,
            } as const,
          ]
        : []),
    ],
    query: {
      enabled: isOpen,
    },
  });

  const {
    writeContractAsync,
    data: txHash,
    isPending: isWritePending,
  } = useWriteContract();

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
  } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  useEffect(() => {
    if (isWritePending || isConfirming) {
      txState.setState('confirming');
    }
  }, [isWritePending, isConfirming, txState]);

  useEffect(() => {
    if (isConfirmed) {
      txState.setState('success');
      refetch();
      const timer = setTimeout(() => {
        txState.setState('idle');
        onClose();
      }, 1200);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConfirmed]);

  if (!isOpen) return null;

  const displayPair = bot?.pair ?? pairName ?? 'E-Coin Bot';

  const ecoinSaleEnabled =
    reads?.[0]?.status === 'success' ? Boolean(reads[0].result) : true;

  const walletBal =
    address && reads?.[1]?.status === 'success'
      ? Number(formatUnits((reads[1].result as bigint) ?? 0n, 18))
      : 0;

  const currentAllowance =
    address && reads?.[2]?.status === 'success'
      ? ((reads[2].result as bigint) ?? 0n)
      : 0n;

  const numVal = Number(csInput.normalizedValue);
  const maxReturn = (numVal * 1.3).toFixed(2);
  const profitMargin = (numVal * 0.3).toFixed(2);

  const handleAcquireCS = async () => {
    if (!csInput.isValid) {
      alert('Insira um valor válido de CS em eCoin.');
      return;
    }

    try {
      txState.setState('wallet');
      const parsed = parseUnits(csInput.normalizedValue, 18);

      if (currentAllowance < parsed) {
        await writeContractAsync({
          address: ECOIN_TOKEN_ADDRESS,
          abi: erc20Abi,
          functionName: 'approve',
          args: [ECOIN_GAS_SALE_ADDRESS, parsed],
          chainId: 56,
        });
      }

      await writeContractAsync({
        address: ECOIN_GAS_SALE_ADDRESS,
        abi: ECOIN_GAS_SALE_ABI,
        functionName: 'buyECoin',
        args: [parsed],
        chainId: 56,
      });

      txState.setState('submitted');
    } catch (err) {
      console.error('Erro ao expandir capacidade CS em eCoin:', err);
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

        <div className="flex items-center justify-between pr-6 mb-1">
          <h2 className="text-base font-bold text-[#D4AF37]">
            Expansão de Profit Capacity (CS) — {displayPair}
          </h2>
        </div>

        <p className="text-xs text-gray-400 mb-4">
          Adquira mais teto de lucro em eCoin para que seu robô continue executando ordens no mercado.
        </p>

        <div className="flex items-center justify-between text-xs bg-[#0B0E14] p-3 rounded-xl border border-white/5 mb-3">
          <span className="text-gray-400">Saldo eCoin em Carteira:</span>
          <span className="text-[#D4AF37] font-bold font-mono">
            {walletBal.toLocaleString('pt-BR', { maximumFractionDigits: 4 })} eCoin
          </span>
        </div>

        <div className="flex items-center justify-between mb-1">
          <label className="text-xs text-gray-400">Valor do Selo CS (eCoin)</label>
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#D4AF37]">
            <Coins size={12} /> Exclusivo eCoin
          </span>
        </div>

        <div className="relative mb-3">
          <input
            type="text"
            inputMode="decimal"
            value={csInput.value}
            onChange={(e) => csInput.onChange(e.target.value)}
            placeholder="0.00"
            className="w-full bg-[#0B0E14] border border-gray-700 rounded-xl px-3 py-2.5 text-sm font-bold text-[#D4AF37] focus:outline-none focus:border-[#D4AF37]"
          />
          <span className="absolute right-3 top-3 text-xs font-bold text-[#D4AF37]">eCoin</span>
        </div>

        <div className="text-xs text-gray-400 space-y-1 mb-5 bg-[#0B0E14] p-3 rounded-xl border border-white/5">
          <div className="flex justify-between">
            <span>Retorno Total Liberado (130%):</span>
            <span className="text-[#D4AF37] font-bold">{maxReturn} eCoin</span>
          </div>
          <div className="flex justify-between">
            <span>Margem Direta de Lucro (+30%):</span>
            <span className="text-emerald-400 font-bold">+{profitMargin} eCoin</span>
          </div>
        </div>

        <TxButton
          state={txState.state}
          disabled={!ecoinSaleEnabled}
          idleText="Comprar CS & Expandir com eCoin"
          onClick={handleAcquireCS}
          className="w-full py-3 bg-gradient-to-r from-[#D4AF37] to-amber-500 text-black font-extrabold rounded-xl hover:brightness-110 shadow-lg shadow-[#D4AF37]/20 cursor-pointer disabled:opacity-50"
        />
      </div>
    </div>
  );
}