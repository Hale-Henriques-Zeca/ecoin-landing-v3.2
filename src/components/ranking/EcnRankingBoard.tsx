"use client";

import React, { useState, useEffect } from "react";
import {
  Trophy,
  RefreshCw,
  Flame,
  Lock,
  TrendingUp,
  Users,
} from "lucide-react";
import { useAccount } from "wagmi";
import {
  MainRankingTab,
  TraderSubMode,
  ReferralSubMode,
  PoolFilter,
  TimeWindowKey,
  TIME_WINDOWS,
  REFERRAL_LEVEL_FILTERS,
} from "./rankingTypes";
import { useEcnRanking } from "@/hooks/useEcnRanking";
import { RankingRowCard } from "./RankingRowCard";

export function EcnRankingBoard() {
  const { address } = useAccount();

  const [mainTab, setMainTab] = useState<MainRankingTab>("ecnTrader");
  const [traderMode, setTraderMode] = useState<TraderSubMode>("topMargin");
  const [referralMode, setReferralMode] = useState<ReferralSubMode>("all");
  const [poolFilter, setPoolFilter] = useState<PoolFilter>("ALL");
  const [timeWindow, setTimeWindow] = useState<TimeWindowKey>("90d");

  // Contador regressivo visual (ciclo de 3h = 10800s)
  const [secondsLeft, setSecondsLeft] = useState<number>(9790);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 10800));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = String(Math.floor(secondsLeft / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((secondsLeft % 3600) / 60)).padStart(
    2,
    "0"
  );
  const seconds = String(secondsLeft % 60).padStart(2, "0");

  const { entries, isLoading, refetch } = useEcnRanking({
    mainTab,
    traderMode,
    referralMode,
    poolFilter,
    timeWindow,
  });

  // Posição da carteira conectada
  const myIndex = address
    ? entries.findIndex(
        (item) => item.address.toLowerCase() === address.toLowerCase()
      )
    : -1;
  const myEntry = myIndex >= 0 ? entries[myIndex] : null;

  const showTimeFilters =
    (mainTab === "ecnTrader" && traderMode === "topGainers") ||
    mainTab === "referrals" ||
    mainTab === "ecGas";

  return (
    <section className="w-full max-w-3xl mx-auto bg-[#0D1017] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
      {/* CABEÇALHO DOURADO COM TROFÉU EM MARCA D'ÁGUA */}
      <div className="relative p-5 sm:p-6 bg-gradient-to-b from-[#D4AF37]/20 via-[#0D1017] to-[#0D1017] border-b border-white/10">
        <Trophy className="w-28 h-28 text-[#D4AF37]/10 absolute right-4 top-2 pointer-events-none" />

        <div className="flex items-center justify-between gap-2 mb-4">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#F9D13E] to-[#D4AF37]">
            Ranking On-Chain
          </h2>

          <button
            type="button"
            onClick={() => void refetch()}
            disabled={isLoading}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-white/80 cursor-pointer"
          >
            <RefreshCw
              size={12}
              className={isLoading ? "animate-spin text-[#F9D13E]" : ""}
            />
            <span>BSC Sync</span>
          </button>
        </div>

        {/* ABAS PRINCIPAIS */}
        <div className="flex items-center gap-5 sm:gap-7 border-b border-white/10 pb-2.5 text-xs sm:text-sm font-bold overflow-x-auto">
          <button
            type="button"
            onClick={() => setMainTab("ecnTrader")}
            className={`pb-2 transition whitespace-nowrap cursor-pointer relative ${
              mainTab === "ecnTrader"
                ? "text-white"
                : "text-white/50 hover:text-white/80"
            }`}
          >
            ecnTrader
            {mainTab === "ecnTrader" && (
              <span className="absolute bottom-0 left-0 right-0 h-1 rounded-full bg-[#F9D13E]" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setMainTab("referrals")}
            className={`pb-2 transition whitespace-nowrap cursor-pointer relative ${
              mainTab === "referrals"
                ? "text-white"
                : "text-white/50 hover:text-white/80"
            }`}
          >
            Referências (Comissão)
            {mainTab === "referrals" && (
              <span className="absolute bottom-0 left-0 right-0 h-1 rounded-full bg-[#F9D13E]" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setMainTab("ecGas")}
            className={`pb-2 transition whitespace-nowrap cursor-pointer relative ${
              mainTab === "ecGas"
                ? "text-white"
                : "text-white/50 hover:text-white/80"
            }`}
          >
            ecGas & VIP
            {mainTab === "ecGas" && (
              <span className="absolute bottom-0 left-0 right-0 h-1 rounded-full bg-[#F9D13E]" />
            )}
          </button>
        </div>

        {/* SUB-MODOS EM PÍLULA DOURADA — ECNTRADER */}
        {mainTab === "ecnTrader" && (
          <div className="mt-4 grid grid-cols-3 p-1 rounded-full bg-black/60 border border-[#D4AF37]/40 text-[11px] sm:text-xs font-black">
            <button
              type="button"
              onClick={() => setTraderMode("topMargin")}
              className={`py-2 px-2 rounded-full flex items-center justify-center gap-1 transition cursor-pointer ${
                traderMode === "topMargin"
                  ? "bg-gradient-to-r from-[#F9D13E] to-[#D4AF37] text-black"
                  : "text-white/70 hover:text-white"
              }`}
            >
              <Lock size={12} />
              <span className="truncate">Top Margin</span>
            </button>

            <button
              type="button"
              onClick={() => setTraderMode("liveProfit")}
              className={`py-2 px-2 rounded-full flex items-center justify-center gap-1 transition cursor-pointer ${
                traderMode === "liveProfit"
                  ? "bg-gradient-to-r from-[#F9D13E] to-[#D4AF37] text-black"
                  : "text-white/70 hover:text-white"
              }`}
            >
              <Flame size={12} />
              <span className="truncate">Live Profit</span>
            </button>

            <button
              type="button"
              onClick={() => setTraderMode("topGainers")}
              className={`py-2 px-2 rounded-full flex items-center justify-center gap-1 transition cursor-pointer ${
                traderMode === "topGainers"
                  ? "bg-gradient-to-r from-[#F9D13E] to-[#D4AF37] text-black"
                  : "text-white/70 hover:text-white"
              }`}
            >
              <TrendingUp size={12} />
              <span className="truncate">Top Gainers</span>
            </button>
          </div>
        )}

        {/* SUB-MODOS EM PÍLULA DOURADA — REFERÊNCIAS (3 NÍVEIS + GERAL) */}
        {mainTab === "referrals" && (
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-1 p-1 rounded-2xl sm:rounded-full bg-black/60 border border-[#D4AF37]/40 text-[11px] sm:text-xs font-black">
            {REFERRAL_LEVEL_FILTERS.map((lvl) => (
              <button
                key={lvl.key}
                type="button"
                onClick={() => setReferralMode(lvl.key)}
                className={`py-2 px-2.5 rounded-xl sm:rounded-full flex items-center justify-center gap-1 transition cursor-pointer ${
                  referralMode === lvl.key
                    ? "bg-gradient-to-r from-[#F9D13E] to-[#D4AF37] text-black"
                    : "text-white/70 hover:text-white"
                }`}
              >
                <Users size={12} className="shrink-0" />
                <span className="truncate">{lvl.shortLabel}</span>
              </button>
            ))}
          </div>
        )}

        {/* TEXTO EXPLICATIVO CONTEXTUAL */}
        <p className="mt-3 text-[11px] sm:text-xs text-white/60 leading-relaxed">
          {mainTab === "ecnTrader" &&
            traderMode === "topMargin" &&
            "Ranking estático de principal em Staking (eCoin) e % de domínio do pool. Só altera se outro utilizador ultrapassar o montante bloqueado."}
          {mainTab === "ecnTrader" &&
            traderMode === "liveProfit" &&
            "Lucro ao vivo ainda não sacado. Assim que o utilizador realiza o saque na blockchain, sai automaticamente desta posição."}
          {mainTab === "ecnTrader" &&
            traderMode === "topGainers" &&
            "Maiores ganhadores acumulados verificados diretamente no armazenamento on-chain da BNB Smart Chain."}
          {mainTab === "referrals" &&
            referralMode === "all" &&
            "Comissões totais acumuladas nos 3 níveis de rede (L1 Direto + L2 Indireto + L3 Rede) via UnifiedReferralV2."}
          {mainTab === "referrals" &&
            referralMode === "level1" &&
            "Comissões e convidados diretos (Nível 1) vinculados diretamente ao link ou código do líder."}
          {mainTab === "referrals" &&
            referralMode === "level2" &&
            "Comissões e membros indiretos de 2.º nível (Nível 2) gerados pelos indicados diretos."}
          {mainTab === "referrals" &&
            referralMode === "level3" &&
            "Comissões e expansão profunda de 3.º nível (Nível 3 — Rede) no ecossistema EdenKingDom."}
          {mainTab === "ecGas" &&
            "Classificação de capacidade ecGas adquirida e estatuto VIP ativo no ecossistema EdenKingDom."}
        </p>

        {/* FILTRO DE POOL + FILTRO TEMPORAL (90 Dia, 30 Dia, 15 Dia, 7 Dia, 1 Dia) */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
          {showTimeFilters ? (
            <div className="flex flex-wrap items-center gap-1.5">
              {TIME_WINDOWS.map((w) => (
                <button
                  key={w.key}
                  type="button"
                  onClick={() => setTimeWindow(w.key)}
                  className={`px-3 py-1 rounded-full text-[11px] font-bold transition cursor-pointer ${
                    timeWindow === w.key
                      ? "bg-[#F9D13E] text-black"
                      : "bg-white/5 text-white/60 hover:bg-white/10"
                  }`}
                >
                  {w.label}
                </button>
              ))}
            </div>
          ) : (
            <div className="text-[11px] font-mono text-[#F9D13E]">
              {traderMode === "topMargin"
                ? "• Posição Estática On-Chain"
                : "• Atualização em Tempo Real (Live)"}
            </div>
          )}

          {/* Filtro rápido de Pool (visível apenas na aba ecnTrader) */}
          {mainTab === "ecnTrader" && (
            <div className="flex items-center gap-1 bg-black/50 p-1 rounded-full border border-white/10 text-[10px] font-mono">
              {(["ALL", "ECOIN", "STABLE"] as PoolFilter[]).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPoolFilter(p)}
                  className={`px-2.5 py-0.5 rounded-full cursor-pointer transition ${
                    poolFilter === p
                      ? "bg-white/20 text-white font-bold"
                      : "text-white/50 hover:text-white"
                  }`}
                >
                  {p === "ALL" ? "Todos" : p === "ECOIN" ? "eCoin" : "Stables"}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* CONTAGEM REGRESSIVA DE ATUALIZAÇÃO */}
        <div className="mt-3 text-[11px] font-mono text-white/50">
          Próxima atualização de classificação:{" "}
          <span className="text-white/80 font-bold">
            {hours} : {minutes} : {seconds}
          </span>
        </div>
      </div>

      {/* LISTA DO RANKING */}
      <div className="p-4 sm:p-5 space-y-2.5 max-h-[540px] overflow-y-auto">
        {isLoading ? (
          <div className="py-12 text-center text-xs font-mono text-white/50">
            A sincronizar posições on-chain na BNB Smart Chain...
          </div>
        ) : entries.length === 0 ? (
          <div className="py-12 text-center text-xs font-mono text-white/50">
            Nenhum registo encontrado para este filtro na janela atual.
          </div>
        ) : (
          entries.map((entry, idx) => (
            <RankingRowCard
              key={`${entry.address}-${entry.poolType}-${idx}`}
              rank={idx + 1}
              entry={entry}
              mainTab={mainTab}
              traderMode={traderMode}
              referralMode={referralMode}
              isCurrentUser={
                Boolean(address) &&
                entry.address.toLowerCase() === address?.toLowerCase()
              }
            />
          ))
        )}
      </div>

      {/* BARRA FIXA DA POSIÇÃO DO UTILIZADOR CONECTADO */}
      {myEntry && (
        <div className="p-3.5 sm:p-4 bg-[#D4AF37]/15 border-t border-[#D4AF37]/40 flex items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="px-2.5 py-1 rounded-lg bg-[#D4AF37] text-black font-black shrink-0">
              #{myIndex + 1}
            </span>
            <div className="truncate">
              <div className="text-white font-bold truncate">
                A Minha Posição ({myEntry.vipTier})
              </div>
              <div className="text-[11px] text-white/70 truncate">
                {mainTab === "referrals"
                  ? `Rede: ${myEntry.directReferralsCount ?? 0} convidados (L1: ${
                      myEntry.l1Count ?? 0
                    } · L2: ${myEntry.l2Count ?? 0} · L3: ${
                      myEntry.l3Count ?? 0
                    })`
                  : mainTab === "ecGas"
                  ? "Capacidade ecGas adquirida no período"
                  : `Stake: ${myEntry.stakedECoin.toFixed(
                      2
                    )} eCoin (${myEntry.poolSharePercent.toFixed(2)}% Pool)`}
              </div>
            </div>
          </div>

          <div className="text-right shrink-0 font-black text-[#F9D13E]">
            {mainTab === "ecnTrader" && traderMode !== "topGainers"
              ? `Live: +${myEntry.liveProfit.toFixed(2)} ${myEntry.rewardSymbol}`
              : `+${myEntry.periodGain.toFixed(2)} ${myEntry.rewardSymbol}`}
          </div>
        </div>
      )}
    </section>
  );
}