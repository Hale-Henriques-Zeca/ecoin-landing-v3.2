// ============================================================================
// Providers Configuration
// ============================================================================

export const PROVIDERS_CONFIG = {

  //--------------------------------------------------
  // Provider principal
  //--------------------------------------------------

  defaultProvider: "openai",

  //--------------------------------------------------
  // Ordem automática de fallback
  //--------------------------------------------------

  fallbackOrder: [

    "openai",

    "gemini",

    "claude",

    "deepseek"

  ],

  //--------------------------------------------------
  // Permitir troca automática
  //--------------------------------------------------

  automaticFallback: true,

  automaticHealthCheck: true,

  healthCheckInterval: 300000,

  //--------------------------------------------------
  // Estratégia
  //--------------------------------------------------

  strategy: "priority",

  //--------------------------------------------------
  // Balanceamento
  //--------------------------------------------------

  loadBalancing: true,

  roundRobin: false,

  leastLatency: true,

  leastCost: false,

  highestQuality: true,

  //--------------------------------------------------
  // Repetições
  //--------------------------------------------------

  retries: 2,

  timeout: 30000,

  //--------------------------------------------------
  // Cache
  //--------------------------------------------------

  cacheProviderStatus: true,

  providerStatusTTL: 300,

  //--------------------------------------------------
  // Custos
  //--------------------------------------------------

  estimateCost: true,

  saveUsageHistory: true,

  saveTokens: true,

  //--------------------------------------------------
  // Debug
  //--------------------------------------------------

  debug: false,

};

export default PROVIDERS_CONFIG;