'use client';

import React, { useState } from 'react';
import { 
  ShieldCheck, Key, Laptop, Smartphone, Activity, Users, 
  Cpu, AlertTriangle, Lock, Trash2, CheckCircle2, ShieldAlert
} from 'lucide-react';
import ResponsiveShell from '@/components/eCoinCloudWallet/components/layout/ResponsiveShell';
import PageContainer from '@/components/eCoinCloudWallet/components/common/PageContainer';
import SectionHeader from '@/components/eCoinCloudWallet/components/common/SectionHeader';

export default function SecurityCenterPage() {
  const [emergencyLocked, setEmergencyLocked] = useState(false);

  return (
    <ResponsiveShell>
      <PageContainer>
        <SectionHeader 
          title="Security Center" 
          subtitle="Segurança de nível bancário orquestrada via identidade abstrata e IA" 
        />

        <div className="max-w-4xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 mt-2">
          
          {/* COLUNA ESQUERDA: INDICADORES E CONEXÕES (7 COLUNAS) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* SCORE DE SEGURANÇA */}
            <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-5 backdrop-blur-xl font-mono">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] uppercase font-black tracking-widest text-neutral-400">Pontuação de Proteção Cloud</span>
                <span className="text-xs font-black text-[#00FF9C]">Excelente</span>
              </div>
              <div className="flex items-baseline gap-1.5 mb-3">
                <span className="text-3xl font-black text-white">96</span>
                <span className="text-xs text-neutral-500">/ 100</span>
              </div>
              {/* Barra Progressiva Estilizada */}
              <div className="w-full h-2 bg-neutral-900 rounded-full overflow-hidden border border-white/5">
                <div className="h-full bg-gradient-to-r from-[#D4AF37] to-[#00FF9C] w-[96%]" />
              </div>
            </div>

            {/* CONTAS AUTENTICADORAS (NADA DE PRIVATE KEY!) */}
            <div className="bg-black/30 border border-white/5 rounded-2xl p-5 font-mono">
              <h3 className="text-xs font-black text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <Key size={13} className="text-[#D4AF37]" /> Provedores de Autenticação Ativos
              </h3>
              <div className="flex flex-col gap-2.5">
                {[
                  { name: 'Google Single Sign-On', type: 'OAuth 2.0 Secure', active: true },
                  { name: 'Apple ID Secure Enclave', type: 'Biometrics Linked', active: true },
                  { name: 'E-mail Principal', type: 'Verificação OTP Ativa', active: true }
                ].map((auth, i) => (
                  <div key={i} className="flex justify-between items-center bg-neutral-900/40 p-3 rounded-xl border border-white/[0.02]">
                    <div>
                      <span className="text-xs font-bold text-neutral-200 block">{auth.name}</span>
                      <span className="text-[9px] text-neutral-500">{auth.type}</span>
                    </div>
                    <CheckCircle2 size={14} className="text-[#00FF9C]" />
                  </div>
                ))}
              </div>
            </div>

            {/* PASSKEYS E BIOMETRIA */}
            <div className="bg-black/30 border border-white/5 rounded-2xl p-5 font-mono">
              <h3 className="text-xs font-black text-white uppercase tracking-wider mb-3.5">
                Passkeys Disponíveis
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {['Windows Hello', 'Face ID Mobile', 'Touch ID Mac'].map((pk, i) => (
                  <div key={i} className="p-3 rounded-xl border border-white/5 bg-neutral-900/20 text-center">
                    <span className="text-xs font-bold text-white block mb-0.5">{pk}</span>
                    <span className="text-[8px] uppercase tracking-widest font-black text-[#00FF9C]">Ativado</span>
                  </div>
                ))}
              </div>
            </div>

            {/* DISPOSITIVOS E SESSÕES ATIVAS */}
            <div className="bg-black/30 border border-white/5 rounded-2xl p-5 font-mono">
              <h3 className="text-xs font-black text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <Laptop size={13} className="text-blue-400" /> Dispositivos e Sessões Autorizadas
              </h3>
              <div className="flex flex-col gap-2">
                {[
                  { device: 'Windows Desktop', os: 'Latitude PC • Maputo, MZ', current: true },
                  { device: 'iPhone 15 Pro', os: 'iOS App • Matola, MZ', current: false },
                  { device: 'MacBook Air', os: 'Safari • Beira, MZ', current: false }
                ].map((dev, i) => (
                  <div key={i} className="flex justify-between items-center bg-neutral-900/50 p-3 rounded-xl border border-white/[0.02]">
                    <div className="flex items-center gap-3">
                      {dev.device.includes('iPhone') ? <Smartphone size={16} className="text-neutral-400" /> : <Laptop size={16} className="text-neutral-400" />}
                      <div>
                        <span className="text-xs font-bold text-white block">{dev.device}</span>
                        <span className="text-[9px] text-neutral-500">{dev.os}</span>
                      </div>
                    </div>
                    <span className={`text-[8px] uppercase font-black px-2 py-0.5 rounded ${
                      dev.current ? 'bg-[#00FF9C]/10 text-[#00FF9C] border border-[#00FF9C]/20' : 'bg-neutral-800 text-neutral-400'
                    }`}>
                      {dev.current ? 'Sessão Atual' : 'Ativo'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* COLUNA DIREITA: INOVAÇÃO RECOVERY & AI MONITOR (5 COLUNAS) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            {/* EXCLUSIVO: GUARDIAN ACCOUNTS (SISTEMA DE RECUPERAÇÃO SOCIAL) */}
            <div className="bg-gradient-to-b from-white/[0.02] to-transparent border border-white/5 rounded-2xl p-5 font-mono">
              <h3 className="text-xs font-black text-white uppercase tracking-wider mb-1 flex items-center gap-2">
                <Users size={14} className="text-purple-400" /> Guardian Accounts
              </h3>
              <p className="text-[9px] text-neutral-500 mb-3.5">Canais de confiança para homologar resgates sem chaves privadas.</p>
              
              <div className="flex flex-col gap-2">
                {[
                  { name: 'Esposa (Trusted Wallet)', type: 'Social Guardian' },
                  { name: 'Corporate Backup Node', type: 'Multi-sig Multisign' },
                  { name: 'EdenKingDom Recovery Service', type: 'Algorithmic Vault' }
                ].map((g, i) => (
                  <div key={i} className="p-2.5 rounded-xl border border-white/5 bg-black/20 flex justify-between items-center">
                    <div>
                      <span className="text-[11px] font-bold text-neutral-200 block">{g.name}</span>
                      <span className="text-[8px] uppercase text-neutral-500 tracking-wider">{g.type}</span>
                    </div>
                    <ShieldCheck size={12} className="text-[#00FF9C]" />
                  </div>
                ))}
              </div>
            </div>

            {/* EXCLUSIVO: MONITOR DE IA INTELIGENTE (AI SECURITY) */}
            <div className="bg-black/40 border border-white/5 rounded-2xl p-4 font-mono">
              <div className="flex items-center gap-2 mb-3">
                <Cpu size={14} className="text-[#00FF9C] animate-pulse" />
                <span className="text-xs font-black text-white uppercase tracking-wider">AI Security Monitor</span>
              </div>
              
              <div className="space-y-2">
                {[
                  { label: 'Viagem Impossível (Geofencing)', protected: true },
                  { label: 'Detecção de Phishing & Spoofing', protected: true },
                  { label: 'Análise de Comportamento Incomum', protected: true },
                  { label: 'Bloqueio contra Gas Attacks', protected: true }
                ].map((ai, i) => (
                  <div key={i} className="flex justify-between items-center text-[10px] py-1 border-b border-white/[0.02]">
                    <span className="text-neutral-400">{ai.label}</span>
                    <span className="text-[#00FF9C] font-bold text-[9px] uppercase">Monitorado</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 bg-[#00FF9C]/5 border border-[#00FF9C]/10 rounded-xl p-2.5 text-[9px] text-neutral-400 leading-normal">
                <span className="text-white font-bold block mb-0.5">Proteção Transacional IA</span>
                Algoritmos preditivos auditam interações com dApps e swaps em tempo real antes da confirmação final na blockchain.
              </div>
            </div>

            {/* TRAVA DE EMERGÊNCIA (EMERGENCY LOCK) */}
            <div className="bg-red-500/5 border border-red-500/10 rounded-2xl p-4 font-mono">
              <div className="flex gap-3 items-start mb-3">
                <ShieldAlert size={18} className="text-red-400 shrink-0" />
                <div>
                  <h4 className="text-xs font-black text-white uppercase">Bloqueio de Emergência</h4>
                  <p className="text-[9px] text-neutral-500 leading-normal mt-0.5">
                    Se notar atividades suspeitas, congele a movimentação de todos os fundos e revogue sessões instantaneamente.
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setEmergencyLocked(!emergencyLocked)}
                className={`w-full h-9 font-mono font-black text-[10px] uppercase tracking-widest rounded-xl transition-all ${
                  emergencyLocked 
                    ? 'bg-neutral-800 text-red-400 border border-red-500/30 shadow-inner' 
                    : 'bg-red-500 hover:bg-red-600 text-white'
                }`}
              >
                {emergencyLocked ? '🔒 Carteira Congelada' : '🚨 Lock Wallet Agora'}
              </button>
            </div>

            {/* APAGAR CONTA */}
            <button className="w-full h-9 bg-transparent border border-white/5 hover:border-red-500/20 text-neutral-600 hover:text-red-400 font-mono text-[9px] uppercase font-black tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 mt-2">
              <Trash2 size={11} />
              Excluir Registro da eCoin Cloud Wallet
            </button>

          </div>

        </div>
      </PageContainer>
    </ResponsiveShell>
  );
}