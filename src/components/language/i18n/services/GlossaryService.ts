
// ============================================================================
// EDENKINGDOM AI TRANSLATION FRAMEWORK
// Glossary Service
//
// Responsibilities:
// - Load glossary terms
// - Compile glossary
// - Initialize matcher
// - Filter terms by language
// - Provide translation terminology
// - Manage protection and replacements
//
// ============================================================================

import { GlossaryLoader } from "../glossary/GlossaryLoader";

import { GlossaryMatcher } from "../glossary/GlossaryMatcher";

import { GlossaryCompiler } from "../glossary/GlossaryCompiler";

import { GlossaryRepository } from "../repository/GlossaryRepository";

import type { GlossaryTerm } from "../types/Glossary";

// ============================================================================
// GLOSSARY SERVICE
// ============================================================================

export class GlossaryService {

    private glossary =
        new Map<string, GlossaryTerm>();

    private matcher: GlossaryMatcher | null = null;

    private readonly loader: GlossaryLoader;

    private readonly compiler: GlossaryCompiler;

    // =========================================================================
    // CONSTRUCTOR
    // =========================================================================

    constructor(
        repository: GlossaryRepository
    ) {

        this.loader =
            new GlossaryLoader(repository);

        this.compiler =
            new GlossaryCompiler();

    }

    // =========================================================================
    // LANGUAGE NORMALIZATION
    // =========================================================================

    private normalizeLanguage(
        language: string
    ): string {

        return language
            .trim()
            .replace(/_/g, "-")
            .toLowerCase();

    }

    // =========================================================================
    // LANGUAGE COMPATIBILITY
    // =========================================================================

    private languageMatches(
        termLanguage: string,
        requestedLanguage: string
    ): boolean {

        const term =
            this.normalizeLanguage(termLanguage);

        const requested =
            this.normalizeLanguage(requestedLanguage);

        if (
            !requested ||
            requested === "auto"
        ) {
            return true;
        }

        if (term === requested) {
            return true;
        }

        const termBase =
            term.split("-")[0];

        const requestedBase =
            requested.split("-")[0];

        return termBase === requestedBase;

    }

    // =========================================================================
    // LOAD
    // =========================================================================

    async load(): Promise<void> {

        const terms =
            await this.loader.load();

        this.glossary =
            this.compiler.compile(terms);

        this.matcher =
            new GlossaryMatcher(
                this.glossary
            );

        console.info(
            `[GlossaryService] Loaded ${this.glossary.size} glossary terms.`
        );

    }

    // =========================================================================
    // RELOAD
    // =========================================================================

    async reload(): Promise<void> {

        await this.load();

    }

    // =========================================================================
    // ENSURE LOADED
    // =========================================================================

    private ensureLoaded(): GlossaryMatcher {

        if (!this.matcher) {

            throw new Error(
                "GlossaryService ainda não foi inicializado. Execute load() primeiro."
            );

        }

        return this.matcher;

    }

    // =========================================================================
    // MATCH
    // =========================================================================

    match(
        text: string,
        sourceLanguage?: string,
        targetLanguage?: string
    ): GlossaryTerm[] {

        return this.ensureLoaded().match(
            text,
            {
                sourceLanguage,
                targetLanguage,
            }
        );

    }

    // =========================================================================
    // GET FOR TRANSLATION
    // =========================================================================

    async getForTranslation(
        sourceLanguage: string,
        targetLanguage: string,
        text: string
    ): Promise<GlossaryTerm[]> {

        if (!text.trim()) {
            return [];
        }

        const source =
            this.normalizeLanguage(sourceLanguage);

        const target =
            this.normalizeLanguage(targetLanguage);

        const matches =
            this.ensureLoaded().match(
                text,
                {
                    sourceLanguage: source,
                    targetLanguage: target,
                }
            );

        // Final language validation.
        // Prevent incompatible terms from reaching OpenAI.

        return matches.filter(item => {

            if (!item.enabled) {
                return false;
            }

            if (
                !this.languageMatches(
                    item.sourceLanguage,
                    source
                )
            ) {
                return false;
            }

            if (
                !this.languageMatches(
                    item.targetLanguage,
                    target
                )
            ) {
                return false;
            }

            return true;

        });

    }

    // =========================================================================
    // PROTECT
    // =========================================================================

    protect(
        text: string,
        sourceLanguage?: string,
        targetLanguage?: string
    ): string {

        return this.ensureLoaded().protect(
            text,
            {
                sourceLanguage,
                targetLanguage,
            }
        );

    }

    // =========================================================================
    // UNPROTECT
    // =========================================================================

    unprotect(text: string): string {

        return this.ensureLoaded().unprotect(text);

    }

    // =========================================================================
    // REPLACE
    // =========================================================================

    replace(
        text: string,
        sourceLanguage?: string,
        targetLanguage?: string
    ): string {

        return this.ensureLoaded().replace(
            text,
            {
                sourceLanguage,
                targetLanguage,
            }
        );

    }

    // =========================================================================
    // HAS
    // =========================================================================

    has(term: string): boolean {

        return this.ensureLoaded().has(term);

    }

    // =========================================================================
    // IS PROTECTED
    // =========================================================================

    isProtected(term: string): boolean {

        return this.ensureLoaded().isProtected(term);

    }

    // =========================================================================
    // FIND
    // =========================================================================

    find(term: string): GlossaryTerm | undefined {

        return this.ensureLoaded().find(term);

    }

    // =========================================================================
    // GET ALL
    // =========================================================================

    getAll(): GlossaryTerm[] {

        return [...this.glossary.values()];

    }

}
