// ============================================================================
// EDENKINGDOM AI TRANSLATION FRAMEWORK
// Hash Utilities
// ============================================================================

/**
 * Hash simples (FNV-1a)
 */
export function hashString(text: string): string {

    let hash = 2166136261;

    for (let i = 0; i < text.length; i++) {

        hash ^= text.charCodeAt(i);

        hash +=
            (hash << 1) +
            (hash << 4) +
            (hash << 7) +
            (hash << 8) +
            (hash << 24);
    }

    return (hash >>> 0).toString(16);
}

/**
 * Cria chave única para cache.
 */
export function createCacheKey(
    provider: string,
    source: string,
    target: string,
    text: string
): string {

    return hashString(
        `${provider}:${source}:${target}:${text}`
    );
}

/**
 * Hash curto.
 */
export function shortHash(text: string): string {
    return hashString(text).substring(0, 8);
}

/**
 * Hash longo.
 */
export function longHash(text: string): string {
    return hashString(text + Date.now());
}