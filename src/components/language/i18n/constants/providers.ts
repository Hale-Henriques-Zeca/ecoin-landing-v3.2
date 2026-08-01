/**
 * ============================================================
 * AI Providers
 * EdenKingDom AI Translation Framework
 * ============================================================
 */

export const PROVIDERS = {

    OPENAI: "openai",

    GEMINI: "gemini",

    CLAUDE: "claude",

    DEEPSEEK: "deepseek",

    CUSTOM: "custom"

} as const;

export const PROVIDER_NAMES = {

    openai: "OpenAI GPT",

    gemini: "Google Gemini",

    claude: "Anthropic Claude",

    deepseek: "DeepSeek",

    custom: "Custom Provider"

} as const;

export const DEFAULT_PROVIDER = PROVIDERS.OPENAI;

export type ProviderName =
    typeof PROVIDERS[keyof typeof PROVIDERS];