"use client";

import React from "react";
import {
  Languages,
  ArrowRight,
  Cpu,
  Zap,
  CheckCircle,
} from "lucide-react";

import { useTranslation } from "../../hooks/useTranslation";

export interface TranslationPreviewProps {
  source: string;
  translated?: string;
  className?: string;
}

export default function TranslationPreview({
  source,
  translated,
  className = "",
}: TranslationPreviewProps) {

  const {
    provider,
    loading,
    cacheHitRate,
  } = useTranslation();

  return (
    <div
      className={`rounded-2xl border border-[#D4AF37]/30 bg-black/70 backdrop-blur-xl p-5 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">

        <div className="flex items-center gap-2">

          <Languages
            size={18}
            className="text-[#D4AF37]"
          />

          <span className="font-semibold text-white">
            Pré-visualização
          </span>

        </div>

        <div className="flex items-center gap-3 text-xs">

          <div className="flex items-center gap-1 text-[#D4AF37]">

            <Cpu size={14} />

            {provider}

          </div>

          <div className="flex items-center gap-1 text-green-400">

            <Zap size={14} />

            {cacheHitRate}

          </div>

        </div>

      </div>

      {/* Conteúdo */}

      <div className="grid md:grid-cols-2 gap-4">

        <div className="rounded-xl border border-gray-700 bg-black/40 p-4">

          <div className="text-xs uppercase text-gray-400 mb-2">

            Original

          </div>

          <p className="text-white whitespace-pre-wrap">

            {source}

          </p>

        </div>

        <div className="rounded-xl border border-[#D4AF37]/30 bg-[#D4AF37]/5 p-4">

          <div className="flex items-center justify-between mb-2">

            <span className="text-xs uppercase text-[#D4AF37]">

              Tradução

            </span>

            {

              !loading && (

                <CheckCircle

                  size={14}

                  className="text-green-400"

                />

              )

            }

          </div>

          <p className="text-white whitespace-pre-wrap">

            {

              loading

                ? "Traduzindo..."

                : translated || "Nenhuma tradução disponível."

            }

          </p>

        </div>

      </div>

      <div className="flex justify-center mt-4">

        <ArrowRight className="text-[#D4AF37]" />

      </div>

    </div>

  );

}