// ============================================================================
// EDENKINGDOM AI TRANSLATION FRAMEWORK
// JSON Utilities
// ============================================================================

export function isJson(text: string): boolean {

    try {

        JSON.parse(text);

        return true;

    } catch {

        return false;

    }

}

/**
 * Formata JSON.
 */
export function prettyJson(text: string): string {

    return JSON.stringify(

        JSON.parse(text),

        null,

        2

    );

}

/**
 * Compacta JSON.
 */
export function minifyJson(text: string): string {

    return JSON.stringify(

        JSON.parse(text)

    );

}

/**
 * Protege JSON.
 */
export function protectJson(text: string) {

    const token = "__JSON_OBJECT__";

    return {

        text: token,

        map: new Map([[token, text]])

    };

}

/**
 * Restaura JSON.
 */
export function restoreJson(

    text: string,

    map: Map<string, string>

): string {

    let result = text;

    map.forEach((value, key) => {

        result = result.replaceAll(key, value);

    });

    return result;

}