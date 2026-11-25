"use client";

import { formatUnits } from "viem";
import { X, ShieldCheck, AlertCircle, ArrowRight } from "lucide-react";
import { useAirdropFeeCollector } from "@/hooks/useAirdropFeeCollector";

interface ClaimModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  token: { symbol: string; name: string; address: `0x${string}` };
  availableAmount: bigint;
  isProcessing: boolean;
}

function formatAmount(value?: bigint, decimals: number = 6) {
  return value === undefined
    ? "—"
    : Number(formatUnits(value, 18)).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: decimals,
      });
}

/**
 * Escala tipográfica elástica para valores padrão nas linhas do modal
 * Evita quebra do símbolo (E-Coin / E-USD) quando os números crescem.
 */
function getModalRowSize(valueStr: string): string {
  const len = valueStr.length;
  if (len <= 10) return "text-[clamp(0.72rem,3.1vw,0.8125rem)]";
  if (len <= 14) return "text-[clamp(0.65rem,2.75vw,0.75rem)]";
  if (len <= 18) return "text-[clamp(0.58rem,2.45vw,0.6875rem)]";
  return "text-[clamp(0.52rem,2.2vw,0.625rem)]";
}

/**
 * Escala tipográfica elástica para o valor destacado "Líquido a Receber na Carteira"
 */
function getModalNetSize(valueStr: string): string {
  const len = valueStr.length;
  if (len <= 9) return "text-[clamp(0.95rem,4.4vw,1.25rem)]";
  if (len <= 12) return "text-[clamp(0.85rem,3.8vw,1.1rem)]";
  if (len <= 15) return "text-[clamp(0.75rem,3.3vw,0.95rem)]";
  return "text-[clamp(0.68rem,2.9vw,0.85rem)]";
}

