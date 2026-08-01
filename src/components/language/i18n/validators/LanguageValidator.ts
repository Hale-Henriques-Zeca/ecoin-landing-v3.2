// ============================================================================
// EDENKINGDOM AI TRANSLATION FRAMEWORK
// Language Validator
// ============================================================================

import { LANGUAGES } from "../constants/languages";

export class LanguageValidator {

    /**
     * Verifica se um idioma existe.
     */
    static exists(code: string): boolean {

        return LANGUAGES.some(

            language => language.code === code

        );

    }

    /**
     * Verifica se está habilitado.
     */
    static isEnabled(code: string): boolean {

        const language = LANGUAGES.find(

            item => item.code === code

        );

        return language?.enabled ?? false;

    }

    /**
     * Retorna idioma.
     */
    static get(code: string) {

        return LANGUAGES.find(

            language => language.code === code

        );

    }

    /**
     * Validação completa.
     */
    static validate(code: string): void {

        if (!code) {

            throw new Error(

                "Language code not provided."

            );

        }

        if (!this.exists(code)) {

            throw new Error(

                `Unsupported language: ${code}`

            );

        }

        if (!this.isEnabled(code)) {

            throw new Error(

                `Language disabled: ${code}`

            );

        }

    }

}