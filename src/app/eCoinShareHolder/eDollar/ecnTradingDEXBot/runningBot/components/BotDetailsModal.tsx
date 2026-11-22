'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import TradingMetrics from './TradingMetrics';
import BotHistory from './BotHistory';

interface BotDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  pairName: string;
  initialTab?: 'metrics' | 'history';
}

export default function BotDetailsModal({ isOpen, onClose, pairName, initialTab = 'metrics' }: BotDetailsModalProps) {
  const [tab, setTab] = useState<'metrics' | 'history'>(initialTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-[#12181F] border border-gray-800 rounded-2xl p-5 w-full max-w-lg relative shadow-2xl">
        <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-white">
          <X size={20} />
        </button>

        <h2 className="text-base font-bold text-yellow-400 mb-4">
          {pairName} — Detalhes On-Chain
        </h2>

        {/* Abas */}
        <div className="flex border-b border-gray-800 pb-2 mb-4 gap-4">
          <button
            onClick={() => setTab('metrics')}
            className={`text-xs font-bold pb-1 transition ${
              tab === 'metrics' ? 'text-yellow-400 border-b-2 border-yellow-400' : 'text-gray-400 hover:text-white'
            }`}
          >
            Métricas de Operação
          </button>
          <button
            onClick={() => setTab('history')}
            className={`text-xs font-bold pb-1 transition ${
              tab === 'history' ? 'text-yellow-400 border-b-2 border-yellow-400' : 'text-gray-400 hover:text-white'
            }`}
          >
            Histórico Recente
          </button>
        </div>

        {tab === 'metrics' ? <TradingMetrics pair={pairName} /> : <BotHistory />}
      </div>
    </div>
  );
}