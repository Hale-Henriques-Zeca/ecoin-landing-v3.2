'use client';

import React from 'react';
import { ShieldCheck, Lock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// Importações com os nomes exatos das 15 pastas dentro de /components
import SecurityScore from './components/SecurityScore';
import Authentication from './components/Authentication';
import Passkeys from './components/Passkeys';
import TwoFactor from './components/TwoFactor';
import TrustedDevices from './components/TrustedDevices';
import ActiveSessions from './components/ActiveSessions';
import Guardians from './components/Guardians';
import RecoveryMethods from './components/RecoveryMethods';
import LoginHistory from './components/LoginHistory';
import ConnectedApps from './components/ConnectedApps';
import TransactionProtection from './components/TransactionProtection';
import RiskDetection from './components/RiskDetection';
import EmergencyLock from './components/EmergencyLock';
import DeleteAccount from './components/DeleteAccount';
import AdvancedSecurity from './components/AdvancedSecurity';

export default function SecuritySettingsPage() {
  return (
   <div className="min-h-screen bg-black text-white px-4 pb-8 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-28 font-mono">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Cabeçalho do Painel de Segurança */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <Link 
              href="/eCoinCloudWallet/settings" 
              className="inline-flex items-center gap-2 text-xs text-neutral-400 hover:text-white mb-3 transition-colors"
            >
              <ArrowLeft size={14} /> Voltar às Configurações
            </Link>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-wider flex items-center gap-3 uppercase">
              <ShieldCheck className="text-[#00FF9C]" size={28} /> Central de Segurança Cloud Vault
            </h1>
            <p className="text-xs text-neutral-400 mt-1">
              Gerencie chaves, autenticação de dois fatores, sessões ativas e regras de proteção Web3.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-neutral-900/60 border border-white/10 p-3 rounded-2xl self-start md:self-auto">
            <div className="p-2 bg-[#00FF9C]/10 text-[#00FF9C] rounded-xl">
              <Lock size={20} />
            </div>
            <div>
              <span className="text-[10px] text-neutral-500 uppercase font-bold block">Status da Carteira</span>
              <span className="text-xs font-bold text-[#00FF9C]">Proteção Máxima</span>
            </div>
          </div>
        </header>

        {/* Layout dos Orquestradores */}
        <main className="flex flex-col gap-8">
          
          {/* 1. Score de Segurança */}
          <section className="w-full">
            <SecurityScore />
          </section>

          {/* 2. Autenticação & 3. Passkeys / Biometria */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Authentication />
            <Passkeys />
          </section>

          {/* 4. Módulo 2FA (Autenticação de Dois Fatores) */}
          <section className="w-full">
            <TwoFactor />
          </section>

          {/* 12. Deteção de Riscos AI & 13. Bloqueio de Emergência */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RiskDetection />
            <EmergencyLock />
          </section>

          {/* 11. Proteção de Transações & Regras de Gastos */}
          <section className="w-full">
            <TransactionProtection />
          </section>

          {/* 5. Dispositivos Confiáveis & 6. Sessões Ativas */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TrustedDevices />
            <ActiveSessions />
          </section>

          {/* 7. Guardiões & 8. Métodos de Recuperação */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Guardians />
            <RecoveryMethods />
          </section>

          {/* 10. Aplicações Conectadas (dApps Web3) */}
          <section className="w-full">
            <ConnectedApps />
          </section>

          {/* 9. Histórico Detalhado de Logins */}
          <section className="w-full">
            <LoginHistory />
          </section>

          {/* 15. Módulo Avançado de Segurança (MEV / Hardware / APIs) */}
          <section className="w-full">
            <AdvancedSecurity />
          </section>

          {/* 14. Eliminação de Conta */}
          <section className="w-full pt-4">
            <DeleteAccount />
          </section>

        </main>

        {/* Rodapé do Sistema */}
        <footer className="text-center text-[10px] text-neutral-600 pt-6 border-t border-white/5 font-mono">
          eCoin Cloud Wallet • Protocolo de Segurança Militar v2.4 • Encriptação E2EE Ativa
        </footer>

      </div>
    </div>
  );
}