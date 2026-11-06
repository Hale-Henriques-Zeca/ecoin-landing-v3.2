
"use client";

import {
  ArrowDown,
  ArrowLeftRight,
  CheckCircle2,
  LoaderCircle,
  ShieldCheck,
  X,
} from "lucide-react";

interface DesktopTransactionModalProps {
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

export default function DesktopTransactionModal({
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
}: DesktopTransactionModalProps) {
  if (!open) return null;

  const approvalStep =
    requiresApproval && !approvalConfirmed;

  const actionLabel = approvalStep
    ? "Autorizar token"
    : "Confirmar conversão";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !loading) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="conversion-modal-title"
        className="w-full max-w-md rounded-3xl border border-white/10 bg-[#11161c] p-6 shadow-2xl"
      >
        <div className="mb-6 flex items-center justify-between">
          <h2
            id="conversion-modal-title"
            className="text-lg font-bold text-white"
          >
            Confirmar operação
          </h2>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            aria-label="Fechar"
            className="rounded-lg p-2 text-gray-400 transition hover:bg-white/10 disabled:opacity-40"
          >
            <X size={19} />
          </button>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <div className="text-center">
            <p className="text-xs text-gray-400">
              Está a enviar
            </p>

            <p className="mt-2 text-2xl font-bold text-white">
              {amountIn} {tokenIn}
            </p>
          </div>

          <div className="my-5 flex justify-center">
            <ArrowDown
              size={22}
              className="text-emerald-400"
            />
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-400">
              Estimativa de recebimento
            </p>

            <p className="mt-2 text-2xl font-bold text-emerald-400">
              {amountOut} {tokenOut}
            </p>
          </div>

          <div className="mt-5 border-t border-white/10 pt-4">
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">
                Taxa de serviço
              </span>

              <span className="text-white">
                {fee} {tokenIn}
              </span>
            </div>
          </div>
        </div>

        {approvalStep && (
          <div className="mt-4 flex items-start gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 p-3">
            <ShieldCheck
              size={18}
              className="text-amber-400"
            />

            <p className="text-xs leading-5 text-gray-300">
              Primeiro será necessário autorizar o Converter
              a utilizar o teu token. Esta autorização não
              executa a conversão.
            </p>
          </div>
        )}

        {approvalConfirmed && (
          <div className="mt-4 flex items-center gap-2 text-xs text-emerald-400">
            <CheckCircle2 size={16} />
            Autorização confirmada.
          </div>
        )}

        {error && (
          <p className="mt-4 rounded-lg bg-red-500/10 p-3 text-xs text-red-400">
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={onConfirm}
          disabled={loading}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-4 text-sm font-bold text-black transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? (
            <>
              <LoaderCircle size={17} className="animate-spin" />
              A processar...
            </>
          ) : (
            <>
              {approvalStep ? (
                <ShieldCheck size={17} />
              ) : (
                <ArrowLeftRight size={17} />
              )}
              {actionLabel}
            </>
          )}
        </button>

        <p className="mt-4 text-center text-[10px] leading-5 text-gray-500">
          Confirma os valores e verifica a operação na tua
          carteira antes de assinar.
        </p>
      </div>
    </div>
  );
}
