"use client";

import React from "react";

export interface BonusCardProps {
  title: string;
  percent: string;
  levels: string;
  items: string[];
  color?: string;
  badgeText?: string;
}

export default function BonusCard({
  title,
  percent,
  levels,
  items,
  color = "from-[#D4AF37]/20 via-[#111] to-[#0a0a0a]",
  badgeText = "On-Chain",
}: BonusCardProps) {
  return (
    <div
      className={`p-6 rounded-2xl bg-gradient-to-br ${color} border border-[#D4AF37]/30 shadow-2xl relative overflow-hidden flex flex-col justify-between`}
    >
      <div>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-black text-white tracking-wide font-mono">
            {title}
          </h2>
          <span className="text-[10px] uppercase font-bold font-mono px-2 py-0.5 rounded bg-white/10 text-[#D4AF37] border border-[#D4AF37]/30">
            {badgeText}
          </span>
        </div>

        <p className="text-[#D4AF37] text-sm font-bold font-mono">
          {percent} total — {levels}
        </p>

        <ul className="mt-4 text-xs text-white/80 space-y-2 font-sans">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-[#D4AF37] font-bold">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}