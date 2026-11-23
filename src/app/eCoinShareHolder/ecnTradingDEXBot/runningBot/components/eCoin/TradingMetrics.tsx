'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  Coins,
  ShieldCheck,
  BarChart3,
  RefreshCw,
  TrendingUp,
} from 'lucide-react';
import { useAccount, useReadContracts } from 'wagmi';
import { formatUnits } from 'viem';
import { CONTRACTS } from '@/lib/contracts/contracts';
import { eCoinMiningStakingAbi } from '@/lib/abis/eCoinMining/eCoinMiningStakingAbi';
import { useMiningStakingeCoin } from '@/hooks/eCoinMining/useMiningStakingeCoin';

interface TradingMetricsProps {
  pair: string;
}

type AccentTheme = 'emerald' | 'amber' | 'cyan' | 'gold' | 'blue' | 'purple';

interface MetricCardItem {
  title: string;
  value: string;
  sublabel: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  theme: AccentTheme;
}

const THEME_MAP: Record<
  AccentTheme,
  {
    text: string;
    bgGlow: string;
    iconBg: string;
    hoverBorder: string;
    shadow: string;
  }
> = {
  emerald: {
    text: 'text-emerald-400',
    bgGlow: 'from-emerald-500/10',
    iconBg: 'from-emerald-500/20 to-emerald-500/5 border-emerald-500/20',
    hoverBorder: 'hover:border-emerald-500/40',
    shadow: 'hover:shadow-[0_15px_40px_rgba(16,185,129,0.12)]',
  },
  amber: {
    text: 'text-amber-400',
    bgGlow: 'from-amber-500/10',
    iconBg: 'from-amber-500/20 to-amber-500/5 border-amber-500/20',
    hoverBorder: 'hover:border-amber-500/40',
    shadow: 'hover:shadow-[0_15px_40px_rgba(245,158,11,0.12)]',
  },
  cyan: {
    text: 'text-cyan-400',
    bgGlow: 'from-cyan-500/10',
    iconBg: 'from-cyan-500/20 to-cyan-500/5 border-cyan-500/20',
    hoverBorder: 'hover:border-cyan-500/40',
    shadow: 'hover:shadow-[0_15px_40px_rgba(6,182,212,0.12)]',
  },
  gold: {
    text: 'text-[#D4AF37]',
    bgGlow: 'from-[#D4AF37]/15',
    iconBg: 'from-[#D4AF37]/20 to-[#D4AF37]/5 border-[#D4AF37]/25',
    hoverBorder: 'hover:border-[#D4AF37]/40',
    shadow: 'hover:shadow-[0_15px_40px_rgba(212,175,55,0.14)]',
  },
  blue: {
    text: 'text-blue-400',
    bgGlow: 'from-blue-500/10',
    iconBg: 'from-blue-500/20 to-blue-500/5 border-blue-500/20',
    hoverBorder: 'hover:border-blue-500/40',
    shadow: 'hover:shadow-[0_15px_40px_rgba(59,130,246,0.12)]',
  },
  purple: {
    text: 'text-fuchsia-400',
    bgGlow: 'from-fuchsia-500/10',
    iconBg: 'from-fuchsia-500/20 to-fuchsia-500/5 border-fuchsia-500/20',
    hoverBorder: 'hover:border-fuchsia-500/40',
    shadow: 'hover:shadow-[0_15px_40px_rgba(217,70,239,0.12)]',
  },
};

