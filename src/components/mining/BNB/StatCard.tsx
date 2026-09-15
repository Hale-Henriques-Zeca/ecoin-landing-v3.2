"use client";

import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

export interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon | React.ComponentType<{ className?: string; size?: number }>;
  color?: "green" | "blue" | "gold" | "purple";
  subValue?: string;
}

export default function StatCard({
  label,
  value,
  icon: Icon,
  color = "gold",
  subValue,
}: StatCardProps) {
  const colorMap = {
    green: {
      text: "text-emerald-400",
      bgGlow: "from-emerald-500/10",
      iconBg: "from-emerald-500/20 to-emerald-500/5 border-emerald-500/20",
      hoverBorder: "hover:border-emerald-500/40",
      shadow: "hover:shadow-[0_15px_40px_rgba(16,185,129,0.15)]",
      dot: "bg-emerald-500",
      ping: "bg-emerald-400",
    },
    blue: {
      text: "text-cyan-400",
      bgGlow: "from-cyan-500/10",
      iconBg: "from-cyan-500/20 to-cyan-500/5 border-cyan-500/20",
      hoverBorder: "hover:border-cyan-500/40",
      shadow: "hover:shadow-[0_15px_40px_rgba(6,182,212,0.15)]",
      dot: "bg-cyan-500",
      ping: "bg-cyan-400",
    },
    gold: {
      text: "text-[#D4AF37]",
      bgGlow: "from-[#D4AF37]/10",
      iconBg: "from-[#D4AF37]/20 to-[#D4AF37]/5 border-[#D4AF37]/20",
      hoverBorder: "hover:border-[#D4AF37]/40",
      shadow: "hover:shadow-[0_15px_40px_rgba(212,175,55,0.15)]",
      dot: "bg-[#D4AF37]",
      ping: "bg-[#D4AF37]",
    },
    purple: {
      text: "text-fuchsia-400",
      bgGlow: "from-fuchsia-500/10",
      iconBg: "from-fuchsia-500/20 to-fuchsia-500/5 border-fuchsia-500/20",
      hoverBorder: "hover:border-fuchsia-500/40",
      shadow: "hover:shadow-[0_15px_40px_rgba(217,70,239,0.15)]",
      dot: "bg-fuchsia-500",
      ping: "bg-fuchsia-400",
    },
  };

  const currentTheme = colorMap[color] || colorMap.gold;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`
        relative overflow-hidden rounded-3xl border border-white/10 
        bg-[#09090b]/80 backdrop-blur-xl p-5 w-full min-h-[170px] 
        flex flex-col justify-between transition-all duration-300 hover:bg-white/[0.04]
        ${currentTheme.hoverBorder} ${currentTheme.shadow}
      `}
    >
      {/* Brilho sutil de fundo */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${currentTheme.bgGlow} via-transparent to-transparent pointer-events-none`}
      />

      {/* Topo do Card: Ícone e Indicador Pulsante Sincronizado */}
      <div className="relative z-10 flex items-center justify-between">
        <div
          className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${currentTheme.iconBg} flex items-center justify-center border shadow-inner`}
        >
          <Icon size={22} className={currentTheme.text} />
        </div>

        <div className="relative flex h-2 w-2">
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${currentTheme.ping}`}
          />
          <span
            className={`relative inline-flex rounded-full h-2 w-2 ${currentTheme.dot}`}
          />
        </div>
      </div>

      {/* Rótulo e Valor */}
      <div className="relative z-10 mt-4">
        <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white/50 mb-1 font-mono">
          {label}
        </p>
        <h2
          className={`text-xl sm:text-2xl md:text-3xl font-black tracking-tight font-mono break-words leading-none ${currentTheme.text}`}
        >
          {value}
        </h2>
        {subValue && (
          <p className="text-[10px] text-white/40 mt-1 font-sans">
            {subValue}
          </p>
        )}
      </div>
    </motion.div>
  );
}