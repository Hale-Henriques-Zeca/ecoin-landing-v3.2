export interface CacheUpdatedPayload {

    key: string;

    operation:

        | "set"

        | "update"

        | "delete"

        | "clear"

        | "expire"

        | "sync";

    provider?: string;

    storage?:

        | "memory"

        | "localstorage"

        | "indexeddb"

        | "session"

        | "supabase";

    hit?: boolean;

    size?: number;

    timestamp: number;

}

export default class CacheUpdated {

    readonly type = "cache.updated";

    readonly payload: CacheUpdatedPayload;

    constructor(payload: CacheUpdatedPayload) {

        this.payload = payload;

    }

}