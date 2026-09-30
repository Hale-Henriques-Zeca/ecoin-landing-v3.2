'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { useMiningStaking } from '@/hooks/useMiningStaking';
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

interface AddMarginModalProps {
  isOpen: boolean;
  onClose: () => void;
  pairName: string;
}

export default function AddMarginModal({ isOpen, onClose, pairName }: AddMarginModalProps) {
  const mining = useMiningStaking();
  const txState = useTransactionState();
  const marginInput = useSafeNumberInput('');

  if (!isOpen) return null;

  const walletBal = Number(mining.walletBalance ?? 0);

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
      onClose();
    } catch (err) {
      console.error('Erro ao adicionar margem:', err);
      txState.setState('error');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-[#12181F] border border-yellow-500/30 rounded-2xl p-5 w-full max-w-md relative shadow-2xl">
        <button 
          onClick={onClose} 
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          <X size={20} />
        </button>

        <h2 className="text-base font-bold text-yellow-400 mb-1 flex items-center gap-2">
          Adicionar Margem (PM) — {pairName}
        </h2>
        <p className="text-xs text-gray-400 mb-4">
          Aumente sua retenção de eCoin para expandir a participação de mercado no pool de liquidez do robô.
        </p>

        <div className="bg-[#0B0E14] p-3 rounded-xl border border-gray-800 mb-4">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Saldo Disponível na Carteira:</span>
            <span className="text-yellow-400 font-bold">{walletBal.toLocaleString()} eCoin</span>
          </div>
          <div className="flex justify-between text-xs text-gray-400">
            <span>Margem Retida Atual:</span>
            <span className="text-emerald-400 font-bold">{Number(mining.userStake || 0).toLocaleString()} eCoin</span>
          </div>
        </div>

        <div className="relative mb-3">
          <input
            type="text"
            inputMode="decimal"
            placeholder="0.00"
            value={marginInput.value}
            onChange={(e) => marginInput.onChange(e.target.value)}
            className="w-full bg-[#0B0E14] border border-gray-700 rounded-xl px-3 py-2.5 text-sm font-bold text-yellow-400 focus:outline-none focus:border-yellow-500"
          />
          <span className="absolute right-3 top-3 text-xs font-bold text-gray-400">eCoin</span>
        </div>

        {/* Porcentagens rápidas */}
        <div className="flex justify-between gap-2 mb-5">
          {[25, 50, 75, 100].map((pct) => (
            <button
              key={pct}
              type="button"
              onClick={() => handleSetPercentage(pct)}
              className="flex-1 py-1.5 bg-gray-800 text-xs text-gray-300 rounded-lg hover:bg-yellow-500/20 hover:text-yellow-400 transition"
            >
              {pct}%
            </button>
          ))}
        </div>

        <TxButton
          state={txState.state}
          idleText="Confirmar Adição de Margem"
          onClick={handleConfirmMargin}
          className="w-full py-3 bg-gradient-to-r from-yellow-500 to-amber-600 text-black font-extrabold rounded-xl hover:brightness-110 shadow-lg shadow-yellow-500/20 cursor-pointer disabled:opacity-50"
        />
      </div>
    </div>
  );
}