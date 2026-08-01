// ============================================================================
// EDENKINGDOM AI TRANSLATION FRAMEWORK
// HTML Validator
// ============================================================================

export interface HtmlValidationResult {

    valid: boolean;

    errors: string[];

}

export class HtmlValidator {

    /**
     * Verifica se o HTML possui o mesmo número de tags.
     */
    static validate(

        original: string,

        translated: string

    ): HtmlValidationResult {

        const result: HtmlValidationResult = {

            valid: true,

            errors: []

        };

        const originalTags = original.match(/<[^>]+>/g) || [];

        const translatedTags = translated.match(/<[^>]+>/g) || [];

        if (originalTags.length !== translatedTags.length) {

            result.valid = false;

            result.errors.push(

                "HTML tags count mismatch."

            );

        }

        originalTags.forEach(tag => {

            if (!translated.includes(tag)) {

                result.valid = false;

                result.errors.push(

                    `Missing HTML tag: ${tag}`

                );

            }

        });

        return result;

    }

}