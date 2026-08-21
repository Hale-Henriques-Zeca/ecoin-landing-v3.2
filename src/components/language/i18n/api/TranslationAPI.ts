import { TranslationService }
    from "../services/TranslationService";

import type { TranslationRequest }
    from "../types/TranslationRequest";

import type { TranslationResult }
    from "../types/TranslationResult";

export default class TranslationAPI {

    private static readonly service =
        new TranslationService();

    /**
     * Tradução simples
     */
    static async translate(
        request: TranslationRequest
    ): Promise<TranslationResult> {

        return this.service.translate(request);

    }

    /**
     * Tradução HTML
     */
    static async translateHtml(
        html: string,
        target: string
    ): Promise<string> {

        return this.service.translateHtml(
            html,
            target
        );

    }

    /**
     * Tradução Markdown
     */
    static async translateMarkdown(
        markdown: string,
        target: string
    ): Promise<string> {

        return this.service.translateMarkdown(
            markdown,
            target
        );

    }

    /**
     * Tradução JSON
     */
    static async translateJson<T>(
        object: T,
        target: string
    ): Promise<T> {

        return this.service.translateJson(
            object,
            target
        );

    }

    /**
     * Pré-visualização
     */
    static async preview(
        request: TranslationRequest
    ): Promise<TranslationResult> {

        return this.service.preview(request);

    }

    /**
     * Tradução em lote
     */
    static async batchTranslate(
        requests: TranslationRequest[]
    ): Promise<TranslationResult[]> {

        return this.service.batchTranslate(
            requests
        );

    }

}