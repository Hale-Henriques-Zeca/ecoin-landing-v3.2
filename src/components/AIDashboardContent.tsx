"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Cpu, Zap, BarChart3, ShieldCheck, Wallet, 
  ArrowUpRight, RefreshCw, Settings, Database, 
  TrendingUp, Activity, Play, Square, Fuel
} from "lucide-react";

import {
  FaTelegramPlane,
  FaTelegram,
  FaWhatsapp,
  FaTwitter,
  FaDiscord,
} from "react-icons/fa";
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { BsStars } from "react-icons/bs";
import { Snowfall } from "react-snowfall";
import ReferralModalContent from "@/components/ReferralModalContent";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useDisconnect } from "wagmi";
import { CONTRACTS } from "@/lib/contracts";
import { erc20Abi } from "viem";
import EcoinWalletDashboard from "@/components/EcoinWalletDashboard";
import { useTradingGas } from "@/hooks/useTradingGas";
import BlockchainDeviceAlert from "@/components/BlockchainDeviceAlert";


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

export default function AIDashboardContent() {

const [loading, setLoading] = useState(false); 

   const { isConnected, address } = useAccount();
    const { disconnect } = useDisconnect();
     const gas = useTradingGas(isConnected ? address : undefined);

   
  
    const TRADINGGASVAULT_OWNER =
    process.env.NEXT_PUBLIC_TRADINGGASVAULT_OWNER?.toLowerCase();
  
  
    /* 🔐 WALLET */
    const [panelOpen, setPanelOpen] = useState(false);
  
  
     const [showModal, setShowModal] = useState(false);
    const fadeUp = {
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };
  
    /* ⛔ HYDRATION */
    const [mounted, setMounted] = useState(false);
  
   /* 📊 STAKING STATES */
     const [stakeAmount, setStakeAmount] = useState("");
   
    
   

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
    const messages = ["Scanning Binance liquidity...", "Order matched: BTC/USDT", "Profit: +0.02%", "Deducting Gas: 2 ecGas"];
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


// quando a wallet conectar, abre o painel automaticamente
useEffect(() => {
  if (isConnected) {
    setPanelOpen(true);
  } else {
    setPanelOpen(false);
  }
}, [isConnected]);



  useEffect(() => {
    setMounted(true);
  }, []);

  

  const isOwner =
  isConnected &&
  address &&
  TRADINGGASVAULT_OWNER &&
  address.toLowerCase() === TRADINGGASVAULT_OWNER;

  const gasLevel = gas?.gasBalance
  ? Math.min((gas.gasBalance / 10000) * 100, 100)
  : 0;
  
if (!mounted) return null;
  return (

  <div className="min-h-screen bg-[#020617] text-white pt-32 lg:pt-40 p-6 lg:p-12 font-sans selection:bg-yellow-500/30">

      
      {/* BACKGROUND EFFECTS */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_-20%,#1e293b,transparent)] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8">
          <div>
            <h1 className="text-3xl font-black tracking-tighter italic flex items-center gap-3">
              <Cpu className="text-yellow-500" /> E-COIN NEURAL TRADING AI ROBOT TERMINAL
            </h1>
            <p className="text-gray-500 text-sm font-mono uppercase tracking-widest mt-1">Hybrid Neural: Forex & Crypto AI Trading Robot</p>
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

  <StatCard
    title="Gas Balance"
    value={(gas?.gasBalance ?? 0).toLocaleString()}
    unit="ecGas"
    color="text-orange-500"
  />

  <StatCard
    title="Gas Value"
    value={(gas?.usdtValue ?? 0).toFixed(2)}
    unit="USDT"
    color="text-green-400"
  />

  <StatCard
    title="Bot Status"
    value={isBotRunning ? "ON" : "OFF"}
    unit=""
    color={isBotRunning ? "text-green-400" : "text-red-400"}
  />

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


      {/* FOREX RIGHT: LIVE CONSOLE */}
  <div className="bg-black border border-white/10 p-6 rounded-[32px] flex flex-col h-[580px] shadow-2xl relative overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
    
    <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
        <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isBotRunning ? 'bg-blue-500 animate-ping' : 'bg-gray-600'}`} />
            <h3 className="text-[10px] font-mono text-gray-400 uppercase tracking-widest italic">Forex Neural Link Console</h3>
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
                <span className="text-[8px] text-orange-500/60 uppercase font-bold">Gas Deducted: 0.05% E-Coin Per Trade Perform amount</span>
            </div>
        ))}
    </div>
    

    <div className="mt-4 p-3 bg-orange-500/10 border border-orange-500/20 rounded-xl">
        <p className="text-[9px] text-orange-500 flex items-center gap-2 font-bold uppercase tracking-tighter">
            <ShieldCheck size={12}/> Protocolo: 30% Referral Leader / 20% Pool de Mineração Neural da E-coin / 50% Treasury
        </p>
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
            <h3 className="text-[10px] font-mono text-gray-400 uppercase tracking-widest italic">Crypto Neural Link Console</h3>
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
                <span className="text-[8px] text-orange-500/60 uppercase font-bold">Gas Deducted: 0.05% E-Coin Per Trade Perform amount</span>
            </div>
        ))}
    </div>
    

    <div className="mt-4 p-3 bg-orange-500/10 border border-orange-500/20 rounded-xl">
        <p className="text-[9px] text-orange-500 flex items-center gap-2 font-bold uppercase tracking-tighter">
            <ShieldCheck size={12}/> Protocolo: 30% Referral Leader / 20% Pool de Mineração Neural da E-coin / 50% Treasury
        </p>
    </div>
  </div>
</motion.div>

          )}

{/* ================= GAS + BOT + PORTFOLIO STACK ================= */}
<motion.div 
  initial="hidden"
  animate="visible"
  variants={{
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  }}
  className="space-y-8 mt-8"
>

  <BlockchainDeviceAlert />

  {/* ================= ECGAS CONTROL ================= */}
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 40 },
      visible: { opacity: 1, y: 0 }
    }}
    className={`relative bg-[#0f172a]/80 border rounded-[28px] p-6 backdrop-blur-xl transition-all duration-500
    ${isBotRunning 
      ? "border-blue-400 shadow-[0_0_25px_rgba(59,130,246,0.4)]" 
      : "border-blue-500/20"
    }`}
  >

    {/* GLOW EFFECT */}
    {isBotRunning && (
      <div className="absolute inset-0 rounded-[28px] bg-blue-500/10 blur-xl animate-pulse pointer-events-none" />
    )}

    <div className="flex items-center justify-between mb-4 relative z-10">
      <p className="text-[10px] font-mono text-blue-400 uppercase tracking-widest">
        GAS VAULT (USDT ⇄ ecGas)
      </p>

      {address && (
        <span className="text-[9px] font-mono text-white/30">
          {address.slice(0, 6)}…{address.slice(-4)}
        </span>
      )}
    </div>

    {/* INPUT */}
    <input
      type="number"
      value={stakeAmount}
      onChange={(e) => setStakeAmount(e.target.value)}
      placeholder="Enter USDT or ecGas..."
      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xl text-white outline-none mb-5 font-mono placeholder:text-white/20 relative z-10"
    />

    {/* ACTION BUTTONS */}
    <div className="grid grid-cols-2 gap-4 relative z-10">
      <button
  disabled={loading}
  onClick={async () => {
    try {
      if (!stakeAmount) return alert("Enter amount");

      setLoading(true);

      await approve.approve(stakeAmount);
      await gas.deposit(stakeAmount);

    } catch (e: any) {
      alert(e?.message || "Deposit error");
    } finally {
      setLoading(false);
    }
  }}
  className="py-4 rounded-2xl font-black bg-gradient-to-r from-[#D4AF37] to-[#F3BA2F]"
>
  {loading ? "Processing..." : "DEPOSIT (USDT → GAS)"}
</button>

      <button
        onClick={async () => {
          try {
            if (!stakeAmount) return alert("Enter amount");
            await gas.redeem(stakeAmount);
          } catch (e: any) {
            alert(e?.message || "Redeem error");
          }
        }}
        className="py-4 rounded-2xl font-black text-red-400 border border-red-500/30 hover:bg-red-500/10 transition"
      >
        REDEEM (GAS → ECOIN)
      </button>
    </div>

    {/* 🔋 GAS BAR + REAL DATA */}
<div className="mt-6 relative z-10">

  {/* HEADER */}
  <div className="flex justify-between text-[10px] text-white/40 mb-1 font-mono">
    <span>Gas Level</span>
    <span>{gasLevel.toFixed(0)}%</span>
  </div>

  {/* BAR */}
  <div className="w-full h-3 bg-black/40 rounded-full overflow-hidden">
    <div
      className={`h-full transition-all duration-700 ${
        gasLevel > 60
          ? "bg-green-500"
          : gasLevel > 30
          ? "bg-yellow-500"
          : "bg-red-500"
      }`}
      style={{ width: `${gasLevel}%` }}
    />
  </div>

  {/* REAL DATA */}
  <div className="mt-3 flex justify-between text-xs font-mono">

    <span className="text-blue-400">
      {(gas?.gasBalance ?? 0).toLocaleString()} ecGas
    </span>

    <span className="text-green-400">
      {(gas?.usdtValue ?? 0).toFixed(2)} USDT
    </span>

  </div>

</div>

    <div className="mt-4 text-[10px] text-white/40 font-mono relative z-10">
      1 USDT = 1000 ecGas • Bot consumes gas per trade
    </div>

  </motion.div>

  {/* ================= PORTFOLIO ================= */}
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 40 },
      visible: { opacity: 1, y: 0 }
    }}
    className="bg-white/5 border border-white/10 rounded-[28px] p-6 backdrop-blur-xl hover:border-blue-400/30 transition"
  >
    <EcoinWalletDashboard />
  </motion.div>

</motion.div>


        </AnimatePresence>

        {/* INVITE */}
                    <div className="text-center mt-16">
                      <button
                        onClick={() => setShowModal(true)}
                        className="bg-gradient-to-r from-[#00FF9C] to-[#00C3FF] text-black font-bold py-3 px-10 rounded-full"
                      >
                        🎁 Convidar Amigos
                      </button>
                    </div>
              
                    {showModal && (
                      <div
                        onClick={() => setShowModal(false)}
                        className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
                      >
                        <div
                          onClick={(e) => e.stopPropagation()}
                          className="bg-[#0a0a0a] p-8 rounded-2xl border border-[#00FF9C]/30 w-[360px]"
                        >
                          <h3 className="text-[#00FF9C] text-xl mb-4">
                            Referral System Dashboard
                          </h3>
              
                          <ReferralModalContent />
                        </div>
                      </div>
                    )}
        
                   {/* 🌐 FOOTER */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
         className="mt-12 flex flex-col items-center gap-3 text-[#D4AF37]"
        >
          <p className="text-sm mb-3 text-gray-400">
             Conecte-se à comunidade E-Coin
          </p>
        
          <div className="flex justify-center gap-5 text-2xl">
                    <a href="https://t.me/ecoin2026" target="_blank" rel="noopener noreferrer">
                      <FaTelegramPlane />
                    </a>
                    <a href="https://x.com/CoinE28810" target="_blank" rel="noopener noreferrer">
                      <FaTwitter />
                    </a>
                    <a href="https://discord.com" target="_blank" rel="noopener noreferrer">
                      <FaDiscord />
                    </a>
                    <a href="https://t.me/ecoin2025" target="_blank" rel="noopener noreferrer">
                      <FaTelegram />
                    </a>
                    <a href="https://chat.whatsapp.com/G1F6USX5NrrLKikm7yiXXQ" target="_blank" rel="noopener noreferrer">
                      <FaWhatsapp />
                    </a>
                  </div>
        
          <BsStars className="text-3xl mt-5 animate-pulse text-[#D4AF37]" />
        </motion.div>
        
                
        
                
             
        

      </div>
    </div>
  );
}
