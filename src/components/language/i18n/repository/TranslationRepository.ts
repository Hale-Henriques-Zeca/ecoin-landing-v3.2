// ============================================================================
// EDENKINGDOM AI TRANSLATION FRAMEWORK
// Translation Repository
// ============================================================================

import { Translation } from "../types/Translation";
import { StorageAdapter } from "../storage/StorageAdapter";

export class TranslationRepository {

    constructor(

        private storage: StorageAdapter<Translation>

    ) {}

    async save(

        translation: Translation

    ): Promise<void> {

        await this.storage.set(

            translation.key,

            translation

        );

    }

    async update(

        translation: Translation

    ): Promise<void> {

        await this.storage.update(

            translation.key,

            translation

        );

    }

    async find(

        key: string

    ): Promise<Translation | null> {

        return this.storage.get(key);

    }

    async exists(

        key: string

    ): Promise<boolean> {

        return this.storage.has(key);

    }

    async remove(

        key: string

    ): Promise<void> {

        await this.storage.delete(key);

    }

    async clear(): Promise<void> {

        await this.storage.clear();

    }

    async count(): Promise<number> {

        return this.storage.size();

    }

    async keys(): Promise<string[]> {

        return this.storage.keys();

    }

    async values(): Promise<Translation[]> {

        return this.storage.values();

    }

    async entries(): Promise<[string, Translation][]> {

        return this.storage.entries();

    }

}