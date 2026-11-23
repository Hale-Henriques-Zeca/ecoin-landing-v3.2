'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { HelpCircle, ArrowLeft, Lock, Coins } from 'lucide-react';
import { parseUnits, formatUnits, erc20Abi } from 'viem';
import {
  useAccount,
  useReadContracts,
  useWriteContract,
  useWaitForTransactionReceipt,
} from 'wagmi';

import { CONTRACTS } from '@/lib/contracts/contracts';
import { eCoinMiningStakingAbi } from '@/lib/abis/eCoinMining/eCoinMiningStakingAbi';
import { useMiningStakingeCoin } from '@/hooks/eCoinMining/useMiningStakingeCoin';
import { useTransactionStateeCoin } from '@/hooks/eCoinMining/useTransactionStateeCoin';
import TxButton from '@/components/TxButton';
import PPPInfoModal from '../../components/eCoin/PPPInfoModal';
import CSInfoModal from '../../components/eCoin/CSInfoModal';

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

interface CryptoProps {
  market: string;
}

export default function Crypto({ market }: CryptoProps) {
  const router = useRouter();
  const { address } = useAccount();

  // Hooks exclusivos do ecossistema eCoin
  const mining = useMiningStakingeCoin();
  const txState = useTransactionStateeCoin();

  // Modais de Ajuda (eCoin)
  const [showPPPInfo, setShowPPPInfo] = useState(false);
  const [showCSInfo, setShowCSInfo] = useState(false);

  // Inputs Controlados (exclusivamente em eCoin)
  const stakeInput = useSafeNumberInput('10000');
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

  // Leituras On-Chain do EcGasSaleECoin, ECoinMiningStakingECoin e Saldo/Allowance de eCoin
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
              address: CONTRACTS.eCoin_Mining_Staking_eCoin,
              abi: eCoinMiningStakingAbi,
              functionName: 'users',
              args: [address],
              chainId: 56,
            } as const,
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
      refetchInterval: 10000,
    },
  });

  const ecoinSaleEnabled =
    reads?.[0]?.status === 'success' ? Boolean(reads[0].result) : true;

  const rawUserInfo =
    address && reads?.[1]?.status === 'success'
      ? (reads[1].result as readonly [bigint, bigint, bigint])
      : undefined;

  const onChainUserStake = rawUserInfo
    ? Number(formatUnits(rawUserInfo[0] ?? 0n, 18))
    : Number(mining.userStake ?? 0);

  const onChainWalletBalance =
    address && reads?.[2]?.status === 'success'
      ? Number(formatUnits((reads[2].result as bigint) ?? 0n, 18))
      : Number(mining.walletBalance ?? 0);

  const currentAllowance =
    address && reads?.[3]?.status === 'success'
      ? ((reads[3].result as bigint) ?? 0n)
      : 0n;

  const isStakeActive = Boolean(mining.stakeActive ?? onChainUserStake > 0);
  const isCanActivate = ecoinSaleEnabled && isStakeActive;

  // Escrita On-Chain para Aprovação e Compra de CS em eCoin
  const {
    writeContractAsync,
    data: gasTxHash,
    isPending: isGasWritePending,
  } = useWriteContract();

  const {
    isLoading: isGasConfirming,
    isSuccess: isGasConfirmed,
  } = useWaitForTransactionReceipt({
    hash: gasTxHash,
  });

  // Sincronização de Estado das Transações
  useEffect(() => {
    if (isGasWritePending || isGasConfirming || mining.stakePending) {
      txState.setState('confirming');
    }
  }, [isGasWritePending, isGasConfirming, mining.stakePending, txState]);

  useEffect(() => {
    if (isGasConfirmed || mining.stakeConfirmed) {
      txState.setState('success');
      refetch();
      const timer = setTimeout(() => txState.setState('idle'), 2000);
      return () => clearTimeout(timer);
    }
  }, [isGasConfirmed, mining.stakeConfirmed, refetch, txState]);

  // Percentuais de Staking em eCoin
  const setStakePercentage = (pct: number) => {
    const val = (onChainWalletBalance * pct) / 100;
    stakeInput.setValue(val > 0 ? val.toString() : '0');
  };

  const handleRetainStake = async () => {
    if (!stakeInput.isValid) {
      alert('Insira um valor válido de eCoin para retenção.');
      return;
    }
    try {
      txState.setState('wallet');
      await mining.stake(stakeInput.normalizedValue);
      txState.setState('submitted');
    } catch (err) {
      console.error('Erro na retenção de eCoin:', err);
      txState.setState('error');
    }
  };

  // Aquisição de CS exclusivamente em eCoin e Ativação do Bot
  const handleAcquireCSAndActivate = async () => {
    if (!isStakeActive) {
      alert('Retenção de Ações inativa. Realize a alocação de eCoin (PM) primeiro.');
      return;
    }
    if (!csInput.isValid) {
      alert('Insira um valor válido de CS em eCoin.');
      return;
    }

    try {
      txState.setState('wallet');
      const parsed = parseUnits(csInput.normalizedValue, 18);

      // Aprova o EcGasSaleECoin se a allowance atual for insuficiente
      if (currentAllowance < parsed) {
        await writeContractAsync({
          address: ECOIN_TOKEN_ADDRESS,
          abi: erc20Abi,
          functionName: 'approve',
          args: [ECOIN_GAS_SALE_ADDRESS, parsed],
          chainId: 56,
        });
      }

      // Compra o Selo de Capacidade (CS) em eCoin
      await writeContractAsync({
        address: ECOIN_GAS_SALE_ADDRESS,
        abi: ECOIN_GAS_SALE_ABI,
        functionName: 'buyECoin',
        args: [parsed],
        chainId: 56,
      });

      txState.setState('submitted');
      router.push('/eCoinShareHolder/ecnTradingDEXBot/runningBot');
    } catch (err) {
      console.error('Erro na aquisição do CS em eCoin / Ativação do Bot:', err);
      txState.setState('error');
    }
  };

  const csVal = Number(csInput.normalizedValue);
  const maxCapacity = (csVal * 1.3).toFixed(2);
  const profitCap = (csVal * 0.3).toFixed(2);

  return (
    <div className="min-h-screen bg-[#0B0E14] text-white pb-24 px-4 pt-4">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1 text-xs text-gray-400 mb-4 hover:text-white cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" /> Voltar
      </button>

      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37] block">
            eCoin Exclusive DEX Engine
          </span>
          <h1 className="text-lg font-bold text-[#D4AF37] uppercase tracking-wide">
            {market ? market.replace('-', ' / ').toUpperCase() : 'ECOIN'} Bot
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold border ${
              isStakeActive
                ? 'bg-[#D4AF37]/15 text-[#D4AF37] border-[#D4AF37]/30'
                : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
            }`}
          >
            {isStakeActive ? '● STAKE ECOIN ATIVO' : '○ REQUER STAKE'}
          </span>
        </div>
      </div>

      {/* SEÇÃO 1: ALOCAR MARGEM DE LUCROS (STAKING EXCLUSIVO DE ECOIN) */}
      <div className="bg-[#12181F] border border-[#D4AF37]/25 rounded-2xl p-4 mb-5 shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-bold text-white">1. Alocar Margem de Lucros (PM)</span>
            <button
              onClick={() => setShowPPPInfo(true)}
              className="text-[#D4AF37] hover:text-yellow-300 cursor-pointer"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center text-[11px] text-gray-400 mb-1">
          <span>eCoin Disponível em Carteira:</span>
          <span className="text-[#D4AF37] font-bold">
            {onChainWalletBalance.toLocaleString('en-US', { maximumFractionDigits: 4 })} eCoin
          </span>
        </div>

        <div className="relative mb-3">
          <input
            inputMode="decimal"
            type="text"
            value={stakeInput.value}
            onChange={(e) => stakeInput.onChange(e.target.value)}
            placeholder="0.00"
            className="w-full bg-[#0B0E14] border border-gray-700 rounded-xl px-3 py-2.5 text-sm font-bold text-[#D4AF37] focus:outline-none focus:border-[#D4AF37]"
          />
          <span className="absolute right-3 top-3 text-xs font-bold text-[#D4AF37]">eCoin</span>
        </div>

        <div className="flex justify-between gap-2 mb-4">
          {[25, 50, 75, 100].map((pct) => (
            <button
              key={pct}
              type="button"
              onClick={() => setStakePercentage(pct)}
              className="flex-1 py-1.5 bg-gray-800 text-xs text-gray-300 rounded-lg hover:bg-[#D4AF37]/20 hover:text-[#D4AF37] transition cursor-pointer"
            >
              {pct}%
            </button>
          ))}
        </div>

        <div className="bg-[#0B0E14] p-3 rounded-xl flex justify-between items-center text-xs mb-3 border border-white/5">
          <div>
            <span className="text-gray-400 block">Sua Retenção Ativa (eCoin Pool)</span>
            <span className="text-[#D4AF37] font-bold text-sm">
              {onChainUserStake.toLocaleString('en-US', { maximumFractionDigits: 4 })} eCoin
            </span>
          </div>
          <div className="text-right">
            <span className="text-gray-400 block">Status On-Chain</span>
            <span className={isStakeActive ? 'text-emerald-400 font-bold' : 'text-amber-500 font-bold'}>
              {isStakeActive ? 'Habilitado' : 'Ação Necessária'}
            </span>
          </div>
        </div>

        <button
          onClick={handleRetainStake}
          className="w-full py-2.5 bg-[#D4AF37]/15 hover:bg-[#D4AF37]/25 text-[#D4AF37] border border-[#D4AF37]/40 font-bold rounded-xl text-xs transition cursor-pointer"
        >
          Confirmar Retenção de eCoin (Stake)
        </button>
      </div>

      {/* SEÇÃO 2: BUY PROFIT CAPACITY (CS — EXCLUSIVO ECOIN) */}
      <div className="bg-[#12181F] border border-[#D4AF37]/25 rounded-2xl p-4 mb-6 shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-bold text-white">2. Buy Profit Capacity (CS)</span>
            <button
              onClick={() => setShowCSInfo(true)}
              className="text-[#D4AF37] hover:text-yellow-300 cursor-pointer"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>

          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37]">
            <Coins size={12} /> Exclusivo eCoin
          </span>
        </div>

        {!isStakeActive && (
          <div className="mb-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-2 text-amber-400 text-xs">
            <Lock size={16} className="shrink-0" />
            <span>Efetue o stake de eCoin na Seção 1 para habilitar a emissão do Selo (CS).</span>
          </div>
        )}

        <label className="text-xs text-gray-400 block mb-1">
          Valor do Commitment Seal (eCoin)
        </label>
        <div className="relative mb-3">
          <input
            inputMode="decimal"
            type="text"
            value={csInput.value}
            onChange={(e) => csInput.onChange(e.target.value)}
            disabled={!isCanActivate}
            placeholder="0.00"
            className="w-full bg-[#0B0E14] border border-gray-700 rounded-xl px-3 py-2.5 text-sm font-bold text-[#D4AF37] focus:outline-none focus:border-[#D4AF37] disabled:opacity-40"
          />
          <span className="absolute right-3 top-3 text-xs font-bold text-[#D4AF37]">eCoin</span>
        </div>

        <div className="text-xs text-gray-400 space-y-1 mb-4 bg-[#0B0E14] p-3 rounded-xl border border-white/5">
          <div className="flex justify-between">
            <span>Capacidade Máxima de Retorno (130%):</span>
            <span className="text-[#D4AF37] font-bold">{maxCapacity} eCoin</span>
          </div>
          <p className="text-[10px] text-gray-500 mt-1">
            {csVal} eCoin de CS libera até +{profitCap} eCoin de margem direta de lucro via bot.
          </p>
        </div>

        <TxButton
          state={txState.state}
          disabled={!isCanActivate}
          idleText={
            !isStakeActive
              ? 'Stake Prévio Necessário'
              : 'Comprar CS & Activar Bot com eCoin'
          }
          className="w-full py-3 bg-gradient-to-r from-[#D4AF37] to-amber-500 text-black font-extrabold rounded-xl hover:brightness-110 shadow-lg shadow-[#D4AF37]/20 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          onClick={handleAcquireCSAndActivate}
        />
      </div>

      <PPPInfoModal isOpen={showPPPInfo} onClose={() => setShowPPPInfo(false)} />
      <CSInfoModal isOpen={showCSInfo} onClose={() => setShowCSInfo(false)} />
    </div>
  );
}