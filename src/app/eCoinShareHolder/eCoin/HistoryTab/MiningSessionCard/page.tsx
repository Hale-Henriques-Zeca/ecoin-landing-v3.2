"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Clock3,
  Fuel,
  Coins,
  CheckCircle2,
  TrendingUp,
  History,
  ShieldCheck,
  AlertCircle,
  Zap,
} from "lucide-react";
import { useAccount, useReadContract, useReadContracts } from "wagmi";
import { formatUnits } from "viem";
import { CONTRACTS } from "@/lib/contracts/contracts";

const ECOIN_MINING_SESSION_ABI = [
  {
    name: "miningSession",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "user", type: "address" }],
    outputs: [{ type: "uint256" }],
  },
  {
    name: "sessions",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "user", type: "address" },
      { name: "sessionId", type: "uint256" },
    ],
    outputs: [
      { name: "startedAt", type: "uint256" },
      { name: "endedAt", type: "uint256" },
      { name: "gasPurchased", type: "uint256" },
      { name: "gasConsumed", type: "uint256" },
      { name: "claimedECoin", type: "uint256" },
      { name: "completed", type: "bool" },
    ],
  },
  {
    name: "gasCapacity",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "user", type: "address" }],
    outputs: [{ type: "uint256" }],
  },
  {
    name: "gasConsumed",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "user", type: "address" }],
    outputs: [{ type: "uint256" }],
  },
  {
    name: "gasPurchasedECoin",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "user", type: "address" }],
    outputs: [{ type: "uint256" }],
  },
  {
    name: "pendingRewards",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "userAddr", type: "address" }],
    outputs: [{ name: "pendingECoinAmount", type: "uint256" }],
  },
] as const;

interface ParsedSessionItem {
  id: number;
  startedAt: number;
  endedAt: number;
  gasPurchased: number;
  gasCapacityMax: number;
  gasConsumed: number;
  claimedECoin: number;
  pendingECoin: number;
  completed: boolean;
  isExhaustedAwaitingClaim: boolean;
  isCurrentActive: boolean;
}

