/**
 * ============================================================
 * Provider Priorities
 * EdenKingDom AI Translation Framework
 * ============================================================
 */

import { PROVIDERS } from "./providers";

export const PROVIDER_PRIORITIES = {

    [PROVIDERS.OPENAI]: 1,

    [PROVIDERS.GEMINI]: 2,

    [PROVIDERS.CLAUDE]: 3,

    [PROVIDERS.DEEPSEEK]: 4,

    [PROVIDERS.CUSTOM]: 99

} as const;

export const DEFAULT_PROVIDER_PRIORITY = 1;

export const CACHE_PRIORITY = 0;

export const GLOSSARY_PRIORITY = -1;

export const MANUAL_PRIORITY = -2;