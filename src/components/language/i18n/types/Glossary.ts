/**
 * ============================================================
 * Glossary Types
 * EdenKingdom AI Translation Framework
 * ============================================================
 */

import { GlossaryRule } from "./GlossaryRule";
import { GlossaryEntry } from "./GlossaryEntry";

import type { GlossaryAction } from "../constants/actions";


export interface GlossaryTerm {

  /**
   * ID
   */
  id: string;

  /**
   * Palavra original
   */
  source: string;

  /**
   * Tradução
   */
  target: string;

  /**
   * Idioma origem
   */
  sourceLanguage: string;

  /**
   * Idioma destino
   */
  targetLanguage: string;

  /**
   * Acção
   */
  action: GlossaryAction;

  /**
   * Comentário
   */
  description?: string;

  /**
   * Sensível a maiúsculas
   */
  caseSensitive?: boolean;

  /**
   * Prioridade
   */
  priority: number;

  /**
   * Activo
   */
  enabled: boolean;

  /**
   * Datas
   */
  createdAt?: Date;

  updatedAt?: Date;
}


export interface Glossary {

  id: string;

  name: string;

  version: string;

  description?: string;

  /**
   * Aplicação
   */
  application?: string;

  /**
   * Idioma origem
   */
  sourceLanguage?: string;

  /**
   * Idioma destino
   */
  targetLanguage?: string;

  /**
   * Activo
   */
  enabled?: boolean;

  /**
   * Termos
   */
  terms: GlossaryTerm[];

  /**
   * Regras
   */
  rules?: GlossaryRule[];

  /**
   * Entradas do glossário.
   */
  entries?: GlossaryEntry[];

  /**
   * Total de termos
   */
  totalTerms?: number;

  /**
   * Datas
   */
  createdAt?: Date;

  updatedAt?: Date;
}