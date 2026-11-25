
// ============================================================================
// EDENKINGDOM AI TRANSLATION FRAMEWORK
// OpenAI Translation Provider
//
// Responsibilities:
// - Execute AI translations
// - Respect EdenKingdom glossary
// - Apply terminology actions
// - Preserve formatting and placeholders
// - Support private glossary integration
//
// ============================================================================

import OpenAI from "openai";

import {
    AIProvider,
    ProviderCapabilities,
    ProviderHealthStatus,
} from "./AIProvider";

import type { Translation } from "../types/Translation";

import type { TranslationOptions } from "../types/Config";

import type { GlossaryTerm } from "../types/Glossary";

import {
    GlossaryAction,
} from "../constants/actions";

import { OPENAI_CONFIG } from "../config/openai.config";

// ============================================================================
// OPENAI PROVIDER
// ============================================================================

export class OpenAIProvider implements AIProvider {

    readonly id = OPENAI_CONFIG.id;

    readonly name = OPENAI_CONFIG.name;

    readonly version = "1.0.0";

    readonly priority = 1;

    private client: OpenAI | null = null;

    // =========================================================================
    // PROVIDER STATUS
    // =========================================================================

    get enabled(): boolean {

        return OPENAI_CONFIG.enabled;

    }

    // =========================================================================
    // CAPABILITIES
    // =========================================================================

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

    // =========================================================================
    // CONSTRUCTOR
    // =========================================================================

    constructor() {

        // OpenAI client is initialized later.
        // This avoids premature API key validation.

    }

    // =========================================================================
    // INITIALIZE
    // =========================================================================

    async initialize(): Promise<void> {

        if (!this.enabled) {

            throw new Error(
                "EdenKingdom OpenAI Provider está desativado."
            );

        }

        const apiKey =
            process.env.OPENAI_API_KEY;

        if (!apiKey) {

            throw new Error(
                "OPENAI_API_KEY não está configurada."
            );

        }

        this.client = new OpenAI({

            apiKey,

        });

        console.info(
            `[${this.name}] initialized successfully.`
        );

    }

    // =========================================================================
    // DESTROY
    // =========================================================================

    async destroy(): Promise<void> {

        this.client = null;

        console.info(
            `[${this.name}] destroyed`
        );

    }

    // =========================================================================
    // BUILD GLOSSARY INSTRUCTIONS
    // =========================================================================

    private buildGlossaryInstructions(
        glossary: GlossaryTerm[]
    ): string {

        if (!glossary.length) {

            return "No matching glossary terms were found.";

        }

        const instructions: string[] = [];

        for (const item of glossary) {

            if (!item.enabled) {
                continue;
            }

            switch (item.action) {

                // ------------------------------------------------------------
                // TRANSLATE
                // ------------------------------------------------------------

                case GlossaryAction.TRANSLATE:

                    instructions.push(
                        `TRANSLATE: When translating "${item.source}", ` +
                        `prefer the official EdenKingdom terminology "${item.target}".`
                    );

                    break;

                // ------------------------------------------------------------
                // KEEP
                // ------------------------------------------------------------

                case GlossaryAction.KEEP:

                    instructions.push(
                        `KEEP: Preserve "${item.source}" exactly as written. ` +
                        `Never translate or modify it.`
                    );

                    break;

                // ------------------------------------------------------------
                // PROTECT
                // ------------------------------------------------------------

                case GlossaryAction.PROTECT:

                    instructions.push(
                        `PROTECT: Preserve "${item.source}" exactly as written. ` +
                        `It is a protected EdenKingdom expression.`
                    );

                    break;

                // ------------------------------------------------------------
                // REPLACE
                // ------------------------------------------------------------

                case GlossaryAction.REPLACE:

                    if (!item.target.trim()) {
                        break;
                    }

                    instructions.push(
                        `REPLACE: Replace "${item.source}" with ` +
                        `"${item.target}" exactly. Do not invent alternatives.`
                    );

                    break;

                // ------------------------------------------------------------
                // IGNORE
                // ------------------------------------------------------------

                case GlossaryAction.IGNORE:

                    // IGNORE terms must not influence translation.

                    break;

                default:

                    break;

            }

        }

        if (!instructions.length) {

            return "No applicable glossary instructions.";

        }

        return [
            "OFFICIAL EDENKINGDOM TERMINOLOGY RULES:",
            "",
            "Follow the action assigned to each term.",
            "Do not confuse KEEP, PROTECT, REPLACE and TRANSLATE.",
            "Preserve the original meaning and context.",
            "",
            ...instructions.map(
                (instruction, index) =>
                    `${index + 1}. ${instruction}`
            ),
        ].join("\n");

    }

