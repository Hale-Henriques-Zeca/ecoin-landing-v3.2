"use client";

import { motion } from "framer-motion";
import { Trophy, Users, Coins, Star } from "lucide-react";

export type TokenRewards = {
  eCoin: string;
  eDollar: string;
  usdt: string;
  bnb: string;
};

export type LeaderItem = {
  name: string;
  wallet: string;
  members: number;
  rewards: TokenRewards;
  score: number;
};

interface EcoinLeaderBoardProps {
  data?: LeaderItem[];
  isLoading?: boolean;
}

export default function EcoinLeaderBoard({ data = [], isLoading = false }: EcoinLeaderBoardProps) {
  if (isLoading) {
    return (
      <div className="bg-black/50 border border-white/10 rounded-2xl p-8 text-center text-gray-400 mt-12 animate-pulse">
        Carregando dados on-chain da rede E-Coin...
      </div>
    );
  }

  return (
    <div className="bg-black/50 border border-white/10 rounded-2xl p-6 sm:p-8 mt-12 backdrop-blur-xl">
      {/* TITLE */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <h2 className="text-2xl sm:text-3xl font-semibold text-[#D4AF37] flex items-center justify-center gap-2">
          🏆 Global Leaderboard — E-Coin Network
        </h2>
        <p className="text-xs sm:text-sm text-gray-400 mt-2">
          Os líderes que mais contribuem para o crescimento da rede E-Coin são reconhecidos publicamente. A pontuação é calculada via algoritmo on-chain de reputação e volume.
        </p>
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
        {data.map((leader, i) => (
          <motion.div
            key={`${leader.wallet}-${i}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-black/60 border border-white/10 rounded-xl p-5 hover:border-[#D4AF37]/50 transition-all duration-300 relative overflow-hidden group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center">
                    <Trophy className="text-[#D4AF37]" size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-white group-hover:text-[#D4AF37] transition-colors">
                      #{i + 1} {leader.name}
                    </h3>
                  </div>
                </div>
                <span translate="no" className="notranslate text-gray-500 text-xs font-mono bg-white/5 px-2 py-1 rounded border border-white/5">
                  {leader.wallet}
                </span>
              </div>

              {/* STATS HEADER */}
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="bg-black/40 p-2.5 rounded-lg border border-white/5 text-center">
                  <Users className="mx-auto text-[#3B82F6]" size={16} />
                  <p className="text-[10px] text-gray-400 mt-1 uppercase font-semibold">Members</p>
                  <p className="font-bold text-sm text-white mt-0.5">{leader.members}</p>
                </div>

                <div className="bg-black/40 p-2.5 rounded-lg border border-white/5 text-center">
                  <Star className="mx-auto text-[#F59E0B]" size={16} />
                  <p className="text-[10px] text-gray-400 mt-1 uppercase font-semibold">Score</p>
                  <p className="font-bold text-sm text-[#F59E0B] mt-0.5">{leader.score}</p>
                </div>
              </div>
            </div>

            {/* MULTI-CURRENCY REWARDS BREAKDOWN */}
            <div className="bg-black/40 p-3 rounded-lg border border-white/5">
              <div className="flex items-center gap-1.5 mb-2">
                <Coins className="text-emerald-400" size={16} />
                <p className="text-[10px] text-gray-400 uppercase font-semibold tracking-wider">Total Rewards Earned</p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex justify-between items-center bg-white/5 px-2 py-1 rounded">
                  <span className="text-gray-400 font-medium">eCoin:</span>
                  <span className="font-bold text-emerald-400">{leader.rewards.eCoin}</span>
                </div>
                <div className="flex justify-between items-center bg-white/5 px-2 py-1 rounded">
                  <span className="text-gray-400 font-medium">eDollar:</span>
                  <span className="font-bold text-emerald-400">{leader.rewards.eDollar}</span>
                </div>
                <div className="flex justify-between items-center bg-white/5 px-2 py-1 rounded">
                  <span className="text-gray-400 font-medium">USDT:</span>
                  <span className="font-bold text-emerald-400">${leader.rewards.usdt}</span>
                </div>
                <div className="flex justify-between items-center bg-white/5 px-2 py-1 rounded">
                  <span className="text-gray-400 font-medium">BNB:</span>
                  <span className="font-bold text-amber-400">{leader.rewards.bnb}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}