// ============================================================================
// EDENKINGDOM AI TRANSLATION FRAMEWORK
// Glossary Service
// ============================================================================

import { GlossaryLoader } from "../glossary/GlossaryLoader";
import { GlossaryMatcher } from "../glossary/GlossaryMatcher";
import { GlossaryCompiler } from "../glossary/GlossaryCompiler";
import { GlossaryRepository } from "../repository/GlossaryRepository";
import { GlossaryTerm } from "../types/Glossary";

export class GlossaryService {

    private glossary =
        new Map<string, GlossaryTerm>();

    private matcher: GlossaryMatcher | null = null;

    private readonly loader: GlossaryLoader;

    private readonly compiler: GlossaryCompiler;

    constructor(
        repository: GlossaryRepository
    ) {

        this.loader =
            new GlossaryLoader(repository);

        this.compiler =
            new GlossaryCompiler();

    }

    /**
     * Inicializa o glossário.
     */
    async load(): Promise<void> {

        const terms =
            await this.loader.load();

        this.glossary =
            this.compiler.compile(terms);

        this.matcher =
            new GlossaryMatcher(
                this.glossary
            );

    }

    /**
     * Recarrega o glossário.
     */
    async reload(): Promise<void> {

        await this.load();

    }

    /**
     * Garante que o glossário foi inicializado.
     */
    private ensureLoaded(): GlossaryMatcher {

        if (!this.matcher) {
            throw new Error(
                "GlossaryService ainda não foi inicializado. Execute load() primeiro."
            );
        }

        return this.matcher;

    }

    /**
     * Encontra os termos presentes no texto.
     */
    match(text: string) {

        return this.ensureLoaded().match(text);

    }

    /**
     * Obtém os termos relevantes para uma tradução.
     *
     * O source/target ficam registrados no contrato
     * para permitir evolução futura do glossário por idioma.
     */
    async getForTranslation(
        sourceLanguage: string,
        targetLanguage: string,
        text: string
    ): Promise<GlossaryTerm[]> {

        void sourceLanguage;
        void targetLanguage;

        if (!text.trim()) {
            return [];
        }

        return this.match(text);

    }

    /**
     * Protege termos do glossário.
     */
    protect(text: string): string {

        return this.ensureLoaded().protect(text);

    }

    /**
     * Remove a proteção.
     */
    unprotect(text: string): string {

        return this.ensureLoaded().unprotect(text);

    }

    /**
     * Aplica substituições do glossário.
     */
    replace(text: string): string {

        return this.ensureLoaded().replace(text);

    }

    /**
     * Verifica se um termo existe.
     */
    has(term: string): boolean {

        return this.ensureLoaded().has(term);

    }

    /**
     * Verifica se um termo está protegido.
     */
    isProtected(term: string): boolean {

        return this.ensureLoaded().isProtected(term);

    }

    /**
     * Procura um termo.
     */
    find(term: string) {

        return this.ensureLoaded().find(term);

    }

    /**
     * Retorna todos os termos.
     */
    getAll(): GlossaryTerm[] {

        return [...this.glossary.values()];

    }

}