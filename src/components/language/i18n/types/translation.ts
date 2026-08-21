/**
 * ============================================================================
 * Translation Types
 * EdenKingdom AI Translation Framework
 * ============================================================================
 */

export type TranslationProvider = "openai";

export type TranslationStatus =
  | "pending"
  | "translating"
  | "translated"
  | "cached"
  | "error";

export interface Translation {
  /**
   * ID
   */
  id: string;

  /**
   * Texto original
   */
  original: string;

  /**
   * Resultado
   */
  translated: string;

  /**
   * Idioma origem
   */
  sourceLanguage: string;

  /**
   * Idioma destino
   */
  targetLanguage: string;

  /**
   * Provider utilizado.
   */
  provider: TranslationProvider;

  /**
   * Modelo IA.
   */
  model?: string;

  /**
   * Cache.
   */
  cached: boolean;

  /**
   * Estado.
   */
  status: TranslationStatus;

  /**
   * Tempo de processamento.
   */
  duration?: number;

  /**
   * Tokens utilizados.
   */
  promptTokens?: number;

  completionTokens?: number;

  totalTokens?: number;

  /**
   * Confiança.
   */
  confidence?: number;

  /**
   * Hash do texto.
   */
  hash?: string;

  /**
   * Erro.
   */
  error?: string;

  /**
   * Datas.
   */
  createdAt?: Date;

  updatedAt?: Date;

  /**
   * Latência do OpenAI.
   */
  providerLatency?: number;

  /**
   * Versão do provider.
   */
  providerVersion?: string;

  /**
   * Cache hit.
   */
  cacheHit?: boolean;

  /**
   * Request ID.
   */
  requestId?: string;

  /**
   * Result ID.
   */
  resultId?: string;

  /**
   * Custo.
   */
  cost?: number;

  /**
   * Glossário aplicado.
   */
  glossaryApplied?: boolean;

  /**
   * Houve retry.
   */
  retried?: boolean;

  /**
   * Número de tentativas.
   */
  attempts?: number;
}