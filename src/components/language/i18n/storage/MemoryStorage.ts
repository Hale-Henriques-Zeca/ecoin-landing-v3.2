// ============================================================================
// Memory Storage
// ============================================================================

import { StorageAdapter } from "./StorageAdapter";

export class MemoryStorage<T = any> implements StorageAdapter<T> {

    private storage = new Map<string, T>();

    async initialize(): Promise<void> {}

    async has(key: string): Promise<boolean> {

        return this.storage.has(key);

    }

    async get(key: string): Promise<T | null> {

        return this.storage.get(key) ?? null;

    }

    async set(key: string, value: T): Promise<void> {

        this.storage.set(key, value);

    }

    async update(key: string, value: T): Promise<void> {

        this.storage.set(key, value);

    }

    async delete(key: string): Promise<void> {

        this.storage.delete(key);

    }

    async clear(): Promise<void> {

        this.storage.clear();

    }

    async keys(): Promise<string[]> {

        return [...this.storage.keys()];

    }

    async values(): Promise<T[]> {

        return [...this.storage.values()];

    }

    async entries(): Promise<[string, T][]> {

        return [...this.storage.entries()];

    }

    async size(): Promise<number> {

        return this.storage.size;

    }

}