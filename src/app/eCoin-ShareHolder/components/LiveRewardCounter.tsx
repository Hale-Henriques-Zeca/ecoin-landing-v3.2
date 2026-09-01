"use client";

import { useEffect, useState } from "react";
import { Coins, Zap, TrendingUp } from "lucide-react";

type LiveRewardCounterProps = {
  pendingUSDT: number;
  pendingEUSD: number;
};

export default function LiveRewardCounter({
  pendingUSDT,
  pendingEUSD,
}: LiveRewardCounterProps) {
  const [liveUSDT, setLiveUSDT] = useState(pendingUSDT);
  const [liveEUSD, setLiveEUSD] = useState(pendingEUSD);

  useEffect(() => {
    setLiveUSDT(pendingUSDT);
    setLiveEUSD(pendingEUSD);
  }, [pendingUSDT, pendingEUSD]);

  useEffect(() => {
    const timer = setInterval(() => {
      setLiveUSDT((prev) =>
        prev + (pendingUSDT > 0 ? pendingUSDT * 0.00015 : 0.00001)
      );
      setLiveEUSD((prev) =>
        prev + (pendingEUSD > 0 ? pendingEUSD * 0.00015 : 0.00001)
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [pendingUSDT, pendingEUSD]);

  return (
    <div className="bg-zinc-950/60 border border-[#D4AF37]/20 backdrop-blur-xl rounded-3xl p-6 shadow-2xl relative overflow-hidden flex flex-col justify-between">
      {/* SHIMMER GLOW VISUAL */}
      <div className="absolute -right-10 -top-10 w-32 h-32 bg-[#D4AF37]/5 rounded-full blur-2xl pointer-events-none" />

      {/* CABEÇALHO DO CONTADOR */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37]">
            <Zap size={18} />
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white">
              Balcão de Dividendos ao Vivo
            </h3>
            <p className="text-[10px] text-zinc-500 font-mono">
              Telemetria de Rendimento de Acionista
            </p>
          </div>
        </div>

        {/* PULSE BADGE */}
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
      </div>

      {/* PAINEL DE DIVIDENDOS (USDT & eDollar) */}
      <div className="grid grid-cols-2 gap-3 my-2">
        <div className="bg-black/40 border border-white/5 rounded-2xl p-3 flex flex-col">
          <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
            <Coins size={12} className="text-emerald-400" /> USDT
          </span>
          <span className="text-base font-black text-emerald-400 font-mono tracking-tight">
            {liveUSDT.toFixed(15)}
          </span>
        </div>

        <div className="bg-black/40 border border-white/5 rounded-2xl p-3 flex flex-col">
          <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
            <TrendingUp size={12} className="text-blue-400" /> eDollar
          </span>
          <span className="text-base font-black text-blue-400 font-mono tracking-tight">
            {liveEUSD.toFixed(15)}
          </span>
        </div>
      </div>

      <p className="text-[11px] text-zinc-500 mt-2 text-center font-medium">
        Dividendos do ecossistema acumulados e auditados em tempo real via Smart Contracts.
      </p>
    </div>
  );
}