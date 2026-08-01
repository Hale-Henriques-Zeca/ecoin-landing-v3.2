import { Translation } from "../types/Translation";

import { TranslationCache } from "./TranslationCache";

import { GlossaryService } from "../glossary/GlossaryService";

import { ProviderManager } from "../providers/ProviderManager";

import { TranslationOptimizer } from "./TranslationOptimizer";

import { TranslationRenderer } from "./TranslationRenderer";

export class TranslationPipeline {

    constructor(

        private readonly cache = new TranslationCache(),

        private readonly glossary = new GlossaryService(),

        private readonly providers = new ProviderManager(),

        private readonly optimizer = new TranslationOptimizer(),

        private readonly renderer = new TranslationRenderer()

    ) {}

    /**
     * Executa todo o pipeline de tradução.
     */
    async execute(

        text: string,

        targetLanguage: string

    ): Promise<string> {

        //--------------------------------------------------
        // 1. Cache
        //--------------------------------------------------

        const cacheKey = `${targetLanguage}:${text}`;

        const cached = await this.cache.get(cacheKey);

        if (cached) {

            return cached.translation;

        }

        //--------------------------------------------------
        // 2. Glossário
        //--------------------------------------------------

        const protectedText = await this.glossary.protect(text);

        //--------------------------------------------------
        // 3. Provider
        //--------------------------------------------------

        const provider = await this.providers.getAvailable();

        const translated = await provider.translate(

            protectedText,

            targetLanguage

        );

        //--------------------------------------------------
        // 4. Otimização
        //--------------------------------------------------

        const optimized = await this.optimizer.optimize(

            translated

        );

        //--------------------------------------------------
        // 5. Renderização
        //--------------------------------------------------

        const rendered = await this.renderer.render(

            optimized

        );

        //--------------------------------------------------
        // 6. Cache
        //--------------------------------------------------

        const translation: Translation = {

            key: cacheKey,

            language: targetLanguage,

            translation: rendered,

            isBaseLanguage: false

        };

        await this.cache.set(

            cacheKey,

            translation

        );

        //--------------------------------------------------
        // Resultado
        //--------------------------------------------------

        return rendered;

    }

}