/**
 * ============================================================================
 * Translation Result
 * EdenKingdom AI Translation Framework
 * ============================================================================
 */

export interface TranslationResult {
  /**
   * Texto original.
   */
  originalText: string;

  /**
   * Texto traduzido.
   */
  translatedText: string;

  /**
   * Idioma origem.
   */
  sourceLanguage: string;

  /**
   * Idioma destino.
   */
  targetLanguage: string;

  /**
   * Provider utilizado.
   *
   * Arquitetura atual:
   * OpenAI
   */
  provider: "openai";

  /**
   * Modelo utilizado.
   */
  model?: string;

  /**
   * Tradução proveniente do cache.
   */
  cached: boolean;

  /**
   * Glossário aplicado.
   */
  glossaryApplied: boolean;

  /**
   * Tempo da tradução.
   */
  duration: number;

  /**
   * Tokens consumidos.
   */
  tokens?: number;

  /**
   * Custo estimado.
   */
  cost?: number;

  /**
   * Data da tradução.
   */
  createdAt: Date;
}