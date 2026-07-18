'use client';

import React from 'react';
import { Eye, ShieldAlert } from 'lucide-react';
import ResponsiveShell from '@/components/eCoinCloudWallet/components/layout/ResponsiveShell';
import PageContainer from '@/components/eCoinCloudWallet/components/common/PageContainer';
import SectionHeader from '@/components/eCoinCloudWallet/components/common/SectionHeader';

export default function NftPage() {
  const nfts = [
    { id: '#0042', name: 'EdenKingdom Alpha Pass', collection: 'VIP Membership', rarity: 'Lendário', floor: '12,500 ECOIN' },
    { id: '#1109', name: 'Cloud Mining Node License', collection: 'Node Protocol', rarity: 'Raro', floor: '5,000 ECOIN' },
    { id: '#0892', name: 'Arbitrage Bot Access Card', collection: 'AI Founders', rarity: 'Épico', floor: '8,200 ECOIN' },
  ];

  return (
    <ResponsiveShell>
      <PageContainer>
        <SectionHeader title="Coleções NFT" subtitle="Galeria de ativos utilitários não-fungíveis vinculados ao protocolo" />
        
        {nfts.length === 0 ? (
          <div className="w-full py-12 text-center bg-white/[0.01] border border-dashed border-white/10 rounded-2xl">
            <ShieldAlert className="mx-auto text-neutral-600 mb-2" size={24} />
            <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest block">Nenhum NFT encontrado nesta carteira</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {nfts.map((nft) => (
              <div key={nft.id} className="bg-white/[0.01] border border-white/5 rounded-2xl p-4 backdrop-blur-xl flex flex-col group">
                {/* Mock Image Box */}
                <div className="w-full aspect-square bg-gradient-to-br from-neutral-900 via-black to-neutral-900 rounded-xl border border-white/5 relative flex items-center justify-center overflow-hidden mb-3">
                  <div className="absolute inset-0 bg-neutral-950/20 group-hover:opacity-0 transition-opacity" />
                  <span className="font-mono text-2xl font-black text-white/5 select-none">{nft.id}</span>
                  <div className="absolute font-mono text-[9px] top-2 right-2 px-1.5 py-0.5 rounded bg-black/60 text-[#D4AF37] border border-white/10">
                    {nft.rarity}
                  </div>
                </div>

                <div>
                  <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-wider block">{nft.collection}</span>
                  <h4 className="text-xs font-bold text-white tracking-wide">{nft.name}</h4>
                  
                  <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono">
                    <span className="text-neutral-500">Floor Price</span>
                    <span className="text-white font-bold">{nft.floor}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </PageContainer>
    </ResponsiveShell>
  );
}