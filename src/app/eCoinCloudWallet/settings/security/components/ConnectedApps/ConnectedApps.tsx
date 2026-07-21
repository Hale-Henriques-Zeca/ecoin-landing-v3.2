'use client';

import React from 'react';
import { Share2 } from 'lucide-react';
import {
  AppCard,
  AppPermissions,
  AppNetwork,
  AppStatus,
  DisconnectApp,
  TrustedApps
} from './components';

export default function ConnectedApps() {
  return (
    <div className="bg-black/40 border border-white/5 rounded-2xl p-5 font-mono flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
          <Share2 size={14} className="text-[#00FF9C]" /> Aplicações Conectadas (dApps Web3)
        </h3>
        <TrustedApps />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <AppCard>
          <div>
            <div className="flex items-center gap-2">
              <AppStatus />
              <span className="text-xs font-bold text-white">eCoin DEX Arbitrage</span>
            </div>
            <AppPermissions permissions="Ler Saldo • Assinar Transações" />
          </div>
          <div className="flex items-center gap-3">
            <AppNetwork network="BSC Mainnet" />
            <DisconnectApp />
          </div>
        </AppCard>

        <AppCard>
          <div>
            <div className="flex items-center gap-2">
              <AppStatus />
              <span className="text-xs font-bold text-white">PancakeSwap v3</span>
            </div>
            <AppPermissions permissions="Troca de Tokens (Swap)" />
          </div>
          <div className="flex items-center gap-3">
            <AppNetwork network="BNB Chain" />
            <DisconnectApp />
          </div>
        </AppCard>
      </div>
    </div>
  );
}