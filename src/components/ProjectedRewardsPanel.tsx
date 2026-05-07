"use client";

import { motion } from "framer-motion";

import {
  Calendar,
  CalendarDays,
  CalendarRange,
  Coins,
} from "lucide-react";

type Props = {
  projected24hUSDT: number;
  projected7dUSDT: number;
  projected30dUSDT: number;

  totalProjected24h: number;
  totalProjected7d: number;
  totalProjected30d: number;
};

export default function ProjectedRewardsPanel({
  projected24hUSDT,
  projected7dUSDT,
  projected30dUSDT,

  totalProjected24h,
  totalProjected7d,
  totalProjected30d,
}: Props) {

  const items = [
    {
      label: "24 HOURS",
      value: projected24hUSDT,
      total: totalProjected24h,
      icon: Calendar,
    },
    {
      label: "7 DAYS",
      value: projected7dUSDT,
      total: totalProjected7d,
      icon: CalendarDays,
    },
    {
      label: "30 DAYS",
      value: projected30dUSDT,
      total: totalProjected30d,
      icon: CalendarRange,
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

      {items.map((item, index) => {

        const Icon = item.icon;

        return (
          <motion.div
            key={index}
            whileHover={{
              scale: 1.02,
            }}
            className="
              relative
              overflow-hidden
              rounded-3xl
              border
              border-emerald-500/20
              bg-white/5
              backdrop-blur-xl
              p-6
            "
          >

            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent" />

            <div className="relative z-10">

              <div className="flex items-center justify-between mb-5">

                <div className="
                  w-12
                  h-12
                  rounded-2xl
                  bg-emerald-500/10
                  flex
                  items-center
                  justify-center
                ">
                  <Icon
                    size={20}
                    className="text-emerald-400"
                  />
                </div>

                <Coins
                  size={18}
                  className="text-[#D4AF37]"
                />

              </div>

              <p className="
                text-[10px]
                uppercase
                tracking-[0.3em]
                text-white/40
                font-bold
                mb-2
              ">
                {item.label}
              </p>

              <h2 className="
                text-3xl
                font-black
                text-emerald-400
              ">
                {item.value.toFixed(2)}
              </h2>

              <p className="text-xs text-white/40 mt-1">
                projected USDT
              </p>

              <div className="
                mt-4
                pt-4
                border-t
                border-white/10
              ">
                <div className="flex justify-between text-xs">
                  <span className="text-white/40">
                    TOTAL VALUE
                  </span>

                  <span className="text-[#D4AF37] font-bold">
                    {item.total.toFixed(2)}
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