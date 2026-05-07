"use client";

import { motion } from "framer-motion";

import {
  TimerReset,
  Clock3,
  CalendarDays,
  Activity
} from "lucide-react";

type Props = {
  usdtPerSecond: number;
  usdtPerMinute: number;
  usdtPerHour: number;
  usdtPerDay: number;
};

export default function RewardVelocityPanel({
  usdtPerSecond,
  usdtPerMinute,
  usdtPerHour,
  usdtPerDay,
}: Props) {

  const items = [
    {
      label: "/ SEC",
      value: usdtPerSecond,
      icon: Activity,
    },
    {
      label: "/ MIN",
      value: usdtPerMinute,
      icon: TimerReset,
    },
    {
      label: "/ HOUR",
      value: usdtPerHour,
      icon: Clock3,
    },
    {
      label: "/ DAY",
      value: usdtPerDay,
      icon: CalendarDays,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

      {items.map((item, index) => {

        const Icon = item.icon;

        return (
          <motion.div
            key={index}
            animate={{
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="
              relative
              overflow-hidden
              rounded-3xl
              border
              border-[#D4AF37]/20
              bg-white/5
              backdrop-blur-xl
              p-5
            "
          >

            <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent" />

            <div className="relative z-10">

              <div className="flex items-center justify-between mb-4">

                <div className="
                  w-12
                  h-12
                  rounded-2xl
                  bg-[#D4AF37]/10
                  flex
                  items-center
                  justify-center
                ">
                  <Icon
                    size={20}
                    className="text-[#D4AF37]"
                  />
                </div>

                <div className="
                  w-2
                  h-2
                  rounded-full
                  bg-green-400
                  animate-pulse
                " />

              </div>

              <div className="space-y-1">

                <p className="
                  text-[10px]
                  uppercase
                  tracking-[0.3em]
                  text-white/40
                  font-bold
                ">
                  {item.label}
                </p>

                <motion.h2
                  animate={{
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                  className="
                    text-xl
                    lg:text-2xl
                    font-black
                    text-green-400
                  "
                >
                  +{item.value.toFixed(8)}
                </motion.h2>

                <p className="text-[10px] text-white/30">
                  USDT STREAM
                </p>

              </div>

            </div>

          </motion.div>
        );

      })}

    </div>
  );

}