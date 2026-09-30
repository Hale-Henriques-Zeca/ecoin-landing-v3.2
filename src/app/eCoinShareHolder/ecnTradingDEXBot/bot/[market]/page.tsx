'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { HelpCircle, ArrowLeft, ShieldCheck, Lock } from 'lucide-react';
import { parseUnits } from 'viem';
import { useAccount, useReadContract } from 'wagmi';

import { CONTRACTS } from '@/lib/contracts/contracts';
import { ecGasSaleAbi } from '@/lib/abis/ecGasSaleAbi';
import { useEcGas } from '@/hooks/useEcGas';
import { useMiningStaking } from '@/hooks/useMiningStaking';
import { useTransactionState } from '@/hooks/useTransactionState';
import TxButton from '@/components/TxButton';
import PPPInfoModal from '../../components/PPPInfoModal';
import CSInfoModal from '../../components/CSInfoModal';

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

export default function MarketConfigPage({ params }: { params: { market: string } }) {
  const router = useRouter();
  const { address } = useAccount();

  // Hooks do Protocolo
  const gas = useEcGas(address);
  const mining = useMiningStaking();
  const txState = useTransactionState();

  // Modais de Ajuda
  const [showPPPInfo, setShowPPPInfo] = useState(false);
  const [showCSInfo, setShowCSInfo] = useState(false);

  // Seleção de Token para CS
  const [csToken, setCsToken] = useState<'USDT' | 'EUSD'>('USDT');

  // Inputs Controlados
  const stakeInput = useSafeNumberInput('10000');
  const csInput = useSafeNumberInput('100');

  // Leitura de Status On-Chain do Contrato ecGasSale
  const { data: usdtEnabled } = useReadContract({
    address: CONTRACTS.ECGAS_SALE,
    abi: ecGasSaleAbi,
    functionName: 'usdtEnabled',
  });

  const { data: eusdEnabled } = useReadContract({
    address: CONTRACTS.ECGAS_SALE,
    abi: ecGasSaleAbi,
    functionName: 'eusdEnabled',
  });

  const isStakeActive = Boolean(mining.stakeActive ?? (Number(mining.userStake) > 0));
  const isSystemActive = csToken === 'USDT' ? !!usdtEnabled : !!eusdEnabled;
  const isCanActivate = isSystemActive && isStakeActive;

  // Sincronização de Transações
  useEffect(() => {
    if (gas.gasPending || mining.stakePending) {
      txState.setState('confirming');
    }
  }, [gas.gasPending, mining.stakePending]);

  useEffect(() => {
    if (gas.gasConfirmed || mining.stakeConfirmed) {
      txState.setState('success');
      const timer = setTimeout(() => txState.setState('idle'), 2000);
      return () => clearTimeout(timer);
    }
  }, [gas.gasConfirmed, mining.stakeConfirmed]);

  // Cálculos de Staking (PPP)
  const walletBal = Number(mining.walletBalance ?? 0);
  const setStakePercentage = (pct: number) => {
    const val = (walletBal * pct) / 100;
    stakeInput.setValue(val > 0 ? val.toString() : '0');
  };

  const handleRetainStake = async () => {
    if (!stakeInput.isValid) {
      alert('Insira um valor de retenção válido.');
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

  // Execução de Aquisição de CS e Ativação do Bot
  const handleAcquireCSAndActivate = async () => {
    if (!isStakeActive) {
      alert('Retenção de Ações inativa. Realize a alocação de eCoin (PPP) primeiro.');
      return;
    }
    if (!csInput.isValid) {
      alert('Insira um valor válido de CS.');
      return;
    }

    try {
      txState.setState('wallet');
      const parsed = parseUnits(csInput.normalizedValue, 18);

      if (csToken === 'USDT') {
        await gas.buyGasUSDT(parsed);
      } else {
        await gas.buyGasEUSD(parsed);
      }

      txState.setState('submitted');
      // Redireciona para os bots em execução após submissão/confirmação
      router.push('/eCoinShareHolder/ecnTradingDEXBot/runningBot');
    } catch (err) {
      console.error('Erro na aquisição do CS / Ativação do Bot:', err);
      txState.setState('error');
    }
  };

  const csVal = Number(csInput.normalizedValue);
  const maxCapacity = (csVal * 1.3).toFixed(2);
  const profitCap = (csVal * 0.3).toFixed(2);

  return (
    <div className="min-h-screen bg-[#0B0E14] text-white pb-24 px-4 pt-4">
      <button onClick={() => router.back()} className="flex items-center gap-1 text-xs text-gray-400 mb-4 hover:text-white">
        <ArrowLeft className="w-4 h-4" /> Voltar
      </button>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-lg font-bold text-yellow-400 uppercase tracking-wide">
          {params.market ? params.market.replace('-', ' / ').toUpperCase() : 'E-Coin / USDT'} Bot
        </h1>
        <div className="flex items-center gap-2">
          <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold border ${
            isStakeActive ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
          }`}>
            {isStakeActive ? '● STAKE ATIVO' : '○ REQUER STAKE'}
          </span>
        </div>
      </div>

      {/* SEÇÃO 1: ALOCAR PPP (STAKING DE ECOIN) */}
      <div className="bg-[#12181F] border border-yellow-500/20 rounded-2xl p-4 mb-5 shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-bold text-white">1. Alocar Margem de Lucros (PM)</span>
            <button onClick={() => setShowPPPInfo(true)} className="text-yellow-400 hover:text-yellow-300">
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center text-[11px] text-gray-400 mb-1">
          <span>eCoin Disponível em Carteira:</span>
          <span className="text-yellow-400 font-bold">{Number(mining.walletBalance || 0).toLocaleString()} eCoin</span>
        </div>

        <div className="relative mb-3">
          <input
            inputMode="decimal"
            type="text"
            value={stakeInput.value}
            onChange={(e) => stakeInput.onChange(e.target.value)}
            placeholder="0.00"
            className="w-full bg-[#0B0E14] border border-gray-700 rounded-xl px-3 py-2.5 text-sm font-bold text-yellow-400 focus:outline-none focus:border-yellow-500"
          />
          <span className="absolute right-3 top-3 text-xs font-bold text-gray-400">eCoin</span>
        </div>

        <div className="flex justify-between gap-2 mb-4">
          {[25, 50, 75, 100].map((pct) => (
            <button
              key={pct}
              type="button"
              onClick={() => setStakePercentage(pct)}
              className="flex-1 py-1.5 bg-gray-800 text-xs text-gray-300 rounded-lg hover:bg-yellow-500/20 hover:text-yellow-400 transition"
            >
              {pct}%
            </button>
          ))}
        </div>

        <div className="bg-[#0B0E14] p-3 rounded-xl flex justify-between items-center text-xs mb-3">
          <div>
            <span className="text-gray-400 block">Sua Retenção Ativa</span>
            <span className="text-emerald-400 font-bold text-sm">
              {Number(mining.userStake || 0).toLocaleString()} eCoin
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
          className="w-full py-2.5 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 font-bold rounded-xl text-xs transition"
        >
          Confirmar Retenção de eCoin (Stake)
        </button>
      </div>

      {/* SEÇÃO 2: BUY PROFIT CAPACITY (CS) */}
      <div className="bg-[#12181F] border border-emerald-500/20 rounded-2xl p-4 mb-6 shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-bold text-white">2. Buy Profit Capacity (CS)</span>
            <button onClick={() => setShowCSInfo(true)} className="text-emerald-400 hover:text-emerald-300">
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>
        </div>

        {!isStakeActive && (
          <div className="mb-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-2 text-amber-400 text-xs">
            <Lock size={16} className="shrink-0" />
            <span>Efetue o stake de eCoin na Seção 1 para habilitar a emissão do Selo (CS).</span>
          </div>
        )}

        {/* MUDANÇA USDT / EUSD */}
        <div className="flex gap-2 mb-3">
          <button
            type="button"
            onClick={() => setCsToken('USDT')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition ${
              csToken === 'USDT'
                ? 'bg-emerald-500/20 border border-emerald-500 text-emerald-400'
                : 'bg-gray-800 border border-gray-700 text-gray-400 hover:text-white'
            }`}
          >
            USDT
          </button>
          <button
            type="button"
            onClick={() => setCsToken('EUSD')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition ${
              csToken === 'EUSD'
                ? 'bg-emerald-500/20 border border-emerald-500 text-emerald-400'
                : 'bg-gray-800 border border-gray-700 text-gray-400 hover:text-white'
            }`}
          >
            eDollar (EUSD)
          </button>
        </div>

        <label className="text-xs text-gray-400 block mb-1">Valor do Commitment Seal ({csToken})</label>
        <input
          inputMode="decimal"
          type="text"
          value={csInput.value}
          onChange={(e) => csInput.onChange(e.target.value)}
          disabled={!isCanActivate}
          placeholder="0.00"
          className="w-full bg-[#0B0E14] border border-gray-700 rounded-xl px-3 py-2.5 text-sm font-bold text-emerald-400 focus:outline-none focus:border-emerald-500 mb-3 disabled:opacity-40"
        />

        <div className="text-xs text-gray-400 space-y-1 mb-4 bg-[#0B0E14] p-3 rounded-xl border border-white/5">
          <div className="flex justify-between">
            <span>Capacidade Máxima de Retorno (130%):</span>
            <span className="text-emerald-400 font-bold">{maxCapacity} {csToken}</span>
          </div>
          <p className="text-[10px] text-gray-500 mt-1">
            {csVal} {csToken} de CS libera até +{profitCap} {csToken} de margem direta de lucro via bot.
          </p>
        </div>

        <TxButton
          state={txState.state}
          disabled={!isCanActivate}
          idleText={!isStakeActive ? 'Stake Prévio Necessário' : `Comprar CS & Activar Bot com ${csToken}`}
          className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-extrabold rounded-xl hover:brightness-110 shadow-lg shadow-emerald-500/20 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          onClick={handleAcquireCSAndActivate}
        />
      </div>

      <PPPInfoModal isOpen={showPPPInfo} onClose={() => setShowPPPInfo(false)} />
      <CSInfoModal isOpen={showCSInfo} onClose={() => setShowCSInfo(false)} />
    </div>
  );
}