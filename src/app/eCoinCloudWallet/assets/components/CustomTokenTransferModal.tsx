'use client';

import React, { useState } from 'react';
import { X, Send, Fuel } from 'lucide-react';

interface CustomTokenTransferModalProps {
  token: { symbol: string; name: string; address: string; balance: string } | null;
  onClose: () => void;
}

export default function CustomTokenTransferModal({ token, onClose }: CustomTokenTransferModalProps) {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');

  if (!token) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 font-mono">
      <div className="bg-neutral-900 border border-white/10 rounded-2xl max-w-md w-full p-6 space-y-5">
        <div className="flex justify-between items-center border-b border-white/10 pb-3">
          <h3 className="text-xs font-black uppercase text-white">Enviar {token.symbol} (Custom Asset)</h3>
          <button onClick={onClose} className="text-neutral-500 hover:text-white">
            <X size={16} />
          </button>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <label className="text-[10px] text-neutral-400 uppercase font-bold block mb-1">Destinatário</label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="0x..."
              className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#00FF9C]"
            />
          </div>

          <div>
            <label className="text-[10px] text-neutral-400 uppercase font-bold block mb-1">Quantidade</label>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#00FF9C]"
            />
          </div>

          {/* Discriminação Realista de Taxas */}
          <div className="bg-neutral-950 p-3 rounded-xl border border-white/5 space-y-2 text-[10px]">
            <div className="flex justify-between text-neutral-400">
              <span>Taxa de Serviço Custom Token:</span>
              <span className="text-[#D4AF37] font-bold">0.000015 BNB</span>
            </div>

            <div className="flex justify-between text-neutral-400">
              <span>Taxa de Rede Blockchain (Gas):</span>
              <span className="text-orange-400 font-bold">~0.000005 BNB (Debitado da Carteira)</span>
            </div>

            <div className="flex justify-between border-t border-white/5 pt-1.5 text-neutral-300">
              <span>Reserva Mínima BNB em Carteira:</span>
              <span className="font-bold text-white">0.00015 BNB</span>
            </div>

            {/* Alerta explicativo */}
            <div className="bg-orange-500/10 border border-orange-500/20 p-2.5 rounded-lg flex items-start gap-2 text-[9px] text-orange-300 leading-normal mt-1">
              <Fuel size={13} className="shrink-0 mt-0.5" />
              <span>
                <strong>Nota de Patrocínio:</strong> O patrocínio de gas via <strong>GasPool</strong> aplica-se exclusivamente aos 4 Ativos Oficiais. Tokens customizados consomem o saldo nativo de BNB existente na carteira.
              </span>
            </div>
          </div>
        </div>

        <button className="w-full h-10 bg-[#00FF9C] hover:bg-[#00e089] text-black font-black uppercase rounded-xl flex items-center justify-center gap-2 text-xs transition-all">
          <Send size={14} /> Confirmar Transferência
        </button>
      </div>
    </div>
  );
}