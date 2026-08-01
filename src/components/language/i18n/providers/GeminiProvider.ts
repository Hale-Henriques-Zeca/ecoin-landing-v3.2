import { AIProvider, ProviderCapabilities, ProviderHealthStatus } from "./AIProvider";

import { Translation } from "../types/Translation";

import { TranslationOptions } from "../types/Config";

import { GEMINI_CONFIG } from "../config/gemini.config";

export class GeminiProvider implements AIProvider {

    readonly id = "gemini";

    readonly name = "Google Gemini";

    readonly version = "1.0.0";

    readonly priority = 2;

    readonly enabled = GEMINI_CONFIG.enabled;

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

        console.info("[Gemini] initialized");

    }

    async destroy(): Promise<void> {

        console.info("[Gemini] destroyed");

    }

    async translate(

        text: string,

        source: string,

        target: string,

        options?: TranslationOptions

    ): Promise<Translation> {

        return {

            id: crypto.randomUUID(),

            key: "",

            sourceLanguage: source,

            targetLanguage: target,

            sourceText: text,

            translatedText: text,

            provider: this.id,

            model: GEMINI_CONFIG.model,

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