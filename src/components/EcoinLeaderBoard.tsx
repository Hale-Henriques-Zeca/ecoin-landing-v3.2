"use client";

import { motion } from "framer-motion";
import { Trophy, Users, Coins, Star } from "lucide-react";

export type LeaderItem = {
  name: string;
  wallet: string;
  members: number;
  rewards: number;
  score: number;
};

const DEFAULT_LEADERS: LeaderItem[] = [
  {
    name: "Eden Pioneer",
    wallet: "0x92A...F31",
    members: 124,
    rewards: 842,
    score: 98
  },
  {
    name: "Genesis Builder",
    wallet: "0xAB3...921",
    members: 97,
    rewards: 620,
    score: 91
  },
  {
    name: "Network Architect",
    wallet: "0xCC4...122",
    members: 81,
    rewards: 505,
    score: 87
  },
  {
    name: "Community Captain",
    wallet: "0xF91...332",
    members: 60,
    rewards: 390,
    score: 80
  }
];

interface EcoinLeaderBoardProps {
  data?: LeaderItem[];
}

export default function EcoinLeaderBoard({ data = DEFAULT_LEADERS }: EcoinLeaderBoardProps) {
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
            className="bg-black/60 border border-white/10 rounded-xl p-5 hover:border-[#D4AF37]/50 transition-all duration-300 relative overflow-hidden group"
          >
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

            <div className="grid grid-cols-3 gap-2 text-center bg-black/40 p-3 rounded-lg border border-white/5">
              <div>
                <Users className="mx-auto text-[#3B82F6]" size={18} />
                <p className="text-[10px] text-gray-400 mt-1 uppercase font-semibold">Members</p>
                <p className="font-bold text-sm text-white mt-0.5">{leader.members}</p>
              </div>

              <div>
                <Coins className="mx-auto text-emerald-400" size={18} />
                <p className="text-[10px] text-gray-400 mt-1 uppercase font-semibold">Rewards</p>
                <p className="font-bold text-sm text-emerald-400 mt-0.5">{leader.rewards} eCoin</p>
              </div>

              <div>
                <Star className="mx-auto text-[#F59E0B]" size={18} />
                <p className="text-[10px] text-gray-400 mt-1 uppercase font-semibold">Score</p>
                <p className="font-bold text-sm text-[#F59E0B] mt-0.5">{leader.score}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}