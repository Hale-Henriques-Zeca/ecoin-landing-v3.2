"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Clock3,
  Fuel,
  Coins,
  CheckCircle2,
  TrendingUp,
  History,
  ShieldCheck,
} from "lucide-react";
import { useAccount } from "wagmi";
import { useMiningStaking } from "@/hooks/useMiningStaking";

export default function MiningHistoryPanel() {
  const { getMiningSessions } = useMiningStaking();
  const { address } = useAccount();
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function load() {
      if (!address) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const rows = await getMiningSessions();
        setSessions(rows || []);
      } catch (err) {
        console.error("Erro ao carregar histórico de dividendos CS:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [address, getMiningSessions]);

  if (loading) {
    return (
      <div className="w-full py-12 text-center bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#D4AF37] mx-auto mb-3" />
        <p className="text-xs text-white/50 font-mono uppercase tracking-widest">
          Carregando Sessões do Histórico CS...
        </p>
      </div>
    );
  }

  if (sessions.length === 0) {
    return (
      <div className="w-full py-12 px-6 text-center bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl space-y-3">
        <History size={36} className="text-white/20 mx-auto" />
        <h3 className="text-white font-bold text-base">Nenhum Registro de Sessão CS</h3>
        <p className="text-xs text-gray-400 max-w-sm mx-auto">
          Suas atividades de consumo de Selo de Compromisso (CS) e geração de dividendos aparecerão listadas aqui assim que forem executadas no contrato inteligente.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {sessions.map((session, index) => {
        const gasPurchased = Number(session.gasPurchased || 0) / 1e18;
        const gasConsumed = Number(session.gasConsumed || 0) / 1e18;
        const claimedUSDT = Number(session.claimedUSDT || 0) / 1e18;
        const claimedEUSD = Number(session.claimedEUSD || 0) / 1e18;
        const totalRewards = claimedUSDT + claimedEUSD;

        const roi = gasPurchased > 0 ? (totalRewards / gasPurchased) * 100 : 0;

        return (
          <motion.div
            key={session.id || index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="
              relative
              overflow-hidden
              rounded-3xl
              border
              border-white/10
              bg-[#09090b]/60
              backdrop-blur-xl
              p-6
              transition-all
              hover:border-[#D4AF37]/30
            "
          >
            {/* Brilho decorativo de fundo */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 via-transparent to-transparent pointer-events-none" />

            <div className="relative z-10">
              {/* Header do Card */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={18} className="text-[#D4AF37]" />
                    <h2 className="text-white font-black text-lg md:text-xl tracking-tight">
                      Sessão Shareholder CS #{session.id}
                    </h2>
                  </div>
                  <p className="text-emerald-400 text-xs uppercase font-bold mt-1 tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Ciclo de Dividendos CS Concluído
                  </p>
                </div>
                <div className="bg-emerald-500/10 p-2 rounded-xl border border-emerald-500/20">
                  <CheckCircle2 className="text-emerald-400" size={20} />
                </div>
              </div>

              {/* Grid de Métricas da Sessão */}
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 pt-4 border-t border-white/5">
                <div>
                  <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest mb-1">
                    Início do Ciclo CS
                  </p>
                  <div className="flex items-center gap-2 text-white font-mono text-xs">
                    <CalendarDays size={14} className="text-white/40" />
                    {new Date(Number(session.startedAt || 0) * 1000).toLocaleDateString()}
                  </div>
                </div>

                <div>
                  <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest mb-1">
                    Término do Ciclo CS
                  </p>
                  <div className="flex items-center gap-2 text-white font-mono text-xs">
                    <Clock3 size={14} className="text-white/40" />
                    {new Date(Number(session.endedAt || 0) * 1000).toLocaleDateString()}
                  </div>
                </div>

                <div>
                  <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest mb-1">
                    Capacidade CS Utilizada
                  </p>
                  <div className="flex items-center gap-2 text-red-400 font-mono font-bold text-xs">
                    <Fuel size={14} />
                    {gasConsumed.toFixed(4)} CS
                  </div>
                </div>

                <div>
                  <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest mb-1">
                    Dividendos Gerados
                  </p>
                  <div className="flex items-center gap-2 text-emerald-400 font-mono font-bold text-xs">
                    <Coins size={14} />
                    ${totalRewards.toFixed(4)}
                  </div>
                </div>

                <div>
                  <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest mb-1">
                    Retorno CS (ROI)
                  </p>
                  <div className="flex items-center gap-1 text-[#D4AF37] font-black font-mono text-xs">
                    <TrendingUp size={14} />
                    {roi.toFixed(2)}%
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}