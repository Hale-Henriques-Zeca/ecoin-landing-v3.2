
"use client";

import {
  ArrowDown,
  Clock3,
  Info,
} from "lucide-react";

interface MobileConversionSummaryProps {
  amountIn?: string;
  fee?: string;
  feePercentage?: number;
  netAmountIn?: string;
  expectedAmountOut?: string;
  minimumAmountOut?: string;
  tokenIn: string;
  tokenOut: string;
  slippage: number;
  priceImpact?: number;
  loading?: boolean;
}

export default function MobileConversionSummary({
  amountIn,
  fee,
  feePercentage,
  netAmountIn,
  expectedAmountOut,
  minimumAmountOut,
  tokenIn,
  tokenOut,
  slippage,
  priceImpact,
  loading = false,
}: MobileConversionSummaryProps) {
  const Row = ({
    label,
    value,
  }: {
    label: string;
    value: string;
  }) => (
    <div className="flex items-center justify-between gap-3">
      <span className="text-[11px] text-gray-400">
        {label}
      </span>

      <span className="text-right text-xs font-medium text-gray-200">
        {value}
      </span>
    </div>
  );

  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.025] p-4">
      <h3 className="mb-4 text-sm font-semibold text-white">
        Resumo da conversão
      </h3>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-4 animate-pulse rounded bg-white/10"
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

          <Row
            label={`Taxa de serviço ${
              feePercentage !== undefined
                ? `(${feePercentage}%)`
                : ""
            }`}
            value={fee ? `${fee} ${tokenIn}` : "—"}
          />

          <Row
            label="Entrada líquida"
            value={
              netAmountIn
                ? `${netAmountIn} ${tokenIn}`
                : "—"
            }
          />

          <div className="flex justify-center">
            <ArrowDown
              size={16}
              className="text-emerald-400"
            />
          </div>

          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.06] p-4">
            <p className="text-[11px] text-gray-400">
              Receberá aproximadamente
            </p>

            <p className="mt-2 break-all text-2xl font-bold text-emerald-400">
              {expectedAmountOut ?? "—"}
              <span className="ml-2 text-sm">
                {tokenOut}
              </span>
            </p>

            {minimumAmountOut && (
              <p className="mt-2 text-[10px] text-gray-500">
                Mínimo recebido: {minimumAmountOut} {tokenOut}
              </p>
            )}
          </div>

          <div className="space-y-3 border-t border-white/10 pt-4">
            <Row
              label="Slippage"
              value={`${slippage}%`}
            />

            <Row
              label="Impacto no preço"
              value={
                priceImpact !== undefined
                  ? `${priceImpact.toFixed(3)}%`
                  : "Não disponível"
              }
            />
          </div>

          <div className="flex items-start gap-2 text-[10px] leading-5 text-gray-500">
            <Info size={13} className="mt-0.5 shrink-0" />
            A cotação é estimada e pode variar antes da execução.
          </div>

          <div className="flex items-center gap-2 text-[10px] text-gray-500">
            <Clock3 size={13} />
            Taxa efetiva consultada on-chain.
          </div>
        </div>
      )}
    </section>
  );
}
