
"use client";

import { Wallet } from "lucide-react";

interface DesktopAmountInputProps {
  label?: string;
  value: string;
  balance?: string;
  symbol: string;
  disabled?: boolean;
  onChange: (value: string) => void;
  onMax?: () => void;
}

export default function DesktopAmountInput({
  label = "Valor",
  value,
  balance,
  symbol,
  disabled = false,
  onChange,
  onMax,
}: DesktopAmountInputProps) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label className="text-xs font-medium text-gray-400">
          {label}
        </label>

        {balance !== undefined && (
          <span className="flex items-center gap-1 text-xs text-gray-500">
            <Wallet size={12} />
            Saldo: {balance} {symbol}
          </span>
        )}
      </div>

      <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#15191e] px-4 py-4 transition focus-within:border-emerald-500/60">
        <input
          type="text"
          inputMode="decimal"
          autoComplete="off"
          placeholder="0.00"
          value={value}
          disabled={disabled}
          onChange={(event) => {
            const next = event.target.value;

            if (/^\d*\.?\d*$/.test(next)) {
              onChange(next);
            }
          }}
          className="min-w-0 flex-1 bg-transparent text-2xl font-semibold text-white outline-none placeholder:text-gray-600 disabled:opacity-50"
        />

        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-gray-300">
            {symbol}
          </span>

          {onMax && (
            <button
              type="button"
              onClick={onMax}
              disabled={disabled}
              className="rounded-lg bg-emerald-500/10 px-2.5 py-1.5 text-xs font-bold text-emerald-400 hover:bg-emerald-500/20 disabled:opacity-50"
            >
              MAX
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
