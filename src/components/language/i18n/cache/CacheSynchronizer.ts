// ============================================================================
// EDENKINGDOM AI TRANSLATION FRAMEWORK
// Cache Synchronizer
// ============================================================================

import { CacheEntry } from "../types/Cache";

import { CacheMemory } from "./CacheMemory";
import { CacheLocalStorage } from "./CacheLocalStorage";
import { CacheSupabase } from "./CacheSupabase";

export class CacheSynchronizer {

    constructor(

        private memory: CacheMemory,

        private local: CacheLocalStorage,

        private supabase: CacheSupabase

    ) {}

    /**
     * Guarda em todas as camadas.
     */
    async save(entry: CacheEntry): Promise<void> {

        this.memory.set(entry.hash, entry);

        this.local.set(entry.hash, entry);

        await this.supabase.save(entry);

    }

    /**
     * Remove de todas as camadas.
     */
    async delete(hash: string): Promise<void> {

        this.memory.delete(hash);

        this.local.delete(hash);

        // Procura primeiro no banco

        const dbEntry = await this.supabase.get(

            entry.application,

            entry.languageCode,

            hash

        );

        if (dbEntry) {

            await this.supabase.delete(dbEntry.id);

        }

    }

    /**
     * Limpa memória e navegador.
     */
    clearLocal(): void {

        this.memory.clear();

        this.local.clear();

    }

    /**
     * Atualiza todas as camadas.
     */
    async refresh(entry: CacheEntry): Promise<void> {

        this.memory.set(entry.hash, entry);

        this.local.set(entry.hash, entry);

        await this.supabase.update(

            entry.id,

            entry

        );

    }

    /**
     * Pré-carrega traduções do Supabase
     * para a memória.
     */
    async warmup(

        application: string,

        language: string,

        hashes: string[]

    ) {

        for (const hash of hashes) {

            const translation = await this.supabase.get(

                application,

                language,

                hash

            );

            if (translation) {

                this.memory.set(

                    hash,

                    translation

                );

            }

        }

    }

}