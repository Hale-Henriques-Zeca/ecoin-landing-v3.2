import { Translation } from "../types/Translation";
import { TranslationOptions } from "../types/Config";

export interface ProviderHealthStatus {
    healthy: boolean;
    latency: number;
    message?: string;
    lastCheck: number;
}

export interface ProviderCapabilities {
    translate: boolean;
    glossary: boolean;
    html: boolean;
    markdown: boolean;
    json: boolean;
    streaming: boolean;
    functions: boolean;
    vision: boolean;
}

export interface AIProvider {

    readonly id: string;

    readonly name: string;

    readonly version: string;

    readonly priority: number;

    readonly enabled: boolean;

    readonly capabilities: ProviderCapabilities;

    initialize(): Promise<void>;

    destroy(): Promise<void>;

    translate(
        text: string,
        source: string,
        target: string,
        options?: TranslationOptions
    ): Promise<Translation>;

    health(): Promise<ProviderHealthStatus>;

    supports(feature: keyof ProviderCapabilities): boolean;

}