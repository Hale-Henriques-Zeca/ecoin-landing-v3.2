// ============================================================================
// EDENKINGDOM AI TRANSLATION FRAMEWORK
// Language Repository
// ============================================================================

import { Language } from "../types/Language";
import { StorageAdapter } from "../storage/StorageAdapter";

export class LanguageRepository {

    constructor(

        private storage: StorageAdapter<Language>

    ) {}

    async save(

        language: Language

    ): Promise<void> {

        await this.storage.set(

            language.code,

            language

        );

    }

    async update(

        language: Language

    ): Promise<void> {

        await this.storage.update(

            language.code,

            language

        );

    }

    async find(

        code: string

    ): Promise<Language | null> {

        return this.storage.get(code);

    }

    async exists(

        code: string

    ): Promise<boolean> {

        return this.storage.has(code);

    }

    async remove(

        code: string

    ): Promise<void> {

        await this.storage.delete(code);

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

    async values(): Promise<Language[]> {

        return this.storage.values();

    }

    async entries(): Promise<[string, Language][]> {

        return this.storage.entries();

    }

}