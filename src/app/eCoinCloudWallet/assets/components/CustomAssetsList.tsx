'use client';

import React from 'react';
import { Coins, Send, AlertTriangle } from 'lucide-react';

interface CustomToken {
  symbol: string;
  name: string;
  address: string;
  balance: string;
}

interface CustomAssetsListProps {
  tokens: CustomToken[];
  onOpenTransfer: (token: CustomToken) => void;
  onOpenAddModal: () => void;
}

export default function CustomAssetsList({ tokens, onOpenTransfer, onOpenAddModal }: CustomAssetsListProps) {
  return (
    <div className="bg-neutral-900/50 border border-white/10 rounded-2xl p-5 font-mono space-y-4">
      <div className="flex justify-between items-center border-b border-white/5 pb-3">
        <div>
          <h3 className="text-xs font-black uppercase text-white tracking-wider flex items-center gap-2">
            <Coins size={16} className="text-[#D4AF37]" /> Tokens Customizados BEP-20
          </h3>
          <p className="text-[10px] text-neutral-400 mt-0.5">
            Taxa de Serviço: <span className="text-[#D4AF37]">0.000015 BNB</span> por operação
          </p>
        </div>
        <button
          onClick={onOpenAddModal}
          className="h-8 px-3 bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 hover:bg-[#D4AF37]/20 rounded-xl text-[10px] font-bold uppercase transition-all"
        >
          + Adicionar Token
        </button>
      </div>

      {tokens.length === 0 ? (
        <div className="text-center py-8 text-neutral-500 text-xs border border-dashed border-white/10 rounded-xl">
          Nenhum token customizado adicionado ainda.
        </div>
      ) : (
        <div className="flex flex-col gap-2.5">
          {tokens.map((token) => (
            <div key={token.address} className="bg-black/40 border border-white/5 p-3.5 rounded-xl flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">{token.symbol}</span>
                  <span className="text-[9px] text-neutral-500 font-mono">({token.address.slice(0, 6)}...{token.address.slice(-4)})</span>
                </div>
                <span className="text-[10px] text-neutral-400">{token.name}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-white">{token.balance} {token.symbol}</span>
                <button
                  onClick={() => onOpenTransfer(token)}
                  className="h-7 px-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg text-[10px] font-bold uppercase flex items-center gap-1 transition-all"
                >
                  <Send size={11} /> Enviar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}