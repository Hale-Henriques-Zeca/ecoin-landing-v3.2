"use client";

import { motion } from "framer-motion";

import {
  BatteryCharging,
  ShieldCheck,
  Activity,
  AlertTriangle,
} from "lucide-react";

type Props = {
  remainingCapacity: number;
  usedCapacity: number;
  maxCapacity: number;
  willMine: boolean;
};

export default function MiningPreviewPanel({
  remainingCapacity,
  usedCapacity,
  maxCapacity,
  willMine,
}: Props) {

  const usage =
    maxCapacity > 0
      ? (usedCapacity / maxCapacity) * 100
      : 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-[#D4AF37]/20
        bg-white/5
        backdrop-blur-xl
        p-6
      "
    >

      <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent" />

      <div className="relative z-10">

        <div className="flex items-center justify-between mb-6">

          <div className="flex items-center gap-3">

            <div className="
              w-12
              h-12
              rounded-2xl
              bg-[#D4AF37]/10
              flex
              items-center
              justify-center
            ">
              <BatteryCharging
                size={22}
                className="text-[#D4AF37]"
              />
            </div>

            <div>
              <h3 className="text-white font-bold">
                Mining Capacity
              </h3>

              <p className="text-xs text-white/40">
                Neural reward engine
              </p>
            </div>

          </div>

          {willMine ? (
            <ShieldCheck
              className="text-green-400"
            />
          ) : (
            <AlertTriangle
              className="text-red-400"
            />
          )}

        </div>

        <div className="space-y-4">

          <div>
            <div className="flex justify-between text-xs mb-2">
              <span className="text-white/40">
                Remaining Capacity
              </span>

              <span className="text-green-400 font-bold">
                {remainingCapacity.toFixed(2)}
              </span>
            </div>

            <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">

              <motion.div
                animate={{
                  width: `${100 - usage}%`,
                }}
                className="
                  h-full
                  bg-gradient-to-r
                  from-green-400
                  to-[#D4AF37]
                "
              />

            </div>

          </div>

          <div className="grid grid-cols-2 gap-4">

            <div className="
              rounded-2xl
              border
              border-white/10
              p-4
            ">
              <p className="text-xs text-white/40 mb-1">
                Used
              </p>

              <h2 className="text-xl font-black text-red-400">
                {usedCapacity.toFixed(2)}
              </h2>
            </div>

            <div className="
              rounded-2xl
              border
              border-white/10
              p-4
            ">
              <p className="text-xs text-white/40 mb-1">
                Max Capacity
              </p>

              <h2 className="text-xl font-black text-[#D4AF37]">
                {maxCapacity.toFixed(2)}
              </h2>
            </div>

          </div>

          <div
  className={`
    mt-4
    rounded-2xl
    border
    p-4
    text-center
    ${
      willMine
        ? "border-green-500/20 bg-green-500/5"
        : "border-red-500/20 bg-red-500/5"
    }
  `}
>

            <p
  className={`
    text-sm
    font-bold
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
            </p>

          </div>

        </div>

      </div>

    </motion.div>
  );
}