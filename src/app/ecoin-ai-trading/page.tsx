"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  Cpu,
  Zap,
  Globe,
  Terminal,
  BarChart3,
  ShieldCheck,
} from "lucide-react";
import BlockchainDeviceAlert from "@/components/BlockchainDeviceAlert";

// --- COMPONENTES AUXILIARES ---
const StatusBadge = ({ status }: { status: string }) => (
  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
    <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">
      {status}
    </span>
  </div>
);

const DataCard = ({ label, value, subValue, icon: Icon, color }: any) => (
  <div className="bg-black/40 border border-white/5 p-4 rounded-2xl backdrop-blur-md">
    <div className="flex justify-between items-start mb-2">
      <Icon size={18} className={color} />
      <span className="text-[10px] text-white/40 font-mono">TRANSMISSÃO AO VIVO</span>
    </div>
    <div className="text-2xl font-bold text-white font-mono">{value}</div>
    <div className={`text-[10px] font-medium ${color}`}>{subValue}</div>
    <div className="text-[9px] text-white/20 mt-1 uppercase tracking-tighter">
      {label}
    </div>
  </div>
);

export default function Page() {
  const [logs, setLogs] = useState<string[]>([]);
  const [latency, setLatency] = useState(12);
  const [spread, setSpread] = useState(0.08);

  useEffect(() => {
    const messages = [
      "Scanniando o livro de ofertas ETH/BTC...",
      "Oportunidade de negócio detectada: Lucro esperado de +0,14% - taxa",
      "Analisando a profundidade da liquidez...",
      "Otimização de ciclo: USDT -> BTC -> ETH",
      "Ignorado (taxas muito altas)",
      "Ligação neural estável",
      "Executando a validação...",
      "Aguardando um pico de volatilidade...",
    ];

    const interval = setInterval(() => {
      const msg = `[${new Date().toLocaleTimeString()}] ${
        messages[Math.floor(Math.random() * messages.length)]
      }`;

      setLogs((prev) => [msg, ...prev].slice(0, 12));
      setLatency(Math.floor(Math.random() * 7) + 8);
      setSpread(parseFloat((Math.random() * 0.14 + 0.01).toFixed(2)));
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-12 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
  <div>
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 bg-[#D4AF37]/10 rounded-lg">
        <Cpu className="text-[#D4AF37]" size={28} />
      </div>
      <h1 className="text-3xl md:text-5xl font-black tracking-tighter leading-tight">
        E-COIN <span className="text-[#D4AF37]"> NEURAL AI</span> <br />
        TRADING ROBOT TERMINAL <span className="text-[#D4AF37]">(ecnTrading)</span>
      </h1>
    </div>

<div className="flex flex-col items-end gap-2">
            <StatusBadge status="Activo & Scanniando" />
            <div className="text-[10px] font-mono text-white/30">
              ID DO MOTOR: EdenKingDom_V3_Arbitragem Triangular Interna
            </div>
          </div>
          
    {/* DESCRIÇÃO DO SISTEMA */}
    <div className="space-y-4 border-l-2 border-[#D4AF37]/30 pl-4">
      <div className="flex gap-3">
        <div className="mt-1"><Activity size={14} className="text-[#D4AF37]" /></div>
        <p className="text-white/50 text-sm max-w-md leading-relaxed">
          A <span className="text-[#D4AF37]">(ecnTrading)</span> é sistema de trading de arbitragem triangular interna (Crypto) E Copy Tarding, etc (Forex) com IA operando em tempo real nos mercados de criptomoedas dentro da sua carteira ou Bolsa de Valore como a Binance (crypto) e Exness, diriv (Forex), etc.  
        </p>
      </div>

      <div className="flex gap-3">
        <div className="mt-1"><Zap size={14} className="text-emerald-500" /></div>
        <p className="text-white/50 text-sm max-w-md leading-relaxed">
          O <span className="text-[#D4AF37]">(ecnTrading)</span> bot, é um bot moderno, Construído por um trader Profissional para qualquer trader, o bot <span className="text-[#D4AF37]">(ecnTrading)</span>, pelo seu design, foi criado para operar <span className="text-[#D4AF37]">100% sem riscos direcionais de (queda📉) & (Subida📈) de preços no mercado 📊</span> comparados aos actuais bots existentes no mercado hoje, ou seja, o nosso bot <span className="text-[#D4AF37]">(ecnTrading)</span>, para lucar, não depende e nem responde aos movimento de preços no mercado, mas sim ao desnível de preços entre as mesmas criptomoedas em 3 pare das moedas como por exemplo o preço de Bitcoin (BTC) custando: (75,300,00 dólares no par BTC/ETH) e ao mesmo tempo custando: (75,500,00 dolares no par BTC/USDT) portanto, o bot compra no primeiro par e vende no segundo par e Lucro de +200 dólares tudo a velocidade da luz.
        </p>
      </div>

      <div className="flex gap-3">
        <div className="mt-1"><ShieldCheck  size={14} className="text-[#D4AF37]" /></div>
        <p className="text-white/50 text-sm max-w-md leading-relaxed font-bold">
          O bot <span className="text-[#D4AF37]">(ecnTrading)</span> não tem acesso aos seus fundos dentro da sua Bolsa de Valore nunca.
        </p>
      </div>
    </div>
  </div>



        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">

            {/* DATA GRID */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <DataCard label="Latência" value={`${latency}ms`} subValue="Ultra baixa" icon={Zap} color="text-yellow-400" />
              <DataCard label="Crescimento" value={`+${spread}%`} subValue="Scanniando" icon={BarChart3} color="text-emerald-400" />
              <DataCard label="Eficiência" value="98.2%" icon={ShieldCheck} color="text-blue-400" />
              <DataCard label="Confiança do IA" value="Alta" icon={Globe} color="text-purple-400" />
            </div>

            {/* FLOW */}
            <div className="bg-black/60 border border-white/5 rounded-3xl p-8">
              <h3 className="text-xs text-white/40 mb-6 uppercase">Fluxo de Execução</h3>
              <div className="flex justify-around items-center">
                {["USDT", "BTC", "ETH", "USDT"].map((item, i) => (
                  <div key={i} className="text-center">
                    <div className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center mb-2">
                      {item}
                    </div>
                    <p className="text-[10px] text-white/40">{i === 0 ? "ENTRADA" : i === 3 ? "SAÍDA" : "NO MEIO"}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* REWARD */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-3xl">
                <p className="text-xs text-emerald-400 uppercase">Próximo ciclo</p>
                <div className="text-4xl font-mono">02:14:55</div>
              </div>

              <div className="bg-white/5 border border-white/10 p-6 rounded-3xl">
                <p className="text-xs text-white/40 uppercase">Total Distribuído</p>
                <div className="text-4xl font-mono text-[#D4AF37]">12.5M E-Coin</div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">

            {/* LOG */}
            <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-5 font-mono h-[400px] flex flex-col">
              <div className="mb-3 text-xs text-white/40">REGISTRO AO VIVO</div>
              <div className="flex-1 overflow-y-auto space-y-2">
                <AnimatePresence>
                  {logs.map((log, i) => (
                    <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px] text-white/60">
                      {log}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* INSIGHT */}
            <div className="bg-[#D4AF37]/5 border border-[#D4AF37]/20 p-5 rounded-3xl">
              <div className="text-xs text-[#D4AF37] mb-2">PERCEPÇÕES do IA</div>
              <p className="text-[11px] text-white/70">
                Volatilidade do mercado em ascensão. Execução otimizada para os ciclos do BTC.
              </p>
            </div>
          </div>
        </div>
<BlockchainDeviceAlert />
        {/* CARD DE ATIVAÇÃO NEURAL BOT */}
        <div className="mt-12 flex justify-center">
          <div className="w-[380px] bg-black/60 backdrop-blur-xl border border-blue-500/30 p-8 rounded-[32px] shadow-[0_0_40px_rgba(0,210,255,0.15)] text-center transition-all hover:border-yellow-500/50 group">
            
            <h3 className="text-blue-400 font-mono text-[10px] tracking-[0.4em] uppercase mb-3 opacity-70">
              Neural Link: Stable
            </h3>
            <h2 className="text-white text-2xl font-bold mb-8 tracking-tight">
              Ativar Neural Bot 🤖
            </h2>

            <Link 
              href="/ecoin-ai-dashboard" 
              className="w-full bg-[#D4AF37] hover:bg-[#F3BA2F] text-black font-black py-5 rounded-1xl shadow-[0_8px_20px_rgba(212,175,55,0.2)] transition-all hover:scale-[1.03] active:scale-95 flex items-center justify-center gap-3 uppercase tracking-widest no-underline"
            >
              <span>Acessar o Painel</span>
              <svg xmlns="http://www.w3.org" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14m-7-7 7 7-7 7" />
              </svg>
            </Link>

            <div className="mt-6 flex justify-center items-center gap-2">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-ping"></div>
              <p className="text-[9px] text-white/30 font-mono uppercase tracking-[0.2em]">
               Protocolo de IA seguro v3.0
              </p>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}