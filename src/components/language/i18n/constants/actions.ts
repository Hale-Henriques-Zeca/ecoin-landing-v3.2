/**
 * ============================================================
 * Translation Actions
 * EdenKingDom AI Translation Framework
 * ============================================================
 */

export const TRANSLATION_ACTIONS = {

    /**
     * Traduz normalmente
     */
    TRANSLATE: "translate",

    /**
     * Nunca traduz
     */
    KEEP: "keep",

    /**
     * Ignora completamente
     */
    IGNORE: "ignore",

    /**
     * Substitui antes da tradução
     */
    REPLACE: "replace",

    /**
     * Protege durante tradução
     */
    PROTECT: "protect",

    /**
     * Executa Regex
     */
    REGEX: "regex",

    /**
     * Tradução manual
     */
    MANUAL: "manual",

    /**
     * Tradução IA
     */
    AI: "ai",

    /**
     * Tradução Cache
     */
    CACHE: "cache",

    /**
     * Tradução Glossário
     */
    GLOSSARY: "glossary"

} as const;

export type TranslationAction =
    typeof TRANSLATION_ACTIONS[keyof typeof TRANSLATION_ACTIONS];