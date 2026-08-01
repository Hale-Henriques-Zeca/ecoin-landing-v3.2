// ============================================================================
// EDENKINGDOM AI TRANSLATION FRAMEWORK
// Glossary Validator
// ============================================================================

import { PROTECTED_TERMS } from "../constants/protectedTerms";

export class GlossaryValidator {

    /**
     * Verifica se um termo é protegido.
     */
    static isProtected(term: string): boolean {

        return PROTECTED_TERMS.includes(term);

    }

    /**
     * Lista termos protegidos encontrados.
     */
    static findProtectedTerms(text: string): string[] {

        return PROTECTED_TERMS.filter(

            term => text.includes(term)

        );

    }

    /**
     * Existe termo protegido?
     */
    static containsProtectedTerms(

        text: string

    ): boolean {

        return this.findProtectedTerms(text).length > 0;

    }

    /**
     * Conta.
     */
    static count(text: string): number {

        return this.findProtectedTerms(text).length;

    }

}