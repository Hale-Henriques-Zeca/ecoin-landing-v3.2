
"use client";

import {
  ArrowDownUp,
  ArrowLeftRight,
  CircleAlert,
  LoaderCircle,
} from "lucide-react";

import type {
  ConversionDirection,
  ConverterAsset,
  ConverterAssetSymbol,
  ConverterProvider,
} from "@/types/converter";

import MobileAssetSelector from "./MobileAssetSelector";
import MobileAmountInput from "./MobileAmountInput";
import MobileConversionSummary from "./MobileConversionSummary";
import MobileProviderSelector from "./MobileProviderSelector";

// ============================================================
// PROPS
// ============================================================

interface MobileConverterFormProps {
  direction: ConversionDirection;
  onDirectionChange: (value: ConversionDirection) => void;

  tokenIn: ConverterAssetSymbol;
  tokenOut: ConverterAssetSymbol;

  onTokenInChange: (value: ConverterAssetSymbol) => void;
  onTokenOutChange: (value: ConverterAssetSymbol) => void;
  onReverse: () => void;

  amount: string;
  onAmountChange: (value: string) => void;

  assets: ConverterAsset[];

  providers: ConverterProvider[];
  providerId?: string;
  onProviderChange: (id: string) => void;

  amountIn?: string;
  fee?: string;
  feePercentage?: number;
  netAmountIn?: string;
  expectedAmountOut?: string;
  minimumAmountOut?: string;
  priceImpact?: number;

  slippage: number;
  onSlippageChange: (value: number) => void;

  loading?: boolean;
  quoteLoading?: boolean;
  quoteError?: string;
  hasKyberSwapQuote?: boolean;
  onRefreshQuote?: () => void;

  isPairSupported: boolean;
  hasProvider: boolean;
  hasQuote: boolean;
  feeValid: boolean;

  // Kept for compatibility with existing parent components.
  // These are not used during the current quote-only phase.
  requiresFeeApproval?: boolean;
  isFeeApproved?: boolean;
  requiresSwapApproval?: boolean;
  isSwapApproved?: boolean;

  onContinue: () => void;
}

// ============================================================
// COMPONENT
// ============================================================

