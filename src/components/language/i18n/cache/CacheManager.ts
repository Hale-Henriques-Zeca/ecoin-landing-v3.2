// ============================================================================
// EDENKINGDOM AI TRANSLATION FRAMEWORK
// Cache Manager
// ============================================================================

import { CacheEntry } from "../types/Cache";

import { CacheMemory } from "./CacheMemory";
import { CacheLocalStorage } from "./CacheLocalStorage";
import { CacheSupabase } from "./CacheSupabase";
import { CacheSynchronizer } from "./CacheSynchronizer";

export class CacheManager {

    private memory: CacheMemory;

    private local: CacheLocalStorage;

    private supabase: CacheSupabase;

    private synchronizer: CacheSynchronizer;

    constructor() {

        this.memory = new CacheMemory();

        this.local = new CacheLocalStorage();

        this.supabase = new CacheSupabase();

        this.synchronizer = new CacheSynchronizer(

            this.memory,

            this.local,

            this.supabase

        );

    }

    /**
     * Procura uma tradução.
     */
    async get(

        application: string,

        language: string,

        hash: string

    ): Promise<CacheEntry | null> {

        //----------------------------------------------------
        // Memory
        //----------------------------------------------------

        if (this.memory.has(hash)) {

            return this.memory.get(hash);

        }

        //----------------------------------------------------
        // Browser
        //----------------------------------------------------

        if (this.local.has(hash)) {

            const cached = this.local.get(hash);

            if (cached) {

                this.memory.set(hash, cached);

                return cached;

            }

        }

        //----------------------------------------------------
        // Supabase
        //----------------------------------------------------

        const database = await this.supabase.get(

            application,

            language,

            hash

        );

        if (database) {

            this.memory.set(hash, database);

            this.local.set(hash, database);

            return database;

        }

        return null;

    }

    /**
     * Guarda em todas as camadas.
     */
    async save(

        entry: CacheEntry

    ): Promise<void> {

        await this.synchronizer.save(entry);

    }

    /**
     * Atualiza.
     */
    async update(

        entry: CacheEntry

    ): Promise<void> {

        await this.synchronizer.refresh(entry);

    }

    /**
     * Remove.
     */
    async delete(

        application: string,

        language: string,

        hash: string

    ): Promise<void> {

        await this.synchronizer.delete(

            application,

            language,

            hash

        );

    }

    /**
     * Existe?
     */
    async exists(

        application: string,

        language: string,

        hash: string

    ): Promise<boolean> {

        const result = await this.get(

            application,

            language,

            hash

        );

        return result !== null;

    }

    /**
     * Limpa cache local.
     */
    clear(): void {

        this.synchronizer.clearLocal();

    }

    /**
     * Pré-carrega.
     */
    async warmup(

        application: string,

        language: string,

        hashes: string[]

    ): Promise<void> {

        await this.synchronizer.warmup(

            application,

            language,

            hashes

        );

    }

}