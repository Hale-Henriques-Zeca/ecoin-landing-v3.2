import { Language } from "../types/Language";

export interface LanguageChangedPayload {

    previous: Language | null;

    current: Language;

    source?: "user" | "browser" | "system" | "api";

    timestamp: number;

}

export default class LanguageChanged {

    readonly type = "language.changed";

    readonly payload: LanguageChangedPayload;

    constructor(payload: LanguageChangedPayload) {

        this.payload = payload;

    }

}