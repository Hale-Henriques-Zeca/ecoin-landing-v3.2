import { TranslationEngine } from "../engine/TranslationEngine";

import type { TranslationRequest } from "../types/TranslationRequest";
import type { TranslationResult } from "../types/TranslationResult";

export class TranslationService {

    private readonly engine = new TranslationEngine();

    /**
     * Inicializa o serviço.
     */
    async initialize(): Promise<void> {

        await this.engine.initialize();

    }

    /**
     * Traduz uma única solicitação.
     */
    async translate(
        request: TranslationRequest
    ): Promise<TranslationResult> {

        const startTime = Date.now();

        const translatedText = await this.engine.translate(
            request.text,
            request.targetLanguage
        );

        const duration = Date.now() - startTime;

        return {

            originalText: request.text,

            translatedText,

            sourceLanguage: request.sourceLanguage,

            targetLanguage: request.targetLanguage,

            provider: request.provider ?? "default",

            model: undefined,

            cached: false,

            glossaryApplied: request.glossary ?? false,

            duration,

            tokens: undefined,

            cost: undefined,

            createdAt: new Date(),

        };

    }

    /**
     * Traduz HTML.
     */
    async translateHtml(
        html: string,
        target: string
    ): Promise<string> {

        const request: TranslationRequest = {

            text: html,

            sourceLanguage: "auto",

            targetLanguage: target,

        };

        const result = await this.translate(request);

        return result.translatedText;

    }

    /**
     * Traduz Markdown.
     */
    async translateMarkdown(
        markdown: string,
        target: string
    ): Promise<string> {

        const request: TranslationRequest = {

            text: markdown,

            sourceLanguage: "auto",

            targetLanguage: target,

        };

        const result = await this.translate(request);

        return result.translatedText;

    }

    /**
     * Traduz um objeto JSON.
     */
    async translateJson<T>(
        object: T,
        target: string
    ): Promise<T> {

        const json = JSON.stringify(object);

        const request: TranslationRequest = {

            text: json,

            sourceLanguage: "auto",

            targetLanguage: target,

        };

        const result = await this.translate(request);

        return JSON.parse(result.translatedText) as T;

    }

    /**
     * Pré-visualização da tradução.
     */
    async preview(
        request: TranslationRequest
    ): Promise<TranslationResult> {

        return this.translate(request);

    }

    /**
     * Tradução em lote.
     */
    async batchTranslate(
        requests: TranslationRequest[]
    ): Promise<TranslationResult[]> {

        return Promise.all(

            requests.map(
                request => this.translate(request)
            )

        );

    }

    /**
     * Traduz vários textos simples.
     */
    async translateMany(
        texts: string[],
        language: string
    ): Promise<string[]> {

        return this.engine.translateMany(
            texts,
            language
        );

    }

    /**
     * Pré-carrega cache.
     */
    async warmup(
        texts: string[],
        language: string
    ): Promise<void> {

        await this.engine.warmup(
            texts,
            language
        );

    }

    /**
     * Limpa cache.
     */
    async clearCache(): Promise<void> {

        await this.engine.clearCache();

    }

    /**
     * Finaliza recursos.
     */
    async shutdown(): Promise<void> {

        await this.engine.shutdown();

    }

}