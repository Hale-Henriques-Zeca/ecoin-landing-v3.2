
"use client";

import React from "react";
import {
  History,
  ArrowUpRight,
  RefreshCw,
  ExternalLink,
  Clock,
  AlertCircle,
} from "lucide-react";

import { useEdenActivityRegistry } from "@/hooks/useEdenActivityRegistry";

const BSC_SCAN_TX_URL = "https://bscscan.com/tx/";

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

  return (
    <div className="space-y-4">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D4AF37]/10 text-[#D4AF37]">
            <History size={20} />
          </div>

          <div>
            <h3 className="text-base font-bold text-white">
              Histórico de Atividades no Protocolo
            </h3>

            <p className="text-xs text-white/40">
              Total armazenado on-chain: {totalCount}
            </p>
          </div>
        </div>

        <button
          onClick={refetch}
          type="button"
          aria-label="Atualizar histórico"
          disabled={isLoading || isLoadingMore}
          className="rounded-xl bg-white/5 p-2 text-white/60 transition-all hover:bg-white/10 hover:text-white active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <RefreshCw
            size={16}
            className={
              isLoading
                ? "animate-spin text-[#D4AF37]"
                : ""
            }
          />
        </button>
      </div>

      {/* Erro */}
      {isError && (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-xs text-red-400"
        >
          <AlertCircle size={16} className="mt-0.5 shrink-0" />

          <div className="flex-1">
            <p>
              Não foi possível carregar os registos on-chain.
            </p>

            <button
              type="button"
              onClick={refetch}
              className="mt-2 font-bold underline underline-offset-4"
            >
              Tentar novamente
            </button>
          </div>
        </div>
      )}

      {/* Carregamento inicial */}
      {isLoading && activities.length === 0 && (
        <div className="py-12 text-center font-mono text-sm text-white/40">
          A carregar registos on-chain...
        </div>
      )}

      {/* Lista vazia */}
      {!isLoading &&
        !isError &&
        activities.length === 0 && (
          <div className="py-12 text-center text-sm text-white/40">
            Nenhuma atividade encontrada no histórico armazenado
            desta carteira.
          </div>
        )}

      {/* Atividades */}
      {activities.length > 0 && (
        <div className="max-h-[500px] space-y-3 overflow-y-auto pr-1">
          {activities.map((act, index) => {
            const hasTransactionHash =
              typeof act.transactionHash === "string" &&
              /^0x[a-fA-F0-9]{64}$/.test(
                act.transactionHash
              );

            const hasBlockNumber =
              act.blockNumber !== undefined &&
              act.blockNumber !== null;

            const safeTimestamp =
              Number.isFinite(act.timestamp) &&
              act.timestamp > 0
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
                className="flex items-center justify-between gap-3 rounded-2xl border border-white/5 bg-white/[0.02] p-4 transition-all hover:border-[#D4AF37]/30"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-[#D4AF37]">
                    <ArrowUpRight size={18} />
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="break-words text-xs font-bold uppercase tracking-wider text-white">
                        {act.activityLabel}
                      </p>

                      {hasTransactionHash && (
                        <a
                          href={`${BSC_SCAN_TX_URL}${act.transactionHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Ver transação no BscScan"
                          title="Ver transação no BscScan"
                          className="text-white/30 transition-colors hover:text-[#D4AF37]"
                        >
                          <ExternalLink size={12} />
                        </a>
                      )}
                    </div>

                    <p className="mt-1 flex items-center gap-1 text-[10px] text-white/40">
                      <Clock size={11} />

                      {safeTimestamp !== null
                        ? new Date(safeTimestamp).toLocaleString()
                        : "Data indisponível"}
                    </p>

                    {hasBlockNumber ? (
                      <span className="mt-1 block text-[10px] text-white/30">
                        Bloco #{act.blockNumber!.toString()}
                      </span>
                    ) : (
                      <span className="mt-1 block text-[10px] text-white/30">
                        Registo on-chain
                      </span>
                    )}
                  </div>
                </div>

                <div className="shrink-0 text-right font-mono">
                  {Number.isFinite(act.amount) &&
                    act.amount > 0 && (
                      <p className="text-sm font-bold text-[#D4AF37]">
                        +{act.amount.toFixed(4)}
                      </p>
                    )}

                  {act.token && (
                    <p className="mt-1 max-w-28 truncate text-[10px] text-white/30">
                      {act.token ===
                      "0x0000000000000000000000000000000000000000"
                        ? "Token nativo"
                        : `${act.token.slice(0, 6)}...${act.token.slice(-4)}`}
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
                className="rounded-xl border border-[#D4AF37]/20 bg-white/5 px-6 py-2.5 text-xs font-bold text-[#D4AF37] transition-all hover:bg-white/10 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoadingMore
                  ? "A carregar..."
                  : "Carregar mais"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
