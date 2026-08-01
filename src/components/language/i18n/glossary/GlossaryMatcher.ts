// ============================================================================
// EDENKINGDOM AI TRANSLATION FRAMEWORK
// Glossary Matcher
// ============================================================================

import { GlossaryTerm } from "../types/Glossary";
import { GlossaryAction } from "../constants/actions";

export class GlossaryMatcher {

    constructor(

        private glossary: Map<string, GlossaryTerm>

    ) {}

    /**
     * Procura um termo exato.
     */
    find(term: string): GlossaryTerm | undefined {

        return this.glossary.get(

            term.toLowerCase()

        );

    }

    /**
     * Verifica se existe.
     */
    has(term: string): boolean {

        return this.glossary.has(

            term.toLowerCase()

        );

    }

    /**
     * Verifica se é protegido.
     */
    isProtected(term: string): boolean {

        const item = this.find(term);

        if (!item) return false;

        return item.action === GlossaryAction.KEEP;

    }

    /**
     * Todos os termos encontrados.
     */
    match(text: string): GlossaryTerm[] {

        const matches: GlossaryTerm[] = [];

        for (const item of this.glossary.values()) {

            const regex = new RegExp(

                `\\b${item.key}\\b`,

                "gi"

            );

            if (regex.test(text)) {

                matches.push(item);

            }

        }

        return matches;

    }

    /**
     * Protege palavras KEEP.
     */
    protect(text: string): string {

        let output = text;

        for (const item of this.glossary.values()) {

            if (item.action !== GlossaryAction.KEEP)

                continue;

            const regex = new RegExp(

                `\\b${item.key}\\b`,

                "gi"

            );

            output = output.replace(

                regex,

                `__KEEP__${item.key}__`

            );

        }

        return output;

    }

    /**
     * Remove proteção.
     */
    unprotect(text: string): string {

        return text.replace(

            /__KEEP__(.*?)__/g,

            "$1"

        );

    }

    /**
     * Aplica REPLACE.
     */
    replace(text: string): string {

        let output = text;

        for (const item of this.glossary.values()) {

            if (

                item.action !== GlossaryAction.REPLACE ||

                !item.replacement

            ) continue;

            const regex = new RegExp(

                `\\b${item.key}\\b`,

                "gi"

            );

            output = output.replace(

                regex,

                item.replacement

            );

        }

        return output;

    }

}