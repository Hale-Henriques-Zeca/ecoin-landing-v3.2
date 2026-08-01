/**
 * ============================================================
 * Language Types
 * EdenKingDom AI Translation Framework
 * ============================================================
 */

export type LanguageDirection = "ltr" | "rtl";

export type LanguageStatus =
    | "active"
    | "inactive"
    | "beta"
    | "deprecated";

export interface Language {

    /**
     * ISO 639-1
     * Ex: pt
     */
    code: string;

    /**
     * Locale
     * Ex: pt-MZ
     */
    locale: string;

    /**
     * Nome nativo
     */
    nativeName: string;

    /**
     * Nome em inglês
     */
    englishName: string;

    /**
     * Emoji/Bandeira
     */
    flag: string;

    /**
     * País principal
     */
    country: string;

    /**
     * RTL ou LTR
     */
    direction: LanguageDirection;

    /**
     * Idioma padrão
     */
    default?: boolean;

    /**
     * Estado
     */
    status: LanguageStatus;

    /**
     * Ordem de apresentação
     */
    order?: number;

    /**
     * Data criação
     */
    createdAt?: Date;

    /**
     * Atualização
     */
    updatedAt?: Date;

}