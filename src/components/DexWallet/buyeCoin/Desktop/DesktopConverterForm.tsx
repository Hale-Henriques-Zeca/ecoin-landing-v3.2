"use client";

import {
  ArrowDownUp,
  ArrowLeftRight,
  CircleAlert,
  LoaderCircle,
  LockKeyhole,
} from "lucide-react";

import type {
  ConversionDirection,
  ConverterAsset,
  ConverterAssetSymbol,
  ConverterProvider,
} from "@/types/converter";

import DesktopAssetSelector from "./DesktopAssetSelector";
import DesktopAmountInput from "./DesktopAmountInput";
import DesktopConversionSummary from "./DesktopConversionSummary";
import DesktopProviderSelector from "./DesktopProviderSelector";

interface DesktopConverterFormProps {
  direction: ConversionDirection;
  onDirectionChange: (direction: ConversionDirection) => void;

  tokenIn: ConverterAssetSymbol;
  tokenOut: ConverterAssetSymbol;

  onTokenInChange: (symbol: ConverterAssetSymbol) => void;
  onTokenOutChange: (symbol: ConverterAssetSymbol) => void;
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
  priceImpact?: number | null;

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

  requiresFeeApproval?: boolean;
  isFeeApproved?: boolean;
  requiresSwapApproval?: boolean;
  isSwapApproved?: boolean;

  onContinue: () => void;
}

