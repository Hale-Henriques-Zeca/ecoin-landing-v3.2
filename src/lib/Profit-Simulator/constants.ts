/**
 * ============================================================================
 * CONFIGURAÇÃO GLOBAL E CONSTANTES (CONSTANTS - TIER-1 ARCHITECTURE)
 * Catálogo estático de dados do ecossistema. Zero lógica, zero imports de UI.
 * ============================================================================
 */

// 1) ROI_CONFIG: Parâmetros e limites de retorno financeiro do protocolo
export const ROI_CONFIG = {
  maxROI: 130,          // Teto de Retorno Total (130%)
  profitRate: 30,       // Lucro Líquido Real (30%)
  returnRateMultiplier: 1.3, // Multiplicador direto (1.3x)
  capacityMultiplier: 1.3,   // Multiplicador do ecGas para Mining Capacity
} as const;

// 2) DISTRIBUTION_CONFIG: Shards da distribuição da queima de ecGas (em percentagem)
export const DISTRIBUTION_CONFIG = {
  liquidity: 40,    // 40% Injeção de Liquidez no Pool
  referral: 10,     // 10% Sistema de Referências (3 Níveis)
  rewardPool: 35,   // 35% Smart AI Reward Pool
  extraReward: 10,  // 10% Extra Pool / Neural Arbitrage
  treasury: 5,      // 5% Tesouraria e Desenvolvimento
} as const;

// 3) PROJECTION_WINDOWS: Configuração dos seletores temporais das projeções
export const PROJECTION_WINDOWS = [
  { id: "24h", label: "24h", description: "Projeção Diária Corrente" },
  { id: "7d",  label: "7 Dias", description: "Projeção Semanal Acumulada" },
  { id: "30d", label: "30 Dias", description: "Projeção Mensal Estimada" }
] as const;

// 4) STAKE_PRESETS: Botões de seleção rápida para o volume de Staking de eCoin
export const STAKE_PRESETS = [
  10000,
  50000,
  100000,
  250000,
  500000,
  1000000
] as const;

// 5) ECGAS_PRESETS: Valores de seleção rápida ou filtros rápidos de Gas alocado
export const ECGAS_PRESETS = [
  0.01,
  1,
  10,
  100,
  500,
  1000,
  5000,
  10000
] as const;

// 6) PROFIT_TABLE_ROWS: Linhas estáticas de base que compõem a matriz da ProfitTable
export const PROFIT_TABLE_ROWS = [
  0.001,
  0.01,
  0.1,
  1,
  5,
  10,
  50,
  100,
  250,
  500,
  1000,
  2500,
  5000,
  10000
] as const;

// 7) COLORS: Centralização do mapa visual do simulador (HEX e Tailwind Classes)
export const COLORS = {
  // Shards de Distribuição (Sankey Nodes / Donut Chart)
  shards: {
    liquidity: { hex: "#F97316", tw: "bg-orange-500", text: "text-orange-500" },
    referral: { hex: "#3B82F6", tw: "bg-blue-500", text: "text-blue-500" },
    rewardPool: { hex: "#22C55E", tw: "bg-green-500", text: "text-green-500" },
    extraReward: { hex: "#A855F7", tw: "bg-purple-500", text: "text-purple-500" },
    treasury: { hex: "#EF4444", tw: "bg-red-500", text: "text-red-500" },
  },
  // Estados Semânticos Globais da UI
  semantic: {
    success: { hex: "#10B981", tw: "bg-emerald-500" },
    warning: { hex: "#F59E0B", tw: "bg-amber-500" },
    danger: { hex: "#DC2626", tw: "bg-red-600" },
    info: { hex: "#06B6D4", tw: "bg-cyan-500" },
  }
} as const;

// 8) ANIMATION: Definição dos tempos de transição (Framer Motion / CSS transitions)
export const ANIMATION = {
  sankeyDuration: 0.4, // 400ms
  cardsDuration: 0.25, // 250ms
  tableDuration: 0.15, // 150ms
  tooltipDuration: 0.2, // 200ms
} as const;

// 9) LIMITS: Regras de validação de input mínimos e máximos (Segurança de Fronteira)
export const LIMITS = {
  stake: {
    min: 10000,
    max: 10000000, // Ajustado para suportar até 10M de eCoin se necessário
  },
  ecGas: {
    min: 0.001,
    max: 10000,
  },
  slider: {
    resolution: 100, // Passos discretos do input range
  }
} as const;