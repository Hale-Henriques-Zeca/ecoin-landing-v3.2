"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Cpu, 
  Zap, 
  ShieldCheck, 
  Coins, 
  ArrowRight, 
  CheckCircle2, 
  Globe2, 
  Workflow,
  Sparkles,
  TrendingUp,
  Activity,
  Layers,
  Lock,
  RefreshCw,
  Server
} from "lucide-react";

export default function ECoinSmartPoolsExplanation() {
  return (
    <section className="relative bg-[#020204] text-white py-32 px-4 sm:px-6 overflow-hidden">
      
      {/* BACKGROUND EFFECTS PREMIUM COM TOQUE GOLD & CYAN */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] sm:w-[1000px] h-[500px] sm:h-[700px] bg-amber-500/10 rounded-full blur-[180px]" />
        <div className="absolute top-1/2 left-10 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[160px]" />
        <div className="absolute bottom-10 right-10 w-[500px] sm:w-[800px] h-[500px] sm:h-[800px] bg-emerald-500/10 rounded-full blur-[170px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#121216_1px,transparent_1px),linear-gradient(to_bottom,#121216_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-25" />
      </div>

      <div className="max-w-6xl mx-auto text-center">

        {/* HEADER BADGE GOLD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs sm:text-sm font-mono tracking-widest uppercase mb-6 shadow-[0_0_25px_rgba(245,158,11,0.15)]"
        >
          <Sparkles size={15} className="text-amber-400 animate-pulse" />
          <span>eCoin Protocol Architecture & Gold Standard</span>
        </motion.div>

        {/* TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-cyan-400 mb-6 tracking-tight leading-tight"
        >
          eCoin AI Smart Reward Infrastructure
        </motion.h1>

        <p className="text-gray-300 max-w-3xl mx-auto text-base sm:text-lg mb-16 leading-relaxed font-light">
          A infraestrutura inteligente da eCoin foi construída para distribuir
          liquidez, estabilidade e recompensas através de <span className="text-amber-400 font-medium">Smart Pools</span>,
          <span className="text-cyan-400 font-medium"> Reward Streams</span> e mecanismos automáticos alimentados pelas taxas
          internas do ecossistema, <span className="text-yellow-400 font-medium">ecGas</span> e roteamento dinâmico de liquidez.
        </p>

        {/* ================= EXPLANATION SECTION ================= */}
        <div className="mt-16 text-gray-300 max-w-5xl mx-auto space-y-12 text-left">

          {/* CARD 1: O que são os AI Smart Reward Pools? */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative rounded-3xl border border-amber-500/30 bg-gradient-to-b from-zinc-900/90 to-black/95 p-6 sm:p-10 backdrop-blur-xl shadow-2xl shadow-amber-950/30 overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-amber-400 to-yellow-600" />
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                <Cpu size={28} />
              </div>
              <h3 className="text-amber-400 font-bold text-xl sm:text-2xl">
                ⚡ O que são os AI Smart Reward Pools?
              </h3>
            </div>
            
            <p className="leading-relaxed text-gray-300 text-base sm:text-lg font-light mb-6">
              Os AI Smart Reward Pools são pools inteligentes de distribuição
              de liquidez e recompensas contínuas alimentados automaticamente
              por taxas do ecossistema, reciclagem de claims, treasury routing,
              ecGas e streams de liquidez protocolar.
            </p>

            {/* GRÁFICO ILUSTRATIVO EXPLANATIVO 1: Fontes de Alimentação do Pool */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6 p-4 rounded-2xl bg-black/60 border border-amber-500/20">
              <div className="p-3 rounded-xl bg-zinc-900/80 border border-amber-500/10 text-center">
                <RefreshCw className="mx-auto text-amber-400 mb-2" size={20} />
                <span className="text-xs text-gray-300 font-medium block">Taxas & Reciclagem</span>
              </div>
              <div className="p-3 rounded-xl bg-zinc-900/80 border border-amber-500/10 text-center">
                <Server className="mx-auto text-cyan-400 mb-2" size={20} />
                <span className="text-xs text-gray-300 font-medium block">Treasury Routing</span>
              </div>
              <div className="p-3 rounded-xl bg-zinc-900/80 border border-amber-500/10 text-center">
                <Zap className="mx-auto text-yellow-400 mb-2" size={20} />
                <span className="text-xs text-gray-300 font-medium block">ecGas Engine</span>
              </div>
              <div className="p-3 rounded-xl bg-zinc-900/80 border border-amber-500/10 text-center">
                <Activity className="mx-auto text-emerald-400 mb-2" size={20} />
                <span className="text-xs text-gray-300 font-medium block">Liquidity Streams</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-amber-400 mt-2 shrink-0 animate-ping" />
              <p className="text-sm text-amber-200/90 italic font-medium">
                “Ao invés de depender de campanhas manuais de Buy-Back,
                o protocolo opera através de mecanismos autônomos de estabilidade
                e streaming financeiro on-chain.”
              </p>
            </div>
          </motion.div>

          {/* SLOGAN FINAL 1 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="my-10 text-center py-8 px-6 rounded-3xl bg-gradient-to-r from-amber-950/20 via-amber-500/10 to-cyan-950/20 border border-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.1)]"
          >
            <p className="text-amber-400 font-bold italic text-lg sm:text-xl leading-relaxed tracking-wide">
              “Quando o mercado oscila, a infraestrutura responde.<br className="hidden sm:inline" />
              A E-Coin transforma participação em estabilidade,<br className="hidden sm:inline" />
              e estabilidade em oportunidade sustentável.”
            </p>
          </motion.div>

          {/* CARD 2: Muito além de pagamentos e trading (GRID PREMIUM DE BENEFÍCIOS) */}
          <div className="relative rounded-3xl border border-amber-500/30 bg-gradient-to-b from-zinc-900/90 to-black/95 p-6 sm:p-10 backdrop-blur-xl shadow-2xl overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-cyan-400 to-emerald-500" />
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                <Globe2 size={28} />
              </div>
              <h3 className="text-amber-400 font-bold text-xl sm:text-2xl">
                🌍 Muito além de pagamentos e trading
              </h3>
            </div>

            <p className="text-gray-300 leading-relaxed mb-8 text-base sm:text-lg font-light">
              A eCoin não foi construída apenas para transferências,
              pagamentos ou especulação de mercado.
              <br /><br />
              Os AI Smart Reward Pools transformam a moeda em uma
              infraestrutura produtiva de liquidez e geração de rendimento.
              <br /><br />
              Isso significa que participantes do ecossistema podem:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {[
                "Gerar renda passiva através de staking inteligente.",
                "Participar da estabilidade e retenção de liquidez do protocolo.",
                "Fortalecer a sustentabilidade financeira do ecossistema.",
                "Contribuir para a estabilidade de preço da moeda.",
                "Participar de pools inteligentes alimentados por atividade económica real.",
                "Transformar participação em rendimento sustentável."
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-4 rounded-2xl bg-black/50 border border-amber-500/15 hover:border-amber-500/40 transition-all group">
                  <CheckCircle2 className="text-amber-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" size={18} />
                  <span className="text-sm text-gray-200">{item}</span>
                </div>
              ))}
            </div>

            <p className="text-gray-300 italic leading-relaxed text-sm sm:text-base border-l-2 border-amber-400 pl-4 py-1">
              Ao unir utilidade financeira, staking,
              reward streaming e liquidez dinâmica,
              a eCoin evolui de uma simples moeda digital
              para uma infraestrutura económica inteligente.
            </p>
          </div>

          {/* SLOGAN FINAL 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center py-6 text-amber-400 font-semibold italic text-base sm:text-lg tracking-wide"
          >
            “Liquidez inteligente. Recompensas contínuas.
            Infraestrutura financeira construída para o futuro.”
          </motion.div>

          {/* GRID DUPLO: Como funciona + ecGas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Como funciona */}
            <div className="relative rounded-3xl border border-cyan-500/30 bg-gradient-to-b from-zinc-900/90 to-black/95 p-6 sm:p-8 backdrop-blur-xl shadow-xl overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-cyan-400 to-blue-600" />
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                  <Workflow size={24} />
                </div>
                <h3 className="text-cyan-400 font-bold text-lg">
                  🧠 Como funciona a infraestrutura?
                </h3>
              </div>
              <p className="leading-relaxed text-gray-300 text-sm sm:text-base font-light">
                As taxas geradas dentro do ecossistema são redistribuídas
                automaticamente entre treasury, reward pools,
                referral systems, staking buffers e protocolos de liquidez.
                <br /><br />
                O sistema utiliza Reward Buffers inteligentes que liberam
                recompensas gradualmente através de streams contínuos,
                mantendo estabilidade, previsibilidade e sustentabilidade
                da liquidez protocolar.
              </p>
            </div>

            {/* ecGas & Liquidity Engine */}
            <div className="relative rounded-3xl border border-yellow-500/30 bg-gradient-to-b from-zinc-900/90 to-black/95 p-6 sm:p-8 backdrop-blur-xl shadow-xl overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-yellow-400 to-amber-600" />
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-400">
                  <Zap size={24} />
                </div>
                <h3 className="text-yellow-400 font-bold text-lg">
                  ⛽ ecGas & Liquidity Engine
                </h3>
              </div>
              <p className="leading-relaxed text-gray-300 text-sm sm:text-base font-light">
                As compras de ecGas alimentam diretamente a infraestrutura
                de capacidade de mineração e os Smart Reward Pools.
                <br /><br />
                Isso transforma atividade econômica real do ecossistema
                em geração sustentável de liquidez e recompensas
                para os participantes do protocolo.
              </p>
            </div>

          </div>

          {/* CARD 3: Benefícios da Infraestrutura */}
          <div className="relative rounded-3xl border border-emerald-500/30 bg-gradient-to-b from-zinc-900/90 to-black/95 p-6 sm:p-10 backdrop-blur-xl shadow-2xl overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-emerald-400 to-teal-600" />
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <ShieldCheck size={28} />
              </div>
              <h3 className="text-amber-400 font-bold text-xl sm:text-2xl">
                🚀 Benefícios da Infraestrutura
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {[
                "Reward Streaming contínuo alimentado pelo ecossistema.",
                "Liquidez dinâmica distribuída automaticamente.",
                "Reciclagem inteligente de taxas e claims.",
                "Infraestrutura sustentável de staking.",
                "Buffers de liquidez inteligentes com distribuição gradual.",
                "Integração automática com Treasury e ecGas.",
                "Participação em pools inteligentes de recompensas.",
                "Maior estabilidade protocolar e eficiência de liquidez."
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-3 p-3.5 rounded-xl bg-black/60 border border-emerald-500/15">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
                  <span className="text-sm text-gray-200 font-light">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-center text-sm sm:text-base italic text-amber-300/80 leading-relaxed font-light py-2">
            “De trader para trader.<br />
            De holder para holder.<br />
            De participante para participante.<br />
            Construindo uma infraestrutura financeira sustentável<br />
            para investidores em ativos digitais.”
          </p>

          {/* INÍCIO DO BOTÃO SAIBA MAIS */}
          <div className="mt-8 flex justify-center w-full">
            <Link 
              href="How-Ai-Mining-Works" 
              className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold text-yellow-400 border border-yellow-500/40 rounded-2xl bg-amber-500/10 hover:bg-amber-500 hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] group"
            >
              <span>Saiba mais como se ganha</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          {/* FIM DO BOTÃO SAIBA MAIS */}

        </div>

        {/* SEPARATOR */}
        <div className="relative z-10 my-24 flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.35em] text-amber-400 font-mono font-bold">
            AI Smart Pools • Gold Standard
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
        </div>

        {/* SMART POOL CARD (FLUXO DA INFRAESTRUTURA ILUSTRATIVO E EXPLANATIVO EM GRID/TIMELINE) */}
        <div className="w-full max-w-5xl mx-auto rounded-3xl border border-amber-500/30 bg-gradient-to-b from-zinc-950/95 to-black/95 backdrop-blur-2xl p-6 sm:p-10 shadow-2xl shadow-amber-950/40 relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center mb-10">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-cyan-400 mb-3">
              Streaming Liquidity Infrastructure
            </h3>
            <p className="text-sm sm:text-base italic text-gray-400 font-light">
              AI-powered reward distribution and autonomous liquidity routing.
            </p>
          </div>

          {/* GRÁFICO / TIMELINE EXPLANATIVO DO FLUXO INTELIGENTE */}
          <div className="rounded-2xl border border-amber-500/25 bg-black/80 p-6 sm:p-8 text-left shadow-inner">
            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-amber-500/20">
              <Coins className="text-amber-400" size={26} />
              <h4 className="text-amber-400 font-extrabold text-lg sm:text-xl">
                📘 Fluxo da Infraestrutura Inteligente
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "O utilizador conecta sua carteira Web3.",
                "Participa do ecossistema através de staking ou ecGas.",
                "As taxas do protocolo alimentam os Reward Buffers.",
                "O sistema distribui streams contínuos de liquidez.",
                "Claims reciclados reforçam a sustentabilidade do pool.",
                "Treasury e referral systems recebem distribuição automática.",
                "O protocolo mantém estabilidade e liquidez dinâmica."
              ].map((step, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-zinc-900/60 border border-amber-500/15 hover:border-amber-500/40 transition-all group">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-mono text-xs font-bold shrink-0 shadow-[0_0_10px_rgba(245,158,11,0.15)] group-hover:scale-105 transition-transform">
                    0{idx + 1}
                  </div>
                  <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-light">{step}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 pt-6 border-t border-amber-500/20 text-center">
              <p className="italic text-amber-400 font-bold text-base sm:text-lg leading-relaxed tracking-wide">
                “Construído por um trader.<br />
                Sustentado por holders.<br />
                Empoderando investidores em ativos digitais.”
              </p>
            </div>
          </div>

          {/* BOTÕES DE AÇÃO FINAL */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/ecoin-hub"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-black font-extrabold transition-all duration-300 shadow-lg shadow-amber-950/50 text-center tracking-wide"
            >
              Open eCoin Hub
            </Link>

            <Link
              href="/Mining"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white font-extrabold transition-all duration-300 shadow-lg shadow-cyan-950/50 text-center tracking-wide"
            >
              Open eCoin Mining Smart Pools
            </Link>
          </div>

        </div>

      </div>

    </section>
  );
}