'use client';

import React, { useState } from 'react';
import { X, ShieldAlert } from 'lucide-react';
import { RunningBotItem } from '../../types/ecnTrading';
import { useMiningStaking } from '@/hooks/useMiningStaking';

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
  const mining = useMiningStaking();
  const [amount, setAmount] = useState('');

  if (!isOpen || !bot) return null;

  const walletBal = Number(mining.walletBalance ?? 0);
  const staked = Number(mining.userStake || 0);

  const setPercentage = (percent: number) => {
    const value = (staked * percent) / 100;
    setAmount(value > 0 ? value.toString() : '0');
  };

  const handleRemoveMargin = async () => {
    if (!amount || Number(amount) <= 0) {
      alert('Por favor, insira uma quantia válida para remoção.');
      return;
    }
    try {
      await mining.unstake(amount);
      onClose();
    } catch (error) {
      console.error('Erro ao remover margem:', error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-[#0D1219] border border-red-500/30 rounded-3xl p-6 relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
        >
          <X size={20} />
        </button>

        <h3 className="text-base font-bold text-red-400 flex items-center gap-2 mb-1">
          <ShieldAlert size={20} /> Remover Margem ({bot.pair})
        </h3>
        <p className="text-xs text-gray-400 mb-4">
          Insira a quantidade de margem que deseja liberar de volta para a sua carteira.
        </p>

        {/* Kapanunotan iti Balanse ken Margem Retida */}
        <div className="bg-[#0B0E14] p-3 rounded-xl border border-gray-800 mb-4">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Saldo Disponível na Carteira:</span>
            <span className="text-yellow-400 font-bold">
              {walletBal.toLocaleString('pt-BR')} eCoin
            </span>
          </div>
          <div className="flex justify-between text-xs text-gray-400">
            <span>Margem Retida No Trading Bot Atual:</span>
            <span className="text-emerald-400 font-bold">
              {staked.toLocaleString('pt-BR')} eCoin
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-[10px] text-gray-400 uppercase font-bold mb-1 block">
              Quantidade para Liberação
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white font-mono font-bold focus:outline-none focus:border-red-500/50"
              />
              <button
                type="button"
                onClick={() => setPercentage(100)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold bg-red-500 text-white px-2.5 py-1 rounded hover:bg-red-600 transition"
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
                  className="text-xs py-2 rounded-lg bg-white/5 border border-white/10 hover:border-red-500/50 text-white transition font-mono"
                >
                  {p}%
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={handleRemoveMargin}
            className="w-full py-3.5 bg-red-500 hover:bg-red-600 text-white font-extrabold rounded-xl transition text-xs tracking-wider uppercase shadow-lg shadow-red-500/20 cursor-pointer"
          >
            CONFIRMAR REMOÇÃO DE MARGEM
          </button>
        </div>
      </div>
    </div>
  );
}