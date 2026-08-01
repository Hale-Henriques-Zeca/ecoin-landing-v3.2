import { AIProvider } from "./AIProvider";

import { OpenAIProvider } from "./OpenAIProvider";
import { GeminiProvider } from "./GeminiProvider";
import { ClaudeProvider } from "./ClaudeProvider";
import { DeepSeekProvider } from "./DeepSeekProvider";

export type ProviderType =
    | "openai"
    | "gemini"
    | "claude"
    | "deepseek";

export class ProviderFactory {

    /**
     * Cria uma instância do provider solicitado.
     */
    static create(provider: ProviderType): AIProvider {

        switch (provider) {

            case "openai":
                return new OpenAIProvider();

            case "gemini":
                return new GeminiProvider();

            case "claude":
                return new ClaudeProvider();

            case "deepseek":
                return new DeepSeekProvider();

            default:
                throw new Error(
                    `Unknown provider: ${provider}`
                );

        }

    }

    /**
     * Retorna todos os providers disponíveis.
     */
    static createAll(): AIProvider[] {

        return [

            new OpenAIProvider(),

            new GeminiProvider(),

            new ClaudeProvider(),

            new DeepSeekProvider()

        ];

    }

    /**
     * Retorna apenas os providers ativos.
     */
    static enabled(): AIProvider[] {

        return this
            .createAll()
            .filter(provider => provider.enabled);

    }

    /**
     * Retorna os providers ordenados por prioridade.
     */
    static prioritized(): AIProvider[] {

        return this
            .enabled()
            .sort((a, b) => a.priority - b.priority);

    }

    /**
     * Procura um provider pelo id.
     */
    static find(id: string): AIProvider | undefined {

        return this
            .createAll()
            .find(provider => provider.id === id);

    }

    /**
     * Verifica se um provider existe.
     */
    static exists(id: string): boolean {

        return this.find(id) !== undefined;

    }

    /**
     * Lista os IDs disponíveis.
     */
    static ids(): string[] {

        return this
            .createAll()
            .map(provider => provider.id);

    }

    /**
     * Lista os nomes disponíveis.
     */
    static names(): string[] {

        return this
            .createAll()
            .map(provider => provider.name);

    }

}