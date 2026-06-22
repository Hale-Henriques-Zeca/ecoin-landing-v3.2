"use client";

import React, { useState, useEffect } from "react";
import { Cpu, ShieldCheck, Play, Square, Settings, RefreshCcw } from "lucide-react";
import useSWR from "swr";

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
  const [showCredentials, setShowCredentials] = useState(false);

  const { data: opportunities } = useSWR(
  "http://localhost:4000/api/arbitrage/opportunities",
  (url) => fetch(url).then(r => r.json()),
  {
    refreshInterval: 1000,
  }
);

const { data: market } = useSWR(
  "http://localhost:4000/api/arbitrage/market",
  (url) => fetch(url).then(r => r.json()),
  {
    refreshInterval: 1000,
  }
);


const { data: history } = useSWR(
  "http://localhost:4000/api/arbitrage/history",
  (url) => fetch(url).then(r => r.json()),
  {
    refreshInterval: 1000,
  }
);

const { data: stats } = useSWR(
  "http://localhost:4000/api/arbitrage/stats",
  (url) => fetch(url).then(r => r.json()),
  {
    refreshInterval: 1000,
  }
);

const { data: exchange } = useSWR(
  "http://localhost:4000/api/binance/balance",
  (url) => fetch(url).then(r => r.json()),
  {
    refreshInterval: 5000,
  }
);

const { data: systemIp } = useSWR(
  "http://localhost:4000/api/system/ip",
  (url) => fetch(url).then(r => r.json())
);

  useEffect(() => {
    const storedKey = localStorage.getItem("EKD_API_KEY");
    const storedSecret = localStorage.getItem("EKD_SECRET_KEY");
    if (storedKey && storedSecret) { setApiKey(storedKey); setSecretKey(storedSecret); setSaved(true); }
  }, []);



  

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fadeIn">
      {/* ESQUERDA */}
      <div className="lg:col-span-2 space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
  title="Gas Balance"
  value={(user?.ecGas ?? 0).toLocaleString()}
  unit="ecGas"
  color="text-blue-400"
/>

<StatCard
  title="Exchange Balance"
  value={
    exchange?.balance?.toFixed(2)
      ?? "0.00"
  }
  unit="USDT"
  color="text-green-400"
/>

<StatCard
  title="Open Trades"
  value={opportunities?.length ?? 0}
  unit="LIVE"
  color="text-blue-400"
/>

<StatCard
  title="Daily PnL"
  value={stats?.totalProfit?.toFixed(2) ?? "0.00"}
  unit="%"
  color="text-emerald-400"
