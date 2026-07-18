'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  User, Coins, Globe, Network, Bell, Link2, 
  Shield, Terminal, Info, LogOut, Check, ArrowRight
} from 'lucide-react';
import ResponsiveShell from '@/components/eCoinCloudWallet/components/layout/ResponsiveShell';
import PageContainer from '@/components/eCoinCloudWallet/components/common/PageContainer';
import SectionHeader from '@/components/eCoinCloudWallet/components/common/SectionHeader';

export default function SettingsPage() {
  const router = useRouter();
  
  // States para simular as preferências interativas do usuário
  const [currency, setCurrency] = useState('USD');
  const [language, setLanguage] = useState('pt');
  const [activeNetwork, setActiveNetwork] = useState('bsc');
  const [notifications, setNotifications] = useState(true);

  return (
    <ResponsiveShell>
      <PageContainer>
        <SectionHeader 
          title="Configurações" 
          subtitle="Gerencie as preferências globais da sua Cloud Wallet" 
        />

        <div className="max-w-3xl mx-auto w-full flex flex-col gap-5 mt-2">
          
          {/* PERFIL DO UTILIZADOR */}
          <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-4 flex items-center justify-between backdrop-blur-xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#00FF9C] p-[1.5px]">
                <div className="w-full h-full rounded-full bg-neutral-950 flex items-center justify-center text-white font-mono font-bold text-sm">
                  HE
                </div>
              </div>
              <div>
                <h3 className="text-xs font-black text-white uppercase tracking-wider font-mono">Hale Henriques</h3>
                <p className="text-[10px] text-neutral-500 font-mono">ID da Conta: cloud_eden_8941</p>
              </div>
            </div>
            <span className="text-[9px] font-mono font-black uppercase px-2 py-0.5 rounded bg-[#00FF9C]/10 text-[#00FF9C] border border-[#00FF9C]/20">
              Verificado
            </span>
          </div>

          {/* GRID DE CONFIGURAÇÕES EM BLOCOS PREMIUM */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Bloco: Moeda Padrão */}
            <div className="bg-black/30 border border-white/5 rounded-2xl p-4 font-mono">
              <div className="flex items-center gap-2 mb-3 text-[#D4AF37]">
                <Coins size={14} />
                <span className="text-[11px] font-black uppercase tracking-wider text-white">Moeda de Exibição</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'USD', label: 'USD ($)' },
                  { id: 'EUR', label: 'EUR (€)' },
                  { id: 'MZN', label: 'MZN (MT)' },
                  { id: 'GBP', label: 'GBP (£)' }
                ].map((cur) => (
                  <button
                    key={cur.id}
                    onClick={() => setCurrency(cur.id)}
                    className={`h-8 rounded-lg text-[10px] font-bold uppercase border transition-all ${
                      currency === cur.id 
                        ? 'bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/30' 
                        : 'bg-transparent border-white/5 text-neutral-400 hover:border-white/10'
                    }`}
                  >
                    {cur.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Bloco: Idioma */}
            <div className="bg-black/30 border border-white/5 rounded-2xl p-4 font-mono">
              <div className="flex items-center gap-2 mb-3 text-blue-400">
                <Globe size={14} />
                <span className="text-[11px] font-black uppercase tracking-wider text-white">Idioma do Hub</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'en', label: 'English' },
                  { id: 'pt', label: 'Português' },
                  { id: 'fr', label: 'Français' },
                  { id: 'es', label: 'Español' }
                ].map((lang) => (
                  <button
                    key={lang.id}
                    onClick={() => setLanguage(lang.id)}
                    className={`h-8 rounded-lg text-[10px] font-bold border transition-all ${
                      language === lang.id 
                        ? 'bg-blue-500/10 text-blue-400 border-blue-500/30' 
                        : 'bg-transparent border-white/5 text-neutral-400 hover:border-white/10'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Bloco: Redes Blockchain Ativas */}
            <div className="bg-black/30 border border-white/5 rounded-2xl p-4 font-mono">
              <div className="flex items-center gap-2 mb-3 text-purple-400">
                <Network size={14} />
                <span className="text-[11px] font-black uppercase tracking-wider text-white">Redes Integradas</span>
              </div>
              <div className="flex flex-col gap-1.5">
                {[
                  { id: 'bsc', label: 'BNB Smart Chain (Nativa)', live: true },
                  { id: 'eth', label: 'Ethereum Mainnet' },
                  { id: 'polygon', label: 'Polygon PoS' },
                  { id: 'solana', label: 'Solana Network' }
                ].map((net) => (
                  <div 
                    key={net.id}
                    onClick={() => setActiveNetwork(net.id)}
                    className={`p-2 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      activeNetwork === net.id ? 'bg-purple-500/5 border-purple-500/20' : 'border-white/[0.02] hover:border-white/5'
                    }`}
                  >
                    <span className={`text-[10px] font-bold ${activeNetwork === net.id ? 'text-white' : 'text-neutral-400'}`}>
                      {net.label}
                    </span>
                    {activeNetwork === net.id && <Check size={10} className="text-purple-400" />}
                  </div>
                ))}
              </div>
            </div>

            {/* Bloco: Identidade Conectada (Cloud Login) */}
            <div className="bg-black/30 border border-white/5 rounded-2xl p-4 font-mono">
              <div className="flex items-center gap-2 mb-3 text-[#00FF9C]">
                <Link2 size={14} />
                <span className="text-[11px] font-black uppercase tracking-wider text-white">Contas Vinculadas</span>
              </div>
              <div className="flex flex-col gap-2">
                {[
                  { provider: 'Google', info: 'hale.dev@gmail.com', linked: true },
                  { provider: 'Apple ID', info: 'h.henriques@icloud.com', linked: true },
                  { provider: 'GitHub', info: 'Não conectado', linked: false }
                ].map((acc, i) => (
                  <div key={i} className="flex justify-between items-center bg-neutral-900/40 p-2 rounded-xl border border-white/[0.02]">
                    <div>
                      <span className="text-[10px] font-bold text-white block">{acc.provider}</span>
                      <span className="text-[9px] text-neutral-500">{acc.info}</span>
                    </div>
                    <span className={`text-[8px] uppercase font-black px-1.5 py-0.5 rounded ${
                      acc.linked ? 'bg-[#00FF9C]/10 text-[#00FF9C]' : 'bg-neutral-800 text-neutral-500'
                    }`}>
                      {acc.linked ? 'Ativo' : 'Vincular'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* ACESSO AO HUB DE SEGURANÇA (O GRANDE DIFERENCIAL) */}
          <div 
            onClick={() => router.push('/eCoinCloudWallet/settings/security')}
            className="w-full bg-gradient-to-r from-neutral-950 to-neutral-900 border border-white/5 rounded-2xl p-4 flex items-center justify-between cursor-pointer group hover:border-[#D4AF37]/30 transition-all font-mono"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 flex items-center justify-center">
                <Shield size={16} />
              </div>
              <div>
                <h4 className="text-xs font-black text-white uppercase tracking-wider">Centro de Segurança Cloud</h4>
                <p className="text-[10px] text-neutral-500">Acesse passkeys, dispositivos autorizados e monitor de proteção IA.</p>
              </div>
            </div>
            <ArrowRight size={14} className="text-neutral-500 group-hover:text-[#D4AF37] group-hover:translate-x-0.5 transition-all" />
          </div>

          {/* NOTIFICAÇÕES E MOTOR DESENVOLVEDOR */}
          <div className="bg-black/20 border border-white/5 rounded-2xl p-4 font-mono flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-white/[0.03] pb-2">
              <div className="flex items-center gap-2 text-neutral-400">
                <Bell size={13} />
                <span className="text-[11px] font-bold uppercase text-neutral-200">Notificações Push instantâneas</span>
              </div>
              <input 
                type="checkbox" 
                checked={notifications} 
                onChange={() => setNotifications(!notifications)} 
                className="accent-[#00FF9C] cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between cursor-not-allowed opacity-50">
              <div className="flex items-center gap-2 text-neutral-400">
                <Terminal size={13} />
                <span className="text-[11px] font-bold uppercase text-neutral-200">Developer Dashboard & RPC Console</span>
              </div>
              <span className="text-[8px] uppercase font-black px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-400">Restrito</span>
            </div>
          </div>

          {/* METADADOS ABOUT & LOGOUT */}
          <div className="flex justify-between items-center font-mono border-t border-white/5 pt-4 mt-2">
            <div className="flex gap-4 text-[10px] text-neutral-500">
              <div className="flex items-center gap-1"><Info size={10} /> <span>v2.4.0 Cloud</span></div>
              <span className="hover:text-white cursor-pointer">Termos</span>
              <span className="hover:text-white cursor-pointer">API Docs</span>
            </div>
            <button className="flex items-center gap-1.5 text-xs font-bold text-red-400 hover:text-red-300 transition-colors">
              <LogOut size={12} />
              <span>Sair da Conta</span>
            </button>
          </div>

        </div>
      </PageContainer>
    </ResponsiveShell>
  );
}