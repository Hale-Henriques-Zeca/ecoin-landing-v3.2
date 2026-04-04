"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Cpu, Zap, BarChart3, ShieldCheck, Wallet, 
  ArrowUpRight, RefreshCw, Settings, Database, 
  TrendingUp, Activity, Play, Square, Fuel
} from "lucide-react";

// --- COMPONENTES DE INTERFACE ---
const StatCard = ({ title, value, unit, color }: any) => (
  <div className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-md">
    <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">{title}</p>
    <div className="flex items-baseline gap-2">
      <span className="text-2xl font-mono font-bold text-white">{value}</span>
      <span className={`text-[10px] font-bold ${color}`}>{unit}</span>
    </div>
  </div>
);

export default function AIDashboard() {
  const [mode, setMode] = useState<"forex" | "crypto">("forex");
  const [isBotRunning, setIsBotRunning] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const [apiKey, setApiKey] = useState("");
const [secretKey, setSecretKey] = useState("");
const [saved, setSaved] = useState(false);
const [upline, setUpline] = useState("");

// --- FOREX BROKER STATE ---
const [broker, setBroker] = useState<"exness" | "deriv" | "icmarkets">("exness");

const [accountId, setAccountId] = useState("");
const [password, setPassword] = useState("");
const [server, setServer] = useState("");
const [apiToken, setApiToken] = useState("");

const [brokerSaved, setBrokerSaved] = useState(false);

// LOAD STORAGE
useEffect(() => {
  const savedBroker = localStorage.getItem("FOREX_BROKER") as any;
  if (savedBroker) setBroker(savedBroker);

  setAccountId(localStorage.getItem("FOREX_ACCOUNT_ID") || "");
  setPassword(localStorage.getItem("FOREX_PASSWORD") || "");
  setServer(localStorage.getItem("FOREX_SERVER") || "");
  setApiToken(localStorage.getItem("FOREX_API_TOKEN") || "");
}, []);

  // Simulação de Logs do Bot
  useEffect(() => {
    if (!isBotRunning) return;
    const messages = ["Scanning Binance liquidity...", "Order matched: BTC/USDT", "Profit: +0.02%", "Deducting Gas: 2 EKD"];
    const interval = setInterval(() => {
      const msg = `[${new Date().toLocaleTimeString()}] ${messages[Math.floor(Math.random() * messages.length)]}`;
      setLogs(prev => [msg, ...prev].slice(0, 8));
    }, 3000);
    return () => clearInterval(interval);
  }, [isBotRunning]);

  useEffect(() => {
  const storedKey = localStorage.getItem("EKD_API_KEY");
  const storedSecret = localStorage.getItem("EKD_SECRET_KEY");

  if (storedKey && storedSecret) {
    setApiKey(storedKey);
    setSecretKey(storedSecret);
    setSaved(true);
  }
}, []);

  return (

  <div className="min-h-screen bg-[#020617] text-white pt-32 lg:pt-40 p-6 lg:p-12 font-sans selection:bg-yellow-500/30">

      
      {/* BACKGROUND EFFECTS */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_-20%,#1e293b,transparent)] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* HEADER & MODE SWITCH */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8">
          <div>
            <h1 className="text-3xl font-black tracking-tighter italic flex items-center gap-3">
              <Cpu className="text-yellow-500" /> E-COIN NEURAL TRADING AI ROBOT TERMINAL
            </h1>
            <p className="text-gray-500 text-sm font-mono uppercase tracking-widest mt-1">Hybrid: Forex & Crypto AI Trading Robot</p>
          </div>

          <div className="bg-black/40 border border-white/10 p-1.5 rounded-2xl flex gap-2 backdrop-blur-xl">
            <button 
              onClick={() => setMode("forex")}
              className={`px-8 py-3 rounded-xl text-xs font-bold transition-all ${mode === "forex" ? "bg-yellow-500 text-black shadow-lg shadow-yellow-500/20" : "text-gray-500 hover:text-white"}`}
            >
              FOREX AI TRADING BOT
            </button>
            <button 
              onClick={() => setMode("crypto")}
              className={`px-8 py-3 rounded-xl text-xs font-bold transition-all ${mode === "crypto" ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" : "text-gray-500 hover:text-white"}`}
            >
              CRYPTO AI TRADING BOT
            </button>
          </div>
        </div>

        {/* CONTENT RENDERING */}
<AnimatePresence mode="wait">
  {mode === "forex" ? (
    <motion.div 
      key="forex" 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: -20 }}
      className="grid grid-cols-1 lg:grid-cols-3 gap-8"
    >

      {/* LEFT SIDE */}
      <div className="lg:col-span-2 space-y-6">

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard title="Account Balance" value="2,450" unit="USD" color="text-green-400" />
          <StatCard title="Active Trades" value="3" unit="Positions" color="text-blue-400" />
          <StatCard title="AI Profit" value="+128.4" unit="USD" color="text-emerald-400" />
        </div>

        {/* BROKER CONNECTION */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-[32px]">

  <h3 className="text-xs font-bold uppercase tracking-widest mb-4">
    Select Broker
  </h3>

  <div className="grid grid-cols-3 gap-3 mb-6">

    <button
      onClick={() => setBroker("exness")}
      className={`p-3 rounded-xl text-xs font-bold ${
        broker === "exness"
          ? "bg-yellow-500 text-black"
          : "bg-white/10 text-white/60"
      }`}
    >
      Exness
    </button>

    <button
      onClick={() => setBroker("deriv")}
      className={`p-3 rounded-xl text-xs font-bold ${
        broker === "deriv"
          ? "bg-blue-600 text-white"
          : "bg-white/10 text-white/60"
      }`}
    >
      Deriv
    </button>

    <button
      onClick={() => setBroker("icmarkets")}
      className={`p-3 rounded-xl text-xs font-bold ${
        broker === "icmarkets"
          ? "bg-purple-600 text-white"
          : "bg-white/10 text-white/60"
      }`}
    >
      IC Markets
    </button>

  </div>

  {/* DYNAMIC FIELDS */}

  {broker === "exness" || broker === "icmarkets" ? (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

      <input
        value={accountId}
        onChange={(e) => setAccountId(e.target.value)}
        placeholder="Account ID"
        className="p-3 bg-black border border-white/10 rounded text-xs"
      />

      <input
        value={server}
        onChange={(e) => setServer(e.target.value)}
        placeholder="Broker Server (Ex: Exness-MT5Real)"
        className="p-3 bg-black border border-white/10 rounded text-xs"
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="p-3 bg-black border border-white/10 rounded text-xs col-span-2"
      />

    </div>
  ) : null}

  {broker === "deriv" ? (
    <div className="grid grid-cols-1 gap-4">
      <input
        value={apiToken}
        onChange={(e) => setApiToken(e.target.value)}
        placeholder="Deriv API Token"
        className="p-3 bg-black border border-white/10 rounded text-xs"
      />
    </div>
  ) : null}

  {/* SAVE BUTTON */}

  <button
    onClick={() => {
      localStorage.setItem("FOREX_BROKER", broker);
      localStorage.setItem("FOREX_ACCOUNT_ID", accountId);
      localStorage.setItem("FOREX_PASSWORD", password);
      localStorage.setItem("FOREX_SERVER", server);
      localStorage.setItem("FOREX_API_TOKEN", apiToken);
      setBrokerSaved(true);
    }}
    className="mt-6 w-full py-3 bg-green-600 rounded-xl text-xs font-bold hover:bg-green-500"
  >
    CONNECT BROKER
  </button>

  {brokerSaved && (
    <p className="text-green-400 text-xs mt-3">
      ✔ Broker conectado com sucesso
    </p>
  )}

</div>

        {/* BOT SELECTOR */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-[32px]">
          <h3 className="text-xs font-bold uppercase tracking-widest mb-6">
            Select AI Trading Mode
          </h3>

          <div className="grid md:grid-cols-3 gap-4">

            {/* HYBRID BOT */}
            <button className="p-5 bg-blue-600/20 border border-blue-500/30 rounded-2xl hover:bg-blue-600/30 transition">
              <p className="text-xs font-bold text-blue-400 mb-2">AI HYBRID BOT</p>
              <p className="text-[10px] text-gray-400">Trend + Liquidity + Volatility + AI</p>
            </button>

            {/* LIQUIDITY BOT */}
            <button className="p-5 bg-purple-600/20 border border-purple-500/30 rounded-2xl hover:bg-purple-600/30 transition">
              <p className="text-xs font-bold text-purple-400 mb-2">LIQUIDITY SWEEP</p>
              <p className="text-[10px] text-gray-400">Smart Money / Stop Hunt Detection</p>
            </button>

            {/* COPY TRADE */}
            <button className="p-5 bg-yellow-500/20 border border-yellow-500/30 rounded-2xl hover:bg-yellow-500/30 transition">
              <p className="text-xs font-bold text-yellow-400 mb-2">COPY TRADING AI</p>
              <p className="text-[10px] text-gray-400">AI + Social + Multi Strategy</p>
            </button>

          </div>
        </div>

        {/* COPY MODES (DYNAMIC PANEL STYLE) */}
        <div className="bg-black/40 border border-yellow-500/20 p-6 rounded-[32px]">
          <h3 className="text-yellow-500 text-xs font-bold mb-4 uppercase tracking-widest">
            Copy Trading Modes
          </h3>

          <div className="grid md:grid-cols-2 gap-4">

            <div className="p-4 border border-white/10 rounded-xl">
              <p className="text-xs font-bold">AI Master Trader</p>
              <p className="text-[10px] text-gray-400">Single AI → All users copy</p>
            </div>

            <div className="p-4 border border-white/10 rounded-xl">
              <p className="text-xs font-bold">Multi Strategy Pool</p>
              <p className="text-[10px] text-gray-400">Scalping / Swing / News</p>
            </div>

            <div className="p-4 border border-white/10 rounded-xl">
              <p className="text-xs font-bold">Risk Based Copy</p>
              <p className="text-[10px] text-gray-400">Auto lot sizing per user</p>
            </div>

            <div className="p-4 border border-white/10 rounded-xl">
              <p className="text-xs font-bold">Social + AI</p>
              <p className="text-[10px] text-gray-400">Humans + AI combined</p>
            </div>

          </div>
        </div>

        {/* START BUTTON */}
        <button 
          onClick={() => setIsBotRunning(!isBotRunning)}
          className={`w-full py-5 rounded-2xl font-black uppercase ${
            isBotRunning ? "bg-red-600" : "bg-yellow-500 text-black"
          }`}
        >
          {isBotRunning ? "STOP FOREX AI" : "START FOREX AI"}
        </button>

      </div>

      {/* RIGHT SIDE */}
      <div className="bg-black border border-white/10 p-6 rounded-[32px] h-[580px] flex flex-col">

        <h3 className="text-[10px] text-gray-400 uppercase mb-4">
          Forex Neural Console
        </h3>

        <div className="flex-1 text-[10px] font-mono space-y-2 overflow-y-auto">
          {!isBotRunning && (
            <p className="text-gray-600">Bot em standby...</p>
          )}
          {logs.map((log, i) => (
            <p key={i} className="text-yellow-400">{log}</p>
          ))}
        </div>

      </div>

    </motion.div>
  ) : (
             
            <motion.div 
  key="crypto" 
  initial={{ opacity: 0, y: 20 }} 
  animate={{ opacity: 1, y: 0 }} 
  exit={{ opacity: 0, y: -20 }}
  className="grid grid-cols-1 lg:grid-cols-3 gap-8"
>
  {/* BOT LEFT: CONFIG, GAS & STATS */}
  <div className="lg:col-span-2 space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatCard title="Gas Balance" value="1,250" unit="E-Coin" color="text-orange-500" />
      <StatCard title="Binance Balance" value="1,240" unit="USDT" color="text-green-500" />
      <StatCard title="Total Profit" value="+142.50" unit="USDT" color="text-emerald-400" />
    </div>

    <div className="bg-[#0f172a]/80 border border-blue-500/20 p-8 rounded-[32px] backdrop-blur-xl">
        <div className="flex justify-between items-center mb-8">
            <h3 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2 text-blue-400"><Settings size={18}/> API & Gas Control</h3>
            <div className={`px-3 py-1 rounded-full text-[10px] font-bold ${isBotRunning ? 'bg-green-500/20 text-green-500 border border-green-500/30' : 'bg-red-500/20 text-red-500 border border-red-500/30'}`}>
                {isBotRunning ? '• BOT ACTIVE' : '• BOT STANDBY'}
            </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <input 
  type="password"
  value={apiKey}
  onChange={(e) => setApiKey(e.target.value)}
  placeholder="Binance API Key"
  className="bg-black/40 border border-white/10 p-4 rounded-xl text-sm"
/>

<input 
  type="password"
  value={secretKey}
  onChange={(e) => setSecretKey(e.target.value)}
  placeholder="Binance Secret Key"
  className="bg-black/40 border border-white/10 p-4 rounded-xl text-sm"
/>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">

  <button
    onClick={() => {
      if (!apiKey || !secretKey) {
        alert("Preencha as API Keys");
        return;
      }

      localStorage.setItem("EKD_API_KEY", apiKey);
      localStorage.setItem("EKD_SECRET_KEY", secretKey);
      setSaved(true);
    }}
    className="py-3 bg-blue-600 rounded-xl text-xs font-bold hover:bg-blue-500"
  >
    Guardar API
  </button>

  <button
    onClick={() => {
      localStorage.removeItem("EKD_API_KEY");
      localStorage.removeItem("EKD_SECRET_KEY");
      setApiKey("");
      setSecretKey("");
      setSaved(false);
    }}
    className="py-3 bg-red-600 rounded-xl text-xs font-bold hover:bg-red-500"
  >
    Remover API
  </button>

</div>

{saved && (
  <p className="text-green-400 text-xs mb-4">
    ✔ API guardada com sucesso
  </p>
)}

<div className="bg-yellow-500/10 border border-yellow-500/20 p-5 rounded-2xl mb-6">
  
  <h3 className="text-xs text-yellow-500 font-bold mb-3 uppercase tracking-widest">
    Referral Leader Node
  </h3>

  <input
    value={upline}
    onChange={(e) => setUpline(e.target.value)}
    placeholder="Inserir Upline Address"
    className="w-full mb-3 p-3 bg-black border border-white/10 rounded text-xs"
  />

  <div className="flex gap-3">
    <button
      onClick={() => {
        localStorage.setItem("EKD_UPLINE", upline);
      }}
      className="flex-1 py-2 bg-yellow-500 text-black rounded-xl text-xs font-bold"
    >
      Bind Upline
    </button>

    <button
      className="flex-1 py-2 border border-yellow-500 text-yellow-500 rounded-xl text-xs font-bold"
    >
      Claim Referral
    </button>
  </div>

  <p className="text-[10px] text-white/40 mt-3">
    Earn 10% from your network gas usage
  </p>

</div>
        <div className="grid grid-cols-2 gap-4 mb-6">
            <button className="flex items-center justify-center gap-2 py-3 bg-orange-500/10 border border-orange-500/30 text-orange-500 rounded-xl text-xs font-bold hover:bg-orange-500/20 transition-all">
                <ArrowUpRight size={14}/> DEPOSIT GAS
            </button>
            <button className="flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 text-white/60 rounded-xl text-xs font-bold hover:bg-white/10 transition-all">
                <RefreshCw size={14}/> WITHDRAW GAS
            </button>
        </div>

        <button 
            onClick={() => setIsBotRunning(!isBotRunning)}
            className={`w-full py-5 rounded-2xl font-black flex items-center justify-center gap-3 transition-all uppercase tracking-widest ${isBotRunning ? 'bg-red-600 hover:bg-red-500 shadow-lg shadow-red-600/20' : 'bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/20'}`}
        >
            {isBotRunning ? (
              <>
                <Square size={18} fill="white" /> Terminar Sessão
              </>
            ) : (
              <>
                <Play size={18} fill="white" /> Ativar Neural Bot 🤖
              </>
            )}
        </button>
    </div>

    <div className="bg-white/5 border border-white/10 p-6 rounded-[32px] grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="text-center">
            <p className="text-[9px] text-gray-500 uppercase font-mono">Detected</p>
            <p className="text-xl font-bold text-white">120</p>
        </div>
        <div className="text-center">
            <p className="text-[9px] text-gray-500 uppercase font-mono">Executed</p>
            <p className="text-xl font-bold text-emerald-400">12</p>
        </div>
        <div className="text-center">
            <p className="text-[9px] text-gray-500 uppercase font-mono">Skipped</p>
            <p className="text-xl font-bold text-red-400">108</p>
        </div>
        <div className="text-center">
            <p className="text-[9px] text-gray-500 uppercase font-mono">Fee Model</p>
            <p className="text-[10px] font-bold text-yellow-500 mt-2">0.1% / Cycle</p>
        </div>
    </div>
  </div>


  {/* CRYPTO RIGHT: LIVE CONSOLE */}
  <div className="bg-black border border-white/10 p-6 rounded-[32px] flex flex-col h-[580px] shadow-2xl relative overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
    
    <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
        <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isBotRunning ? 'bg-blue-500 animate-ping' : 'bg-gray-600'}`} />
            <h3 className="text-[10px] font-mono text-gray-400 uppercase tracking-widest italic">Neural Link Console</h3>
        </div>
        <span className="text-[9px] font-mono text-blue-500/50">LATENCY: 12ms</span>
    </div>

    <div className="flex-1 overflow-y-auto space-y-3 font-mono text-[10px]">
        {!isBotRunning && (
            <div className="flex flex-col items-center justify-center h-full text-center p-6 space-y-4">
                <Cpu size={40} className="text-white/10" />
                <p className="text-gray-600 italic">Sistema em Standby.<br/>Aguardando ativação do Neural Bot.</p>
            </div>
        )}
        {logs.map((log, i) => (
            <div key={i} className="flex flex-col gap-1 border-l-2 border-blue-500/20 pl-3 py-1">
                <span className="text-blue-400/90">{log}</span>
                <span className="text-[8px] text-orange-500/60 uppercase font-bold">Gas Deducted: 0.05% E-Coin Per Perform amount</span>
            </div>
        ))}
    </div>
    

    <div className="mt-4 p-3 bg-orange-500/10 border border-orange-500/20 rounded-xl">
        <p className="text-[9px] text-orange-500 flex items-center gap-2 font-bold uppercase tracking-tighter">
            <ShieldCheck size={12}/> Protocolo: 10% Referral Leader / 90% Treasury
        </p>
        {/* FOREX RIGHT: REFERRAL INFO */}
              <div className="bg-gradient-to-b from-yellow-500/10 to-transparent border border-yellow-500/20 p-8 rounded-[32px]">
                <h3 className="text-yellow-500 text-xs font-bold mb-4 uppercase tracking-[0.2em]">Referral Node</h3>
                <div className="space-y-4">
                    <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                        <p className="text-[10px] text-gray-500">Your E-Coin Commission</p>
                        <p className="text-xl font-mono">2,400 E-Coin</p>
                    </div>
                    <p className="text-[11px] text-gray-400 leading-relaxed italic">Ganhe 10% de todo o gás consumido pelos seus referidos no modo AI Bot.</p>
                </div>
              </div>
    </div>
  </div>
</motion.div>

          )}
        </AnimatePresence>

        {/* GLOBAL INFRA DATA */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 opacity-40 hover:opacity-100 transition-opacity">
            <div className="text-center">
                <p className="text-[9px] text-gray-500 uppercase mb-1 font-mono">Node Latency</p>
                <p className="text-xs font-bold text-blue-400">12ms</p>
            </div>
            <div className="text-center">
                <p className="text-[9px] text-gray-500 uppercase mb-1 font-mono">E-Coin Burn Rate</p>
                <p className="text-xs font-bold text-orange-400">1.2K / HR</p>
            </div>
            <div className="text-center">
                <p className="text-[9px] text-gray-500 uppercase mb-1 font-mono">Total TVL</p>
                <p className="text-xs font-bold text-green-400">$2.4M</p>
            </div>
            <div className="text-center">
                <p className="text-[9px] text-gray-500 uppercase mb-1 font-mono">AI Confidence</p>
                <p className="text-xs font-bold text-purple-400">98.4%</p>
            </div>
        </div>

      </div>
    </div>
  );
}
