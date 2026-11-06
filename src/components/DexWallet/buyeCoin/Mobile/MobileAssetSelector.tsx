
"use client";

import { ChevronDown } from "lucide-react";

import type {
  ConverterAsset,
  ConverterAssetSymbol,
} from "@/types/converter";

interface MobileAssetSelectorProps {
  label: string;
  value: ConverterAssetSymbol;
  assets: ConverterAsset[];
  disabled?: boolean;
  onChange: (symbol: ConverterAssetSymbol) => void;
}

export default function MobileAssetSelector({
  label,
  value,
  assets,
  disabled = false,
  onChange,
}: MobileAssetSelectorProps) {
  return (
    <div className="min-w-0">
      <label className="mb-2 block text-xs text-gray-400">
        {label}
      </label>

      <div className="relative">
        <select
          value={value}
          disabled={disabled}
          onChange={(event) =>
            onChange(
              event.target.value as ConverterAssetSymbol
            )
          }
          className="w-full appearance-none rounded-xl border border-white/10 bg-[#171c22] py-3 pl-3 pr-9 text-sm font-bold text-white outline-none focus:border-emerald-500/60 disabled:opacity-50"
        >
          {assets.map((asset) => (
            <option
              key={asset.symbol}
              value={asset.symbol}
            >
              {asset.symbol}
            </option>
          ))}
        </select>

        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
      </div>
    </div>
  );
}
