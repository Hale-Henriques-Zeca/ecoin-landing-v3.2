// ============================================================================
// EDENKINGDOM AI TRANSLATION FRAMEWORK
// Browser LocalStorage Cache
// ============================================================================

import { CacheEntry } from "../types/Cache";

export class CacheLocalStorage {

    constructor(

        private prefix = "ekd.translation."

    ) {}

    private buildKey(key: string): string {

        return `${this.prefix}${key}`;

    }

    get(key: string): CacheEntry | null {

        if (typeof window === "undefined") {

            return null;

        }

        const value = localStorage.getItem(

            this.buildKey(key)

        );

        if (!value) {

            return null;

        }

        return JSON.parse(value);

    }

    set(

        key: string,

        value: CacheEntry

    ): void {

        if (typeof window === "undefined") {

            return;

        }

        localStorage.setItem(

            this.buildKey(key),

            JSON.stringify(value)

        );

    }

    has(key: string): boolean {

        if (typeof window === "undefined") {

            return false;

        }

        return (

            localStorage.getItem(

                this.buildKey(key)

            ) !== null

        );

    }

    delete(key: string): void {

        if (typeof window === "undefined") {

            return;

        }

        localStorage.removeItem(

            this.buildKey(key)

        );

    }

    clear(): void {

        if (typeof window === "undefined") {

            return;

        }

        Object.keys(localStorage)

            .filter(item =>

                item.startsWith(this.prefix)

            )

            .forEach(item =>

                localStorage.removeItem(item)

            );

    }

}