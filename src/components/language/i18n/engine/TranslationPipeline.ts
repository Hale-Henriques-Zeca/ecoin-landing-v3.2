// ============================================================================
// EDENKINGDOM AI TRANSLATION FRAMEWORK
// Translation Pipeline
// ============================================================================

import { AIProvider } from "../providers/AIProvider";
import { GlossaryService } from "../services/GlossaryService";
import { TranslationCache } from "./TranslationCache";

export interface TranslationPipelineRequest {
    text: string;
    sourceLanguage: string;
    targetLanguage: string;
}

export interface TranslationPipelineDependencies {
    provider: AIProvider;
    glossary: GlossaryService;
    cache: TranslationCache;
}

export class TranslationPipeline {

    private readonly provider: AIProvider;

    private readonly glossary: GlossaryService;

    private readonly cache: TranslationCache;

    constructor({
        provider,
        glossary,
        cache,
    }: TranslationPipelineDependencies) {

        this.provider = provider;
        this.glossary = glossary;
        this.cache = cache;

    }

    /**
     * Executa uma tradução através do pipeline EdenKingdom.
     */
    async execute({
        text,
        sourceLanguage,
        targetLanguage,
    }: TranslationPipelineRequest): Promise<string> {

        if (!text.trim()) {
            return text;
        }

        const source =
            sourceLanguage.trim().toLowerCase();

        const target =
            targetLanguage.trim().toLowerCase();

        /**
         * 1. Cache
         */
        const cacheKey =
            TranslationCache.createKey(
                text,
                source,
                target
            );

        const cached =
            await this.cache.get(cacheKey);

        if (cached) {
            return cached.translated;
        }

        /**
         * 2. Glossário
         */
        const glossaryEntries =
            await this.glossary.getForTranslation(
                source,
                target,
                text
            );

        /**
         * 3. Provider
         */
        if (!this.provider.enabled) {
            throw new Error(
                "EdenKingdom Translation Provider está desativado."
            );
        }

        /**
         * 4. Tradução
         */
        const result =
            await this.provider.translate(
                text,
                source,
                target,
                {
                    glossary: glossaryEntries,
                }
            );

        /**
         * 5. Cache
         */
        await this.cache.set(
            cacheKey,
            result
        );

        return result.translated;
    }

}