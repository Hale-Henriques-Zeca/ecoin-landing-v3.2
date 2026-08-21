// ============================================================================
// EDENKINGDOM AI TRANSLATION FRAMEWORK
// Translation Actions
// ============================================================================

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
     * Substitui antes/durante o processamento
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


/**
 * Todas as ações possíveis do Translation Framework.
 */
export type TranslationAction =
    typeof TRANSLATION_ACTIONS[
        keyof typeof TRANSLATION_ACTIONS
    ];


/**
 * Ações específicas utilizadas pelo Glossário.
 *
 * Usa a mesma fonte de verdade de TRANSLATION_ACTIONS.
 */
export const GlossaryAction = {

    TRANSLATE: TRANSLATION_ACTIONS.TRANSLATE,

    KEEP: TRANSLATION_ACTIONS.KEEP,

    IGNORE: TRANSLATION_ACTIONS.IGNORE,

    REPLACE: TRANSLATION_ACTIONS.REPLACE

} as const;


/**
 * Tipo das ações aceitas pelo Glossário.
 */
export type GlossaryAction =
    typeof GlossaryAction[
        keyof typeof GlossaryAction
    ];