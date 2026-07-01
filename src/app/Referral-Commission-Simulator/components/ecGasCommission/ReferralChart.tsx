"use client";

import React from "react";
import { motion } from "framer-motion";
import { PieChart, Crown, Award, Users } from "lucide-react";

interface ReferralChartProps {
  purchase: number;
  pool: number;
  l1: number;
  l2: number;
  l3: number;
}

export default function ReferralChart({
  purchase,
  pool,
  l1,
  l2,
  l3,
}: ReferralChartProps) {
  // ======================================================
  // DONUT CHART CALCULATIONS
  // ======================================================
  const radius = 90;
  const stroke = 18;
  const circumference = 2 * Math.PI * radius;

  const l1Percent = 70;
  const l2Percent = 20;
  const l3Percent = 10;

  const l1Length = (l1Percent / 100) * circumference;
  const l2Length = (l2Percent / 100) * circumference;
  const l3Length = (l3Percent / 100) * circumference;

  const gap = 6;
  const offset1 = 0;
  const offset2 = -(l1Length + gap);
  const offset3 = -(l1Length + l2Length + gap * 2);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      className="rounded-[32px] border border-white/10 bg-[#101012] overflow-hidden shadow-2xl max-w-6xl mx-auto w-full"
    >
      {/* Header */}
      <div className="border-b border-white/5 p-8">
        <div className="flex items-center gap-3">
          <PieChart className="text-[#D4AF37]" size={24} />
          <div>
            <h2 className="text-2xl font-black text-white">Referral Distribution</h2>
            <p className="text-white/45 text-sm mt-1">
              Visualização da distribuição das comissões do Smart Contract.
            </p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-8 space-y-10">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 items-center">
          
          {/* DONUT GRAPHICS */}
          <div className="flex justify-center items-center">
            <div className="relative w-[260px] h-[260px]">
              <svg width="260" height="260" viewBox="0 0 260 260">
                <g transform="translate(130 130)">
                  {/* Background Track */}
                  <circle
                    r={radius}
                    fill="transparent"
                    stroke="#262626"
                    strokeWidth={stroke}
                  />

                  {/* L1 Ring */}
                  <motion.circle
                    initial={{ strokeDasharray: `0 ${circumference}` }}
                    whileInView={{ strokeDasharray: `${l1Length} ${circumference}` }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                    r={radius}
                    fill="transparent"
                    stroke="#D4AF37"
                    strokeWidth={stroke}
                    strokeDashoffset={offset1}
                    transform="rotate(-90)"
                    strokeLinecap="round"
                  />

                  {/* L2 Ring */}
                  <motion.circle
                    initial={{ strokeDasharray: `0 ${circumference}` }}
                    whileInView={{ strokeDasharray: `${l2Length} ${circumference}` }}
                    transition={{ duration: 1.2 }}
                    viewport={{ once: true }}
                    r={radius}
                    fill="transparent"
                    stroke="#06B6D4"
                    strokeWidth={stroke}
                    strokeDashoffset={offset2}
                    transform="rotate(-90)"
                    strokeLinecap="round"
                  />

                  {/* L3 Ring */}
                  <motion.circle
                    initial={{ strokeDasharray: `0 ${circumference}` }}
                    whileInView={{ strokeDasharray: `${l3Length} ${circumference}` }}
                    transition={{ duration: 1.4 }}
                    viewport={{ once: true }}
                    r={radius}
                    fill="transparent"
                    stroke="#10B981"
                    strokeWidth={stroke}
                    strokeDashoffset={offset3}
                    transform="rotate(-90)"
                    strokeLinecap="round"
                  />
                </g>
              </svg>

              {/* Center Info Label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="uppercase text-[10px] tracking-[0.25em] text-white/40 font-bold">
                  Referral Pool
                </span>
                <h2 className="text-4xl font-black text-[#D4AF37] mt-1">
                  {pool.toFixed(2)}
                </h2>
                <span className="text-white/40 text-xs mt-0.5 font-medium">USD</span>
              </div>
            </div>
          </div>

          {/* LEVEL METRICS PANELS */}
          <div className="space-y-4">
            {/* L1 Level Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, duration: 0.45 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-[#D4AF37]/20 bg-[#D4AF37]/5 p-5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/15 flex items-center justify-center">
                    <Crown className="text-[#D4AF37]" size={24} />
                  </div>
                  <div>
                    <h3 className="font-black text-white">Líder Nível 1</h3>
                    <p className="text-xs text-white/45">70% do Referral Pool</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-[#D4AF37]">{l1.toFixed(2)}</div>
                  <div className="text-xs text-white/45">USD</div>
                </div>
              </div>
              <div className="mt-4 h-2 rounded-full bg-white/5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "70%" }}
                  transition={{ duration: 1 }}
                  viewport={{ once: true }}
                  className="h-full rounded-full bg-[#D4AF37]"
                />
              </div>
            </motion.div>

            {/* L2 Level Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25, duration: 0.45 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/15 flex items-center justify-center">
                    <Award className="text-cyan-400" size={24} />
                  </div>
                  <div>
                    <h3 className="font-black text-white">Líder Nível 2</h3>
                    <p className="text-xs text-white/45">20% do Referral Pool</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-cyan-400">{l2.toFixed(2)}</div>
                  <div className="text-xs text-white/45">USD</div>
                </div>
              </div>
              <div className="mt-4 h-2 rounded-full bg-white/5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "20%" }}
                  transition={{ duration: 1 }}
                  viewport={{ once: true }}
                  className="h-full rounded-full bg-cyan-400"
                />
              </div>
            </motion.div>

            {/* L3 Level Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35, duration: 0.45 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/15 flex items-center justify-center">
                    <Users className="text-emerald-400" size={24} />
                  </div>
                  <div>
                    <h3 className="font-black text-white">Líder Nível 3</h3>
                    <p className="text-xs text-white/45">10% do Referral Pool</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-emerald-400">{l3.toFixed(2)}</div>
                  <div className="text-xs text-white/45">USD</div>
                </div>
              </div>
              <div className="mt-4 h-2 rounded-full bg-white/5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "10%" }}
                  transition={{ duration: 1 }}
                  viewport={{ once: true }}
                  className="h-full rounded-full bg-emerald-400"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* DISTRIBUTION LEGEND BLOCK */}
        <div className="rounded-2xl border border-white/10 bg-black/20 p-6">
          <h3 className="font-black text-base text-white mb-4">Legenda da Distribuição</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#D4AF37]" />
                <span className="text-slate-300">Líder Nível 1</span>
              </div>
              <span className="font-black text-[#D4AF37]">70%</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-cyan-400" />
                <span className="text-slate-300">Líder Nível 2</span>
              </div>
              <span className="font-black text-cyan-400">20%</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="text-slate-300">Líder Nível 3</span>
              </div>
              <span className="font-black text-emerald-400">10%</span>
            </div>
          </div>
        </div>

        {/* GLOBAL SIMULATION SUMMARY FOOTER */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="rounded-[24px] border border-[#D4AF37]/15 bg-gradient-to-br from-[#D4AF37]/5 via-black/40 to-transparent p-6 space-y-6"
        >
          <div className="flex items-center gap-2">
            <PieChart className="text-[#D4AF37]" size={20} />
            <h3 className="text-lg font-black text-white">Resumo da Simulação</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-xl bg-black/40 border border-white/5 p-5">
              <p className="uppercase text-[10px] tracking-wider text-white/40 font-bold">Compra ecGas</p>
              <h4 className="mt-2 text-2xl font-black text-white">{purchase.toLocaleString()}</h4>
              <span className="text-white/30 text-xs">USD</span>
            </div>
            <div className="rounded-xl bg-black/40 border border-[#D4AF37]/20 p-5">
              <p className="uppercase text-[10px] tracking-wider text-white/40 font-bold">Referral Pool</p>
              <h4 className="mt-2 text-2xl font-black text-[#D4AF37]">{pool.toFixed(2)}</h4>
              <span className="text-white/30 text-xs">USD</span>
            </div>
            <div className="rounded-xl bg-black/40 border border-emerald-500/20 p-5">
              <p className="uppercase text-[10px] tracking-wider text-white/40 font-bold">Total Distribuído</p>
              <h4 className="mt-2 text-2xl font-black text-emerald-400">{(l1 + l2 + l3).toFixed(2)}</h4>
              <span className="text-white/30 text-xs">USD</span>
            </div>
          </div>

          <div className="rounded-xl border border-[#D4AF37]/15 bg-[#D4AF37]/5 p-4">
            <p className="text-xs leading-relaxed text-white/70 font-sans">
              O Smart Contract reserva <span className="font-bold text-[#D4AF37]">20%</span> de cada compra de ecGas para o programa de Referral. Esse montante é automaticamente distribuído da seguinte forma: <span className="font-bold text-[#D4AF37]">70%</span> para o Líder Nível 1, <span className="font-bold text-cyan-400">20%</span> para o Líder Nível 2 e <span className="font-bold text-emerald-400">10%</span> para o Líder Nível 3.
            </p>
          </div>
        </motion.div>

      </div>
    </motion.section>
  );
}