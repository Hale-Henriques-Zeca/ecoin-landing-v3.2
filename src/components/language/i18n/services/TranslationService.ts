import { TranslationEngine } from "../engine/TranslationEngine";

export class TranslationService {

    private readonly engine = new TranslationEngine();

    /**
     * Inicializa o serviço.
     */
    async initialize(): Promise<void> {

        await this.engine.initialize();

    }

    /**
     * Traduz um único texto.
     */
    async translate(

        text: string,

        language: string

    ): Promise<string> {

        return this.engine.translate(

            text,

            language

        );

    }

    /**
     * Traduz vários textos.
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