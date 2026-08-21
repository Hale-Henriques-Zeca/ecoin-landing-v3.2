import {LanguageService} from "../services/LanguageService";

import type { Language } from "../types/Language";

export default class LanguageAPI {

    /**
     * Idioma atual
     */
    static getLanguage(): Language {

        return LanguageService.getCurrentLanguage();

    }

    /**
     * Altera o idioma
     */
    static async setLanguage(
        language: string
    ): Promise<void> {

        await LanguageService.setLanguage(language);

    }

    /**
     * Lista idiomas disponíveis
     */
    static availableLanguages(): Language[] {

        return LanguageService.getAvailableLanguages();

    }

    /**
     * Detecta automaticamente o idioma
     */
    static async detectLanguage(
        text: string
    ): Promise<string> {

        return LanguageService.detectLanguage(text);

    }

    /**
     * Reinicia para o idioma padrão
     */
    static async resetLanguage(): Promise<void> {

        await LanguageService.reset();

    }

}