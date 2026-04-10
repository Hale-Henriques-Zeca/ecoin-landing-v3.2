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
  Users,
  Target,
  UserCheck,
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
            Hybrid Neural: <span className="text-[#D4AF37]"> Crypto & Forex </span> AI Trading Robot
          </h1>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg">
            A equipa de desenvolvimento da Moeda E-Coin tem o prazer de anunciar que está oficialmente em fase de estudo de viabilidade para o lançamento de uma ferramenta revolucionária de trading.
          </p>
        </div>
      </section>

      {/* ================= PROJETO EXPLICAÇÃO ================= */}
      <section className="px-6 py-20 bg-white/[0.02]">
      {/* ================= HEADER: ANATOMIA CRYPTO ARBITRAGE ================= */}
<div className="text-center mb-16">
  <motion.h2 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    className="text-3xl md:text-5xl font-black mb-6 uppercase tracking-tighter italic"
  >
    A ANATOMIA DO NOSSO <span className="text-[#4ade80]">CRYPTO NEURAL ARBITRAGE BOT</span> DE ELITE
  </motion.h2>
  
  <div className="max-w-4xl mx-auto space-y-6">
    <p className="text-gray-400 leading-relaxed">
      Diferente do Forex, o nosso motor de Crypto foca na <span className="text-white font-bold">Arbitragem Triangular Interna</span> dentro das maiores exchanges do mundo, como a <span className="text-white font-bold underline decoration-[#4ade80]">Binance</span>. 
      O que tens em mãos é um sistema que elimina o risco direcional do mercado, lucrando com a ineficiência matemática entre pares de ativos.
    </p>

    <div className="p-6 bg-white/[0.03] border border-white/5 rounded-2xl">
      <p className="text-sm text-gray-300 leading-relaxed">
        A nossa IA realiza o escaneamento de mais de <span className="text-[#4ade80] font-bold">1000 oportunidades de arbitragem</span> a cada milissegundo, mas com um filtro de elite: ela ignora qualquer lucro abaixo de <span className="text-white font-bold">$0.1</span> para garantir que as taxas de trading sejam cobertas e o lucro líquido seja real e garantido para os nossos <span className="text-[#4ade80] font-bold">E-Coiners</span>.
      </p>
    </div>

    <div className="h-1 w-24 bg-[#4ade80] mx-auto rounded-full mt-8" />
  </div>
