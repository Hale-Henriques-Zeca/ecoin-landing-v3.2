// ============================================================================
// EDENKINGDOM AI TRANSLATION FRAMEWORK
// Translation Validator
// ============================================================================

import { PROTECTED_TERMS } from "../constants/protectedTerms";
import { PLACEHOLDER_PATTERNS } from "../constants/regex";

export interface TranslationValidationResult {
    valid: boolean;
    errors: string[];
    warnings: string[];
}

export class TranslationValidator {

    /**
     * Validação completa.
     */
    static validate(
        original: string,
        translated: string
    ): TranslationValidationResult {

        const result: TranslationValidationResult = {
            valid: true,
            errors: [],
            warnings: []
        };

        this.validateEmpty(original, translated, result);

        this.validateProtectedTerms(
            original,
            translated,
            result
        );

        this.validatePlaceholders(
            original,
            translated,
            result
        );

        this.validateLength(
            original,
            translated,
            result
        );

        result.valid = result.errors.length === 0;

        return result;
    }

    /**
     * Texto vazio.
     */
    private static validateEmpty(
        original: string,
        translated: string,
        result: TranslationValidationResult
    ) {

        if (!translated.trim()) {

            result.errors.push(
                "Translated text is empty."
            );

        }

    }

    /**
     * Termos protegidos.
     */
    private static validateProtectedTerms(
        original: string,
        translated: string,
        result: TranslationValidationResult
    ) {

        PROTECTED_TERMS.forEach(term => {

            if (
                original.includes(term) &&
                !translated.includes(term)
            ) {

                result.errors.push(
                    `Protected term modified: ${term}`
                );

            }

        });

    }

    /**
     * Placeholders.
     */
    private static validatePlaceholders(
        original: string,
        translated: string,
        result: TranslationValidationResult
    ) {

        PLACEHOLDER_PATTERNS.forEach(regex => {

            const originalMatches =
                original.match(regex) || [];

            const translatedMatches =
                translated.match(regex) || [];

            if (
                originalMatches.length !==
                translatedMatches.length
            ) {

                result.errors.push(
                    "Placeholder mismatch."
                );

            }

        });

    }

    /**
     * Diferença exagerada de tamanho.
     */
    private static validateLength(
        original: string,
        translated: string,
        result: TranslationValidationResult
    ) {

        const ratio =
            translated.length /
            Math.max(original.length, 1);

        if (ratio > 3) {

            result.warnings.push(
                "Translation is much larger than original."
            );

        }

        if (ratio < 0.25) {

            result.warnings.push(
                "Translation is much shorter than original."
            );

        }

    }

}