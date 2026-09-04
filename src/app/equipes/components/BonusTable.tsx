"use client";

import React from "react";

const referralData = [
  {
    level: "Nível 1 (L1)",
    Selos: "14.00%",
    trading: "15.00%",
    claimFee: "0.210%",
    sharePool: "70.0% do Pool Referral",
  },
  {
    level: "Nível 2 (L2)",
    Selos: "4.00%",
    trading: "3.00%",
    claimFee: "0.075%",
    sharePool: "15% - 25% do Pool Referral",
  },
  {
    level: "Nível 3 (L3)",
    Selos: "2.00%",
    trading: "2.00%",
    claimFee: "0.015%",
    sharePool: "5% - 10% do Pool Referral",
  },
];

export default function BonusTable() {
  return (
    <div className="w-full rounded-2xl bg-[#111] border border-[#333] p-6 shadow-xl text-gray-300">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-[#D4AF37] font-mono">
            Tabela Real de Bonificações On-Chain
          </h2>
          <p className="text-xs text-white/50">
            Valores calculados em Basis Points (BP) diretamente dos Smart Contracts executados.
          </p>
        </div>
        <span className="px-3 py-1 bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] font-mono rounded-full font-bold">
          3 Níveis Ativos
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="text-[#D4AF37] border-b border-[#333] text-xs font-mono uppercase tracking-wider">
              <th className="py-3 px-2">Nível</th>
              <th className="py-3 px-2">Venda de Selos & ecGas (20% Pool)</th>
              <th className="py-3 px-2">Trading Robot Profit (20% Pool)</th>
              <th className="py-3 px-2">Claim Fee (1% Taxa)</th>
              <th className="py-3 px-2">Cota do Pool</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-xs sm:text-sm">
            {referralData.map((row, idx) => (
              <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                <td className="py-3 px-2 font-bold text-white">{row.level}</td>
                <td className="py-3 px-2 text-emerald-400 font-mono font-bold">{row.Selos}</td>
                <td className="py-3 px-2 text-cyan-400 font-mono font-bold">{row.trading}</td>
                <td className="py-3 px-2 text-fuchsia-400 font-mono font-bold">{row.claimFee}</td>
                <td className="py-3 px-2 text-white/60 font-sans">{row.sharePool}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}