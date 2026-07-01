"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Network, 
  Layers, 
  ArrowRight, 
  ChevronDown, 
  Info,
  Activity,
  Cpu,
  ShieldCheck,
  Coins,
  ArrowDown,
  Droplet,
  Users,
  Award,
  Zap,
  Wallet
} from "lucide-react";

// ============================================================================
// CONFIGURAÇÃO DOS METADADOS E SUB-ROTINAS DO PROTOCOLO
// ============================================================================
interface StepDetail {
  name: string;
  desc: string;
  icon: React.ElementType;
}

interface NodeDetails {
  id: string;
  label: string;
  pct: number;
  color: string;
  glowColor: string;
  unit: string;
  description: string;
  pipeline: StepDetail[];
}

const DESTINATION_NODES_CONFIG: Record<string, NodeDetails> = {
  liquidity: {
    id: "liquidity",
    label: "Liquidity Pool",
    pct: 20,
    color: "rgb(249, 115, 22)", // Orange
    glowColor: "rgba(249, 115, 22, 0.25)",
    unit: "USDT",
    description: "20% do valor é injetado diretamente no Automated Market Maker (AMM) para estabelecer um piso de liquidez estável e mitigar derrapagens de preço.",
    pipeline: [
      { name: "Liquidity Router", desc: "Coleta e emparelha os ativos recebidos", icon: Droplet },
      { name: "AMM Smart Contract", desc: "Injeção direta no par nativo da DEX", icon: Cpu },
      { name: "LP Token Lock", desc: "Bloqueio automatizado dos tokens de liquidez", icon: ShieldCheck },
      { name: "Floor Elevation", desc: "Estabilização do preço base do ecossistema", icon: Activity }
    ]
  },
  referral: {
    id: "referral",
    label: "Referral System",
    pct: 20,
    color: "rgb(59, 130, 246)", // Blue
    glowColor: "rgba(59, 130, 246, 0.25)",
    unit: "USDT",
    description: "20% é fragmentado e distribuído em tempo real através da estrutura de afiliação multinível (7.5%, 1.5% e 1.0%).",
    pipeline: [
      { name: "Referral Engine", desc: "Validação on-chain do código de convite", icon: Users },
      { name: "Multi-level Router", desc: "Divisão exata em 3 níveis hierárquicos", icon: Layers },
      { name: "Instant Disbursal", desc: "Envio direto p2p sem custódia central", icon: Zap },
      { name: "Wallet Settlement", desc: "Disponibilização imediata para saque", icon: Wallet }
    ]
  },
  rewardPool: {
    id: "rewardPool",
    label: "Reward Pool",
    pct: 30,
    color: "rgb(34, 197, 94)", // Green
    glowColor: "rgba(34, 197, 94, 0.25)",
    unit: "USDT",
    description: "30% do valor da compra é injetado instantaneamente no contrato de staking para distribuição linear e contínua aos mineradores ativos.",
    pipeline: [
      { name: "Unified Collector", desc: "Concentrador central de depósitos de ecGas", icon: Coins },
      { name: "injectInstantUSDT()", desc: "Chamada de função core de liquidez instantânea", icon: Zap },
      { name: "Reward Buffer", desc: "Segregação do montante para streaming linear", icon: Layers },
      { name: "Streaming Engine", desc: "Distribuição bloco a bloco aos nós ativos", icon: Activity },
      { name: "Pending Rewards", desc: "Atualização de saldos em tempo real", icon: Award },
      { name: "User Claim", desc: "Liberação de saque sob demanda via dApp", icon: Wallet }
    ]
  },
  extraReward: {
    id: "extraReward",
    label: "Extra EUSD",
    pct: 5,
    color: "rgb(168, 85, 247)", // Purple
    glowColor: "rgba(168, 85, 247, 0.25)",
    unit: "EUSD",
    description: "5% é canalizado para o fundo de bónus sintéticos em EUSD, servindo como colateral algorítmico secundário e incentivo de queima.",
    pipeline: [
      { name: "EUSD Minting", desc: "Emissão controlada do ativo sintético estável", icon: Coins },
      { name: "Vault Allocation", desc: "Destinação ao cofre de estabilidade cambial", icon: ShieldCheck },
      { name: "Bonus Buffer", desc: "Preparação dos lotes de distribuição", icon: Layers },
      { name: "Incentive Delivery", desc: "Acréscimo estratégico ao pool de queima", icon: Zap }
    ]
  },
  treasury: {
    id: "treasury",
    label: "Protocol Treasury",
    pct: 25,
    color: "rgb(239, 68, 68)", // Red
    glowColor: "rgba(239, 68, 68, 0.25)",
    unit: "USDT",
    description: "25% é alocado na Tesouraria Autónoma para suportar o desenvolvimento de R&D, auditorias de segurança periódicas e recompras programadas.",
    pipeline: [
      { name: "Treasury Multisig", desc: "Destinação sob custódia multifirmas", icon: ShieldCheck },
      { name: "R&D Smart Escrow", desc: "Reserva de capital para inovação contínua", icon: Cpu },
      { name: "Buy-Back Fund", desc: "Fundo automatizado para suporte de mercado", icon: Coins },
      { name: "Core Vault", desc: "Armazenamento frio de ativos de governança", icon: Wallet }
    ]
  }
};

