"use client";

import React, { useMemo } from "react";
import {
  History,
  ArrowUpRight,
  RefreshCw,
  ExternalLink,
  Clock,
  AlertCircle,
  ArrowDownLeft,
  Coins,
  TrendingUp,
  Users,
  Shield,
  Zap,
  Repeat,
  Lock,
  Unlock,
  Gift,
  ShoppingBag,
  Tag,
  FileText,
  Key,
} from "lucide-react";
import { erc20Abi } from "viem";
import { useReadContracts } from "wagmi";

import { useEdenActivityRegistry } from "@/hooks/useEdenActivityRegistry";
import { CONTRACTS } from "@/lib/contracts/contracts";

const BSC_SCAN_TX_URL = "https://bscscan.com/tx/";
const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

// Mapeamento estático dos tokens principais do ecossistema EdenKingDom & BSC
function buildKnownTokenMap(): Record<string, string> {
  const map: Record<string, string> = {
    [ZERO_ADDRESS]: "BNB",
    "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee": "BNB",
    "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c": "WBNB",
    "0xdf69235019cc416dd5be75dfc0edc922ab4b5964": "eCoin",
    "0x55d398326f99059ff775485246999027b3197955": "USDT",
    "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d": "USDC",
    "0xe9e7cea3dedca5984780bafc599bd69add087d56": "BUSD",
  };

  const contractsRecord = CONTRACTS as Record<string, unknown>;

  for (const [key, value] of Object.entries(contractsRecord)) {
    if (typeof value !== "string" || !/^0x[a-fA-F0-9]{40}$/.test(value)) {
      continue;
    }

    const lowerAddr = value.toLowerCase();
    const upperKey = key.toUpperCase();

    if (
      upperKey === "ECOIN" ||
      upperKey === "ECOIN_TOKEN" ||
      upperKey === "ECOIN_ADDRESS"
    ) {
      map[lowerAddr] = "eCoin";
    } else if (
      upperKey === "EDOLLAR" ||
      upperKey === "EDOLLAR_TOKEN" ||
      upperKey === "EUSD" ||
      upperKey === "E_USD"
    ) {
      map[lowerAddr] = "eDollar";
    } else if (upperKey === "USDT" || upperKey === "USDT_TOKEN") {
      map[lowerAddr] = "USDT";
    } else if (upperKey === "ECGAS" || upperKey === "ECGAS_TOKEN") {
      map[lowerAddr] = "ecGas";
    }
  }

  return map;
}

const KNOWN_TOKENS = buildKnownTokenMap();

function normalizeTokenSymbol(rawSymbol: string): string {
  const clean = rawSymbol.trim();
  const upper = clean.toUpperCase();

  if (upper === "ECOIN" || upper === "E-COIN") return "eCoin";
  if (upper === "EDOLLAR" || upper === "E-USD" || upper === "EUSD") {
    return "eDollar";
  }
  if (upper === "BSC-USD" || upper === "USDT") return "USDT";
  if (upper === "ECGAS" || upper === "EC-GAS") return "ecGas";

  return clean;
}

