// ============================================================================
// EDENKINGDOM AI TRANSLATION FRAMEWORK
// JSON Validator
// ============================================================================

export interface JsonValidationResult {

    valid: boolean;

    error?: string;

}

export class JsonValidator {

    static validate(json: string): JsonValidationResult {

        try {

            JSON.parse(json);

            return {

                valid: true

            };

        }

        catch (error) {

            return {

                valid: false,

                error:

                    error instanceof Error

                        ? error.message

                        : "Invalid JSON"

            };

        }

    }

    static isValid(json: string): boolean {

        return this.validate(json).valid;

    }

}