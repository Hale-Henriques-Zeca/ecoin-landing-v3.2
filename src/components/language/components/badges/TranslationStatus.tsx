"use client";

import React from "react";
import {
  CheckCircle,
  Loader2,
  Database,
  Cpu,
  AlertTriangle,
} from "lucide-react";

import { useTranslation } from "../../i18n/hooks";

export interface TranslationStatusProps {
  className?: string;
  showProvider?: boolean;
  showCache?: boolean;
  showQueue?: boolean;
}

export default function TranslationStatus({
  className = "",
  showProvider = true,
  showCache = true,
  showQueue = true,
}: TranslationStatusProps) {
  const {
    loading,
    provider,
    cacheHitRate,
    queueLength,
    healthy,
  } = useTranslation();

  return (
    <div
      className={`flex flex-wrap items-center gap-3 rounded-xl border border-[#D4AF37]/30 bg-black/70 backdrop-blur-xl px-4 py-2 text-sm text-white ${className}`}
    >
      {/* Estado */}
      <div className="flex items-center gap-2">
        {loading ? (
          <>
            <Loader2
              size={15}
              className="animate-spin text-[#D4AF37]"
            />
            <span>Traduzindo...</span>
          </>
        ) : healthy ? (
          <>
            <CheckCircle
              size={15}
              className="text-green-400"
            />
            <span>Operacional</span>
          </>
        ) : (
          <>
            <AlertTriangle
              size={15}
              className="text-red-400"
            />
            <span>Erro</span>
          </>
        )}
      </div>

      {showProvider && (
        <div className="flex items-center gap-1 text-[#D4AF37]">
          <Cpu size={14} />
          <span>{provider}</span>
        </div>
      )}

      {showCache && (
        <div className="flex items-center gap-1 text-green-400">
          <Database size={14} />
          <span>{cacheHitRate}</span>
        </div>
      )}

      {showQueue && (
        <div className="text-xs text-gray-400">
          Queue: {queueLength}
        </div>
      )}
    </div>
  );
}