
"use client";

import { Wallet } from "lucide-react";

interface MobileAmountInputProps {
  label?: string;
  value: string;
  symbol: string;
  balance?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
  onMax?: () => void;
}

export default function MobileAmountInput({
  label = "Valor",
  value,
  symbol,
  balance,
  disabled = false,
  onChange,
  onMax,
}: MobileAmountInputProps) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label className="text-xs text-gray-400">
          {label}
        </label>

        {balance !== undefined && (
          <span className="flex items-center gap-1 text-[10px] text-gray-500">
            <Wallet size={12} />
            {balance} {symbol}
          </span>
        )}
      </div>

      <div className="flex min-h-[66px] items-center gap-2 rounded-xl border border-white/10 bg-[#171c22] px-3">
        <input
          type="text"
          inputMode="decimal"
          autoComplete="off"
          value={value}
          disabled={disabled}
          placeholder="0.00"
          onChange={(event) => {
            const next = event.target.value;

            if (/^\d*\.?\d*$/.test(next)) {
              onChange(next);
            }
          }}
          className="min-w-0 flex-1 bg-transparent text-2xl font-semibold text-white outline-none placeholder:text-gray-600"
        />

        <span className="text-sm font-bold text-gray-300">
          {symbol}
        </span>

        {onMax && (
          <button
            type="button"
            disabled={disabled}
            onClick={onMax}
            className="rounded-lg bg-emerald-500/10 px-2.5 py-2 text-[10px] font-bold text-emerald-400 disabled:opacity-50"
          >
            MAX
          </button>
        )}
      </div>
    </div>
  );
}
