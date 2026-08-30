"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  FaTelegramPlane, FaTelegram, FaWhatsapp, FaTwitter, FaDiscord 
} from "react-icons/fa";
import { 
  ShieldCheck, ArrowRight, Bot, Wallet, Layers, 
  TrendingUp, Coins, Cpu, CheckCircle2, BarChart3, PieChart,
  Download, Users, Network, ArrowDown, DollarSign, Lock
} from "lucide-react";

// Dados da Alocação de Compra do Commitment Seal (100%)
const seatAllocation = [
  { label: "Shareholder / Participant Distribution Pool", value: 30, color: "bg-[#D4AF37]" },
  { label: "Referral Network (3 Níveis)", value: 20, color: "bg-amber-500" },
  { label: "Treasury (Operacional & Estratégico)", value: 20, color: "bg-slate-400" },
  { label: "Liquidity & Reserves (Suporte de Mercado)", value: 20, color: "bg-yellow-600" },
  { label: "EcnTrading (Capital de Robôs)", value: 10, color: "bg-emerald-400" },
];

// Dados do Profit Pool (Lucros Realizados do ECNTrading - $1.000 Exemplo)
const profitPoolAllocation = [
  { label: "Mining Reward Pool", value: 20, amount: "$200", color: "text-[#D4AF37]" },
  { label: "EUSD Reward Pool", value: 10, amount: "$100", color: "text-blue-400" },
  { label: "Treasury", value: 10, amount: "$100", color: "text-slate-400" },
  { label: "Liquidity", value: 20, amount: "$200", color: "text-yellow-500" },
  { label: "Buy-Back / Market Support", value: 10, amount: "$100", color: "text-purple-400" },
  { label: "Trading Capital", value: 20, amount: "$200", color: "text-emerald-400" },
  { label: "Ecosystem Development", value: 10, amount: "$100", color: "text-pink-400" },
];

// Dados da Rede de Referência (20% do Seal)
const referralLevels = [
  { level: "Nível 1 - Seus amigos (diretos)", percent: "70%", desc: "Da parcela destinada ao Referral", color: "border-amber-500/40 bg-amber-500/10" },
  { level: "Nível 2 - Amigos dos seus amigos (indiretos)", percent: "25%", desc: "Da parcela destinada ao Referral", color: "border-[#D4AF37]/40 bg-[#D4AF37]/10" },
  { level: "Nível 3 - amigos dos seus amigos amigos deles (relativos)", percent: "5%", desc: "Da parcela destinada ao Referral", color: "border-yellow-600/40 bg-yellow-600/10" },
];

