/**
 * ============================================================
 * Config Types
 * EdenKingDom AI Translation Framework
 * ============================================================
 */

import type { ProviderName } from "./Provider";

export interface CacheConfig {

    enabled: boolean;

    storage: "memory"
        | "localStorage"
        | "sessionStorage"
        | "indexedDB"
        | "supabase";

    ttl: number;

    maxEntries: number;

    compress: boolean;

}

export interface ProviderConfig {

    provider: ProviderName;

    enabled: boolean;

    priority: number;

    timeout: number;

    retries: number;

}

export interface TranslationConfig {

    defaultLanguage: string;

    fallbackLanguage: string;

    autoDetectLanguage: boolean;

    preserveHtml: boolean;

    preserveMarkdown: boolean;

    preserveJson: boolean;

    preservePlaceholders: boolean;

}

export interface PluginConfig {

    enabled: boolean;

    autoLoad: boolean;

    directory?: string;

}

export interface FrameworkConfig {

    cache: CacheConfig;

    translation: TranslationConfig;

    providers: ProviderConfig[];

    plugins: PluginConfig;

}