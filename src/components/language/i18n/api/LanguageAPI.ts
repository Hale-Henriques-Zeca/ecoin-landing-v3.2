
// ============================================================================
// EDENKINGDOM AI TRANSLATION FRAMEWORK
// LanguageAPI.ts
//
// Layer: Frontend Language API
// Responsibilities:
// - Get current language
// - Change language
// - List available languages
// - Detect language (backend integration pending)
// - Reset language
//
// ============================================================================

import { LanguageService } from "../services/LanguageService";

import type { Language } from "../types/Language";

// ============================================================================
// LANGUAGE API
// ============================================================================

export default class LanguageAPI {

    // ------------------------------------------------------------------------
    // Current Language
    // ------------------------------------------------------------------------

    static getLanguage(): Language {

        return LanguageService.getCurrentLanguage();
    }

    // ------------------------------------------------------------------------
    // Current Language Code
    // ------------------------------------------------------------------------

    static getLanguageCode(): string {

        return LanguageService.getCurrentLanguageCode();
    }

    // ------------------------------------------------------------------------
    // Change Language
    // ------------------------------------------------------------------------

    static async setLanguage(
        language: string
    ): Promise<void> {

        await LanguageService.setLanguage(language);
    }

    // ------------------------------------------------------------------------
    // Available Languages
    // ------------------------------------------------------------------------

    static availableLanguages(): Language[] {

        return LanguageService.getAvailableLanguages();
    }

    // ------------------------------------------------------------------------
    // Find Language
    // ------------------------------------------------------------------------

    static findLanguage(
        code: string
    ): Language | undefined {

        return LanguageService.find(code);
    }

    // ------------------------------------------------------------------------
    // Validate Language
    // ------------------------------------------------------------------------

    static languageExists(
        code: string
    ): boolean {

        return LanguageService.exists(code);
    }

    // ------------------------------------------------------------------------
    // Automatic Language Detection
    // ------------------------------------------------------------------------

    static async detectLanguage(
        text: string
    ): Promise<string> {

        if (!text?.trim()) {
            throw new Error(
                "Text is required for language detection."
            );
        }

        return LanguageService.detectLanguage(text);
    }

    // ------------------------------------------------------------------------
    // Reset Language
    // ------------------------------------------------------------------------

    static async resetLanguage(): Promise<void> {

        await LanguageService.reset();
    }

    // ------------------------------------------------------------------------
    // Initialize Language
    // ------------------------------------------------------------------------

    static initialize(): Language {

        return LanguageService.initialize();
    }
}

// ============================================================================
// EXPORT
// ============================================================================

export { LanguageAPI };
