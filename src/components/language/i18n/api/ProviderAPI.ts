import {ProviderService} from "../services/ProviderService";

import type {
    Provider,
    ProviderHealth,
    ProviderPriority,
} from "../types/Provider";

export default class ProviderAPI {

    /**
     * Obtém o provider atualmente ativo.
     */
    static getProvider(): Provider {

        return ProviderService.getCurrentProvider();

    }

    /**
     * Define o provider ativo.
     */
    static async setProvider(
        provider: string
    ): Promise<void> {

        await ProviderService.setProvider(provider);

    }

    /**
     * Lista todos os providers registados.
     */
    static providers(): Provider[] {

        return ProviderService.getProviders();

    }

    /**
     * Estado de saúde dos providers.
     */
    static async health(): Promise<ProviderHealth[]> {

        return ProviderService.health();

    }

    /**
     * Prioridade de utilização dos providers.
     */
    static priority(): ProviderPriority[] {

        return ProviderService.priority();

    }

    /**
     * Verifica se um provider existe.
     */
    static hasProvider(
        provider: string
    ): boolean {

        return ProviderService.has(provider);

    }

    /**
     * Recarrega todos os providers.
     */
    static async reload(): Promise<void> {

        await ProviderService.reload();

    }

}