export default function DesktopConverterForm({
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
  requiresFeeApproval = false,
  isFeeApproved = false,
  requiresSwapApproval = false,
  isSwapApproved = false,
  onContinue,
}: DesktopConverterFormProps) {
  const needsFeeApproval =
    requiresFeeApproval && !isFeeApproved;

  const needsSwapApproval =
    requiresSwapApproval && !isSwapApproved;

  const canContinue =
    Number(amount) > 0 &&
    isPairSupported &&
    hasProvider &&
    hasQuote &&
    feeValid &&
    !loading &&
    !needsFeeApproval &&
    !needsSwapApproval;

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <div className="rounded-2xl border border-gray-800 bg-[#12181F] p-5 md:p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-base font-bold text-white tracking-wide">
            Conversão de Ativos
          </h2>

          <div className="flex rounded-xl bg-[#0B0E14] border border-gray-800 p-1">
            {(
              ["BUY", "SELL", "CONVERT"] as ConversionDirection[]
            ).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => onDirectionChange(item)}
                className={`rounded-lg px-3 py-2 text-[10px] font-bold transition-all ${
                  direction === item
                    ? "bg-gradient-to-r from-amber-500 to-amber-600 text-gray-950 shadow-md shadow-amber-500/10"
                    : "text-gray-400 hover:text-white"
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
        </div>

        <div className="space-y-5">
          <div className="rounded-xl border border-gray-800 bg-[#0B0E14] p-4">
            <div className="flex items-end gap-3">
              <DesktopAssetSelector
                label="De"
                value={tokenIn}
                assets={assets}
                onChange={onTokenInChange}
              />
              <div className="pb-1 text-gray-500">
                <ArrowLeftRight size={17} />
              </div>
            </div>

            <div className="mt-4">
              <DesktopAmountInput
                value={amount}
                symbol={tokenIn}
                onChange={onAmountChange}
              />
            </div>
          </div>

          <div className="flex justify-center -my-2 relative z-10">
            <button
              type="button"
              onClick={onReverse}
              aria-label="Inverter ativos"
              className="rounded-xl border border-amber-500/30 bg-[#12181F] p-3 text-amber-400 transition hover:bg-amber-500/10 hover:scale-105 shadow-lg"
            >
              <ArrowDownUp size={19} />
            </button>
          </div>

          <div className="rounded-xl border border-gray-800 bg-[#0B0E14] p-4">
            <DesktopAssetSelector
              label="Para"
              value={tokenOut}
              assets={assets.filter(
                (asset) => asset.symbol !== tokenIn
              )}
              onChange={onTokenOutChange}
            />

            <div className="mt-4 rounded-xl border border-gray-800/80 bg-[#15191e] p-4">
              <p className="text-xs text-gray-400 font-medium">
                Quantidade estimada
              </p>

              <p className="mt-2 text-2xl font-extrabold text-amber-400">
                {expectedAmountOut ?? "—"}
                <span className="ml-2 text-sm text-gray-300 font-bold">
                  {tokenOut}
                </span>
              </p>
            </div>
          </div>

          <DesktopProviderSelector
            providers={providers}
            value={providerId}
            onChange={onProviderChange}
          />

          <div className="rounded-xl border border-gray-800 bg-[#0B0E14] p-4">
            <div className="mb-3 flex items-center justify-between">
              <label className="text-xs font-medium text-gray-400">
                Tolerância de Slippage
              </label>

              <span className="text-sm font-bold text-amber-400">
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
              className="w-full accent-amber-500 cursor-pointer"
            />

            <div className="mt-2 flex justify-between text-[10px] text-gray-500 font-medium">
              <span>0.1%</span>
              <span>5.0%</span>
            </div>
          </div>

          <DesktopConversionSummary
            amountIn={amountIn}
            fee={fee}
            feePercentage={feePercentage}
            netAmountIn={netAmountIn}
            expectedAmountOut={expectedAmountOut}
            minimumAmountOut={minimumAmountOut}
            tokenIn={tokenIn}
            tokenOut={tokenOut}
            priceImpact={priceImpact}
            slippage={slippage}
            loading={quoteLoading}
          />

          {quoteError && (
            <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-3 text-xs text-red-400">
              {quoteError}
            </div>
          )}

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

          {!isPairSupported && (
            <div className="flex items-center gap-2 rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 text-xs text-amber-400">
              <CircleAlert size={16} />
              Este par ainda não está habilitado no Converter.
            </div>
          )}

          {needsFeeApproval && (
            <div className="flex items-center gap-2 rounded-xl bg-amber-500/5 p-3 text-xs text-amber-400 border border-amber-500/20">
              <LockKeyhole size={15} className="shrink-0" />
              <span>É necessária autorização ERC-20 para cobrar a taxa de serviço.</span>
            </div>
          )}

          {needsSwapApproval && (
            <div className="flex items-center gap-2 rounded-xl bg-amber-500/5 p-3 text-xs text-amber-400 border border-amber-500/20">
              <LockKeyhole size={15} className="shrink-0" />
              <span>É necessária autorização ERC-20 para executar a conversão.</span>
            </div>
          )}

          {!needsFeeApproval && !needsSwapApproval && (
            <div className="text-xs text-emerald-400 font-medium">
              <LockKeyhole size={13} className="mr-1 inline" />
              Autorizações necessárias confirmadas.
            </div>
          )}

          <button
            type="button"
            onClick={onContinue}
            disabled={!canContinue}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 py-4 text-sm font-black text-gray-950 transition hover:from-amber-400 hover:to-amber-500 disabled:cursor-not-allowed disabled:opacity-40 shadow-xl shadow-amber-500/10"
          >
            {loading ? (
              <>
                <LoaderCircle size={17} className="animate-spin" />
                A obter cotação...
              </>
            ) : (
              <>
                <ArrowLeftRight size={17} />
                Continuar Operação
              </>
            )}
          </button>

          <p className="text-center text-[10px] text-gray-500">
            A execução depende da aprovação do Router e da
            confirmação segura na sua carteira Web3.
          </p>
        </div>
      </div>

      <div className="hidden xl:flex xl:flex-col xl:justify-between xl:rounded-2xl xl:border xl:border-gray-800 xl:bg-[#12181F] xl:p-6 shadow-xl">
        <div>
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-400">
            <ArrowLeftRight size={23} />
          </div>

          <h3 className="text-lg font-bold text-white tracking-wide">
            Conversão Inteligente
          </h3>

          <p className="mt-3 text-sm leading-7 text-gray-400">
            O EdenKingDom Converter consulta rotas de liquidez
            através da KyberSwap, calcula a taxa de serviço
            separadamente e apresenta a quantidade líquida
            utilizada na conversão.
          </p>
        </div>

        <div className="space-y-4 border-t border-gray-800 pt-6">
          {[
            "Cotação de liquidez através da KyberSwap",
            "Taxa de serviço de 3% apresentada separadamente",
            "Conversão apenas do montante líquido",
            "Protecção através do valor mínimo de saída",
            "Transacções verificáveis na BNB Smart Chain",
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 text-xs text-gray-300 font-medium"
            >
              <span className="h-2 w-2 rounded-full bg-amber-400 shadow-sm shadow-amber-400/50" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}