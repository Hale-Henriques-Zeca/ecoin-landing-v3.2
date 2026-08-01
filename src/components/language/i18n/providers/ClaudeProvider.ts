import {
    AIProvider,
    ProviderCapabilities,
    ProviderHealthStatus,
} from "./AIProvider";

import { Translation } from "../types/Translation";
import { TranslationOptions } from "../types/Config";

import { CLAUDE_CONFIG } from "../config/claude.config";

export class ClaudeProvider implements AIProvider {

    readonly id = "claude";

    readonly name = "Anthropic Claude";

    readonly version = "1.0.0";

    readonly priority = 3;

    readonly enabled = CLAUDE_CONFIG.enabled;

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

        console.info("[Claude] initialized");

    }

    async destroy(): Promise<void> {

        console.info("[Claude] destroyed");

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
         * lib/claude.ts
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

            model: CLAUDE_CONFIG.model,

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