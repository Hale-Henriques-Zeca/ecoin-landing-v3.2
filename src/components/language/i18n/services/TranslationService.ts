
// ============================================================================
// EDENKINGDOM AI TRANSLATION FRAMEWORK
// TranslationService.ts
//
// Frontend Service Layer
// TranslationService -> TranslationEngine -> /api/translate
//
// OpenAI, Supabase, Glossary and persistent Cache: BACKEND ONLY
// ============================================================================

import { TranslationEngine } from "../engine/TranslationEngine";

import type { TranslationRequest } from "../types/TranslationRequest";
import type { TranslationResult } from "../types/TranslationResult";

// ============================================================================
// CONFIGURATION
// ============================================================================

const MAX_BATCH_CONCURRENCY = 4;

// ============================================================================
// TRANSLATION SERVICE
// ============================================================================

export class TranslationService {

    private readonly engine = new TranslationEngine();

    // ------------------------------------------------------------------------
    // Initialization
    // ------------------------------------------------------------------------

    async initialize(): Promise<void> {
        await this.engine.initialize();
    }

    // ------------------------------------------------------------------------
    // Single Translation
    // ------------------------------------------------------------------------

    async translate(
        request: TranslationRequest
    ): Promise<TranslationResult> {

        if (!request || typeof request.text !== "string") {
            throw new Error("Invalid translation request.");
        }

        if (!request.targetLanguage?.trim()) {
            throw new Error("Target language is required.");
        }

        const startTime = Date.now();

        const sourceLanguage =
            request.sourceLanguage?.trim() || "auto";

        const targetLanguage =
            request.targetLanguage.trim().toLowerCase();

        const translatedText = request.text.trim()
            ? await this.engine.translate(
                request.text,
                targetLanguage,
                sourceLanguage
            )
            : request.text;

        const duration = Date.now() - startTime;

        return {
            originalText: request.text,
            translatedText,
            sourceLanguage,
            targetLanguage,

            // Backend metadata is not currently returned by the engine.
            // These values must not be interpreted as verified API metrics.
            provider: request.provider ?? "default",
            model: undefined,
            cached: false,
            glossaryApplied: false,
            duration,
            tokens: undefined,
            cost: undefined,
            createdAt: new Date(),
        };
    }

    // ------------------------------------------------------------------------
    // HTML Translation
    // ------------------------------------------------------------------------

    async translateHtml(
        html: string,
        target: string
    ): Promise<string> {

        const result = await this.translate({
            text: html,
            sourceLanguage: "auto",
            targetLanguage: target,
        });

        return result.translatedText;
    }

    // ------------------------------------------------------------------------
    // Markdown Translation
    // ------------------------------------------------------------------------

    async translateMarkdown(
        markdown: string,
        target: string
    ): Promise<string> {

        const result = await this.translate({
            text: markdown,
            sourceLanguage: "auto",
            targetLanguage: target,
        });

        return result.translatedText;
    }

    // ------------------------------------------------------------------------
    // JSON Translation
    // ------------------------------------------------------------------------

    async translateJson<T>(
        object: T,
        target: string
    ): Promise<T> {

        const json = JSON.stringify(object);

        if (json === undefined) {
            throw new Error(
                "The supplied value cannot be serialized to JSON."
            );
        }

        const result = await this.translate({
            text: json,
            sourceLanguage: "auto",
            targetLanguage: target,
        });

        try {
            return JSON.parse(result.translatedText) as T;
        } catch {
            throw new Error(
                "Translation returned invalid JSON."
            );
        }
    }

    // ------------------------------------------------------------------------
    // Preview
    // ------------------------------------------------------------------------

    async preview(
        request: TranslationRequest
    ): Promise<TranslationResult> {

        return this.translate(request);
    }

    // ------------------------------------------------------------------------
    // Batch Translation
    // ------------------------------------------------------------------------

    async batchTranslate(
        requests: TranslationRequest[]
    ): Promise<TranslationResult[]> {

        if (!Array.isArray(requests)) {
            throw new Error("Requests must be an array.");
        }

        if (requests.length === 0) {
            return [];
        }

        const results: TranslationResult[] =
            new Array(requests.length);

        let nextIndex = 0;

        const worker = async (): Promise<void> => {

            while (true) {

                const index = nextIndex++;

                if (index >= requests.length) {
                    return;
                }

                results[index] = await this.translate(
                    requests[index]
                );
            }
        };

        const workers = Array.from(
            {
                length: Math.min(
                    MAX_BATCH_CONCURRENCY,
                    requests.length
                ),
            },
            () => worker()
        );

        await Promise.all(workers);

        return results;
    }

    // ------------------------------------------------------------------------
    // Translate Many
    // ------------------------------------------------------------------------

    async translateMany(
        texts: string[],
        language: string
    ): Promise<string[]> {

        return this.engine.translateMany(
            texts,
            language
        );
    }

    // ------------------------------------------------------------------------
    // Warmup
    // ------------------------------------------------------------------------

    async warmup(
        texts: string[],
        language: string
    ): Promise<void> {

        await this.engine.warmup(
            texts,
            language
        );
    }

    // ------------------------------------------------------------------------
    // Cache Management
    // ------------------------------------------------------------------------

    async clearCache(): Promise<void> {

        // The backend owns the persistent translation cache.
        // Never expose an unprotected cache deletion endpoint.

        await this.engine.clearCache();
    }

    // ------------------------------------------------------------------------
    // Language Configuration
    // ------------------------------------------------------------------------

    setTargetLanguage(language: string): void {

        this.engine.setTargetLanguage(language);
    }

    getTargetLanguage(): string {

        return this.engine.getTargetLanguage();
    }

    // ------------------------------------------------------------------------
    // Queue
    // ------------------------------------------------------------------------

    async enqueue(
        text: string,
        targetLanguage?: string,
        priority = 0
    ): Promise<void> {

        await this.engine.enqueue(
            text,
            targetLanguage ?? this.engine.getTargetLanguage(),
            priority
        );
    }

    async processQueue(): Promise<void> {

        await this.engine.processQueue();
    }

    // ------------------------------------------------------------------------
    // Shutdown
    // ------------------------------------------------------------------------

    async shutdown(): Promise<void> {

        await this.engine.shutdown();
    }
}

// ============================================================================
// EXPORT
// ============================================================================

export default TranslationService;
