'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { parseUnits } from 'viem';
import { useAccount } from 'wagmi';
import { useEcGas } from '@/hooks/useEcGas';
import { useTransactionState } from '@/hooks/useTransactionState';
import TxButton from '@/components/TxButton';

// Hook auxiliar de sanitização de inputs numéricos
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
  isOpen: boolean;
  onClose: () => void;
  pairName: string;
}

export default function AddCapacityModal({ isOpen, onClose, pairName }: AddCapacityModalProps) {
  const { address } = useAccount();
  const gas = useEcGas(address);
  const txState = useTransactionState();

  const [csToken, setCsToken] = useState<'USDT' | 'EUSD'>('USDT');
  const csInput = useSafeNumberInput('100');

  if (!isOpen) return null;

  const numVal = Number(csInput.normalizedValue);
  const maxReturn = (numVal * 1.3).toFixed(2);
  const profitMargin = (numVal * 0.3).toFixed(2);

  const handleAcquireCS = async () => {
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
      onClose();
    } catch (err) {
      console.error('Erro ao expandir capacidade CS:', err);
      txState.setState('error');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-[#12181F] border border-emerald-500/30 rounded-2xl p-5 w-full max-w-md relative shadow-2xl">
        <button 
          onClick={onClose} 
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          <X size={20} />
        </button>

        <h2 className="text-base font-bold text-emerald-400 mb-1 flex items-center gap-2">
          Expansão de Profit Capacity (CS) — {pairName}
        </h2>
        <p className="text-xs text-gray-400 mb-4">
          Adquira mais teto de lucro para que seu robô continue executando ordens no mercado.
        </p>

        {/* Seleção do Token */}
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

        <label className="text-xs text-gray-400 block mb-1">Valor do Selo CS ({csToken})</label>
        <input
          type="text"
          inputMode="decimal"
          value={csInput.value}
          onChange={(e) => csInput.onChange(e.target.value)}
          placeholder="0.00"
          className="w-full bg-[#0B0E14] border border-gray-700 rounded-xl px-3 py-2.5 text-sm font-bold text-emerald-400 focus:outline-none focus:border-emerald-500 mb-3"
        />

        <div className="text-xs text-gray-400 space-y-1 mb-5 bg-[#0B0E14] p-3 rounded-xl border border-white/5">
          <div className="flex justify-between">
            <span>Retorno Total Liberado (130%):</span>
            <span className="text-emerald-400 font-bold">{maxReturn} {csToken}</span>
          </div>
          <div className="flex justify-between">
            <span>Margem Direta de Lucro (+30%):</span>
            <span className="text-emerald-400 font-bold">+{profitMargin} {csToken}</span>
          </div>
        </div>

        <TxButton
          state={txState.state}
          idleText={`Comprar CS & Expandir com ${csToken}`}
          onClick={handleAcquireCS}
          className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-extrabold rounded-xl hover:brightness-110 shadow-lg shadow-emerald-500/20 cursor-pointer disabled:opacity-50"
        />
      </div>
    </div>
  );
}