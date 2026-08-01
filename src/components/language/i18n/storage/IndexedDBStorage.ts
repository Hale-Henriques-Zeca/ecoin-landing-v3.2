// ============================================================================
// EDENKINGDOM AI TRANSLATION FRAMEWORK
// IndexedDB Storage
// ============================================================================

import { StorageAdapter } from "./StorageAdapter";

export class IndexedDBStorage<T = any> implements StorageAdapter<T> {

    private readonly databaseName: string;

    private readonly storeName: string;

    private db: IDBDatabase | null = null;

    constructor(

        databaseName = "EdenKingDomTranslationDB",

        storeName = "translations"

    ) {

        this.databaseName = databaseName;

        this.storeName = storeName;

    }

    async initialize(): Promise<void> {

        if (this.db) return;

        this.db = await new Promise<IDBDatabase>((resolve, reject) => {

            const request = indexedDB.open(this.databaseName, 1);

            request.onerror = () => reject(request.error);

            request.onsuccess = () => resolve(request.result);

            request.onupgradeneeded = () => {

                const db = request.result;

                if (!db.objectStoreNames.contains(this.storeName)) {

                    db.createObjectStore(this.storeName);

                }

            };

        });

    }

    private async store(mode: IDBTransactionMode): Promise<IDBObjectStore> {

        await this.initialize();

        const tx = this.db!.transaction(this.storeName, mode);

        return tx.objectStore(this.storeName);

    }

    async has(key: string): Promise<boolean> {

        return (await this.get(key)) !== null;

    }

    async get(key: string): Promise<T | null> {

        const store = await this.store("readonly");

        return new Promise(resolve => {

            const request = store.get(key);

            request.onsuccess = () => {

                resolve(request.result ?? null);

            };

            request.onerror = () => resolve(null);

        });

    }

    async set(key: string, value: T): Promise<void> {

        const store = await this.store("readwrite");

        await new Promise<void>((resolve, reject) => {

            const request = store.put(value, key);

            request.onsuccess = () => resolve();

            request.onerror = () => reject(request.error);

        });

    }

    async update(key: string, value: T): Promise<void> {

        await this.set(key, value);

    }

    async delete(key: string): Promise<void> {

        const store = await this.store("readwrite");

        await new Promise<void>((resolve, reject) => {

            const request = store.delete(key);

            request.onsuccess = () => resolve();

            request.onerror = () => reject(request.error);

        });

    }

    async clear(): Promise<void> {

        const store = await this.store("readwrite");

        await new Promise<void>((resolve, reject) => {

            const request = store.clear();

            request.onsuccess = () => resolve();

            request.onerror = () => reject(request.error);

        });

    }

    async keys(): Promise<string[]> {

        const store = await this.store("readonly");

        return new Promise(resolve => {

            const request = store.getAllKeys();

            request.onsuccess = () =>

                resolve(request.result.map(String));

            request.onerror = () => resolve([]);

        });

    }

    async values(): Promise<T[]> {

        const store = await this.store("readonly");

        return new Promise(resolve => {

            const request = store.getAll();

            request.onsuccess = () =>

                resolve(request.result);

            request.onerror = () => resolve([]);

        });

    }

    async entries(): Promise<[string, T][]> {

        const keys = await this.keys();

        const values = await this.values();

        return keys.map((key, index) => [

            key,

            values[index]

        ]);

    }

    async size(): Promise<number> {

        const keys = await this.keys();

        return keys.length;

    }

}