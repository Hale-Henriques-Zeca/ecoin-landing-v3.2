import { AIProvider, ProviderCapabilities, ProviderHealthStatus } from "./AIProvider";

import { Translation } from "../types/Translation";
import { TranslationOptions } from "../types/Config";

import { OPENAI_CONFIG } from "../config/openai.config";

export class OpenAIProvider implements AIProvider {

    readonly id = "openai";

    readonly name = "OpenAI";

    readonly version = "1.0.0";

    readonly priority = 1;

    readonly enabled = OPENAI_CONFIG.enabled;

    readonly capabilities: ProviderCapabilities = {

        translate: true,

        glossary: true,

        html: true,

        markdown: true,

        json: true,

        streaming: true,

        functions: true,

        vision: true

    };

    async initialize(): Promise<void> {

        console.info("[OpenAI] initialized");

    }

    async destroy(): Promise<void> {

        console.info("[OpenAI] destroyed");

    }

    async translate(

        text: string,

        source: string,

        target: string,

        options?: TranslationOptions

    ): Promise<Translation> {

        /**
         * O TranslationEngine chamará este método.
         *
         * Aqui será integrado:
         *
         * src/components/language/lib/openai.ts
         *
         */

        return {

            id: crypto.randomUUID(),

            key: "",

            sourceLanguage: source,

            targetLanguage: target,

            sourceText: text,

            translatedText: text,

            provider: this.id,

            model: OPENAI_CONFIG.model,

            confidence: 1,

            tokens: 0,

            cached: false,

            reviewed: false,

            createdAt: Date.now(),

            updatedAt: Date.now()

        };

    }

    async health(): Promise<ProviderHealthStatus> {

        return {

            healthy: true,

            latency: 0,

            lastCheck: Date.now(),

            message: "OK"

        };

    }

    supports(feature: keyof ProviderCapabilities): boolean {

        return this.capabilities[feature];

    }

}