// ============================================================================
// COMPONENTE AUXILIAR: CONTADOR NUMÉRICO ANIMADO (MICRO-INTERAÇÃO)
// ============================================================================
function AnimatedCounter({ value, prefix = "$", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    let start = displayValue;
    const end = value;
    if (start === end) return;

    const duration = 400; // ms
    const startTime = performance.now();

    const updateNumber = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing out quad
      const easeProgress = progress * (2 - progress);
      const current = start + (end - start) * easeProgress;
      
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(updateNumber);
      } else {
        setDisplayValue(end);
      }
    };

    requestAnimationFrame(updateNumber);
  }, [value]);

  return (
    <span>
      {prefix}
      {new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(displayValue)}
      {suffix}
    </span>
  );
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================
export default function DistributionChart({ purchase, distribution }: DistributionChartProps) {
  const [selectedNode, setSelectedNode] = useState<string | null>("rewardPool");
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const activeId = hoveredNode || selectedNode;

  // --------------------------------------------------------------------------
  // GEOMETRIA AVANÇADA SANKEY (Acoplamento Perfeito Sem Gaps)
  // --------------------------------------------------------------------------
  const sankeyPaths = useMemo(() => {
    const startX = 140; // Sai exatamente do fim do reservatório largo
    const endX = 430;   // Entrega exatamente na colagem dos cards da direita
    const sourceHeight = 220;
    const sourceTop = 40;

    const destinationTargets = [
      { id: "liquidity",   targetY: 36,  thickness: 24 },
      { id: "referral",    targetY: 108, thickness: 24 },
      { id: "rewardPool",  targetY: 180, thickness: 34 },
      { id: "extraReward", targetY: 244, thickness: 12 },
      { id: "treasury",    targetY: 308, thickness: 28 }
    ];

    let currentSourceOffset = 0;
    const totalVal = Object.values(distribution).reduce((a, b) => a + b, 0) || 1;

    return destinationTargets.map((dest) => {
      const nodeValue = (distribution as any)[dest.id] || 0;
      const proportion = nodeValue / totalVal;
      
      // Cálculo preciso da fatia de saída baseado na proporção real
      const pathThickness = Math.max(4, proportion * sourceHeight);
      const pathSourceY = sourceTop + currentSourceOffset + pathThickness / 2;
      currentSourceOffset += pathThickness;

      const tY = dest.targetY;

      // Curva cúbica perfeita estilo Sankey Corporativo
      const cpx1 = startX + 110;
      const cpx2 = endX - 110;
      const dPath = `M ${startX} ${pathSourceY} C ${cpx1} ${pathSourceY}, ${cpx2} ${tY}, ${endX} ${tY}`;

      return {
        id: dest.id,
        d: dPath,
        strokeWidth: pathThickness,
        color: DESTINATION_NODES_CONFIG[dest.id].color
      };
    });
  }, [distribution]);

  const activeInfoText = useMemo(() => {
    if (activeId && DESTINATION_NODES_CONFIG[activeId]) {
      return DESTINATION_NODES_CONFIG[activeId].description;
    }
    return "Selecione ou passe o cursor sobre qualquer contrato inteligente de destino para auditar os caminhos de roteamento automatizados pelo protocolo.";
  }, [activeId]);

  return (
    <div className="w-full max-w-4xl mx-auto bg-slate-950/40 border border-slate-900 rounded-[2.5rem] p-6 md:p-10 shadow-2xl backdrop-blur-2xl space-y-8 select-none">
      
      {/* MEIHORIA 9: RESUMO PROTOCOLAR DE CONFIANÇA NO TOPO */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-950/80 border border-slate-900/60 rounded-2xl p-4 text-center">
        <div className="space-y-0.5 border-r border-slate-900">
          <span className="block text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest">Protocol Stream</span>
          <span className="text-sm font-mono font-black text-emerald-400">100% Automated</span>
        </div>
        <div className="space-y-0.5 sm:border-r border-slate-900">
          <span className="block text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest">Simulated Input</span>
          <span className="text-sm font-mono font-black text-slate-200">
            <AnimatedCounter value={purchase} />
          </span>
        </div>
        <div className="space-y-0.5 border-r border-slate-900">
          <span className="block text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest">Core Destinations</span>
          <span className="text-sm font-mono font-black text-blue-400">5 Smart Contracts</span>
        </div>
        <div className="space-y-0.5">
          <span className="block text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest">Settlement Layer</span>
          <span className="text-sm font-mono font-black text-purple-400">Instant Execution</span>
        </div>
      </div>

      {/* 1. HEADER INSTITUCIONAL */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-slate-900 pb-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
            <Network size={14} className="animate-spin-slow" /> Distribution Flow
          </div>
          <h3 className="text-xl md:text-2xl font-black font-mono tracking-tight text-slate-100 uppercase">
            Roteamento em Tempo Real
          </h3>
          <p className="text-slate-500 text-xs font-sans max-w-xl">
            Audite visualmente como o protocolo fragmenta e distribui de forma imutável cada fração de ativo injetado na compra de ecGas.
          </p>
        </div>
        
        <div className="flex items-center gap-4 bg-slate-950 border border-slate-800 px-5 py-3 rounded-2xl shrink-0 shadow-lg">
          <div className="text-right">
            <span className="block text-[8px] font-mono font-bold text-slate-500 uppercase tracking-widest">VOLUME DE ENTRADA</span>
            <span className="text-base font-mono font-black text-slate-100">
              <AnimatedCounter value={purchase} />
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[10px] font-black uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live
          </div>
        </div>
      </div>

      {/* 2. SANKEY INTEGRADO COM OS DESTINATION CARDS CORRETAMENTE (SEM GAPS) */}
      <div className="relative w-full bg-slate-950/40 rounded-3xl border border-slate-900/60 p-4 overflow-visible grid grid-cols-1 md:grid-cols-12 items-center gap-0">
        
        {/* LADO ESQUERDO: MELHORIA 3: SOURCE NODE GRANDE E CENTRALIZADO (RESERVATÓRIO) */}
        <div className="md:col-span-3 flex justify-center py-6 md:py-0">
          <motion.div 
            animate={{ 
              borderColor: activeId ? "rgba(100, 116, 139, 0.6)" : "rgb(30, 41, 59)",
              boxShadow: activeId ? "0 0 25px rgba(148, 163, 184, 0.05)" : "none"
            }}
            className="w-full max-w-[150px] aspect-[3/4] bg-gradient-to-b from-slate-950 to-slate-900 border-2 rounded-2xl flex flex-col justify-between p-4 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
            <div className="space-y-1 z-10">
              <span className="inline-block text-[9px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md font-bold uppercase tracking-widest">
                100% IN
              </span>
              <h4 className="text-xs font-mono font-black text-slate-400 uppercase tracking-tight pt-1">INPUT VAL</h4>
            </div>

            <div className="z-10 space-y-0.5 my-auto">
              <p className="text-base font-mono font-black text-slate-100 tracking-tight">
                <AnimatedCounter value={purchase} prefix="" suffix="" />
              </p>
              <span className="block text-[10px] font-mono text-slate-500 font-bold uppercase">ecGas</span>
            </div>

            <div className="border-t border-slate-900 pt-2 z-10">
              <span className="block text-[9px] font-mono text-slate-500 font-bold uppercase tracking-wide">Equivalência</span>
              <span className="text-xs font-mono font-bold text-slate-400">
                ≈ <AnimatedCounter value={purchase} />
              </span>
            </div>
          </motion.div>
        </div>

        {/* CENTRO: CANVAS SANKEY COM MELHORIA 1 (FLUXO PULSANTE) E MELHORIA 6 (SEM GAPS) */}
        <div className="md:col-span-5 relative h-[360px] overflow-visible hidden md:block">
          <svg viewBox="0 0 570 360" className="w-full h-full overflow-visible preserve-3d">
            <defs>
              {Object.values(DESTINATION_NODES_CONFIG).map((node) => (
                <linearGradient key={`grad-${node.id}`} id={`gradient-${node.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#334155" stopOpacity={0.15} />
                  <stop offset="40%" stopColor={node.color} stopOpacity={0.4} />
                  <stop offset="100%" stopColor={node.color} stopOpacity={0.8} />
                </linearGradient>
              ))}
            </defs>

            {/* Renderização de Links */}
            <g>
              {sankeyPaths.map((path) => {
                const isSelected = selectedNode === path.id;
                const isHovered = hoveredNode === path.id;
                const isAnyActive = selectedNode !== null || hoveredNode !== null;
                const isThisActive = isSelected || isHovered;

                return (
                  <g key={`group-${path.id}`}>
                    {/* Caminho Base */}
                    <motion.path
                      d={path.d}
                      fill="none"
                      stroke={`url(#gradient-${path.id})`}
                      strokeWidth={path.strokeWidth}
                      animate={{ 
                        opacity: isAnyActive ? (isThisActive ? 1 : 0.1) : 0.55,
                        strokeWidth: isThisActive ? path.strokeWidth + 4 : path.strokeWidth
                      }}
                      transition={{ type: "spring", stiffness: 90, damping: 22 }}
                      className="cursor-pointer"
                      onMouseEnter={() => setHoveredNode(path.id)}
                      onMouseLeave={() => setHoveredNode(null)}
                      onClick={() => setSelectedNode(selectedNode === path.id ? null : path.id)}
                    />
                    
                    {/* MELHORIA 1: FLUXO CONTÍNUO DE ATIVOS (PARTÍCULAS PULSANTES) */}
                    <path
                      d={path.d}
                      fill="none"
                      stroke={path.color}
                      strokeWidth={Math.max(1.5, path.strokeWidth * 0.15)}
                      strokeDasharray="12, 24"
                      className="pointer-events-none animate-sankey-flow"
                      style={{ opacity: isAnyActive ? (isThisActive ? 0.9 : 0.05) : 0.4 }}
                    />
                  </g>
                );
              })}
            </g>
          </svg>
        </div>

        {/* LADO DIREITO: MELHORIA 4: CARTÕES COM LABELS COMPLETAS E ALINHAMENTO COM AS CURVAS */}
        <div className="md:col-span-4 flex flex-col justify-between h-[360px] py-1 gap-2 z-10">
          {Object.values(DESTINATION_NODES_CONFIG).map((node) => {
            const currentAmount = (distribution as any)[node.id] || 0;
            const isSelected = selectedNode === node.id;
            const isHovered = hoveredNode === node.id;
            const isAnyActive = selectedNode !== null || hoveredNode !== null;
            const isThisActive = isSelected || isHovered;

            return (
              <motion.button
                key={`card-${node.id}`}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
                initial={{ x: 0 }}
                // MELHORIA 2: MICRO-ANIMAÇÃO DE NASCIMENTO E INDENTAÇÃO DO CARD
                animate={{ 
                  x: isThisActive ? 6 : 0,
                  opacity: isAnyActive ? (isThisActive ? 1 : 0.4) : 1,
                  borderColor: isThisActive ? node.color : "rgb(15, 23, 42)",
                  boxShadow: isThisActive ? `0 4px 20px -2px ${node.glowColor}` : "none",
                  backgroundColor: isThisActive ? "rgba(15, 23, 42, 0.8)" : "rgba(2, 6, 23, 0.4)"
                }}
                className="w-full border p-2.5 rounded-xl text-left flex items-center justify-between transition-all duration-200 relative overflow-hidden h-[62px]"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  {/* Linha vertical de destaque do fluxo ativo */}
                  <div className="w-1 h-7 rounded-full shrink-0" style={{ backgroundColor: node.color }} />
                  
                  <div className="min-w-0 space-y-0.5">
                    {/* MELHORIA 4: LABEL COMPLETA DO NÓ DESTINO */}
                    <span className="block font-mono text-[10px] font-bold text-slate-400 tracking-tight truncate uppercase">
                      {node.label}
                    </span>
                    <p className="font-mono text-sm font-black text-slate-100 tracking-tight flex items-baseline gap-1">
                      <AnimatedCounter value={currentAmount} prefix="" suffix="" />
                      <span className="text-[10px] text-slate-500 font-bold">{node.unit}</span>
                    </p>
                  </div>
                </div>

                <div className="text-right flex flex-col items-end justify-center shrink-0 pl-2">
                  <span className="font-mono text-[11px] font-black tracking-tight" style={{ color: node.color }}>
                    {node.pct}%
                  </span>
                  <ChevronDown 
                    size={11} 
                    className={`text-slate-600 transition-transform duration-300 ${isSelected ? "rotate-180 text-slate-400" : ""}`} 
                  />
                </div>
              </motion.button>
            );
          })}
        </div>

      </div>

      {/* 4. DETAILS PANEL: MELHORIA 10 (PIPELINE VERTICAL COM SETAS E ÍCONES) */}
      <AnimatePresence mode="wait">
        {selectedNode && DESTINATION_NODES_CONFIG[selectedNode] && (
          <motion.div
            key={`expansion-${selectedNode}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden bg-gradient-to-b from-slate-950 via-slate-950/90 to-slate-950/10 border border-slate-900 rounded-3xl p-6 space-y-6 shadow-2xl relative"
          >
            {/* Efeito Glow Unificado de Fluxo Baseado na Melhoria 8 */}
            <div 
              className="absolute top-0 left-1/4 right-1/4 h-[1px] blur-sm transition-all duration-300" 
              style={{ backgroundColor: DESTINATION_NODES_CONFIG[selectedNode].color }}
            />

            <div className="flex items-center gap-2.5 border-b border-slate-900 pb-3.5">
              <Layers size={14} style={{ color: DESTINATION_NODES_CONFIG[selectedNode].color }} />
              <span className="font-mono text-xs font-black uppercase text-slate-200 tracking-wider">
                Pipeline de Execução On-Chain: {DESTINATION_NODES_CONFIG[selectedNode].label}
              </span>
            </div>

            {/* PIPELINE VERTICAL EM VEZ DE CAIXAS LATERAIS */}
            <div className="flex flex-col items-center max-w-xl mx-auto space-y-2">
              {DESTINATION_NODES_CONFIG[selectedNode].pipeline.map((step, idx, arr) => {
                const StepIcon = step.icon;
                return (
                  <div key={`pipe-step-${idx}`} className="w-full flex flex-col items-center">
                    
                    {/* Bloco do Contrato/Função */}
                    <div className="w-full bg-slate-950 border border-slate-900 rounded-xl p-3 flex items-center gap-4 hover:border-slate-800 transition-colors">
                      <div 
                        className="p-2 rounded-lg text-slate-100 shrink-0 border border-slate-900"
                        style={{ backgroundColor: `rgba(${DESTINATION_NODES_CONFIG[selectedNode].color.match(/\d+/g)?.join(',')}, 0.1)` }}
                      >
                        {/* MELHORIA 5: ÍCONES RELEVANTES PARA LEITURA RÁPIDA */}
                        <StepIcon size={16} style={{ color: DESTINATION_NODES_CONFIG[selectedNode].color }} />
                      </div>
                      
                      <div className="min-w-0 flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <h5 className="font-mono text-xs font-black text-slate-200 tracking-tight">
                          {step.name}
                        </h5>
                        <p className="text-[11px] font-sans text-slate-500 truncate sm:max-w-md">
                          {step.desc}
                        </p>
                      </div>

                      <div className="font-mono text-[9px] text-slate-600 font-bold uppercase shrink-0">
                        [STACK_0{idx + 1}]
                      </div>
                    </div>

                    {/* Seta de Interligação Sequencial Vertical */}
                    {idx < arr.length - 1 && (
                      <div className="py-1.5 flex flex-col items-center justify-center opacity-40">
                        <ArrowDown size={14} style={{ color: DESTINATION_NODES_CONFIG[selectedNode].color }} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. DYNAMIC INFORMATION BAR (UX FLUIDA) */}
      <div className="bg-slate-950/80 border border-slate-900 rounded-2xl p-4 flex items-start gap-3 shadow-inner">
        <Info size={15} className="text-slate-500 mt-0.5 shrink-0" />
        <p className="text-[11px] text-slate-400 font-sans leading-relaxed tracking-wide transition-all duration-150">
          {activeInfoText}
        </p>
      </div>

      {/* INJEÇÃO DE ESTILOS CSS ADICIONAIS NA DOM PARA AS ANIMAÇÕES COMPLEXAS DE FLUXO */}
      <style jsx global>{`
        @keyframes sankeyFlow {
          from {
            stroke-dashoffset: 360;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
        .animate-sankey-flow {
          animation: sankeyFlow 12s linear infinite;
        }
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        .truncate-2-lines {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

    </div>
  );
}