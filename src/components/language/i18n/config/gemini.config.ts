// ============================================================================
// EDENKINGDOM AI TRANSLATION FRAMEWORK
// Gemini Configuration
// ============================================================================

export const GEMINI_CONFIG = {
  //------------------------------------------------------------------
  // Provider
  //------------------------------------------------------------------

  id: "gemini",

  name: "Google Gemini",

  enabled: true,

  //------------------------------------------------------------------
  // API
  //------------------------------------------------------------------

  apiKey: process.env.GEMINI_API_KEY,

  endpoint: "https://generativelanguage.googleapis.com",

  //------------------------------------------------------------------
  // Modelo padrão
  //------------------------------------------------------------------

  defaultModel: "gemini-2.5-pro",

  fallbackModel: "gemini-2.5-flash",

  //------------------------------------------------------------------
  // Modelos suportados
  //------------------------------------------------------------------

  supportedModels: [
    "gemini-2.5-pro",
    "gemini-2.5-flash",
    "gemini-2.0-flash",
    "gemini-1.5-pro",
    "gemini-1.5-flash",
  ],

  //------------------------------------------------------------------
  // Tradução
  //------------------------------------------------------------------

  temperature: 0.2,

  topP: 0.95,

  topK: 40,

  maxTokens: 4000,

  //------------------------------------------------------------------
  // Performance
  //------------------------------------------------------------------

  timeout: 30000,

  retries: 3,

  retryDelay: 1500,

  //------------------------------------------------------------------
  // Rate Limits
  //------------------------------------------------------------------

  requestsPerMinute: 300,

  requestsPerDay: 100000,

  concurrentRequests: 10,

  //------------------------------------------------------------------
  // Cache
  //------------------------------------------------------------------

  enableCache: true,

  cacheTTL: 86400,

  //------------------------------------------------------------------
  // Qualidade
  //------------------------------------------------------------------

  supportsGlossary: true,

  supportsHtml: true,

  supportsMarkdown: true,

  supportsJson: true,

  supportsStreaming: true,

  supportsVision: true,

  supportsFunctions: true,

  //------------------------------------------------------------------
  // Custos
  //------------------------------------------------------------------

  estimateCosts: true,

  saveUsage: true,

  saveTokens: true,

  //------------------------------------------------------------------
  // Segurança
  //------------------------------------------------------------------

  safetySettings: {
    harassment: "BLOCK_MEDIUM_AND_ABOVE",
    hateSpeech: "BLOCK_MEDIUM_AND_ABOVE",
    sexuallyExplicit: "BLOCK_MEDIUM_AND_ABOVE",
    dangerousContent: "BLOCK_MEDIUM_AND_ABOVE",
  },

  //------------------------------------------------------------------
  // Logs
  //------------------------------------------------------------------

  debug: false,

  logRequests: false,

  logResponses: false,

  logErrors: true,
};

export default GEMINI_CONFIG;