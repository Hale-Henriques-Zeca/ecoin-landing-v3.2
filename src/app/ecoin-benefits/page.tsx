"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Coins, 
  ArrowRightLeft, 
  ShieldCheck, 
  Cpu, 
  Wallet, 
  Zap, 
  ExternalLink,
  Layers,
  Activity,
  CheckCircle2
} from "lucide-react";
import CryptoHistoricalExample from "@/components/CryptoHistoricalExample";

export default function ECoinBenefitsInfo() {
  return (
    <main className="min-h-screen bg-[#020617] text-white flex flex-col selection:bg-[#D4AF37] selection:text-black">

      {/* ================= HERO ================= */}
      <section className="relative flex-1 flex items-center justify-center px-6 py-28 overflow-hidden">
        {/* Background Futurista & Gradientes Enterprise */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#D4AF37]/10 rounded-full blur-[150px]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
        </div>

        <div className="relative z-10 max-w-4xl text-center">
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-mono tracking-[0.3em] uppercase mb-6 shadow-[0_0_20px_rgba(212,175,55,0.2)]"
          >
            <Zap size={14} className="animate-pulse" />
            <span>EdenKingDom Protocol</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black italic tracking-tight mb-8 leading-tight"
          >
            💎 <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-yellow-400 to-[#F3BA2F]">Vantagens de Utilizar a eCoin</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 max-w-2xl mx-auto mb-6 text-base md:text-lg font-light leading-relaxed"
          >
            A <strong>E-Coin</strong> foi concebida para oferecer múltiplas fontes
            de rendimento dentro do ecossistema digital. Utilizadores e investidores
            podem beneficiar através de diferentes mecanismos de valorização,
            participação económica e utilidade dentro da plataforma.
          </motion.p>

          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base font-light leading-relaxed"
          >
            O modelo económico da E-Coin permite que os participantes
            obtenham valor através da valorização do token, staking e
            negociação entre utilizadores dentro da própria comunidade.
          </motion.p>
        </div>
      </section>

      {/* ================= BENEFITS (Com Ilustrações e Cards Dinâmicos) ================= */}
      <section className="py-24 px-6 bg-[#0a0f1d] relative border-t border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center mb-16">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#D4AF37] block mb-2">
              Ecosystem Utility
            </span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white">
              Formas de ganhar com a E-Coin
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1: Valorização */}
            <motion.div 
              whileHover={{ y: -6 }}
              className="relative rounded-3xl bg-gradient-to-b from-zinc-900/90 to-black/90 border border-[#D4AF37]/30 p-8 shadow-2xl overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#D4AF37] to-amber-500" />
              <div className="p-4 rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 w-fit mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp size={28} />
              </div>

              <h3 className="text-xl font-bold mb-3 text-white">
                1️⃣ Valorização da E-Coin
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 font-light">
                Investidores podem adquirir E-Coin em fases iniciais
                a preços mais baixos e beneficiar da valorização futura
                do token dentro do ecossistema.
              </p>

              {/* Bloco Ilustrativo / Métricas */}
              <div className="space-y-2 p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-xs font-mono">
                <div className="flex justify-between items-center text-gray-300">
                  <span>Compra inicial:</span>
                  <strong className="text-[#D4AF37]">$1</strong>
                </div>
                <div className="flex justify-between items-center text-gray-300">
                  <span>Valorização futura:</span>
                  <strong className="text-emerald-400">$10</strong>
                </div>
                <div className="pt-2 border-t border-white/10 text-center text-[#D4AF37] font-bold">
                  💰 Potencial de crescimento até 10x
                </div>
              </div>
            </motion.div>

            {/* Card 2: Staking */}
            <motion.div 
              whileHover={{ y: -6 }}
              className="relative rounded-3xl bg-gradient-to-b from-zinc-900/90 to-black/90 border border-[#D4AF37]/30 p-8 shadow-2xl overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-[#D4AF37]" />
              <div className="p-4 rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 w-fit mb-6 group-hover:scale-110 transition-transform">
                <Coins size={28} />
              </div>

              <h3 className="text-xl font-bold mb-3 text-white">
                2️⃣ Rendimentos via Staking
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 font-light">
                Utilizadores podem bloquear E-Coin em staking para apoiar
                o funcionamento do ecossistema e receber recompensas periódicas.
              </p>

              {/* Bloco Ilustrativo / Métricas */}
              <div className="space-y-2 p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-xs font-mono">
                <div className="flex justify-between items-center text-gray-300">
                  <span>Exemplo de investimento:</span>
                  <strong className="text-white">1000 E-Coin</strong>
                </div>
                <div className="flex justify-between items-center text-gray-300">
                  <span>Recompensa estimada:</span>
                  <strong className="text-emerald-400">+100 moedas</strong>
                </div>
                <div className="pt-2 border-t border-white/10 text-center text-[#D4AF37] font-bold">
                  💰 Rendimento passivo contínuo
                </div>
              </div>
            </motion.div>

            {/* Card 3: Arbitragem */}
            <motion.div 
              whileHover={{ y: -6 }}
              className="relative rounded-3xl bg-gradient-to-b from-zinc-900/90 to-black/90 border border-[#D4AF37]/30 p-8 shadow-2xl overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-yellow-600" />
              <div className="p-4 rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 w-fit mb-6 group-hover:scale-110 transition-transform">
                <ArrowRightLeft size={28} />
              </div>

              <h3 className="text-xl font-bold mb-3 text-white">
                3️⃣ Arbitragem e Liquidez
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 font-light">
                Dentro da comunidade pode existir procura direta por E-Coin,
                criando oportunidades de negociação e arbitragem entre utilizadores.
              </p>

              {/* Bloco Ilustrativo / Métricas */}
              <div className="space-y-2 p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-xs font-mono">
                <div className="flex justify-between items-center text-gray-300">
                  <span>Preço de compra:</span>
                  <strong className="text-[#D4AF37]">$1</strong>
                </div>
                <div className="flex justify-between items-center text-gray-300">
                  <span>Venda direta:</span>
                  <strong className="text-emerald-400">$1.10 – $1.20</strong>
                </div>
                <div className="pt-2 border-t border-white/10 text-center text-[#D4AF37] font-bold">
                  💰 Lucro rápido via spread
                </div>
              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* ================= BENEFITS Examples ================= */}
      <section className="py-20 px-6 bg-[#020617] text-gray-300">
        <div className="max-w-5xl mx-auto flex flex-col items-center space-y-20">
          <CryptoHistoricalExample />
        </div>
      </section>
      
      {/* ================= STAKING INFO ================= */}
      <section className="py-24 px-6 bg-gradient-to-b from-[#020617] to-[#0a0f1d] relative text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono">
            <Activity size={14} />
            <span>Atividade Económica Real</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            Ganhe diariamente com o staking de eCoin
          </h2>

          <p className="text-gray-300 text-base md:text-lg font-light leading-relaxed">
            O ecossistema E-Coin foi projetado para recompensar as pessoas
            que participam de sua economia. Ao fazer staking de E-Coin,
            você passa a fazer parte de um fluxo contínuo de recompensas
            impulsionado pela atividade real da plataforma.
          </p>

          <p className="text-gray-400 text-sm md:text-base font-light leading-relaxed">
            Diferentemente de projetos que prometem retornos fixos,
            as recompensas da E-Coin provêm da atividade económica
            real que ocorre dentro do sistema em tempo real.
          </p>

          <div className="inline-block mt-4 px-6 py-3 rounded-2xl bg-white/[0.03] border border-[#D4AF37]/30 text-white font-mono text-sm shadow-xl">
            Minimum de saque ou claim: <span className="text-[#D4AF37] font-bold">0.01 – 0.003</span>
          </div>

        </div>
      </section>

      {/* ================= HOW TO START ================= */}
      <section className="py-24 px-6 bg-[#0a0f1d] border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-16">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#D4AF37] block mb-2">
              Onboarding Guide
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              O que você precisa para começar
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            
            <div className="flex items-start gap-4 p-6 rounded-2xl bg-white/[0.02] border border-white/10">
              <div className="p-3 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20">
                <Wallet size={24} />
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">1️⃣ Carteira Descentralizada</h4>
                <p className="text-sm text-gray-400 font-light">Instalar uma carteira Web3 compatível como <strong>eCoin Cloud Wallet (carteira nativa✅)</strong>.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 rounded-2xl bg-white/[0.02] border border-white/10">
              <div className="p-3 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20">
                <Layers size={24} />
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">2️⃣ Rede BEP-20</h4>
                <p className="text-sm text-gray-400 font-light">Adicionar a rede <strong>BNB Smart Chain (BEP-20)</strong> à sua carteira.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 rounded-2xl bg-white/[0.02] border border-white/10">
              <div className="p-3 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20">
                <Cpu size={24} />
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">3️⃣ Taxas de Gás</h4>
                <p className="text-sm text-gray-400 font-light">Manter uma pequena quantidade de <strong>BNB</strong> (menos de $0.50 geralmente basta).</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 rounded-2xl bg-white/[0.02] border border-white/10">
              <div className="p-3 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h4 className="font-bold text-white mb-1">4️⃣ Capital Inicial em USDT</h4>
                <p className="text-sm text-gray-400 font-light">Depositar algum <strong>USDT (BEP-20)</strong> — $5 ou $10 já são suficientes para iniciar.</p>
              </div>
            </div>

          </div>

          {/* Sub-fluxo "Depois disso" estilizado */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-zinc-900 to-black border border-[#D4AF37]/30 text-center shadow-2xl">
            <h3 className="text-lg font-bold text-[#D4AF37] mb-6 uppercase tracking-wider font-mono">
              Depois disso:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-300">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center gap-2">
                <CheckCircle2 size={16} className="text-[#D4AF37]" />
                <span>Acesse a plataforma</span>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center gap-2">
                <CheckCircle2 size={16} className="text-[#D4AF37]" />
                <span>Converta <strong>USDT → E-Coin</strong></span>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center gap-2">
                <CheckCircle2 size={16} className="text-[#D4AF37]" />
                <span>Faça staking de seus E-Coin</span>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center gap-2">
                <CheckCircle2 size={16} className="text-[#D4AF37]" />
                <span>Comece a ganhar</span>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* ================= PANCAKESWAP PANEL ================= */}
      <section className="py-24 px-6 text-center relative overflow-hidden bg-[#020617]">
        <div className="max-w-3xl mx-auto">
          <div className="relative rounded-[2.5rem] bg-gradient-to-b from-zinc-900/95 to-black/95 border border-[#D4AF37]/40 p-10 text-center shadow-[0_0_50px_rgba(212,175,55,0.15)] overflow-hidden">
            
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#D4AF37] via-yellow-400 to-[#D4AF37]" />

            <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-[#D4AF37] block mb-3">
              PancakeSwap Liquidity Pool
            </span>

            <h3 className="text-2xl font-black text-white mb-4 italic">
              Obter E-Coin convertendo USDT / E-Coin no Pair — PancakeSwap
            </h3>

            <p className="mb-8 text-gray-300 text-sm md:text-base font-light">
              The E-Coin pair is already pre-listed on PancakeSwap.
            </p>

            <a
              href="https://pancakeswap.finance/swap?chain=bsc&inputCurrency=0x55d398326f99059fF775485246999027B3197955&outputCurrency=0xDf69235019cc416dd5Be75dfc0eDc922aB4b5964"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#D4AF37] via-yellow-500 to-[#D4AF37] text-black font-black uppercase tracking-widest text-sm rounded-full hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:shadow-none"
            >
              <span>Access USDT / E-Coin Pair</span>
              <ExternalLink size={18} />
            </a>

          </div>
        </div>
      </section>

    </main>
  );
}