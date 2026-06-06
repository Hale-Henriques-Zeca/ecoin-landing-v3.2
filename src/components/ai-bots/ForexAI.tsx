"use client";

import React, { useState, useEffect } from "react";
import { Cpu, ShieldCheck, Play, Square, Settings } from "lucide-react";

// Componente local para estatísticas
const StatCard = ({ title, value, unit, color = "text-white" }: any) => (
  <div className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-md hover:bg-white/10 transition-colors">
    <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">{title}</p>
    <div className="flex items-baseline gap-2">
      <span className="text-2xl font-mono font-bold text-white">{value}</span>
      {unit && <span className={`text-[10px] font-bold ${color}`}>{unit}</span>}
    </div>
  </div>
);

export default function ForexAI({ user, isBotRunning, toggleBot }: any) {
  const [broker, setBroker] = useState<"exness" | "deriv" | "icmarkets">("exness");
  const [accountId, setAccountId] = useState("");
  const [password, setPassword] = useState("");
  const [server, setServer] = useState("");
  const [apiToken, setApiToken] = useState("");
  const [brokerSaved, setBrokerSaved] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  // Load Storage
  useEffect(() => {
    const savedBroker = localStorage.getItem("FOREX_BROKER") as any;
    if (savedBroker) setBroker(savedBroker);
    setAccountId(localStorage.getItem("FOREX_ACCOUNT_ID") || "");
    setPassword(localStorage.getItem("FOREX_PASSWORD") || "");
    setServer(localStorage.getItem("FOREX_SERVER") || "");
    setApiToken(localStorage.getItem("FOREX_API_TOKEN") || "");
  }, []);

  // Simulação de Logs do Bot Forex
  useEffect(() => {
    if (!isBotRunning) return;
    const messages = ["Scanning XAU/USD liquidity...", "Order matched: EUR/USD", "Profit: +12 pips", "Deducting Gas: 2 ecGas"];
    const interval = setInterval(() => {
      const msg = `[${new Date().toLocaleTimeString()}] ${messages[Math.floor(Math.random() * messages.length)]}`;
      setLogs(prev => [msg, ...prev].slice(0, 8));
    }, 3000);
    return () => clearInterval(interval);
  }, [isBotRunning]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fadeIn">
      {/* ESQUERDA: Configurações do Forex */}
      <div className="lg:col-span-2 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard title="Gas Balance" value={(user?.ecGas ?? 0).toLocaleString()} unit="ecGas" color="text-yellow-400" />
          <StatCard title="Gas Value" value={((user?.ecGas ?? 0) / 1000).toFixed(2)} unit="USDT" color="text-green-400" />
          <StatCard title="Bot Status" value={isBotRunning ? "ON" : "OFF"} color={isBotRunning ? "text-green-400" : "text-red-400"} />
        </div>

        {/* BROKER CONNECTION */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-[32px]">
          <h3 className="text-xs font-bold uppercase tracking-widest mb-4">Select Broker</h3>
          <div className="grid grid-cols-3 gap-3 mb-6">
            <button onClick={() => setBroker("exness")} className={`p-3 rounded-xl text-xs font-bold ${broker === "exness" ? "bg-yellow-500 text-black" : "bg-white/10 text-white/60"}`}>Exness</button>
            <button onClick={() => setBroker("deriv")} className={`p-3 rounded-xl text-xs font-bold ${broker === "deriv" ? "bg-blue-600 text-white" : "bg-white/10 text-white/60"}`}>Deriv</button>
            <button onClick={() => setBroker("icmarkets")} className={`p-3 rounded-xl text-xs font-bold ${broker === "icmarkets" ? "bg-purple-600 text-white" : "bg-white/10 text-white/60"}`}>IC Markets</button>
          </div>

          {broker === "exness" || broker === "icmarkets" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input value={accountId} onChange={(e) => setAccountId(e.target.value)} placeholder="Account ID" className="p-3 bg-black border border-white/10 rounded-xl text-xs outline-none" />
              <input value={server} onChange={(e) => setServer(e.target.value)} placeholder="Broker Server" className="p-3 bg-black border border-white/10 rounded-xl text-xs outline-none" />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="p-3 bg-black border border-white/10 rounded-xl text-xs col-span-2 outline-none" />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              <input value={apiToken} onChange={(e) => setApiToken(e.target.value)} placeholder="Deriv API Token" className="p-3 bg-black border border-white/10 rounded-xl text-xs outline-none" />
            </div>
          )}

          <button
            onClick={() => {
              localStorage.setItem("FOREX_BROKER", broker);
              localStorage.setItem("FOREX_ACCOUNT_ID", accountId);
              localStorage.setItem("FOREX_PASSWORD", password);
              localStorage.setItem("FOREX_SERVER", server);
              localStorage.setItem("FOREX_API_TOKEN", apiToken);
              setBrokerSaved(true);
            }}
            className="mt-6 w-full py-3 bg-green-600/20 border border-green-600/50 text-green-400 rounded-xl text-xs font-bold hover:bg-green-600 hover:text-white transition"
          >
            CONNECT BROKER
          </button>
          {brokerSaved && <p className="text-green-400 text-xs mt-3 text-center">✔ Broker conectado com sucesso</p>}
        </div>

        {/* COPY TRADING MODES */}
        <div className="bg-black/40 border border-yellow-500/20 p-6 rounded-[32px]">
          <h3 className="text-yellow-500 text-xs font-bold mb-4 uppercase tracking-widest">Copy Trading Modes</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 border border-white/10 rounded-xl hover:border-yellow-500/50 transition cursor-pointer"><p className="text-xs font-bold">AI Master Trader</p><p className="text-[10px] text-gray-400">Single AI → All users copy</p></div>
            <div className="p-4 border border-white/10 rounded-xl hover:border-yellow-500/50 transition cursor-pointer"><p className="text-xs font-bold">Multi Strategy Pool</p><p className="text-[10px] text-gray-400">Scalping / Swing / News</p></div>
            <div className="p-4 border border-white/10 rounded-xl hover:border-yellow-500/50 transition cursor-pointer"><p className="text-xs font-bold">Risk Based Copy</p><p className="text-[10px] text-gray-400">Auto lot sizing per user</p></div>
            <div className="p-4 border border-white/10 rounded-xl hover:border-yellow-500/50 transition cursor-pointer"><p className="text-xs font-bold">Social + AI</p><p className="text-[10px] text-gray-400">Humans + AI combined</p></div>
          </div>
        </div>

        <button 
          onClick={toggleBot}
          className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest transition-all ${isBotRunning ? "bg-red-600 hover:bg-red-500" : "bg-yellow-500 text-black hover:bg-yellow-400"}`}
        >
          {isBotRunning ? "STOP FOREX AI" : "START FOREX AI"}
        </button>
      </div>

      {/* DIREITA: LIVE CONSOLE */}
      <div className="bg-[#050505] border border-white/10 p-6 rounded-[32px] flex flex-col h-full min-h-[500px] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-50"></div>
        <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isBotRunning ? 'bg-yellow-500 animate-ping' : 'bg-gray-600'}`} />
            <h3 className="text-[10px] font-mono text-gray-400 uppercase tracking-widest italic">Forex Neural Link Console</h3>
          </div>
          <span className="text-[9px] font-mono text-yellow-500/50">LATENCY: 8ms</span>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3 font-mono text-[10px]">
          {!isBotRunning ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-6 space-y-4">
              <Cpu size={40} className="text-white/10" />
              <p className="text-gray-600 italic">Sistema em Standby.<br/>Aguardando ativação do Forex Neural Bot.</p>
            </div>
          ) : (
            logs.map((log, i) => (
              <div key={i} className="flex flex-col gap-1 border-l-2 border-yellow-500/20 pl-3 py-1">
                <span className="text-yellow-400/90">{log}</span>
                <span className="text-[8px] text-white/40 uppercase font-bold">Gas Deducted: 0.05% Per Trade</span>
              </div>
            ))
          )}
        </div>
        <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
          <p className="text-[9px] text-yellow-500 flex items-center gap-2 font-bold uppercase tracking-tighter">
            <ShieldCheck size={12}/> Protocolo Seguro E-Coin
          </p>
        </div>
      </div>
    </div>
  );
}