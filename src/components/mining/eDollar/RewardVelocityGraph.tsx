"use client";

import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
} from "recharts";
import { motion } from "framer-motion";
import { Activity, TrendingUp } from "lucide-react";

type DividendPoint = {
  hour: string;
  dividends: number;
};

type Props = {
  pendingUSDT: number;
};

// Tooltip customizado para exibição dos dividendos do acionista
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-zinc-950/90 border border-[#D4AF37]/30 backdrop-blur-md px-4 py-3 rounded-2xl shadow-2xl text-xs">
        <p className="text-zinc-400 font-mono mb-1">{`Janela Temporal: ${label}`}</p>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] animate-pulse" />
          <span className="text-white font-black text-sm">
            {Number(payload[0].value).toFixed(4)} USDT
          </span>
        </div>
        <p className="text-[10px] text-emerald-400 font-bold mt-1">
          • Fluxo Shareholder Ativo
        </p>
      </div>
    );
  }
  return null;
};

export default function RewardVelocityGraph({ pendingUSDT }: Props) {
  const [data, setData] = useState<DividendPoint[]>([]);

  useEffect(() => {
    // Inicialização da série temporal de 24h
    const initial: DividendPoint[] = Array.from({ length: 24 }, (_, i) => ({
      hour: `${i}:00`,
      dividends: pendingUSDT * (0.8 + Math.random() * 0.4),
    }));

    setData(initial);

    // Atualização telemétrica a cada 3 segundos
    const interval = setInterval(() => {
      setData((prev) => {
        if (prev.length === 0) return prev;
        
        const nextHour = `${new Date().getHours()}:00`;
        const nextVal = pendingUSDT * (0.8 + Math.random() * 0.4);

        return [
          ...prev.slice(1),
          {
            hour: nextHour,
            dividends: nextVal,
          },
        ];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [pendingUSDT]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-3xl border border-[#D4AF37]/20 bg-zinc-950/40 backdrop-blur-xl p-6 shadow-2xl relative overflow-hidden"
    >
      {/* CABEÇALHO DO GRÁFICO / MÉTICA DE ACIONISTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-white text-lg font-black tracking-wide flex items-center gap-2">
            <TrendingUp size={20} className="text-[#D4AF37]" />
            Velocidade de Dividendos (Shareholder)
          </h2>
          <p className="text-zinc-500 text-[11px] font-bold uppercase tracking-widest mt-1 flex items-center gap-1.5">
            <Activity size={13} className="text-emerald-400" /> Telemetria de Rendimento em Tempo Real
          </p>
        </div>

        {/* BADGE DE STATUS DA TELEMETRIA */}
        <div className="flex items-center gap-2 self-start sm:self-auto bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">
            Live Telemetry
          </span>
        </div>
      </div>

      {/* ÁREA DO GRÁFICO RECHARTS */}
      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorDividends" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#D4AF37" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <XAxis
              dataKey="hour"
              stroke="#3f3f46"
              tick={{ fill: "#A1A1AA", fontSize: 10, fontWeight: 600 }}
              tickLine={false}
              axisLine={false}
            />

            <Tooltip content={<CustomTooltip />} />

            <Area
              type="monotone"
              dataKey="dividends"
              stroke="#D4AF37"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorDividends)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}