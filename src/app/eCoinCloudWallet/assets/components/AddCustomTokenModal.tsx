'use client';

import React, { useState } from 'react';
import { X, Search, CheckCircle2 } from 'lucide-react';

interface AddCustomTokenModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToken: (token: { symbol: string; name: string; address: string; balance: string }) => void;
}

export default function AddCustomTokenModal({ isOpen, onClose, onAddToken }: AddCustomTokenModalProps) {
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [detectedToken, setDetectedToken] = useState<{ symbol: string; name: string; decimals: number } | null>(null);

  if (!isOpen) return null;

  const handleVerify = () => {
    if (!address.startsWith('0x') || address.length !== 42) return;
    setLoading(true);
    setTimeout(() => {
      setDetectedToken({
        symbol: 'ABC',
        name: 'ABC Protocol Token',
        decimals: 18,
      });
      setLoading(false);
    }, 1000);
  };

  const handleConfirm = () => {
    if (detectedToken) {
      onAddToken({
        symbol: detectedToken.symbol,
        name: detectedToken.name,
        address,
        balance: '5,000.00',
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 font-mono">
      <div className="bg-neutral-900 border border-white/10 rounded-2xl max-w-md w-full p-6 space-y-5">
        <div className="flex justify-between items-center border-b border-white/10 pb-3">
          <h3 className="text-xs font-black uppercase text-white">Adicionar Custom Token BEP-20</h3>
          <button onClick={onClose} className="text-neutral-500 hover:text-white">
            <X size={16} />
          </button>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] text-neutral-400 uppercase font-bold block">Endereço do Contrato</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="0x1234..."
              className="flex-1 bg-black border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
            />
            <button
              onClick={handleVerify}
              className="h-9 px-3 bg-[#D4AF37] text-black font-bold text-xs rounded-xl hover:bg-[#c29f2e]"
            >
              <Search size={14} />
            </button>
          </div>
        </div>

        {loading && <div className="text-xs text-neutral-400 text-center py-4">Validando contrato BEP-20...</div>}

        {detectedToken && (
          <div className="bg-black/40 border border-[#00FF9C]/30 p-3.5 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-[#00FF9C] text-xs font-bold">
              <CheckCircle2 size={14} /> Contrato Validado
            </div>
            <div className="text-xs text-neutral-300">
              <div>Símbolo: <span className="font-bold text-white">{detectedToken.symbol}</span></div>
              <div>Nome: <span className="font-bold text-white">{detectedToken.name}</span></div>
            </div>
          </div>
        )}

        <div className="flex justify-end gap-2 pt-2">
          <button onClick={onClose} className="px-4 py-2 bg-neutral-800 text-neutral-300 rounded-xl text-xs font-bold">
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            disabled={!detectedToken}
            className="px-4 py-2 bg-[#00FF9C] text-black font-bold rounded-xl text-xs uppercase disabled:opacity-40"
          >
            Registrar Token
          </button>
        </div>
      </div>
    </div>
  );
}