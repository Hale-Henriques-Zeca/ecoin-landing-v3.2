import { Translation } from "../types/Translation";

export interface TranslationUpdatedPayload {

    previous: Translation;

    current: Translation;

    provider: string;

    reason?:

        | "manual"

        | "cache-refresh"

        | "provider-change"

        | "glossary-update"

        | "optimization"

        | "retry";

    executionTime?: number;

    timestamp: number;

}

export default class TranslationUpdated {

    readonly type = "translation.updated";

    readonly payload: TranslationUpdatedPayload;

    constructor(payload: TranslationUpdatedPayload) {

        this.payload = payload;

    }

}