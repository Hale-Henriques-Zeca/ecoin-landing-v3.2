"use client";

import {
  ArrowUpRight,
  ExternalLink,
  History,
  RefreshCw,
} from "lucide-react";

import type {
  ConverterHistoryItem,
} from "@/hooks/DexWallet/converter/useConverterHistory";

interface DesktopConversionHistoryProps {
  history: ConverterHistoryItem[];
  loading?: boolean;
  onRefresh?: () => void;
}

function shortenAddress(value: string) {
  return `${value.slice(0, 8)}...${value.slice(-6)}`;
}

export default function DesktopConversionHistory({
  history,
  loading = false,
  onRefresh,
}: DesktopConversionHistoryProps) {
  return (
    <section className="rounded-2xl border border-gray-800 bg-[#12181F] p-5 shadow-xl">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <History size={18} className="text-yellow-400" />

          <h3 className="text-sm font-bold text-white tracking-wide">
            Histórico de Conversões
          </h3>
        </div>

        {onRefresh && (
          <button
            type="button"
            onClick={onRefresh}
            disabled={loading}
            aria-label="Atualizar histórico"
            className="rounded-xl p-2 text-gray-400 hover:bg-[#0B0E14] hover:text-white transition disabled:opacity-50"
          >
            <RefreshCw
              size={15}
              className={loading ? "animate-spin text-yellow-400" : ""}
            />
          </button>
        )}
      </div>

      {loading && history.length === 0 ? (
        <div className="space-y-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-14 animate-pulse rounded-xl bg-[#0B0E14]"
            />
          ))}
        </div>
      ) : history.length === 0 ? (
        <div className="py-10 text-center">
          <History
            size={32}
            className="mx-auto text-gray-600 mb-2"
          />

          <p className="text-sm font-semibold text-gray-400">
            Ainda não existem conversões.
          </p>

          <p className="mt-1 text-xs text-gray-500">
            As tuas operações aparecerão aqui assim que forem executadas.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-left">
            <thead>
              <tr className="border-b border-gray-800 text-[11px] text-gray-400 font-medium uppercase tracking-wider">
                <th className="pb-3">Operação</th>
                <th className="pb-3">Entrada</th>
                <th className="pb-3">Saída</th>
                <th className="pb-3">Data</th>
                <th className="pb-3">Estado</th>
                <th className="pb-3">Transação</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-800/60">
              {history.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-[#0B0E14]/50 transition"
                >
                  <td className="py-3.5">
                    <div className="flex items-center gap-2">
                      <ArrowUpRight
                        size={15}
                        className="text-yellow-400"
                      />

                      <span className="text-xs font-bold text-white">
                        {item.tokenIn.slice(0, 6)} →{" "}
                        {item.tokenOut.slice(0, 6)}
                      </span>
                    </div>
                  </td>

                  <td className="py-3.5 text-xs text-gray-300 font-medium">
                    {item.amountIn}
                  </td>

                  <td className="py-3.5 text-xs text-emerald-400 font-bold">
                    {item.amountOut ?? "—"}
                  </td>

                  <td className="py-3.5 text-xs text-gray-400">
                    {new Date(item.timestamp).toLocaleString()}
                  </td>

                  <td className="py-3.5">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
                        item.status === "success"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-red-500/10 text-red-400 border border-red-500/20"
                      }`}
                    >
                      {item.status === "success"
                        ? "Concluída"
                        : "Falhada"}
                    </span>
                  </td>

                  <td className="py-3.5">
                    <a
                      href={`https://bscscan.com/tx/${item.transactionHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={shortenAddress(item.transactionHash)}
                      className="inline-flex items-center gap-1 text-xs text-yellow-400/90 hover:text-yellow-400 font-mono hover:underline"
                    >
                      {shortenAddress(item.transactionHash)}
                      <ExternalLink size={11} />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}