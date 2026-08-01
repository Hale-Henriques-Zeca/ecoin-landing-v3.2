import TranslationPipeline from "../engine/TranslationPipeline";

import {
    CachePlugin,
    PlaceholderPlugin,
    HtmlPlugin,
    MarkdownPlugin,
    JsonPlugin,
    ReactPlugin,
    GlossaryPlugin,
} from "../plugins";

export default class BootstrapPlugins {

    static initialize() {

        const pipeline = new TranslationPipeline();

        pipeline.use(new CachePlugin());

        pipeline.use(new PlaceholderPlugin());

        pipeline.use(new HtmlPlugin());

        pipeline.use(new MarkdownPlugin());

        pipeline.use(new JsonPlugin());

        pipeline.use(new ReactPlugin());

        pipeline.use(new GlossaryPlugin());

        return pipeline;

    }

}