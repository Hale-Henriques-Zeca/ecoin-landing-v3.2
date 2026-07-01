"use client";

import React from "react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  color?: "green" | "blue" | "gold" | "purple";
}

export default function StatCard({ label, value, icon: Icon, color = "gold" }: StatCardProps) {
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
    <div className={`relative overflow-hidden bg-[#0d0d0f] border border-white/5 rounded-2xl p-5 transition-all duration-300 ${currentTheme.hoverBorder} ${currentTheme.shadow} group`}>
      <div className={`absolute -right-4 -bottom-4 w-24 h-24 bg-gradient-to-br ${currentTheme.bgGlow} to-transparent rounded-full blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />
      
      <div className="flex items-center justify-between relative z-10">
        <div className="space-y-1">
          <span className="text-[11px] font-bold text-white/40 uppercase tracking-wider block">
            {label}
          </span>
          <h4 className={`text-xl font-black tracking-tight transition-all ${currentTheme.text}`}>
            {value}
          </h4>
        </div>
        
        <div className={`p-3 rounded-xl bg-gradient-to-br ${currentTheme.iconBg} border transition-transform duration-300 group-hover:scale-110`}>
          <Icon size={20} />
        </div>
      </div>
    </div>
  );
}