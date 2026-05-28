"use client";

import { motion } from "framer-motion";

import {
  Calendar,
  CalendarDays,
  CalendarRange,
  TrendingUp,
} from "lucide-react";

import { useEffect, useState } from "react";

type Props = {
  pendingUSDT: number;
};

export default function ProjectedRewardsPanel({
  pendingUSDT,
}: Props) {

  const [live24h, setLive24h] =
    useState(0);

  const [live7d, setLive7d] =
    useState(0);

  const [live30d, setLive30d] =
    useState(0);

  useEffect(() => {

    // 🔥 mesma lógica do velocity
    const perSecond =
      pendingUSDT * 0.0002;

    const perHour =
      perSecond * 60 * 60;

    const next24h =
      perHour * 24;

    const next7d =
      next24h * 7;

    const next30d =
      next24h * 30;

    setLive24h(next24h);
    setLive7d(next7d);
    setLive30d(next30d);

    const t = setInterval(() => {

      setLive24h(v =>
        v + (next24h * 0.0005)
      );

      setLive7d(v =>
        v + (next7d * 0.0005)
      );

      setLive30d(v =>
        v + (next30d * 0.0005)
      );

    }, 1000);

    return () => clearInterval(t);

  }, [pendingUSDT]);

  const items = [
    {
      label: "24 HOURS",
      value: live24h,
      icon: Calendar,
    },
    {
      label: "7 DAYS",
      value: live7d,
      icon: CalendarDays,
    },
    {
      label: "30 DAYS",
      value: live30d,
      icon: CalendarRange,
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

      {items.map((item, index) => {

        const Icon = item.icon;

        const growth =
          item.value > 0;

        return (
          <motion.div
            key={index}
            whileHover={{
              scale: 1.02,
            }}
            animate={{
              y: [0, -3, 0],
            }}
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

            {/* glow */}
            <div className="
              absolute
              inset-0
              bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.08),transparent_70%)]
            " />

            <div className="relative z-10">

              <div className="flex items-center justify-between mb-5">

                <div className="
                  w-14
                  h-14
                  rounded-2xl
                  bg-emerald-500/10
                  flex
                  items-center
                  justify-center
                  border
                  border-emerald-500/20
                ">
                  <Icon
                    size={22}
                    className="text-emerald-400"
                  />
                </div>

                <TrendingUp
                  size={18}
                  className={`
                    ${growth
                      ? "text-green-400"
                      : "text-white/20"}
                  `}
                />

              </div>

              <p className="
                text-[10px]
                uppercase
                tracking-[0.35em]
                text-white/40
                font-black
                mb-3
              ">
                {item.label}
              </p>

              <motion.h2
                animate={{
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="
                  text-4xl
                  font-black
                  text-emerald-400
                  leading-none
                "
              >
                {item.value.toFixed(4)}
              </motion.h2>

              <p className="
                text-xs
                text-white/40
                mt-2
              ">
                PROJECTED LIVE STREAM
              </p>

              {/* progress line */}
              <div className="
                mt-5
                h-1
                rounded-full
                bg-white/5
                overflow-hidden
              ">
                <motion.div
                  animate={{
                    width: growth
                      ? ["0%", "100%"]
                      : "0%",
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

              <div className="
                mt-5
                pt-4
                border-t
                border-white/10
              ">
                <div className="flex justify-between text-xs">

                  <span className="text-white/40">
                    STREAM VALUE
                  </span>

                  <span className="
                    text-[#D4AF37]
                    font-black
                    text-sm
                  ">
                    {item.value.toFixed(4)}
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