export default function MobileConverterForm({
  direction,
  onDirectionChange,

  tokenIn,
  tokenOut,

  onTokenInChange,
  onTokenOutChange,
  onReverse,

  amount,
  onAmountChange,

  assets,

  providers,
  providerId,
  onProviderChange,

  amountIn,
  fee,
  feePercentage,
  netAmountIn,
  expectedAmountOut,
  minimumAmountOut,
  priceImpact,

  slippage,
  onSlippageChange,

  loading = false,
  quoteLoading = false,
  quoteError,
  hasKyberSwapQuote = false,
  onRefreshQuote,

  isPairSupported,
  hasProvider,
  hasQuote,
  feeValid,

  onContinue,
}: MobileConverterFormProps) {

  // ----------------------------------------------------------
  // CONTINUE VALIDATION
  // ----------------------------------------------------------

  const canContinue =
    Number(amount) > 0 &&
    isPairSupported &&
    hasProvider &&
    hasQuote &&
    feeValid &&
    !loading &&
    !quoteLoading;

  // ----------------------------------------------------------
  // RENDER
  // ----------------------------------------------------------

  return (
    <div className="space-y-4">

      {/* Conversion mode */}
      <div className="flex rounded-xl border border-white/10 bg-[#15191e] p-1">
        {(
          ["BUY", "SELL", "CONVERT"] as ConversionDirection[]
        ).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => onDirectionChange(item)}
            className={`flex-1 rounded-lg px-1 py-3 text-[10px] font-bold transition ${
              direction === item
                ? "bg-emerald-500 text-black"
                : "text-gray-400"
            }`}
          >
            {item === "BUY"
              ? "Comprar"
              : item === "SELL"
                ? "Vender"
                : "Converter"}
          </button>
        ))}
      </div>

      {/* Main conversion card */}
      <section className="rounded-2xl border border-white/10 bg-[#11161c] p-4">

        {/* Input */}
        <div className="rounded-xl border border-white/10 bg-white/[0.025] p-3">

          <div className="mb-3">
            <MobileAssetSelector
              label="De"
              value={tokenIn}
              assets={assets}
              onChange={onTokenInChange}
            />
          </div>

          <MobileAmountInput
            value={amount}
            symbol={tokenIn}
            onChange={onAmountChange}
          />
        </div>

        {/* Reverse direction */}
        <div className="relative z-10 flex justify-center py-2">
          <button
            type="button"
            onClick={onReverse}
            aria-label="Inverter conversão"
            className="rounded-xl border border-emerald-500/20 bg-[#11161c] p-3 text-emerald-400 shadow-lg active:scale-95"
          >
            <ArrowDownUp size={19} />
          </button>
        </div>

        {/* Output */}
        <div className="rounded-xl border border-white/10 bg-white/[0.025] p-3">

          <div className="mb-3">
            <MobileAssetSelector
              label="Para"
              value={tokenOut}
              assets={assets.filter(
                (asset) => asset.symbol !== tokenIn
              )}
              onChange={onTokenOutChange}
            />
          </div>

          <div className="rounded-xl border border-white/5 bg-[#171c22] p-4">

            <p className="text-[10px] text-gray-500">
              Quantidade estimada
            </p>

            <p className="mt-2 break-all text-2xl font-bold text-white">
              {expectedAmountOut ?? "—"}

              <span className="ml-2 text-sm text-gray-400">
                {tokenOut}
              </span>
            </p>

            {quoteLoading && (
              <p className="mt-2 flex items-center gap-2 text-xs text-emerald-400">
                <LoaderCircle
                  size={13}
                  className="animate-spin"
                />
                A actualizar cotação...
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Provider */}
      <section className="rounded-2xl border border-white/10 bg-[#11161c] p-4">
        <MobileProviderSelector
          providers={providers}
          value={providerId}
          onChange={onProviderChange}
        />
      </section>

      {/* Slippage */}
      <section className="rounded-2xl border border-white/10 bg-[#11161c] p-4">

        <div className="mb-3 flex items-center justify-between">
          <label className="text-xs text-gray-400">
            Tolerância de slippage
          </label>

          <span className="text-sm font-bold text-emerald-400">
            {slippage}%
          </span>
        </div>

        <input
          type="range"
          min={0.1}
          max={5}
          step={0.1}
          value={slippage}
          onChange={(event) =>
            onSlippageChange(Number(event.target.value))
          }
          className="w-full accent-emerald-500"
        />

        <div className="mt-2 flex justify-between text-[10px] text-gray-500">
          <span>0.1%</span>
          <span>5%</span>
        </div>
      </section>

      {/* Conversion summary */}
      <MobileConversionSummary
        amountIn={amountIn}
        fee={fee}
        feePercentage={feePercentage}
        netAmountIn={netAmountIn}
        expectedAmountOut={expectedAmountOut}
        minimumAmountOut={minimumAmountOut}
        tokenIn={tokenIn}
        tokenOut={tokenOut}
        slippage={slippage}
        priceImpact={priceImpact}
        loading={quoteLoading}
      />

      {/* Quote error */}
      {quoteError && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-3 text-xs text-red-400">
          {quoteError}
        </div>
      )}

      {/* KyberSwap quote status */}
      {hasKyberSwapQuote && (
        <div className="flex items-center justify-between rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3">

          <div className="flex items-center gap-2 text-xs text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Cotação KyberSwap disponível
          </div>

          {onRefreshQuote && (
            <button
              type="button"
              onClick={onRefreshQuote}
              className="text-xs font-semibold text-emerald-400 hover:text-emerald-300"
            >
              Actualizar
            </button>
          )}
        </div>
      )}

      {/* Unsupported pair */}
      {!isPairSupported && (
        <div className="flex items-center gap-2 rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 text-xs text-amber-400">
          <CircleAlert size={16} />
          Este par não está habilitado.
        </div>
      )}

      {/* Fee explanation */}
      <div className="rounded-xl border border-white/10 bg-white/[0.025] p-3">

        <p className="text-xs font-semibold text-gray-300">
          Comissão de serviço
        </p>

        <p className="mt-1 text-[11px] leading-5 text-gray-500">
          A comissão é calculada separadamente sobre o valor
          introduzido. A KyberSwap recebe apenas o valor líquido
          da conversão. A cobrança efectiva da comissão será
          realizada pelo Router durante a execução da transacção.
        </p>
      </div>

      {/* Continue */}
      <button
        type="button"
        onClick={onContinue}
        disabled={!canContinue}
        className="flex min-h-[56px] w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 text-sm font-bold text-black transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
      >
        {loading || quoteLoading ? (
          <>
            <LoaderCircle
              size={18}
              className="animate-spin"
            />
            A obter cotação...
          </>
        ) : (
          <>
            <ArrowLeftRight size={18} />
            Continuar
          </>
        )}
      </button>

      <p className="text-center text-[10px] leading-5 text-gray-500">
        Confirma sempre o valor mínimo de recebimento antes
        de autorizar a conversão.
      </p>

    </div>
  );
}
