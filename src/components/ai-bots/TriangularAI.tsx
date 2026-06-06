"use client";

import React, { useState, useEffect } from "react";
import { Cpu, ShieldCheck, Play, Square, Settings, RefreshCcw } from "lucide-react";

const StatCard = ({ title, value, unit, color = "text-white" }: any) => (
  <div className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-md hover:bg-white/10 transition-colors">
    <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">{title}</p>
    <div className="flex items-baseline gap-2">
      <span className="text-2xl font-mono font-bold text-white">{value}</span>
      {unit && <span className={`text-[10px] font-bold ${color}`}>{unit}</span>}
    </div>
  </div>
);

export default function TriangularAI({ user, isBotRunning, toggleBot }: any) {
  const [apiKey, setApiKey] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [saved, setSaved] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const storedKey = localStorage.getItem("EKD_API_KEY");
    const storedSecret = localStorage.getItem("EKD_SECRET_KEY");
    if (storedKey && storedSecret) { setApiKey(storedKey); setSecretKey(storedSecret); setSaved(true); }
  }, []);

  // Simulação de Logs do Bot Triangular
  useEffect(() => {
    if (!isBotRunning) return;
    const messages = [
      "Analyzing Triangle: USDT -> BTC -> ETH -> USDT", 
      "Imbalance detected on Binance Spot", 
      "Executing 3-way swap...", 
      "Net Profit: +0.45 USDT",
      "Deducting Gas: 1.5 ecGas"
    ];
    const interval = setInterval(() => {
      const msg = `[${new Date().toLocaleTimeString()}] ${messages[Math.floor(Math.random() * messages.length)]}`;
      setLogs(prev => [msg, ...prev].slice(0, 8));
    }, 2500);
    return () => clearInterval(interval);
  }, [isBotRunning]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fadeIn">
      {/* ESQUERDA */}
      <div className="lg:col-span-2 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard title="Gas Balance" value={(user?.ecGas ?? 0).toLocaleString()} unit="ecGas" color="text-blue-400" />
          <StatCard title="Gas Value" value={((user?.ecGas ?? 0) / 1000).toFixed(2)} unit="USDT" color="text-green-400" />
          <StatCard title="Bot Status" value={isBotRunning ? "ON" : "OFF"} color={isBotRunning ? "text-green-400" : "text-red-400"} />
        </div>

        {/* API CONTROL PANEL */}
        <div className="bg-[#0f172a]/80 border border-blue-500/20 p-8 rounded-[32px] backdrop-blur-xl shadow-xl">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2 text-blue-400">
              <Settings size={18}/> Triangular API Control
            </h3>
            <div className={`px-3 py-1 rounded-full text-[10px] font-bold ${isBotRunning ? 'bg-green-500/20 text-green-500 border-green-500/30' : 'bg-red-500/20 text-red-500 border-red-500/30'} border`}>
              {isBotRunning ? '• ACTIVE' : '• STANDBY'}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <input type="password" value={apiKey} onChange={(e) => setApiKey(e.target.value)} placeholder="Binance API Key" className="bg-black/40 border border-white/10 p-4 rounded-xl text-sm focus:border-blue-500 outline-none transition" />
            <input type="password" value={secretKey} onChange={(e) => setSecretKey(e.target.value)} placeholder="Binance Secret Key" className="bg-black/40 border border-white/10 p-4 rounded-xl text-sm focus:border-blue-500 outline-none transition" />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <button onClick={() => { localStorage.setItem("EKD_API_KEY", apiKey); localStorage.setItem("EKD_SECRET_KEY", secretKey); setSaved(true); }} className="py-3 bg-blue-600/20 border border-blue-600/50 text-blue-400 rounded-xl text-xs font-bold hover:bg-blue-600 hover:text-white transition">Guardar API</button>
            <button onClick={() => { localStorage.removeItem("EKD_API_KEY"); localStorage.removeItem("EKD_SECRET_KEY"); setApiKey(""); setSecretKey(""); setSaved(false); }} className="py-3 bg-red-600/20 border border-red-600/50 text-red-400 rounded-xl text-xs font-bold hover:bg-red-600 hover:text-white transition">Remover API</button>
          </div>
          {saved && <p className="text-green-400 text-xs mb-6 text-center">✔ API guardada com sucesso</p>}

          <button onClick={toggleBot} className={`w-full py-5 rounded-2xl font-black flex items-center justify-center gap-3 transition-all uppercase tracking-widest ${isBotRunning ? 'bg-red-600 hover:bg-red-500' : 'bg-blue-600 hover:bg-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.3)]'}`}>
            {isBotRunning ? <><Square size={18} fill="currentColor" /> Terminar Sessão</> : <><RefreshCcw size={18} /> Ativar Triangular Bot</>}
          </button>
        </div>

        {/* METRICS */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-[32px] grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center"><p className="text-[9px] text-gray-500 uppercase font-mono">Triangles Found</p><p className="text-xl font-bold text-white">45</p></div>
          <div className="text-center"><p className="text-[9px] text-gray-500 uppercase font-mono">Executed</p><p className="text-xl font-bold text-emerald-400">8</p></div>
          <div className="text-center"><p className="text-[9px] text-gray-500 uppercase font-mono">Skipped</p><p className="text-xl font-bold text-red-400">37</p></div>
          <div className="text-center"><p className="text-[9px] text-gray-500 uppercase font-mono">Avg Profit</p><p className="text-[10px] font-bold text-[#D4AF37] mt-2">+0.2% / Cycle</p></div>
        </div>
      </div>

      {/* DIREITA: CONSOLA NEURAL */}
      <div className="bg-[#050505] border border-white/10 p-6 rounded-[32px] flex flex-col h-full min-h-[500px] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
        <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isBotRunning ? 'bg-blue-500 animate-ping' : 'bg-gray-600'}`} />
            <h3 className="text-[10px] font-mono text-gray-400 uppercase tracking-widest italic">Triangular Neural Link</h3>
          </div>
          <span className="text-[9px] font-mono text-blue-500/50">LATENCY: 5ms</span>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3 font-mono text-[10px]">
          {!isBotRunning ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-6 space-y-4">
              <Cpu size={40} className="text-white/10" />
              <p className="text-gray-600 italic">Sistema em Standby.<br/>Aguardando ativação.</p>
            </div>
          ) : (
            logs.map((log, i) => (
              <div key={i} className="flex flex-col gap-1 border-l-2 border-blue-500/20 pl-3 py-1">
                <span className="text-blue-400/90">{log}</span>
                <span className="text-[8px] text-[#D4AF37]/80 uppercase font-bold">Gas Deducted: 0.05%</span>
              </div>
            ))
          )}
        </div>
        
        <div className="mt-4 p-3 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-xl">
          <p className="text-[9px] text-[#D4AF37] flex items-center gap-2 font-bold uppercase tracking-tighter">
            <ShieldCheck size={12}/> Internal Binance Router API
          </p>
        </div>
      </div>
    </div>
  );
}