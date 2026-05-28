"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  Activity,
  BarChart3,
} from "lucide-react";

type Props = {
  yearlyRewards: number;
  stakedAmount: number;
};

export default function APRPanel({
  yearlyRewards,
  stakedAmount,
}: Props) {

  const apr =
    stakedAmount > 0
      ? (yearlyRewards / stakedAmount) * 100
      : 0;

  const apy =
    apr * 2.15;

  const velocity =
    apr > 200
      ? "EXTREME"
      : apr > 100
      ? "HIGH"
      : apr > 40
      ? "MEDIUM"
      : "LOW";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="
        rounded-3xl
        border
        border-[#D4AF37]/20
        bg-white/5
        backdrop-blur-xl
        p-6
      "
    >

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div className="
          rounded-2xl
          border
          border-green-500/20
          bg-green-500/5
          p-5
        ">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp
              size={18}
              className="text-green-400"
            />
            <span className="text-white/50 text-xs uppercase">
              Current APR
            </span>
          </div>

          <h2 className="text-3xl font-black text-green-400">
            {apr.toFixed(2)}%
          </h2>
        </div>

        <div className="
          rounded-2xl
          border
          border-cyan-500/20
          bg-cyan-500/5
          p-5
        ">
          <div className="flex items-center gap-2 mb-3">
            <BarChart3
              size={18}
              className="text-cyan-400"
            />
            <span className="text-white/50 text-xs uppercase">
              Projected APY
            </span>
          </div>

          <h2 className="text-3xl font-black text-cyan-400">
            {apy.toFixed(2)}%
          </h2>
        </div>

        <div className="
          rounded-2xl
          border
          border-purple-500/20
          bg-purple-500/5
          p-5
        ">
          <div className="flex items-center gap-2 mb-3">
            <Activity
              size={18}
              className="text-purple-400"
            />
            <span className="text-white/50 text-xs uppercase">
              Reward Velocity
            </span>
          </div>

          <h2 className="text-3xl font-black text-purple-400">
            {velocity}
          </h2>
        </div>

      </div>

    </motion.div>
  );
}