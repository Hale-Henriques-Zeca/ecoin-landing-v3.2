// ============================================================================
// EDENKINGDOM AI TRANSLATION FRAMEWORK
// Session Storage
// ============================================================================

import { StorageAdapter } from "./StorageAdapter";

export class SessionStorage<T = any> implements StorageAdapter<T> {

    async initialize(): Promise<void> {}

    async has(key: string): Promise<boolean> {

        return sessionStorage.getItem(key) !== null;

    }

    async get(key: string): Promise<T | null> {

        const value = sessionStorage.getItem(key);

        if (!value) return null;

        return JSON.parse(value);

    }

    async set(key: string, value: T): Promise<void> {

        sessionStorage.setItem(

            key,

            JSON.stringify(value)

        );

    }

    async update(key: string, value: T): Promise<void> {

        await this.set(key, value);

    }

    async delete(key: string): Promise<void> {

        sessionStorage.removeItem(key);

    }

    async clear(): Promise<void> {

        sessionStorage.clear();

    }

    async keys(): Promise<string[]> {

        return Object.keys(sessionStorage);

    }

    async values(): Promise<T[]> {

        return Object.keys(sessionStorage).map(key =>

            JSON.parse(sessionStorage.getItem(key)!)

        );

    }

    async entries(): Promise<[string, T][]> {

        return Object.keys(sessionStorage).map(key => [

            key,

            JSON.parse(sessionStorage.getItem(key)!)

        ]);

    }

    async size(): Promise<number> {

        return sessionStorage.length;

    }

}