// ============================================================================
// EDENKINGDOM AI TRANSLATION FRAMEWORK
// Provider Repository
// ============================================================================

import { Provider } from "../types/Provider";
import { StorageAdapter } from "../storage/StorageAdapter";

export class ProviderRepository {

    constructor(

        private storage: StorageAdapter<Provider>

    ) {}

    async save(

        provider: Provider

    ): Promise<void> {

        await this.storage.set(

            provider.id,

            provider

        );

    }

    async update(

        provider: Provider

    ): Promise<void> {

        await this.storage.update(

            provider.id,

            provider

        );

    }

    async find(

        id: string

    ): Promise<Provider | null> {

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

    async values(): Promise<Provider[]> {

        return this.storage.values();

    }

    async entries(): Promise<[string, Provider][]> {

        return this.storage.entries();

    }

}