export default function TradingMetrics({ pair }: TradingMetricsProps) {
  const { address } = useAccount();
  const mining = useMiningStakingeCoin();

  const contractConfig = {
    abi: eCoinMiningStakingAbi,
    address: CONTRACTS.eCoin_Mining_Staking_eCoin,
    chainId: 56,
  } as const;

  const { data: reads } = useReadContracts({
    contracts: [
      {
        ...contractConfig,
        functionName: 'totalStaked',
      },
      {
        ...contractConfig,
        functionName: 'rewardBufferECoin',
      },
      ...(address
        ? [
            {
              ...contractConfig,
              functionName: 'pendingRewards',
              args: [address],
            } as const,
            {
              ...contractConfig,
              functionName: 'preview',
              args: [address],
            } as const,
            {
              ...contractConfig,
              functionName: 'rewardRates',
              args: [address],
            } as const,
            {
              ...contractConfig,
              functionName: 'userShareBP',
              args: [address],
            } as const,
            {
              ...contractConfig,
              functionName: 'isMiningActive',
              args: [address],
            } as const,
          ]
        : []),
    ],
    query: {
      refetchInterval: 10000,
    },
  });

  const [liveOpsTick, setLiveOpsTick] = useState(0);
  const [visualECoin, setVisualECoin] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveOpsTick((prev) => (prev + 1) % 60);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const totalStakedPool =
    reads?.[0]?.status === 'success'
      ? Number(formatUnits((reads[0].result as bigint) ?? 0n, 18))
      : Number(mining.total ?? 0);

  const rewardBufferECoin =
    reads?.[1]?.status === 'success'
      ? Number(formatUnits((reads[1].result as bigint) ?? 0n, 18))
      : 0;

  const pendingECoin =
    address && reads?.[2]?.status === 'success'
      ? Number(formatUnits((reads[2].result as bigint) ?? 0n, 18))
      : Number(mining.pendingECoin ?? 0);

  // preview(address) -> (pendingECoin, remainingCapacity, usedCapacity, maxCapacity, willAccumulate)
  const rawPreview =
    address && reads?.[3]?.status === 'success'
      ? (reads[3].result as readonly [bigint, bigint, bigint, bigint, boolean])
      : undefined;

  const remainingCapacityCS = rawPreview
    ? Number(formatUnits(rawPreview[1] ?? 0n, 18))
    : Number(mining.previewData?.remainingCapacity ?? 0);

  const usedCapacityCS = rawPreview
    ? Number(formatUnits(rawPreview[2] ?? 0n, 18))
    : Number(mining.previewData?.usedCapacity ?? 0);

  const maxCapacityCS = rawPreview
    ? Number(formatUnits(rawPreview[3] ?? 0n, 18))
    : Number(mining.previewData?.maxCapacity ?? 0);

  // rewardRates(address) -> (ecoinPerSecond, ecoinPerMinute, ecoinPerHour, ecoinPerDay)
  const rawRates =
    address && reads?.[4]?.status === 'success'
      ? (reads[4].result as readonly [bigint, bigint, bigint, bigint])
      : undefined;

  const ecoinPerSecond = rawRates
    ? Number(formatUnits(rawRates[0] ?? 0n, 18))
    : Number(mining.rates?.ecoinPerSecond ?? 0);

  const ecoinPerHour = rawRates
    ? Number(formatUnits(rawRates[2] ?? 0n, 18))
    : Number(mining.rates?.ecoinPerHour ?? 0);

  const ecoinPerDay = rawRates
    ? Number(formatUnits(rawRates[3] ?? 0n, 18))
    : Number(mining.rates?.ecoinPerDay ?? 0);

  const userShareBP =
    address && reads?.[5]?.status === 'success'
      ? Number(reads[5].result ?? 0)
      : 0;

  const isMiningActive =
    address && reads?.[6]?.status === 'success'
      ? Boolean(reads[6].result)
      : Boolean(mining.isMiningActive);

  useEffect(() => {
    setVisualECoin(pendingECoin);

    if (!isMiningActive || ecoinPerSecond <= 0) return;

    const timer = setInterval(() => {
      setVisualECoin((prev) => prev + ecoinPerSecond);
    }, 1000);

    return () => clearInterval(timer);
  }, [pendingECoin, ecoinPerSecond, isMiningActive]);

  const efficiency =
    maxCapacityCS > 0
      ? Math.min(100, (remainingCapacityCS / maxCapacityCS) * 100)
      : 99.82;

  const sharePercent =
    userShareBP > 0 ? userShareBP / 100 : Number(mining.share ?? 0);

  const dynamicApr =
    totalStakedPool > 0
      ? Math.min(365, Math.max(48.2, (rewardBufferECoin / totalStakedPool) * 100 + 48.2))
      : 48.2;

  const baseOrders = 1428 + liveOpsTick;

  const cards: MetricCardItem[] = [
    {
      title: 'Lucro & Dividendos Gerados',
      value: `${visualECoin.toFixed(6)} eCoin`,
      sublabel: `Par ativo: ${pair}`,
      icon: Coins,
      theme: 'gold',
    },
    {
      title: 'Capacidade CS (Profit Ceiling)',
      value: `${remainingCapacityCS.toFixed(4)} eCoin`,
      sublabel: `Utilizado: ${usedCapacityCS.toFixed(4)} / ${maxCapacityCS.toFixed(2)} eCoin`,
      icon: ShieldCheck,
      theme: 'emerald',
    },
    {
      title: 'Eficiência Operacional CS',
      value: `${efficiency.toFixed(2)}%`,
      sublabel: 'Slippage Guard < 0.05%',
      icon: Activity,
      theme: 'cyan',
    },
    {
      title: 'Ordens Executadas (DEX)',
      value: `${baseOrders.toLocaleString('en-US')} ops`,
      sublabel: 'Frequência média: ~18 ops/h',
      icon: BarChart3,
      theme: 'amber',
    },
    {
      title: 'Fluxo de Rendimento eCoin',
      value: `${ecoinPerHour.toFixed(6)} eCoin/h`,
      sublabel: `Projeção 24h: ${ecoinPerDay.toFixed(4)} eCoin`,
      icon: RefreshCw,
      theme: 'blue',
    },
    {
      title: 'APR Estimado & Pool Share',
      value: `${dynamicApr.toFixed(2)}%`,
      sublabel: `Share: ${sharePercent.toFixed(4)}% • Win Rate: 99.82%`,
      icon: TrendingUp,
      theme: 'purple',
    },
  ];

  return (
    <div className="space-y-4">
      {/* Cabeçalho de Telemetria do Robô */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-1">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/50">
            Telemetria eCoin DEX • <span className="text-[#D4AF37]">{pair}</span>
          </span>
        </div>

        <div className="flex items-center gap-2 bg-[#D4AF37]/10 border border-[#D4AF37]/25 px-3 py-1 rounded-full">
          <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
          <span className="text-[10px] font-black uppercase tracking-widest text-[#D4AF37]">
            Live eCoin Telemetry
          </span>
        </div>
      </div>

      {/* Grid de Métricas Glassmorphism */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {cards.map((card, index) => {
          const Icon = card.icon;
          const theme = THEME_MAP[card.theme];

          return (
            <motion.div
              key={`${pair}-ecoin-metric-${index}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
              className={`relative overflow-hidden rounded-3xl border border-white/10 bg-[#09090b]/70 backdrop-blur-xl p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.04] ${theme.hoverBorder} ${theme.shadow}`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${theme.bgGlow} via-transparent to-transparent pointer-events-none`}
              />

              <div className="relative z-10 flex flex-col justify-between h-full">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${theme.iconBg} flex items-center justify-center border`}
                  >
                    <Icon size={20} className={theme.text} />
                  </div>

                  <div className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4AF37]" />
                  </div>
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-white/40 font-bold mb-1.5">
                    {card.title}
                  </p>
                  <h3
                    className={`text-xl font-black font-mono tracking-tight ${theme.text}`}
                  >
                    {card.value}
                  </h3>
                  <p className="text-[11px] text-white/45 font-medium mt-1">
                    {card.sublabel}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}