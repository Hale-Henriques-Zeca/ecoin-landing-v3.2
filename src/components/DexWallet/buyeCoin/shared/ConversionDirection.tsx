"use client";

import { ArrowDownUp } from "lucide-react";

interface ConversionDirectionProps {
  onSwitch: () => void;
  disabled?: boolean;
}

export default function ConversionDirection({
  onSwitch,
  disabled = false,
}: ConversionDirectionProps) {
  return (
    <div className="relative z-10 flex justify-center">
      <button
        type="button"
        onClick={onSwitch}
        disabled={disabled}
        aria-label="Inverter direção da conversão"
        title="Inverter ativos"
        className="flex h-10 w-10 items-center justify-center rounded-xl border-4 border-[#0b111a] bg-neutral-800 text-yellow-400 shadow-lg transition hover:rotate-180 hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ArrowDownUp size={18} />
      </button>
    </div>
  );
}