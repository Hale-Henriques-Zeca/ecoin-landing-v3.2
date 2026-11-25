
// ============================================================================
// EDENKINGDOM AI TRANSLATION FRAMEWORK
// LanguageService.ts
//
// Layer: Frontend Language Management
// Responsibilities:
// - Current language
// - Available languages
// - Language validation
// - Language persistence
// - Default language
//
// Translation intelligence: Backend only
// ============================================================================

import { LANGUAGES } from "../constants/languages";

import type { Language } from "../types/Language";

// ============================================================================
// LANGUAGE SERVICE
// ============================================================================

export class LanguageService {

    private static currentLanguage: string =
        LANGUAGES.find(language => language.default)?.code ?? "pt";

    // ------------------------------------------------------------------------
    // Current Language
    // ------------------------------------------------------------------------

    static getCurrentLanguage(): Language {

        const language = this.find(this.currentLanguage);

        return language ?? this.getDefault();
    }

    static getCurrentLanguageCode(): string {

        return this.getCurrentLanguage().code;
    }

    // ------------------------------------------------------------------------
    // Set Language
    // ------------------------------------------------------------------------

    static async setLanguage(
        code: string
    ): Promise<void> {

        const normalizedCode = code?.trim().toLowerCase();

        if (!normalizedCode) {
            throw new Error("Language code is required.");
        }

        const language = this.find(normalizedCode);

        if (!language) {
            throw new Error(
                `Unsupported language: ${normalizedCode}`
            );
        }

        this.currentLanguage = language.code;

        if (typeof window !== "undefined") {
            window.localStorage.setItem(
                "edenkingdom-language",
                language.code
            );
        }
    }

    // ------------------------------------------------------------------------
    // Available Languages
    // ------------------------------------------------------------------------

    static getAvailableLanguages(): Language[] {

        return [...LANGUAGES];
    }

    // ------------------------------------------------------------------------
    // Find Language
    // ------------------------------------------------------------------------

    static find(
        code: string
    ): Language | undefined {

        return LANGUAGES.find(
            language =>
                language.code === code?.trim().toLowerCase()
        );
    }

    // ------------------------------------------------------------------------
    // Check Language
    // ------------------------------------------------------------------------

    static exists(
        code: string
    ): boolean {

        return this.find(code) !== undefined;
    }

    // ------------------------------------------------------------------------
    // Default Language
    // ------------------------------------------------------------------------

    static getDefault(): Language {

        const language = LANGUAGES.find(
            item => item.default
        );

        if (!language) {
            throw new Error(
                "No default language is configured."
            );
        }

        return language;
    }

    // ------------------------------------------------------------------------
    // Restore Saved Language
    // ------------------------------------------------------------------------

    static initialize(): Language {

        if (typeof window !== "undefined") {

            const savedLanguage =
                window.localStorage.getItem(
                    "edenkingdom-language"
                );

            if (savedLanguage && this.exists(savedLanguage)) {

                this.currentLanguage = savedLanguage;
            }
        }

        return this.getCurrentLanguage();
    }

    // ------------------------------------------------------------------------
    // Reset Language
    // ------------------------------------------------------------------------

    static async reset(): Promise<void> {

        const defaultLanguage = this.getDefault();

        this.currentLanguage = defaultLanguage.code;

        if (typeof window !== "undefined") {

            window.localStorage.removeItem(
                "edenkingdom-language"
            );
        }
    }

    // ------------------------------------------------------------------------
    // Automatic Text Detection
    // ------------------------------------------------------------------------

    static async detectLanguage(
        _text: string
    ): Promise<string> {

        throw new Error(
            "Automatic text detection is not implemented yet. " +
            "A dedicated backend language detection endpoint is required."
        );
    }

    // ========================================================================
    // BACKWARD COMPATIBILITY
    // Existing instance-based consumers
    // ========================================================================

    getCurrent(): string {

        return LanguageService.getCurrentLanguageCode();
    }

    setCurrent(language: string): void {

        const normalized = language?.trim().toLowerCase();

        if (!LanguageService.exists(normalized)) {
            throw new Error(
                `Unsupported language: ${normalized}`
            );
        }

        LanguageService.setLanguage(normalized).catch(error => {
            console.error(
                "[LanguageService] Failed to save language:",
                error
            );
        });
    }

    getLanguages(): Language[] {

        return LanguageService.getAvailableLanguages();
    }

    find(code: string): Language | undefined {

        return LanguageService.find(code);
    }

    exists(code: string): boolean {

        return LanguageService.exists(code);
    }

    getDefault(): Language {

        return LanguageService.getDefault();
    }
}

// ============================================================================
// EXPORT
// ============================================================================

export default LanguageService;
