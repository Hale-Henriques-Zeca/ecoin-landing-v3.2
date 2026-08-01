/**
 * ============================================================
 * Cache Types
 * EdenKingDom AI Translation Framework
 * ============================================================
 */

export type CacheStorage =
    | "memory"
    | "localStorage"
    | "sessionStorage"
    | "indexedDB"
    | "supabase";

export type CacheStatus =
    | "valid"
    | "expired"
    | "invalid"
    | "deleted";

export interface CacheEntry<T = unknown> {

    /**
     * Chave única
     */
    key: string;

    /**
     * Valor armazenado
     */
    value: T;

    /**
     * Hash
     */
    hash?: string;

    /**
     * Storage utilizado
     */
    storage: CacheStorage;

    /**
     * Tempo de vida (segundos)
     */
    ttl: number;

    /**
     * Data de criação
     */
    createdAt: Date;

    /**
     * Data de expiração
     */
    expiresAt: Date;

    /**
     * Último acesso
     */
    lastAccess?: Date;

    /**
     * Número de acessos
     */
    hits?: number;

    /**
     * Estado
     */
    status: CacheStatus;

}

export interface CacheStatistics {

    totalEntries: number;

    validEntries: number;

    expiredEntries: number;

    deletedEntries: number;

    memoryUsage: number;

    hits: number;

    misses: number;

    hitRate: number;

}