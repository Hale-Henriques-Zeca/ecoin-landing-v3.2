/**
 * ============================================================
 * EDENKINGDOM AI TRANSLATION FRAMEWORK
 * OPENAI VALIDATOR
 * ============================================================
 */

export interface OpenAIValidation {
    valid: boolean;
    message?: string;
}

export class OpenAIValidator {

    static validate(): OpenAIValidation {

        const apiKey =
            process.env.OPENAI_API_KEY;

        if (!apiKey || !apiKey.trim()) {

            return {
                valid: false,
                message: "OpenAI API Key not configured.",
            };

        }

        return {
            valid: true,
        };

    }

}