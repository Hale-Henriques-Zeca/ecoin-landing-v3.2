'use client';

import React, { useState } from 'react';
import { Search, AlertTriangle } from 'lucide-react';
import ResponsiveShell from '@/components/eCoinCloudWallet/components/layout/ResponsiveShell';
import PageContainer from '@/components/eCoinCloudWallet/components/common/PageContainer';
import SectionHeader from '@/components/eCoinCloudWallet/components/common/SectionHeader';

import OfficialAssetsList from './components/OfficialAssetsList';
import CustomAssetsList from './components/CustomAssetsList';
import AddCustomTokenModal from './components/AddCustomTokenModal';
import CustomTokenTransferModal from './components/CustomTokenTransferModal';

export default function AssetsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [customTokens, setCustomTokens] = useState([
    { symbol: 'ABC', name: 'ABC Protocol Token', address: '0x1234567890abcdef1234567890abcdef12345678', balance: '5,000.00' },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [transferToken, setTransferToken] = useState<any>(null);

  const handleAddToken = (newToken: any) => {
    setCustomTokens((prev) => [...prev, newToken]);
  };

  return (
    <ResponsiveShell>
      <PageContainer>
        {/* Cabeçalho Principal via Componente Shell */}
        <SectionHeader 
          title="Carteira de Ativos" 
          subtitle="Gestão global do seu portfólio digital (Ativos Oficiais e Custom Tokens BEP-20)" 
        />

        <div className="w-full space-y-6">
          
          {/* Top Actions & Balanço Estimado Global */}
          <div className="w-full bg-white/[0.01] border border-white/5 rounded-2xl p-6 backdrop-blur-xl flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-neutral-500" />
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Pesquisar token..." 
                className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white font-mono placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37]/50"
              />
            </div>
            
            <div className="text-right w-full md:w-auto font-mono">
              <span className="text-[10px] text-neutral-500 uppercase tracking-wider block">Balanço Estimado Total</span>
              <span className="text-2xl font-black text-white">$29,658.30 <span className="text-xs text-[#D4AF37]">USD</span></span>
            </div>
          </div>

          {/* Banner de Deteção e Resgate de Tokens Na Carteira */}
          <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono">
            <div className="flex items-center gap-3">
              <AlertTriangle className="text-[#D4AF37] shrink-0" size={22} />
              <div>
                <span className="text-xs font-bold text-white block">Novo Token BEP-20 Detetado no seu Endereço</span>
                <span className="text-[10px] text-neutral-400">Contrato: 0x9876...4321 • Saldo Encontrado: 1,200 XYZ</span>
              </div>
            </div>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="h-8 px-4 bg-[#D4AF37] hover:bg-[#c29f2e] text-black font-bold rounded-xl text-xs uppercase transition-all shrink-0"
            >
              Registar / Resgatar Token
            </button>
          </div>

          {/* Seção 1: Ativos Oficiais (Patrocinados via GasPool + 1% Fee) */}
          <OfficialAssetsList />

          {/* Seção 2: Custom Tokens BEP-20 (Taxa de 0.000015 BNB + Gas Próprio) */}
          <CustomAssetsList
            tokens={customTokens.filter((t) => 
              t.symbol.toLowerCase().includes(searchTerm.toLowerCase()) || 
              t.name.toLowerCase().includes(searchTerm.toLowerCase())
            )}
            onOpenTransfer={(token) => setTransferToken(token)}
            onOpenAddModal={() => setIsAddModalOpen(true)}
          />

          {/* Modais de Interação */}
          <AddCustomTokenModal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            onAddToken={handleAddToken}
          />

          <CustomTokenTransferModal
            token={transferToken}
            onClose={() => setTransferToken(null)}
          />

        </div>
      </PageContainer>
    </ResponsiveShell>
  );
}