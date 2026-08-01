import { LANGUAGES } from "../constants/languages";

export class LanguageService {

    private currentLanguage = "pt";

    /**
     * Idioma atual.
     */
    getCurrent(): string {

        return this.currentLanguage;

    }

    /**
     * Altera idioma.
     */
    setCurrent(

        language: string

    ): void {

        this.currentLanguage = language;

    }

    /**
     * Idiomas disponíveis.
     */
    getLanguages() {

        return LANGUAGES;

    }

    /**
     * Procura idioma.
     */
    find(code: string) {

        return LANGUAGES.find(

            language => language.code === code

        );

    }

    /**
     * Verifica existência.
     */
    exists(

        code: string

    ): boolean {

        return this.find(code) !== undefined;

    }

    /**
     * Idioma padrão.
     */
    getDefault() {

        return LANGUAGES.find(

            language => language.default

        );

    }

}