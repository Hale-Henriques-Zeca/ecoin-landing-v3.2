'use client';

import { X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function CSInfoModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#12181F] border border-emerald-500/30 rounded-2xl p-5 max-w-sm w-full text-white shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>
        <h3 className="text-lg font-bold text-emerald-400 mb-2">Profit Capacity / Commitment Seal (CS)</h3>
        <p className="text-sm text-gray-300 leading-relaxed mb-3">
          O **Commitment Seal (CS)** representa a capacidade máxima de lucro que o seu robô pode gerar neste ciclo de mineração/arbitragem.
        </p>
        <ul className="text-xs text-gray-300 list-disc list-inside space-y-1.5 mb-4">
          <li><strong>Regra de Teto:</strong> 100 USDT = 130 USDT de Capacidade Máxima de Lucro (130%).</li>
          <li><strong>Consumo Automático:</strong> Conforme o robô gera lucros reais, o selo é consumido.</li>
          <li><strong>Encerramento do Bot:</strong> Quando a capacidade esgota (100%), o bot é finalizado automaticamente e movido para a aba de <em>Stopped Bots</em>.</li>
        </ul>
        <p className="text-xs text-emerald-400/90 font-medium">
          Dica: Você pode utilizar o botão <strong>Add Capacity</strong> para recarregar a margem antes que o robô seja pausado.
        </p>
        <button
          onClick={onClose}
          className="mt-5 w-full py-2.5 bg-emerald-500 text-black font-semibold rounded-xl hover:bg-emerald-400 transition"
        >
          Compreendido
        </button>
      </div>
    </div>
  );
}