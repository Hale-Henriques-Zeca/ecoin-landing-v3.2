
"use client";

import {
  ArrowDown,
  ArrowLeftRight,
  CheckCircle2,
  LoaderCircle,
  ShieldCheck,
  X,
} from "lucide-react";

interface MobileTransactionModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;

  tokenIn: string;
  tokenOut: string;

  amountIn: string;
  amountOut: string;
  fee: string;

  requiresApproval: boolean;
  approvalConfirmed?: boolean;

  loading?: boolean;
  error?: string;
}

export default function MobileTransactionModal({
  open,
  onClose,
  onConfirm,
  tokenIn,
  tokenOut,
  amountIn,
  amountOut,
  fee,
  requiresApproval,
  approvalConfirmed = false,
  loading = false,
  error,
}: MobileTransactionModalProps) {
  if (!open) return null;

  const needsApproval =
    requiresApproval && !approvalConfirmed;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/80 backdrop-blur-sm sm:items-center sm:p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-transaction-title"
        className="max-h-[90dvh] w-full overflow-y-auto rounded-t-3xl border border-white/10 bg-[#11161c] p-5 pb-[max(20px,env(safe-area-inset-bottom))] sm:max-w-md sm:rounded-3xl"
      >
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2
              id="mobile-transaction-title"
              className="text-lg font-bold text-white"
            >
              Confirmar operação
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              Revê os detalhes antes de continuar.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            aria-label="Fechar"
            className="rounded-xl bg-white/5 p-2 text-gray-400 disabled:opacity-40"
          >
            <X size={19} />
          </button>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
          <div className="text-center">
            <p className="text-xs text-gray-500">
              Enviar
            </p>

            <p className="mt-2 break-all text-2xl font-bold text-white">
              {amountIn} {tokenIn}
            </p>
          </div>

          <div className="my-5 flex justify-center">
            <ArrowDown
              size={20}
              className="text-emerald-400"
            />
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-500">
              Receber aproximadamente
            </p>

            <p className="mt-2 break-all text-2xl font-bold text-emerald-400">
              {amountOut} {tokenOut}
            </p>
          </div>

          <div className="mt-5 border-t border-white/10 pt-4">
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">
                Taxa de serviço
              </span>

              <span className="font-semibold text-white">
                {fee} {tokenIn}
              </span>
            </div>
          </div>
        </div>

        {needsApproval && (
          <div className="mt-4 flex gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 p-3">
            <ShieldCheck
              size={18}
              className="shrink-0 text-amber-400"
            />

            <p className="text-xs leading-5 text-gray-300">
              Primeiro será necessário autorizar o Converter
              a utilizar o token. A autorização não executa
              a conversão.
            </p>
          </div>
        )}

        {approvalConfirmed && (
          <div className="mt-4 flex items-center gap-2 text-xs text-emerald-400">
            <CheckCircle2 size={15} />
            Autorização confirmada.
          </div>
        )}

        {error && (
          <div className="mt-4 rounded-xl bg-red-500/10 p-3 text-xs text-red-400">
            {error}
          </div>
        )}

        <button
          type="button"
          onClick={onConfirm}
          disabled={loading}
          className="mt-6 flex min-h-[54px] w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 text-sm font-bold text-black transition active:scale-[0.98] disabled:opacity-50"
        >
          {loading ? (
            <>
              <LoaderCircle size={18} className="animate-spin" />
              A processar...
            </>
          ) : needsApproval ? (
            <>
              <ShieldCheck size={18} />
              Autorizar token
            </>
          ) : (
            <>
              <ArrowLeftRight size={18} />
              Confirmar conversão
            </>
          )}
        </button>

        <p className="mt-4 text-center text-[10px] leading-5 text-gray-500">
          A operação só será executada depois da confirmação
          na carteira.
        </p>
      </div>
    </div>
  );
}