/>
        </div>

        {/* API CONTROL PANEL */}
        <div className="bg-[#0f172a]/80 border border-blue-500/20 p-8 rounded-[32px] backdrop-blur-xl shadow-xl">

  <div className="flex justify-between items-center mb-8">
    <h3 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2 text-blue-400">
      <Cpu size={18}/>
      Triangular Market Scanner
    </h3>

    <div
      className={`px-3 py-1 rounded-full text-[10px] font-bold ${
        isBotRunning
          ? "bg-green-500/20 text-green-500 border-green-500/30"
          : "bg-red-500/20 text-red-500 border-red-500/30"
      } border`}
    >
      {isBotRunning ? "• ACTIVE" : "• STANDBY"}
    </div>
  </div>

  <div className="grid md:grid-cols-3 gap-4">

    <div className="bg-black/30 border border-white/10 rounded-xl p-4">
      <p className="text-blue-400 font-bold mb-2">ETH/BTC</p>
      <p className="text-white/70 text-xs">BID {market?.ETHBTC?.bid ?? "---"}</p>
      <p className="text-white/70 text-xs">ASK {market?.ETHBTC?.ask ?? "---"}</p>
    </div>

    <div className="bg-black/30 border border-white/10 rounded-xl p-4">
      <p className="text-blue-400 font-bold mb-2">BTC/USDT</p>
      <p className="text-white/70 text-xs">BID {market?.BTCUSDT?.bid ?? "---"}</p>
      <p className="text-white/70 text-xs">ASK {market?.BTCUSDT?.ask ?? "---"}</p>
    </div>

    <div className="bg-black/30 border border-white/10 rounded-xl p-4">
      <p className="text-blue-400 font-bold mb-2">ETH/USDT</p>
      <p className="text-white/70 text-xs">BID {market?.ETHUSDT?.bid ?? "---"}</p>
      <p className="text-white/70 text-xs">ASK {market?.ETHUSDT?.ask ?? "---"}</p>
    </div>

  </div>

  <div className="mt-6 bg-black/30 border border-white/10 rounded-xl p-4">
    <p className="text-xs text-yellow-400 font-bold mb-4">
      LIVE CALCULATION ENGINE
    </p>

    <div className="space-y-3">

      <div>
        <p className="text-white text-xs">
          USDT→BTC→ETH→USDT
        </p>
        <p className="text-red-400 font-bold">
          {market?.profit1 ?? "---"}%
        </p>
      </div>

      <div>
        <p className="text-white text-xs">
          USDT→ETH→BTC→USDT
        </p>
        <p className="text-red-400 font-bold">
          {market?.profit2 ?? "---"}%
        </p>
      </div>

    </div>
  </div>

  <button
    onClick={toggleBot}
    className={`w-full mt-6 py-5 rounded-2xl font-black flex items-center justify-center gap-3 transition-all uppercase tracking-widest ${
      isBotRunning
        ? "bg-red-600 hover:bg-red-500"
        : "bg-blue-600 hover:bg-blue-500"
    }`}
  >
    {isBotRunning
      ? "Terminar Sessão"
      : "Ativar Triangular Bot"}
  </button>

  <button
    onClick={() => setShowCredentials(!showCredentials)}
    className="w-full mt-4 bg-white/5 border border-white/10 py-3 rounded-xl text-xs uppercase tracking-widest font-bold"
  >
    ⚙ Binance Credentials
  </button>

  
  {showCredentials && (

    
    <div className="mt-4 space-y-4">

      <input
        type="password"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        placeholder="Binance API Key"
        className="w-full bg-black/40 border border-white/10 p-4 rounded-xl"
      />

      <input
        type="password"
        value={secretKey}
        onChange={(e) => setSecretKey(e.target.value)}
        placeholder="Binance Secret Key"
        className="w-full bg-black/40 border border-white/10 p-4 rounded-xl"
      />

      <div className="grid grid-cols-2 gap-4">

        <button
          onClick={() => {
            localStorage.setItem("EKD_API_KEY", apiKey);
            localStorage.setItem("EKD_SECRET_KEY", secretKey);
            setSaved(true);
          }}
          className="py-3 bg-blue-600/20 border border-blue-600/50 text-blue-400 rounded-xl"
        >
          Guardar API
        </button>


        <button
          onClick={async () => {

  localStorage.setItem(
    "EKD_API_KEY",
    apiKey
  );

  localStorage.setItem(
    "EKD_SECRET_KEY",
    secretKey
  );

  await fetch(
    "http://localhost:4000/api/binance/connect",
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        apiKey,
        secretKey,
      }),
    }
  );

  setSaved(true);

}}
          className="py-3 bg-red-600/20 border border-red-600/50 text-red-400 rounded-xl"
        >
          Remover API
        </button>

      </div>

      {saved && (
        <p className="text-green-400 text-xs">
          ✔ API guardada com sucesso
        </p>
      )}

    </div>
  )}
  
  <div className="mt-4">
  <div className="bg-black/30 border border-white/10 rounded-xl p-4">

  <p className="text-yellow-400 text-xs font-bold mb-3">
    Binance Trusted IP
  </p>

  <div className="flex gap-2">

    <input
      readOnly
      value={systemIp?.ips?.[0] ?? ""}
      className="flex-1 bg-black/40 border border-white/10 p-3 rounded-xl"
    />

    <button
      onClick={() => {
        navigator.clipboard.writeText(
          systemIp?.ips?.[0] ?? ""
        );
      }}
      className="px-4 bg-yellow-500 text-black rounded-xl font-bold"
    >
      Copiar
    </button>

  </div>

  <p className="text-[10px] text-gray-500 mt-3">
    Adicione este IP na Binance para activar Spot Trading.
  </p>

</div>
</div>

</div>

        {/* METRICS */}

<div className="bg-white/5 border border-white/10 p-6 rounded-[32px] grid grid-cols-2 md:grid-cols-4 gap-6">

  <div className="text-center">
    <p className="text-[9px] text-gray-500 uppercase font-mono">
      Triangles Found
    </p>

    <p className="text-xl font-bold text-white">
      {opportunities?.length ?? 0}
    </p>
  </div>

  <div className="text-center">
    <p className="text-[9px] text-gray-500 uppercase font-mono">
      Executed
    </p>

    <p className="text-xl font-bold text-emerald-400">
      {stats?.successfulTrades ?? 0}
    </p>
  </div>

  <div className="text-center">
    <p className="text-[9px] text-gray-500 uppercase font-mono">
      Failed
    </p>

    <p className="text-xl font-bold text-red-400">
      {stats?.failedTrades ?? 0}
    </p>
  </div>

  <div className="text-center">
    <p className="text-[9px] text-gray-500 uppercase font-mono">
      Avg Profit
    </p>

    <p className="text-[10px] font-bold text-[#D4AF37] mt-2">
      {stats?.totalTrades
        ? (
            stats.totalProfit /
            stats.totalTrades
          ).toFixed(4)
        : "0.0000"}
      % / Cycle
    </p>
  </div>

