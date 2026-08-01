// ============================================================================
// EDENKINGDOM AI TRANSLATION FRAMEWORK
// Markdown Utilities
// ============================================================================

export interface MarkdownProtectionResult {

    text: string;

    map: Map<string, string>;

}

const MARKDOWN_PATTERNS = [

    /```[\s\S]*?```/g,

    /`[^`]*`/g,

    /\*\*.*?\*\*/g,

    /\*.*?\*/g,

    /~~.*?~~/g,

    /\[.*?\]\(.*?\)/g,

    /^#+\s.*$/gm

];

/**
 * Protege Markdown.
 */
export function protectMarkdown(
    text: string
): MarkdownProtectionResult {

    let protectedText = text;

    const map = new Map<string, string>();

    let counter = 0;

    MARKDOWN_PATTERNS.forEach(regex => {

        protectedText = protectedText.replace(regex, (match) => {

            const token = `__MARKDOWN_${counter++}__`;

            map.set(token, match);

            return token;

        });

    });

    return {

        text: protectedText,

        map

    };

}

/**
 * Restaura Markdown.
 */
export function restoreMarkdown(

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
 * Verifica se existe Markdown.
 */
export function hasMarkdown(text: string): boolean {

    return MARKDOWN_PATTERNS.some(regex => regex.test(text));

}

/**
 * Conta blocos Markdown.
 */
export function countMarkdown(text: string): number {

    let total = 0;

    MARKDOWN_PATTERNS.forEach(regex => {

        total += (text.match(regex) || []).length;

    });

    return total;

}