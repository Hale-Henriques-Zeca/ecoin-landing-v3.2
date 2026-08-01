import { Translation } from "../types/Translation";

export interface TranslationCreatedPayload {

    translation: Translation;

    sourceLanguage: string;

    targetLanguage: string;

    provider: string;

    cached: boolean;

    executionTime: number;

    timestamp: number;

}

export default class TranslationCreated {

    readonly type = "translation.created";

    readonly payload: TranslationCreatedPayload;

    constructor(payload: TranslationCreatedPayload) {

        this.payload = payload;

    }

}