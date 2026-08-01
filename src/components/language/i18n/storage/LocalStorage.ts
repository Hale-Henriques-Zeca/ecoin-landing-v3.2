// ============================================================================
// Browser LocalStorage
// ============================================================================

import { StorageAdapter } from "./StorageAdapter";

export class LocalStorage<T = any> implements StorageAdapter<T> {

    async initialize(): Promise<void> {}

    async has(key: string): Promise<boolean> {

        return localStorage.getItem(key) !== null;

    }

    async get(key: string): Promise<T | null> {

        const value = localStorage.getItem(key);

        if (!value) return null;

        return JSON.parse(value);

    }

    async set(key: string, value: T): Promise<void> {

        localStorage.setItem(

            key,

            JSON.stringify(value)

        );

    }

    async update(key: string, value: T): Promise<void> {

        await this.set(key, value);

    }

    async delete(key: string): Promise<void> {

        localStorage.removeItem(key);

    }

    async clear(): Promise<void> {

        localStorage.clear();

    }

    async keys(): Promise<string[]> {

        return Object.keys(localStorage);

    }

    async values(): Promise<T[]> {

        return Object.keys(localStorage).map(key =>

            JSON.parse(localStorage.getItem(key)!)

        );

    }

    async entries(): Promise<[string, T][]> {

        return Object.keys(localStorage).map(key => [

            key,

            JSON.parse(localStorage.getItem(key)!)

        ]);

    }

    async size(): Promise<number> {

        return localStorage.length;

    }

}