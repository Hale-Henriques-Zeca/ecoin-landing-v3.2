
"use client";

import {
  CheckCircle2,
  ChevronDown,
  CircleAlert,
} from "lucide-react";

import type {
  ConverterProvider,
} from "@/types/converter";

interface MobileProviderSelectorProps {
  providers: ConverterProvider[];
  value?: string;
  onChange: (id: string) => void;
  loading?: boolean;
  disabled?: boolean;
}

export default function MobileProviderSelector({
  providers,
  value,
  onChange,
  loading = false,
  disabled = false,
}: MobileProviderSelectorProps) {
  const available = providers.filter(
    (provider) => provider.enabled
  );

  const selected = available.find(
    (provider) => provider.id === value
  );

  return (
    <div>
      <label className="mb-2 block text-xs text-gray-400">
        Fornecedor de liquidez
      </label>

      <div className="relative">
        <select
          value={value ?? ""}
          disabled={disabled || loading || available.length === 0}
          onChange={(event) => onChange(event.target.value)}
          className="w-full appearance-none rounded-xl border border-white/10 bg-[#171c22] px-3 py-3 pr-10 text-sm font-medium text-white outline-none focus:border-emerald-500/60 disabled:opacity-50"
        >
          <option value="">
            {loading
              ? "A carregar..."
              : "Selecionar fornecedor"}
          </option>

          {available.map((provider) => (
            <option key={provider.id} value={provider.id}>
              {provider.name}
            </option>
          ))}
        </select>

        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
      </div>

      {selected && (
        <div className="mt-3 flex items-start gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3">
          <CheckCircle2
            size={15}
            className="mt-0.5 text-emerald-400"
          />

          <div>
            <p className="text-xs font-semibold text-white">
              {selected.name}
            </p>

            <p className="mt-1 text-[10px] text-gray-400">
              {selected.description ||
                "Adapter aprovado no Router Registry."}
            </p>
          </div>
        </div>
      )}

      {!loading && available.length === 0 && (
        <div className="mt-3 flex items-center gap-2 text-xs text-amber-400">
          <CircleAlert size={15} />
          Nenhum fornecedor disponível.
        </div>
      )}
    </div>
  );
}