</div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Bot className="text-[#D4AF37]" /> Projeto: Crypto AI Arbitrage Bot
            </h2>
            <p className="text-[#D4AF37] font-semibold mb-4 underline decoration-white/20">Arbitragem Triangular Interna</p>
            <p className="text-gray-300 leading-relaxed mb-6">
              Este bot de Inteligência Artificial foi desenhado para operar exclusivamente dentro da maior corretora do mundo, a <strong>Binance</strong>, focando-se na Arbitragem Triangular Interna.
              A lógica é simples, mas poderosa: a IA identifica discrepâncias de preço entre três pares de ativos em frações de segundo. Ao executar operações em ciclo, o robô garante que o valor final seja superior ao inicial, já descontando as taxas operacionais.
            </p>
            <div className="bg-black/40 p-6 rounded-2xl border border-white/10 space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-widest text-gray-500">Exemplo de Ciclo Operacional a velocidade da Luz:</h4>
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

      {/* ================= LOGICA TECNICA 100% : ecGas & LUCRATIVIDADE ================= */}
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
              <div className="bg-[#D4AF37]/10 p-4 rounded-xl border border-[#D4AF37]/30">3º Lucro: Variação de +$0.05 a +$0.3 (Ficas com 790 ecGas)</div>
            </div>
            
            
            {/* BLOCO INOVADO: ecGas SUSTAINABILITY SYSTEM */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37]/20 to-transparent rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
        <div className="relative bg-black/60 border border-white/10 p-8 rounded-2xl">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-[#D4AF37] rounded-lg text-black">
              <Zap size={24} fill="black" />
            </div>
            <h4 className="text-xl font-black italic tracking-tighter text-white uppercase">
              Escalabilidade de Lucro e ecGas
            </h4>
          </div>
          
          <p className="text-gray-300 leading-relaxed italic">
            Podendo Lucrar de (<strong>$2 mínimo a $5 com apenas ecGas de apenas $1</strong>) independentemente de capital em uso, mas a deducoa de ecGas e por igual por cada ordem executada com sucesso <strong>70 do total de 1000 ecGas</strong> Mas aconselhamos sempre que coloque mais ecGas e trading capital para mais lucros porque assim o bot mais usa o capital grande para executar ordens e assim os lucros serao bons.
          </p>

          <div className="mt-6 flex items-center gap-2 text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.2em]">
            <TrendingUp size={14} /> 
            Eficiência Máxima Detectada: +500% sobre o valor do ecGas
          </div>
        </div>
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
            <h3 className="text-[#D4AF37] text-2xl font-bold mb-4">Capital 100% sob seu controle dentro da sua corretora Não envies para ninguém e nenhuma plataforma ou CEO.</h3>
            <p className="leading-relaxed">
              O que o bot produz fica dentro da SUA corretora. A cada lucro produzido com sucesso, o valor vai ao seu <strong>Saldo Principal</strong>, permitindo o re-uso imediato (Juro Composto Instantâneo). 
              Se na primeira execução o capital foi de $100 e lucrou $1, na próxima o bot opera com <strong>$101</strong>, produzindo lucros progressivamente maiores como $1.1 e assim por diante.
            </p>
          </div>
        </div>
      </section>

<section className="px-6 py-24 bg-gradient-to-b from-black to-[#050505] text-white">
      <div className="max-w-6xl mx-auto">
        
        {/* CABEÇALHO DA SEÇÃO */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-black mb-6 uppercase tracking-tighter italic"
          >
            A ANATOMIA DO NOSSO <span className="text-[#D4AF37]">FOREX NEURAL TRADING AI ROBOT DE ELITE</span>
          </motion.h2>
          <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed border-b border-[#D4AF37]/20 pb-8">
            O que temos aqui em mãos é uma infraestrutura de trading de três pilares que cobre desde a análise algorítmica pura até à inteligência social. Aqui está a explicação detalhada para os nossos <span className="text-white font-bold">E-Coiners</span>:
          </p>
        </div>

        {/* 🦾 OS DOIS PILARES MESTRES */}
        <div className="mb-20">
          <h3 className="text-[#D4AF37] font-black text-xl mb-10 flex items-center gap-3 uppercase italic">
            <Zap className="fill-[#D4AF37]" size={24} /> 🦾 Os Dois Pilares Mestres: Eficiência e Segurança do nosso E-Coin Neural Forex Trading AI Robot - Modality
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* 1. AI HYBRID BOT */}
            <div className="bg-blue-600/5 border border-blue-500/20 p-8 rounded-[2.5rem] hover:border-blue-500/40 transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Cpu size={80} />
              </div>
              <div className="p-3 bg-blue-500/10 rounded-xl w-fit mb-6 text-blue-400 group-hover:scale-110 transition-transform">
                <Cpu size={32} />
              </div>
              <h4 className="text-2xl font-bold text-blue-400 mb-4 uppercase italic tracking-tighter">1. AI HYBRID BOT (O Motor de Tendência)</h4>
              <p className="text-sm text-gray-300 leading-relaxed space-y-4">
                <span className="block mb-2 text-white font-semibold underline decoration-blue-500/50">Este é o "Cérebro" do sistema. Ele não olha apenas para o preço; ele cruza Tendência + Liquidez + Volatilidade.</span>
                <span className="block"><strong>Como funciona:</strong> Ele identifica para onde a massa está a ir e usa IA para prever a exaustão do movimento. Se o mercado está volátil, ele ajusta a frequência de ordens em milissegundos.</span>
                <span className="block"><strong>Lucratividade:</strong> Alta constância. É ideal para mercados em tendência (Bull ou Bear Run).</span>
                <span className="block text-blue-300"><strong>Segurança:</strong> Usa Stop-Loss dinâmico baseado em volatilidade, protegendo o capital de movimentos bruscos.</span>
              </p>
            </div>

            {/* 2. LIQUIDITY SWEEP */}
            <div className="bg-purple-600/5 border border-purple-500/20 p-8 rounded-[2.5rem] hover:border-purple-500/40 transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Target size={80} />
              </div>
              <div className="p-3 bg-purple-500/10 rounded-xl w-fit mb-6 text-purple-400 group-hover:scale-110 transition-transform">
                <Target size={32} />
              </div>
              <h4 className="text-2xl font-bold text-purple-400 mb-4 uppercase italic tracking-tighter">2. LIQUIDITY SWEEP (O Caçador de Smart Money)</h4>
              <p className="text-sm text-gray-300 leading-relaxed space-y-4">
                <span className="block mb-2 text-white font-semibold underline decoration-purple-500/50">Este modo é desenhado para bater as "Baleias". Ele foca em Smart Money & Stop Hunt Detection.</span>
                <span className="block"><strong>Como funciona:</strong> O robô identifica zonas onde grandes instituições estão a tentar "limpar" as ordens dos pequenos traders (Stop Hunt). Ele entra exatamente quando a liquidez é capturada, operando a favor do dinheiro inteligente.</span>
                <span className="block"><strong>Lucratividade:</strong> Ganhos explosivos em curtos intervalos (Scalping de precisão).</span>
                <span className="block text-purple-300"><strong>Segurança:</strong> Extremamente alta, pois ele só entra no mercado quando o risco de "armadilha" já passou.</span>
              </p>
            </div>

          </div>
        </div>

        {/* ⚡ 3. COPY TRADING AI */}
        <div className="bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-[3rem] p-8 md:p-12 relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-3xl font-black text-[#D4AF37] mb-6 uppercase italic flex items-center gap-4">
              <Users size={32} /> ⚡ 3. COPY TRADING AI: A Democracia do Lucro Neural
            </h3>
            <p className="text-gray-300 mb-12 max-w-4xl italic">
              A terceira modalidade é o <strong>Copy Trading AI</strong>, onde a inteligência é partilhada. Aqui, o sistema replica estratégias vencedoras automaticamente para a tua conta. Dentro dele, temos 4 sub-modalidades de elite:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { 
                  name: "🏆 AI Master Trader (O Líder Único)", 
                  logic: "Uma única IA de performance ultra-comprovada dita o ritmo. Todos os utilizadores copiam exatamente as mesmas entradas deste \"Mestre Central\".",
                  advantage: "Unificação de lucros. Se o Master ganha, a comunidade inteira ganha em sincronia.",
                  icon: UserCheck 
                },
                { 
                  name: "📊 Multi Strategy Pool (O Fundo Diversificado)", 
                  logic: "Não coloca todos os ovos na mesma cesta. Este modo combina Scalping (curto prazo), Swing (médio prazo) e News Trading (análise de notícias) num único pool.",
                  advantage: "Estabilidade extrema. Se o Scalping estiver calmo, o Swing compensa. É a segurança da diversificação automática.",
                  icon: Layers 
                },
                { 
                  name: "🛡️ Risk Based Copy (Gestão de Risco Neural)", 
                  logic: "O sistema analisa o saldo de cada utilizador individualmente e faz o Auto Lot Sizing. Ele não copia o valor da ordem, mas sim a percentagem de risco.",
                  advantage: "Segurança personalizada. Um utilizador com 100 USDT e um com 10.000 USDT operam com a mesma segurança proporcional. Proteção total contra quebra de banca.",
                  icon: ShieldCheck 
                },
                { 
                  name: "🤝 Social + AI (O Híbrido Humano-Máquina)", 
                  logic: "Onde o instinto humano encontra a precisão da máquina. Traders veteranos (Humans) validam os sinais da IA antes da execução final.",
                  advantage: "O \"Toque de Mestre\". Evita erros que máquinas puras podem cometer em eventos geopolíticos imprevisíveis, unindo o melhor dos dois mundos.",
                  icon: Activity 
                }
              ].map((item, i) => (
                <div key={i} className="bg-black/60 p-6 rounded-3xl border border-white/5 hover:border-[#D4AF37]/40 transition-all flex flex-col h-full">
                  <item.icon size={28} className="text-[#D4AF37] mb-4" />
                  <h5 className="text-sm font-black text-white mb-3 uppercase tracking-tight leading-snug">{item.name}</h5>
                  <div className="space-y-3 flex-grow">
                    <p className="text-[11px] text-gray-400 leading-relaxed"><strong>A Lógica:</strong> {item.logic}</p>
                    <p className="text-[11px] text-[#D4AF37] leading-relaxed"><strong>Vantagem:</strong> {item.advantage}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CONCLUSÃO */}
        <div className="mt-16 text-center bg-white/[0.02] p-10 rounded-[2.5rem] border border-white/5">
          <h3 className="text-2xl font-bold mb-6 italic uppercase tracking-widest text-[#D4AF37]">Conclusão: O Quão Lucrativo e Seguro é?</h3>
          <p className="text-gray-400 mb-8 max-w-4xl mx-auto">
            O ecossistema <strong>E-Coin Neural</strong> é desenhado para <span className="text-white font-bold">Independência Financeira Permanente.</span>
          </p>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="space-y-2">
              <span className="text-[#D4AF37] font-bold text-xs uppercase">Eficiência:</span>
              <p className="text-xs text-gray-500">Operações em milissegundos que humanos jamais conseguiriam replicar.</p>
            </div>
            <div className="space-y-2">
              <span className="text-[#D4AF37] font-bold text-xs uppercase">Lucratividade:</span>
              <p className="text-xs text-gray-500">Escalável através das taxas de rede e da precisão algorítmica.</p>
            </div>
            <div className="space-y-2">
              <span className="text-[#D4AF37] font-bold text-xs uppercase">Segurança:</span>
              <p className="text-xs text-gray-500">Web3 Native. O teu capital está na tua custódia ou em contratos auditados, sem "senhas" hackeáveis, apenas o poder da tua chave privada, frases de recuperação da sua carteira bem guardados contigo ai.</p>
            </div>
          </div>
        </div>

      </div>
    </section>

    {/* ================= SEÇÃO: PROJEÇÃO DE PERFORMANCE NEURAL ================= */}
<section className="px-6 py-24 bg-black">
  <div className="max-w-6xl mx-auto">
    
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-5xl font-black mb-4 uppercase tracking-tighter italic">
        POTENCIAL DE <span className="text-[#D4AF37]">LUCRO LÍQUIDO</span>
      </h2>
      <p className="text-gray-500 max-w-2xl mx-auto text-sm">
        Projeção baseada em ciclos de alta constância. Diferente de investimentos comuns, 
        aqui o lucro é reaplicado instantaneamente pelo motor neural.
      </p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      {/* CARD 1: FOREX AI HYBRID */}
      <div className="bg-white/[0.02] border border-blue-500/20 p-8 rounded-[2.5rem] flex flex-col">
        <div className="flex justify-between items-start mb-6">
          <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-400">
            <Cpu size={24} />
          </div>
          <span className="text-[10px] bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full font-bold uppercase">Tendência</span>
        </div>
        <h3 className="text-xl font-bold mb-2">AI HYBRID BOT</h3>
        <p className="text-xs text-gray-500 mb-6">Foco em consistência diária e proteção de capital.</p>
        
        <div className="space-y-3 font-mono text-sm border-t border-white/5 pt-6">
          <div className="flex justify-between text-gray-400"><span>Média por Ciclo:</span> <span className="text-white">0.5% a 1.2%</span></div>
          <div className="flex justify-between text-gray-400"><span>Risco:</span> <span className="text-blue-400">Baixo (AI Guard)</span></div>
          <div className="flex justify-between text-[#D4AF37] font-bold pt-2"><span>Projeção Mensal:</span> <span>+15% a 35%</span></div>
        </div>
      </div>

      {/* CARD 2: LIQUIDITY SWEEP (O MAIS AGRESSIVO) */}
      <div className="bg-[#D4AF37]/5 border border-[#D4AF37]/30 p-8 rounded-[3rem] flex flex-col scale-105 shadow-[0_0_50px_rgba(212,175,55,0.1)] z-10">
        <div className="flex justify-between items-start mb-6">
          <div className="p-3 bg-[#D4AF37]/10 rounded-2xl text-[#D4AF37]">
            <Target size={24} />
          </div>
          <span className="text-[10px] bg-[#D4AF37] text-black px-3 py-1 rounded-full font-bold uppercase">Alta Performance</span>
        </div>
        <h3 className="text-xl font-bold mb-2 text-[#D4AF37]">LIQUIDITY SWEEP</h3>
        <p className="text-xs text-gray-400 mb-6">Captura de explosões institucionais (Scalping).</p>
        
        <div className="space-y-3 font-mono text-sm border-t border-[#D4AF37]/10 pt-6">
          <div className="flex justify-between text-gray-400"><span>Média por Ciclo:</span> <span className="text-white">2.0% a 5.0%</span></div>
          <div className="flex justify-between text-gray-400"><span>Risco:</span> <span className="text-[#D4AF37]">Moderado (Sniper)</span></div>
          <div className="flex justify-between text-green-400 font-bold pt-2 text-lg"><span>Projeção Mensal:</span> <span>+40% a 80%</span></div>
        </div>
      </div>

      {/* CARD 3: COPY TRADING POOL */}
      <div className="bg-white/[0.02] border border-purple-500/20 p-8 rounded-[2.5rem] flex flex-col">
        <div className="flex justify-between items-start mb-6">
          <div className="p-3 bg-purple-500/10 rounded-2xl text-purple-400">
            <Users size={24} />
          </div>
          <span className="text-[10px] bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full font-bold uppercase">Diversificado</span>
        </div>
        <h3 className="text-xl font-bold mb-2">COPY TRADING POOL</h3>
        <p className="text-xs text-gray-500 mb-6">Equilíbrio automático entre as 4 sub-estratégias.</p>
        
        <div className="space-y-3 font-mono text-sm border-t border-white/5 pt-6">
          <div className="flex justify-between text-gray-400"><span>Média por Ciclo:</span> <span className="text-white">Diversificada</span></div>
          <div className="flex justify-between text-gray-400"><span>Risco:</span> <span className="text-purple-400">Neural Risk Control</span></div>
          <div className="flex justify-between text-[#D4AF37] font-bold pt-2"><span>Projeção Mensal:</span> <span>+20% a 50%</span></div>
        </div>
      </div>

    </div>

    {/* TABELA DE COMPARAÇÃO DE CRESCIMENTO (MODELO COMPOUND) */}
    <div className="mt-20 bg-black border border-white/10 rounded-[2.5rem] overflow-hidden">
      <div className="bg-white/5 p-6 border-b border-white/10 text-center">
        <h4 className="text-[#D4AF37] font-bold uppercase tracking-widest text-xs">Simulação de Escala Neural (Juros Compostos Reais)</h4>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm font-mono">
          <thead>
            <tr className="text-gray-500 border-b border-white/5 text-[10px] uppercase">
              <th className="p-6">Capital Inicial</th>
              <th className="p-6">Após 10 Ciclos</th>
              <th className="p-6">Após 20 Ciclos</th>
              <th className="p-6">Após 30 Ciclos</th>
              <th className="p-6 text-green-400">Potencial Final</th>
            </tr>
          </thead>
          <tbody className="text-gray-300">
            <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
              <td className="p-6 font-bold text-white">$100</td>
              <td className="p-6">$259</td>
              <td className="p-6">$672</td>
              <td className="p-6">$1,744</td>
              <td className="p-6 text-[#D4AF37] font-bold italic">Crescimento Exponencial</td>
            </tr>
            <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
              <td className="p-6 font-bold text-white">$1,000</td>
              <td className="p-6">$2,593</td>
              <td className="p-6">$6,727</td>
              <td className="p-6">$17,449</td>
              <td className="p-6 text-[#D4AF37] font-bold italic">Crescimento Exponencial</td>
            </tr>
            <tr className="hover:bg-white/[0.02] transition-colors">
              <td className="p-6 font-bold text-white">$10,000</td>
              <td className="p-6">$25,937</td>
              <td className="p-6">$67,274</td>
              <td className="p-6">$174,494</td>
              <td className="p-6 text-[#D4AF37] font-bold italic">Crescimento Exponencial</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="p-4 bg-[#D4AF37]/10 text-center">
        <p className="text-[10px] text-[#D4AF37] uppercase font-bold tracking-[0.2em]">
          Nota: O bot de forex não funciona por sorte. Ele opera por volume de ciclos milimétricos. Portanto, a produtividade que se espera como projetada acima, pode ser mais menor que o esperado ou estipulado como normadia, certo? - Nem sempre será ou crescimento exponencial, mas também pode ser matemático e sircunstancial assim como seu capital em uso nas negociações, porque o bot diferente de investimento garantido, ele não usa todo o seu capital para executar as ordens dentro de sua corretora. Por vezes 30 a 50% Máximo e o resto cobertura das ordens em execução.
        </p>
      </div>
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
            href="/ecoin-ai-dashboard"
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