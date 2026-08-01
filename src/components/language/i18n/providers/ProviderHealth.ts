import { AIProvider, ProviderHealthStatus } from "./AIProvider";

export class ProviderHealth {

    /**
     * Verifica um provider.
     */
    static async check(

        provider: AIProvider

    ): Promise<ProviderHealthStatus> {

        return provider.health();

    }

    /**
     * Verifica vários providers.
     */
    static async checkAll(

        providers: AIProvider[]

    ): Promise<Record<string, ProviderHealthStatus>> {

        const result: Record<string, ProviderHealthStatus> = {};

        for (const provider of providers) {

            result[provider.id] = await provider.health();

        }

        return result;

    }

    /**
     * Retorna apenas providers saudáveis.
     */
    static async healthy(

        providers: AIProvider[]

    ): Promise<AIProvider[]> {

        const available: AIProvider[] = [];

        for (const provider of providers) {

            const health = await provider.health();

            if (health.healthy) {

                available.push(provider);

            }

        }

        return available;

    }

    /**
     * Retorna o provider com menor latência.
     */
    static async fastest(

        providers: AIProvider[]

    ): Promise<AIProvider | undefined> {

        const healthy = await this.healthy(providers);

        if (!healthy.length) {

            return undefined;

        }

        let fastest = healthy[0];

        let bestLatency = (await fastest.health()).latency;

        for (const provider of healthy.slice(1)) {

            const latency = (await provider.health()).latency;

            if (latency < bestLatency) {

                fastest = provider;

                bestLatency = latency;

            }

        }

        return fastest;

    }

}