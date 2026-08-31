"use client";

import { useState } from "react";
import { formatUnits } from "viem";
import { useAccount, useReadContract } from "wagmi";
import { CONTRACTS } from "@/lib/contracts/contracts";
import { miningStakingAbi } from "@/lib/abis/miningStakingAbi";
import { useMiningStaking } from "@/hooks/useMiningStaking";

// Sub-componentes da aba de Participação
import APRPanel from "@/components/APRPanel";
import RewardVelocityPanel from "@/components/RewardVelocityPanel";
import ProjectedRewardsPanel from "@/components/ProjectedRewardsPanel";

// Tipo sincronizado com as 5 janelas temporais do APRPanel
type WindowType = "1m" | "1h" | "24h" | "7d" | "30d";

interface MiningTabProps {
  setActiveTab?: (tab: string) => void;
  pendingUSDT?: number;
  pendingEUSD?: number;
  userStake?: number | string;
}

export default function MiningTab({
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
    <div className="space-y-8">
      {/* PAINEL APR COM SELEÇÃO EXPANDIDA DE JANELA TEMPORAL */}
      <APRPanel
        yearlyRewards={(currentPendingUSDT + currentPendingEUSD) * 365}
        stakedAmount={Number(currentUserStake)}
        window={projectionWindow}
        setWindow={setProjectionWindow}
      />

      {/* PAINEL DE VELOCIDADE DE DISTRIBUIÇÃO DE DIVIDENDOS */}
      <RewardVelocityPanel pendingUSDT={currentPendingUSDT} />

      {/* PAINEL DE DIVIDENDOS PROJETADOS */}
      <ProjectedRewardsPanel pendingUSDT={currentPendingUSDT} />
    </div>
  );
}