
// ============================================================================
// EDENKINGDOM AI TRANSLATION FRAMEWORK
// Translation Engine
//
// Architecture: OPENAI ONLY
// Layer: Frontend Translation Engine
// Communication: Next.js API Route
// Backend: TranslationPipeline + OpenAIProvider
// ============================================================================

import { TranslationQueue } from "./TranslationQueue";

// ============================================================================
// CONFIGURATION
// ============================================================================

const TRANSLATION_ENDPOINT = "/api/translate";

const MAX_CONCURRENT_TRANSLATIONS = 4;

// ============================================================================
// TYPES
// ============================================================================

interface TranslationAPIResponse {
    translatedText?: string;
    error?: string;
}

interface TranslationAPIRequest {
    text: string;
    source: string;
    target: string;
}

// ============================================================================
// TRANSLATION ENGINE
// ============================================================================

export class TranslationEngine {

    // ------------------------------------------------------------------------
    // Dependencies
    // ------------------------------------------------------------------------

    private readonly queue: TranslationQueue;

    // ------------------------------------------------------------------------
    // State
    // ------------------------------------------------------------------------

    private initialized = false;

    private initializationPromise: Promise<void> | null = null;

    private targetLanguage = "pt";

    // ------------------------------------------------------------------------
    // Constructor
    // ------------------------------------------------------------------------

    constructor() {

        this.queue = new TranslationQueue();

    }

    // ------------------------------------------------------------------------
    // Initialization
    // ------------------------------------------------------------------------

    async initialize(): Promise<void> {

        if (this.initialized) {
            return;
        }

        if (!this.initializationPromise) {

            this.initializationPromise = Promise.resolve()
                .then(() => {

                    this.initialized = true;

                    console.info(
                        "[TranslationEngine] initialized successfully"
                    );

                })
                .catch((error) => {

                    this.initializationPromise = null;

                    throw error;

                });

        }

        await this.initializationPromise;

    }

    // ------------------------------------------------------------------------
    // Shutdown
    // ------------------------------------------------------------------------

    async shutdown(): Promise<void> {

        this.initialized = false;

        this.initializationPromise = null;

        console.info(
            "[TranslationEngine] shutdown completed"
        );

    }

    // ------------------------------------------------------------------------
    // Language
    // ------------------------------------------------------------------------

    setTargetLanguage(language: string): void {

        if (!language?.trim()) {
            return;
        }

        this.targetLanguage = language
            .trim()
            .toLowerCase();

    }

    getTargetLanguage(): string {

        return this.targetLanguage;

    }

    // ------------------------------------------------------------------------
    // Internal HTTP Translation
    // ------------------------------------------------------------------------

    private async requestTranslation(
        request: TranslationAPIRequest
    ): Promise<string> {

        await this.initialize();

        if (!request.text?.trim()) {
            return request.text;
        }

        if (!request.target?.trim()) {

            throw new Error(
                "Target language is required."
            );

        }

        try {

            const response = await fetch(
                TRANSLATION_ENDPOINT,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify(request),

                    cache: "no-store",

                }
            );

            let data: TranslationAPIResponse;

            try {

                data = await response.json();

            } catch {

                throw new Error(
                    "Invalid response from translation server."
                );

            }

            if (!response.ok) {

                throw new Error(
                    data.error ??
                    `Translation request failed: ${response.status}`
                );

            }

            if (
                typeof data.translatedText !== "string" ||
                !data.translatedText.trim()
            ) {

                throw new Error(
                    "Translation server returned an empty result."
                );

            }

            return data.translatedText;

        } catch (error) {

            console.error(
                "[TranslationEngine] Translation failed:",
                error
            );

            throw error;

        }

    }

    // ------------------------------------------------------------------------
    // Single Translation
    // ------------------------------------------------------------------------

    async translate(
        text: string,
        targetLanguage = this.targetLanguage,
        sourceLanguage = "auto"
    ): Promise<string> {

        if (!text?.trim()) {
            return "";
        }

        return this.requestTranslation({

            text,

            source: sourceLanguage,

            target: targetLanguage,

        });

    }

    // ------------------------------------------------------------------------
    // Batch Translation
    // ------------------------------------------------------------------------

    async translateMany(
        texts: string[],
        targetLanguage = this.targetLanguage,
        sourceLanguage = "auto"
    ): Promise<string[]> {

        if (!Array.isArray(texts) || texts.length === 0) {
            return [];
        }

        const results: string[] = new Array(texts.length);

        let nextIndex = 0;

        const worker = async (): Promise<void> => {

            while (true) {

                const index = nextIndex++;

                if (index >= texts.length) {
                    return;
                }

                results[index] = await this.translate(
                    texts[index],
                    targetLanguage,
                    sourceLanguage
                );

            }

        };

        const workers = Array.from(
            {
                length: Math.min(
                    MAX_CONCURRENT_TRANSLATIONS,
                    texts.length
                ),
            },
            () => worker()
        );

        await Promise.all(workers);

        return results;

    }

    // ------------------------------------------------------------------------
    // Translation Queue
    // ------------------------------------------------------------------------

    async enqueue(
        text: string,
        targetLanguage = this.targetLanguage,
        priority = 0
    ): Promise<void> {

        if (!text?.trim()) {
            return;
        }

        this.queue.add({

            id: crypto.randomUUID(),

            priority,

            execute: async () => {

                await this.translate(
                    text,
                    targetLanguage
                );

            },

        });

    }

    async processQueue(): Promise<void> {

        await this.queue.process();

    }

    // ------------------------------------------------------------------------
    // Warmup
    // ------------------------------------------------------------------------

    async warmup(
        texts: string[],
        language = this.targetLanguage
    ): Promise<void> {

        if (!texts.length) {
            return;
        }

        await this.translateMany(
            texts,
            language
        );

    }

    // ------------------------------------------------------------------------
    // Cache Management
    // ------------------------------------------------------------------------

    async clearCache(): Promise<void> {

        throw new Error(
            "Translation cache is managed by the backend. " +
            "A dedicated cache management endpoint is required."
        );

    }

}

// ============================================================================
// EXPORT
// ============================================================================

export default TranslationEngine;