    // =========================================================================
    // TRANSLATE
    // =========================================================================

    async translate(
        text: string,
        source: string,
        target: string,
        options?: TranslationOptions
    ): Promise<Translation> {

        if (!this.enabled) {

            throw new Error(
                "EdenKingdom OpenAI Provider está desativado."
            );

        }

        if (!this.client) {

            throw new Error(
                "OpenAIProvider não foi inicializado. Execute initialize() primeiro."
            );

        }

        if (!text.trim()) {

            throw new Error(
                "O texto para tradução está vazio."
            );

        }

        const model =
            options?.model ??
            OPENAI_CONFIG.defaultModel;

        try {

            // ---------------------------------------------------------------
            // 1. Get glossary terms
            // ---------------------------------------------------------------

            const glossary: GlossaryTerm[] =
                options?.glossary ?? [];

            // ---------------------------------------------------------------
            // 2. Build terminology instructions
            // ---------------------------------------------------------------

            const glossaryInstruction =
                this.buildGlossaryInstructions(
                    glossary
                );

            // ---------------------------------------------------------------
            // 3. Build system instructions
            // ---------------------------------------------------------------

            const systemInstruction = `

You are EdenKingdom Translation AI.

Your task is to translate text accurately.

TRANSLATION RULES:

1. Translate only.
2. Never explain.
3. Never summarize.
4. Never add commentary.
5. Never invent additional content.

PRESERVE EXACTLY:

- Formatting
- Placeholders
- Variables
- HTML
- Markdown
- JSON structure
- Line breaks
- Numbers
- URLs
- Product names
- Technical identifiers

LANGUAGE CONFIGURATION:

Source language:
${source}

Target language:
${target}

OFFICIAL GLOSSARY:

${glossaryInstruction}

TERMINOLOGY PRIORITY:

- KEEP and PROTECT expressions must remain unchanged.
- REPLACE expressions must use their specified target.
- TRANSLATE expressions must prefer their official target terminology.
- IGNORE expressions must not influence the translation.

Do not modify terminology that is explicitly protected.

Return only the translated text.

`;

            // ---------------------------------------------------------------
            // 4. Execute OpenAI Responses API
            // ---------------------------------------------------------------

            const response =
                await this.client.responses.create({

                    model,

                    input: [

                        {

                            role: "system",

                            content: systemInstruction,

                        },

                        {

                            role: "user",

                            content: text,

                        },

                    ],

                });

            // ---------------------------------------------------------------
            // 5. Extract translated text
            // ---------------------------------------------------------------

            const translated =
                response.output_text.trim();

            if (!translated) {

                throw new Error(
                    "OpenAI retornou uma tradução vazia."
                );

            }

            // ---------------------------------------------------------------
            // 6. Build translation result
            // ---------------------------------------------------------------

            const now = new Date();

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

    // =========================================================================
    // HEALTH
    // =========================================================================

    async health(): Promise<ProviderHealthStatus> {

        return {

            healthy:
                this.enabled &&
                !!this.client &&
                !!process.env.OPENAI_API_KEY,

            latency:
                0,

            lastCheck:
                Date.now(),

            message:
                !this.enabled
                    ? "Provider disabled"
                    : this.client
                        ? "OK"
                        : "Provider not initialized",

        };

    }

    // =========================================================================
    // SUPPORTS
    // =========================================================================

    supports(
        feature: keyof ProviderCapabilities
    ): boolean {

        return !!this.capabilities[feature];

    }

}
