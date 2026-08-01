// ============================================================================
// EDENKINGDOM AI TRANSLATION FRAMEWORK
// Rule Repository
// ============================================================================

import { Rule } from "../types/Rule";
import { StorageAdapter } from "../storage/StorageAdapter";

export class RuleRepository {

    constructor(

        private storage: StorageAdapter<Rule>

    ) {}

    async save(

        rule: Rule

    ): Promise<void> {

        await this.storage.set(

            rule.id,

            rule

        );

    }

    async update(

        rule: Rule

    ): Promise<void> {

        await this.storage.update(

            rule.id,

            rule

        );

    }

    async find(

        id: string

    ): Promise<Rule | null> {

        return this.storage.get(id);

    }

    async exists(

        id: string

    ): Promise<boolean> {

        return this.storage.has(id);

    }

    async remove(

        id: string

    ): Promise<void> {

        await this.storage.delete(id);

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

    async values(): Promise<Rule[]> {

        return this.storage.values();

    }

    async entries(): Promise<[string, Rule][]> {

        return this.storage.entries();

    }

}