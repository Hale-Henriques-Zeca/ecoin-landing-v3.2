"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Cpu,
  Zap,
  Network,
  Coins,
  ArrowRightLeft,
  Layers,
  ShieldCheck,
  Activity,
  Bot,
  TrendingUp,
  BarChart3
} from "lucide-react";

export default function NeuralTradingTerminal() {
  // Dados da tabela da imagem (100% fiel)
  const compoundData = [
    { day: 1, val: "$0.01", day2: 16, val2: "$327.68" },
    { day: 2, val: "$0.02", day2: 17, val2: "$665.36" },
    { day: 3, val: "$0.04", day2: 18, val2: "$1,310.72" },
    { day: 4, val: "$0.08", day2: 19, val2: "$2,621.44" },
    { day: 5, val: "$0.16", day2: 20, val2: "$5,242.88" },
    { day: 6, val: "$0.32", day2: 21, val2: "$10,485.76" },
    { day: 7, val: "$0.64", day2: 22, val2: "$20,971.52" },
    { day: 8, val: "$1.28", day2: 23, val2: "$41,943.04" },
    { day: 9, val: "$2.64", day2: 24, val2: "$83,886.08" },
    { day: 10, val: "$5.12", day2: 25, val2: "$167,772.16" },
    { day: 11, val: "$10.24", day2: 26, val2: "$355,544.32" },
    { day: 12, val: "$20.48", day2: 27, val2: "$671,088.64" },
    { day: 13, val: "$40.96", day2: 28, val2: "$1,342,177.18" },
    { day: 14, val: "$81.92", day2: 29, val2: "$2,664,353.56" },
    { day: 15, val: "$163.84", day2: 30, val2: "$5,368,709.12" },
  ];

  return (
    <main className="min-h-screen bg-black text-white flex flex-col overflow-hidden font-sans">
      
      {/* ================= HERO ================= */}
      <section className="relative px-6 py-28 text-center border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/10 via-transparent to-transparent" />
        <div className="relative z-10 max-w-5xl mx-auto">
          <span className="uppercase tracking-[0.5em] text-[10px] md:text-xs text-[#D4AF37] font-bold block mb-6">
            E-COIN NEURAL TRADING AI ROBOT TERMINAL
          </span>
          <h1 className="text-4xl md:text-7xl font-bold leading-tight mb-8">
            Hybrid Neural: <span className="text-[#D4AF37]">Forex & Crypto</span> AI Trading Robot
          </h1>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg">
            A equipa de desenvolvimento da Moeda E-Coin tem o prazer de anunciar que está oficialmente em fase de estudo de viabilidade para o lançamento de uma ferramenta revolucionária de trading.
          </p>
        </div>
      </section>

      {/* ================= PROJETO EXPLICAÇÃO ================= */}
      <section className="px-6 py-20 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Bot className="text-[#D4AF37]" /> Projeto: AI Arbitrage Bot
            </h2>
            <p className="text-[#D4AF37] font-semibold mb-4 underline decoration-white/20">Arbitragem Triangular Interna</p>
            <p className="text-gray-300 leading-relaxed mb-6">
              Este bot de Inteligência Artificial foi desenhado para operar exclusivamente dentro da maior corretora do mundo, a <strong>Binance</strong>, focando-se na Arbitragem Triangular Interna.
              A lógica é simples, mas poderosa: a IA identifica discrepâncias de preço entre três pares de ativos em frações de segundo. Ao executar operações em ciclo, o robô garante que o valor final seja superior ao inicial, já descontando as taxas operacionais.
            </p>
            <div className="bg-black/40 p-6 rounded-2xl border border-white/10 space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-widest text-gray-500">Exemplo de Ciclo Operacional:</h4>
              <div className="flex flex-col gap-2 font-mono text-sm">
                <p className="flex justify-between border-b border-white/5 pb-1"><span>Início:</span> <span className="text-green-400 underline">Converte USDT para BTC</span></p>
                <p className="flex justify-between border-b border-white/5 pb-1"><span>Fluxo:</span> <span className="text-green-400 underline">Converte BTC para ETH</span></p>
                <p className="flex justify-between border-b border-white/5 pb-1"><span>Fecho:</span> <span className="text-green-400 underline">Converte ETH de volta para USDT</span></p>
              </div>
              <p className="text-xs italic text-gray-400 pt-2 text-center italic">"Resultado: Lucro líquido gerado pela ineficiência momentânea do mercado."</p>
            </div>
          </div>

          {/* TABLE VISUAL (A MÁGICA DOS JUROS COMPOSTOS) */}
          <div className="bg-[#111] p-1 border border-[#D4AF37]/30 rounded-lg shadow-[0_0_50px_rgba(212,175,55,0.1)]">
            <div className="bg-black p-6 rounded-md">
              <h3 className="text-center text-xl font-bold mb-1 tracking-tighter">THE POWER OF THE</h3>
              <h3 className="text-center text-3xl font-black mb-4 text-[#4ade80] tracking-tighter leading-none uppercase">Compound Effect</h3>
              <p className="text-[10px] text-center mb-6 uppercase tracking-tight text-white/80">WATCH WHAT HAPPENS TO A PENNY DOUBLED EVERYDAY, FOR 30 DAYS:</p>
              
              <div className="grid grid-cols-2 gap-x-8 gap-y-1 font-mono text-[11px] md:text-[13px]">
                {compoundData.map((item, idx) => (
                  <div key={idx} className="contents">
                    <div className="flex justify-between border-b border-white/5 pb-1">
                      <span className="text-[#4ade80] font-bold">DAY {item.day}</span>
                      <span>{item.val}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-1">
                      <span className="text-[#4ade80] font-bold">DAY {item.day2}</span>
                      <span>{item.val2}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= LOGICA TECNICA 100% ================= */}
      <section className="px-6 py-24 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12">Como funciona a <span className="text-[#D4AF37]">Lucratividade?</span></h2>
          
          <div className="text-left bg-white/5 p-8 rounded-3xl border border-white/10 space-y-6 leading-relaxed text-gray-300">
            <p>
              Para melhor entender como é que a <strong>E-Coin Neural AI Trading Robot</strong> funciona, é preciso entender o efeito de duplicação de juros compostos tal como ilustrado na tabela acima.
            </p>
            
            <p className="border-l-4 border-[#D4AF37] pl-4 italic">
              <strong>Cenário Real ecnTrading:</strong> Com apenas ecGas de <strong>$1</strong> o usuário de 1000 ecGas já tem até <strong>$5 de lucros</strong>. Como?
            </p>

            <p>
              O bot faz scan de mais de <strong>1000 oportunidades</strong> de arbitragem, mas apenas executa <strong>10 ordens</strong> das mil detectadas disponíveis (ex: comprar no par ETH/BTC e vender no Par BTC/USDT). 
            </p>
            
            <div className="bg-black/50 p-6 rounded-xl border border-[#D4AF37]/20">
              <h4 className="text-white font-bold mb-3 flex items-center gap-2"><ShieldCheck size={18} className="text-green-500"/> Garantia de Eficiência:</h4>
              <p>
                O bot executa apenas 10 porque a corretora cobra uma taxa de trading de <strong>$0.1</strong> (que deve ser paga lucrando ou não). Para garantir a lucratividade, configuramos o bot para <strong>ignorar oportunidades abaixo de $0.1</strong>. Mesmo que existam oportunidades em massa com lucro de 0.09 ou menos, o bot ignora-as.
              </p>
              <p className="mt-4 font-bold text-white">
                O bot aceita ferverosamente apenas as oportunidades acima de $0.1 (como $0.15 a $0.2 mínimo até ao infinito).
              </p>
            </div>

            <p>
              Nos $0.2 de lucro, os $0.1 de taxa são deduzidos e o resto (<strong>$0.1 mínimo</strong>) fica como lucro. Em uma perspectiva de capital de $10, passas a ter $10.1. A cada ordem executada com sucesso, há uma dedução de <strong>70 do total de 1000 ecGas</strong>.
            </p>

            <div className="grid md:grid-cols-3 gap-4 text-center font-bold">
              <div className="bg-[#D4AF37]/10 p-4 rounded-xl border border-[#D4AF37]/30">1º Lucro: $0.1 (Ficas com 930 ecGas)</div>
              <div className="bg-[#D4AF37]/10 p-4 rounded-xl border border-[#D4AF37]/30">2º Lucro: +$0.2 (Ficas com 860 ecGas)</div>
              <div className="bg-[#D4AF37]/10 p-4 rounded-xl border border-[#D4AF37]/30">3º Lucro: Variação de +$0.05 a +$0.3</div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= VELOCIDADE E CORRETORAS ================= */}
      <section className="px-6 py-24 bg-[#D4AF37] text-black">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-black mb-8">A PRÓXIMA MARAVILHA DO MUNDO</h2>
          <p className="text-xl font-bold mb-12 max-w-3xl mx-auto">
            Veja o poder: enquanto a tabela mostra o acúmulo de $0.1 por dia, o nosso <strong>E-Coin Neural Trading AI Robot faz isso por cada MILISEGUNDO por ti</strong>. Não em minutos, nem horas. Imagine o poder desse Bot.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 opacity-80">
            <span className="font-black text-2xl">BINANCE</span>
            <span className="font-black text-2xl">OKX</span>
            <span className="font-black text-2xl">KUCOIN</span>
            <span className="font-black text-2xl">KRAKEN</span>
            <span className="font-black text-2xl">HUOBI GLOBAL</span>
            <span className="font-black text-2xl">COINBASE</span>
            <span className="font-black text-2xl">BYBIT</span>
            <span className="font-black text-2xl">BITGET</span>
            <span className="font-black text-2xl">ETC</span>
          </div>

          <div className="bg-black text-white p-8 rounded-3xl border border-white/20 text-left">
            <h3 className="text-[#D4AF37] text-2xl font-bold mb-4">Capital 100% sob seu controle</h3>
            <p className="leading-relaxed">
              O que o bot produz fica dentro da SUA corretora. A cada lucro produzido com sucesso, o valor vai ao seu <strong>Saldo Principal</strong>, permitindo o re-uso imediato (Juro Composto Instantâneo). 
              Se na primeira execução o capital foi de $100 e lucrou $1, na próxima o bot opera com <strong>$101</strong>, produzindo lucros progressivamente maiores como $1.1 e assim por diante.
            </p>
          </div>
        </div>
      </section>

      {/* ================= FINAL ================= */}
      <section className="px-6 py-24 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-5xl font-bold tracking-tighter">FIQUE ATENTO.</h2>
          <p className="text-2xl text-[#D4AF37] font-semibold">
            Faça parte desta oportunidade de mudança de vida e liberdade finaceira. 2025 é nosso.
          </p>
          
          <Link
            href="/ecnTradingAi-Robot-Profit-Flow-Info"
            className="inline-flex items-center gap-4 px-12 py-5 rounded-full
            bg-[#D4AF37] text-black font-black text-xl
            hover:bg-white hover:scale-105 transition-all shadow-[0_0_50px_rgba(212,175,55,0.4)]"
          >
            START E-COIN NEURAL TRADING AI ROBOT NOW 🤖
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 text-center border-t border-white/5 text-[10px] text-gray-500 uppercase tracking-[0.5em]">
        Since © 2025 to {new Date().getFullYear()} E-Coin Neural Ecosystem | The Truth About Trading AI
      </footer>

    </main>
  );
}