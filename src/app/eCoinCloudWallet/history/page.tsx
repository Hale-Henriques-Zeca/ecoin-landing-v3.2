'use client';

import React from 'react';
import { Filter, Calendar, Download } from 'lucide-react';
import ResponsiveShell from '@/components/eCoinCloudWallet/components/layout/ResponsiveShell';
import PageContainer from '@/components/eCoinCloudWallet/components/common/PageContainer';
import SectionHeader from '@/components/eCoinCloudWallet/components/common/SectionHeader';

export default function HistoryPage() {
  const transactions = [
    { id: '1', type: 'Mint Recompensa', hash: '0x4f...91a', date: '18 Jul 2026 - 01:10', amount: '+45.50 ECOIN', status: 'Concluído', color: 'text-[#00FF9C]' },
    { id: '2', type: 'Envio de Ativo', hash: '0x9a...22c', date: '17 Jul 2026 - 19:42', amount: '-120.00 EUSD', status: 'Concluído', color: 'text-red-400' },
    { id: '3', type: 'Convert Executado', hash: '0x21...77e', date: '16 Jul 2026 - 14:22', amount: '+1,500.00 ECOIN', status: 'Sponsorizado', color: 'text-[#00FF9C]' },
    { id: '4', type: 'Depósito Externo', hash: '0x77...315', date: '14 Jul 2026 - 08:05', amount: '+350.00 USDT', status: 'Concluído', color: 'text-[#00FF9C]' },
    { id: '5', type: 'Taxa Cloud Sys', hash: '0x88...402', date: '12 Jul 2026 - 22:15', amount: '-0.50 EUSD', status: 'Falhado', color: 'text-neutral-500' },
  ];

  return (
    <ResponsiveShell>
      <PageContainer>
        <SectionHeader title="Histórico Operacional" subtitle="Livro de registos completo das suas movimentações em ledger" />
        
        <div className="w-full bg-white/[0.01] border border-white/5 rounded-2xl p-5 backdrop-blur-xl">
          {/* Filtros de Histórico */}
          <div className="flex flex-wrap gap-2 justify-between items-center border-b border-white/5 pb-4 mb-4">
            <div className="flex gap-1.5 overflow-x-auto">
              {['Todos', 'Depósitos', 'Envios', 'Convert', 'Recompensas'].map((filter, i) => (
                <button key={filter} className={`px-3 py-1.5 rounded-lg font-mono text-[10px] font-bold uppercase border tracking-wider transition-all ${i === 0 ? 'bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/20' : 'bg-transparent text-neutral-400 border-white/5 hover:border-white/20'}`}>
                  {filter}
                </button>
              ))}
            </div>
            <button className="flex items-center gap-2 p-2 bg-white/[0.02] hover:bg-white/5 border border-white/5 rounded-lg text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
              <Download size={12} /> Exportar CSV
            </button>
          </div>

          {/* Lista de transações estruturada */}
          <div className="flex flex-col gap-2">
            {transactions.map((tx) => (
              <div key={tx.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-black/20 border border-white/[0.02] rounded-xl hover:border-white/5 transition-all gap-2">
                <div className="flex items-center gap-3">
                  <div className="text-[10px] font-mono font-bold text-neutral-500 bg-white/5 px-2 py-1 rounded">
                    TX
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">{tx.type}</span>
                    <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest">{tx.hash} • {tx.date}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6">
                  <span className={`text-xs font-mono font-black ${tx.color}`}>{tx.amount}</span>
                  <span className="text-[9px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-white/[0.02] border border-white/10 text-neutral-400">
                    {tx.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PageContainer>
    </ResponsiveShell>
  );
}