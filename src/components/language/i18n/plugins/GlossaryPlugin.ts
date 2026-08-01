import { Plugin } from "../types/Plugin";
import GlossaryService from "../services/GlossaryService";
import GlossaryMatcher from "../glossary/GlossaryMatcher";

export default class GlossaryPlugin implements Plugin {

    public readonly name = "GlossaryPlugin";

    private glossary: GlossaryService;

    private matcher: GlossaryMatcher;

    constructor() {

        this.glossary = new GlossaryService();

        this.matcher = new GlossaryMatcher();

    }

    /**
     * Executado antes da tradução.
     */
    async beforeTranslate(text: string): Promise<string> {

        const glossary = await this.glossary.load();

        this.matcher.load(glossary);

        /**
         * 1
         * Proteger termos KEEP
         */
        let result = this.matcher.protect(text);

        /**
         * 2
         * Aplicar REPLACE
         */
        result = this.matcher.replace(result);

        /**
         * 3
         * Aplicar IGNORE
         */
        result = this.matcher.ignore(result);

        return result;

    }

    /**
     * Executado depois da tradução.
     */
    async afterTranslate(text: string): Promise<string> {

        return this.matcher.restore(text);

    }

}