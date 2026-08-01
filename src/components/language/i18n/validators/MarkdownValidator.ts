// ============================================================================
// EDENKINGDOM AI TRANSLATION FRAMEWORK
// Markdown Validator
// ============================================================================

export interface MarkdownValidationResult {

    valid: boolean;

    errors: string[];

}

export class MarkdownValidator {

    static validate(

        original: string,

        translated: string

    ): MarkdownValidationResult {

        const result: MarkdownValidationResult = {

            valid: true,

            errors: []

        };

        const patterns = [

            /\*\*/g,

            /\*/g,

            /__/g,

            /#/g,

            /```/g,

            /`/g,

            /\[.*?\]\(.*?\)/g

        ];

        patterns.forEach(regex => {

            const originalCount =

                (original.match(regex) || []).length;

            const translatedCount =

                (translated.match(regex) || []).length;

            if (originalCount !== translatedCount) {

                result.valid = false;

                result.errors.push(

                    `Markdown mismatch: ${regex}`

                );

            }

        });

        return result;

    }

}