// Configuração única de ícone, cores e estilos para cada tipo de atividade do contrato
function getActivityConfig(activityLabel: string) {
  const label = (activityLabel || "").toLowerCase();

  if (label.includes("buy e-coin") || label.includes("purchase")) {
    return {
      label: "Buy E-Coin",
      icon: ShoppingBag,
      color: "text-[#D4AF37]",
      bg: "bg-[#D4AF37]/15",
      border: "border-[#D4AF37]/30 hover:border-[#D4AF37]/60",
    };
  }
  if (label.includes("depósito") || label.includes("deposit")) {
    return {
      label: "Depósito",
      icon: ArrowDownLeft,
      color: "text-emerald-400",
      bg: "bg-emerald-500/15",
      border: "border-emerald-500/30 hover:border-emerald-500/60",
    };
  }
  if (label.includes("levantamento") || label.includes("withdrawal")) {
    return {
      label: "Levantamento",
      icon: ArrowUpRight,
      color: "text-rose-400",
      bg: "bg-rose-500/15",
      border: "border-rose-500/30 hover:border-rose-500/60",
    };
  }
  if (label.includes("staking") || label.includes("margem")) {
    return {
      label: "Staking / Margem",
      icon: TrendingUp,
      color: "text-amber-400",
      bg: "bg-amber-500/15",
      border: "border-amber-500/30 hover:border-amber-500/60",
    };
  }
  if (label.includes("remover staking") || label.includes("remove")) {
    return {
      label: "Remover Staking",
      icon: RefreshCw,
      color: "text-yellow-600",
      bg: "bg-yellow-600/15",
      border: "border-yellow-600/30 hover:border-yellow-600/60",
    };
  }
  if (label.includes("lucro") || label.includes("profit")) {
    return {
      label: "Lucro / Rendimento",
      icon: Coins,
      color: "text-green-400",
      bg: "bg-green-500/15",
      border: "border-green-500/30 hover:border-green-500/60",
    };
  }
  if (label.includes("referral") || label.includes("referência")) {
    return {
      label: "Comissão de Referral",
      icon: Users,
      color: "text-violet-400",
      bg: "bg-violet-500/15",
      border: "border-violet-500/30 hover:border-violet-500/60",
    };
  }
  if (label.includes("registo de código") || label.includes("code_registered")) {
    return {
      label: "Registo de Código",
      icon: Key,
      color: "text-sky-400",
      bg: "bg-sky-500/15",
      border: "border-sky-500/30 hover:border-sky-500/60",
    };
  }
  if (label.includes("vínculo") || label.includes("upline")) {
    return {
      label: "Vínculo de Referência",
      icon: Users,
      color: "text-indigo-400",
      bg: "bg-indigo-500/15",
      border: "border-indigo-500/30 hover:border-indigo-500/60",
    };
  }
  if (label.includes("trading")) {
    return {
      label: "Trading",
      icon: Zap,
      color: "text-cyan-400",
      bg: "bg-cyan-500/15",
      border: "border-cyan-500/30 hover:border-cyan-500/60",
    };
  }
  if (label.includes("investimento") || label.includes("investment")) {
    return {
      label: "Investimento",
      icon: Shield,
      color: "text-blue-400",
      bg: "bg-blue-500/15",
      border: "border-blue-500/30 hover:border-blue-500/60",
    };
  }
  if (label.includes("conversão") || label.includes("swap")) {
    return {
      label: "Conversão / Swap",
      icon: Repeat,
      color: "text-teal-400",
      bg: "bg-teal-500/15",
      border: "border-teal-500/30 hover:border-teal-500/60",
    };
  }
  if (label.includes("bloqueada") || label.includes("frozen")) {
    return {
      label: "Carteira Congelada",
      icon: Lock,
      color: "text-red-500",
      bg: "bg-red-500/15",
      border: "border-red-500/30 hover:border-red-500/60",
    };
  }
  if (label.includes("desbloqueada") || label.includes("unfrozen")) {
    return {
      label: "Carteira Descongelada",
      icon: Unlock,
      color: "text-emerald-500",
      bg: "bg-emerald-500/15",
      border: "border-emerald-500/30 hover:border-emerald-500/60",
    };
  }
  if (label.includes("airdrop")) {
    return {
      label: "Airdrop Claim",
      icon: Gift,
      color: "text-fuchsia-400",
      bg: "bg-fuchsia-500/15",
      border: "border-fuchsia-500/30 hover:border-fuchsia-500/60",
    };
  }
  if (label.includes("taxa") || label.includes("fee")) {
    return {
      label: "Taxa de Serviço",
      icon: Tag,
      color: "text-orange-400",
      bg: "bg-orange-500/15",
      border: "border-orange-500/30 hover:border-orange-500/60",
    };
  }

  return {
    label: activityLabel || "Atividade no Protocolo",
    icon: FileText,
    color: "text-zinc-300",
    bg: "bg-zinc-500/15",
    border: "border-zinc-500/30 hover:border-zinc-500/60",
  };
}

