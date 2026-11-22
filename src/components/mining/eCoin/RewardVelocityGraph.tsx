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
import { Activity, TrendingUp, PauseCircle } from "lucide-react";

type RewardPoint = {
  hour: string;
  ecoinRate: number;
  accumulated: number;
};

type Props = {
  pendingECoin?: number;
  ecoinPerSecond?: number;
  ecoinPerHour?: number;
  isMiningActive?: boolean;
};

// Tooltip customizado para exibição do fluxo de mineração em eCoin
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const point: RewardPoint = payload[0].payload;
    return (
      <div className="bg-zinc-950/90 border border-[#D4AF37]/30 backdrop-blur-md px-4 py-3 rounded-2xl shadow-2xl text-xs">
        <p className="text-zinc-400 font-mono mb-1">{`Janela Horária: ${label}`}</p>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] animate-pulse" />
          <span className="text-white font-black text-sm">
            {Number(point.ecoinRate).toFixed(6)} eCoin/h
          </span>
        </div>
        <p className="text-[11px] text-zinc-400 font-mono mt-1">
          Acumulado estimado: {Number(point.accumulated).toFixed(6)} eCoin
        </p>
        <p className="text-[10px] text-emerald-400 font-bold mt-1">
          • Stream de Mineração 1/24h 
        </p>
      </div>
    );
  }
  return null;
};

export default function RewardVelocityGraph({
  pendingECoin = 0,
  ecoinPerSecond = 0,
  ecoinPerHour = 0,
  isMiningActive = false,
}: Props) {
  const [data, setData] = useState<RewardPoint[]>([]);

  useEffect(() => {
    const currentHour = new Date().getHours();
    const baseHourly = isMiningActive ? ecoinPerHour : 0;

    // Inicialização da série temporal de 24h alinhada ao ritmo rewardBufferECoin / 24
    const initial: RewardPoint[] = Array.from({ length: 24 }, (_, i) => {
      const hourIndex = (currentHour - (23 - i) + 24) % 24;
      const progressiveAccumulated =
        pendingECoin + baseHourly * (i / 23);

      return {
        hour: `${hourIndex.toString().padStart(2, "0")}:00`,
        ecoinRate: baseHourly,
        accumulated: progressiveAccumulated,
      };
    });

    setData(initial);

    // Atualização telemétrica a cada 3 segundos usando a taxa real por segundo do contrato
    const interval = setInterval(() => {
      setData((prev) => {
        if (prev.length === 0) return prev;

        const now = new Date();
        const label = `${now.getHours().toString().padStart(2, "0")}:${now
          .getMinutes()
          .toString()
          .padStart(2, "0")}`;

        const lastAccumulated = prev[prev.length - 1].accumulated;
        const delta3s = isMiningActive ? ecoinPerSecond * 3 : 0;

        return [
          ...prev.slice(1),
          {
            hour: label,
            ecoinRate: isMiningActive ? ecoinPerHour : 0,
            accumulated: lastAccumulated + delta3s,
          },
        ];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [pendingECoin, ecoinPerSecond, ecoinPerHour, isMiningActive]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-3xl border border-[#D4AF37]/20 bg-zinc-950/40 backdrop-blur-xl p-6 shadow-2xl relative overflow-hidden"
    >
      {/* CABEÇALHO DO GRÁFICO / TELEMETRIA DE MINERAÇÃO */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-white text-lg font-black tracking-wide flex items-center gap-2">
            <TrendingUp size={20} className="text-[#D4AF37]" />
            Velocidade de Mineração (eCoin)
          </h2>
          <p className="text-zinc-500 text-[11px] font-bold uppercase tracking-widest mt-1 flex items-center gap-1.5">
            <Activity size={13} className="text-emerald-400" /> Ritmo de Emissão por Hora (`Mineração`)
          </p>
        </div>

        {/* BADGE DE STATUS DA TELEMETRIA */}
        {isMiningActive ? (
          <div className="flex items-center gap-2 self-start sm:self-auto bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">
              Live Telemetry • {ecoinPerHour.toFixed(4)} eCoin/h
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-2 self-start sm:self-auto bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-full">
            <PauseCircle size={13} className="text-amber-400" />
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">
              Mineração Pausada (Sem Gás)
            </span>
          </div>
        )}
      </div>

      {/* ÁREA DO GRÁFICO RECHARTS */}
      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorECoinRewards" x1="0" y1="0" x2="0" y2="1">
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
              dataKey="ecoinRate"
              stroke="#D4AF37"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorECoinRewards)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}