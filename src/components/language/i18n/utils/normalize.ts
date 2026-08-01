// ============================================================================
// EDENKINGDOM AI TRANSLATION FRAMEWORK
// Normalize Utilities
// ============================================================================

/**
 * Remove espaços extras.
 */
export function normalizeSpaces(text: string): string {
    return text.replace(/\s+/g, " ").trim();
}

/**
 * Remove quebras de linha.
 */
export function normalizeLines(text: string): string {
    return text
        .replace(/\r\n/g, "\n")
        .replace(/\r/g, "\n");
}

/**
 * Remove caracteres invisíveis.
 */
export function removeInvisibleCharacters(text: string): string {
    return text.replace(/[\u200B-\u200D\uFEFF]/g, "");
}

/**
 * Remove espaços no início/fim.
 */
export function trimText(text: string): string {
    return text.trim();
}

/**
 * Converte para minúsculas.
 */
export function toLower(text: string): string {
    return text.toLowerCase();
}

/**
 * Converte para maiúsculas.
 */
export function toUpper(text: string): string {
    return text.toUpperCase();
}

/**
 * Capitaliza apenas a primeira letra.
 */
export function capitalize(text: string): string {
    if (!text.length) return text;

    return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Remove acentos.
 */
export function removeAccents(text: string): string {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

/**
 * Normalização completa.
 */
export function normalizeText(text: string): string {
    return normalizeSpaces(
        removeInvisibleCharacters(
            normalizeLines(text)
        )
    );
}