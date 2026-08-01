/**
 * ============================================================
 * Event Types
 * EdenKingDom AI Translation Framework
 * ============================================================
 */

export type EventType =
    | "languageChanged"
    | "providerChanged"
    | "translationStarted"
    | "translationCompleted"
    | "translationFailed"
    | "translationCached"
    | "cacheUpdated"
    | "cacheCleared"
    | "glossaryUpdated"
    | "pluginLoaded"
    | "pluginUnloaded";

export interface EventPayload {

    [key: string]: unknown;

}

export interface TranslationEvent {

    /**
     * ID único
     */
    id: string;

    /**
     * Tipo do evento
     */
    type: EventType;

    /**
     * Dados
     */
    payload: EventPayload;

    /**
     * Origem
     */
    source: string;

    /**
     * Data
     */
    createdAt: Date;

}