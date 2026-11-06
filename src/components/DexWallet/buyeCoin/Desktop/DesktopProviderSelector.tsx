
"use client";

import {
  CheckCircle2,
  ChevronDown,
  CircleAlert,
  Network,
} from "lucide-react";

import type {
  ConverterProvider,
} from "@/types/converter";

interface DesktopProviderSelectorProps {
  providers: ConverterProvider[];
  value?: string;
  onChange: (providerId: string) => void;
  disabled?: boolean;
  loading?: boolean;
}

export default function DesktopProviderSelector({
  providers,
  value,
  onChange,
  disabled = false,
  loading = false,
}: DesktopProviderSelectorProps) {
  const activeProviders = providers.filter(
    (provider) => provider.enabled
  );

  const selected = activeProviders.find(
    (provider) => provider.id === value
  );

  return (
    <div>
      <label className="mb-2 block text-xs font-medium text-gray-400">
        Fornecedor de liquidez
      </label>

      <div className="relative">
        <select
          value={value ?? ""}
          disabled={disabled || loading || activeProviders.length === 0}
          onChange={(event) => onChange(event.target.value)}
          className="w-full appearance-none rounded-xl border border-white/10 bg-[#15191e] py-3 pl-4 pr-12 text-sm text-white outline-none transition focus:border-emerald-500/60 disabled:opacity-50"
        >
          <option value="">
            {loading
              ? "A verificar fornecedores..."
              : "Selecionar fornecedor"}
          </option>

          {activeProviders.map((provider) => (
            <option
              key={provider.id}
              value={provider.id}
            >
              {provider.name}
            </option>
          ))}
        </select>

        <ChevronDown
          size={17}
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
        />
      </div>

      {selected && (
        <div className="mt-3 flex items-start gap-2 rounded-xl border border-emerald-500/15 bg-emerald-500/[0.05] p-3">
          <CheckCircle2
            size={16}
            className="mt-0.5 text-emerald-400"
          />

          <div>
            <p className="text-xs font-semibold text-white">
              {selected.name} disponível
            </p>

            <p className="mt-1 text-[11px] text-gray-400">
              {selected.description ||
                "Fornecedor registado e aprovado no Router Registry."}
            </p>
          </div>
        </div>
      )}

      {!loading && activeProviders.length === 0 && (
        <div className="mt-3 flex items-center gap-2 rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 text-xs text-amber-400">
          <CircleAlert size={15} />
          Nenhum Adapter aprovado está disponível.
        </div>
      )}

      {providers.length > 0 && (
        <div className="mt-2 flex items-center gap-2 text-[11px] text-gray-500">
          <Network size={12} />
          Verificação on-chain do Router Registry
        </div>
      )}
    </div>
  );
}
