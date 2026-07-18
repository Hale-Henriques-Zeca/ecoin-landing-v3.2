'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  Wallet, Cpu, TrendingUp, DollarSign, Layers, ShoppingBag, 
  Users, Vote, Milestone, Megaphone, ArrowRight, ShieldCheck, 
  Globe, LineChart, MessageSquare, Building, Code, Landmark, 
  Layers3, Blocks, Sparkles, ShoppingCart, HelpCircle
} from 'lucide-react';
import ResponsiveShell from '@/components/eCoinCloudWallet/components/layout/ResponsiveShell';
import PageContainer from '@/components/eCoinCloudWallet/components/common/PageContainer';

export default function EcosystemHubPage() {
  const router = useRouter();

  // Dados estruturados conforme o seu Blueprint Arquitetônico
  const coreProducts = [
    { name: 'eCoin', desc: 'O token nativo e combustível deflacionário de todo o protocolo.', icon: Layers3, status: 'Active' },
    { name: 'eDollar (EUSD)', desc: 'Stablecoin algorítmica ancorada ao ecossistema para liquidez e proteção.', icon: DollarSign, status: 'Active' },
    { name: 'Cloud Wallet', desc: 'Sua carteira Web3 inteligente e não-custodial com gas patrocinado.', icon: Wallet, status: 'Active' },
    { name: 'Trading AI', desc: 'Algoritmos de alta frequência operando arbitragem direto nas exchanges.', icon: TrendingUp, status: 'Active' },
    { name: 'Mineração Cloud', desc: 'Mineração de eCoin em nuvem por pools de alto desempenho.', icon: Cpu, status: 'Active' },
    { name: 'Convert/Swap', desc: 'Conversão instantânea entre fiat, stablecoins e cripto ativos nativos.', icon: Blocks, status: 'Active' },
  ];

  const financialServices = [
    { name: 'Deposit & Withdraw', desc: 'Rampa de entrada e saída rápida de fiat usando PayPal e bancos.', icon: Landmark },
    { name: 'P2P Marketplace', desc: 'Negociação direta entre usuários com custódia via Smart Contract.', icon: Users },
    { name: 'Instant Swap', desc: 'Trocas imediatas com slippage zero usando nossas pools integradas.', icon: Blocks },
    { name: 'Crypto Savings', desc: 'Contas de rendimento passivo com juros compostos baseados em stablecoins.', icon: ShieldCheck },
  ];

  const blockchainServices = [
    { name: 'Smart Wallet Management', desc: 'Abstração de conta (Account Abstraction) para login social facilitado.', icon: Code },
    { name: 'Gas Sponsor Vault', desc: 'Subsídio de taxas de rede para novos usuários do protocolo.', icon: Sparkles },
    { name: 'Cross-Chain Bridge', desc: 'Interoperabilidade fluida entre redes EVM de alta velocidade.', icon: Globe },
    { name: 'NFT Factory & Staking', desc: 'Criação, fracionamento e bloqueio de ativos digitais colecionáveis.', icon: Layers },
  ];

  const aiServices = [
    { name: 'Hybrid AI System', desc: 'Análise preditiva combinando redes neuronais e dados on-chain.', icon: Cpu },
    { name: 'Forex & Crypto AI Bots', desc: 'Estratégias automatizadas em múltiplos mercados centralizados.', icon: LineChart },
    { name: 'Portfolio Rebalancing AI', desc: 'Gestão de risco automatizada baseada no perfil do investidor.', icon: ShieldCheck },
  ];

  const marketplaceMarketingServices = [
    { name: 'Global Marketplace', desc: 'E-commerce descentralizado para produtos físicos e digitais.', icon: ShoppingBag },
    { name: 'eMarketing Ads Platform', desc: 'Anúncios direcionados e monetização Web3 com pagamento em eCoin.', icon: Megaphone },
    { name: 'Digital Service Store', desc: 'Contratação de serviços independentes com contratos de garantia.', icon: ShoppingCart },
    { name: 'Eden Domains', desc: 'Identidades Web3 descentralizadas (.eden) vinculadas à sua carteira.', icon: Globe },
  ];

  const socialServices = [
    { name: 'eSocial Network', desc: 'Rede social descentralizada com monetização direta de conteúdo.', icon: Users },
    { name: 'Web3 Encrypted Messaging', desc: 'Mensagens ponta a ponta vinculadas às chaves públicas.', icon: MessageSquare },
    { name: 'Creator Token Economy', desc: 'Lançamento de moedas sociais para influenciadores e comunidades.', icon: Sparkles },
  ];

  const businessServices = [
    { name: 'Merchant POS Pay', desc: 'Integração de pagamentos cripto instantâneos para lojas onlines da eSocial.', icon: Building },
    { name: 'Automated Invoices', desc: 'Faturamento inteligente on-chain e geração de notas criptográficas.', icon: Code },
    { name: 'Payroll & Subscriptions', desc: 'Pagamento de salários recorrentes e assinaturas inteligentes.', icon: Landmark },
  ];

  return (
    <ResponsiveShell>
      <PageContainer>
        
        {/* 1. HERO SECTION */}
        <section className="relative w-full py-16 md:py-24 border border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent rounded-3xl p-6 text-center overflow-hidden mb-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(214,175,55,0.05)_0%,transparent_60%)] pointer-events-none" />
          <span className="font-mono text-xs font-black text-[#D4AF37] uppercase tracking-widest bg-[#D4AF37]/10 px-3 py-1 rounded-full border border-[#D4AF37]/20">
            EdenKingDom Universe
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white mt-4 uppercase tracking-tight max-w-2xl mx-auto leading-tight">
            The AI Financial <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#00FF9C]">Super App</span>
          </h1>
          <p className="font-mono text-xs text-neutral-400 max-w-lg mx-auto mt-4 leading-relaxed">
            Uma infraestrutura unificada combinando finanças globais, custódia inteligente, inteligência artificial preditiva e serviços descentralizados.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <button 
              onClick={() => router.push('/eCoinCloudWallet')}
              className="h-10 bg-[#00FF9C] text-black font-mono font-black text-xs uppercase tracking-widest px-6 rounded-xl hover:brightness-110 shadow-[0_0_20px_rgba(0,255,156,0.15)] transition-all flex items-center gap-2"
            >
              Launch Wallet <ArrowRight size={12} />
            </button>
            <button 
              onClick={() => document.getElementById('core-products')?.scrollIntoView({ behavior: 'smooth' })}
              className="h-10 bg-white/5 border border-white/10 text-white font-mono font-black text-xs uppercase tracking-widest px-6 rounded-xl hover:bg-white/10 transition-all"
            >
              Explore Ecosystem
            </button>
          </div>
        </section>

        {/* 2. ECOSYSTEM OVERVIEW METRICS */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { label: 'Core Segments', value: '8 Pillars' },
            { label: 'Active Ecosystem Nodes', value: 'Global EVM' },
            { label: 'AI Trading Pools', value: 'Binance / Bybit' },
            { label: 'Marketing Reach', value: 'Web3 Targeted' }
          ].map((m, i) => (
            <div key={i} className="bg-black/30 border border-white/5 rounded-2xl p-4 font-mono">
              <span className="text-[10px] uppercase font-bold text-neutral-500 block mb-1">{m.label}</span>
              <span className="text-sm font-black text-white">{m.value}</span>
            </div>
          ))}
        </section>

        {/* 3. CORE PRODUCTS */}
        <section id="core-products" className="mb-14">
          <div className="border-b border-white/5 pb-3 mb-6 flex justify-between items-end">
            <div>
              <span className="text-[10px] font-mono font-bold text-[#D4AF37] uppercase tracking-wider block">Pilar Central</span>
              <h2 className="text-sm font-black text-white uppercase tracking-widest">Core Products</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {coreProducts.map((p, i) => (
              <div key={i} className="bg-white/[0.01] border border-white/5 hover:border-white/10 rounded-2xl p-5 transition-all group">
                <div className="flex justify-between items-start mb-3">
                  <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-white/10 flex items-center justify-center text-[#D4AF37] group-hover:scale-105 transition-transform">
                    <p.icon size={16} />
                  </div>
                  <span className="font-mono text-[9px] uppercase font-bold bg-[#00FF9C]/10 text-[#00FF9C] px-2 py-0.5 rounded border border-[#00FF9C]/20">
                    {p.status}
                  </span>
                </div>
                <h3 className="text-xs font-bold text-white uppercase font-mono">{p.name}</h3>
                <p className="text-[11px] text-neutral-400 font-mono mt-1.5 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. FINANCIAL SERVICES */}
        <section className="mb-14">
          <div className="border-b border-white/5 pb-3 mb-6">
            <span className="text-[10px] font-mono font-bold text-[#00FF9C] uppercase tracking-wider block">Camada de Liquidez</span>
            <h2 className="text-sm font-black text-white uppercase tracking-widest">Financial Services</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {financialServices.map((p, i) => (
              <div key={i} className="bg-black/20 border border-white/5 rounded-xl p-4 font-mono">
                <p.icon size={14} className="text-neutral-400 mb-2" />
                <h3 className="text-xs font-bold text-neutral-200 uppercase">{p.name}</h3>
                <p className="text-[10px] text-neutral-500 mt-1 leading-normal">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. BLOCKCHAIN & AI SERVICES */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-14">
          <div>
            <div className="border-b border-white/5 pb-3 mb-4">
              <h2 className="text-xs font-black text-white uppercase tracking-widest">Blockchain Infra</h2>
            </div>
            <div className="flex flex-col gap-3">
              {blockchainServices.map((p, i) => (
                <div key={i} className="bg-white/[0.01] border border-white/5 rounded-xl p-3.5 flex gap-3 items-center">
                  <div className="p-2 bg-neutral-900 border border-white/5 rounded-lg text-neutral-400"><p.icon size={14} /></div>
                  <div>
                    <h3 className="text-xs font-bold text-white font-mono">{p.name}</h3>
                    <p className="text-[10px] text-neutral-500 font-mono">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="border-b border-white/5 pb-3 mb-4">
              <h2 className="text-xs font-black text-white uppercase tracking-widest">AI Services & Bots</h2>
            </div>
            <div className="flex flex-col gap-3">
              {aiServices.map((p, i) => (
                <div key={i} className="bg-white/[0.01] border border-white/5 rounded-xl p-3.5 flex gap-3 items-center">
                  <div className="p-2 bg-neutral-900 border border-white/5 rounded-lg text-purple-400"><p.icon size={14} /></div>
                  <div>
                    <h3 className="text-xs font-bold text-white font-mono">{p.name}</h3>
                    <p className="text-[10px] text-neutral-500 font-mono">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 6. MARKETPLACE & E-MARKETING */}
        <section className="mb-14">
          <div className="border-b border-white/5 pb-3 mb-6">
            <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-wider block">Comércio & Tráfego</span>
            <h2 className="text-sm font-black text-white uppercase tracking-widest">Marketplace & eMarketing Services</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {marketplaceMarketingServices.map((p, i) => (
              <div key={i} className="bg-gradient-to-br from-white/[0.02] to-transparent border border-white/5 rounded-2xl p-4 font-mono relative overflow-hidden group">
                <div className="absolute top-2 right-2 flex gap-1">
                  <span className="text-[8px] uppercase font-black px-1.5 py-0.5 rounded bg-neutral-800 text-[#D4AF37] border border-white/5">Soon</span>
                </div>
                <p.icon size={16} className="text-[#D4AF37] mb-2.5" />
                <h3 className="text-xs font-bold text-neutral-200 uppercase">{p.name}</h3>
                <p className="text-[10px] text-neutral-500 mt-1 leading-normal">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. SOCIAL & BUSINESS HUB */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
          <div className="bg-black/40 border border-white/5 p-5 rounded-2xl">
            <h3 className="text-xs font-black text-white uppercase font-mono tracking-wider mb-3 flex items-center gap-2">
              <Users size={14} className="text-neutral-400" /> Social Services (eSocial)
            </h3>
            <div className="grid grid-cols-1 gap-2.5">
              {socialServices.map((s, i) => (
                <div key={i} className="bg-neutral-900/50 p-3 rounded-xl border border-white/[0.02] font-mono text-[11px]">
                  <span className="text-neutral-200 font-bold block">{s.name}</span>
                  <span className="text-neutral-500 text-[10px]">{s.desc}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-black/40 border border-white/5 p-5 rounded-2xl">
            <h3 className="text-xs font-black text-white uppercase font-mono tracking-wider mb-3 flex items-center gap-2">
              <Building size={14} className="text-neutral-400" /> Business Suite
            </h3>
            <div className="grid grid-cols-1 gap-2.5">
              {businessServices.map((b, i) => (
                <div key={i} className="bg-neutral-900/50 p-3 rounded-xl border border-white/[0.02] font-mono text-[11px]">
                  <span className="text-neutral-200 font-bold block">{b.name}</span>
                  <span className="text-neutral-500 text-[10px]">{b.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 8. GOVERNANCE (DAO) */}
        <section className="bg-gradient-to-r from-neutral-950 to-neutral-900 border border-white/5 rounded-2xl p-5 mb-14 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="font-mono">
            <span className="text-[9px] uppercase font-black text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">DAO Stack</span>
            <h3 className="text-xs font-black text-white uppercase tracking-wider mt-2">Decentralized Governance</h3>
            <p className="text-[10px] text-neutral-400 mt-1 max-w-xl">
              Vote em propostas de atualização, configure novos parâmetros de mineração e audite a tesouraria descentralizada do ecossistema EdenKingDom.
            </p>
          </div>
          <button className="h-9 bg-neutral-900 border border-white/10 text-neutral-400 font-mono text-[10px] font-black uppercase tracking-wider px-4 rounded-lg cursor-not-allowed flex items-center gap-2">
            Governance Dashboard (Soon)
          </button>
        </section>

        {/* 9. ROADMAP (2026 TIMELINE) */}
        <section className="mb-16 font-mono">
          <div className="border-b border-white/5 pb-3 mb-8">
            <h2 className="text-sm font-black text-white uppercase tracking-widest">Evolution Roadmap (2026)</h2>
          </div>
          <div className="relative border-l border-white/10 ml-4 pl-6 flex flex-col gap-8">
            {[
              { phase: 'Q1 2026', title: 'Cloud Wallet & Security Architecture', desc: 'Lançamento estrutural da carteira, integração do gateway PayPal Express e auditorias de contratos.' },
              { phase: 'Q2 2026', title: 'Trading AI Deployment', desc: 'Conexão dos robôs de arbitragem híbrida e monitoramento automatizado de liquidez Binance/Bybit.' },
              { phase: 'Q3 2026', title: 'eDollar Algorithmic Peg & eMarketing v1', desc: 'Introdução da paridade eDollar e abertura da primeira camada de tráfego de anúncios Web3.' },
              { phase: 'Q4 2026', title: 'Super App Convergence', desc: 'Unificação dos módulos eSocial e Marketplace direto no dashboard da eCoin Cloud Wallet.' }
            ].map((r, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-[31px] top-1 w-2.5 h-2.5 rounded-full bg-[#D4AF37] border-2 border-neutral-950 shadow-[0_0_8px_rgba(214,175,55,0.6)]" />
                <span className="text-[10px] font-black text-[#D4AF37] uppercase">{r.phase}</span>
                <h4 className="text-xs font-bold text-white mt-0.5">{r.title}</h4>
                <p className="text-[10px] text-neutral-500 mt-1 max-w-2xl leading-normal">{r.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 10. FOOTER CTA */}
        <section className="w-full bg-gradient-to-b from-transparent to-white/[0.01] border border-white/5 rounded-3xl p-8 text-center relative overflow-hidden">
          <h2 className="text-md font-black text-white uppercase tracking-wider mb-2">
            Pronto para expandir os seus horizontes com a EdenKingDom?
          </h2>
          <p className="font-mono text-[11px] text-neutral-400 max-w-md mx-auto mb-6 leading-relaxed">
            Acesse o painel financeiro consolidado ou explore os detalhes técnicos e econômicos da nossa arquitetura.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <button 
              onClick={() => router.push('/eCoinCloudWallet')}
              className="h-9 bg-[#D4AF37] text-black font-mono font-black text-[10px] uppercase tracking-wider px-5 rounded-lg hover:brightness-110 transition-all"
            >
              Open Wallet
            </button>
            <button 
              onClick={() => router.push('/eCoinCloudWallet/buy')}
              className="h-9 bg-neutral-900 border border-white/10 text-white font-mono text-[10px] font-black uppercase tracking-wider px-5 rounded-lg hover:bg-neutral-800 transition-all"
            >
              Buy eCoin
            </button>
            <button 
            onClick={() => router.push('/whitepaper')}
            className="h-9 bg-transparent border border-white/5 text-neutral-500 font-mono text-[10px] font-black uppercase tracking-wider px-5 rounded-lg cursor-not-allowed flex items-center gap-1.5">
              Whitepaper <HelpCircle size={10} />
            </button>
          </div>
        </section>

      </PageContainer>
    </ResponsiveShell>
  );
}