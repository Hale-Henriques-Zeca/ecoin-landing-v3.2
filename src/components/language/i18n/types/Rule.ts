/**
 * ============================================================
 * Rule Types
 * EdenKingDom AI Translation Framework
 * ============================================================
 */

export type RuleType =
    | "replace"
    | "ignore"
    | "protect"
    | "regex"
    | "custom";

export type RuleStatus =
    | "enabled"
    | "disabled";

export interface Rule {

    /**
     * ID
     */
    id: string;

    /**
     * Nome
     */
    name: string;

    /**
     * Descrição
     */
    description?: string;

    /**
     * Tipo
     */
    type: RuleType;

    /**
     * Valor original
     */
    pattern: string;

    /**
     * Substituição
     */
    replacement?: string;

    /**
     * Regex
     */
    regex?: RegExp;

    /**
     * Sensível a maiúsculas
     */
    caseSensitive?: boolean;

    /**
     * Prioridade
     */
    priority: number;

    /**
     * Ativa
     */
    status: RuleStatus;

    /**
     * Criado
     */
    createdAt?: Date;

    /**
     * Atualizado
     */
    updatedAt?: Date;

}