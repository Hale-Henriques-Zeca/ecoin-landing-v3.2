import { CacheManager } from "../cache/CacheManager";

export class CacheService {

    private readonly cache = new CacheManager();

    /**
     * Obtém um valor do cache.
     */
    async get<T = any>(

        key: string

    ): Promise<T | null> {

        return this.cache.get<T>(key);

    }

    /**
     * Guarda um valor.
     */
    async set<T = any>(

        key: string,

        value: T

    ): Promise<void> {

        await this.cache.set(key, value);

    }

    /**
     * Remove um valor.
     */
    async remove(

        key: string

    ): Promise<void> {

        await this.cache.remove(key);

    }

    /**
     * Limpa todo o cache.
     */
    async clear(): Promise<void> {

        await this.cache.clear();

    }

    /**
     * Verifica se existe.
     */
    async has(

        key: string

    ): Promise<boolean> {

        return this.cache.has(key);

    }

    /**
     * Atualiza um valor.
     */
    async refresh<T = any>(

        key: string,

        value: T

    ): Promise<void> {

        await this.cache.remove(key);

        await this.cache.set(key, value);

    }

    /**
     * Estatísticas do cache.
     */
    async stats() {

        return {

            size: await this.cache.size(),

            keys: await this.cache.keys(),

        };

    }

}