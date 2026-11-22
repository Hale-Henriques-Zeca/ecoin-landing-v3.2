"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  CalendarDays,
  CalendarRange,
  TrendingUp,
} from "lucide-react";

type Props = {
  pendingECoin?: number;
  next24hECoin?: number;
  next7dECoin?: number;
  next30dECoin?: number;
};

export default function ProjectedRewardsPanel({
  pendingECoin = 0,
  next24hECoin = 0,
  next7dECoin = 0,
  next30dECoin = 0,
}: Props) {
  const items = [
    {
      label: "PRÓXIMAS 24 HORAS",
      value: next24hECoin,
      icon: Calendar,
    },
    {
      label: "PRÓXIMOS 7 DIAS",
      value: next7dECoin,
      icon: CalendarDays,
    },
    {
      label: "PRÓXIMOS 30 DIAS",
      value: next30dECoin,
      icon: CalendarRange,
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {items.map((item, index) => {
        const Icon = item.icon;
        const growth = item.value > 0;
        const totalWithPending = pendingECoin + item.value;

        return (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02 }}
            animate={growth ? { y: [0, -3, 0] } : undefined}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
            className="
              relative
              overflow-hidden
              rounded-3xl
              border
              border-emerald-500/20
              bg-gradient-to-br
              from-emerald-500/5
              to-black
              backdrop-blur-xl
              p-6
            "
          >
            {/* Glow */}
            <div
              className="
                absolute
                inset-0
                bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.08),transparent_70%)]
              "
            />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-5">
                <div
                  className="
                    w-14
                    h-14
                    rounded-2xl
                    bg-emerald-500/10
                    flex
                    items-center
                    justify-center
                    border
                    border-emerald-500/20
                  "
                >
                  <Icon size={22} className="text-emerald-400" />
                </div>

                <TrendingUp
                  size={18}
                  className={growth ? "text-emerald-400" : "text-white/20"}
                />
              </div>

              <p
                className="
                  text-[10px]
                  uppercase
                  tracking-[0.35em]
                  text-white/40
                  font-black
                  mb-3
                "
              >
                {item.label}
              </p>

              <motion.h2
                animate={growth ? { opacity: [0.8, 1, 0.8] } : undefined}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="
                  text-3xl
                  xl:text-4xl
                  font-black
                  font-mono
                  text-emerald-400
                  leading-none
                  break-all
                "
              >
                {item.value.toFixed(4)}{" "}
                <span className="text-sm font-bold text-white/70">eCoin</span>
              </motion.h2>

              <p className="text-xs text-white/40 mt-2 font-mono">
                {growth
                  ? "PROJEÇÃO ON-CHAIN (projectedRewards)"
                  : "MINERAÇÃO PAUSADA OU SEM GÁS ATIVO"}
              </p>

              {/* Progress line */}
              <div
                className="
                  mt-5
                  h-1
                  rounded-full
                  bg-white/5
                  overflow-hidden
                "
              >
                <motion.div
                  animate={{
                    width: growth ? ["0%", "100%"] : "0%",
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                  }}
                  className="
                    h-full
                    bg-gradient-to-r
                    from-emerald-400
                    to-[#D4AF37]
                  "
                />
              </div>

              <div
                className="
                  mt-5
                  pt-4
                  border-t
                  border-white/10
                "
              >
                <div className="flex justify-between items-center text-xs gap-2">
                  <span className="text-white/40 font-mono">
                    PENDENTE + PROJEÇÃO (eCoin)
                  </span>

                  <span
                    className="
                      text-[#D4AF37]
                      font-black
                      font-mono
                      text-sm
                    "
                  >
                    {totalWithPending.toFixed(4)} eCoin
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}