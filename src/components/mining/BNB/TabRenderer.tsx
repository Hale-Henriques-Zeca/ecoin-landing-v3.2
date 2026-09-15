"use client";

import MiningTab from "./MiningTab";
import StakeTab from "./StakeTab";
import GasVaultTab from "./GasVaultTab";
import AnalyticsTab from "./AnalyticsTab";
import ConfigTab from "./ConfigTab";

interface TabRendererProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  menuItems: any[];
  
  // Dados de Mineração
  miningData: any;
  pendingUSDT: number;
  pendingEUSD: number;
  userStake: number | string;
  onMine: () => void;

  // Dados de Staking / Depósito
  stats: {
    myStake: string | number;
    share: string | number;
    totalStaked: string | number;
    totalStakers: string | number;
  };
  amountInputStake: any;
  setStakePercentage: (p: number) => void;
  setUnstakePercentage: (p: number) => void;
  depositTxState: any;
  onStake: () => Promise<void>;
  onUnstake: () => void;

  // Dados do Gas Vault
  gasData: any;
  gasToken: string;
  setGasToken: (token: "USDT" | "EUSD") => void;
  usdtEnabled: boolean;
  eusdEnabled: boolean;
  amountInputGas: any;
  gasTxState: any;
  onBuyGas: () => Promise<void>;

  // Transbordo / Analytics
  overflow: {
    totalUSDT: number;
    totalEUSD: number;
  };

  // Configurações / Painel de Líder
  isRedirecting: boolean;
  isOwner: boolean;
  handleTeamsRedirect: () => void;
}

export default function TabRenderer({
  activeTab,
  setActiveTab,
  menuItems,
  miningData,
  pendingUSDT,
  pendingEUSD,
  userStake,
  onMine,
  stats,
  amountInputStake,
  setStakePercentage,
  setUnstakePercentage,
  depositTxState,
  onStake,
  onUnstake,
  gasData,
  gasToken,
  setGasToken,
  usdtEnabled,
  eusdEnabled,
  amountInputGas,
  gasTxState,
  onBuyGas,
  overflow,
  isRedirecting,
  isOwner,
  handleTeamsRedirect,
}: TabRendererProps) {
  
  switch (activeTab) {
    case "minacao":
      return (
        <MiningTab 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          menuItems={menuItems}
          pendingUSDT={pendingUSDT}
          pendingEUSD={pendingEUSD}
          userStake={userStake}
        />
      );
      
    case "stake":
      return (
        <StakeTab 
          amountInput={amountInputStake}
          setStakePercentage={setStakePercentage}
          setUnstakePercentage={setUnstakePercentage}
          depositTxState={depositTxState}
          onStake={onStake}
          onUnstake={onUnstake}
        />
      );
      
    case "gas":
      return (
        <GasVaultTab 
          gasToken={gasToken}
          setGasToken={setGasToken}
          usdtEnabled={usdtEnabled}
          eusdEnabled={eusdEnabled}
          amountInput={amountInputGas}
          gasTxState={gasTxState}
          onBuyGas={onBuyGas}
        />
      );
      
    case "analytics":
      return (
        <AnalyticsTab
          stats={stats}
          pendingUSDT={pendingUSDT}
          pendingEUSD={pendingEUSD}
          usedCapacity={gasData?.usedCapacity || 0}
          maxCapacity={gasData?.maxCapacity || 0}
          overflow={overflow}
        />
      );
      
    case "config":
      return (
        <ConfigTab 
          isRedirecting={isRedirecting}
          isOwner={isOwner}
          handleTeamsRedirect={handleTeamsRedirect}
        />
      );
      
    default:
      return (
        <MiningTab 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          menuItems={menuItems}
          pendingUSDT={pendingUSDT}
          pendingEUSD={pendingEUSD}
          userStake={userStake}
        />
      );
  }
}