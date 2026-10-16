"use client";

import React from "react";
import { useEdenActivityRegistry } from "@/hooks/useEdenActivityRegistry";
import { History, ArrowUpRight, RefreshCw, ExternalLink } from "lucide-react";

export default function MiningHistoryPanel() {
  const { activities, isLoading, totalCount, refetch } = useEdenActivityRegistry();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
            <History size={20} />
          </div>
          <div>
            <h3 className="font-bold text-base text-white">Histórico de Atividades no Protocolo</h3>
            <p className="text-xs text-white/40">Total registrado: {totalCount}</p>
          </div>
        </div>
        <button
          onClick={() => refetch()}
          type="button"
          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all active:scale-95"
        >
          <RefreshCw size={16} className={isLoading ? "animate-spin text-[#D4AF37]" : ""} />
        </button>
      </div>

      {isLoading ? (
        <div className="py-12 text-center text-white/40 text-sm font-mono">
          A carregar registos on-chain...
        </div>
      ) : activities.length === 0 ? (
        <div className="py-12 text-center text-white/40 text-sm">
          Nenhuma atividade registrada para esta carteira.
        </div>
      ) : (
        <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
          {activities.map((act, index) => (
            <div
              key={`${act.transactionHash}-${index}`}
              className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-[#D4AF37]/30 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#D4AF37]">
                  <ArrowUpRight size={18} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-bold text-white uppercase tracking-wider">
                      {act.activityLabel}
                    </p>
                    {act.transactionHash && act.transactionHash !== "0x0" && (
                      <a
                        href={`https://bscscan.com/tx/${act.transactionHash}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-white/30 hover:text-[#D4AF37] transition-colors"
                      >
                        <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                  <p className="text-[10px] text-white/40 font-mono mt-0.5">
                    {new Date(act.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="text-right font-mono">
                {act.amount > 0 && (
                  <p className="text-sm font-bold text-[#D4AF37]">
                    +{act.amount.toFixed(4)}
                  </p>
                )}
                <span className="text-[10px] text-white/30 block">
                  Bloco #{act.blockNumber.toString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}