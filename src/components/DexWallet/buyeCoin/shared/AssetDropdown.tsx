"use client";

import { useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import AssetIcon from "./AssetIcon";

export interface BuyEcoinAssetOption {
  symbol: string;
  name?: string;
  address?: string;
  decimals?: number;
  logoURI?: string;
  imageUrl?: string;
}

interface AssetDropdownProps {
  selectedAsset: BuyEcoinAssetOption;
  assets: BuyEcoinAssetOption[];
  onSelect: (asset: BuyEcoinAssetOption) => void;
  excludeAsset?: string;
  disabled?: boolean;
}

export function AssetDropdown({
  selectedAsset,
  assets,
  onSelect,
  excludeAsset,
  disabled = false,
}: AssetDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const filteredAssets = assets.filter(
    (asset) => asset.symbol !== excludeAsset
  );

  const handleSelect = (asset: BuyEcoinAssetOption) => {
    onSelect(asset);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
        aria-label="Selecionar ativo"
        className="flex w-full items-center justify-between gap-3 rounded-xl border border-neutral-700 bg-neutral-800 px-3 py-3 transition hover:border-neutral-500 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <span className="flex min-w-0 items-center gap-2">
          <AssetIcon
            symbol={selectedAsset.symbol}
            imageUrl={selectedAsset.imageUrl ?? selectedAsset.logoURI}
            size={34}
          />

          <span className="min-w-0 text-left">
            <span className="block text-sm font-bold text-white">
              {selectedAsset.symbol}
            </span>
            <span className="block truncate text-xs text-neutral-400">
              {selectedAsset.name ?? selectedAsset.symbol}
            </span>
          </span>
        </span>

        <ChevronDown
          size={18}
          className={`shrink-0 text-neutral-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <>
          <button
            type="button"
            aria-label="Fechar seleção de ativo"
            className="fixed inset-0 z-20 cursor-default"
            onClick={() => setIsOpen(false)}
          />

          <div className="absolute left-0 right-0 top-full z-30 mt-2 max-h-64 overflow-y-auto rounded-xl border border-neutral-700 bg-[#111923] p-2 shadow-2xl">
            {filteredAssets.length === 0 ? (
              <p className="p-3 text-center text-xs text-neutral-400">
                Nenhum ativo disponível.
              </p>
            ) : (
              filteredAssets.map((asset) => {
                const selected =
                  asset.symbol === selectedAsset.symbol;

                return (
                  <button
                    key={asset.symbol}
                    type="button"
                    onClick={() => handleSelect(asset)}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left transition hover:bg-white/5"
                  >
                    <span className="flex min-w-0 items-center gap-3">
                      <AssetIcon
                        symbol={asset.symbol}
                        imageUrl={asset.imageUrl ?? asset.logoURI}
                        size={32}
                      />

                      <span className="min-w-0">
                        <span className="block text-sm font-semibold text-white">
                          {asset.symbol}
                        </span>
                        <span className="block truncate text-xs text-neutral-400">
                          {asset.name ?? asset.symbol}
                        </span>
                      </span>
                    </span>

                    {selected && (
                      <Check
                        size={17}
                        className="text-emerald-400"
                      />
                    )}
                  </button>
                );
              })
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default AssetDropdown;