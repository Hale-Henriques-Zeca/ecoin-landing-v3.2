/**
 * ============================================================
 * Provider Priority
 * EdenKingDom AI Translation Framework
 * ============================================================
 */

export enum ProviderPriority {

    /**
     * Prioridade máxima.
     */
    PRIMARY = 1,

    /**
     * Alta prioridade.
     */
    HIGH = 10,

    /**
     * Prioridade normal.
     */
    NORMAL = 50,

    /**
     * Baixa prioridade.
     */
    LOW = 100,

    /**
     * Apenas como fallback.
     */
    FALLBACK = 1000

}