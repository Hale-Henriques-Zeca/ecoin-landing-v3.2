
"use client";

import { ChevronDown } from "lucide-react";

import type {
  ConverterAsset,
  ConverterAssetSymbol,
} from "@/types/converter";

interface DesktopAssetSelectorProps {
  label: string;
  value: ConverterAssetSymbol;
  assets: ConverterAsset[];
  disabled?: boolean;
  onChange: (symbol: ConverterAssetSymbol) => void;
}

export default function DesktopAssetSelector({
  label,
  value,
  assets,
  disabled = false,
  onChange,
}: DesktopAssetSelectorProps) {
  return (
    <div className="min-w-0 flex-1">
      <label className="mb-2 block text-xs font-medium text-gray-400">
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
          className="w-full appearance-none rounded-xl border border-white/10 bg-[#15191e] py-3 pl-4 pr-11 text-sm font-semibold text-white outline-none transition focus:border-emerald-500/60 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {assets.map((asset) => (
            <option
              key={asset.symbol}
              value={asset.symbol}
            >
              {asset.symbol} — {asset.name}
            </option>
          ))}
        </select>

        <ChevronDown
          size={17}
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
        />
      </div>
    </div>
  );
}
