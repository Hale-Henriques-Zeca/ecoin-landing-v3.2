import { Provider } from "../types/Provider";

export interface ProviderChangedPayload {

    previous: Provider | null;

    current: Provider;

    reason?:

        | "manual"

        | "failover"

        | "health"

        | "priority"

        | "startup";

    timestamp: number;

}

export default class ProviderChanged {

    readonly type = "provider.changed";

    readonly payload: ProviderChangedPayload;

    constructor(payload: ProviderChangedPayload) {

        this.payload = payload;

    }

}