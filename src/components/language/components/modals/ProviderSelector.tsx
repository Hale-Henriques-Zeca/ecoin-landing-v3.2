"use client";

import React from "react";
import {
  Cpu,
  CheckCircle,
  XCircle,
  Activity,
  Zap,
  DollarSign,
  BarChart3,
  Check,
  X,
  Sparkles,
  ShieldAlert,
} from "lucide-react";
import { useProviders } from "../../hooks/useProviders";

export interface ProviderSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export default function ProviderSelector({
  isOpen,
  onClose,
  className = "",
}: ProviderSelectorProps) {
  // Conexão direta ao ProviderManager via Hook
  const { providers, activeProvider, setProvider } = useProviders();

  if (!isOpen) return null;

  const handleSelectPrimary = async (providerId: string) => {
    await setProvider(providerId);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div
        className={`relative w-full max-w-3xl bg-black/90 border border-[#D4AF37]/80 rounded-3xl p-6 md:p-8 shadow-2xl text-white backdrop-blur-2xl border-t-2 border-t-[#D4AF37] overflow-hidden ${className}`}
      >
        {/* Glow de fundo */}
        <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

        {/* CABEÇALHO */}
        <div className="flex items-center justify-between pb-4 border-b border-[#D4AF37]/20 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37]">
              <Cpu size={22} />
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-bold tracking-wide text-white flex items-center gap-2">
                Motores de IA & Providers
                <Sparkles size={16} className="text-[#D4AF37]" />
              </h2>
              <p className="text-xs text-gray-400">
                Gere o estado de saúde, latência e prioridade dos modelos de inteligência artificial
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-[#D4AF37]/10 rounded-full transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* LISTA DE CARTÕES DOS PROVIDERS DINÂMICOS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto pr-1 custom-scrollbar">
          {providers.map((p) => {
            const isPrimary = activeProvider?.id === p.id;
            const healthStatus = p.health?.status ?? "online";
            const latency = p.health?.latency ?? 0;
            const requestCount = p.statistics?.requests ?? 0;

            return (
              <div
                key={p.id}
                className={`relative flex flex-col justify-between p-5 rounded-2xl border transition-all ${
                  isPrimary
                    ? "bg-[#D4AF37]/10 border-[#D4AF37] shadow-xl ring-1 ring-[#D4AF37]/50"
                    : "bg-black/60 border-gray-800 hover:border-[#D4AF37]/40"
                }`}
              >
                {/* HEAD DO CARD */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-white">{p.name}</span>
                      {isPrimary && (
                        <span className="bg-[#D4AF37] text-black text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                          Principal
                        </span>
                      )}
                    </div>

                    {/* BADGE DE STATUS VIA HEALTH SERVICE */}
                    <div className="flex items-center gap-1.5">
                      {healthStatus === "online" ? (
                        <span className="flex items-center gap-1 text-[10px] text-green-400 bg-green-950/60 border border-green-800/40 px-2 py-0.5 rounded-full">
                          <CheckCircle size={10} /> Online
                        </span>
                      ) : healthStatus === "degraded" ? (
                        <span className="flex items-center gap-1 text-[10px] text-amber-400 bg-amber-950/60 border border-amber-800/40 px-2 py-0.5 rounded-full">
                          <ShieldAlert size={10} /> Instável
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-[10px] text-red-400 bg-red-950/60 border border-red-800/40 px-2 py-0.5 rounded-full">
                          <XCircle size={10} /> Offline
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-[11px] text-gray-400 mb-3 line-clamp-2">
                    {p.description || "Provedor de inteligência artificial integrado."}
                  </p>

                  {/* METRICAS GRID VINDAS DO PROVIDER HEALTH & STATISTICS */}
                  <div className="grid grid-cols-2 gap-2 p-2.5 bg-black/50 border border-gray-800/80 rounded-xl text-[10px] text-gray-300 mb-4">
                    <div className="flex items-center gap-1.5">
                      <Activity size={12} className="text-[#D4AF37]" />
                      <span>Latência: <strong>{latency}ms</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Zap size={12} className="text-blue-400" />
                      <span>Modelo: <strong>{p.model}</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <DollarSign size={12} className="text-green-400" />
                      <span>Custo/1K: <strong>{p.estimatedCostPer1k ?? "$0.00"}</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <BarChart3 size={12} className="text-purple-400" />
                      <span>Reqs: <strong>{requestCount.toLocaleString()}</strong></span>
                    </div>
                  </div>
                </div>

                {/* BOTÃO DE AÇÃO */}
                <button
                  onClick={() => handleSelectPrimary(p.id)}
                  disabled={isPrimary || healthStatus === "offline"}
                  className={`w-full py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                    isPrimary
                      ? "bg-[#D4AF37]/20 border border-[#D4AF37] text-[#D4AF37] cursor-default"
                      : healthStatus === "offline"
                      ? "bg-gray-900 border border-gray-800 text-gray-600 cursor-not-allowed"
                      : "bg-black border border-gray-700 hover:border-[#D4AF37] text-white hover:text-[#D4AF37]"
                  }`}
                >
                  {isPrimary ? (
                    <>
                      <Check size={14} /> Selecionado como Principal
                    </>
                  ) : (
                    "Definir como Principal"
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* FOOTER */}
        <div className="mt-6 pt-4 border-t border-[#D4AF37]/20 flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span>Failover Automático Ativo</span>
          </div>
          <button
            onClick={onClose}
            className="bg-[#D4AF37] hover:bg-[#b5922f] text-black font-bold px-5 py-2.5 rounded-full text-xs transition shadow-lg"
          >
            Concluído
          </button>
        </div>

      </div>
    </div>
  );
}