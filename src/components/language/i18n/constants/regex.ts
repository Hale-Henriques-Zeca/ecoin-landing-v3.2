/**
 * ============================================================
 * Regular Expressions
 * EdenKingDom AI Translation Framework
 * ============================================================
 */

export const REGEX = {

    /**
     * URLs
     */
    URL:

/https?:\/\/[^\s]+/gi,

    /**
     * Emails
     */
    EMAIL:

/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi,

    /**
     * HTML
     */
    HTML_TAG:

/<[^>]+>/g,

    /**
     * HTML Attributes
     */
    HTML_ATTRIBUTE:

/[a-zA-Z-]+="[^"]*"/g,

    /**
     * CSS Classes
     */
    CSS_CLASS:

/class(Name)?="[^"]*"/g,

    /**
     * JSON
     */
    JSON:

/\{(?:[^{}]|(?:\{[^{}]*\}))*\}/g,

    /**
     * Markdown Links
     */
    MARKDOWN_LINK:

/\[[^\]]+\]\([^)]+\)/g,

    /**
     * Markdown Image
     */
    MARKDOWN_IMAGE:

/!\[[^\]]*\]\([^)]+\)/g,

    /**
     * Markdown Code
     */
    MARKDOWN_CODE:

/```[\s\S]*?```/g,

    /**
     * Inline Code
     */
    INLINE_CODE:

/`[^`]+`/g,

    /**
     * Placeholders
     */
    PLACEHOLDER:

/\{\{.*?\}\}|\{.*?\}|%\w|:\w+/g,

    /**
     * Emoji
     */
    EMOJI:

/(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu,

    /**
     * UUID
     */
    UUID:

/\b[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\b/gi,

    /**
     * HEX Color
     */
    HEX_COLOR:

/#[0-9A-Fa-f]{3,8}\b/g,

    /**
     * Numbers
     */
    NUMBER:

/\b\d+(\.\d+)?\b/g,

    /**
     * IP
     */
    IP:

/\b(?:\d{1,3}\.){3}\d{1,3}\b/g,

    /**
     * XML
     */
    XML:

/<([a-zA-Z][a-zA-Z0-9]*)\b[^>]*>(.*?)<\/\1>/gs

} as const;