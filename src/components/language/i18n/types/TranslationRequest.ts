/**
 * ============================================================================
 * Translation Request
 * EdenKingDom AI Translation Framework
 * ============================================================================
 */

import type { TranslationOptions } from "./Config";

export interface TranslationRequest {
  /**
   * Texto original.
   */
  text: string;

  /**
   * Idioma de origem.
   *
   * Exemplo:
   * en
   */
  sourceLanguage: string;

  /**
   * Idioma de destino.
   *
   * Exemplo:
   * pt
   */
  targetLanguage: string;

  /**
   * Aplicação.
   *
   * Exemplo:
   * eSocial
   */
  application?: string;

  /**
   * Namespace.
   *
   * Exemplo:
   * common
   */
  namespace?: string;

  /**
   * Opções da tradução.
   */
  options?: TranslationOptions;

  /**
   * Prioridade da fila.
   */
  priority?: number;

  /**
   * Permite utilizar cache.
   */
  cache?: boolean;

  /**
   * Utilizar glossário.
   */
  glossary?: boolean;

  /**
   * Data de criação.
   */
  createdAt?: Date;
}