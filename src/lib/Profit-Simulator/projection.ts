// ============================================================================
// CONSTANTES GLOBAIS DO PROTOCOLO (TIER-1 CORE CONFIG)
// ============================================================================
export const PROTOCOL_CONSTANTS = {
  ROI_MULTIPLIER: 1.3,         // Retorno total de 130% (Principal + 30% Lucro)
  CAPACITY_MULTIPLIER: 1.3,    // Multiplicador da capacidade de mineração (130%)
  BASE_DAILY_REWARD_RATE: 0.005, // 0.5% estimado ao dia com base nas métricas do buffer
  
  // Percentagens de Distribuição da queima de ecGas
  DISTRIBUTION_SHARDS: {
    LIQUIDITY: 0.40,   // 40%
    REFERRAL: 0.10,    // 10%
    REWARD_POOL: 0.35, // 35%
    EXTRA_REWARD: 0.10,// 10%
    TREASURY: 0.05,    // 5%
  },
  
  // Matriz base de lotes padrão para investidores institucionais e micro-aportes
  BASE_ROWS_LOTS: [0.001, 0.01, 0.1, 1, 5, 10, 50, 100, 250, 500, 1000, 2500, 5000, 10000]
};

// ============================================================================
// INTERFACES E TIPAGENS TÉCNICAS
// ============================================================================
export interface ProjectionInput {
  stake: number;
  ecGas: number;
  totalEligibleStaked: number;
  rewardBufferUSDT: number;
  projectionWindow: "24h" | "7d" | "30d";
}

export interface DistributionData {
  liquidity: number;
  referral: number;
  rewardPool: number;
  extraReward: number;
  treasury: number;
}

export interface ROIMetrics {
  capital: number;
  profit: number;
  totalReturn: number;
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

export interface ProfitRow {
  ecGas: number;
  capital: number;
  profit: number;
  totalReturn: number;
  share: number;
  capacity: number;
  custom?: boolean;
}

export interface ProjectionResult {
  summary: ExecutiveSummary;
  distribution: DistributionData;
  rows: ProfitRow[];
  projection: FinancialProjection;
}

// ============================================================================
// FUNÇÕES MATEMÁTICAS PURAS (MATH ENGINE)
// ============================================================================

/**
 * 1) Calcula a divisão exata dos Shards do ecGas queimado
 */
export function calculateDistribution(purchase: number): DistributionData {
  const shards = PROTOCOL_CONSTANTS.DISTRIBUTION_SHARDS;
  return {
    liquidity: purchase * shards.LIQUIDITY,
    referral: purchase * shards.REFERRAL,
    rewardPool: purchase * shards.REWARD_POOL,
    extraReward: purchase * shards.EXTRA_REWARD,
    treasury: purchase * shards.TREASURY,
  };
}

/**
 * 2) capacityFromUSDT(ecGas) - Mapeia a capacidade de mineração com base nas regras do contrato
 */
export function calculateCapacity(ecGas: number): number {
  return ecGas * PROTOCOL_CONSTANTS.CAPACITY_MULTIPLIER;
}

/**
 * 3) Calcula a cota percentual do utilizador no Pool global de Staking
 */
export function calculateShare(stake: number, totalEligibleStaked: number): number {
  if (totalEligibleStaked <= 0 || stake <= 0) return 0;
  return (stake / totalEligibleStaked) * 100; // Retorna em valor percentual (0% a 100%)
}

/**
 * 4) Calcula a estrutura de retorno bruto, capital e lucro líquido (Teto de 130%)
 */
export function calculateROI(capital: number): ROIMetrics {
  const totalReturn = capital * PROTOCOL_CONSTANTS.ROI_MULTIPLIER;
  const profit = totalReturn - capital; // Corresponde exatamente aos 30% líquidos
  return {
    capital,
    profit,
    totalReturn,
  };
}

/**
 * 5) Gera as janelas de projeção temporal com base no share e no volume global do buffer
 */
export function calculateProjection(share: number, rewardBufferUSDT: number): FinancialProjection {
  // Fração real do user (de 0 a 1) baseada no share percentual
  const shareFraction = share / 100;
  const baseDailyReward = rewardBufferUSDT * shareFraction * PROTOCOL_CONSTANTS.BASE_DAILY_REWARD_RATE;

  return {
    daily: baseDailyReward,
    weekly: baseDailyReward * 7,
    monthly: baseDailyReward * 30,
  };
}

/**
 * 6) Constrói toda a matriz de dados para a ProfitTable (Ordenada com Linha Custom)
 */
export function generateProfitRows(
  currentEcGas: number, 
  userShare: number, 
  totalEligibleStaked: number
): ProfitRow[] {
  // Mapeia o array estático aplicando as funções puras do motor
  const defaultRows: ProfitRow[] = PROTOCOL_CONSTANTS.BASE_ROWS_LOTS.map((lot) => {
    const roi = calculateROI(lot);
    // Proporção matemática ponderada: Se o ecGas digitado mudar, calibra o share visual da linha proporcionalmente
    const lotShare = currentEcGas > 0 ? (lot / currentEcGas) * userShare : userShare;
    
    return {
      ecGas: lot,
      capital: roi.capital,
      profit: roi.profit,
      totalReturn: roi.totalReturn,
      share: lotShare,
      capacity: calculateCapacity(lot),
    };
  });

  // Valida se o input inserido já está contido nos lotes padrão
  const amountExists = PROTOCOL_CONSTANTS.BASE_ROWS_LOTS.includes(currentEcGas);

  if (currentEcGas > 0 && !amountExists) {
    const roiCustom = calculateROI(currentEcGas);
    const customRow: ProfitRow = {
      ecGas: currentEcGas,
      capital: roiCustom.capital,
      profit: roiCustom.profit,
      totalReturn: roiCustom.totalReturn,
      share: userShare,
      capacity: calculateCapacity(currentEcGas),
      custom: true,
    };

    // Injeta a linha gerada dinamicamente e reordena de forma ascendente pelo volume do ecGas
    return [...defaultRows, customRow].sort((a, b) => a.ecGas - b.ecGas);
  }

  // Se o valor já constava no array, apenas assinala a linha com a flag custom para efeitos visuais de foco
  return defaultRows.map((row) => 
    row.ecGas === currentEcGas ? { ...row, custom: true } : row
  );
}

// ============================================================================
// 7) ENGINE CENTRALIZADOR: generateSimulation()
// ============================================================================
/**
 * Orquestra todos os sub-motores para processar a payload completa do simulador
 */
export function generateSimulation(input: ProjectionInput): ProjectionResult {
  const { stake, ecGas, totalEligibleStaked, rewardBufferUSDT } = input;

  const share = calculateShare(stake, totalEligibleStaked);
  const distribution = calculateDistribution(ecGas);
  const roi = calculateROI(ecGas);
  const capacity = calculateCapacity(ecGas);
  const projection = calculateProjection(share, rewardBufferUSDT);
  const rows = generateProfitRows(ecGas, share, totalEligibleStaked);

  const summary: ExecutiveSummary = {
    capital: roi.capital,
    profit: roi.profit,
    totalReturn: roi.totalReturn,
    share,
    capacity,
  };

  return {
    summary,
    distribution,
    rows,
    projection,
  };
}