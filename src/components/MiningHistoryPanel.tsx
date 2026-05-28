"use client";

import { motion } from "framer-motion";
import {
  CalendarDays,
  Clock3,
  Fuel,
  Coins,
  CheckCircle2,
} from "lucide-react";

const sessions = [
  {
    id: 12,
    started: "12 May",
    ended: "18 May",
    gasUsed: 120,
    rewards: 182,
    roi: 152,
  },

  {
    id: 11,
    started: "05 May",
    ended: "11 May",
    gasUsed: 95,
    rewards: 140,
    roi: 147,
  },
];

export default function MiningHistoryPanel() {

  return (
    <div className="space-y-4">

      {sessions.map((session) => (

        <motion.div
          key={session.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
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

            <div className="flex items-center justify-between mb-6">

              <div>
                <h2 className="text-white font-black text-xl">
                  Session #{session.id}
                </h2>

                <p className="text-green-400 text-xs uppercase font-bold mt-1">
                  Completed
                </p>
              </div>

              <CheckCircle2
                className="text-green-400"
                size={24}
              />

            </div>

            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">

              <div>
                <p className="text-white/40 text-xs uppercase mb-2">
                  Started
                </p>

                <div className="flex items-center gap-2 text-white">
                  <CalendarDays size={16} />
                  {session.started}
                </div>
              </div>

              <div>
                <p className="text-white/40 text-xs uppercase mb-2">
                  Ended
                </p>

                <div className="flex items-center gap-2 text-white">
                  <Clock3 size={16} />
                  {session.ended}
                </div>
              </div>

              <div>
                <p className="text-white/40 text-xs uppercase mb-2">
                  Gas Used
                </p>

                <div className="flex items-center gap-2 text-red-400">
                  <Fuel size={16} />
                  {session.gasUsed}
                </div>
              </div>

              <div>
                <p className="text-white/40 text-xs uppercase mb-2">
                  Rewards
                </p>

                <div className="flex items-center gap-2 text-green-400">
                  <Coins size={16} />
                  {session.rewards} USDT
                </div>
              </div>

              <div>
                <p className="text-white/40 text-xs uppercase mb-2">
                  ROI
                </p>

                <div className="text-yellow-400 font-black">
                  {session.roi}%
                </div>
              </div>

            </div>

          </div>

        </motion.div>

      ))}

    </div>
  );
}