export default function MiningHistoryPanel() {
  const { address } = useAccount();

  const contractConfig = {
    address: CONTRACTS.eCoin_Mining_Staking_eCoin,
    abi: ECOIN_MINING_SESSION_ABI,
    chainId: 56,
  } as const;

  // 1. Lê o ID da sessão atual e os contadores ativos da conta
  const { data: headReads, isLoading: isLoadingHead } = useReadContracts({
    contracts: address
      ? [
          {
            ...contractConfig,
            functionName: "miningSession",
            args: [address],
          },
          {
            ...contractConfig,
            functionName: "gasCapacity",
            args: [address],
          },
          {
            ...contractConfig,
            functionName: "gasConsumed",
            args: [address],
          },
          {
            ...contractConfig,
            functionName: "gasPurchasedECoin",
            args: [address],
          },
          {
            ...contractConfig,
            functionName: "pendingRewards",
            args: [address],
          },
        ]
      : [],
    query: {
      enabled: Boolean(address),
      refetchInterval: 10000,
    },
  });

  const currentSessionId =
    address && headReads?.[0]?.status === "success"
      ? Number(headReads[0].result ?? 0)
      : 0;

  const liveGasCapacity =
    address && headReads?.[1]?.status === "success"
      ? Number(formatUnits((headReads[1].result as bigint) ?? 0n, 18))
      : 0;

  const liveGasConsumed =
    address && headReads?.[2]?.status === "success"
      ? Number(formatUnits((headReads[2].result as bigint) ?? 0n, 18))
      : 0;

  const liveGasPurchased =
    address && headReads?.[3]?.status === "success"
      ? Number(formatUnits((headReads[3].result as bigint) ?? 0n, 18))
      : 0;

  const livePendingECoin =
    address && headReads?.[4]?.status === "success"
      ? Number(formatUnits((headReads[4].result as bigint) ?? 0n, 18))
      : 0;

  // 2. Busca todas as sessões de 0 até currentSessionId inclusive
  const sessionIndices = useMemo(() => {
    if (!address) return [];
    const totalCount = Math.min(currentSessionId + 1, 50);
    return Array.from({ length: totalCount }, (_, i) => i);
  }, [address, currentSessionId]);

  const { data: sessionReads, isLoading: isLoadingSessions } = useReadContracts({
    contracts: address
      ? sessionIndices.map((idx) => ({
          ...contractConfig,
          functionName: "sessions" as const,
          args: [address, BigInt(idx)] as const,
        }))
      : [],
    query: {
      enabled: Boolean(address && sessionIndices.length > 0),
      refetchInterval: 10000,
    },
  });

  // 3. Consolida sessões concluídas + sessão corrente (esgotada ou em andamento)
  const sessionsList: ParsedSessionItem[] = useMemo(() => {
    if (!address || !sessionReads) return [];

    const items: ParsedSessionItem[] = [];

    sessionIndices.forEach((sessionId, idx) => {
      const entry = sessionReads[idx];
      if (!entry || entry.status !== "success" || !entry.result) return;

      const raw = entry.result as readonly [
        bigint,
        bigint,
        bigint,
        bigint,
        bigint,
        boolean
      ];

      const startedAt = Number(raw[0] ?? 0n);
      const endedAt = Number(raw[1] ?? 0n);
      const storedPurchased = Number(formatUnits(raw[2] ?? 0n, 18));
      const storedConsumed = Number(formatUnits(raw[3] ?? 0n, 18));
      const claimedECoin = Number(formatUnits(raw[4] ?? 0n, 18));
      const completed = Boolean(raw[5]);

      const isCurrent = sessionId === currentSessionId;

      const gasPurchased = isCurrent
        ? Math.max(storedPurchased, liveGasPurchased)
        : storedPurchased;

      const gasCapacityMax = isCurrent
        ? liveGasCapacity > 0
          ? liveGasCapacity
          : gasPurchased * 1.3
        : gasPurchased * 1.3;

      const gasConsumed = isCurrent
        ? Math.max(storedConsumed, liveGasConsumed)
        : storedConsumed;

      // Ignora sessão vazia nunca iniciada
      if (
        startedAt === 0 &&
        gasPurchased <= 0 &&
        gasConsumed <= 0 &&
        claimedECoin <= 0 &&
        !completed
      ) {
        return;
      }

      // No contrato: gasConsumed[user] + 1e12 >= gasCapacity[user] marca esgotamento
      const isExhausted =
        !completed &&
        gasCapacityMax > 0 &&
        gasConsumed + 0.000001 >= gasCapacityMax;

      items.push({
        id: sessionId,
        startedAt,
        endedAt,
        gasPurchased,
        gasCapacityMax,
        gasConsumed,
        claimedECoin,
        pendingECoin: isCurrent ? livePendingECoin : 0,
        completed,
        isExhaustedAwaitingClaim: isExhausted,
        isCurrentActive: isCurrent && !completed && !isExhausted,
      });
    });

    // Mais recentes primeiro
    return items.reverse();
  }, [
    address,
    sessionReads,
    sessionIndices,
    currentSessionId,
    liveGasCapacity,
    liveGasConsumed,
    liveGasPurchased,
    livePendingECoin,
  ]);

  const loading = Boolean(address) && (isLoadingHead || isLoadingSessions);

  if (loading) {
    return (
      <div className="w-full py-12 text-center bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#D4AF37] mx-auto mb-3" />
        <p className="text-xs text-white/50 font-mono uppercase tracking-widest">
          Carregando Sessões do Histórico CS (eCoin)...
        </p>
      </div>
    );
  }

  if (sessionsList.length === 0) {
    return (
      <div className="w-full py-12 px-6 text-center bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl space-y-3">
        <History size={36} className="text-white/20 mx-auto" />
        <h3 className="text-white font-bold text-base">
          Nenhum Registro de Sessão CS
        </h3>
        <p className="text-xs text-gray-400 max-w-sm mx-auto">
          Suas atividades de consumo de Selo de Compromisso (CS) e geração de
          recompensas em eCoin aparecerão listadas aqui assim que forem
          executadas no contrato inteligente.
        </p>
      </div>
    );
  }

  const formatDateTime = (timestampSec: number) => {
    if (!timestampSec || timestampSec <= 0) return "--/--/----";
    return new Date(timestampSec * 1000).toLocaleString("pt-PT", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-4">
      {sessionsList.map((session, index) => {
        const totalGeneratedECoin = session.completed
          ? session.claimedECoin
          : session.claimedECoin + session.pendingECoin;

        const roi =
          session.gasPurchased > 0
            ? (totalGeneratedECoin / session.gasPurchased) * 100
            : 0;

        const cardBorder = session.completed
          ? "border-white/10 hover:border-[#D4AF37]/30"
          : session.isExhaustedAwaitingClaim
          ? "border-amber-500/40 hover:border-amber-400/60"
          : "border-emerald-500/30 hover:border-emerald-400/50";

        return (
          <motion.div
            key={`ecoin-session-${session.id}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className={`
              relative
              overflow-hidden
              rounded-3xl
              border
              ${cardBorder}
              bg-[#09090b]/60
              backdrop-blur-xl
              p-6
              transition-all
            `}
          >
            {/* Brilho decorativo de fundo */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 via-transparent to-transparent pointer-events-none" />

            <div className="relative z-10">
              {/* Header do Card */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                <div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={18} className="text-[#D4AF37]" />
                    <h2 className="text-white font-black text-lg md:text-xl tracking-tight">
                      Sessão Shareholder CS #{session.id + 1}
                    </h2>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30">
                      ID #{session.id}
                    </span>
                  </div>

                  {session.completed ? (
                    <p className="text-emerald-400 text-xs uppercase font-bold mt-1 tracking-wider flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      Ciclo de Dividendos CS Concluído
                    </p>
                  ) : session.isExhaustedAwaitingClaim ? (
                    <p className="text-amber-400 text-xs uppercase font-bold mt-1 tracking-wider flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                      Capacidade CS 100% Esgotada — Aguardando Saque (Claim)
                    </p>
                  ) : (
                    <p className="text-cyan-400 text-xs uppercase font-bold mt-1 tracking-wider flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                      Ciclo CS Ativo em Execução
                    </p>
                  )}
                </div>

                {session.completed ? (
                  <div className="bg-emerald-500/10 p-2 rounded-xl border border-emerald-500/20">
                    <CheckCircle2 className="text-emerald-400" size={20} />
                  </div>
                ) : session.isExhaustedAwaitingClaim ? (
                  <div className="bg-amber-500/10 p-2 rounded-xl border border-amber-500/20">
                    <AlertCircle className="text-amber-400" size={20} />
                  </div>
                ) : (
                  <div className="bg-cyan-500/10 p-2 rounded-xl border border-cyan-500/20">
                    <Zap className="text-cyan-400" size={20} />
                  </div>
                )}
              </div>

              {/* Aviso informativo quando o ciclo atingiu 100% e falta apenas o Claim para selar no contrato */}
              {session.isExhaustedAwaitingClaim && (
                <div className="mb-5 rounded-2xl border border-amber-500/25 bg-amber-500/10 px-4 py-3 text-xs text-amber-200/90 leading-relaxed">
                  O teto de <strong>130% ({session.gasCapacityMax.toFixed(4)} eCoin)</strong> desta sessão já foi totalmente consumido. Ao executar{" "}
                  <strong>Sacar Recompensas (Claim)</strong> na aba Dividendos, o contrato selará esta sessão como concluída e iniciará automaticamente a{" "}
                  <strong>Sessão #{session.id + 2}</strong>.
                </div>
              )}

              {/* Grid de Métricas da Sessão */}
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 pt-4 border-t border-white/5">
                <div>
                  <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest mb-1">
                    Início do Ciclo CS
                  </p>
                  <div className="flex items-center gap-2 text-white font-mono text-xs">
                    <CalendarDays size={14} className="text-white/40 shrink-0" />
                    <span>{formatDateTime(session.startedAt)}</span>
                  </div>
                </div>

                <div>
                  <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest mb-1">
                    Término do Ciclo CS
                  </p>
                  <div className="flex items-center gap-2 text-white font-mono text-xs">
                    <Clock3 size={14} className="text-white/40 shrink-0" />
                    <span>
                      {session.completed && session.endedAt > 0
                        ? formatDateTime(session.endedAt)
                        : session.isExhaustedAwaitingClaim
                        ? "Aguardando Claim"
                        : "Em Andamento"}
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest mb-1">
                    Capacidade CS Utilizada
                  </p>
                  <div className="flex items-center gap-2 text-red-400 font-mono font-bold text-xs">
                    <Fuel size={14} className="shrink-0" />
                    <span>
                      {session.gasConsumed.toFixed(4)} /{" "}
                      {session.gasCapacityMax.toFixed(4)} eCoin
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest mb-1">
                    {session.completed
                      ? "Recompensas Sacadas"
                      : "Recompensas Geradas"}
                  </p>
                  <div className="flex items-center gap-2 text-[#D4AF37] font-mono font-bold text-xs">
                    <Coins size={14} className="shrink-0" />
                    <span>{totalGeneratedECoin.toFixed(6)} eCoin</span>
                  </div>
                </div>

                <div>
                  <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest mb-1">
                    Retorno CS (ROI)
                  </p>
                  <div className="flex items-center gap-1 text-emerald-400 font-black font-mono text-xs">
                    <TrendingUp size={14} className="shrink-0" />
                    <span>{roi.toFixed(2)}%</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}