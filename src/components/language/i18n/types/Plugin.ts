/**
 * ============================================================
 * Plugin Types
 * EdenKingDom AI Translation Framework
 * ============================================================
 */

import type { Translation } from "./Translation";

export type PluginStage =
    | "beforeTranslate"
    | "afterTranslate"
    | "beforeCache"
    | "afterCache"
    | "beforeRender"
    | "afterRender";

export interface PluginContext {

    sourceLanguage: string;

    targetLanguage: string;

    provider: string;

    metadata?: Record<string, unknown>;

}

export interface PluginResult {

    success: boolean;

    translation: Translation;

    message?: string;

}

export interface Plugin {

    /**
     * ID
     */
    id: string;

    /**
     * Nome
     */
    name: string;

    /**
     * Versão
     */
    version: string;

    /**
     * Autor
     */
    author?: string;

    /**
     * Descrição
     */
    description?: string;

    /**
     * Ativo
     */
    enabled: boolean;

    /**
     * Ordem de execução
     */
    priority: number;

    /**
     * Etapa
     */
    stage: PluginStage;

    /**
     * Executa o plugin
     */
    execute(
        translation: Translation,
        context: PluginContext
    ): Promise<PluginResult>;

}