export default function HowAiMiningWorksPage() {
  const handleDownloadPDF = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-gray-200 overflow-hidden py-16 px-4 md:px-12 font-sans print:bg-white print:text-black">
      
      {/* Estilos específicos para a geração de PDF/Impressão */}
      <style jsx global>{`
        @media print {
          body { background: white !important; color: black !important; }
          .no-print { display: none !important; }
          .print-border { border: 1px solid #ccc !important; background: #fff !important; color: #000 !important; }
          .print-text { color: #000 !important; }
        }
      `}</style>

      {/* 🌟 FUNDO AMBIENTE DOURADO / PREMIUM */}
      <div className="absolute inset-0 pointer-events-none no-print">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-[#D4AF37]/10 blur-[150px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-yellow-600/10 blur-[120px] rounded-full mix-blend-screen" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto space-y-16">
        
        {/* BOTÃO DE DOWNLOAD PDF */}
        <div className="flex justify-end no-print">
          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#D4AF37] text-black font-bold text-sm shadow-lg hover:bg-yellow-400 transition-all duration-300"
          >
            <Download size={18} />
            Baixar em PDF
          </button>
        </div>

        {/* CABEÇALHO DA PÁGINA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] text-xs md:text-sm font-bold tracking-wider uppercase mb-4 backdrop-blur-md print-border print-text">
            <Coins size={16} />
            Infraestrutura Econômica E-Coin
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-white mb-2 tracking-tight print-text">
            eCoin Economic Participant
          </h1>
          <h2 className="text-xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-yellow-600 mb-6 print-text">
            eCoin Holder Seat
          </h2>

          <div className="bg-white/[0.03] border border-white/10 p-6 rounded-2xl max-w-3xl mx-auto space-y-3 backdrop-blur-sm print-border">
            <p className="text-base md:text-lg text-gray-200 font-medium leading-relaxed print-text">
              Compre os seus E-Coin no mercado → e tornar-se o E-Coin ShareHolder adquirindo um Holder Seat ao Reter os seus eCoins adquiridos no mercado pelo botão <span className="text-[#D4AF37] font-bold">Reter Ativos eCoin</span>.
            </p>
            <p className="text-sm md:text-base text-gray-400 font-light print-text">
              E de seguida compre o <strong className="text-white">eCoin ShareHolder Temporal Commitment Seal</strong>.
            </p>
          </div>
        </motion.div>

        {/* 🔄 FLUXO LÓGICO PASSO A PASSO */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white print-text">Lógica Operacional do Ecossistema</h3>
            <p className="text-xs text-gray-400 print-text">A jornada do participante até a capacidade de recompensa econômica</p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            
            {/* PASSO 1 */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col md:flex-row items-start md:items-center gap-4 print-border">
              <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-600 text-slate-300 flex items-center justify-center font-bold text-lg shrink-0">
                1
              </div>
              <div>
                <h4 className="text-lg font-bold text-white print-text">Comprar E-Coin no mercado</h4>
                <p className="text-sm text-gray-400 mt-1 print-text">
                  Torna-se um <strong className="text-gray-200">E-Coin Holder normal</strong> sem participação econômica e sem ganhos de rendimentos enquanto holder de ecoins.
                </p>
              </div>
            </div>

            <div className="flex justify-center -my-3 no-print">
              <ArrowDown className="text-[#D4AF37]" size={24} />
            </div>

            {/* PASSO 2 */}
            <div className="p-6 md:p-8 rounded-2xl bg-[#D4AF37]/5 border border-[#D4AF37]/20 space-y-6 print-border">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#D4AF37] text-black flex items-center justify-center font-bold text-lg shrink-0">
                  2
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white print-text">Reter / Stakear E-Coin</h4>
                  <p className="text-sm text-gray-300 mt-1 print-text">
                    Demonstrar compromisso com o ecossistema. Isso te torna um <strong>ShareHolder da eCoin</strong>. Ao reter os seus eCoin você adquire o distintivo de participação e mostra de imediato sua percentagem de participação na economia produtiva da eCoin.
                  </p>
                </div>
              </div>

              {/* EXEMPLO DE CÁLCULO ALICE & BOB */}
              <div className="bg-black/60 border border-white/10 p-6 rounded-xl space-y-4 print-border">
                <div className="flex items-center gap-2 text-[#D4AF37] font-bold text-sm">
                  <PieChart size={18} /> Exemplo Prático de Participação Elegível:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                    <span className="text-gray-400 block">Alice</span>
                    <strong className="text-white text-sm">10.000 E-Coin elegíveis</strong>
                    <span className="text-[#D4AF37] block mt-1 font-bold">≈ 33,33% de participação</span>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                    <span className="text-gray-400 block">Bob</span>
                    <strong className="text-white text-sm">20.000 E-Coin elegíveis</strong>
                    <span className="text-[#D4AF37] block mt-1 font-bold">≈ 66,67% de participação</span>
                  </div>
                </div>
                <p className="text-xs text-gray-400 italic print-text">
                  A distribuição depende da quantidade efetivamente elegível e dos fundos de recompensa disponíveis.
                </p>

                <hr className="border-white/10" />

                {/* EXEMPLO DE REPASSE INSTANTÂNEO */}
                <div className="space-y-3 text-xs text-gray-300 leading-relaxed print-text">
                  <div className="font-bold text-white text-sm">Distribuição Instantânea de Lucros (Exemplo $1.000):</div>
                  <p>
                    Se o <strong>Bob</strong> detiver uma participação de <strong>10% no Smart AI Pool</strong> e o robô gerar um lucro imediato de <strong>US$ 1.000</strong>, <strong>US$ 100</strong> serão repassados automaticamente ao Bob.
                  </p>
                  <p>
                    Os <strong>US$ 900 restantes</strong> também serão distribuídos instantaneamente entre os demais participantes da tabela de acionistas:
                  </p>
                  <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-center font-mono py-2">
                    <li className="p-2 bg-white/5 rounded border border-white/5">3% no pool = <strong>US$ 30</strong></li>
                    <li className="p-2 bg-white/5 rounded border border-white/5">5% no pool = <strong>US$ 50</strong></li>
                    <li className="p-2 bg-white/5 rounded border border-white/5">50% no pool = <strong>US$ 500</strong></li>
                    <li className="p-2 bg-white/5 rounded border border-white/5">Alice (1%) = <strong>US$ 10</strong></li>
                    <li className="p-2 bg-white/5 rounded border border-white/5">0,1% no pool = <strong>US$ 1</strong></li>
                    <li className="p-2 bg-white/5 rounded border border-white/5">0,0001% = <strong>Proporcional</strong></li>
                  </ul>
                  <p className="text-[#D4AF37] font-semibold">
                    Tudo isso de maneira imediata e instantânea.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center -my-3 no-print">
              <ArrowDown className="text-[#D4AF37]" size={24} />
            </div>

            {/* PASSO 3 */}
            <div className="p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/10 space-y-6 print-border">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-black flex items-center justify-center font-bold text-lg shrink-0">
                  3
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white print-text">Comprar um Commitment Seal (CS)</h4>
                  <p className="text-sm text-gray-300 mt-1 print-text">
                    Adquirir uma capacidade econômica temporária. Depois de ter retido os seus ativos eCoin e ganho posição como ShareHolder, o Seal determina a capacidade máxima de recompensa daquele ciclo.
                  </p>
                </div>
              </div>

              {/* EXEMPLO COMMITMENT SEAL $100 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-black/40 border border-white/5 rounded-xl space-y-2 print-border">
                  <span className="font-bold text-[#D4AF37] block text-sm">Exemplo Seal $100:</span>
                  <p className="text-gray-300 print-text">
                    <strong>$100 Commitment Seal</strong> → Capacidade máxima do ciclo = <strong>$130</strong>
                  </p>
                  <ul className="space-y-1 text-gray-400 list-disc list-inside print-text">
                    <li><strong>$100</strong> = Referência de capital/commitment associado ao Seat.</li>
                    <li><strong>Até $30</strong> = Recompensa econômica máxima daquele ciclo (lucro proveniente do fluxo de caixa do ecossistema).</li>
                  </ul>
                  <p className="text-[11px] text-gray-400 mt-2 print-text">
                    Fontes do fluxo: 30% da compra de novos Seals, Trading Robots em DEX, ecGas em CEX, fees de saque e fees de compra de Seal.
                  </p>
                </div>

                <div className="p-4 bg-black/40 border border-white/5 rounded-xl space-y-2 print-border">
                  <span className="font-bold text-white block text-sm">Valores de Seats Seals (selos de compromisso) Disponíveis:</span>
                  <div className="flex flex-wrap gap-2 py-1 font-mono">
                    {["$0.0001", "$0.10", "$1", "$10", "$100", "$1.000", "etc."].map((v, i) => (
                      <span key={i} className="px-2.5 py-1 bg-white/5 border border-white/10 rounded text-amber-400 font-bold">
                        {v}
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-300 print-text">
                    <strong>Regra Multi-Seal:</strong> Se comprar Seal #1 ($100) + Seal #2 ($100), terá <strong>$200 de Seat Capacity</strong> e capacidade máxima agregada de <strong>$260</strong>.
                  </p>
                  <p className="text-[11px] text-gray-400 italic print-text">
                    Uma única carteira Web3 pode adquirir apenas 1 Seat único dentro da blockchain via smart contract, agregando múltiplos Seals dentro dele.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </motion.div>

        {/* 📊 SEÇÃO: ALOCAÇÃO DA COMPRA DO COMMITMENT SEAL (100%) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 md:p-12 rounded-[2.5rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/10 relative overflow-hidden print-border"
        >
          <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-3">
              <PieChart className="text-[#D4AF37]" size={30} />
              <div>
                <h2 className="text-2xl font-bold text-white print-text">Distribuição dos 100% da Compra do Selo de Compromisso</h2>
                <p className="text-xs text-gray-400 print-text">Destinação transparente do fluxo financeiro gerado na aquisição de Selos de Compromisso pelos acionistas do ecossistema eCoin.</p>
              </div>
            </div>
          </div>

          {/* Barra Visual de Distribuição */}
          <div className="h-4 w-full rounded-full overflow-hidden flex bg-white/5 mb-8 p-0.5 border border-white/10 no-print">
            {seatAllocation.map((item, idx) => (
              <div 
                key={idx} 
                className={`${item.color} h-full transition-all duration-500 hover:opacity-80`} 
                style={{ width: `${item.value}%` }} 
                title={`${item.label}: ${item.value}%`}
              />
            ))}
          </div>

          {/* Grid com os Percentuais */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {seatAllocation.map((item, idx) => (
              <div key={idx} className="bg-black/40 border border-white/5 p-4 rounded-2xl flex flex-col justify-between print-border">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`w-3 h-3 rounded-full ${item.color} shrink-0`} />
                  <span className="text-xl font-black text-white print-text">{item.value}%</span>
                </div>
                <span className="text-xs text-gray-400 font-medium leading-tight print-text">{item.label}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 text-center text-xs text-gray-400 font-mono print-text">
            Total: 20% + 30% + 20% + 20% + 10% = 100%
          </div>
        </motion.div>

        {/* 🤖 SEÇÃO: ENGINE ECNTRADING & PROFIT POOL */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 md:p-12 rounded-[2.5rem] bg-gradient-to-br from-[#D4AF37]/10 to-transparent border border-[#D4AF37]/20 relative overflow-hidden print-border"
        >
          <div className="flex items-center gap-3 mb-8 relative z-10">
            <Cpu className="text-[#D4AF37]" size={32} />
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white print-text">EcnTrading & Profit Pool</h2>
              <p className="text-xs text-gray-400 print-text">Operações algorítmicas de arbitragem e geração de rendimento real.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10 mb-8">
            
            {/* DEX Market */}
            <div className="bg-black/30 p-6 rounded-2xl border border-white/5 space-y-3 print-border">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h4 className="text-white font-bold text-base print-text">EcnTrading DEX Market</h4>
                <span className="text-[10px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-mono">DEX On-Chain</span>
              </div>
              <ul className="space-y-2 text-xs text-gray-300 font-light print-text">
                <li className="flex items-center gap-2"><span className="text-[#D4AF37]">✦</span> Robôs negociam através de Decentralized Exchanges (DEX).</li>
                <li className="flex items-center gap-2"><span className="text-[#D4AF37]">✦</span> Atuação direta em Trading Pools e liquidez on-chain.</li>
                <li className="flex items-center gap-2"><span className="text-[#D4AF37]">✦</span> Execução em todos os mercados onde a E-Coin esteja listada.</li>
              </ul>
            </div>

            {/* CEX Market */}
            <div className="bg-black/30 p-6 rounded-2xl border border-white/5 space-y-3 print-border">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h4 className="text-white font-bold text-base print-text">EcnTrading CEX Market</h4>
                <span className="text-[10px] bg-blue-500/10 border border-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full font-mono">CEX Automation</span>
              </div>
              <ul className="space-y-2 text-xs text-gray-300 font-light print-text">
                <li className="flex items-center gap-2"><span className="text-[#D4AF37]">✦</span> Conexão via API Keys e Secret Keys.</li>
                <li className="flex items-center gap-2"><span className="text-[#D4AF37]">✦</span> Operações automatizadas em contas de exchanges centralizadas.</li>
                <li className="flex items-center gap-2"><span className="text-[#D4AF37]">✦</span> Estratégias automatizadas de alta frequência em CEX.</li>
              </ul>
            </div>

          </div>

          {/* Profit Pool Table ($1,000 Exemplo) */}
          <div className="bg-black/40 border border-white/10 rounded-2xl p-6 relative z-10 space-y-4 print-border">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <BarChart3 size={18} className="text-[#D4AF37]" />
                <h4 className="text-white font-bold text-sm print-text">Distribuição do Profit Pool (Exemplo de $1.000 de Lucro Realizado DEX)</h4>
              </div>
              <span className="text-xs font-mono text-[#D4AF37] font-bold">Total: $1.000 (100%)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              {profitPoolAllocation.map((item, i) => (
                <div key={i} className="p-3 bg-white/[0.02] border border-white/5 rounded-xl flex flex-col justify-between print-border">
                  <span className="text-gray-400 text-[11px] print-text">{item.label}</span>
                  <div className="flex items-center justify-between mt-2">
                    <span className={`text-base font-extrabold ${item.color} print-text`}>{item.value}%</span>
                    <span className="font-mono text-white font-bold print-text">{item.amount}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ciclo Sustentável */}
          <div className="mt-6 p-4 rounded-xl bg-black/50 border border-white/5 text-xs text-gray-300 leading-relaxed space-y-2 print-border">
            <span className="font-bold text-[#D4AF37] block">Ciclo Econômico Fechado:</span>
            <p className="print-text">
              Commitment Seal Purchases → alimentam o sistema → 10% EcnTrading → Trading Robot → lucro realizado → Profit Pool → distribuição / reinvestimento → fortalecimento de Liquidity + Treasury + Trading Capital + Rewards.
            </p>
          </div>
        </motion.div>

        {/* 👥 SEÇÃO: REFERRAL SYSTEM (3 NÍVEIS ON-CHAIN) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 md:p-12 rounded-[2.5rem] bg-white/[0.02] border border-white/10 space-y-6 print-border"
        >
          <div className="flex items-center gap-3">
            <Users className="text-amber-500" size={30} />
            <div>
              <h2 className="text-2xl font-bold text-white print-text">Referral System (Infraestrutura On-Chain)</h2>
              <p className="text-xs text-gray-400 print-text">
                Infraestrutura on-chain de relacionamento entre utilizadores. 20% do valor de cada Commitment Seal é distribuído instantaneamente em 3 níveis.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {referralLevels.map((lvl, idx) => (
              <div key={idx} className={`p-6 rounded-2xl border ${lvl.color} space-y-2 print-border`}>
                <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block print-text">{lvl.level}</span>
                <div className="text-3xl font-black text-white print-text">{lvl.percent}</div>
                <p className="text-xs text-gray-300 print-text">{lvl.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-xs text-gray-400 text-center font-mono pt-2 print-text">
            Total: 70% + 25% + 5% = 100% dos 20% da parcela destinada ao Referral Network.
          </p>
        </motion.div>

        {/* 🔗 SEÇÃO: LINKS DE NAVEGAÇÃO RÁPIDA */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 no-print">
          <a 
            href="https://ecoin.edenkingdom.org/ecoin-ai-trading" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex flex-col items-center justify-center gap-3 p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/30 transition-all duration-300"
          >
            <Bot size={32} className="text-[#D4AF37] group-hover:scale-110 transition-transform" />
            <span className="font-semibold text-white">ECNTrading Engine</span>
            <span className="text-xs text-gray-500 flex items-center gap-1">Acessar painel <ArrowRight size={12} /></span>
          </a>

          <a 
            href="https://ecoin.edenkingdom.org/Mining" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex flex-col items-center justify-center gap-3 p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/30 transition-all duration-300"
          >
            <Wallet size={32} className="text-[#D4AF37] group-hover:scale-110 transition-transform" />
            <span className="font-semibold text-white">Painel de Seats & Staking</span>
            <span className="text-xs text-gray-500 flex items-center gap-1">Gerenciar Seats <ArrowRight size={12} /></span>
          </a>

          <a 
            href="https://chat.whatsapp.com/G1F6USX5NrrLKikm7yiXXQ?s=cl&p=a&mlu=1&amv=0" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex flex-col items-center justify-center gap-3 p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/30 transition-all duration-300"
          >
            <FaWhatsapp size={32} className="text-[#D4AF37] group-hover:scale-110 transition-transform" />
            <span className="font-semibold text-white">Comunidade de Participantes</span>
            <span className="text-xs text-gray-500 flex items-center gap-1">Entrar no Grupo <ArrowRight size={12} /></span>
          </a>
        </div>

        {/* 🌐 SEÇÃO: REDES SOCIAIS OFICIAIS */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="pt-10 border-t border-white/10 text-center no-print"
        >
          <h3 className="text-xs font-bold text-white mb-6 uppercase tracking-widest">
            Canais Oficiais <span className="text-[#D4AF37]">E-Coin</span> Protocol
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://t.me/ecoin2026" target="_blank" rel="noopener noreferrer" className="p-4 rounded-full bg-white/5 border border-white/10 hover:bg-[#D4AF37] hover:text-black hover:scale-110 transition-all duration-300 text-[#D4AF37]">
              <FaTelegramPlane size={22} />
            </a>
            <a href="https://t.me/ecoin2025" target="_blank" rel="noopener noreferrer" className="p-4 rounded-full bg-white/5 border border-white/10 hover:bg-[#D4AF37] hover:text-black hover:scale-110 transition-all duration-300 text-[#D4AF37]">
              <FaTelegram size={22} />
            </a>
            <a href="https://x.com/CoinE28810?t=Dm9BWORAfzh5YcuqHYIUwQ&s=09" target="_blank" rel="noopener noreferrer" className="p-4 rounded-full bg-white/5 border border-white/10 hover:bg-[#D4AF37] hover:text-black hover:scale-110 transition-all duration-300 text-[#D4AF37]">
              <FaTwitter size={22} />
            </a>
            <a href="https://discord.com/users/1443996675638300834" target="_blank" rel="noopener noreferrer" className="p-4 rounded-full bg-white/5 border border-white/10 hover:bg-[#D4AF37] hover:text-black hover:scale-110 transition-all duration-300 text-[#D4AF37]">
              <FaDiscord size={22} />
            </a>
            <a href="https://chat.whatsapp.com/G1F6USX5NrrLKikm7yiXXQ" target="_blank" rel="noopener noreferrer" className="p-4 rounded-full bg-white/5 border border-white/10 hover:bg-[#D4AF37] hover:text-black hover:scale-110 transition-all duration-300 text-[#D4AF37]">
              <FaWhatsapp size={22} />
            </a>
          </div>
        </motion.div>

      </div>
    </div>
  );
}