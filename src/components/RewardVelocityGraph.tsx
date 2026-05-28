"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
} from "recharts";

import {
  motion,
} from "framer-motion";

import {
  useEffect,
  useState,
} from "react";

type Props = {
  pendingUSDT: number;
};

export default function RewardVelocityGraph({
  pendingUSDT,
}: Props) {

  const [data, setData] =
    useState<any[]>([]);

  useEffect(() => {

    const initial = Array.from(
      { length: 24 },
      (_, i) => ({
        hour: `${i}:00`,
        rewards:
          pendingUSDT *
          (0.8 + Math.random() * 0.4),
      })
    );

    setData(initial);

    const interval = setInterval(() => {

      setData((prev) => {

        const next = [
          ...prev.slice(1),

          {
            hour:
              new Date()
                .getHours() + ":00",

            rewards:
              pendingUSDT *
              (0.8 + Math.random() * 0.4),
          },
        ];

        return next;
      });

    }, 3000);

    return () =>
      clearInterval(interval);

  }, [pendingUSDT]);

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

      <div className="mb-6">

        <h2 className="
          text-white
          text-xl
          font-black
        ">
          Reward Velocity
        </h2>

        <p className="
          text-white/40
          text-xs
          uppercase
          tracking-widest
          mt-1
        ">
          24H TELEMETRY STREAM
        </p>

      </div>

      <div className="h-[280px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <AreaChart data={data}>

            <defs>

              <linearGradient
                id="colorRewards"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >

                <stop
                  offset="5%"
                  stopColor="#00FF9C"
                  stopOpacity={0.8}
                />

                <stop
                  offset="95%"
                  stopColor="#00FF9C"
                  stopOpacity={0}
                />

              </linearGradient>

            </defs>

            <XAxis
              dataKey="hour"
              stroke="#666"
              tick={{
                fill: "#888",
                fontSize: 10,
              }}
            />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="rewards"
              stroke="#00FF9C"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorRewards)"
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

    </motion.div>
  );
}