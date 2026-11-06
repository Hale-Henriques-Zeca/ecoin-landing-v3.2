"use client";

interface ConfirmationDetailsProps {
  fromSymbol: string;
  toSymbol: string;
  amountIn: string;
  amountOut: string;
  minimumReceived?: string;
  exchangeRate?: string;
  networkFee?: string;
  protocolFee?: string;
  slippage?: number;
  providerName?: string;
  disabled?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value?: string;
}) {
  if (!value) return null;

  return (
    <div className="flex items-center justify-between gap-4 py-2">
      <span className="text-xs text-neutral-400">{label}</span>
      <span className="text-right text-xs font-medium text-white">
        {value}
      </span>
    </div>
  );
}

export default function ConfirmationDetails({
  fromSymbol,
  toSymbol,
  amountIn,
  amountOut,
  minimumReceived,
  exchangeRate,
  networkFee,
  protocolFee,
  slippage = 0.5,
  providerName,
  disabled = false,
  onConfirm,
  onCancel,
}: ConfirmationDetailsProps) {
  return (
    <section className="w-full rounded-2xl border border-neutral-700 bg-[#101923] p-4">
      <h3 className="text-base font-bold text-white">
        Confirmar conversão
      </h3>

      <div className="my-4 rounded-xl bg-black/20 p-4">
        <p className="text-xs text-neutral-400">Estás a converter</p>

        <p className="mt-1 text-lg font-bold text-white">
          {amountIn} {fromSymbol}
        </p>

        <div className="my-3 flex justify-center text-neutral-500">
          ↓
        </div>

        <p className="text-xs text-neutral-400">Vais receber aproximadamente</p>

        <p className="mt-1 text-xl font-bold text-emerald-400">
          {amountOut} {toSymbol}
        </p>
      </div>

      <div className="divide-y divide-white/5">
        <DetailRow
          label="Recebimento mínimo"
          value={
            minimumReceived
              ? `${minimumReceived} ${toSymbol}`
              : undefined
          }
        />

        <DetailRow
          label="Taxa do protocolo"
          value={protocolFee}
        />

        <DetailRow
          label="Taxa de rede"
          value={networkFee}
        />

        <DetailRow
          label="Taxa de câmbio"
          value={exchangeRate}
        />

        <DetailRow
          label="Slippage máximo"
          value={`${slippage}%`}
        />

        <DetailRow
          label="Provider"
          value={providerName}
        />
      </div>

      <div className="mt-5 flex gap-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={disabled}
            className="flex-1 rounded-xl border border-neutral-600 px-4 py-3 text-sm font-semibold text-white hover:bg-white/5 disabled:opacity-50"
          >
            Cancelar
          </button>
        )}

        {onConfirm && (
          <button
            type="button"
            onClick={onConfirm}
            disabled={disabled}
            className="flex-1 rounded-xl bg-yellow-500 px-4 py-3 text-sm font-bold text-black transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Confirmar conversão
          </button>
        )}
      </div>
    </section>
  );
}