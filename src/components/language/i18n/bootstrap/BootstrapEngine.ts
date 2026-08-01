import TranslationEngine from "../engine/TranslationEngine";

import TranslationPipeline from "../engine/TranslationPipeline";

import TranslationQueue from "../engine/TranslationQueue";

import TranslationRenderer from "../engine/TranslationRenderer";

import TranslationOptimizer from "../engine/TranslationOptimizer";

export default class BootstrapEngine {

    static initialize(context: any) {

        const pipeline = new TranslationPipeline();

        const queue = new TranslationQueue();

        const renderer = new TranslationRenderer();

        const optimizer = new TranslationOptimizer();

        const engine = new TranslationEngine({

            config: context.config,

            providers: context.providers,

            cache: context.cache,

            storage: context.storage,

            services: context.services,

            events: context.events,

            pipeline,

            queue,

            renderer,

            optimizer,

        });

        return engine;

    }

}