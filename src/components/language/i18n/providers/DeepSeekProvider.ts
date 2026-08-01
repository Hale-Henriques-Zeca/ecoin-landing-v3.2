import {
    AIProvider,
    ProviderCapabilities,
    ProviderHealthStatus,
} from "./AIProvider";

import { Translation } from "../types/Translation";

import { TranslationOptions } from "../types/Config";

import { DEEPSEEK_CONFIG } from "../config/deepseek.config";

export class DeepSeekProvider implements AIProvider {

    readonly id = "deepseek";

    readonly name = "DeepSeek AI";

    readonly version = "1.0.0";

    readonly priority = 4;

    readonly enabled = DEEPSEEK_CONFIG.enabled;

    readonly capabilities: ProviderCapabilities = {

        translate: true,

        glossary: true,

        html: true,

        markdown: true,

        json: true,

        streaming: true,

        functions: true,

        vision: true,

    };

    async initialize(): Promise<void> {

        console.info("[DeepSeek] initialized");

    }

    async destroy(): Promise<void> {

        console.info("[DeepSeek] destroyed");

    }

    async translate(

        text: string,

        source: string,

        target: string,

        options?: TranslationOptions

    ): Promise<Translation> {

        /**
         * Futuramente:
         *
         * lib/deepseek.ts
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

            model: DEEPSEEK_CONFIG.model,

            confidence: 1,

            tokens: 0,

            cached: false,

            reviewed: false,

            createdAt: Date.now(),

            updatedAt: Date.now(),

        };

    }

    async health(): Promise<ProviderHealthStatus> {

        return {

            healthy: true,

            latency: 0,

            message: "OK",

            lastCheck: Date.now(),

        };

    }

    supports(feature: keyof ProviderCapabilities): boolean {

        return this.capabilities[feature];

    }

}