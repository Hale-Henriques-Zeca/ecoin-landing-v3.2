import { AIProvider } from "./AIProvider";
import { ProviderFactory, ProviderType } from "./ProviderFactory";

export class ProviderManager {

    private providers: Map<string, AIProvider> = new Map();

    constructor() {

        ProviderFactory.createAll().forEach(provider => {

            this.providers.set(provider.id, provider);

        });

    }

    /**
     * Inicializa todos os providers.
     */
    async initialize(): Promise<void> {

        for (const provider of this.providers.values()) {

            if (!provider.enabled) continue;

            await provider.initialize();

        }

    }

    /**
     * Finaliza todos os providers.
     */
    async destroy(): Promise<void> {

        for (const provider of this.providers.values()) {

            await provider.destroy();

        }

    }

    /**
     * Retorna todos os providers.
     */
    getAll(): AIProvider[] {

        return [...this.providers.values()];

    }

    /**
     * Retorna apenas os ativos.
     */
    getEnabled(): AIProvider[] {

        return this
            .getAll()
            .filter(provider => provider.enabled);

    }

    /**
     * Retorna ordenados pela prioridade.
     */
    getPrioritized(): AIProvider[] {

        return this
            .getEnabled()
            .sort((a, b) => a.priority - b.priority);

    }

    /**
     * Obtém um provider pelo ID.
     */
    get(id: ProviderType | string): AIProvider {

        const provider = this.providers.get(id);

        if (!provider) {

            throw new Error(`Provider '${id}' not found.`);

        }

        return provider;

    }

    /**
     * Verifica se existe.
     */
    has(id: string): boolean {

        return this.providers.has(id);

    }

    /**
     * Retorna o provider principal.
     */
    getPrimary(): AIProvider {

        const provider = this.getPrioritized()[0];

        if (!provider) {

            throw new Error("No provider enabled.");

        }

        return provider;

    }

    /**
     * Escolhe automaticamente um provider saudável.
     */
    async getAvailable(): Promise<AIProvider> {

        const providers = this.getPrioritized();

        for (const provider of providers) {

            const health = await provider.health();

            if (health.healthy) {

                return provider;

            }

        }

        throw new Error("No healthy provider available.");

    }

    /**
     * Lista IDs.
     */
    ids(): string[] {

        return this.getAll().map(provider => provider.id);

    }

    /**
     * Lista nomes.
     */
    names(): string[] {

        return this.getAll().map(provider => provider.name);

    }

}