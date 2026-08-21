/**
 * ============================================================
 * Cache Types
 * EdenKingDom AI Translation Framework
 * ============================================================
 */

/**
 * Camadas de armazenamento suportadas.
 */
export type CacheStorage =
    | "memory"
    | "localStorage"
    | "sessionStorage"
    | "indexedDB"
    | "supabase";

/**
 * Alias utilizado pela nova arquitetura.
 *
 * Mantemos CacheStorage para compatibilidade
 * com os componentes existentes.
 */
export type CacheStorageType = CacheStorage;


/**
 * Estados possíveis de uma entrada da cache.
 */
export type CacheStatus =
    | "valid"
    | "active"
    | "expired"
    | "stale"
    | "invalid"
    | "invalidated"
    | "deleted";

/**
 * Alias utilizado pela nova arquitetura.
 */
export type CacheEntryStatus = CacheStatus;


/**
 * Entrada principal da cache.
 *
 * Utilizada por:
 *
 * CacheManager
 * TranslationCache
 * CacheMemory
 * CacheLocalStorage
 * CacheSupabase
 * CacheSynchronizer
 */
export interface CacheEntry<T = unknown> {

    /**
     * Identificador único.
     */
    id?: string;

    /**
     * Chave única.
     */
    key: string;

    /**
     * Valor armazenado.
     */
    value: T;

    /**
     * Hash do conteúdo.
     */
    hash?: string;

    /**
     * Aplicação responsável pela entrada.
     *
     * Exemplos:
     * eCoin
     * eSocial
     * ePay
     */
    application?: string;

    /**
     * Idioma de origem.
     */
    sourceLanguage?: string;

    /**
     * Idioma de destino / idioma associado.
     */
    language?: string;

    /**
     * Texto original.
     */
    original?: string;

    /**
     * Provider responsável pela tradução.
     */
    provider?: string;

    /**
     * Modelo utilizado.
     */
    model?: string;

    /**
     * Storage utilizado.
     */
    storage: CacheStorage;

    /**
     * Tempo de vida.
     *
     * Mantemos a unidade atualmente utilizada
     * pela framework: segundos.
     */
    ttl: number;

    /**
     * Estado da entrada.
     */
    status: CacheStatus;

    /**
     * Indica se o resultado veio da cache.
     */
    cached?: boolean;

    /**
     * Número de acessos.
     */
    hits?: number;

    /**
     * Data de criação.
     */
    createdAt: Date;

    /**
     * Data de expiração.
     */
    expiresAt: Date;

    /**
     * Última atualização.
     */
    updatedAt?: Date;

    /**
     * Último acesso.
     *
     * Campo legado.
     */
    lastAccess?: Date;

    /**
     * Último acesso.
     *
     * Nome utilizado pela nova arquitetura.
     */
    lastAccessedAt?: Date;

}


/**
 * Estatísticas globais da cache.
 */
export interface CacheStatistics {

    /**
     * Estrutura atual / compatibilidade.
     */
    totalEntries: number;

    validEntries: number;

    expiredEntries: number;

    deletedEntries: number;

    memoryUsage: number;

    hits: number;

    misses: number;

    hitRate: number;


    /**
     * Novas informações opcionais.
     */
    size?: number;

    keys?: string[];

    expired?: number;

    memoryEntries?: number;

    localStorageEntries?: number;

    supabaseEntries?: number;

}


/**
 * Configuração global da cache.
 */
export interface CacheOptions {

    /**
     * Cache ativada?
     */
    enabled?: boolean;

    /**
     * TTL padrão.
     */
    ttl?: number;

    /**
     * Número máximo de entradas.
     */
    maxEntries?: number;

    /**
     * Utilizar cache em memória.
     */
    memory?: boolean;

    /**
     * Utilizar LocalStorage.
     */
    localStorage?: boolean;

    /**
     * Utilizar Supabase.
     */
    supabase?: boolean;

}


/**
 * Resultado de uma consulta à cache.
 */
export interface CacheResult<T = unknown> {

    /**
     * Entrada encontrada.
     */
    entry: CacheEntry<T> | null;

    /**
     * Houve cache hit?
     */
    hit: boolean;

    /**
     * Storage onde a entrada foi encontrada.
     */
    storage?: CacheStorage;

}