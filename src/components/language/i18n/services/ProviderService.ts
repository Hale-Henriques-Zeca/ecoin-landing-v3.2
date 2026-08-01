import { AIProvider } from "../providers/AIProvider";
import { ProviderManager } from "../providers/ProviderManager";

export class ProviderService {

    private readonly manager = new ProviderManager();

    /**
     * Inicializa todos os providers.
     */
    async initialize(): Promise<void> {

        await this.manager.initialize();

    }

    /**
     * Finaliza todos os providers.
     */
    async shutdown(): Promise<void> {

        await this.manager.destroy();

    }

    /**
     * Obtém o provider principal.
     */
    getPrimary(): AIProvider {

        return this.manager.getPrimary();

    }

    /**
     * Obtém o melhor provider disponível.
     */
    async getAvailable(): Promise<AIProvider> {

        return this.manager.getAvailable();

    }

    /**
     * Lista todos os providers.
     */
    getAll(): AIProvider[] {

        return this.manager.getAll();

    }

    /**
     * Lista apenas os ativos.
     */
    getEnabled(): AIProvider[] {

        return this.manager.getEnabled();

    }

    /**
     * Obtém um provider pelo ID.
     */
    get(id: string): AIProvider {

        return this.manager.get(id);

    }

    /**
     * Verifica se existe.
     */
    exists(id: string): boolean {

        return this.manager.has(id);

    }

    /**
     * Lista os IDs.
     */
    ids(): string[] {

        return this.manager.ids();

    }

    /**
     * Lista os nomes.
     */
    names(): string[] {

        return this.manager.names();

    }

}