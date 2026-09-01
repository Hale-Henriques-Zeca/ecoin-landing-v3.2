"use client";

import { useEffect, useState } from "react";
import { useReadContract } from "wagmi";
import { Timer, Radio } from "lucide-react";
import { CONTRACTS } from "@/lib/contracts/contracts";
import { streamingStakingAbi } from "@/lib/abis/streamingStakingAbi";

import { miningStakingAbi } from "@/lib/abis/miningStakingAbi";

export default function RewardStreamIndicator(){

const { data:lastStream } = useReadContract({
 address:CONTRACTS.MINING_STAKING,
 abi:miningStakingAbi,
 functionName:"lastStream",
});

const { data:streamRate } = useReadContract({
 address:CONTRACTS.MINING_STAKING,
 abi:miningStakingAbi,
 functionName:"streamRate",
});

const [now,setNow] =
useState(Math.floor(Date.now()/1000));

useEffect(()=>{

 const t=setInterval(()=>{
  setNow(Math.floor(Date.now()/1000));
 },1000);

 return ()=>clearInterval(t);

},[]);

const streamEnd =
 lastStream && streamRate
 ? Number(lastStream)+Number(streamRate)
 : 0;

const streamLeft = streamEnd-now;

const total =
streamRate
? Number(streamRate)
: 3600;

const progress =
 streamLeft<=0
 ? 100
 : ((total-streamLeft)/total)*100;

function format(sec:number){

 if(sec<=0)
 return "Streaming active";

 const m=Math.floor(sec/60);
 const s=sec%60;

 return `${m}m ${s}s`;

}

function formatTime(sec: number) {
    if (sec <= 0) return "Streaming Ativo (Injeção em Andamento)";

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
              Transmissão de Taxas de Acionista
            </h4>
            <p className="text-[10px] text-zinc-500 font-mono">
              Redistribuição Contínua do Ecossistema
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
          <span className="text-zinc-500">Progresso do Ciclo</span>
          <span className="text-emerald-400 font-bold">{progress.toFixed(1)}%</span>
        </div>
      </div>

      {/* RODAPÉ DE STATUS DE INJEÇÃO */}
      <div className="p-3 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-between">
        <p className="text-[11px] text-zinc-400">
          Próxima injeção de dividendos:
        </p>
        <p className="text-[11px] font-black text-emerald-400 font-mono">
          {formatTime(streamLeft)}
        </p>
      </div>
    </div>
  );
}