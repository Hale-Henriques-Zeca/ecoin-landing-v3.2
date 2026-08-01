import { CacheManager } from "../cache/CacheManager";
import { Translation } from "../types/Translation";

export class TranslationCache {

    constructor(
        private readonly cache = new CacheManager()
    ) {}

    /**
     * Procura uma tradução no cache.
     */
    async get(key: string): Promise<Translation | null> {

        return await this.cache.get<Translation>(key);

    }

    /**
     * Guarda uma tradução.
     */
    async set(

        key: string,

        translation: Translation

    ): Promise<void> {

        await this.cache.set(key, translation);

    }

    /**
     * Remove uma tradução.
     */
    async remove(key: string): Promise<void> {

        await this.cache.remove(key);

    }

    /**
     * Verifica existência.
     */
    async has(key: string): Promise<boolean> {

        return await this.cache.has(key);

    }

    /**
     * Limpa o cache.
     */
    async clear(): Promise<void> {

        await this.cache.clear();

    }

    /**
     * Atualiza uma tradução.
     */
    async refresh(

        key: string,

        translation: Translation

    ): Promise<void> {

        await this.remove(key);

        await this.set(key, translation);

    }

}