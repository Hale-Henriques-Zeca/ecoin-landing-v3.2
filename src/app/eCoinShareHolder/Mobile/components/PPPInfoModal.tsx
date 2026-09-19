'use client';

import { X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function PPPInfoModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#12181F] border border-yellow-500/30 rounded-2xl p-5 max-w-sm w-full text-white shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>
        <h3 className="text-lg font-bold text-yellow-400 mb-2">PPP (Profit Participation Position)</h3>
        <p className="text-sm text-gray-300 leading-relaxed mb-4">
          A **Posição de Participação nos Lucros (PPP)** define a quantidade de **E-Coin em Staking** que você aloca neste Bot de Trading.
        </p>
        <p className="text-xs text-gray-400 leading-relaxed">
          Quanto maior for a quantia alocada em relação ao total do pool, maior será a sua porcentagem de participação (**Pool Share %**) no rateio diário dos lucros do ecossistema E-Coin.
        </p>
        <button
          onClick={onClose}
          className="mt-6 w-full py-2.5 bg-yellow-500 text-black font-semibold rounded-xl hover:bg-yellow-400 transition"
        >
          Entendido
        </button>
      </div>
    </div>
  );
}