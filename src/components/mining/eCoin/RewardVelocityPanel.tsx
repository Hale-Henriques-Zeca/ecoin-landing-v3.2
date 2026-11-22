"use client";

import { motion } from "framer-motion";
import {
  TimerReset,
  Clock3,
  CalendarDays,
  Activity,
} from "lucide-react";

type Props = {
  pendingECoin?: number;
  ecoinPerSecond?: number;
  ecoinPerMinute?: number;
  ecoinPerHour?: number;
  ecoinPerDay?: number;
  isMiningActive?: boolean;
};

export default function RewardVelocityPanel({
  ecoinPerSecond = 0,
  ecoinPerMinute = 0,
  ecoinPerHour = 0,
  ecoinPerDay = 0,
  isMiningActive,
}: Props) {
  const active =
    isMiningActive !== undefined ? isMiningActive : ecoinPerSecond > 0 || ecoinPerHour > 0;

  const items = [
    {
      label: "/ SEGUNDO",
      value: ecoinPerSecond,
      icon: Activity,
    },
    {
      label: "/ MINUTO",
      value: ecoinPerMinute,
      icon: TimerReset,
    },
    {
      label: "/ HORA",
      value: ecoinPerHour,
      icon: Clock3,
    },
    {
      label: "/ DIA (24H)",
      value: ecoinPerDay,
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
            animate={active ? { scale: [1, 1.015, 1] } : undefined}
            transition={{
              duration: 2.5,
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
                <div
                  className="
                    w-12
                    h-12
                    rounded-2xl
                    bg-[#D4AF37]/10
                    flex
                    items-center
                    justify-center
                  "
                >
                  <Icon size={20} className="text-[#D4AF37]" />
                </div>

                <div
                  className={`w-2 h-2 rounded-full ${
                    active ? "bg-emerald-400 animate-pulse" : "bg-amber-400/50"
                  }`}
                  title={active ? "Mineração Ativa" : "Mineração Pausada"}
                />
              </div>

              <div className="space-y-1">
                <p
                  className="
                    text-[10px]
                    uppercase
                    tracking-[0.25em]
                    text-white/40
                    font-bold
                  "
                >
                  {item.label}
                </p>

                <motion.h2
                  animate={active ? { opacity: [0.85, 1, 0.85] } : undefined}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                  }}
                  className={`
                    text-xl
                    lg:text-2xl
                    font-black
                    font-mono
                    break-all
                    ${active ? "text-emerald-400" : "text-white/40"}
                  `}
                >
                  +{item.value.toFixed(8)}{" "}
                  <span className="text-xs font-bold text-[#D4AF37]">eCoin</span>
                </motion.h2>

                <p className="text-[10px] text-white/30 font-mono">
                  {active
                    ? "TAXA ON-CHAIN (rewardRates)"
                    : "AGUARDANDO GÁS ATIVO"}
                </p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}