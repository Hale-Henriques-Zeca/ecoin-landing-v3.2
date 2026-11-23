'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { RunningBotItem } from '../../../types/ecnTrading';
import TradingMetrics from './TradingMetrics';
import BotHistory from './BotHistory';

interface BotDetailsModalProps {
  bot?: RunningBotItem | null;
  pairName?: string;
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'metrics' | 'history';
  initialTab?: 'metrics' | 'history';
}

export default function BotDetailsModal({
  bot,
  pairName,
  isOpen,
  onClose,
  defaultTab,
  initialTab = 'metrics',
}: BotDetailsModalProps) {
  const activeInitialTab = defaultTab ?? initialTab;
  const [tab, setTab] = useState<'metrics' | 'history'>(activeInitialTab);

  useEffect(() => {
    setTab(activeInitialTab);
  }, [activeInitialTab, isOpen]);

  if (!isOpen) return null;

  const displayPair = bot?.pair ?? pairName ?? 'E-Coin Bot';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-[#12181F] border border-[#D4AF37]/25 rounded-2xl p-5 w-full max-w-2xl max-h-[90vh] overflow-y-auto relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white cursor-pointer"
        >
          <X size={20} />
        </button>

        <h2 className="text-base font-bold text-[#D4AF37] mb-4">
          {displayPair} — Detalhes On-Chain (eCoin)
        </h2>

        {/* Abas */}
        <div className="flex border-b border-gray-800 pb-2 mb-4 gap-4">
          <button
            onClick={() => setTab('metrics')}
            className={`text-xs font-bold pb-1 transition cursor-pointer ${
              tab === 'metrics'
                ? 'text-[#D4AF37] border-b-2 border-[#D4AF37]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Métricas de Operação
          </button>
          <button
            onClick={() => setTab('history')}
            className={`text-xs font-bold pb-1 transition cursor-pointer ${
              tab === 'history'
                ? 'text-[#D4AF37] border-b-2 border-[#D4AF37]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Histórico Recente
          </button>
        </div>

        {tab === 'metrics' ? <TradingMetrics pair={displayPair} /> : <BotHistory />}
      </div>
    </div>
  );
}