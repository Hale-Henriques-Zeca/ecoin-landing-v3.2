
// ============================================================================
// EDENKINGDOM AI TRANSLATION FRAMEWORK
// Glossary Matching Engine
//
// Responsibilities:
// - Match glossary terms using source
// - Respect case sensitivity
// - Support Unicode and accented characters
// - Respect enabled status
// - Respect language pairs
// - Resolve overlapping terms by priority
// - Apply KEEP / PROTECT / REPLACE actions
//
// ============================================================================

import type { GlossaryTerm } from "../types/Glossary";

import {
    GlossaryAction,
} from "../constants/actions";

// ============================================================================
// TYPES
// ============================================================================

interface MatchOptions {
    sourceLanguage?: string;
    targetLanguage?: string;
}

// ============================================================================
// GLOSSARY MATCHER
// ============================================================================

export class GlossaryMatcher {

    constructor(
        private readonly glossary: Map<string, GlossaryTerm>
    ) {}

    // =========================================================================
    // NORMALIZATION
    // =========================================================================

    private normalize(value: string): string {
        return value.trim().toLowerCase();
    }

    // =========================================================================
    // LANGUAGE MATCHING
    // =========================================================================

    private languageMatches(
        termLanguage: string,
        requestedLanguage?: string
    ): boolean {

        if (
            !requestedLanguage ||
            requestedLanguage.toLowerCase() === "auto"
        ) {
            return true;
        }

        const term = this.normalize(termLanguage);
        const requested = this.normalize(requestedLanguage);

        if (term === requested) {
            return true;
        }

        // Allow locale compatibility:
        // en matches en-US
        // pt matches pt-MZ

        const termBase = term.split("-")[0];
        const requestedBase = requested.split("-")[0];

        return termBase === requestedBase;
    }

    // =========================================================================
    // FILTER TERMS
    // =========================================================================

    private getEligibleTerms(
        options: MatchOptions = {}
    ): GlossaryTerm[] {

        return [...this.glossary.values()]

            .filter(item => {

                if (!item.enabled) {
                    return false;
                }

                if (!item.source.trim()) {
                    return false;
                }

                if (
                    !this.languageMatches(
                        item.sourceLanguage,
                        options.sourceLanguage
                    )
                ) {
                    return false;
                }

                if (
                    !this.languageMatches(
                        item.targetLanguage,
                        options.targetLanguage
                    )
                ) {
                    return false;
                }

                return true;
            })

            // Higher priority first.
            // Longer expressions win when priorities are equal.
            .sort((a, b) => {

                const priorityDifference =
                    b.priority - a.priority;

                if (priorityDifference !== 0) {
                    return priorityDifference;
                }

                return b.source.length - a.source.length;
            });
    }

    // =========================================================================
    // REGEX UTILITIES
    // =========================================================================

    private escapeRegex(value: string): string {

        return value.replace(
            /[.*+?^${}()|[\]\\]/g,
            "\\$&"
        );

    }

    private createSourceRegex(
        source: string,
        caseSensitive = false
    ): RegExp {

        const escaped = this.escapeRegex(source);

        // Unicode-aware word boundaries.
        // Avoid matching terms inside larger words.

        const startsWithWord =
            /^[\p{L}\p{N}_]/u.test(source);

        const endsWithWord =
            /[\p{L}\p{N}_]$/u.test(source);

        const pattern =
            `${startsWithWord ? "(?<![\\p{L}\\p{N}_])" : ""}` +
            escaped +
            `${endsWithWord ? "(?![\\p{L}\\p{N}_])" : ""}`;

        return new RegExp(
            pattern,
            caseSensitive ? "gu" : "giu"
        );

    }

    // =========================================================================
    // FIND
    // =========================================================================

    find(term: string): GlossaryTerm | undefined {

        const normalized = this.normalize(term);

        return [...this.glossary.values()].find(item => {

            return (
                item.id.toLowerCase() === normalized ||
                this.normalize(item.source) === normalized
            );

        });

    }

    // =========================================================================
    // HAS
    // =========================================================================

    has(term: string): boolean {

        return !!this.find(term);

    }

    // =========================================================================
    // IS PROTECTED
    // =========================================================================

    isProtected(term: string): boolean {

        const item = this.find(term);

        if (!item || !item.enabled) {
            return false;
        }

        return (
            item.action === GlossaryAction.KEEP ||
            item.action === GlossaryAction.PROTECT
        );

    }

    // =========================================================================
    // MATCH
    // =========================================================================

    match(
        text: string,
        options: MatchOptions = {}
    ): GlossaryTerm[] {

        if (!text.trim()) {
            return [];
        }

        const eligibleTerms =
            this.getEligibleTerms(options);

        const matches: GlossaryTerm[] = [];

        for (const item of eligibleTerms) {

            // IGNORE terms must not be sent as active
            // translation instructions.

            if (
                item.action === GlossaryAction.IGNORE
            ) {
                continue;
            }

            const regex =
                this.createSourceRegex(
                    item.source,
                    item.caseSensitive ?? false
                );

            if (regex.test(text)) {

                matches.push(item);

            }

        }

        return matches;

    }

    // =========================================================================
    // PROTECT
    // =========================================================================

    protect(
        text: string,
        options: MatchOptions = {}
    ): string {

        let output = text;

        const terms =
            this.getEligibleTerms(options).filter(item => {

                return (
                    item.action === GlossaryAction.KEEP ||
                    item.action === GlossaryAction.PROTECT
                );

            });

        for (const item of terms) {

            const regex =
                this.createSourceRegex(
                    item.source,
                    item.caseSensitive ?? false
                );

            const placeholder =
                `__EK_KEEP_${encodeURIComponent(item.id)}__`;

            output = output.replace(
                regex,
                placeholder
            );

        }

        return output;

    }

    // =========================================================================
    // UNPROTECT
    // =========================================================================

    unprotect(text: string): string {

        return text.replace(
            /__EK_KEEP_(.*?)__/g,
            (_match, encodedId: string) => {

                let id: string;

                try {

                    id = decodeURIComponent(encodedId);

                } catch {

                    return _match;

                }

                const item =
                    this.glossary.get(id);

                return item?.source ?? _match;

            }
        );

    }

    // =========================================================================
    // REPLACE
    // =========================================================================

    replace(
        text: string,
        options: MatchOptions = {}
    ): string {

        let output = text;

        const terms =
            this.getEligibleTerms(options).filter(item => {

                return (
                    item.action === GlossaryAction.REPLACE &&
                    item.target.trim().length > 0
                );

            });

        for (const item of terms) {

            const regex =
                this.createSourceRegex(
                    item.source,
                    item.caseSensitive ?? false
                );

            output = output.replace(
                regex,
                () => item.target
            );

        }

        return output;

    }

}
