
"use client";

import {
  ExternalLink,
  History,
  RefreshCw,
} from "lucide-react";

import type {
  ConverterHistoryItem,
} from "@/hooks/DexWallet/converter/useConverterHistory";

interface MobileConversionHistoryProps {
  history: ConverterHistoryItem[];
  loading?: boolean;
  onRefresh?: () => void;
}

export default function MobileConversionHistory({
  history,
  loading = false,
  onRefresh,
}: MobileConversionHistoryProps) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.025] p-4">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <History size={18} className="text-emerald-400" />

          <h3 className="text-sm font-bold text-white">
            Histórico
          </h3>
        </div>

        {onRefresh && (
          <button
            type="button"
            onClick={onRefresh}
            disabled={loading}
            aria-label="Atualizar histórico"
            className="rounded-lg bg-white/5 p-2 text-gray-400 disabled:opacity-50"
          >
            <RefreshCw
              size={15}
              className={loading ? "animate-spin" : ""}
            />
          </button>
        )}
      </div>

      {loading && history.length === 0 ? (
        <div className="space-y-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-24 animate-pulse rounded-xl bg-white/5"
            />
          ))}
        </div>
      ) : history.length === 0 ? (
        <div className="py-8 text-center">
          <History
            size={30}
            className="mx-auto text-gray-600"
          />

          <p className="mt-3 text-sm text-gray-400">
            Nenhuma conversão encontrada.
          </p>

          <p className="mt-1 text-xs text-gray-600">
            O teu histórico aparecerá aqui.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {history.map((item) => (
            <article
              key={item.id}
              className="rounded-xl border border-white/10 bg-[#15191e] p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-bold text-white">
                    {item.tokenIn} → {item.tokenOut}
                  </p>

                  <p className="mt-1 text-[10px] text-gray-500">
                    {new Date(item.timestamp).toLocaleString()}
                  </p>
                </div>

                <span
                  className={`shrink-0 rounded-full px-2 py-1 text-[9px] font-bold ${
                    item.status === "success"
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-red-500/10 text-red-400"
                  }`}
                >
                  {item.status === "success"
                    ? "Concluída"
                    : "Falhada"}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[10px] text-gray-500">
                    Enviado
                  </p>

                  <p className="mt-1 break-all text-xs font-semibold text-gray-200">
                    {item.amountIn}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] text-gray-500">
                    Recebido
                  </p>

                  <p className="mt-1 break-all text-xs font-semibold text-emerald-400">
                    {item.amountOut ?? "—"}
                  </p>
                </div>
              </div>

              <a
                href={`https://bscscan.com/tx/${item.transactionHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center justify-center gap-2 border-t border-white/10 pt-3 text-xs font-semibold text-blue-400"
              >
                Consultar transação
                <ExternalLink size={13} />
              </a>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
