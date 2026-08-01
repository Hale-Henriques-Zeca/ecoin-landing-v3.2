// ============================================================================
// EDENKINGDOM AI TRANSLATION FRAMEWORK
// Glossary Repository
// ============================================================================

import { GlossaryTerm } from "../types/Glossary";
import { StorageAdapter } from "../storage/StorageAdapter";

export class GlossaryRepository {

    constructor(

        private storage: StorageAdapter<GlossaryTerm>

    ) {}

    async save(

        term: GlossaryTerm

    ): Promise<void> {

        await this.storage.set(

            term.key,

            term

        );

    }

    async update(

        term: GlossaryTerm

    ): Promise<void> {

        await this.storage.update(

            term.key,

            term

        );

    }

    async find(

        key: string

    ): Promise<GlossaryTerm | null> {

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

    async values(): Promise<GlossaryTerm[]> {

        return this.storage.values();

    }

    async entries(): Promise<[string, GlossaryTerm][]> {

        return this.storage.entries();

    }

}