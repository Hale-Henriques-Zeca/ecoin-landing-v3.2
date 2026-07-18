'use client';

import React from 'react';
import { Copy, QrCode, ShieldCheck, Network } from 'lucide-react';
import ResponsiveShell from '@/components/eCoinCloudWallet/components/layout/ResponsiveShell';
import PageContainer from '@/components/eCoinCloudWallet/components/common/PageContainer';
import SectionHeader from '@/components/eCoinCloudWallet/components/common/SectionHeader';

export default function ReceivePage() {
  const walletAddress = "0x71C2398214291752420500eCoinCloudWallet71a9";

  return (
    <ResponsiveShell>
      <PageContainer>
        <SectionHeader title="Depositar Fundos" subtitle="Receba ativos digitais gerando seu endereço exclusivo" />
        
        <div className="max-w-md mx-auto w-full bg-white/[0.01] border border-white/5 rounded-2xl p-6 backdrop-blur-xl flex flex-col items-center">
          {/* Mock QR Code Frame */}
          <div className="w-44 h-44 bg-white p-3 rounded-xl border border-white/10 flex items-center justify-center shadow-2xl mb-6 relative">
            <QrCode className="text-black w-full h-full opacity-90" strokeWidth={1.5} />
            <div className="absolute bottom-[-10px] bg-neutral-900 border border-white/10 rounded px-2 py-0.5 font-mono text-[8px] text-[#D4AF37] uppercase font-bold tracking-widest">
              EVM Core Network
            </div>
          </div>

          {/* Seletor de rede fictício */}
          <div className="w-full bg-black/30 border border-white/5 rounded-xl p-3 mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Network size={14} className="text-[#D4AF37]" />
              <div className="leading-none">
                <span className="text-[10px] text-neutral-400 font-mono block uppercase">Rede Selecionada</span>
                <span className="text-xs font-bold text-white">eCoin Protocol Mainnet</span>
              </div>
            </div>
            <span className="text-[8px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-[#00FF9C]/10 text-[#00FF9C]">Ativa</span>
          </div>

          {/* Endereço de Cópia */}
          <div className="w-full">
            <label className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-wider block mb-1">Seu Endereço da Carteira</label>
            <div className="w-full bg-black/50 border border-white/10 rounded-xl p-3 flex items-center justify-between gap-2">
              <span className="font-mono text-[11px] text-neutral-300 break-all select-all tracking-tight pr-2">
                {walletAddress}
              </span>
              <button 
                onClick={() => navigator.clipboard.writeText(walletAddress)}
                className="p-2 bg-white/5 hover:bg-white/10 text-[#D4AF37] rounded-lg transition-colors shrink-0"
                title="Copiar endereço"
              >
                <Copy size={14} />
              </button>
            </div>
          </div>

          {/* Alerta de Proteção */}
          <div className="mt-6 flex items-start gap-2.5 text-neutral-500 text-[10px] font-mono leading-relaxed border-t border-white/5 pt-4 w-full">
            <ShieldCheck size={16} className="text-[#00FF9C] shrink-0 mt-0.5" />
            <span>Envie apenas ativos suportados pela rede EVM da rede BNB Chain (BEP-20) Core para este endereço. O depósito de outras moedas pode resultar em perda permanente.</span>
          </div>
        </div>
      </PageContainer>
    </ResponsiveShell>
  );
}