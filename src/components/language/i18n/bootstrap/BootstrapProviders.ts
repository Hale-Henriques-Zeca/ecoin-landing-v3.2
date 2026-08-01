import ProviderManager from "../providers/ProviderManager";

import ProviderFactory from "../providers/ProviderFactory";

export default class BootstrapProviders {

    static initialize(config: any) {

        const manager = new ProviderManager();

        const providers = [

            ProviderFactory.create("openai"),

            ProviderFactory.create("gemini"),

            ProviderFactory.create("claude"),

            ProviderFactory.create("deepseek"),

        ].filter(Boolean);

        for (const provider of providers) {

            manager.register(provider);

        }

        if (config?.providers?.defaultProvider) {

            manager.setDefault(

                config.providers.defaultProvider

            );

        }

        return manager;

    }

}