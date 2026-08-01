/**
 * ============================================================
 * Glossary Types
 * EdenKingDom AI Translation Framework
 * ============================================================
 */

export type GlossaryAction =
    | "translate"
    | "ignore"
    | "protect"
    | "replace";

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

    terms: GlossaryTerm[];

    createdAt?: Date;

    updatedAt?: Date;

}