"use client";

import React from "react";

export interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  color?: "green" | "blue" | "gold" | "purple";
}

export default function StatCard({
  label,
  value,
  icon: Icon,
  color = "gold",
}: StatCardProps) {
  const colorMap = {
    green: {
      text: "text-emerald-400",
      bgGlow: "from-emerald-500/10",
      iconBg: "from-emerald-500/20 to-emerald-500/5 border-emerald-500/20",
      hoverBorder: "hover:border-emerald-500/40",
      shadow: "hover:shadow-[0_15px_40px_rgba(16,185,129,0.15)]",
    },
    blue: {
      text: "text-cyan-400",
      bgGlow: "from-cyan-500/10",
      iconBg: "from-cyan-500/20 to-cyan-500/5 border-cyan-500/20",
      hoverBorder: "hover:border-cyan-500/40",
      shadow: "hover:shadow-[0_15px_40px_rgba(6,182,212,0.15)]",
    },
    gold: {
      text: "text-[#D4AF37]",
      bgGlow: "from-[#D4AF37]/10",
      iconBg: "from-[#D4AF37]/20 to-[#D4AF37]/5 border-[#D4AF37]/20",
      hoverBorder: "hover:border-[#D4AF37]/40",
      shadow: "hover:shadow-[0_15px_40px_rgba(212,175,55,0.15)]",
    },
    purple: {
      text: "text-fuchsia-400",
      bgGlow: "from-fuchsia-500/10",
      iconBg: "from-fuchsia-500/20 to-fuchsia-500/5 border-fuchsia-500/20",
      hoverBorder: "hover:border-fuchsia-500/40",
      shadow: "hover:shadow-[0_15px_40px_rgba(217,70,239,0.15)]",
    },
  };

  const currentTheme = colorMap[color];

  return (
    <div
      className={`
        relative overflow-hidden rounded-3xl border border-white/10 
        bg-[#09090b]/60 backdrop-blur-xl p-6 w-full min-h-[195px] 
        transition-all duration-300 hover:-translate-y-1.5 hover:bg-white/[0.04]
        ${currentTheme.hoverBorder} ${currentTheme.shadow}
      `}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${currentTheme.bgGlow} via-transparent to-transparent pointer-events-none`}
      />

      <div className="relative z-10 h-full flex flex-col justify-between">
        <div className="flex items-center justify-between mb-6">
          <div
            className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${currentTheme.iconBg} flex items-center justify-center border`}
          >
            <Icon size={24} className={currentTheme.text} />
          </div>

          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </div>
        </div>

        <div className="mt-auto">
          <p className="text-[20px] uppercase tracking-[0.25em] text-white/40 font-bold mb-2">
            {label}
          </p>
          <h2
            className={`text-2xl md:text-3xl font-black tracking-tight font-mono break-words leading-none ${currentTheme.text}`}
          >
            {value}
          </h2>
        </div>
      </div>
    </div>
  );
}