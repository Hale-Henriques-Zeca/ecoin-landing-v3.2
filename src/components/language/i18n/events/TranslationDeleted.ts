import { Translation } from "../types/Translation";

export interface TranslationDeletedPayload {

    translation: Translation;

    sourceLanguage: string;

    targetLanguage: string;

    provider?: string;

    reason?:
        | "manual"
        | "cache-expired"
        | "cleanup"
        | "storage-limit"
        | "rollback"
        | "invalidate";

    timestamp: number;

}

export default class TranslationDeleted {

    readonly type = "translation.deleted";

    readonly payload: TranslationDeletedPayload;

    constructor(payload: TranslationDeletedPayload) {

        this.payload = payload;

    }

}