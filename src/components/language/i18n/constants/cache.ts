/**
 * ============================================================
 * Cache Constants
 * EdenKingDom AI Translation Framework
 * ============================================================
 */

export const CACHE_STORAGE = {

    MEMORY: "memory",

    LOCAL_STORAGE: "localStorage",

    SESSION_STORAGE: "sessionStorage",

    INDEXED_DB: "indexedDB",

    SUPABASE: "supabase"

} as const;

export const CACHE_STATUS = {

    VALID: "valid",

    EXPIRED: "expired",

    INVALID: "invalid",

    DELETED: "deleted"

} as const;

export const CACHE_DEFAULT = {

    ENABLED: true,

    STORAGE: CACHE_STORAGE.MEMORY,

    TTL: 60 * 60 * 24 * 30, // 30 dias

    MAX_ENTRIES: 100000,

    COMPRESS: true,

    AUTO_CLEAN: true,

    AUTO_SYNC: true

} as const;

export const CACHE_KEYS = {

    LANGUAGE: "ekd-language",

    TRANSLATIONS: "ekd-translations",

    PROVIDERS: "ekd-providers",

    GLOSSARY: "ekd-glossary",

    SETTINGS: "ekd-settings",

    SESSION: "ekd-session"

} as const;

export const CACHE_EVENTS = {

    CREATED: "cache-created",

    UPDATED: "cache-updated",

    REMOVED: "cache-removed",

    CLEARED: "cache-cleared",

    EXPIRED: "cache-expired"

} as const;