"use client";

import { useState } from "react";
import { Settings2 } from "lucide-react";

interface SlippageSettingsProps {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
  minimum?: number;
  maximum?: number;
}

const PRESETS = [0.1, 0.5, 1.0];

export default function SlippageSettings({
  value,
  onChange,
  disabled = false,
  minimum = 0.1,
  maximum = 5,
}: SlippageSettingsProps) {
  const [customMode, setCustomMode] = useState(
    !PRESETS.includes(value)
  );

  const handleCustomChange = (rawValue: string) => {
    if (rawValue === "") {
      return;
    }

    const parsed = Number(rawValue);

    if (!Number.isFinite(parsed)) return;

    onChange(parsed);
  };

  const isValid =
    Number.isFinite(value) &&
    value >= minimum &&
    value <= maximum;

  return (
    <section className="rounded-xl border border-white/10 bg-[#101923] p-3">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Settings2 size={16} className="text-yellow-400" />

          <span className="text-sm font-semibold text-white">
            Slippage tolerance
          </span>
        </div>

        <span className="text-xs text-neutral-400">
          {value}%
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {PRESETS.map((preset) => (
          <button
            key={preset}
            type="button"
            disabled={disabled}
            onClick={() => {
              setCustomMode(false);
              onChange(preset);
            }}
            className={`rounded-lg border px-3 py-2 text-xs font-semibold transition disabled:opacity-50 ${
              !customMode && value === preset
                ? "border-yellow-500 bg-yellow-500/10 text-yellow-400"
                : "border-white/10 bg-white/[0.03] text-neutral-300 hover:bg-white/10"
            }`}
          >
            {preset}%
          </button>
        ))}

        <button
          type="button"
          disabled={disabled}
          onClick={() => setCustomMode(true)}
          className={`rounded-lg border px-3 py-2 text-xs font-semibold transition disabled:opacity-50 ${
            customMode
              ? "border-yellow-500 bg-yellow-500/10 text-yellow-400"
              : "border-white/10 bg-white/[0.03] text-neutral-300 hover:bg-white/10"
          }`}
        >
          Personalizado
        </button>
      </div>

      {customMode && (
        <div className="mt-3">
          <label
            htmlFor="buyecoin-custom-slippage"
            className="mb-1 block text-xs text-neutral-400"
          >
            Valor personalizado (%)
          </label>

          <input
            id="buyecoin-custom-slippage"
            type="number"
            min={minimum}
            max={maximum}
            step="0.1"
            value={value}
            disabled={disabled}
            onChange={(event) =>
              handleCustomChange(event.target.value)
            }
            className="w-full rounded-lg border border-neutral-700 bg-black/20 px-3 py-2 text-sm text-white outline-none focus:border-yellow-500 disabled:opacity-50"
          />

          {!isValid && (
            <p className="mt-2 text-xs text-red-400">
              Define um valor entre {minimum}% e {maximum}%.
            </p>
          )}
        </div>
      )}

      <p className="mt-3 text-[11px] leading-relaxed text-neutral-500">
        A transação poderá falhar se o preço variar para além da
        tolerância definida. O valor será utilizado na proteção
        de saída mínima da cotação.
      </p>
    </section>
  );
}