import { TranslationPipeline } from "./TranslationPipeline";
import { TranslationQueue } from "./TranslationQueue";
import { ProviderManager } from "../providers/ProviderManager";
import { GlossaryService } from "../glossary/GlossaryService";
import { TranslationCache } from "./TranslationCache";

export class TranslationEngine {

    private readonly pipeline = new TranslationPipeline();

    private readonly queue = new TranslationQueue();

    private readonly providers = new ProviderManager();

    private readonly glossary = new GlossaryService();

    private readonly cache = new TranslationCache();

    /**
     * Inicializa toda a framework.
     */
    async initialize(): Promise<void> {

        await this.providers.initialize();

        await this.glossary.load();

    }

    /**
     * Finaliza todos os recursos.
     */
    async shutdown(): Promise<void> {

        await this.providers.destroy();

    }

    /**
     * Traduz um texto.
     */
    async translate(

        text: string,

        targetLanguage: string

    ): Promise<string> {

        return this.pipeline.execute(

            text,

            targetLanguage

        );

    }

    /**
     * Traduz vários textos.
     */
    async translateMany(

        texts: string[],

        targetLanguage: string

    ): Promise<string[]> {

        const result: string[] = [];

        for (const text of texts) {

            result.push(

                await this.translate(

                    text,

                    targetLanguage

                )

            );

        }

        return result;

    }

    /**
     * Traduz utilizando fila.
     */
    async enqueue(

        text: string,

        targetLanguage: string,

        priority = 0

    ): Promise<void> {

        this.queue.add({

            id: crypto.randomUUID(),

            priority,

            execute: async () => {

                await this.translate(

                    text,

                    targetLanguage

                );

            }

        });

    }

    /**
     * Processa a fila.
     */
    async processQueue(): Promise<void> {

        await this.queue.process();

    }

    /**
     * Pré-carrega traduções.
     */
    async warmup(

        texts: string[],

        language: string

    ): Promise<void> {

        await this.translateMany(

            texts,

            language

        );

    }

    /**
     * Limpa o cache.
     */
    async clearCache(): Promise<void> {

        await this.cache.clear();

    }

    /**
     * Verifica se existe cache.
     */
    async hasCache(

        key: string

    ): Promise<boolean> {

        return this.cache.has(key);

    }

}