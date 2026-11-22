"use client";

import { useEffect, useState } from "react";
import { Coins, Zap, PauseCircle } from "lucide-react";

type LiveRewardCounterProps = {
  pendingECoin?: number;
  ecoinPerSecond?: number;
  isMiningActive?: boolean;
};

export default function LiveRewardCounter({
  pendingECoin = 0,
  ecoinPerSecond = 0,
  isMiningActive = false,
}: LiveRewardCounterProps) {
  const [liveECoin, setLiveECoin] = useState(pendingECoin);

  // Sincroniza sempre que a leitura on-chain de pendingRewards(address) atualizar
  useEffect(() => {
    setLiveECoin(pendingECoin);
  }, [pendingECoin]);

  // Incrementa a cada segundo APENAS se isMiningActive == true, usando a taxa real ecoinPerSecond do contrato
  useEffect(() => {
    if (!isMiningActive || ecoinPerSecond <= 0) return;

    const timer = setInterval(() => {
      setLiveECoin((prev) => prev + ecoinPerSecond);
    }, 1000);

    return () => clearInterval(timer);
  }, [isMiningActive, ecoinPerSecond]);

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
              Balcão de Recompensas ao Vivo
            </h3>
            <p className="text-[10px] text-zinc-500 font-mono">
              Telemetria Exclusiva em eCoin (ERC20)
            </p>
          </div>
        </div>

        {/* STATUS BADGE */}
        {isMiningActive ? (
          <span className="flex h-2.5 w-2.5 relative" title="Mineração Ativa">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
        ) : (
          <span
            className="inline-flex items-center gap-1 text-[10px] font-bold uppercase text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full"
            title="Adicione capacidade de gás para continuar acumulando"
          >
            <PauseCircle size={11} /> Pausado
          </span>
        )}
      </div>

      {/* PAINEL PRINCIPAL DE RECOMPENSAS EM ECOIN */}
      <div className="bg-black/40 border border-white/5 rounded-2xl p-4 my-2 flex flex-col">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Coins size={13} className="text-[#D4AF37]" /> Saldo Pendente (eCoin)
          </span>
          <span className="text-[10px] font-mono text-emerald-400">
            {isMiningActive
              ? `+${ecoinPerSecond.toFixed(8)} /s`
              : "0.00000000 /s"}
          </span>
        </div>

        <div className="text-xl sm:text-2xl font-black text-[#D4AF37] font-mono tracking-tight break-all">
          {liveECoin.toFixed(9)}{" "}
          <span className="text-xs font-bold text-white/70">eCoin</span>
        </div>
      </div>

      <p className="text-[11px] text-zinc-500 mt-2 text-center font-medium">
        {isMiningActive
          ? "Recompensas em eCoin acumuladas em tempo real conforme sua capacidade de gás ativa."
          : "Saldo preservado no contrato. Recarregue gás em eCoin para retomar o acúmulo."}
      </p>
    </div>
  );
}