</div>

        {/* PROFIT STATISTICSS */}

        <div className="bg-white/5 border border-white/10 p-6 rounded-[32px]">

  <h3 className="text-sm font-bold uppercase tracking-widest text-blue-400 mb-6">
    Profit Statistics
  </h3>

  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

    <div className="bg-black/20 rounded-xl p-4">
      <p className="text-gray-500 text-[10px] uppercase">
        Total Trades
      </p>

      <p className="text-white text-xl font-bold mt-2">
        {stats?.totalTrades ?? 0}
      </p>
    </div>

    <div className="bg-black/20 rounded-xl p-4">
      <p className="text-gray-500 text-[10px] uppercase">
        Successful
      </p>

      <p className="text-green-400 text-xl font-bold mt-2">
        {stats?.successfulTrades ?? 0}
      </p>
    </div>

    <div className="bg-black/20 rounded-xl p-4">
      <p className="text-gray-500 text-[10px] uppercase">
        Failed
      </p>

      <p className="text-red-400 text-xl font-bold mt-2">
        {stats?.failedTrades ?? 0}
      </p>
    </div>

    <div className="bg-black/20 rounded-xl p-4">
      <p className="text-gray-500 text-[10px] uppercase">
        Win Rate
      </p>

      <p className="text-yellow-400 text-xl font-bold mt-2">
        {(stats?.winRate ?? 0).toFixed(2)}%
      </p>
    </div>

    <div className="bg-black/20 rounded-xl p-4">
      <p className="text-gray-500 text-[10px] uppercase">
        Best Trade
      </p>

      <p className="text-green-400 text-xl font-bold mt-2">
        {stats?.bestTrade ?? 0}%
      </p>
    </div>

    <div className="bg-black/20 rounded-xl p-4">
      <p className="text-gray-500 text-[10px] uppercase">
        Worst Trade
      </p>

      <p className="text-red-400 text-xl font-bold mt-2">
        {stats?.worstTrade ?? 0}%
      </p>
    </div>

  </div>

</div>
        

        {/* EXECUTION HISTORY */}

        <div className="bg-white/5 border border-white/10 p-6 rounded-[32px] mt-6">

  <h3 className="text-sm font-bold uppercase tracking-widest text-blue-400 mb-6">
    Execution History
  </h3>

  <div className="space-y-3">

    {(history ?? []).length === 0 ? (

      <p className="text-xs text-gray-500">
        No executions yet.
      </p>

    ) : (

      history.map((trade: any, index: number) => (

        <div
          key={index}
          className="flex justify-between items-center bg-black/20 border border-white/5 rounded-xl p-4"
        >
          <div>
            <p className="text-xs text-white">
              {trade.route}
            </p>

            <p className="text-[10px] text-gray-500">
              {new Date(trade.timestamp).toLocaleTimeString()}
            </p>
          </div>

          <div className="text-right">
            <p className="text-green-400 font-bold">
              +{trade.profit}%
            </p>

            <p className="text-[10px] text-red-400">
              Fee: {trade.fee ?? 0}%
            </p>
          </div>
        </div>

      ))

    )}

  </div>

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

        <div className="flex-1 overflow-y-auto space-y-4">

  <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-4">

    <p className="text-[10px] uppercase text-blue-400 font-bold">
      Neural Scanner Status
    </p>

    <p className="text-xs text-white mt-2">
      Monitoring:
    </p>

    <p className="text-[10px] text-gray-400 mt-1">
      ETH/BTC • BTC/USDT • ETH/USDT
    </p>

    <p className="text-[10px] text-gray-500 mt-2">
      Routes: 2
    </p>

  </div>

  {!isBotRunning ? (

    <div className="flex flex-col items-center justify-center h-64 text-center">

      <Cpu size={40} className="text-white/10" />

      <p className="text-gray-600 italic mt-4">
        Sistema em Standby.
      </p>

    </div>

  ) : opportunities?.length > 0 ? (

    opportunities.slice(0, 10).map((op: any, i: number) => (

      <div
        key={i}
        className="border border-green-500/20 bg-green-500/5 rounded-xl p-4"
      >

        <p className="text-green-400 font-bold">
          🟢 OPPORTUNITY DETECTED
        </p>

        <p className="text-white text-xs mt-2">
          {op.route}
        </p>

        <p className="text-yellow-400 font-bold mt-2">
          +{op.profit}%
        </p>

        <p className="text-gray-500 text-[9px] mt-1">
          {new Date(op.timestamp).toLocaleTimeString()}
        </p>

      </div>

    ))

  ) : (

    <div className="flex flex-col items-center justify-center h-64 text-center">

      <Cpu size={40} className="text-white/10" />

      <p className="text-gray-600 italic mt-4">
        Scanner ativo.
      </p>

      <p className="text-gray-500 text-xs">
        Nenhuma oportunidade encontrada.
      </p>

    </div>

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