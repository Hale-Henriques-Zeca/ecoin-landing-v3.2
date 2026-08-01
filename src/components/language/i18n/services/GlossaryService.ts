import { GlossaryTerm } from "../types/Glossary";

import { GlossaryLoader } from "../glossary/GlossaryLoader";
import { GlossaryMatcher } from "../glossary/GlossaryMatcher";
import { GlossaryCompiler } from "../glossary/GlossaryCompiler";

export class GlossaryService {

    private readonly loader = new GlossaryLoader();

    private readonly matcher = new GlossaryMatcher();

    private readonly compiler = new GlossaryCompiler();

    /**
     * Carrega todo o glossário.
     */
    async load(): Promise<void> {

        await this.loader.load();

    }

    /**
     * Recarrega o glossário.
     */
    async reload(): Promise<void> {

        await this.loader.reload();

    }

    /**
     * Compila o glossário para utilização rápida.
     */
    async compile(): Promise<void> {

        await this.compiler.compile();

    }

    /**
     * Obtém todos os termos.
     */
    getAll(): GlossaryTerm[] {

        return this.loader.getAll();

    }

    /**
     * Procura um termo.
     */
    find(term: string): GlossaryTerm | undefined {

        return this.loader.find(term);

    }

    /**
     * Verifica existência.
     */
    exists(term: string): boolean {

        return this.loader.exists(term);

    }

    /**
     * Verifica se está protegido.
     */
    isProtected(term: string): boolean {

        const item = this.find(term);

        if (!item) {

            return false;

        }

        return item.action === "KEEP";

    }

    /**
     * Protege texto.
     */
    async protect(

        text: string

    ): Promise<string> {

        return this.matcher.protect(text);

    }

    /**
     * Faz substituições.
     */
    async replace(

        text: string

    ): Promise<string> {

        return this.matcher.replace(text);

    }

    /**
     * Localiza termos.
     */
    match(text: string): GlossaryTerm[] {

        return this.matcher.match(text);

    }

    /**
     * Valida um texto.
     */
    validate(text: string): boolean {

        return this.matcher.validate(text);

    }

}