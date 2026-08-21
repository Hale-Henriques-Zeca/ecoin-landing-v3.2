import { CacheService } from "../services/CacheService";

import type {
    CacheEntry,
    CacheStatistics,
} from "../types/Cache";

export default class CacheAPI {

    /**
     * Obtém um item da cache.
     */
    static async get<T = unknown>(
        key: string
    ): Promise<T | null> {

        return CacheService.get<T>(key);

    }

    /**
     * Guarda um item na cache.
     */
    static async set<T = unknown>(
        key: string,
        value: T
    ): Promise<void> {

        await CacheService.set(key, value);

    }

    /**
     * Remove um item da cache.
     */
    static async remove(
        key: string
    ): Promise<void> {

        await CacheService.remove(key);

    }

    /**
     * Limpa completamente a cache.
     */
    static async clear(): Promise<void> {

        await CacheService.clear();

    }

    /**
     * Verifica se uma chave existe.
     */
    static async has(
        key: string
    ): Promise<boolean> {

        return CacheService.has(key);

    }

    /**
     * Lista todas as entradas da cache.
     */
    static async entries(): Promise<CacheEntry[]> {

        return CacheService.entries();

    }

    /**
     * Estatísticas da cache.
     */
    static async statistics(): Promise<CacheStatistics> {

        return CacheService.statistics();

    }

    /**
     * Recarrega a cache.
     */
    static async reload(): Promise<void> {

        await CacheService.reload();

    }

}