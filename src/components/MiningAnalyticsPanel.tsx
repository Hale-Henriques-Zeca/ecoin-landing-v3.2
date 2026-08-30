"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  Coins,
  ShieldCheck,
  Activity,
  RefreshCw,
  TrendingUp,
} from "lucide-react";

type Props = {
  totalRewards: number;
  totalGasUsed: number;
  efficiency: number;
  sessions: number;
  recycled: number;
  apr: number;
};

export default function MiningAnalyticsPanel({
  totalRewards,
  totalGasUsed,
  efficiency,
  sessions,
  recycled,
  apr,
}: Props) {
  const cards = [
    {
      title: "Total de Dividendos Gerados",
      value: `${totalRewards.toFixed(7)} USD`,
      icon: Coins,
      color: "text-emerald-400",
    },
    {
      title: "Capacidade CS Utilizada",
      value: `${totalGasUsed.toFixed(9)}`,
      icon: ShieldCheck,
      color: "text-amber-400",
    },
    {
      title: "Eficiência Operacional CS",
      value: `${efficiency.toFixed(2)}%`,
      icon: Activity,
      color: "text-cyan-400",
    },
    {
      title: "Ciclos de Distribuição",
      value: sessions,
      icon: BarChart3,
      color: "text-yellow-400",
    },
    {
      title: "Dividendos Reciclados (Overflow)",
      value: `${recycled.toFixed(7)} USD`,
      icon: RefreshCw,
      color: "text-blue-400",
    },
    {
      title: "APR de Dividendos Atual",
      value: `${apr.toFixed(2)}%`,
      icon: TrendingUp,
      color: "text-purple-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
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
              <div className="flex items-center justify-between mb-5">
                <div
                  className="
                    w-14
                    h-14
                    rounded-2xl
                    bg-white/5
                    flex
                    items-center
                    justify-center
                  "
                >
                  <Icon
                    size={24}
                    className={card.color}
                  />
                </div>

                <div className="
                  w-2
                  h-2
                  rounded-full
                  bg-emerald-400
                  animate-pulse
                " />
              </div>

              <p className="
                text-[10px]
                uppercase
                tracking-[0.25em]
                text-white/40
                font-bold
                mb-2
              ">
                {card.title}
              </p>

              <h2 className={`
                text-2xl
                font-black
                ${card.color}
              `}>
                {card.value}
              </h2>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}