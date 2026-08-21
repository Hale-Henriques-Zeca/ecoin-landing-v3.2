// ============================================================================
// EDENKINGDOM AI TRANSLATION FRAMEWORK
// OpenAI Translation Provider
// ============================================================================

import OpenAI from "openai";

import {
    AIProvider,
    ProviderCapabilities,
    ProviderHealthStatus,
} from "./AIProvider";

import { Translation } from "../types/Translation";
import { TranslationOptions } from "../types/Config";
import { OPENAI_CONFIG } from "../config/openai.config";

export class OpenAIProvider implements AIProvider {

    readonly id = OPENAI_CONFIG.id;

    readonly name = OPENAI_CONFIG.name;

    readonly version = "1.0.0";

    readonly priority = 1;

    private readonly client: OpenAI;

    get enabled(): boolean {

        return OPENAI_CONFIG.enabled;

    }

    readonly capabilities: ProviderCapabilities = {

        translate: true,

        glossary:
            OPENAI_CONFIG.supportsGlossary,

        html:
            OPENAI_CONFIG.supportsHtml,

        markdown:
            OPENAI_CONFIG.supportsMarkdown,

        json:
            OPENAI_CONFIG.supportsJson,

        streaming:
            OPENAI_CONFIG.supportsStreaming,

        functions:
            OPENAI_CONFIG.supportsFunctions,

        vision:
            OPENAI_CONFIG.supportsVision,

    };

    constructor() {

        this.client = new OpenAI({
            apiKey:
                process.env.OPENAI_API_KEY,
        });

    }

    async initialize(): Promise<void> {

        if (!process.env.OPENAI_API_KEY) {

            throw new Error(
                "OPENAI_API_KEY não está configurada."
            );

        }

        console.info(
            `[${this.name}] initialized`
        );

    }

    async destroy(): Promise<void> {

        console.info(
            `[${this.name}] destroyed`
        );

    }

    async translate(
        text: string,
        source: string,
        target: string,
        options?: TranslationOptions
    ): Promise<Translation> {

        const model =
            options?.model ??
            OPENAI_CONFIG.defaultModel;

        try {

            const glossary =
                options?.glossary ?? [];

            const glossaryInstruction =
                glossary.length > 0
                    ? `
Use the following EdenKingdom glossary
and preserve its terminology exactly:

${JSON.stringify(glossary)}
`
                    : "";

            const response =
                await this.client.responses.create({

                    model,

                    input: [

                        {
                            role: "system",

                            content:
                                `
You are EdenKingdom Translation AI.

Translate only.

Never explain.
Never summarize.
Never add commentary.

Preserve exactly:
- formatting
- placeholders
- variables
- HTML
- Markdown
- JSON structure
- line breaks
- numbers
- URLs
- product names
- technical identifiers

Source language:
${source}

Target language:
${target}

${glossaryInstruction}
`,
                        },

                        {
                            role: "user",

                            content: text,
                        },

                    ],

                });

            const translated =
                response.output_text.trim();

            if (!translated) {

                throw new Error(
                    "OpenAI retornou uma tradução vazia."
                );

            }

            const now =
                new Date();

            return {

                id:
                    crypto.randomUUID(),

                original:
                    text,

                translated,

                sourceLanguage:
                    source,

                targetLanguage:
                    target,

                status:
                    "translated",

                provider:
                    this.id,

                model,

                confidence:
                    undefined,

                cached:
                    false,

                createdAt:
                    now,

                updatedAt:
                    now,

            };

        } catch (error) {

            console.error(
                "[OpenAIProvider] Falha na tradução:",
                error
            );

            throw error;

        }

    }

    async health(): Promise<ProviderHealthStatus> {

        return {

            healthy:
                this.enabled &&
                !!process.env.OPENAI_API_KEY,

            latency:
                0,

            lastCheck:
                Date.now(),

            message:
                this.enabled
                    ? "OK"
                    : "Provider disabled",

        };

    }

    supports(
        feature: keyof ProviderCapabilities
    ): boolean {

        return !!this.capabilities[feature];

    }

}