export default function ClaimModal({
  isOpen,
  onClose,
  onConfirm,
  token,
  availableAmount,
  isProcessing,
}: ClaimModalProps) {
  const {
    isLoading,
    feeBP,
    feeSplitIsValid,
    grossClaim,
    serviceFee,
    netToReceive,
    distribution,
  } = useAirdropFeeCollector(isOpen ? token.address : undefined, availableAmount);

  if (!isOpen) return null;

  const rows: Array<[string, bigint, boolean?]> = [
    [distribution.miningLabel, distribution.mining],
    ["Referral Network (L1 / L2 / L3)", distribution.referral, true],
    ["Buyback Pool", distribution.buyback],
    ["Liquidity Pool", distribution.liquidity],
    ["Salary Pool", distribution.salary],
    ["Treasury (incl. Reserva de Classe)", distribution.treasury],
    ["Trading Capital", distribution.trading],
    ["Ecosystem Dev", distribution.ecosystem],
  ];

  if (distribution.engine > 0n) {
    rows.push(["Converter Engine", distribution.engine]);
  }

  const grossStr = formatAmount(grossClaim, 6);
  const feeStr = formatAmount(serviceFee, 6);
  const netStr = formatAmount(netToReceive, 6);
  const netBtnStr = formatAmount(netToReceive, 4);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-3 pt-4 pb-20 sm:p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg max-h-[calc(100dvh-6.5rem)] sm:max-h-[90dvh] flex flex-col rounded-3xl border border-[#D4AF37]/30 bg-gradient-to-br from-slate-950 via-black to-slate-900 text-white shadow-2xl overflow-hidden">
        {/* Header Fixo (nunca é cortado pelo topo do navegador) */}
        <div className="shrink-0 flex items-center justify-between gap-3 border-b border-white/10 px-4 sm:px-6 py-4">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 shrink-0 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-[clamp(0.95rem,4vw,1.125rem)] font-bold leading-tight truncate">
                Confirmar Resgate (Claim)
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-400 truncate mt-0.5">
                {token.name} — Ecossistema EdenKingDom
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isProcessing}
            aria-label="Fechar modal"
            className="shrink-0 rounded-xl p-2 text-slate-400 hover:bg-white/10 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Corpo Rolável Internamente */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-4 sm:px-6 py-4 space-y-4">
          {/* Resumo */}
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/10 p-3.5 sm:p-4 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-emerald-300">
                Resumo da Transação
              </span>
              <span className="text-[11px] sm:text-xs text-slate-400 whitespace-nowrap shrink-0">
                Taxa Protocolar: {Number(feeBP) / 100}%
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between gap-3">
                <span className="min-w-0 flex-1 text-[11px] sm:text-xs text-slate-400 leading-snug">
                  Montante Bruto (Gross Claim)
                </span>
                <strong
                  className={`shrink-0 text-right ${getModalRowSize(
                    grossStr
                  )} font-bold text-white tabular-nums whitespace-nowrap transition-all duration-150`}
                >
                  {grossStr}{" "}
                  <span className="whitespace-nowrap">{token.symbol}</span>
                </strong>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="min-w-0 flex-1 text-[11px] sm:text-xs text-slate-400 leading-snug">
                  Taxa de Serviço ({Number(feeBP) / 100}%)
                </span>
                <strong
                  className={`shrink-0 text-right ${getModalRowSize(
                    feeStr
                  )} font-bold text-amber-400 tabular-nums whitespace-nowrap transition-all duration-150`}
                >
                  −{feeStr}{" "}
                  <span className="whitespace-nowrap">{token.symbol}</span>
                </strong>
              </div>

              <div className="h-px bg-white/10 my-2" />

              <div className="flex items-center justify-between gap-3 pt-0.5">
                <span className="min-w-0 flex-1 text-xs sm:text-sm font-bold text-white leading-snug">
                  Líquido a Receber na Carteira
                </span>
                <strong
                  className={`shrink-0 text-right ${getModalNetSize(
                    netStr
                  )} font-black text-emerald-400 tabular-nums whitespace-nowrap transition-all duration-150`}
                >
                  {netStr}{" "}
                  <span className="whitespace-nowrap">{token.symbol}</span>
                </strong>
              </div>
            </div>
          </div>

          {/* Distribuição da Taxa */}
          <div className="rounded-xl bg-black/40 border border-white/5 p-3.5 space-y-2">
            <p className="text-[11px] sm:text-xs font-bold text-[#D4AF37] mb-1">
              Distribuição da Taxa de {Number(feeBP) / 100}% pelo Ecossistema
            </p>
            {rows.map(([label, value, highlight]) => {
              const rowValStr = formatAmount(value, 6);
              return (
                <div
                  key={label}
                  className="flex items-center justify-between gap-3"
                >
                  <span
                    className={`min-w-0 flex-1 text-[11px] sm:text-xs leading-snug ${
                      highlight
                        ? "text-emerald-300 font-semibold"
                        : "text-slate-400"
                    }`}
                  >
                    {label}
                  </span>
                  <span
                    className={`shrink-0 text-right ${getModalRowSize(
                      rowValStr
                    )} tabular-nums whitespace-nowrap transition-all duration-150 ${
                      highlight
                        ? "text-emerald-300 font-bold"
                        : "text-slate-200 font-medium"
                    }`}
                  >
                    {rowValStr}{" "}
                    <span className="whitespace-nowrap">{token.symbol}</span>
                  </span>
                </div>
              );
            })}
          </div>

          {!isLoading && !feeSplitIsValid && (
            <div className="rounded-xl bg-red-950/50 border border-red-500/30 p-3 text-[11px] sm:text-xs text-red-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>
                Aviso: A configuração de taxas on-chain não totaliza 100%. O
                resgate está temporariamente condicionado.
              </span>
            </div>
          )}
        </div>

        {/* Rodapé Fixo (botões sempre visíveis e clicáveis acima da nav mobile) */}
        <div className="shrink-0 flex gap-2.5 sm:gap-3 border-t border-white/10 bg-black/50 px-4 sm:px-6 py-3.5 sm:py-4">
          <button
            type="button"
            onClick={onClose}
            disabled={isProcessing}
            className="flex-1 rounded-xl bg-white/5 hover:bg-white/10 py-3 sm:py-3.5 px-3 text-xs sm:text-sm font-bold text-slate-300 transition cursor-pointer whitespace-nowrap"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={
              isProcessing || isLoading || !feeSplitIsValid || grossClaim === 0n
            }
            className="flex-[2] rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 py-3 sm:py-3.5 px-3 text-[clamp(0.7rem,3vw,0.875rem)] font-extrabold text-slate-950 transition shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap"
          >
            <span>
              {isProcessing
                ? "A processar..."
                : `Confirmar Claim (${netBtnStr} ${token.symbol})`}
            </span>
            {!isProcessing && <ArrowRight className="w-4 h-4 shrink-0" />}
          </button>
        </div>
      </div>
    </div>
  );
}