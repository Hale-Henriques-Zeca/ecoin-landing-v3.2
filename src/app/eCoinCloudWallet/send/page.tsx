'use client';

import React from 'react';
import { Send, AlertCircle, Fuel } from 'lucide-react';
import ResponsiveShell from '@/components/eCoinCloudWallet/components/layout/ResponsiveShell';
import PageContainer from '@/components/eCoinCloudWallet/components/common/PageContainer';
import SectionHeader from '@/components/eCoinCloudWallet/components/common/SectionHeader';

export default function SendPage() {
  return (
    <ResponsiveShell>
      <PageContainer>
        <SectionHeader title="Enviar Cripto" subtitle="Transfira fundos de forma segura para qualquer endereço compatível" />
        
        <div className="max-w-md mx-auto w-full bg-white/[0.01] border border-white/5 rounded-2xl p-5 backdrop-blur-xl flex flex-col gap-4">
          
          {/* Input Endereço Destino */}
          <div>
            <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-wider block mb-1">Endereço do Destinatário</label>
            <input 
              type="text" 
              placeholder="0x... ou ecoin ID" 
              className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs font-mono text-white placeholder-neutral-700 focus:outline-none focus:border-[#D4AF37]/50"
            />
          </div>

          {/* Input Ativo e Montante */}
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-wider block">Quantia a Enviar</label>
              <span className="text-[10px] font-mono text-neutral-400 cursor-pointer hover:text-[#D4AF37]">Máx: 752,420.50</span>
            </div>
            <div className="flex gap-2">
              <input 
                type="number" 
                placeholder="0.00" 
                className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-sm font-mono text-white placeholder-neutral-700 focus:outline-none focus:border-[#D4AF37]/50"
              />
              <select className="bg-neutral-900 border border-white/10 rounded-xl text-xs font-mono text-white px-3 focus:outline-none shrink-0">
                <option>ECOIN</option>
                <option>EUSD</option>
                <option>USDT</option>
                <option>BNB</option>
              </select>
            </div>
          </div>

          {/* Gas Estimate Box */}
          <div className="bg-white/[0.01] border border-white/[0.03] rounded-xl p-3 flex justify-between items-center text-[10px] font-mono">
            <div className="flex items-center gap-1.5 text-neutral-500">
              <Fuel size={12} className="text-[#D4AF37]" />
              <span>Taxa de Rede Estimada</span>
            </div>
            <span className="text-[#00FF9C] font-bold">Sponsorizado pelo Sistema (Grátis)</span>
          </div>

          {/* Botão Confirmação */}
          <button className="w-full h-11 bg-gradient-to-r from-red-500/80 to-red-600 hover:brightness-110 active:scale-[0.99] text-white font-mono font-black text-xs tracking-widest uppercase rounded-xl transition-all mt-2 flex items-center justify-center gap-2">
            <Send size={12} /> Confirmar e Transmitir
          </button>
        </div>
      </PageContainer>
    </ResponsiveShell>
  );
}