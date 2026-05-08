"use client";

import { motion } from "framer-motion";

import {
  Fuel,
  ShieldCheck,
  AlertTriangle,
  TrendingUp,
  BatteryCharging,
} from "lucide-react";

type Props = {
  gasBalance: number;

  maxCapacity: number;
  usedCapacity: number;
  remainingCapacity: number;

  willMine: boolean;
};

export default function GasCapacityPanel({
  gasBalance,

  maxCapacity,
  usedCapacity,
  remainingCapacity,

  willMine,
}: Props) {

  // 🔥 ROI PROGRESS
  const roiProgress =
    maxCapacity > 0
      ? (usedCapacity / maxCapacity) * 100
      : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-[#D4AF37]/20
        bg-white/5
        backdrop-blur-xl
        p-6
        mb-8
      "
    >

      {/* BACKGROUND FX */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent" />

      <div className="relative z-10">

        {/* HEADER */}
        <div className="
  flex
  flex-col
  sm:flex-row
  sm:items-center
  sm:justify-between
  gap-4
  mb-6
">

          <div className="flex items-center gap-3">

            <div className="
              w-14
              h-14
              rounded-2xl
              bg-[#D4AF37]/10
              flex
              items-center
              justify-center
            ">
              <Fuel
                size={24}
                className="text-[#D4AF37]"
              />
            </div>

            <div>
              <h2 className="text-white text-xl font-black">
                Gas Capacity Engine
              </h2>

              <p className="text-xs text-white/40">
                Neural mining capacity controller
              </p>
            </div>

          </div>

          {willMine ? (
            <div className="
              flex
              items-center
              gap-2
              text-emerald-400
              text-[10px] sm:text-xs
              font-bold
            ">
              <ShieldCheck size={16} />
              ACTIVE
            </div>
          ) : (
            <div className="
  flex
  items-center
  gap-2
  text-red-400
  text-[10px]
  sm:text-xs
  font-bold
  whitespace-nowrap
  self-start
  sm:self-auto
">
              <AlertTriangle size={16} />
              EXHAUSTED
            </div>
          )}

        </div>

        {/* ecGas BALANCE */}
        <div className="
          mb-6
          rounded-2xl
          border
          border-[#D4AF37]/10
          bg-black/20
          p-4
        ">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-2">

              <BatteryCharging
                size={18}
                className="text-[#D4AF37]"
              />

              <span className="text-white/50 text-sm">
                ecGas Balance
              </span>

            </div>

            <span className="
              text-[#00FF9C]
              text-lg
              font-black
            ">
              {gasBalance.toFixed(2)}
            </span>

          </div>

        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* MAX */}
          <div className="
            rounded-2xl
            border
            border-[#D4AF37]/10
            bg-black/20
            p-5
          ">

            <p className="text-white/40 text-xs uppercase mb-2">
              Payout Limit
            </p>

            <h2 className="
              text-2xl
              font-black
              text-[#D4AF37]
            ">
              {maxCapacity.toFixed(2)}
            </h2>

            <p className="text-[10px] text-white/30 mt-1">
              Maximum mining payout
            </p>

          </div>

          {/* USED */}
          <div className="
            rounded-2xl
            border
            border-red-500/10
            bg-red-500/5
            p-5
          ">

            <p className="text-white/40 text-xs uppercase mb-2">
              Used Capacity
            </p>

            <h2 className="
              text-2xl
              font-black
              text-red-400
            ">
              {usedCapacity.toFixed(2)}
            </h2>

            <p className="text-[10px] text-white/30 mt-1">
              Consumed payout
            </p>

          </div>

          {/* REMAINING */}
          <div className="
            rounded-2xl
            border
            border-green-500/10
            bg-green-500/5
            p-5
          ">

            <p className="text-white/40 text-xs uppercase mb-2">
              Remaining
            </p>

            <h2 className="
              text-2xl
              font-black
              text-green-400
            ">
              {remainingCapacity.toFixed(2)}
            </h2>

            <p className="text-[10px] text-white/30 mt-1">
              Remaining mining rights
            </p>

          </div>

        </div>

        {/* ROI PROGRESS */}
        <div className="mt-8">

          <div className="flex items-center justify-between mb-2">

            <div className="
              flex
              items-center
              gap-2
              text-white/50
              text-xs
              uppercase
            ">
              <TrendingUp size={14} />
              ROI Progress
            </div>

            <span className="
              text-white
              text-xs
              font-bold
            ">
              {roiProgress.toFixed(0)}%
            </span>

          </div>

          <div className="
            w-full
            h-4
            bg-white/10
            rounded-full
            overflow-hidden
          ">

            <motion.div
              animate={{
                width: `${roiProgress}%`,
              }}
              transition={{
                duration: 1.2,
              }}
              className="
                h-full
                bg-gradient-to-r
                from-green-400
                via-yellow-400
                to-red-500
              "
            />

          </div>

          <div className="
            mt-3
            flex
            justify-between
            text-[10px]
            text-white/30
          ">
            <span>0%</span>
            <span>Mining Exhaustion</span>
            <span>100%</span>
          </div>

        </div>

        {/* STATUS PANEL */}
        <div
          className={`
            mt-8
            rounded-2xl
            border
            p-5
            ${
              willMine
                ? "border-green-500/20 bg-green-500/5"
                : "border-red-500/20 bg-red-500/5"
            }
          `}
        >

          <div className="
            flex
            items-center
            justify-between
          ">

            <div>

              <h3
                className={`
                  text-sm
                  font-black
                  ${
                    willMine
                      ? "text-green-400"
                      : "text-red-400"
                  }
                `}
              >
                {willMine
                  ? "🟢 Mining Active"
                  : "🔴 Mining Paused"}
              </h3>

              <p className="text-[11px] text-white/40 mt-1">

                {willMine
                  ? "Capacity available for reward accumulation."
                  : "Recharge ecGas to unlock more mining capacity."
                }

              </p>

            </div>

          </div>

        </div>

      </div>

    </motion.div>
  );
}