// ============================================================================
// EDENKINGDOM AI TRANSLATION FRAMEWORK
// Placeholder Utilities
// ============================================================================

export interface Placeholder {

    id: string;

    original: string;

}

const PLACEHOLDER_PATTERNS = [

    /\{\{.*?\}\}/g,

    /\{.*?\}/g,

    /%\w/g,

    /\$\{.*?\}/g,

    /\[\[.*?\]\]/g

];

/**
 * Extrai placeholders.
 */

export function extractPlaceholders(text: string): string[] {

    const result: string[] = [];

    PLACEHOLDER_PATTERNS.forEach(pattern => {

        const matches = text.match(pattern);

        if (matches) {

            result.push(...matches);

        }

    });

    return [...new Set(result)];

}

/**
 * Protege placeholders.
 */

export function protectPlaceholders(text: string) {

    const placeholders = extractPlaceholders(text);

    let protectedText = text;

    const map = new Map<string, string>();

    placeholders.forEach((placeholder, index) => {

        const token = `__PLACEHOLDER_${index}__`;

        map.set(token, placeholder);

        protectedText = protectedText.replaceAll(

            placeholder,

            token

        );

    });

    return {

        text: protectedText,

        map

    };

}

/**
 * Restaura placeholders.
 */

export function restorePlaceholders(

    text: string,

    map: Map<string, string>

) {

    let result = text;

    map.forEach((original, token) => {

        result = result.replaceAll(token, original);

    });

    return result;

}

/**
 * Verifica se há placeholders.
 */

export function hasPlaceholders(text: string): boolean {

    return extractPlaceholders(text).length > 0;

}

/**
 * Conta placeholders.
 */

export function countPlaceholders(text: string): number {

    return extractPlaceholders(text).length;

}

/**
 * Lista placeholders únicos.
 */

export function uniquePlaceholders(text: string): string[] {

    return [...new Set(extractPlaceholders(text))];

}