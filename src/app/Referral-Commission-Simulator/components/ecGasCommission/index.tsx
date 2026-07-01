"use client";

import React, { useState } from "react";
import { Fuel, TrendingUp } from "lucide-react";

import Hero from "./Hero";
import CommissionCard from "./CommissionCard";
import ReferralChart from "./ReferralChart";
import CommissionTable from "./CommissionTable";
import MonthlySimulator from "./MonthlySimulator";
import NetworkSimulator from "./NetworkSimulator";
import ReferralProgramOverview from "./ReferralProgramOverview";

export default function EcGasCommissionSimulator() {
  // 1. Estados para controlar os dados calculados do simulador ecGas
  const [totalMined, setTotalMined] = useState(12540.50);
  const [gasCommission, setGasCommission] = useState(940.53);

  // 2. Estados dedicados para alimentar o gráfico de distribuição (ReferralChart)
  // Altera esses valores base para refletir os cálculos reais do teu motor de ecGas
  const [simulatedPurchase, setSimulatedPurchase] = useState(5000); // Exemplo: Compra de 5000 USD
  const [simulatedPool, setSimulatedPool] = useState(1000);         // 20% vai pro Pool (1000 USD)
  const [lvl1Profit, setLvl1Profit] = useState(700);               // 70% do Pool pro L1
  const [lvl2Profit, setLvl2Profit] = useState(200);               // 20% do Pool pro L2
  const [lvl3Profit, setLvl3Profit] = useState(100);               // 10% do Pool pro L3

  return (
    <div className="space-y-16">
      {/* 1. Hero do ecGas */}
      <Hero />

      {/* 2. Seção de Cards de Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto w-full">
        <CommissionCard
          title="Total Comissões ecGas"
          value={gasCommission}
          percentage={7.50}
          subtitle="Rendimento distribuído no Nível 1"
          color="#A855F7"
          icon={Fuel}
          currency="USDT"
          delay={0.1}
        />

        <CommissionCard
          title="Volume de Rede Estimado"
          value={totalMined}
          percentage={10.00}
          subtitle="Total movimentado pelos afiliados"
          color="#3B82F6"
          icon={TrendingUp}
          currency="USDT"
          delay={0.2}
        />
      </div>

      {/* 3. Gráfico de Redes COM AS PROPS PASSADAS (Corrige o sublinhado vermelho) */}
      <ReferralChart 
        purchase={simulatedPurchase}
        pool={simulatedPool}
        l1={lvl1Profit}
        l2={lvl2Profit}
        l3={lvl3Profit}
      />

      {/* 4. Restante do Pipeline */}
      <CommissionTable />
      <MonthlySimulator />
      <NetworkSimulator />
      <ReferralProgramOverview />
    </div>
  );
}