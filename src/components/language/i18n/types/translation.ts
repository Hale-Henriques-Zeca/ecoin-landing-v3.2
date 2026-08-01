/**
 * ============================================================
 * Translation Types
 * EdenKingDom AI Translation Framework
 * ============================================================
 */

import type { ProviderName } from "./Provider";

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
     * Provider utilizado
     */
    provider: ProviderName;

    /**
     * Modelo IA
     */
    model?: string;

    /**
     * Cache
     */
    cached: boolean;

    /**
     * Estado
     */
    status: TranslationStatus;

    /**
     * Tempo processamento
     */
    duration?: number;

    /**
     * Tokens utilizados
     */
    promptTokens?: number;

    completionTokens?: number;

    totalTokens?: number;

    /**
     * Confiança
     */
    confidence?: number;

    /**
     * Hash do texto
     */
    hash?: string;

    /**
     * Erro
     */
    error?: string;

    /**
     * Datas
     */
    createdAt?: Date;

    updatedAt?: Date;

}