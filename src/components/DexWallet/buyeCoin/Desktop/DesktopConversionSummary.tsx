
"use client";

import {
  ArrowDown,
  Clock3,
  Percent,
  TrendingUp,
} from "lucide-react";

interface DesktopConversionSummaryProps {
  amountIn?: string;
  fee?: string;
  feePercentage?: number;
  netAmountIn?: string;
  expectedAmountOut?: string;
  minimumAmountOut?: string;
  tokenIn: string;
  tokenOut: string;
  priceImpact?: number | null;
  slippage: number;
  loading?: boolean;
}

function Row({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-xs text-gray-400">{label}</span>
      <span className="text-xs font-semibold text-gray-200">
        {value}
      </span>
    </div>
  );
}

export default function DesktopConversionSummary({
  amountIn,
  fee,
  feePercentage,
  netAmountIn,
  expectedAmountOut,
  minimumAmountOut,
  tokenIn,
  tokenOut,
  priceImpact,
  slippage,
  loading = false,
}: DesktopConversionSummaryProps) {
  const hasQuote = expectedAmountOut !== undefined;

  const showServiceFee =
    fee !== undefined || netAmountIn !== undefined;

  return (
    <section className="rounded-2xl border border-gray-800 bg-[#12181F] p-5 shadow-xl">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-sm font-bold text-white tracking-wide">
          Resumo da Conversão
        </h3>

        <TrendingUp size={17} className="text-yellow-400" />
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-4 animate-pulse rounded bg-[#0B0E14]"
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          <Row
            label="Valor de entrada"
            value={
              amountIn
                ? `${amountIn} ${tokenIn}`
                : "—"
            }
          />

          {showServiceFee && (
            <>
              <Row
                label={`Taxa de serviço ${
                  feePercentage !== undefined
                    ? `(${feePercentage}%)`
                    : ""
                }`}
                value={
                  fee !== undefined
                    ? `${fee} ${tokenIn}`
                    : "—"
                }
              />

              <Row
                label="Entrada líquida"
                value={
                  netAmountIn
                    ? `${netAmountIn} ${tokenIn}`
                    : "—"
                }
              />
            </>
          )}

          <div className="flex justify-center">
            <ArrowDown
              size={18}
              className="text-yellow-400"
            />
          </div>

          <div className="rounded-xl border border-yellow-500/20 bg-[#0B0E14] p-4">
            <p className="mb-1 text-xs font-medium text-gray-400">
              Receberá aproximadamente
            </p>

            <p className="text-2xl font-extrabold text-amber-400">
              {hasQuote
                ? `${expectedAmountOut} ${tokenOut}`
                : "—"}
            </p>

            {minimumAmountOut && (
              <p className="mt-2 text-[11px] text-gray-400">
                Mínimo estimado:{" "}
                <span className="text-white font-semibold">
                  {minimumAmountOut} {tokenOut}
                </span>
              </p>
            )}
          </div>

          <div className="space-y-2.5 border-t border-gray-800 pt-4">
            <Row
              label="Slippage tolerado"
              value={`${slippage}%`}
            />

            <Row
              label="Impacto no preço"
              value={
                priceImpact !== undefined &&
                priceImpact !== null &&
                Number.isFinite(priceImpact)
                  ? `${priceImpact.toFixed(3)}%`
                  : "Não disponível"
              }
            />
          </div>

          <div className="space-y-1.5 pt-2 border-t border-gray-800/40">
            <div className="flex items-center gap-2 text-[11px] text-gray-400">
              <Clock3 size={13} className="shrink-0" />
              <span>
                Cotação estimada. Os valores podem mudar conforme o mercado.
              </span>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-gray-400">
              <Percent size={13} className="shrink-0" />
              <span>
                A taxa de serviço EdenKingDom será apresentada separadamente
                quando estiver disponível.
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
