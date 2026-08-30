"use client";

import { useState } from "react";
import { 
  Cpu, 
  Gift, 
  Coins, 
  ShieldCheck, 
  BarChart3, 
  History, 
  Wallet, 
  Settings, 
  LucideIcon 
} from "lucide-react";

import { formatUnits } from "viem";
import { useAccount, useReadContract } from "wagmi";
import { CONTRACTS } from "@/lib/contracts/contracts";
import { miningStakingAbi } from "@/lib/abis/miningStakingAbi";
import { useMiningStaking } from "@/hooks/useMiningStaking";

// Sub-componentes
import RewardVelocityGraph from "@/components/RewardVelocityGraph";
import LiveRewardCounter from "@/app/Mining/components/LiveRewardCounter";
import RewardStreamIndicator from "@/app/Mining/components/RewardStreamIndicator";
import APRPanel from "@/components/APRPanel";
import RewardVelocityPanel from "@/components/RewardVelocityPanel";
import ProjectedRewardsPanel from "@/components/ProjectedRewardsPanel";

// Tipo sincronizado com as 5 janelas temporais do APRPanel
type WindowType = "1m" | "1h" | "24h" | "7d" | "30d";

// Menu Padrão Fallback adaptado para Shareholders & Capacidade CS
const DEFAULT_MENU_ITEMS = [
  { id: "minacao", label: "Shareholders", icon: Cpu },
  { id: "recompensas", label: "Dividendos", icon: Gift },
  { id: "stake", label: "Staking", icon: Coins },
  { id: "gas", label: "Capacidade CS", icon: ShieldCheck },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "historico", label: "Histórico", icon: History },
  { id: "Portfolio", label: "Portfolio", icon: Wallet },
  { id: "config", label: "Configurações", icon: Settings },
];

interface MiningTabProps {
  activeTab?: string;
  setActiveTab: (tab: string) => void;
  menuItems?: Array<{ id: string; label: string; icon: LucideIcon }>;
  pendingUSDT?: number;
  pendingEUSD?: number;
  userStake?: number | string;
}

export default function MiningTab({
  setActiveTab,
  menuItems = DEFAULT_MENU_ITEMS,
  pendingUSDT: propPendingUSDT,
  pendingEUSD: propPendingEUSD,
  userStake: propUserStake,
}: MiningTabProps) {
  const { address } = useAccount();
  const mining = useMiningStaking();

  // Estado interno de projeção suportando as 5 janelas temporais ("1m" | "1h" | "24h" | "7d" | "30d")
  const [projectionWindow, setProjectionWindow] = useState<WindowType>("7d");

  // Busca autônoma de pendências no contrato caso não venham via Props
  const { data: pending } = useReadContract({
    abi: miningStakingAbi,
    address: CONTRACTS.MINING_STAKING,
    functionName: "pendingRewards",
    chainId: 56,
    args: address ? [address] : undefined,
  });

  const fetchedPendingUSDT = pending ? Number(formatUnits(pending[0], 18)) : 0;
  const fetchedPendingEUSD = pending ? Number(formatUnits(pending[1], 18)) : 0;
  const fetchedUserStake = Number(mining.userStake || 0);

  // Valores Finais (Props com Fallback para Hook/Contrato)
  const currentPendingUSDT = propPendingUSDT ?? fetchedPendingUSDT;
  const currentPendingEUSD = propPendingEUSD ?? fetchedPendingEUSD;
  const currentUserStake = propUserStake ?? fetchedUserStake;

  return (
    <>
      {/* GRID DE ÍCONES EXCLUSIVA PARA CELULARES */}
      <div className="block lg:hidden mb-6">
        <div className="grid grid-cols-2 gap-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={`mobile-grid-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className="bg-[#0d0d0f] border border-white/5 p-5 rounded-2xl flex flex-col items-center justify-center gap-3 active:scale-95 transition-all text-center group cursor-pointer"
              >
                <div className="p-3 rounded-xl bg-white/5 text-[#D4AF37] group-hover:bg-[#D4AF37]/10 transition-colors">
                  <Icon size={26} />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-white/80">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* CONTEÚDO PRINCIPAL (GRÁFICO DE VELOCIDADE + CONTADOR DE DIVIDENDOS LIVE) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-[#0d0d0f] border border-white/5 rounded-3xl p-6">
          <RewardVelocityGraph pendingUSDT={currentPendingUSDT} />
        </div>

        <div className="lg:col-span-5 flex flex-col gap-4">
          <LiveRewardCounter
            pendingUSDT={currentPendingUSDT}
            pendingEUSD={currentPendingEUSD}
          />
          <RewardStreamIndicator />
        </div>
      </div>

      {/* PAINEL APR COM SELEÇÃO EXPANDIDA DE JANELA TEMPORAL */}
      <div className="mb-8 mt-6">
        <APRPanel
          yearlyRewards={(currentPendingUSDT + currentPendingEUSD) * 365}
          stakedAmount={Number(currentUserStake)}
          window={projectionWindow}
          setWindow={setProjectionWindow}
        />
      </div>

      {/* PAINEL DE VELOCIDADE DE DISTRIBUIÇÃO DE DIVIDENDOS */}
      <div className="mb-8">
        <RewardVelocityPanel pendingUSDT={currentPendingUSDT} />
      </div>

      {/* PAINEL DE DIVIDENDOS PROJETADOS */}
      <div className="mb-12">
        <ProjectedRewardsPanel pendingUSDT={currentPendingUSDT} />
      </div>
    </>
  );
}