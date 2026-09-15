"use client";

import { useState, useMemo } from "react";
import type { ProfitRow } from "../../app/Profit-Simulator/components/Simulators/ProfitTable";

// ============================================================================
// CONSTANTES E LIVE BLOCKCHAIN DATA (ISOLADOS PARA SUBST. FUTURA POR WAGMI)
// ============================================================================
const ON_CHAIN_MOCK = {
  totalEligibleStaked: 12500000, // Total de eCoin elegível no pool global
  rewardBufferUSDT: 450000,      // Liquidez corrente do buffer de recompensas
  capacityMultiplier: 1.3,       // Multiplicador do capacityFromUSDT() (130%)
  roiMultiplier: 1.3,            // Teto de Retorno do ecossistema (130% Cap)
};

// Valores fixos padrão para a geração da matriz da ProfitTable
const BASE_ROWS_LOTS = [0.001, 0.01, 0.1, 1, 5, 10, 50, 100, 250, 500, 1000, 2500, 5000, 10000];

// ============================================================================
// INTERFACES E TIPAGEM DO SISTEMA
// ============================================================================
export interface SimulatorState {
  stake: number;
  ecGas: number;
  window: "24h" | "7d" | "30d";
}

export interface DistributionData {
  liquidity: number;
  referral: number;
  rewardPool: number;
  extraReward: number;
  treasury: number;
}

export interface ExecutiveSummary {
  capital: number;
  profit: number;
  totalReturn: number;
  share: number;
  capacity: number;
}

export interface FinancialProjection {
  daily: number;
  weekly: number;
  monthly: number;
}

export interface SimulatorResult {
  state: SimulatorState;
  setStake: (value: number) => void;
  setEcGas: (value: number) => void;
  setWindow: (value: "24h" | "7d" | "30d") => void;
  summary: ExecutiveSummary;
  distribution: DistributionData;
  rows: ProfitRow[];
  projection: FinancialProjection;
}

// ============================================================================
// HOOK PRINCIPAL: useSimulator
// ============================================================================
export function useSimulator(initialStake = 250000, initialEcGas = 1000): SimulatorResult {
  
  // 1. INPUTS (Estado atómico centralizado)
  const [state, setState] = useState<SimulatorState>({
    stake: initialStake,
    ecGas: initialEcGas,
    window: "7d",
  });

  // Funções de Mutação do Estado
  const setStake = (value: number) => setState((prev) => ({ ...prev, stake: Math.max(0, value) }));
  const setEcGas = (value: number) => setState((prev) => ({ ...prev, ecGas: Math.max(0, value) }));
  const setWindow = (window: "24h" | "7d" | "30d") => setState((prev) => ({ ...prev, window }));

  // --------------------------------------------------------------------------
  // INTERRUPTOR DE ENGENHARIA MATEMÁTICA E PROJEÇÕES (DERIVED DATA)
  // --------------------------------------------------------------------------
  
  // A. Cálculo de Participação (User Share) - Baseado no Contrato
  const userShare = useMemo(() => {
    if (ON_CHAIN_MOCK.totalEligibleStaked <= 0 || state.stake <= 0) return 0;
    return (state.stake / ON_CHAIN_MOCK.totalEligibleStaked) * 100; // Retorna em %
  }, [state.stake]);

  // B. Distribution Engine (Distribuição Dinâmica Baseada na Queima de ecGas)
  const distribution = useMemo<DistributionData>(() => {
    const input = state.ecGas;
    return {
      liquidity: input * 0.40,   // 40% Injeção de Liquidez
      referral: input * 0.10,    // 10% Sistema de Referências Multicamadas
      rewardPool: input * 0.35,  // 35% Smart AI Reward Pool
      extraReward: input * 0.10, // 10% Extra Pool/Neural Arbitrage
      treasury: input * 0.05,    // 5% Tesouraria/Desenvolvimento
    };
  }, [state.ecGas]);

  // C. Projeção Temporal de Rendimento (Baseada no Share e Buffer Disponível)
  const projection = useMemo<FinancialProjection>(() => {
    // Rendimento base estimado simulando a atividade total do pool ponderada pelo share
    const baseDailyReward = (ON_CHAIN_MOCK.rewardBufferUSDT * (userShare / 100)) * 0.005; 
    
    return {
      daily: baseDailyReward,
      weekly: baseDailyReward * 7,
      monthly: baseDailyReward * 30,
    };
  }, [userShare]);

  // D. Summary Engine (Resumo Executivo para os Top Cards)
  const summary = useMemo<ExecutiveSummary>(() => {
    const capital = state.ecGas; // Capital = ecGas alocado
    const profit = capital * (ON_CHAIN_MOCK.roiMultiplier - 1); // 30% Net Profit
    const totalReturn = capital * ON_CHAIN_MOCK.roiMultiplier;   // 130% Total Return
    const capacity = capital * ON_CHAIN_MOCK.capacityMultiplier; // capacityFromUSDT(ecGas)

    return {
      capital,
      profit,
      totalReturn,
      share: userShare,
      capacity,
    };
  }, [state.ecGas, userShare]);

  // E. Profit Table Matrix Engine (Geração Ordenada e Injeção de Linha Custom)
  const rows = useMemo<ProfitRow[]>(() => {
    // Converte os lotes base numa estrutura ProfitRow tipada
    const defaultRows: ProfitRow[] = BASE_ROWS_LOTS.map((lot) => {
      // Regras espelhadas da matemática do contrato inteligente
      const lotCapital = lot;
      const lotProfit = lotCapital * (ON_CHAIN_MOCK.roiMultiplier - 1);
      const lotReturn = lotCapital * ON_CHAIN_MOCK.roiMultiplier;
      
      // Proporção do lote calculada dinamicamente baseada no ecGas simulado corrente
      const lotShare = state.ecGas > 0 ? (lot / state.ecGas) * userShare : userShare;
      const lotCapacity = lot * ON_CHAIN_MOCK.capacityMultiplier;

      return {
        ecGas: lot,
        capital: lotCapital,
        profit: lotProfit,
        totalReturn: lotReturn,
        share: lotShare,
        capacity: lotCapacity,
      };
    });

    // SISTEMA DE INJEÇÃO ORDENADA (Item 5): Se o ecGas digitado não estiver na lista, insere na posição correta
    const searchAmount = state.ecGas;
    const amountAlreadyExists = BASE_ROWS_LOTS.includes(searchAmount);

    if (searchAmount > 0 && !amountAlreadyExists) {
      const customRow: ProfitRow = {
        ecGas: searchAmount,
        capital: searchAmount,
        profit: searchAmount * (ON_CHAIN_MOCK.roiMultiplier - 1),
        totalReturn: searchAmount * ON_CHAIN_MOCK.roiMultiplier,
        share: userShare,
        capacity: searchAmount * ON_CHAIN_MOCK.capacityMultiplier,
        custom: true,
      };

      // Insere e reordena a tabela de forma crescente pelo volume de ecGas
      return [...defaultRows, customRow].sort((a, b) => a.ecGas - b.ecGas);
    }

    // Se o valor já existe nos filtros, apenas marcamos a linha existente como custom se for o input do user
    return defaultRows.map((row) => 
      row.ecGas === searchAmount ? { ...row, custom: true } : row
    );
  }, [state.ecGas, userShare]);

  // --------------------------------------------------------------------------
  // RETORNO DE CONTRATO DE INTERFACE UNIFICADA
  // --------------------------------------------------------------------------
  return {
    state,
    setStake,
    setEcGas,
    setWindow,
    summary,
    distribution,
    rows,
    projection,
  };
}