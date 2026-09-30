'use client';

import React from 'react';
import { PieChart, Share2, Sparkles } from 'lucide-react';
import { useMiningStaking } from '@/hooks/useMiningStaking';

interface UserShareProps {
  pppShare?: number;
}

/**
 * Função auxiliar para gerar a geometria (caminho SVG Arc) de uma fatia de rosca (Donut slice)
 */
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

  // Evita bug geométrico de arco completo 360° em SVG
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
  const mining = useMiningStaking();

  // Participação real do usuário no Pool (PPP) %
  const actualPPP = pppShare ?? (mining?.share ?? 0);

  // Ajuste de escala apenas visual para garantir que a fatia solta seja legível mesmo com frações pequenas
  const hasShare = actualPPP > 0;
  const visualPPP = !hasShare
    ? 0
    : actualPPP >= 100
    ? 100
    : Math.max(Math.min(actualPPP, 80), 18); // Fatia visual entre 18% e 80% para efeito de bolo destacado perfeito

  const userAngle = (visualPPP / 100) * 360;

  // Cálculo do vetor do ângulo central para mover o centro da fatia (efeito de fatia solta do bolo)
  const midAngle = userAngle / 2;
  const midRad = ((midAngle - 90) * Math.PI) / 180;
  const offsetDistance = hasShare && actualPPP < 100 ? 14 : 0; // Distância do deslocamento para fora (14px)

  const userCx = 110 + offsetDistance * Math.cos(midRad);
  const userCy = 110 + offsetDistance * Math.sin(midRad);

  // Caminho SVG da Fatia do Usuário (Solta e deslocada)
  const userPath = getDonutSlicePath(userCx, userCy, 50, 78, 0, userAngle);

  // Caminho SVG do Restante do Pool (Anel principal fixo)
  const poolPath = getDonutSlicePath(110, 110, 50, 78, userAngle, 360);

  return (
    <div className="relative overflow-hidden rounded-2xl md:rounded-3xl border border-gray-800 bg-[#0B0E14]/90 backdrop-blur-xl p-4 md:p-5 w-full shadow-2xl">
      {/* Brilho Dourado Suave no Fundo */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 via-transparent to-transparent pointer-events-none" />

      {/* Cabeçalho no estilo da Imagem */}
      <div className="relative z-10 flex items-center justify-between pb-3 mb-4 border-b border-gray-800/80">
        <div className="flex items-center gap-2 text-xs md:text-sm font-bold uppercase tracking-wider text-gray-300 font-mono">
          <PieChart className="w-4 h-4 text-[#D4AF37]" />
          <span>Participação No Pool - Margin Position (MP)</span>
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
            className="w-44 h-44 md:w-48 md:h-48 drop-shadow-[0_0_15px_rgba(212,175,55,0.12)]"
          >
            <defs>
              {/* Gradiente Dourado para a Fatia do Usuário */}
              <linearGradient id="userSliceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFD700" />
                <stop offset="100%" stopColor="#D4AF37" />
              </linearGradient>

              {/* Gradiente Verde/Esmeralda para o Restante do Pool */}
              <linearGradient id="poolGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00FF9C" />
                <stop offset="100%" stopColor="#00B865" />
              </linearGradient>

              {/* Sombra 3D de Destaque para a Fatia Solta */}
              <filter id="detachedShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="2" dy="4" stdDeviation="4" floodColor="#D4AF37" floodOpacity="0.4" />
              </filter>
            </defs>

            {/* Bolo Principal (Restante do Pool) */}
            {userAngle < 360 && (
              <path
                d={poolPath}
                fill="url(#poolGrad)"
                className="transition-all duration-500 hover:opacity-90 cursor-pointer"
              />
            )}

            {/* Fatia do Usuário SOLTA / DESLOCADA do Bolo Principal */}
            {hasShare && (
              <path
                d={userPath}
                fill="url(#userSliceGrad)"
                filter="url(#detachedShadow)"
                className="transition-all duration-500 hover:scale-105 transform origin-center cursor-pointer stroke-[#0B0E14] stroke-2"
              />
            )}
          </svg>

          {/* Texto e Ícone no Centro da Rosca */}
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
          {/* Linha 1: Fatia Solta do Usuário */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 transition-all hover:border-[#D4AF37]/60">
            <div className="flex items-center gap-2.5">
              <span className="w-3.5 h-3.5 rounded-full bg-[#D4AF37] shadow-[0_0_10px_#D4AF37] flex-shrink-0" />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  Sua Fatia (MP) 
                  <span className="text-[9px] px-1.5 py-0.2 bg-[#D4AF37]/20 text-[#D4AF37] rounded border border-[#D4AF37]/40 uppercase tracking-tight">
                    Solta
                  </span>
                </span>
                <span className="text-[10px] text-gray-400">Margin Position (MP) Ativa</span>
              </div>
            </div>
            <span className="text-sm md:text-base font-extrabold text-[#D4AF37]">
              {actualPPP.toFixed(actualPPP < 0.0001 ? 5 : 5)}%
            </span>
          </div>

          {/* Linha 2: Outros Acionistas / Restante do Pool */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 transition-all hover:border-white/20">
            <div className="flex items-center gap-2.5">
              <span className="w-3.5 h-3.5 rounded-full bg-[#00FF9C] shadow-[0_0_10px_#00FF9C] flex-shrink-0" />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-gray-200">
                  Outros ecnTraders com (MP) do Pool 
                </span>
                <span className="text-[10px] text-gray-400">Total Restante</span>
              </div>
            </div>
            <span className="text-sm md:text-base font-extrabold text-[#00FF9C]">
              {(100 - actualPPP).toFixed(4)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}