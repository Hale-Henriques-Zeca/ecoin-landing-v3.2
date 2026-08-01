// ============================================================================
// EDENKINGDOM AI TRANSLATION FRAMEWORK
// Global Translation Configuration
// ============================================================================

import type { TranslationConfig } from "../types/Config";

export const TRANSLATION_CONFIG: TranslationConfig = {
  //-----------------------------------------------------
  // Idioma padrão
  //-----------------------------------------------------

  defaultLanguage: "pt",

  fallbackLanguage: "en",

  autoDetectLanguage: true,

  //-----------------------------------------------------
  // Tradução
  //-----------------------------------------------------

  enableAI: true,

  enableCache: true,

  enableGlossary: true,

  enableReview: true,

  enableHtmlProtection: true,

  enableMarkdownProtection: true,

  enableJsonProtection: true,

  enablePlaceholderProtection: true,

  //-----------------------------------------------------
  // Qualidade
  //-----------------------------------------------------

  preserveFormatting: true,

  preserveVariables: true,

  preserveLinks: true,

  preserveEmoji: true,

  preserveLineBreaks: true,

  preserveHtmlAttributes: true,

  preserveMarkdownSyntax: true,

  //-----------------------------------------------------
  // Performance
  //-----------------------------------------------------

  maxCharactersPerRequest: 12000,

  maxBatchSize: 30,

  parallelRequests: 4,

  timeout: 30000,

  retries: 3,

  retryDelay: 1000,

  //-----------------------------------------------------
  // Logs
  //-----------------------------------------------------

  debug: false,

  logRequests: false,

  logResponses: false,

  logErrors: true,

  //-----------------------------------------------------
  // Segurança
  //-----------------------------------------------------

  sanitizeInput: true,

  sanitizeOutput: true,

  validateHtml: true,

  validateJson: true,

  validateMarkdown: true,
};

export default TRANSLATION_CONFIG;