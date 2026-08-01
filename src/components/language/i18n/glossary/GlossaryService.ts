// ============================================================================
// EDENKINGDOM AI TRANSLATION FRAMEWORK
// Glossary Service
// ============================================================================

import { GlossaryLoader } from "./GlossaryLoader";
import { GlossaryCompiler } from "./GlossaryCompiler";
import { GlossaryMatcher } from "./GlossaryMatcher";
import { GlossaryRepository } from "../repository/GlossaryRepository";
import { GlossaryTerm } from "../types/Glossary";

export class GlossaryService {

    private glossary = new Map<string, GlossaryTerm>();

    private matcher!: GlossaryMatcher;

    private loader: GlossaryLoader;

    private compiler: GlossaryCompiler;

    constructor(

        repository: GlossaryRepository

    ) {

        this.loader = new GlossaryLoader(

            repository

        );

        this.compiler = new GlossaryCompiler();

    }

    /**
     * Inicializa.
     */
    async load(): Promise<void> {

        const terms = await this.loader.load();

        this.glossary = this.compiler.compile(

            terms

        );

        this.matcher = new GlossaryMatcher(

            this.glossary

        );

    }

    /**
     * Recarrega.
     */
    async reload(): Promise<void> {

        await this.load();

    }

    /**
     * Todos os termos encontrados.
     */
    match(text: string) {

        return this.matcher.match(text);

    }

    /**
     * Protege texto.
     */
    protect(text: string): string {

        return this.matcher.protect(text);

    }

    /**
     * Remove proteção.
     */
    unprotect(text: string): string {

        return this.matcher.unprotect(text);

    }

    /**
     * Substituições.
     */
    replace(text: string): string {

        return this.matcher.replace(text);

    }

    /**
     * Existe?
     */
    has(term: string): boolean {

        return this.matcher.has(term);

    }

    /**
     * É protegido?
     */
    isProtected(term: string): boolean {

        return this.matcher.isProtected(term);

    }

    /**
     * Encontrar.
     */
    find(term: string) {

        return this.matcher.find(term);

    }

    /**
     * Todos os termos.
     */
    getAll() {

        return [...this.glossary.values()];

    }

}