export default function MiningHistoryPanel() {
  const {
    activities,
    totalCount,
    isLoading,
    isLoadingMore,
    isError,
    hasMore,
    loadMore,
    refetch,
  } = useEdenActivityRegistry();

  // Identifica endereços de tokens ainda não presentes no mapa estático
  const unknownTokenAddresses = useMemo(() => {
    const unique = new Set<`0x${string}`>();
    for (const act of activities) {
      if (
        typeof act.token === "string" &&
        /^0x[a-fA-F0-9]{40}$/.test(act.token)
      ) {
        const lower = act.token.toLowerCase();
        if (!KNOWN_TOKENS[lower]) {
          unique.add(act.token as `0x${string}`);
        }
      }
    }
    return Array.from(unique);
  }, [activities]);

  // Busca automática do symbol() on-chain para qualquer token ERC-20 extra
  const { data: onChainSymbols } = useReadContracts({
    contracts: unknownTokenAddresses.map((tokenAddr) => ({
      address: tokenAddr,
      abi: erc20Abi,
      functionName: "symbol" as const,
      chainId: 56,
    })),
    query: {
      enabled: unknownTokenAddresses.length > 0,
      staleTime: 60_000,
    },
  });

  // Mapa unificado: endereço (lowercase) -> Nome próprio da moeda
  const resolvedTokenSymbols = useMemo(() => {
    const combined: Record<string, string> = { ...KNOWN_TOKENS };

    unknownTokenAddresses.forEach((addr, idx) => {
      const res = onChainSymbols?.[idx];
      if (
        res?.status === "success" &&
        typeof res.result === "string" &&
        res.result.trim().length > 0
      ) {
        combined[addr.toLowerCase()] = normalizeTokenSymbol(res.result);
      }
    });

    return combined;
  }, [unknownTokenAddresses, onChainSymbols]);

  const getTokenDisplayName = (token?: string, amount?: number): string | null => {
    if (!token) return null;
    const lower = token.toLowerCase();

    // Registos puramente administrativos (ex: vínculo de referral) usam address(0) com amount 0
    if (lower === ZERO_ADDRESS && (!amount || amount <= 0)) {
      return null;
    }

    if (resolvedTokenSymbols[lower]) {
      return resolvedTokenSymbols[lower];
    }

    return "Token";
  };

  return (
    <div className="space-y-4">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30">
            <History size={20} />
          </div>

          <div>
            <h3 className="text-base font-bold text-[#D4AF37] tracking-wide">
              Histórico de Atividades no Protocolo
            </h3>

            <p className="text-xs text-zinc-400 font-medium">
              Total armazenado on-chain:{" "}
              <span className="text-white font-bold">{totalCount}</span>
            </p>
          </div>
        </div>

        <button
          onClick={refetch}
          type="button"
          aria-label="Atualizar histórico"
          disabled={isLoading || isLoadingMore}
          className="rounded-xl bg-white/5 border border-white/10 p-2 text-zinc-300 transition-all hover:bg-white/10 hover:text-[#D4AF37] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <RefreshCw
            size={16}
            className={isLoading ? "animate-spin text-[#D4AF37]" : ""}
          />
        </button>
      </div>

      {/* Erro */}
      {isError && (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs text-red-400"
        >
          <AlertCircle size={16} className="mt-0.5 shrink-0" />

          <div className="flex-1">
            <p>Não foi possível carregar os registos on-chain.</p>

            <button
              type="button"
              onClick={refetch}
              className="mt-2 font-bold underline underline-offset-4 text-red-300 hover:text-white"
            >
              Tentar novamente
            </button>
          </div>
        </div>
      )}

      {/* Carregamento inicial */}
      {isLoading && activities.length === 0 && (
        <div className="py-12 text-center font-mono text-sm text-[#D4AF37]/70 animate-pulse">
          A carregar registos on-chain...
        </div>
      )}

      {/* Lista vazia */}
      {!isLoading && !isError && activities.length === 0 && (
        <div className="py-12 text-center text-sm text-zinc-400">
          Nenhuma atividade encontrada no histórico armazenado desta carteira.
        </div>
      )}

      {/* Atividades */}
      {activities.length > 0 && (
        <div className="max-h-[500px] space-y-3 overflow-y-auto pr-1">
          {activities.map((act, index) => {
            const config = getActivityConfig(act.activityLabel);
            const IconComponent = config.icon;
            const tokenName = getTokenDisplayName(act.token, act.amount);

            const hasTransactionHash =
              typeof act.transactionHash === "string" &&
              /^0x[a-fA-F0-9]{64}$/.test(act.transactionHash);

            const hasBlockNumber =
              act.blockNumber !== undefined && act.blockNumber !== null;

            const safeTimestamp =
              Number.isFinite(act.timestamp) && act.timestamp > 0
                ? act.timestamp
                : null;

            const activityKey = [
              act.activityTypeHash,
              act.timestamp,
              act.referenceId,
              index,
            ].join("-");

            return (
              <div
                key={activityKey}
                className={`flex items-center justify-between gap-3 rounded-2xl border bg-zinc-950/60 backdrop-blur-md p-4 transition-all shadow-lg ${config.border}`}
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${config.bg} ${config.color} border border-current/30 shadow-sm`}
                  >
                    <IconComponent size={18} />
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p
                        className={`break-words text-xs font-bold tracking-wide ${config.color}`}
                      >
                        {config.label}
                      </p>

                      {hasTransactionHash && (
                        <a
                          href={`${BSC_SCAN_TX_URL}${act.transactionHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Ver transação no BscScan"
                          title="Ver transação no BscScan"
                          className="text-zinc-400 transition-colors hover:text-[#D4AF37]"
                        >
                          <ExternalLink size={12} />
                        </a>
                      )}
                    </div>

                    <p className="mt-1 flex items-center gap-1 text-[10px] text-zinc-400 font-medium">
                      <Clock size={11} className="text-zinc-500" />

                      {safeTimestamp !== null
                        ? new Date(safeTimestamp).toLocaleString()
                        : "Data indisponível"}
                    </p>

                    {hasBlockNumber ? (
                      <span className="mt-1 block text-[10px] text-zinc-500 font-mono">
                        Bloco #{act.blockNumber!.toString()}
                      </span>
                    ) : (
                      <span className="mt-1 block text-[10px] text-zinc-500 font-mono">
                        Registo on-chain
                      </span>
                    )}
                  </div>
                </div>

                <div className="shrink-0 text-right font-mono">
                  {Number.isFinite(act.amount) && act.amount > 0 && (
                    <p
                      className={`text-sm font-black ${config.color} tracking-tight drop-shadow-sm`}
                    >
                      +{act.amount.toFixed(15)}
                    </p>
                  )}

                  {tokenName && (
                    <p className="mt-1 text-xs text-zinc-300 font-bold tracking-wide">
                      {tokenName}
                    </p>
                  )}
                </div>
              </div>
            );
          })}

          {/* Paginação */}
          {hasMore && (
            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={loadMore}
                disabled={isLoading || isLoadingMore}
                className="rounded-xl border border-[#D4AF37]/40 bg-[#D4AF37]/15 px-6 py-2.5 text-xs font-bold text-[#D4AF37] transition-all hover:bg-[#D4AF37]/25 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 shadow-md"
              >
                {isLoadingMore ? "A carregar..." : "Carregar mais"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}