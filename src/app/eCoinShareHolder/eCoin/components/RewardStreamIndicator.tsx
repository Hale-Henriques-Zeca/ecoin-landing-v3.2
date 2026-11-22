"use client";

import { useEffect, useState } from "react";
import { useReadContracts } from "wagmi";
import { formatUnits } from "viem";
import { Timer, Radio, Layers } from "lucide-react";
import { CONTRACTS } from "@/lib/contracts/contracts";
import { eCoinMiningStakingAbi } from "@/lib/abis/eCoinMining/eCoinMiningStakingAbi";

export default function RewardStreamIndicator() {
  const contractConfig = {
    address: CONTRACTS.eCoin_Mining_Staking_eCoin,
    abi: eCoinMiningStakingAbi,
    chainId: 56,
  } as const;

  const { data: streamData } = useReadContracts({
    contracts: [
      {
        ...contractConfig,
        functionName: "lastStream",
      },
      {
        ...contractConfig,
        functionName: "streamRate",
      },
      {
        ...contractConfig,
        functionName: "rewardBufferECoin",
      },
      {
        ...contractConfig,
        functionName: "totalEligibleStaked",
      },
    ],
    query: {
      refetchInterval: 10000,
    },
  });

  const lastStream =
    streamData?.[0]?.status === "success" ? Number(streamData[0].result) : 0;
  const streamRate =
    streamData?.[1]?.status === "success"
      ? Number(streamData[1].result)
      : 3600; // Default do contrato: 1 hours (3600s)
  const rewardBufferECoin =
    streamData?.[2]?.status === "success"
      ? Number(formatUnits(streamData[2].result as bigint, 18))
      : 0;
  const totalEligibleStaked =
    streamData?.[3]?.status === "success"
      ? Number(formatUnits(streamData[3].result as bigint, 18))
      : 0;

  // No contrato streamRewards(): uint256 ecoinAmount = rewardBufferECoin / 24;
  const nextCycleEmissionECoin = rewardBufferECoin / 24;

  const [now, setNow] = useState(() => Math.floor(Date.now() / 1000));

  useEffect(() => {
    const t = setInterval(() => {
      setNow(Math.floor(Date.now() / 1000));
    }, 1000);

    return () => clearInterval(t);
  }, []);

  const streamEnd = lastStream > 0 && streamRate > 0 ? lastStream + streamRate : 0;
  const streamLeft = streamEnd > 0 ? streamEnd - now : 0;
  const total = streamRate > 0 ? streamRate : 3600;

  const progress =
    streamEnd === 0
      ? 0
      : streamLeft <= 0
      ? 100
      : Math.min(100, Math.max(0, ((total - streamLeft) / total) * 100));

  function formatTime(sec: number) {
    if (streamEnd === 0) return "Aguardando primeiro ciclo de stream";
    if (totalEligibleStaked <= 0) return "Aguardando mineradores elegíveis";
    if (sec <= 0) return "Pronto para Injeção (streamRewards)";

    const m = Math.floor(sec / 60);
    const s = sec % 60;

    return `${m}m ${s < 10 ? "0" : ""}${s}s para o próximo ciclo`;
  }

  return (
    <div className="bg-zinc-950/60 border border-[#D4AF37]/20 backdrop-blur-xl rounded-3xl p-5 space-y-4 shadow-2xl relative overflow-hidden">
      {/* HEADER DO FLUXO DE TRANSMISSÃO */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
            <Radio size={18} className="animate-pulse" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Stream de Mineração eCoin (1/24h)
            </h4>
            <p className="text-[10px] text-zinc-500 font-mono">
              Distribuição Proporcional ao Stake Elegível
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-[#D4AF37]">
          <Timer size={14} />
          <span>{streamLeft <= 0 ? "LIVE" : `${Math.max(0, streamLeft)}s`}</span>
        </div>
      </div>

      {/* BARRA DE PROGRESSO DO CICLO */}
      <div className="space-y-1.5">
        <div className="h-2.5 w-full bg-black/60 rounded-full overflow-hidden border border-white/5 p-0.5">
          <div
            className="h-full bg-gradient-to-r from-[#D4AF37] via-emerald-400 to-amber-500 rounded-full transition-all duration-500 shadow-sm shadow-[#D4AF37]/50"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between items-center text-[10px] font-mono">
          <span className="text-zinc-500">Progresso do Ciclo (Mineração)</span>
          <span className="text-emerald-400 font-bold">
            {progress.toFixed(1)}%
          </span>
        </div>
      </div>

      {/* TELEMETRIA DO BUFFER E EMISSÃO DO CICLO */}
      <div className="grid grid-cols-2 gap-2 pt-1">
        <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
          <span className="text-[10px] text-zinc-500 block font-mono">
          Total Minerado
          </span>
          <span className="text-xs font-bold text-white font-mono">
            {rewardBufferECoin.toFixed(2)} eCoin
          </span>
        </div>

        <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
          <span className="text-[10px] text-zinc-500 flex items-center gap-1 font-mono">
            <Layers size={10} className="text-[#D4AF37]" /> Próximo Lote (1/24)
          </span>
          <span className="text-xs font-bold text-[#D4AF37] font-mono">
            {nextCycleEmissionECoin.toFixed(4)} eCoin
          </span>
        </div>
      </div>

      {/* RODAPÉ DE STATUS DE INJEÇÃO */}
      <div className="p-3 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-between gap-2">
        <p className="text-[11px] text-zinc-400">Status da Mineração:</p>
        <p className="text-[11px] font-black text-emerald-400 font-mono text-right">
          {formatTime(streamLeft)}
        </p>
      </div>
    </div>
  );
}