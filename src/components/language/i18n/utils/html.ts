// ============================================================================
// EDENKINGDOM AI TRANSLATION FRAMEWORK
// HTML Utilities
// ============================================================================

export interface HtmlProtectionResult {
    text: string;
    map: Map<string, string>;
}

const HTML_REGEX = /<[^>]+>/g;

/**
 * Protege todas as tags HTML antes da tradução.
 */
export function protectHtml(text: string): HtmlProtectionResult {

    const map = new Map<string, string>();

    let index = 0;

    const protectedText = text.replace(HTML_REGEX, (match) => {

        const token = `__HTML_${index++}__`;

        map.set(token, match);

        return token;

    });

    return {
        text: protectedText,
        map
    };

}

/**
 * Restaura as tags HTML.
 */
export function restoreHtml(
    text: string,
    map: Map<string, string>
): string {

    let result = text;

    map.forEach((value, key) => {

        result = result.replaceAll(key, value);

    });

    return result;

}

/**
 * Verifica se existe HTML.
 */
export function hasHtml(text: string): boolean {

    return HTML_REGEX.test(text);

}

/**
 * Remove HTML.
 */
export function stripHtml(text: string): string {

    return text.replace(HTML_REGEX, "");

}

/**
 * Conta quantas tags existem.
 */
export function countHtmlTags(text: string): number {

    return (text.match(HTML_REGEX) || []).length;

}