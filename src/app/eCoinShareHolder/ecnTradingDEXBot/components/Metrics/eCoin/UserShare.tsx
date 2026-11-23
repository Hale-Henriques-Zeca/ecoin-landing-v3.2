'use client';

import React from 'react';
import { PieChart, Share2, Sparkles } from 'lucide-react';
import { useAccount, useReadContract } from 'wagmi';

import { useMiningStakingeCoin } from '@/hooks/eCoinMining/useMiningStakingeCoin';
import { CONTRACTS } from '@/lib/contracts/contracts';
import { eCoinMiningStakingAbi } from '@/lib/abis/eCoinMining/eCoinMiningStakingAbi';

interface UserShareProps {
  pppShare?: number;
}

function getDonutSlicePath(
  cx: number,
  cy: number,
  rInner: number,
  rOuter: number,
  startAngle: number,
  endAngle: number
): string {
  const angleDiff = endAngle - startAngle;
  if (angleDiff <= 0) return '';

  const sweep = Math.min(angleDiff, 359.999);
  const effectiveEndAngle = startAngle + sweep;

  const startRad = ((startAngle - 90) * Math.PI) / 180;
  const endRad = ((effectiveEndAngle - 90) * Math.PI) / 180;

  const x1 = cx + rOuter * Math.cos(startRad);
  const y1 = cy + rOuter * Math.sin(startRad);
  const x2 = cx + rOuter * Math.cos(endRad);
  const y2 = cy + rOuter * Math.sin(endRad);

  const x3 = cx + rInner * Math.cos(endRad);
  const y3 = cy + rInner * Math.sin(endRad);
  const x4 = cx + rInner * Math.cos(startRad);
  const y4 = cy + rInner * Math.sin(startRad);

  const largeArcFlag = sweep > 180 ? 1 : 0;

  return [
    `M ${x1} ${y1}`,
    `A ${rOuter} ${rOuter} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
    `L ${x3} ${y3}`,
    `A ${rInner} ${rInner} 0 ${largeArcFlag} 0 ${x4} ${y4}`,
    'Z',
  ].join(' ');
}

export default function UserShare({ pppShare }: UserShareProps) {
  const { address } = useAccount();
  const mining = useMiningStakingeCoin();

  const { data: userShareBP } = useReadContract({
    abi: eCoinMiningStakingAbi,
    address: CONTRACTS.eCoin_Mining_Staking_eCoin,
    functionName: 'userShareBP',
    chainId: 56,
    args: address ? [address] : undefined,
    query: {
      enabled: Boolean(address),
      refetchInterval: 10000,
    },
  });

  const contractSharePercent =
    userShareBP !== undefined
      ? Number(userShareBP) / 100
      : Number(mining?.share ?? 0);

  // Participação real do usuário no Pool eCoin (PPP) %
  const actualPPP = pppShare ?? contractSharePercent;

  const hasShare = actualPPP > 0;
  const visualPPP = !hasShare
    ? 0
    : actualPPP >= 100
    ? 100
    : Math.max(Math.min(actualPPP, 80), 18);

  const userAngle = (visualPPP / 100) * 360;

  const midAngle = userAngle / 2;
  const midRad = ((midAngle - 90) * Math.PI) / 180;
  const offsetDistance = hasShare && actualPPP < 100 ? 14 : 0;

  const userCx = 110 + offsetDistance * Math.cos(midRad);
  const userCy = 110 + offsetDistance * Math.sin(midRad);

  const userPath = getDonutSlicePath(userCx, userCy, 50, 78, 0, userAngle);
  const poolPath = getDonutSlicePath(110, 110, 50, 78, userAngle, 360);

  return (
    <div className="relative overflow-hidden rounded-2xl md:rounded-3xl border border-[#D4AF37]/25 bg-[#0B0E14]/90 backdrop-blur-xl p-4 md:p-5 w-full shadow-2xl">
      {/* Brilho Dourado Suave no Fundo */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/8 via-transparent to-transparent pointer-events-none" />

      {/* Cabeçalho */}
      <div className="relative z-10 flex items-center justify-between pb-3 mb-4 border-b border-gray-800/80">
        <div className="flex items-center gap-2 text-xs md:text-sm font-bold uppercase tracking-wider text-gray-300 font-mono">
          <PieChart className="w-4 h-4 text-[#D4AF37]" />
          <span>Participação No Pool eCoin - Profit Margin (PM)</span>
        </div>
        <button
          type="button"
          aria-label="Compartilhar"
          className="text-gray-400 hover:text-white transition-colors p-1"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      {/* Layout Principal: Gráfico no lado Esquerdo e Legenda no lado Direito */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* LADO ESQUERDO: Donut Chart com Fatia do Bolo Separada */}
        <div className="md:col-span-5 flex flex-col items-center justify-center relative min-h-[190px]">
          <svg
            viewBox="0 0 220 220"
            className="w-44 h-44 md:w-48 md:h-48 drop-shadow-[0_0_15px_rgba(212,175,55,0.16)]"
          >
            <defs>
              <linearGradient id="ecoinUserSliceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFD700" />
                <stop offset="100%" stopColor="#D4AF37" />
              </linearGradient>

              <linearGradient id="ecoinPoolGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00FF9C" />
                <stop offset="100%" stopColor="#00B865" />
              </linearGradient>

              <filter id="ecoinDetachedShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="2" dy="4" stdDeviation="4" floodColor="#D4AF37" floodOpacity="0.45" />
              </filter>
            </defs>

            {userAngle < 360 && (
              <path
                d={poolPath}
                fill="url(#ecoinPoolGrad)"
                className="transition-all duration-500 hover:opacity-90 cursor-pointer"
              />
            )}

            {hasShare && (
              <path
                d={userPath}
                fill="url(#ecoinUserSliceGrad)"
                filter="url(#ecoinDetachedShadow)"
                className="transition-all duration-500 hover:scale-105 transform origin-center cursor-pointer stroke-[#0B0E14] stroke-2"
              />
            )}
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none font-mono">
            <Sparkles className="w-4 h-4 text-[#D4AF37] mb-0.5 animate-pulse" />
            <span className="text-[10px] uppercase text-gray-400 font-bold tracking-wider">
              Sua Cota
            </span>
            <span className="text-sm md:text-base font-black text-white">
              {actualPPP < 0.01 && actualPPP > 0
                ? '< 0.01%'
                : `${actualPPP.toFixed(2)}%`}
            </span>
          </div>
        </div>

        {/* LADO DIREITO: Indicadores e Valores Numéricos */}
        <div className="md:col-span-7 flex flex-col gap-3 font-mono">
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 transition-all hover:border-[#D4AF37]/60">
            <div className="flex items-center gap-2.5">
              <span className="w-3.5 h-3.5 rounded-full bg-[#D4AF37] shadow-[0_0_10px_#D4AF37] flex-shrink-0" />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  Sua Fatia (PM)
                  <span className="text-[9px] px-1.5 py-0.2 bg-[#D4AF37]/20 text-[#D4AF37] rounded border border-[#D4AF37]/40 uppercase tracking-tight">
                    eCoin
                  </span>
                </span>
                <span className="text-[10px] text-gray-400">Profit Margin (PM) Ativa</span>
              </div>
            </div>
            <span className="text-sm md:text-base font-extrabold text-[#D4AF37]">
              {actualPPP.toFixed(5)}%
            </span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 transition-all hover:border-white/20">
            <div className="flex items-center gap-2.5">
              <span className="w-3.5 h-3.5 rounded-full bg-[#00FF9C] shadow-[0_0_10px_#00FF9C] flex-shrink-0" />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-gray-200">
                  Outros ecnTraders com (PM) do Pool
                </span>
                <span className="text-[10px] text-gray-400">Total Restante</span>
              </div>
            </div>
            <span className="text-sm md:text-base font-extrabold text-[#00FF9C]">
              {(100 - actualPPP).toFixed(5)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}