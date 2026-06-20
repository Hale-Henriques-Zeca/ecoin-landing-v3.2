"use client";

import { motion } from "framer-motion";
import {
  CalendarDays,
  Clock3,
  Fuel,
  Coins,
  CheckCircle2,
} from "lucide-react";

import { useEffect, useState, } from "react";
import { useAccount } from 'wagmi';
import { useMiningStaking } from "@/hooks/useMiningStaking";

export default function MiningHistoryPanel() {
  // No seu componente MiningHistoryPanel
const { getMiningSessions } = useMiningStaking();
const { address } = useAccount(); // Adicione isso
const [sessions, setSessions] = useState<any[]>([]);

useEffect(() => {
  async function load() {
    if (!address) return; // Só busca se tiver endereço
    const rows = await getMiningSessions();
    setSessions(rows);
  }
  load();
}, [address, getMiningSessions]); // Adicione as dependências

  return (
    <div className="space-y-4">
      {sessions.map((session) => {
        const gasPurchased = Number(session.gasPurchased) / 1e18;
        const gasConsumed = Number(session.gasConsumed) / 1e18;
        const claimedUSDT = Number(session.claimedUSDT) / 1e18;
        const claimedEUSD = Number(session.claimedEUSD) / 1e18;
        const totalRewards = claimedUSDT + claimedEUSD;
        
        const roi = gasPurchased > 0 
          ? (totalRewards / gasPurchased) * 100 
          : 0;

        return (
          <motion.div
            key={session.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="
              relative
              overflow-hidden
              rounded-3xl
              border
              border-white/10
              bg-white/5
              backdrop-blur-xl
              p-6
            "
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-white font-black text-xl">
                    eCoin Neural Mining AI Session #{session.id}
                  </h2>
                  <p className="text-green-400 text-xs uppercase font-bold mt-1">
                    AI Mining Session Completed
                  </p>
                </div>
                <CheckCircle2 className="text-green-400" size={24} />
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                <div>
                  <p className="text-white/40 text-xs uppercase mb-2">
                    AI Started Mining
                  </p>
                  <div className="flex items-center gap-2 text-white">
                    <CalendarDays size={16} />
                    {new Date(Number(session.startedAt) * 1000).toLocaleDateString()}
                  </div>
                </div>

                <div>
                  <p className="text-white/40 text-xs uppercase mb-2">
                    AI Ended Mining 
                  </p>
                  <div className="flex items-center gap-2 text-white">
                    <Clock3 size={16} />
                    {new Date(Number(session.endedAt) * 1000).toLocaleDateString()}
                  </div>
                </div>

                <div>
                  <p className="text-white/40 text-xs uppercase mb-2">
                    AI Used Gas
                  </p>
                  <div className="flex items-center gap-2 text-red-400">
                    <Fuel size={16} />
                    {gasConsumed}
                  </div>
                </div>

                <div>
                  <p className="text-white/40 text-xs uppercase mb-2">
                    AI Rewards
                  </p>
                  <div className="flex items-center gap-2 text-green-400">
                    <Coins size={16} />
                    {totalRewards}
                  </div>
                </div>

                <div>
                  <p className="text-white/40 text-xs uppercase mb-2">
                    AI ROI
                  </p>
                  <div className="text-yellow-400 font-black">
                    {roi.toFixed(2)}%
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ); // <- Ponto e vírgula removido aqui de dentro!
      })}
    </div>
  );
}