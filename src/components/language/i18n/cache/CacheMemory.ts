// ============================================================================
// EDENKINGDOM AI TRANSLATION FRAMEWORK
// Memory Cache
// ============================================================================

import { CacheEntry } from "../types/Cache";

export class CacheMemory {

    private cache = new Map<string, CacheEntry>();

    get(key: string): CacheEntry | null {

        return this.cache.get(key) ?? null;

    }

    set(key: string, value: CacheEntry): void {

        this.cache.set(key, value);

    }

    has(key: string): boolean {

        return this.cache.has(key);

    }

    delete(key: string): void {

        this.cache.delete(key);

    }

    clear(): void {

        this.cache.clear();

    }

    keys(): string[] {

        return [...this.cache.keys()];

    }

    values(): CacheEntry[] {

        return [...this.cache.values()];

    }

    size(): number {

        return this.cache.size;

    }

}